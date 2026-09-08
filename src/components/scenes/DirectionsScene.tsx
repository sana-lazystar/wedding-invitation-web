// Scene11 오시는 길(12쪽, T110~T112 · T115 · T119). 종이 한 장에 식장 · 지도(카카오맵 JS SDK) · 지도 앱 링크 · 주차 · 지하철 · 버스
import { KAKAO_JS_KEY, VENUE } from "@/content/site";

export function DirectionsScene({ mapRef, mapReady, mapFailed, onCopy }: { mapRef: React.Ref<HTMLDivElement>; mapReady: boolean; mapFailed: boolean; onCopy: (text: string, message: string) => void }) {
  return (
    <section id="directions" className="block story">
      <div className="sheet">
        <div className="sheet__head">
          <img className="sheet__mark" src="/intro/rose-seal.png" width={84} height={84} alt="" />
          <h2 className="sheet__title">오시는 길</h2>
        </div>
        <div className="sheet__body">
          <div className="venue">
            <p className="venue__name">더채플앳청담 3층 커티지홀</p>
            <p className="venue__addr">{VENUE.address}</p>
          </div>
          <div className="map-paper">
            <div className="map-paper__inner">
              <div className="map-paper__map" ref={mapRef} role="img" aria-label="더채플앳청담 지도" aria-hidden={!mapReady} />
              {!mapReady && (
                <span className="map-paper__note">
                  {!KAKAO_JS_KEY ? "지도 (카카오맵 키를 등록하면 표시)" : mapFailed ? "지도를 불러오지 못했습니다. 아래 지도 앱으로 열어 주세요" : "지도를 불러오는 중"}
                </span>
              )}
            </div>
          </div>
          <div className="chips">
            <a className="chip" href={`https://map.naver.com/p/search/${VENUE.search}`} target="_blank" rel="noopener">
              네이버 지도
            </a>
            <a className="chip" href={`https://map.kakao.com/link/search/${VENUE.search}`} target="_blank" rel="noopener">
              카카오맵
            </a>
            <button type="button" className="chip" onClick={() => onCopy(VENUE.address, "주소를 복사했습니다")}>
              주소 복사
            </button>
          </div>
          <div className="route">
            <h3 className="sheet__label">주차</h3>
            <p className="route__text">주차는 웨딩홀 앞으로 오셔서 주차 직원의 안내를 받으신 후 이동해 주시기 바랍니다. 1시간 30분 무료 주차가 가능합니다.</p>
          </div>
          <div className="route">
            <h3 className="sheet__label">지하철</h3>
            <p className="route__text">
              <span className="line line--7">7호선</span>
              <span className="line line--bundang">수인분당선</span>강남구청역 3번 출구
              <br />
              <span className="line line--bundang">수인분당선</span>압구정로데오역 5번 출구
              <br />
              강남구청역에서 셔틀버스 10분 간격
            </p>
          </div>
          <div className="route">
            <h3 className="sheet__label">버스</h3>
            <p className="route__text">
              <span className="line line--trunk">간선</span>301, 342, 472
              <br />
              <span className="line line--branch">지선</span>3011, 4412
              <br />
              영동고교 앞 정류장 하차
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
