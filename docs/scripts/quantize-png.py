#!/usr/bin/env python3
"""PNG를 256색 팔레트로 줄여 파일 크기를 낮춥니다(질감 에셋은 무손실 PNG가 수백 KB라서). 제자리에서 덮어씁니다.
투명도가 있으면 RGBA 팔레트로 유지합니다. macOS 시스템 python3의 Pillow를 씁니다.

사용: python3 docs/scripts/quantize-png.py <파일.png> [색 수=256]
"""
import sys, os
from PIL import Image

path = sys.argv[1]
colors = int(sys.argv[2]) if len(sys.argv) > 2 else 256
im = Image.open(path)
before = os.path.getsize(path)
has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
im = im.convert('RGBA' if has_alpha else 'RGB')
q = im.quantize(colors=colors, method=Image.Quantize.FASTOCTREE if has_alpha else Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
q.save(path, optimize=True)
after = os.path.getsize(path)
print(f"✓ {path} {before // 1024}KB → {after // 1024}KB ({colors}색)")
