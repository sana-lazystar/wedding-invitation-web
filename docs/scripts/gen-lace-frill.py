#!/usr/bin/env python3
"""레이스 프릴 SVG 생성기. 타원 둘레를 호 길이로 균등 분할해 주름잎을 배치한다."""
import math, random

W, H = 840, 1110
CX, CY = 420, 555
RX, RY = 231, 351          # 주름잎 밑동 타원 (카드 225×345 바로 바깥)
N = 56

def pts(rx, ry, n, phase=0.0):
    M = 4000
    ts = [2*math.pi*i/M for i in range(M+1)]
    cum, acc = [0.0], 0.0
    for i in range(M):
        t0, t1 = ts[i], ts[i+1]
        acc += math.hypot(rx*(math.cos(t1)-math.cos(t0)), ry*(math.sin(t1)-math.sin(t0)))
        cum.append(acc)
    out = []
    for k in range(n):
        s = acc*((k+phase)/n)
        lo, hi = 0, M
        while lo < hi:
            mid = (lo+hi)//2
            if cum[mid] < s: lo = mid+1
            else: hi = mid
        t = ts[lo]
        out.append((CX + rx*math.cos(t), CY + ry*math.sin(t),
                    math.degrees(math.atan2(math.sin(t)/ry, math.cos(t)/rx)) + 90))
    return out

rnd = random.Random(20260906)

def layer(phase, scale, mask, op, lean):
    rows = [f'<g mask="url(#{mask})" opacity="{op}">']
    for x, y, a in pts(RX, RY, N, phase):
        rows.append('<use href="#pl" transform="translate({:.1f} {:.1f}) rotate({:.1f}) scale({:.3f} {:.3f})"/>'
                    .format(x, y, a + lean + rnd.uniform(-7, 7),
                            rnd.uniform(0.90, 1.10), scale * rnd.uniform(0.87, 1.13)))
    rows.append('</g>')
    return '\n'.join(rows)

P = ("M -21 12 C -25 -40 -27 -105 -24 -140 C -22 -161 -12 -171 0 -171 "
     "C 12 -171 22 -161 24 -140 C 27 -105 25 -40 21 12 Z")

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<!-- 레이스 프릴(타원 카드를 두르는 주름 트리밍).
     짜임(망사) = 실 격자를 난류로 흔든 마스크, 성기고 촘촘한 얼룩 = 낮은 주파수 난류.
     주름 = 잎마다 좌우 명암 + 제 그늘. 배치는 호 길이 균등 분할이라 손으로 고치지 않는다(생성기: 디자인 논의 T37). -->
<defs>
  <pattern id="net" width="7.8" height="7.8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <path d="M0 3.9H7.8M3.9 0V7.8" stroke="#fff" stroke-width="1.15" fill="none"/>
  </pattern>
  <filter id="wob" x="-8%" y="-8%" width="116%" height="116%">
    <feTurbulence type="fractalNoise" baseFrequency="0.035 0.05" numOctaves="3" seed="7" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    <feGaussianBlur stdDeviation="0.3"/>
  </filter>
  <filter id="cloud" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="21"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .5 0 0 0 -.2"/>
  </filter>
  <g id="netfield">
    <g filter="url(#wob)">
      <rect x="-120" y="-120" width="{W+240}" height="{H+240}" fill="#121212"/>
      <rect x="-120" y="-120" width="{W+240}" height="{H+240}" fill="url(#net)"/>
    </g>
    <rect width="{W}" height="{H}" filter="url(#cloud)"/>
  </g>
  <mask id="m1"><use href="#netfield"/></mask>
  <mask id="m2"><g transform="rotate(37 {CX} {CY})"><use href="#netfield"/></g></mask>

  <linearGradient id="pleat" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#DCD2C1"/><stop offset="0.2" stop-color="#F7F3EA"/>
    <stop offset="0.5" stop-color="#FFFEFA"/><stop offset="0.8" stop-color="#F4EFE4"/>
    <stop offset="1" stop-color="#E0D6C5"/>
  </linearGradient>
  <linearGradient id="fade" x1="0" y1="1" x2="0" y2="0" gradientUnits="objectBoundingBox">
    <stop offset="0" stop-color="#fff"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.94"/>
    <stop offset="1" stop-color="#fff" stop-opacity="0.7"/>
  </linearGradient>
  <mask id="tip"><path d="{P}" fill="url(#fade)"/></mask>
  <filter id="pshadow" x="-60%" y="-25%" width="220%" height="150%">
    <feDropShadow dx="-5" dy="2" stdDeviation="4" flood-color="#87795F" flood-opacity="0.4"/>
  </filter>

  <g id="pl" filter="url(#pshadow)"><g mask="url(#tip)">
    <path d="{P}" fill="url(#pleat)"/>
    <path d="{P}" fill="none" stroke="#FFFDF8" stroke-width="2.6" stroke-opacity="0.95"/>
    <path d="{P}" fill="none" stroke="#A89A85" stroke-width="0.6" stroke-opacity="0.45"/>
  </g></g>

  <filter id="cast" x="-10%" y="-8%" width="120%" height="116%">
    <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#9E8F7A" flood-opacity="0.45"/>
  </filter>
</defs>

<g filter="url(#cast)">
{layer(0.5, 1.09, 'm2', 0.8, 7)}
{layer(0.0, 1.00, 'm1', 0.9, 4)}
  <g mask="url(#m1)">
    <ellipse cx="{CX}" cy="{CY}" rx="{RX+11}" ry="{RY+11}" fill="none" stroke="#FAF6EE" stroke-width="26"/>
  </g>
  <ellipse cx="{CX}" cy="{CY}" rx="{RX+2}" ry="{RY+2}" fill="none" stroke="#B0A18C" stroke-width="8" stroke-opacity="0.3"/>
</g>
</svg>
'''
open('docs/artifacts/assets/lace-frill.svg', 'w').write(svg)
print('✓ lace-frill.svg', len(svg), 'bytes')
