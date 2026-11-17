document.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('setup-svg');
  const clickableItems = document.querySelectorAll('.clickable-item');
  const tooltip = document.getElementById('hover-tooltip');
  const modal = document.getElementById('pointed-modal');
  const modalArrow = document.getElementById('modal-arrow');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalPartId = document.getElementById('modal-part-id');
  const modalCategory = document.getElementById('modal-category');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');
  const btnXray = document.getElementById('btn-xray');
  const btnLighting = document.getElementById('btn-lighting');
  const hudHomeBtn = document.getElementById('hud-home-btn');
  const discoveryCounter = document.getElementById('discovery-counter');
  const mainScreenTitle = document.getElementById('main-screen-title');

  const TOTAL_ITEMS = 16;
  const discovered = new Set();

  let activeItemId = null;
  let activeElement = null;
  let lastClickClientPoint = null;
  let activeProjectIdx = 0;
  let activeUcsdTab = 'degree';
  let activeSpotifyIdx = 0;

  /* ================= CONTENT SOURCE (content.js) ================= */
  const siteContent = window.SITE_CONTENT || {};

  function getProjects() {
    return Array.isArray(siteContent.projects) ? siteContent.projects : [];
  }

  function getSpotifyTracks() {
    return siteContent.djMode && Array.isArray(siteContent.djMode.spotifyTracks)
      ? siteContent.djMode.spotifyTracks
      : [];
  }

  function getItemData(id) {
    return (siteContent.items && siteContent.items[id]) || {};
  }

  function escapeAttr(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ================= APPLY SITE_CONTENT TO SVG & HUD ================= */
  function applySiteContentToScene() {
    const hud = siteContent.hud || {};
    if (hud.pageTitle) document.title = hud.pageTitle;

    const hudNameEl = document.getElementById('hud-name-text');
    const hudRoleEl = document.getElementById('hud-role-text');
    const hudHintEl = document.getElementById('hud-hint-text');
    if (hudNameEl && hud.name !== undefined) hudNameEl.textContent = hud.name;
    if (hudRoleEl && hud.role !== undefined) hudRoleEl.textContent = hud.role;
    if (hudHintEl && hud.hint !== undefined) hudHintEl.textContent = hud.hint;

    const scr = siteContent.screens || {};
    const mainBadgeEl = document.getElementById('main-screen-badge');
    const mainBtnEl = document.getElementById('main-screen-btn-label');
    const vertPromptEl = document.getElementById('vert-screen-prompt');
    const vertHeadingEl = document.getElementById('vert-screen-heading');
    if (mainBadgeEl && scr.mainBadge !== undefined) mainBadgeEl.textContent = scr.mainBadge;
    if (mainBtnEl && scr.mainButton !== undefined) mainBtnEl.textContent = scr.mainButton;
    if (vertPromptEl && scr.vertPrompt !== undefined) vertPromptEl.textContent = scr.vertPrompt;
    if (vertHeadingEl && scr.vertHeading !== undefined) vertHeadingEl.textContent = scr.vertHeading;

    const bullets = Array.isArray(scr.vertBullets) ? scr.vertBullets : [];
    for (let i = 0; i < 4; i++) {
      const bEl = document.getElementById(`vert-screen-b${i}`);
      if (bEl) bEl.textContent = bullets[i] ?? '';
    }

    const projs = getProjects();
    if (mainScreenTitle && projs[activeProjectIdx]) {
      mainScreenTitle.textContent = projs[activeProjectIdx].screenLabel || '';
    }

    clickableItems.forEach((el) => {
      const id = el.dataset.id;
      const d = getItemData(id);
      if (d && d.hoverLabel !== undefined) {
        el.dataset.label = d.hoverLabel;
      }
    });
  }

  /* ================= GENERIC & SPECIALIZED MODAL RENDERERS ================= */
  function renderStandardCard(id) {
    const d = getItemData(id);
    let badgeHtml = '';
    if (d.avatar) {
      badgeHtml = `<img src="${escapeAttr(d.avatar)}" alt="${escapeAttr(d.title)}" class="blurb-avatar" />`;
    } else if (d.logo) {
      badgeHtml = `<img src="${escapeAttr(d.logo)}" alt="${escapeAttr(d.title)}" class="blurb-logo" />`;
    } else if (d.icon) {
      const colorStyle = d.iconColor ? ` style="color:${escapeAttr(d.iconColor)};"` : '';
      badgeHtml = `<div class="blurb-icon-badge"${colorStyle}>${d.icon}</div>`;
    }

    const subtitleHtml =
      d.subtitle && d.subtitle.trim()
        ? `<div class="blurb-subtitle">${d.subtitle}</div>`
        : '';

    const tags = Array.isArray(d.tags) ? d.tags.filter((t) => String(t).trim()) : [];
    const tagsHtml = tags.length
      ? `<div class="spec-tags">${tags.map((t) => `<span class="spec-tag">${t}</span>`).join('')}</div>`
      : '';

    const links = Array.isArray(d.links) ? d.links.filter((l) => l && l.url) : [];
    const linksHtml = links.length
      ? `<div class="blurb-actions">${links
          .map((l) => {
            const isMail = String(l.url).startsWith('mailto:');
            const targetAttrs = isMail ? '' : ' target="_blank" rel="noopener"';
            const cls = l.primary ? 'action-btn primary' : 'action-btn';
            return `<a href="${escapeAttr(l.url)}"${targetAttrs} class="${cls}">${l.label || l.url}</a>`;
          })
          .join('')}</div>`
      : '';

    return `
      <div class="blurb-header">
        ${badgeHtml}
        <div>
          <h2 id="modal-title" class="blurb-title">${d.title || ''}</h2>
          ${subtitleHtml}
        </div>
      </div>
      <p class="blurb-body">${d.body || ''}</p>
      ${tagsHtml}
      ${linksHtml}
    `;
  }

  const itemConfigs = {
    gavin: {
      preferredSide: 'right',
      anchorSvg: { x: 630, y: 422 },
      render: () => renderStandardCard('gavin')
    },
    google: {
      preferredSide: 'bottom',
      anchorSvg: { x: 600, y: 118 },
      render: () => renderStandardCard('google')
    },
    cadence: {
      preferredSide: 'bottom',
      anchorSvg: { x: 456, y: 216 },
      render: () => renderStandardCard('cadence')
    },
    spglobal: {
      preferredSide: 'bottom',
      anchorSvg: { x: 600, y: 216 },
      render: () => renderStandardCard('spglobal')
    },
    playstation: {
      preferredSide: 'bottom',
      anchorSvg: { x: 744, y: 216 },
      render: () => renderStandardCard('playstation')
    },
    ucsd: {
      preferredSide: 'right',
      anchorSvg: { x: 412, y: 292 },
      render: () => {
        const vm = siteContent.vertMonitorTabs || {};
        const isDegree = activeUcsdTab === 'degree';
        const roles = Array.isArray(vm.campusRoles) ? vm.campusRoles : [];
        return `
          <div class="subtab-strip">
            <button type="button" class="subtab-btn ${isDegree ? 'active' : ''}" data-ucsd-tab="degree">${vm.ucsdTabLabel || 'UC San Diego'}</button>
            <button type="button" class="subtab-btn ${!isDegree ? 'active' : ''}" data-ucsd-tab="campus">${vm.campusTabLabel || 'UCSD / Startups / IT'}</button>
          </div>
          ${
            isDegree
              ? renderStandardCard('ucsd')
              : `
            <h2 id="modal-title" class="blurb-title">${vm.campusTitle || ''}</h2>
            <div class="mini-role-list">
              ${roles
                .map(
                  (r) => `
                <div class="mini-role-card">
                  <img src="${escapeAttr(r.img)}" alt="${escapeAttr(r.title)}" />
                  <div>
                    <h4>${r.title || ''}</h4>
                    <p>${r.desc || ''}</p>
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          `
          }
        `;
      }
    },
    mainMonitor: {
      preferredSide: 'right',
      anchorSvg: { x: 706, y: 356 },
      render: () => {
        const projs = getProjects();
        if (!projs.length) return '<p class="blurb-body">No projects configured.</p>';
        const safeIdx = Math.min(activeProjectIdx, projs.length - 1);
        const p = projs[safeIdx];
        const tabs = projs
          .map(
            (proj, i) =>
              `<button type="button" class="subtab-btn ${i === safeIdx ? 'active' : ''}" data-proj-idx="${i}">${proj.short}</button>`
          )
          .join('');
        const actionHtml =
          p.link && String(p.link).trim()
            ? `<div class="blurb-actions"><a href="${escapeAttr(p.link)}" target="_blank" rel="noopener" class="action-btn primary">${p.linkText || 'Open Project'}</a></div>`
            : '';
        const tags = Array.isArray(p.tags) ? p.tags.filter((t) => String(t).trim()) : [];
        return `
          <div class="subtab-strip">${tabs}</div>
          <img src="${escapeAttr(p.img)}" alt="${escapeAttr(p.title)}" class="project-preview-img" />
          <h2 id="modal-title" class="blurb-title">${p.title || ''}</h2>
          <p class="blurb-body" style="margin-top:6px;">${p.desc || ''}</p>
          <div class="spec-tags">
            ${tags.map((t) => `<span class="spec-tag">${t}</span>`).join('')}
          </div>
          ${actionHtml}
        `;
      }
    },
    vertMonitor: {
      preferredSide: 'left',
      anchorSvg: { x: 716, y: 348 },
      render: () => {
        const vm = siteContent.vertMonitorTabs || {};
        const stackTags = Array.isArray(vm.stackTags) ? vm.stackTags.filter((t) => String(t).trim()) : [];
        return `
          <h2 id="modal-title" class="blurb-title" style="margin-bottom:8px;">${vm.stackTitle || ''}</h2>
          <p class="blurb-body">${vm.stackBody || ''}</p>
          <div class="spec-tags">
            ${stackTags.map((t) => `<span class="spec-tag">${t}</span>`).join('')}
          </div>
        `;
      }
    },
    speakers: {
      preferredSide: 'top',
      anchorSvg: null,
      render: () => {
        const d = getItemData('speakers');
        const tracks = getSpotifyTracks();
        const safeIdx = tracks.length ? Math.min(activeSpotifyIdx, tracks.length - 1) : 0;
        const track = tracks[safeIdx];
        const subtitleHtml =
          d.subtitle && d.subtitle.trim()
            ? `<div class="blurb-subtitle">${d.subtitle}</div>`
            : '';

        return `
          <div class="blurb-header">
            <div class="blurb-icon-badge">${d.icon || '🔊'}</div>
            <div>
              <h2 id="modal-title" class="blurb-title">${d.title || ''}</h2>
              ${subtitleHtml}
            </div>
          </div>
          <p class="blurb-body">${d.body || ''}</p>
          ${
            track
              ? `
            <div class="subtab-strip" style="margin-bottom:4px;">
              ${tracks
                .map(
                  (t, idx) =>
                    `<button type="button" class="subtab-btn ${idx === safeIdx ? 'active' : ''}" data-track-idx="${idx}">${t.label}</button>`
                )
                .join('')}
            </div>
            <iframe
              class="spotify-mini-embed"
              src="https://open.spotify.com/embed/track/${escapeAttr(track.id)}?utm_source=generator&theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          `
              : ''
          }
        `;
      }
    },
    pc: {
      preferredSide: 'right',
      anchorSvg: { x: 326, y: 378 },
      render: () => renderStandardCard('pc')
    },
    keyboard: {
      preferredSide: 'top',
      anchorSvg: { x: 578, y: 465 },
      render: () => renderStandardCard('keyboard')
    },
    mouse: {
      preferredSide: 'top',
      anchorSvg: { x: 710, y: 466 },
      render: () => renderStandardCard('mouse')
    },
    desk: {
      preferredSide: 'top',
      anchorSvg: null,
      render: () => renderStandardCard('desk')
    },
    slab: {
      preferredSide: 'top',
      anchorSvg: { x: 938, y: 428 },
      render: () => renderStandardCard('slab')
    },
    gr86: {
      preferredSide: 'top',
      anchorSvg: { x: 984, y: 464 },
      render: () => renderStandardCard('gr86')
    },
    chair: {
      preferredSide: 'right',
      anchorSvg: { x: 642, y: 534 },
      render: () => renderStandardCard('chair')
    }
  };

  /* ================= COORDINATE & POINTED MODAL POSITIONING ================= */
  function svgToScreen(svgX, svgY) {
    const pt = svg.createSVGPoint();
    pt.x = svgX;
    pt.y = svgY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const transformed = pt.matrixTransform(ctm);
    return { x: transformed.x, y: transformed.y };
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function getTargetScreenPoint(id, element) {
    const cfg = itemConfigs[id];
    if (id === 'desk' && lastClickClientPoint) {
      return lastClickClientPoint;
    }
    if (cfg && cfg.anchorSvg) {
      return svgToScreen(cfg.anchorSvg.x, cfg.anchorSvg.y);
    }
    if (element) {
      const rect = element.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + 8
      };
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }

  function updateResponsiveViewBox() {
    const vw = window.innerWidth;
    const isMobile = vw <= 680;
    const isZoomed = document.body.classList.contains('mobile-zoomed');

    if (!isMobile) {
      svg.setAttribute('viewBox', '120 -12 960 724');
    } else if (isZoomed) {
      svg.setAttribute('viewBox', '130 -24 940 740');
    } else if (!modal.hidden && activeItemId) {
      svg.setAttribute('viewBox', '136 -20 928 1340');
    } else {
      svg.setAttribute('viewBox', '136 -36 928 756');
    }
  }

  function positionPointedModal() {
    if (modal.hidden || !activeItemId) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vw <= 680) {
      modal.dataset.side = 'sheet';
      modal.style.left = '';
      modal.style.top = '';
      modalArrow.style.left = '';
      modalArrow.style.top = '';
      return;
    }

    const cfg = itemConfigs[activeItemId];
    const target = getTargetScreenPoint(activeItemId, activeElement);
    const margin = 14;
    const gap = 16;

    modalArrow.style.left = '';
    modalArrow.style.top = '';

    const rect = modal.getBoundingClientRect();
    const mw = rect.width;
    const mh = rect.height;

    let side = cfg.preferredSide || 'bottom';

    if (vw < 720 && (side === 'left' || side === 'right')) {
      side = target.y > vh * 0.52 ? 'top' : 'bottom';
    } else if (side === 'right' && target.x + gap + mw > vw - margin) {
      side = target.x - gap - mw >= margin ? 'left' : target.y > vh * 0.5 ? 'top' : 'bottom';
    } else if (side === 'left' && target.x - gap - mw < margin) {
      side = target.x + gap + mw <= vw - margin ? 'right' : target.y > vh * 0.5 ? 'top' : 'bottom';
    } else if (side === 'bottom' && target.y + gap + mh > vh - margin && target.y - gap - mh >= margin) {
      side = 'top';
    } else if (side === 'top' && target.y - gap - mh < margin && target.y + gap + mh <= vh - margin) {
      side = 'bottom';
    }

    modal.dataset.side = side;

    let left = 0;
    let top = 0;

    if (side === 'bottom') {
      top = clamp(target.y + gap, margin, Math.max(margin, vh - mh - margin));
      left = clamp(target.x - mw / 2, margin, Math.max(margin, vw - mw - margin));
      const arrowX = clamp(target.x - left - 8, 18, mw - 34);
      modalArrow.style.left = `${arrowX}px`;
    } else if (side === 'top') {
      top = clamp(target.y - mh - gap, margin, Math.max(margin, vh - mh - margin));
      left = clamp(target.x - mw / 2, margin, Math.max(margin, vw - mw - margin));
      const arrowX = clamp(target.x - left - 8, 18, mw - 34);
      modalArrow.style.left = `${arrowX}px`;
    } else if (side === 'right') {
      left = clamp(target.x + gap, margin, Math.max(margin, vw - mw - margin));
      top = clamp(target.y - mh / 2, margin, Math.max(margin, vh - mh - margin));
      const arrowY = clamp(target.y - top - 8, 18, mh - 34);
      modalArrow.style.top = `${arrowY}px`;
    } else if (side === 'left') {
      left = clamp(target.x - mw - gap, margin, Math.max(margin, vw - mw - margin));
      top = clamp(target.y - mh / 2, margin, Math.max(margin, vh - mh - margin));
      const arrowY = clamp(target.y - top - 8, 18, mh - 34);
      modalArrow.style.top = `${arrowY}px`;
    }

    modal.style.left = `${Math.round(left)}px`;
    modal.style.top = `${Math.round(top)}px`;
  }

  /* ================= OPEN / RENDER / CLOSE MODAL ================= */
  function bindDynamicModalControls() {
    modalContent.querySelectorAll('[data-proj-idx]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        setActiveProjectSlide(Number(btn.dataset.projIdx));
        renderModalBody();
      });
    });

    modalContent.querySelectorAll('[data-ucsd-tab]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        activeUcsdTab = btn.dataset.ucsdTab;
        renderModalBody();
      });
    });

    modalContent.querySelectorAll('[data-track-idx]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        activeSpotifyIdx = Number(btn.dataset.trackIdx);
        renderModalBody();
      });
    });
  }

  function renderModalBody() {
    if (!activeItemId || !itemConfigs[activeItemId]) return;
    const cfg = itemConfigs[activeItemId];
    const d = getItemData(activeItemId);
    modalPartId.hidden = !d.partId;
    modalPartId.textContent = d.partId || '';
    modalCategory.textContent = d.category || '';
    modalContent.innerHTML = cfg.render();
    bindDynamicModalControls();
    requestAnimationFrame(positionPointedModal);
  }

  function openItemModal(id, element, clickEvent) {
    if (!itemConfigs[id]) return;

    activeItemId = id;
    activeElement = element;
    if (clickEvent && typeof clickEvent.clientX === 'number') {
      lastClickClientPoint = { x: clickEvent.clientX, y: clickEvent.clientY };
    }

    discovered.add(id);
    discoveryCounter.textContent = `${discovered.size} / ${TOTAL_ITEMS}`;

    clickableItems.forEach((el) => {
      el.classList.toggle('is-selected', el === element);
    });

    tooltip.classList.remove('visible');
    modalBackdrop.hidden = false;
    modal.hidden = false;

    updateResponsiveViewBox();
    renderModalBody();
  }

  function closeModal() {
    modal.hidden = true;
    modalBackdrop.hidden = true;
    activeItemId = null;
    activeElement = null;
    clickableItems.forEach((el) => el.classList.remove('is-selected'));
    updateResponsiveViewBox();
  }

  /* ================= LIGHTING & X-RAY MODES ================= */
  function updateLightingButtonLabel() {
    const isNight = document.body.classList.contains('night-mode');
    btnLighting.classList.toggle('active', isNight);
    btnLighting.title = isNight ? 'Switch to light mode' : 'Switch to dark mode';
    btnLighting.setAttribute('aria-label', btnLighting.title);
  }

  btnLighting.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
    updateLightingButtonLabel();
  });

  btnXray.addEventListener('click', () => {
    const active = document.body.classList.toggle('xray-active');
    btnXray.classList.toggle('active', active);
  });

  hudHomeBtn.addEventListener('click', () => {
    const gavinEl = document.querySelector('.clickable-item[data-id="gavin"]');
    openItemModal('gavin', gavinEl, null);
  });

  /* ================= INTERACTION LISTENERS ================= */
  clickableItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const label = item.dataset.label;
      if (label) {
        tooltip.textContent = label;
        tooltip.classList.add('visible');
      }
    });

    item.addEventListener('mousemove', (e) => {
      tooltip.style.left = `${e.clientX}px`;
      tooltip.style.top = `${e.clientY}px`;
    });

    item.addEventListener('mouseleave', () => {
      tooltip.classList.remove('visible');
    });

    item.addEventListener('click', (e) => {
      e.stopPropagation();
      openItemModal(item.dataset.id, item, e);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openItemModal(item.dataset.id, item, null);
      }
    });
  });

  modalClose.addEventListener('click', closeModal);

  document.addEventListener('click', (e) => {
    if (
      !modal.hidden &&
      !modal.contains(e.target) &&
      !e.target.closest('.clickable-item') &&
      !e.target.closest('.hud-bar')
    ) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 780 && document.body.classList.contains('mobile-zoomed')) {
      document.body.classList.remove('mobile-zoomed');
      const zoomBtn = document.getElementById('btn-mobile-zoom');
      if (zoomBtn) {
        zoomBtn.textContent = '🔍 Zoom';
        zoomBtn.classList.remove('active');
      }
    }
    updateResponsiveViewBox();
    if (!modal.hidden) positionPointedModal();
  });

  const btnMobileZoom = document.getElementById('btn-mobile-zoom');
  const stageEl = document.getElementById('stage');
  if (btnMobileZoom && stageEl) {
    btnMobileZoom.addEventListener('click', () => {
      const zoomed = document.body.classList.toggle('mobile-zoomed');
      btnMobileZoom.textContent = zoomed ? '⤢ Fit' : '🔍 Zoom';
      btnMobileZoom.classList.toggle('active', zoomed);
      updateResponsiveViewBox();
      if (zoomed) {
        requestAnimationFrame(() => {
          stageEl.scrollLeft = (stageEl.scrollWidth - stageEl.clientWidth) / 2;
        });
      }
    });
  }

  /* ================= MAIN MONITOR PROJECT SVG SLIDESHOW ================= */
  const slideTrack = document.getElementById('main-slide-track');
  const slideDots = Array.from(document.querySelectorAll('[data-slide-dot]'));

  function setActiveProjectSlide(idx) {
    const projs = getProjects();
    if (!projs.length) return;
    activeProjectIdx = ((idx % projs.length) + projs.length) % projs.length;
    if (mainScreenTitle) {
      mainScreenTitle.textContent = projs[activeProjectIdx].screenLabel || '';
    }
    if (slideTrack) {
      slideTrack.style.transform = `translateX(${-activeProjectIdx * 150}px)`;
    }
    slideDots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === activeProjectIdx);
    });
  }

  if (slideTrack) {
    setInterval(() => {
      if (activeItemId !== 'mainMonitor') {
        setActiveProjectSlide(activeProjectIdx + 1);
      }
    }, 2600);
  }

  /* ================= INITIAL HYDRATION ================= */
  updateResponsiveViewBox();
  applySiteContentToScene();
});
