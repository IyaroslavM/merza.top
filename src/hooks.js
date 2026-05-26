import { useState, useEffect, useRef, useCallback } from 'react';

export function useTweaks(defaults) {
  const [values, setValues] = useState(defaults);
  const setTweak = useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

export function useViewport() {
  const [v, setV] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1440,
    h: typeof window !== "undefined" ? window.innerHeight : 900
  }));
  useEffect(() => {
    let timer;
    const on = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setV({ w: window.innerWidth, h: window.innerHeight }), 100);
    };
    window.addEventListener("resize", on, { passive: true });
    return () => { window.removeEventListener("resize", on); clearTimeout(timer); };
  }, []);
  return { ...v, isMobile: v.w < 760, axis: v.w < 760 ? "h" : "v" };
}

export function useSplit({ axis, mode, hover, taken, motion }) {
  let target = 0.5;
  if (taken === "y") target = 1.0;
  else if (taken === "k") target = 0.0;
  else if (motion !== "off") {
    if (hover === "y") target = 0.74;
    if (hover === "k") target = 0.26;
  }
  if (motion === "off" && !taken) target = 0.5;

  const [pos, setPos] = useState(0.5);
  const posRef = useRef(0.5);
  const targetRef = useRef(target);
  const rafRef = useRef(null);
  targetRef.current = target;

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    const tick = () => {
      const cur = posRef.current;
      const next = cur + (targetRef.current - cur) * 0.12;
      if (Math.abs(next - cur) > 0.0005) {
        posRef.current = next;
        setPos(next);
        rafRef.current = requestAnimationFrame(tick);
      } else if (posRef.current !== targetRef.current) {
        posRef.current = targetRef.current;
        setPos(targetRef.current);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); rafRef.current = null; };
  }, [target]);

  return pos;
}

export function useFocusTrap(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prev = document.activeElement;
    const getFocusable = () => [...el.querySelectorAll(
      'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'
    )];
    const items = getFocusable();
    if (items[0]) items[0].focus();
    const onKey = (e) => {
      if (e.key !== 'Tab') return;
      const list = getFocusable();
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    el.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('keydown', onKey);
      if (prev && typeof prev.focus === 'function') prev.focus();
    };
  }, [ref]);
}
