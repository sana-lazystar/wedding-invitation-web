#!/usr/bin/env python3
"""컷아웃 PNG에 흰 스티커 테두리를 굽습니다(디자인 논의 T53).

캐릭터 그림(이산하가 준 스티커)에는 흰 테두리가 이미 있으므로, 사진 컷아웃을 같은 문법으로 맞출 때 씁니다.
알파의 경계 상자로 자르고, 높이를 맞춘 뒤, 알파를 넓혀(MaxFilter) 흰 층을 깔고 원본을 위에 얹습니다.
원본이 화폭 변에서 잘려 있으면(받침대 등) 그 변에서는 테두리를 끊습니다. 결과는 별도로 quantize-png.py를 거칩니다.

사용: python3 docs/scripts/sticker-border.py <입력.png> <출력.png> [높이=300] [테두리=7]
"""
import sys
import numpy as np
from PIL import Image, ImageFilter


def main() -> None:
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    src, dst = sys.argv[1], sys.argv[2]
    height = int(sys.argv[3]) if len(sys.argv) > 3 else 300
    border = int(sys.argv[4]) if len(sys.argv) > 4 else 7
    im = Image.open(src).convert("RGBA")
    a = np.array(im)[:, :, 3]
    ys, xs = np.where(a >= 8)
    touches = {"top": ys.min() == 0, "bottom": ys.max() == im.height - 1, "left": xs.min() == 0, "right": xs.max() == im.width - 1}
    im = im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    im = im.resize((round(im.width * height / im.height), height), Image.LANCZOS)
    pad = border + 5
    canvas = Image.new("RGBA", (im.width + 2 * pad, im.height + 2 * pad), (0, 0, 0, 0))
    canvas.paste(im, (pad, pad))
    ring = canvas.split()[3].filter(ImageFilter.MaxFilter(2 * border + 1)).filter(ImageFilter.GaussianBlur(0.8))
    r = np.array(ring)
    if touches["bottom"]:
        r[height + pad:, :] = 0
    if touches["top"]:
        r[:pad, :] = 0
    if touches["left"]:
        r[:, :pad] = 0
    if touches["right"]:
        r[:, im.width + pad:] = 0
    white = Image.new("RGBA", canvas.size, (255, 253, 248, 255))
    white.putalpha(Image.fromarray(r))
    out = Image.alpha_composite(white, canvas)
    out.save(dst, optimize=True)
    cut = ", ".join(k for k, v in touches.items() if v) or "없음"
    print(f"✓ {dst} {out.size[0]}×{out.size[1]} (테두리 {border}px, 잘린 변: {cut})")


if __name__ == "__main__":
    main()
