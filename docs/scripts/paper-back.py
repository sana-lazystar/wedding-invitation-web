#!/usr/bin/env python3
"""컷아웃(투명 배경 PNG)의 뒷면을 만듭니다. 종이 결 이미지를 컷아웃 윤곽으로 오리고 위아래를 뒤집어, 접혀 있는 팝업 조각의 뒷면으로 씁니다(디자인 논의 T32).
브라우저에서 마스크로 오리지 않고 그림 파일로 두는 이유는, 3D 변환 안에서 SVG·CSS 마스크가 그려지지 않거나 file://에서 막히기 때문입니다.
투명도를 유지한 256색 팔레트 PNG로 저장합니다. macOS 시스템 python3의 Pillow를 씁니다.

사용: python3 docs/scripts/paper-back.py <컷아웃.png> <종이.png> <출력.png> [--no-flip]
"""
import sys
from PIL import Image, ImageOps

args = [a for a in sys.argv[1:] if not a.startswith('--')]
flip = '--no-flip' not in sys.argv
if len(args) != 3:
    print(__doc__); sys.exit(1)
cutout_path, paper_path, out_path = args
cutout = Image.open(cutout_path).convert('RGBA')
paper = Image.open(paper_path).convert('RGB')
paper = ImageOps.fit(paper, cutout.size, method=Image.Resampling.LANCZOS)
back = paper.copy().convert('RGBA')
back.putalpha(cutout.getchannel('A'))
if flip:
    back = ImageOps.flip(back)
q = back.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.FLOYDSTEINBERG)
q.save(out_path, optimize=True)
import os
print(f"✓ {out_path} {back.size[0]}×{back.size[1]} {os.path.getsize(out_path) // 1024}KB ({'뒤집음' if flip else '그대로'})")
