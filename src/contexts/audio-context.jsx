// src/context/AudioContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

/** ---------- Types (JSDoc for IntelliSense) ----------
 * @typedef {{ useSoundEffects: boolean; useBackgroundAudio: boolean }} AudioState
 * @typedef {{
 *  setUseSoundEffects: (v:boolean)=>void;
 *  setUseBackgroundAudio: (v:boolean)=>void;
 *  toggleSoundEffects: ()=>void;
 *  toggleBackgroundAudio: ()=>void;
 *  setAll: (p:Partial<AudioState>)=>void;
 *  reset: ()=>void;
 * }} AudioActions
 * -----------------------------------------------------
 */

const STORAGE_KEY = "audio";

/* -------- Persistence helpers (SSR safe) -------- */
const canUseStorage = () => typeof window !== "undefined" && typeof localStorage !== "undefined";
const loadState = () => {
  if (!canUseStorage()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
const saveState = (s) => {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
};

/* --------------- Defaults ---------------- */
const DEFAULT_AUDIO_STATE = /** @type {AudioState} */ ({
  useSoundEffects: true,
  useBackgroundAudio: true,
});

/* --------------- Contexts ---------------- */
const AudioStateCtx = createContext(/** @type {AudioState|undefined} */(undefined));
const AudioActionsCtx = createContext(/** @type {AudioActions|undefined} */(undefined));

/* --------------- Provider ---------------- */
export function AudioProvider({ children }) {
  const [state, setState] = useState(() => {
    const stored = loadState();
    // Merge to keep new keys if you add more later
    return stored ? { ...DEFAULT_AUDIO_STATE, ...stored } : DEFAULT_AUDIO_STATE;
  });

  useEffect(() => { saveState(state); }, [state]);

  const stateValue = useMemo(() => state, [state]);

  const actionsValue = useMemo(() => ({
    setUseSoundEffects: (v) =>
      setState((s) => ({ ...s, useSoundEffects: Boolean(v) })),
    setUseBackgroundAudio: (v) =>
      setState((s) => ({ ...s, useBackgroundAudio: Boolean(v) })),
    toggleSoundEffects: () =>
      setState((s) => ({ ...s, useSoundEffects: !s.useSoundEffects })),
    toggleBackgroundAudio: () =>
      setState((s) => ({ ...s, useBackgroundAudio: !s.useBackgroundAudio })),
    setAll: (partial) =>
      setState((s) => ({ ...s, ...partial })),
    reset: () => setState(DEFAULT_AUDIO_STATE),
  }), []);

  return (
    <AudioStateCtx.Provider value={stateValue}>
      <AudioActionsCtx.Provider value={actionsValue}>
        {children}
      </AudioActionsCtx.Provider>
    </AudioStateCtx.Provider>
  );
}

/* --------------- Hooks ------------------- */
export function useAudioState() {
  const ctx = useContext(AudioStateCtx);
  if (!ctx) throw new Error("useAudioState must be used within <AudioProvider>");
  return ctx;
}

// export function useAudioActions() {
//   const ctx = useContext(AudioActionsCtx);
//   if (!ctx) throw new Error("useAudioActions must be used within <AudioProvider>");
//   return ctx;
// }

