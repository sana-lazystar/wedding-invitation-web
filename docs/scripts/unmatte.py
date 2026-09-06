#!/usr/bin/env python3
"""투명 배경 PNG의 가장자리 색 번짐(매트 잔상)을 지웁니다.

반투명 픽셀의 RGB를 가장 가까운 불투명 픽셀 색으로 바꿉니다(alpha bleed). 알파는 그대로 둡니다.
컷아웃 가장자리에 남은 자홍색 테두리 같은 잔상을 없앨 때 씁니다. 원본은 건드리지 않습니다.

사용: python3 docs/scripts/unmatte.py <입력.png> <출력.png> [--passes 12]
필요: Pillow, numpy (macOS 시스템 python3에 있음)
"""
import sys
import numpy as np
from PIL import Image


def unmatte(src: str, dst: str, passes: int = 12) -> None:
    im = Image.open(src).convert("RGBA")
    a = np.asarray(im).astype(np.float32)
    rgb, alpha = a[..., :3], a[..., 3]
    solid = alpha >= 250
    filled = solid.copy()
    color = np.where(solid[..., None], rgb, 0.0)
    for _ in range(passes):
        todo = ~filled
        if not todo.any():
            break
        # 3×3 이웃 중 채워진 픽셀의 평균색
        acc = np.zeros_like(color)
        cnt = np.zeros(alpha.shape, dtype=np.float32)
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                if dy == 0 and dx == 0:
                    continue
                sh_c = np.roll(np.roll(color, dy, axis=0), dx, axis=1)
                sh_f = np.roll(np.roll(filled, dy, axis=0), dx, axis=1)
                acc += np.where(sh_f[..., None], sh_c, 0.0)
                cnt += sh_f
        can = todo & (cnt > 0)
        color[can] = acc[can] / cnt[can][..., None]
        filled |= can
    out = a.copy()
    out[..., :3] = np.where(solid[..., None], rgb, color)
    Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save(dst, optimize=True)
    changed = int((~solid & (alpha > 0)).sum())
    print(f"✓ {dst}: 반투명 픽셀 {changed:,}개 색 교체 ({passes}회 반복)")


if __name__ == "__main__":
    args = [x for x in sys.argv[1:] if not x.startswith("--")]
    passes = 12
    if "--passes" in sys.argv:
        passes = int(sys.argv[sys.argv.index("--passes") + 1])
    if len(args) != 2:
        print(__doc__)
        sys.exit(1)
    unmatte(args[0], args[1], passes)
