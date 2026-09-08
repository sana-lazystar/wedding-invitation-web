"use client";

// 떠 있는 메뉴의 열림 상태. 바깥을 누르거나 Esc면 닫힙니다(디자인 논의 T132)
import { useEffect, useRef, useState } from "react";

export function useFabMenu() {
  const fabRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onDocumentClick = (e: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return { fabRef, menuOpen, setMenuOpen };
}
