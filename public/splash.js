(()=>{
  const key = 'nexus-splash-last';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const now = Date.now();
  try {
    if (now - Number(sessionStorage.getItem(key) || 0) < 15 * 60 * 1000) return;
    sessionStorage.setItem(key, String(now));
  } catch {}

  const style = document.createElement('style');
  style.textContent = `
    #nexus-splash {
      position: fixed;
      inset: 0;
      z-index: 2147483640;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at 50% 42%, #291344 0%, #100a1d 46%, #07060d 100%);
      color: #f8f4ff;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      transition: opacity 0.4s ease, visibility 0.4s ease;
    }
    #nexus-splash.nexus-hide {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    #nexus-splash .nexus-center {
      text-align: center;
      padding: 28px;
      max-width: 380px;
      animation: nexus-appear 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    #nexus-splash img {
      width: 96px;
      height: 96px;
      object-fit: contain;
      filter: drop-shadow(0 0 24px #a855f7aa);
      animation: nexus-pulse 2s ease-in-out infinite alternate;
    }
    #nexus-splash h1 {
      font-size: 30px;
      font-weight: 800;
      letter-spacing: 0.1em;
      margin: 18px 0 4px;
      color: #f8f4ff;
    }
    #nexus-splash .nexus-present {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.38em;
      color: #c5b2d5;
      margin-top: 6px;
    }
    #nexus-splash h2 {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 0.2em;
      margin: 14px 0 8px;
      background: linear-gradient(135deg, #f3e8ff 0%, #d8b4fe 40%, #c084fc 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    #nexus-splash .nexus-motto {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.24em;
      color: #aaa0b6;
      text-transform: uppercase;
    }
    #nexus-splash .nexus-bar {
      width: 140px;
      height: 3px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 99px;
      margin: 18px auto 0;
      overflow: hidden;
      position: relative;
    }
    #nexus-splash .nexus-bar-fill {
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, #9333ea, #a855f7, #38bdf8);
      border-radius: 99px;
      animation: nexus-progress 1.5s ease-in-out forwards;
    }
    #nexus-splash button {
      position: absolute;
      bottom: max(24px, env(safe-area-inset-bottom, 24px));
      right: 24px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      color: #ddd;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      padding: 10px 18px;
      font: inherit;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
      min-height: 44px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    #nexus-splash button:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.4);
    }
    @keyframes nexus-appear {
      from { opacity: 0; transform: translateY(14px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes nexus-pulse {
      from { filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.4)); }
      to { filter: drop-shadow(0 0 28px rgba(168, 85, 247, 0.8)); }
    }
    @keyframes nexus-progress {
      0% { transform: translateX(-100%); }
      60% { transform: translateX(-15%); }
      100% { transform: translateX(0%); }
    }
    @media (prefers-reduced-motion: reduce) {
      #nexus-splash .nexus-center,
      #nexus-splash img,
      #nexus-splash .nexus-bar-fill { animation: none !important; }
      #nexus-splash { transition: none !important; }
    }
  `;
  document.head.appendChild(style);

  const show = () => {
    if (document.getElementById('nexus-splash')) return;
    const el = document.createElement('div');
    el.id = 'nexus-splash';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-label', 'Chase Nexus is starting');
    el.innerHTML = `
      <div class="nexus-center">
        <img src="/chase-studios-logo.svg" alt="Chase Studios logo">
        <h1>CHASE STUDIOS</h1>
        <div class="nexus-present">PRESENTS</div>
        <h2>CHASE NEXUS</h2>
        <div class="nexus-motto">CONNECT. CREATE. DISCOVER.</div>
        <div class="nexus-bar"><div class="nexus-bar-fill"></div></div>
      </div>
      <button type="button" aria-label="Skip introduction">Skip</button>
    `;
    document.body.appendChild(el);

    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      el.classList.add('nexus-hide');
      setTimeout(() => {
        try {
          el.remove();
          style.remove();
        } catch {}
      }, 450);
    };

    const btn = el.querySelector('button');
    if (btn) btn.addEventListener('click', close);
    setTimeout(close, reduce ? 350 : 1700);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', show, { once: true });
  } else {
    show();
  }
})();
