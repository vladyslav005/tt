import {useCallback, useEffect, useMemo, useState} from "react";

export interface UseFullscreenOptions {
  /** Prefer element fullscreen on supporting browsers. */
  preferNative?: boolean;
}

/**
 * Mobile-friendly fullscreen helper.
 *
 * Why this exists:
 * - iOS Safari has spotty/partial support for the Fullscreen API.
 * - Even where supported, it may require user gesture and can fail silently.
 *
 * Strategy:
 * - Try native Fullscreen API when available.
 * - If unavailable or it fails, fall back to a CSS-driven "pseudo fullscreen" mode.
 */
export function useFullscreen<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  {preferNative = true}: UseFullscreenOptions = {},
) {
  const [isPseudoFullscreen, setIsPseudoFullscreen] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  const canNative = useMemo(() => {
    if (!preferNative) return false;
    const el = ref.current as any;
    return !!(el && el.requestFullscreen && document.fullscreenEnabled);
  }, [preferNative, ref]);

  useEffect(() => {
    const onFsChange = () => {
      setIsNativeFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // Ensure we exit pseudo fullscreen on escape/back navigation scenarios
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsPseudoFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const enter = useCallback(async () => {
    if (canNative) {
      try {
        await (ref.current as any)?.requestFullscreen();
        return;
      } catch {
        // fall through to pseudo
      }
    }
    setIsPseudoFullscreen(true);
  }, [canNative, ref]);

  const exit = useCallback(async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
        return;
      } catch {
        // ignore and still drop pseudo
      }
    }
    setIsPseudoFullscreen(false);
  }, []);

  const toggle = useCallback(async () => {
    if (document.fullscreenElement || isPseudoFullscreen) {
      await exit();
    } else {
      await enter();
    }
  }, [enter, exit, isPseudoFullscreen]);

  return {
    isFullscreen: isNativeFullscreen || isPseudoFullscreen,
    isNativeFullscreen,
    isPseudoFullscreen,
    toggle,
    enter,
    exit,
  };
}

