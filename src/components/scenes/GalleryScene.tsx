// 사진첩(11쪽 아래 절반, T103~T107 · T117). 흰 바탕에 고운바탕 제목과 3×3 타일
import gallery from "@/content/gallery.json";
// 사진첩(와이어프레임 11쪽 아래 절반, 디자인 논의 T103~T107). 가운데 제목 "사진첩", 3×3 타일. 앞 8장은 미리보기, 9번째 타일은 흐린 사진 위에 나머지 장수. 나무 틀 · 표지판(T104~T106)은 T107에 지웠습니다

// 매니페스트 순서가 표시 순서입니다. 앞 8장이 타일이고 9번째 타일은 나머지 장수(+N개)입니다(T103 · T104 · T121)
const GALLERY_PREVIEW = 8;
const galleryMore = gallery.length - GALLERY_PREVIEW;

export function GalleryScene({ onOpen }: { onOpen: (opener: HTMLElement, index: number) => void }) {
  return (
    <section id="gallery" className="block story plain">
      <h2 className="plain__title">사진첩</h2>
      <ul className="gallery__grid" id="galleryGrid">
        {gallery.slice(0, GALLERY_PREVIEW + 1).map((item, i) => {
          const more = i === GALLERY_PREVIEW;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={more ? "gallery__tile gallery__tile--more" : "gallery__tile"}
                data-index={i}
                aria-label={more ? `사진 ${i + 1}부터 크게 보기. ${galleryMore}장 더` : `사진 ${i + 1} 크게 보기`}
                onClick={(e) => onOpen(e.currentTarget, i)}
              >
                <img className="gallery__thumb" src={`/gallery/${item.id}-thumb.jpg`} width={480} height={480} alt="" loading="lazy" />
                {more && (
                  <span className="gallery__more" aria-hidden="true">
                    +{galleryMore}개
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
