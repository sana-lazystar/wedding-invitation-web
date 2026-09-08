"use client";

// 청첩장 한 쪽. 마크업은 조립본 docs/artifacts/index.html과 1:1이고 이미지 경로만 다릅니다(조립본 ../../public/…, 여기 /…).
// 이 파일은 조립만 합니다. 장면은 components/scenes, 덮개는 components/viewers, 늘 떠 있는 것은 components/ui,
// 움직임 · 상태는 hooks, 값은 content, 바깥 것을 다루는 도구는 lib에 있습니다(WIW-5).
// 훅을 부르는 순서가 곧 효과 순서입니다. 화면 높이 고정(--vh-fixed)이 먼저 서야 커버 · 마지막 장면의 치수 계산이 맞습니다.
import { IntroScene } from "@/components/IntroScene";
import { ClosingScene } from "@/components/scenes/ClosingScene";
import { ComicScene } from "@/components/scenes/ComicScene";
import { CoverScene } from "@/components/scenes/CoverScene";
import { DirectionsScene } from "@/components/scenes/DirectionsScene";
import { GalleryScene } from "@/components/scenes/GalleryScene";
import { GiftScene } from "@/components/scenes/GiftScene";
import { GreetingScene } from "@/components/scenes/GreetingScene";
import { GuideScene } from "@/components/scenes/GuideScene";
import { InfoScene } from "@/components/scenes/InfoScene";
import { InviteScene } from "@/components/scenes/InviteScene";
import { Part1BrideScene } from "@/components/scenes/Part1BrideScene";
import { Part1GroomScene } from "@/components/scenes/Part1GroomScene";
import { Part2BrideScene } from "@/components/scenes/Part2BrideScene";
import { Part2GroomScene } from "@/components/scenes/Part2GroomScene";
import { Part3Scene } from "@/components/scenes/Part3Scene";
import { FabMenu } from "@/components/ui/FabMenu";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { Toast } from "@/components/ui/Toast";
import { ComicViewer } from "@/components/viewers/ComicViewer";
import { GalleryViewer } from "@/components/viewers/GalleryViewer";
import { useClosingScene } from "@/hooks/useClosingScene";
import { useIntro } from "@/hooks/useIntro";
import { useKakaoMap } from "@/hooks/useKakaoMap";
import { useNoteReveal } from "@/hooks/useNoteReveal";
import { useToast } from "@/hooks/useToast";
import { useViewer } from "@/hooks/useViewer";
import { useViewportLock } from "@/hooks/useViewportLock";

export default function Home() {
  useViewportLock();
  const { introDone, coverRef } = useIntro();
  const { mapRef, mapReady, mapFailed } = useKakaoMap();
  const closingRef = useClosingScene();
  useNoteReveal();
  const { viewer, galleryIndex, setGalleryIndex, openComic, openGallery, closeViewer, comicViewerRef, galleryViewerRef } = useViewer();
  const { toast, toastShown, copy } = useToast();

  return (
    <>
      {!introDone && <IntroScene />}

      <div className="page">
        <CoverScene ref={coverRef} />
        <InfoScene />
        <GreetingScene />
        <Part1GroomScene />
        <Part1BrideScene />
        <Part2GroomScene />
        <Part2BrideScene />
        <Part3Scene />
        <InviteScene />
        <ComicScene onOpen={openComic} />
        <GalleryScene onOpen={openGallery} />
        <DirectionsScene mapRef={mapRef} mapReady={mapReady} mapFailed={mapFailed} onCopy={copy} />
        <GuideScene />
        <GiftScene onCopy={copy} />
        <ClosingScene ref={closingRef} />
      </div>

      <ComicViewer ref={comicViewerRef} open={viewer?.kind === "comic"} onClose={closeViewer} />
      <GalleryViewer
        ref={galleryViewerRef}
        open={viewer?.kind === "gallery"}
        initialIndex={viewer?.kind === "gallery" ? viewer.index : 0}
        index={galleryIndex}
        onIndexChange={setGalleryIndex}
        onClose={closeViewer}
      />
      <Toast text={toast} shown={toastShown} />
      <FabMenu onCopy={copy} />
      <MusicToggle />
    </>
  );
}
