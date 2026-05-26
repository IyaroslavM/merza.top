import React from 'react';

export const musicCss = `
  .music-wrap{
    position:fixed;bottom:max(22px,calc(env(safe-area-inset-bottom) + 8px));left:50%;transform:translateX(-50%);
    z-index:10;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none;
  }
  .music-btn{pointer-events:auto}
  .music-hint{
    font-family:'IBM Plex Mono',ui-monospace,monospace;
    font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;
    color:#fff;white-space:nowrap;pointer-events:none;
    background:rgba(0,0,0,0.62);
    -webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);
    border-radius:99px;padding:4px 12px;
    border:1px solid rgba(255,255,255,0.12);
    animation:hint-pulse 2s ease-in-out infinite;
  }
  @keyframes hint-pulse{0%,100%{opacity:.45}50%{opacity:1}}
  .music-btn{
    width:38px;height:38px;border-radius:999px;
    border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);
    color:rgba(255,255,255,.7);
    -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
    cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;
    transition:background .25s,border-color .25s,color .25s,transform .2s;
    padding:0;
  }
  .music-btn:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.45);color:#fff;transform:scale(1.08)}
  .music-btn.pulse{border-color:rgba(255,255,255,.55);animation:btn-pulse 2s ease-in-out infinite}
  @keyframes btn-pulse{0%,100%{box-shadow:0 0 0 0 rgba(255,255,255,0)}50%{box-shadow:0 0 0 5px rgba(255,255,255,.1)}}
  .music-bars{display:none;align-items:flex-end;gap:2px;height:12px}
  .music-btn.on .music-bars{display:flex}
  .music-btn.on svg{display:none}
  .music-bars i{display:block;width:2.5px;border-radius:2px;background:currentColor;
    transform-origin:center bottom;animation:bar-bounce 1s ease-in-out infinite alternate}
  .music-bars i:nth-child(1){height:8px;animation-delay:0s}
  .music-bars i:nth-child(2){height:11px;animation-delay:.15s}
  .music-bars i:nth-child(3){height:9px;animation-delay:.3s}
  .music-bars i:nth-child(4){height:7px;animation-delay:.08s}
  @keyframes bar-bounce{0%{transform:scaleY(.5);opacity:.6}100%{transform:scaleY(1);opacity:1}}
  .music-btn:focus-visible{outline:2px solid rgba(255,255,255,0.9);outline-offset:3px}
`;

export function MusicButton({ playing, blocked, onClick }) {
  return (
    <div className="music-wrap">
      {playing && (
        <span className="music-hint" style={{ animation: 'none', opacity: 0.72 }}>▷ lo-fi ambient · ∞</span>
      )}
      {blocked && !playing && (
        <span className="music-hint">click anywhere to start music</span>
      )}
      <button
        className={"music-btn" + (playing ? " on" : "") + (blocked ? " pulse" : "")}
        onClick={onClick}
        aria-label={playing ? "Pause ambient music" : "Play ambient music"}
        title={playing ? "Pause music" : "Play ambient music"}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 2.5L11.5 7L3 11.5V2.5Z" fill="currentColor"/>
        </svg>
        <span className="music-bars" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
      </button>
    </div>
  );
}
