// 사진 뷰어(디자인 논의 T103~T105 · T122). 타일을 누른 사진부터 Swiper로 봅니다. 열려 있을 때만 그려 initialSlide가 먹습니다.
// 사진은 흰 테두리 인화지에 위 가운데 테이프, 장수는 슬라이드 밖 아래 가운데 고정, 화살표는 우리 단추를 Swiper에 넘깁니다
import { Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import gallery from "@/content/gallery.json";

export function GalleryViewer({
  ref,
  open,
  initialIndex,
  index,
  onIndexChange,
  onClose,
}: {
  ref: React.Ref<HTMLDivElement>;
  open: boolean;
  initialIndex: number;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="gallery-viewer" id="galleryViewer" ref={ref} role="dialog" aria-modal="true" aria-label="사진첩" hidden={!open}>
      {open && (
        <Swiper
          className="gallery-viewer__swiper"
          modules={[Navigation, Keyboard]}
          navigation={{ prevEl: "#galleryPrev", nextEl: "#galleryNext" }}
          keyboard={{ enabled: true }}
          initialSlide={initialIndex}
          lazyPreloadPrevNext={2}
          onSlideChange={(s) => onIndexChange(s.activeIndex)}
        >
          {gallery.map((item, i) => (
            <SwiperSlide key={item.id}>
              <figure className="gallery-viewer__print" style={{ "--ar": `${item.width} / ${item.height}` } as React.CSSProperties}>
                <img className="gallery-viewer__img" src={`/gallery/${item.id}.jpg`} width={item.width} height={item.height} alt={`사진 ${i + 1}`} loading="lazy" />
                <img className="gallery-viewer__tape" src="/paper/tape-short.png" alt="" />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="gallery-viewer__count" aria-live="polite">
        {index + 1} / {gallery.length}
      </div>
      <button type="button" className="gallery-viewer__nav gallery-viewer__nav--prev" id="galleryPrev" aria-label="이전 사진">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M13.5 5.5L8 11l5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className="gallery-viewer__nav gallery-viewer__nav--next" id="galleryNext" aria-label="다음 사진">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M8.5 5.5L14 11l-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button type="button" className="gallery-viewer__close" aria-label="닫기" onClick={onClose}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M6 6l10 10M16 6L6 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
