"use client";

// 복사 알림(디자인 논의 T110). 1.6초 뒤 사라집니다. copy는 복사하고 결과에 맞는 알림을 띄웁니다
import { useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";

export function useToast() {
  const [toast, setToast] = useState("");
  const [toastShown, setToastShown] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = (text: string) => {
    setToast(text);
    setToastShown(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShown(false), 1600);
  };
  const copy = (text: string, message: string) => {
    copyText(text).then(
      () => showToast(message),
      () => showToast("복사하지 못했습니다. 길게 눌러 복사해 주세요"),
    );
  };

  return { toast, toastShown, showToast, copy };
}
