#!/usr/bin/env python3
"""갤러리 사진 산출(잠정, WIW-4 · 디자인 논의 T103).

docs/gallery/N.jpg(원본, git 제외. 번호는 1~3자리, 확장자 jpg · JPG)마다 public/gallery/NN.jpg(긴 변 1600, JPEG 80. 뷰어용)와 NN-thumb.jpg(가운데 정사각 480, JPEG 80. 타일용)를 만들고,
매니페스트 src/content/gallery.json에 없는 번호를 끝에 보탭니다(id · width · height. 뷰어용 치수). 있는 항목의 순서와 내용은 건드리지 않습니다(docs/scripts/README.md §사진 추가·순서 변경 절차).
정식 파이프라인(images.mjs, WebP 여러 폭)이 생기면 이 스크립트를 대체합니다. EXIF 회전을 픽셀에 적용합니다.

사용: python3 docs/scripts/gallery-jpeg.py            # 없는 산출만 만듭니다
      python3 docs/scripts/gallery-jpeg.py --force    # 전부 다시 만듭니다
"""
import json
import os
import re
import sys

from PIL import Image, ImageOps

SRC = "docs/gallery"
OUT = "public/gallery"
MANIFEST = "src/content/gallery.json"
LONG = 1600
THUMB = 480
QUALITY = 80

force = "--force" in sys.argv
os.makedirs(OUT, exist_ok=True)
os.makedirs(os.path.dirname(MANIFEST), exist_ok=True)
manifest = json.load(open(MANIFEST, encoding="utf-8")) if os.path.exists(MANIFEST) else []
known = {item["id"] for item in manifest}

# 파일 이름은 번호 + .jpg(.JPG). 번호는 1~3자리이고 id는 두 자리로 채웁니다(1.jpg → 01). 숫자 순으로 돕니다
names = sorted((n for n in os.listdir(SRC) if re.fullmatch(r"\d{1,3}\.jpe?g", n, re.IGNORECASE)), key=lambda n: int(n.split(".")[0]))
for name in names:
    photo_id = name.split(".")[0].zfill(2)
    full = os.path.join(OUT, f"{photo_id}.jpg")
    thumb = os.path.join(OUT, f"{photo_id}-thumb.jpg")
    if not force and os.path.exists(full) and os.path.exists(thumb) and photo_id in known:
        continue
    im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, name))).convert("RGB")
    w, h = im.size
    scale = LONG / max(w, h)
    big = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS) if scale < 1 else im
    big.save(full, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    ImageOps.fit(im, (THUMB, THUMB), Image.LANCZOS, centering=(0.5, 0.42)).save(thumb, "JPEG", quality=QUALITY, optimize=True)
    if photo_id not in known:
        manifest.append({"id": photo_id, "width": big.size[0], "height": big.size[1]})
        known.add(photo_id)
    print(f"✓ {photo_id}  {big.size[0]}×{big.size[1]}  {os.path.getsize(full) // 1024}KB  썸네일 {os.path.getsize(thumb) // 1024}KB")

json.dump(manifest, open(MANIFEST, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(MANIFEST, "a", encoding="utf-8").write("\n")
print(f"✓ {MANIFEST} {len(manifest)}장")
