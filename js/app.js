(() => {
'use strict';


document.documentElement.classList.add('js');

if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* ---------- Config ---------- */

const BRAND = 'litestreamsite';
const DISCORD_URL = 'https://discord.gg/Rczuvm2S9A';
const MUX_JS_URL = 'https://cdn.jsdelivr.net/npm/mux.js@7.0.3/dist/mux.min.js';
const HERO_MS = 8000;

// Avatar ids are stored in profiles — never renumber them.
const PROFILE_PICS = [
    { id: 'avatar-1',  label: 'Lloyd',    url: 'images/avatars/lloyd.jpg' },
    { id: 'avatar-2',  label: 'Kai',      url: 'images/avatars/kai.jpg' },
    { id: 'avatar-3',  label: 'Jay',      url: 'images/avatars/jay.jpg' },
    { id: 'avatar-4',  label: 'Cole',     url: 'images/avatars/cole.jpg' },
    { id: 'avatar-5',  label: 'Zane',     url: 'images/avatars/zane.jpg' },
    { id: 'avatar-6',  label: 'Nya',      url: 'images/avatars/nya.jpg' },
    { id: 'avatar-7',  label: 'Arin',     url: 'images/avatars/arin.jpg' },
    { id: 'avatar-8',  label: 'Wyldfyre', url: 'images/avatars/wyldfyre.jpg' },
    { id: 'avatar-9',  label: 'Riyu',     url: 'images/avatars/riyu.jpg' },
    { id: 'avatar-10', label: 'Ras',      url: 'images/avatars/ras.jpg' },
    { id: 'avatar-11', label: 'Frak',     url: 'https://static.wikia.nocookie.net/ninjago/images/3/35/DRS3Part2FrakIB.png' },
    { id: 'avatar-12', label: 'DREAMZzz', url: 'images/avatars/dreamzzz.jpg' },
];

const DEFAULT_ACCENT = '#3D7EFF';
const THEME_PRESETS = [
    { name: 'Azure', color: '#3D7EFF' }, { name: 'Sky', color: '#38BDF8' }, { name: 'Indigo', color: '#6366F1' },
    { name: 'Violet', color: '#8B5CF6' }, { name: 'Pink', color: '#EC4899' }, { name: 'Red', color: '#EF4444' },
    { name: 'Orange', color: '#F97316' }, { name: 'Amber', color: '#F59E0B' }, { name: 'Green', color: '#22C55E' },
    { name: 'Teal', color: '#14B8A6' },
];
const TRANSLATE_LANGS = [
    { code: 'es', label: 'Spanish (AI)' }, { code: 'fr', label: 'French (AI)' }, { code: 'fi', label: 'Finnish (AI)' },
    { code: 'de', label: 'German (AI)' }, { code: 'pt', label: 'Portuguese (AI)' }, { code: 'ja', label: 'Japanese (AI)' },
    { code: 'ko', label: 'Korean (AI)' }, { code: 'zh', label: 'Chinese (AI)' }, { code: 'ar', label: 'Arabic (AI)' },
    { code: 'hi', label: 'Hindi (AI)' }, { code: 'da', label: 'Danish (AI)' },
];
const SUB_SIZES = [
    { id: 'sm', label: 'S', scale: 0.78 }, { id: 'md', label: 'M', scale: 1 },
    { id: 'lg', label: 'L', scale: 1.35 }, { id: 'xl', label: 'XL', scale: 1.7 },
];
const SUB_BGS = [{ id: 'solid', label: 'Solid' }, { id: 'soft', label: 'Soft' }, { id: 'none', label: 'None' }];
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const TV_RE = /(smart-?tv|tizen|web0s|webos|netcast|nettv|viera|aquos|bravia|roku|dtv|playstation|xbox|crkey|googletv|google tv|hbbtv|vidaa|hisense|sony.?tv)/i;

const svgIcon = (d, sw = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.5 5.2v13.6c0 .8.86 1.28 1.54.86l10.9-6.8a1 1 0 0 0 0-1.72L9.04 4.34A1 1 0 0 0 7.5 5.2z"/></svg>',
    plus: svgIcon('<path d="M12 5v14M5 12h14"/>', 2.4),
    check: svgIcon('<path d="M20 6 9 17l-5-5"/>', 2.6),
    info: svgIcon('<circle cx="12" cy="12" r="9.25"/><path d="M12 16.25V11.5M12 7.75h.01"/>'),
    share: svgIcon('<path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>'),
    chevL: svgIcon('<path d="m15 18-6-6 6-6"/>', 2.4),
    chevR: svgIcon('<path d="m9 18 6-6-6-6"/>', 2.4),
    chevD: svgIcon('<path d="m6 9 6 6 6-6"/>', 2.4),
    back: svgIcon('<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>', 2.4),
    x: svgIcon('<path d="M18 6 6 18M6 6l12 12"/>', 2.4),
    search: svgIcon('<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4.2-4.2"/>'),
    alert: svgIcon('<circle cx="12" cy="12" r="9.25"/><path d="M12 7.75v4.75M12 16.25h.01"/>'),
    layers: svgIcon('<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>'),
    download: svgIcon('<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>'),
    bookmark: svgIcon('<path d="M19 21l-7-4.5L5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>'),
    film: svgIcon('<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M7.5 3v18M16.5 3v18M3 12h18M3 7.5h4.5M3 16.5h4.5M16.5 16.5H21M16.5 7.5H21"/>'),
    refresh: svgIcon('<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/>'),
    clock: svgIcon('<circle cx="12" cy="12" r="9.25"/><path d="M12 7v5l3.2 2"/>'),
    external: svgIcon('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
    help: svgIcon('<circle cx="12" cy="12" r="9.25"/><path d="M9.2 9a2.9 2.9 0 0 1 5.6 1c0 2-2.8 2.6-2.8 4"/><path d="M12 17.25h.01"/>'),
    discord: '<svg viewBox="0 0 71 55" fill="currentColor" aria-hidden="true"><path d="M60.1 4.9A58.5 58.5 0 0045.4.2a.2.2 0 00-.2.1 40.8 40.8 0 00-1.8 3.7 54 54 0 00-16.2 0A37.4 37.4 0 0025.4.3a.2.2 0 00-.2-.1A58.4 58.4 0 0010.5 5 59.6 59.6 0 00.4 45a.3.3 0 00.1.2 58.8 58.8 0 0017.7 9 .2.2 0 00.3-.1 42 42 0 003.6-5.9.2.2 0 00-.1-.3 38.8 38.8 0 01-5.5-2.6.2.2 0 010-.4l1.1-.9a.2.2 0 01.2 0 42 42 0 0035.6 0 .2.2 0 01.2 0l1.1.9a.2.2 0 010 .3 36.4 36.4 0 01-5.5 2.7.2.2 0 00-.1.3 47.2 47.2 0 003.6 5.8.2.2 0 00.3.1A58.6 58.6 0 0070 45.2a.2.2 0 00.1-.2c1.6-16.7-2.7-31.2-11.5-40.1zM23.7 37c-3.5 0-6.3-3.2-6.3-7s2.8-7 6.3-7 6.4 3.2 6.3 7-2.8 7-6.3 7zm23.3 0c-3.5 0-6.3-3.2-6.3-7s2.8-7 6.3-7 6.4 3.2 6.3 7-2.8 7-6.3 7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.5 5h3.5v14H6.5zM14 5h3.5v14H14z"/></svg>',
};

/* ---------- Small helpers ---------- */

const $ = (id) => document.getElementById(id);
const $$ = (sel, scope) => Array.from((scope || document).querySelectorAll(sel));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const lsGet = (k, d = null) => { try { const v = localStorage.getItem(k); return v == null ? d : v; } catch { return d; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, String(v)); } catch {} };
const lsDel = (k) => { try { localStorage.removeItem(k); } catch {} };
const readJSON = (key, fallback) => { try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; } catch { return fallback; } };
const writeJSON = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} };
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const num = (v) => (v == null || v === '' || isNaN(+v) ? null : +v);
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const fmtClock = (t) => {
    if (!t || !isFinite(t) || t < 0) return '0:00';
    const h = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = Math.floor(t % 60);
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`;
};
const fmtMinutes = (sec) => {
    if (!sec || !isFinite(sec) || sec <= 0) return '';
    const m = Math.max(1, Math.round(sec / 60));
    return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`;
};
const cssUrl = (u) => `url("${String(u).replace(/["\\\n]/g, encodeURIComponent)}")`;

// TMDB serves resized renditions; the JSON points at "original" (often several MB).
const BG_SIZE = ((window.screen && screen.width) || innerWidth) * (window.devicePixelRatio || 1) > 1800 ? 'original' : 'w1280';
const tmdb = (url, size) => (url ? String(url).replace(/(\/\/image\.tmdb\.org\/t\/p\/)original\//, `$1${size}/`) : '');
const IMG = {
    poster: (u) => tmdb(u, 'w500'),
    banner: (u) => tmdb(u, BG_SIZE),
    card: (u) => tmdb(u, 'w780'),
    logo: (u) => tmdb(u, 'w500'),
    thumb: (u) => tmdb(u, 'w500'),
    still: (u) => tmdb(u, 'w1280'),
};

const seasonLabel = (n) => (+n === 0 ? 'Specials' : `Season ${n}`);
const epCode = (s, e) => (+s === 0 ? `Special ${e}` : `S${s} E${e}`);

/* ---------- State ---------- */

const cacheBust = '?v=' + Date.now();
const state = {
    shows: [], hero: [], heroCtl: null,
    route: { name: 'home' },
    detail: { show: null, seasonIdx: -1, tab: 'episodes', reqId: 0 },
    play: {
        show: null, seasonNumber: null, seasonData: null, epIdx: -1,
        sources: [], srcIdx: -1, kind: null, token: 0, loadTok: 0,
        cueTrack: null, subIdx: -1, lastSubIdx: -1, defaultSubPicked: false,
        pushed: false, returnFocus: null,
        next: null, prev: null, nextP: null, upNextDismissed: false, watchedMarked: false,
    },
    hls: null,
    playbackSpeed: parseFloat(lsGet('lsSpeed', '1')) || 1,
    dl: { active: false, text: '', pct: 0 },
    controlsTimer: null, currentSkipTarget: null,
    seasonCache: new Map(), seasonData: new Map(),
    durIO: null, lastTouch: 0, lastProgSave: 0,
    pendingScroll: null,
};
const seasonMemo = new Map();   // showId -> last season number viewed/played (this session)
const browseMem = {};           // browse page filter + sort memory (this session)
let tvActive = false;

const getShow = (id) => state.shows.find(s => s.id === id);
const playableSeasons = (show) => (show && Array.isArray(show.seasons) ? show.seasons.filter(s => s && s.file) : []);
const isMovie = (show) => !!show && show.type === 'movie';
const autoplayOn = () => lsGet('lsAutoplay') !== '0';
const subsEnabled = () => lsGet('lsSubsOn') !== '0';

function epStatus(ep) {
    const s = String(ep.status || '').toLowerCase().trim();
    if (s === 'upcoming' || s === 'soon' || s === 'coming-soon' || s === 'comingsoon' || (ep.upcoming && !s)) return { id: 'upcoming', label: ep.statusText || 'Coming soon' };
    if (s === 'unavailable') return { id: 'unavailable', label: ep.statusText || 'Unavailable' };
    return null;
}

/* ---------- Toasts ---------- */

function toast(msg, opts = {}) {
    const stack = $('toastStack');
    if (!stack) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'status');
    t.innerHTML = `<span class="toast-icon">${opts.icon || ICON.check}</span><span class="toast-msg">${esc(msg)}</span>`;
    if (opts.action) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'toast-action';
        b.textContent = opts.action.label;
        b.addEventListener('click', () => { opts.action.fn(); dismiss(); });
        t.appendChild(b);
    }
    stack.appendChild(t);
    while (stack.children.length > 3) stack.firstElementChild.remove();
    let gone = false;
    function dismiss() {
        if (gone) return;
        gone = true;
        t.classList.add('is-leaving');
        setTimeout(() => t.remove(), 300);
    }
    setTimeout(dismiss, opts.duration || 3200);
}

/* ---------- Watch progress ---------- */

const PROG_KEY = 'lsProgressV2';
let progressMap = readJSON(PROG_KEY, {});
if (!progressMap || typeof progressMap !== 'object' || Array.isArray(progressMap)) progressMap = {};
const saveProgress = () => writeJSON(PROG_KEY, progressMap);
const progKey = (showId, s, e) => `${showId}|${s}|${e}`;
const getProgress = (showId, s, e) => progressMap[progKey(showId, s, e)] || null;
const isWatched = (p) => !!(p && p.d && p.t / p.d >= 0.95);
const isInProgress = (p) => !!(p && p.t > 5 && !isWatched(p));
const isUpNext = (p) => !!(p && p.n && !(p.t > 5));
const progPct = (p) => (p && p.d ? Math.min((p.t / p.d) * 100, 100) : 0);

function setProgress(showId, s, e, t, d, meta) {
    const key = progKey(showId, s, e);
    const prev = progressMap[key] || {};
    progressMap[key] = {
        t: Math.max(0, t), d: d || prev.d || null, u: Date.now(),
        title: (meta && meta.title) || prev.title || '', thumb: (meta && meta.thumb) || prev.thumb || '',
    };
    saveProgress();
}
// After finishing an episode, queue the next one so Continue Watching moves forward.
function markUpNext(showId, s, ep) {
    if (!ep) return;
    const key = progKey(showId, s, ep.number);
    const prev = progressMap[key];
    if (prev && prev.t > 5) return;
    progressMap[key] = { t: 0, d: (prev && prev.d) || null, u: Date.now(), title: ep.title || '', thumb: ep.thumbnail || '', n: 1 };
    saveProgress();
}
function parseProgEntries() {
    return Object.entries(progressMap).map(([key, p]) => {
        const parts = key.split('|');
        return { key, showId: parts[0], s: parseInt(parts[1], 10), e: parseInt(parts[2], 10), p };
    }).filter(en => en.showId && !isNaN(en.s) && !isNaN(en.e) && en.p && typeof en.p === 'object');
}
function continueEntries() {
    const seen = new Set();
    return parseProgEntries()
        .filter(en => !en.p.hide && (isInProgress(en.p) || isUpNext(en.p)) && getShow(en.showId) && !getShow(en.showId).comingSoon)
        .sort((a, b) => (b.p.u || 0) - (a.p.u || 0))
        .filter(en => { if (seen.has(en.showId)) return false; seen.add(en.showId); return true; })
        .slice(0, 20);
}
function latestEntryForShow(showId) {
    return parseProgEntries()
        .filter(en => en.showId === showId && (isInProgress(en.p) || isUpNext(en.p)))
        .sort((a, b) => (b.p.u || 0) - (a.p.u || 0))[0] || null;
}
function hideFromContinue(showId) {
    const keys = [];
    parseProgEntries().forEach(en => {
        if (en.showId === showId && !en.p.hide && (isInProgress(en.p) || isUpNext(en.p))) { en.p.hide = 1; keys.push(en.key); }
    });
    saveProgress();
    return keys;
}
function unhideProgress(keys) {
    keys.forEach(k => { if (progressMap[k]) delete progressMap[k].hide; });
    saveProgress();
}
function migrateOldProgress() {
    const old = readJSON('continueWatching', null);
    if (!Array.isArray(old) || !old.length) { lsDel('continueWatching'); return; }
    old.forEach(it => {
        const show = getShow(it.showId);
        if (!show) return;
        const playable = playableSeasons(show);
        const sNum = (playable[it.season] && playable[it.season].number != null) ? playable[it.season].number : ((it.season ?? 0) + 1);
        const eNum = (it.episode ?? 0) + 1;
        const key = progKey(it.showId, sNum, eNum);
        if (!progressMap[key]) progressMap[key] = { t: it.time || 0, d: it.duration || null, u: it.lastUpdated || Date.now(), title: '', thumb: '' };
    });
    saveProgress();
    lsDel('continueWatching');
}

/* ---------- Profile ---------- */

let profile = readJSON('lsProfile', { name: '', avatar: '' });
if (!profile || typeof profile !== 'object') profile = { name: '', avatar: '' };
const saveProfile = () => writeJSON('lsProfile', profile);
const avatarPic = () => PROFILE_PICS.find(p => p.id === profile.avatar) || null;

function avatarInner() {
    const pic = avatarPic();
    if (pic && pic.url) return `<img src="${esc(pic.url)}" alt="" draggable="false">`;
    const initial = (profile.name || '').trim().charAt(0).toUpperCase();
    return initial ? `<span>${esc(initial)}</span>` : svgIcon('<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5"/>');
}
function refreshAvatarUI() {
    const nav = $('navAvatar');
    if (nav) nav.innerHTML = avatarInner();
    const btn = $('profileBtn');
    if (btn) btn.title = profile.name ? `Profile: ${profile.name}` : 'Profile';
}

/* ---------- Theme: accent, appearance, TV mode ---------- */

function hexToRgb(hex) { return [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)); }
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        h *= 60;
    }
    return [h, s, l];
}
function hslToHex(h, s, l) {
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return '#' + [f(0), f(8), f(4)].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
}
function applyAccent(hex, persist = true) {
    if (!/^#[0-9a-f]{6}$/i.test(hex)) return;
    const [r, g, b] = hexToRgb(hex);
    const [h, s, l] = rgbToHsl(r, g, b);
    const root = document.documentElement.style;
    root.setProperty('--accent', hex);
    root.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
    root.setProperty('--accent-2', hslToHex((h + 34) % 360, Math.min(1, s * 0.95 + 0.05), clamp(l, 0.45, 0.66)));
    root.setProperty('--accent-on-dark', hslToHex(h, Math.min(1, s), Math.max(l, 0.7)));
    root.setProperty('--accent-on-light', hslToHex(h, Math.min(1, s), Math.min(l, 0.42)));
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    root.setProperty('--accent-ink', lum > 0.62 ? '#0B0F18' : '#FFFFFF');
    if (persist) lsSet('lsTheme', hex);
    updateThemeSwatches();
}
function buildThemeSwatches() {
    const c = $('themePresets');
    if (!c) return;
    c.innerHTML = THEME_PRESETS.map(t =>
        `<button class="swatch" type="button" style="--swatch:${t.color}" title="${esc(t.name)}" data-color="${t.color}" aria-label="${esc(t.name)} accent"></button>`).join('');
    $$('.swatch', c).forEach(s => s.addEventListener('click', () => applyAccent(s.dataset.color)));
    updateThemeSwatches();
}
function updateThemeSwatches() {
    const cur = (lsGet('lsTheme') || DEFAULT_ACCENT).toLowerCase();
    $$('.swatch').forEach(s => {
        const on = s.dataset.color.toLowerCase() === cur;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-pressed', on);
    });
    const picker = $('customAccentPicker');
    if (picker) picker.value = cur;
}
const appearancePref = () => { const v = lsGet('lsAppearance', 'dark'); return v === 'light' || v === 'system' ? v : 'dark'; };
const prefersLight = window.matchMedia ? matchMedia('(prefers-color-scheme: light)') : null;
function applyAppearance() {
    const pref = appearancePref();
    const light = pref === 'light' || (pref === 'system' && prefersLight && prefersLight.matches);
    document.documentElement.dataset.theme = light ? 'light' : 'dark';
    const meta = document.querySelector('meta[name=theme-color]');
    if (meta) meta.content = light ? '#F4F6FA' : '#07090F';
    $$('#appearanceSeg .seg-btn').forEach(b => {
        const on = b.dataset.appearance === pref;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on);
    });
}
function setAppearance(mode) { lsSet('lsAppearance', mode); applyAppearance(); }
if (prefersLight) {
    const onScheme = () => { if (appearancePref() === 'system') applyAppearance(); };
    if (prefersLight.addEventListener) prefersLight.addEventListener('change', onScheme);
    else if (prefersLight.addListener) prefersLight.addListener(onScheme);
}
function computeTv() {
    const pref = lsGet('lsTvMode', 'auto');
    if (pref === 'on') return true;
    if (pref === 'off') return false;
    return TV_RE.test(navigator.userAgent) || new URLSearchParams(location.search).has('tv');
}
function applyTvMode() {
    tvActive = computeTv();
    document.body.classList.toggle('tv-mode', tvActive);
    const pref = lsGet('lsTvMode', 'auto');
    $$('#tvSeg .seg-btn').forEach(b => {
        const on = b.dataset.tv === pref;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on);
    });
}
function syncSwitches() {
    const set = (id, on) => { const el = $(id); if (el) el.setAttribute('aria-checked', on ? 'true' : 'false'); };
    set('autoplaySwitch', autoplayOn());
    set('subsSwitch', subsEnabled());
}
function initThemeUI() {
    applyAccent(lsGet('lsTheme') || DEFAULT_ACCENT, false);
    applyAppearance();
    buildThemeSwatches();
    applyTvMode();
    syncSwitches();
}

/* ---------- My List ---------- */

const getMyList = () => { const l = readJSON('myList', []); return Array.isArray(l) ? l.filter(x => typeof x === 'string') : []; };
const isInMyList = (id) => getMyList().includes(id);
function toggleMyList(id) {
    let list = getMyList();
    const wasIn = list.includes(id);
    if (wasIn) list = list.filter(x => x !== id);
    else list.unshift(id);
    writeJSON('myList', list);
    updateListButtons(id);
    if (state.route.name === 'home') renderMyListRow();
    if (state.route.name === 'my-list') renderMyListGrid();
    const show = getShow(id);
    toast(wasIn ? 'Removed from My List' : 'Added to My List', {
        icon: wasIn ? ICON.x : ICON.check,
        action: { label: 'Undo', fn: () => toggleMyListSilently(id, wasIn) },
    });
    return show;
}
function toggleMyListSilently(id, shouldBeIn) {
    let list = getMyList().filter(x => x !== id);
    if (shouldBeIn) list.unshift(id);
    writeJSON('myList', list);
    updateListButtons(id);
    if (state.route.name === 'home') renderMyListRow();
    if (state.route.name === 'my-list') renderMyListGrid();
}
function listBtnHtml(id, inList, cls) {
    const label = inList ? 'Remove from My List' : 'Add to My List';
    return `<button class="${cls}${inList ? ' in-list' : ''}" type="button" data-toggle-list="${esc(id)}" aria-pressed="${inList}" aria-label="${label}" title="${label}">${inList ? ICON.check : ICON.plus}</button>`;
}
function updateListButtons(id) {
    const inList = isInMyList(id);
    const label = inList ? 'Remove from My List' : 'Add to My List';
    $$(`[data-toggle-list="${CSS.escape(id)}"]`).forEach(btn => {
        btn.classList.toggle('in-list', inList);
        btn.setAttribute('aria-pressed', inList);
        btn.setAttribute('aria-label', label);
        btn.title = label;
        btn.innerHTML = inList ? ICON.check : ICON.plus;
    });
}

/* ---------- Data ---------- */

function fetchSeason(file) {
    if (state.seasonCache.has(file)) return state.seasonCache.get(file);
    const p = fetch(file + cacheBust)
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
        .then(d => { state.seasonData.set(file, d); return d; });
    state.seasonCache.set(file, p);
    p.catch(() => state.seasonCache.delete(file));
    return p;
}
const seasonDataSync = (file) => state.seasonData.get(file) || null;
const isEpisodeSeason = (data) => !!data && data.type !== 'external' && Array.isArray(data.episodes);
const fetchText = (url) => fetch(url).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.text(); });

/* ---------- Episode durations (probed lazily, cached) ---------- */

let durCache = readJSON('lsDurCache', {});
if (!durCache || typeof durCache !== 'object') durCache = {};
let durSaveTimer = null;
const durQueue = [];
let durRunning = 0;

function queueDuration(url, el) {
    if (!url) return;
    if (durCache[url]) { el.textContent = durCache[url]; return; }
    durQueue.push({ url, el });
    pumpDurQueue();
}
function pumpDurQueue() {
    while (durRunning < 3 && durQueue.length) {
        const job = durQueue.shift();
        if (!job.el.isConnected) continue;
        durRunning++;
        probeDuration(job.url).catch(() => '').then(label => {
            durRunning--;
            if (label) {
                durCache[job.url] = label;
                clearTimeout(durSaveTimer);
                durSaveTimer = setTimeout(() => {
                    const keys = Object.keys(durCache);
                    if (keys.length > 2000) keys.slice(0, keys.length - 2000).forEach(k => delete durCache[k]);
                    writeJSON('lsDurCache', durCache);
                }, 1500);
                if (job.el.isConnected) job.el.textContent = label;
            }
            pumpDurQueue();
        });
    }
}
// HLS: read the playlists and add up segment lengths (two tiny text requests,
// no video data). Progressive files: load metadata only.
async function probeDuration(url) {
    if (!url || sourceKindOf(url) !== 'direct') return '';
    if (/\.m3u8(\?|#|$)/i.test(url)) {
        const master = await fetchText(url);
        let media = master;
        if (/#EXT-X-STREAM-INF/i.test(master)) {
            const line = master.split(/\r?\n/).map(s => s.trim()).find(l => l && !l.startsWith('#'));
            if (!line) return '';
            media = await fetchText(new URL(line, url).href);
        }
        let total = 0;
        media.replace(/#EXTINF:\s*([\d.]+)/gi, (_, d) => { total += parseFloat(d) || 0; return ''; });
        return fmtMinutes(total);
    }
    return new Promise(resolve => {
        const tmp = document.createElement('video');
        tmp.preload = 'metadata';
        tmp.muted = true;
        let done = false;
        const finish = (val) => {
            if (done) return;
            done = true;
            resolve(val);
            try { tmp.removeAttribute('src'); tmp.load(); } catch {}
        };
        setTimeout(() => finish(''), 8000);
        tmp.onloadedmetadata = () => finish(fmtMinutes(tmp.duration));
        tmp.onerror = () => finish('');
        tmp.src = url;
    });
}
const fmtEpDuration = (val) => (val == null || val === '' ? '' : (typeof val === 'number' ? fmtMinutes(val) : String(val)));
const knownDuration = (ep) => fmtEpDuration(ep.duration) || durCache[(ep.embed || '').trim()] || '';

/* ---------- Video sources ---------- */

function sourceKindOf(url, declared) {
    if (declared === 'tab' || declared === 'iframe' || declared === 'direct') return declared;
    if (!url || !url.trim()) return 'none';
    const u = url.toLowerCase().split(/[?#]/)[0];
    if (/\.(m3u8|mp4|webm|mov|m4v|mkv)$/.test(u)) return 'direct';
    return 'iframe';
}
function srcTypeTag(src) {
    if (src.type === 'tab') return 'NEW TAB';
    if (src.type === 'iframe') return 'EMBED';
    return src.url.toLowerCase().includes('.m3u8') ? 'HLS' : 'MP4';
}
function episodeSources(ep) {
    if (!ep || epStatus(ep)) return [];
    const list = [];
    if (ep.embed && ep.embed.trim()) list.push({ label: 'Default', url: ep.embed.trim(), type: sourceKindOf(ep.embed), def: true });
    (Array.isArray(ep.sources) ? ep.sources : []).forEach((s, i) => {
        if (!s || !s.url || !s.url.trim()) return;
        list.push({ label: s.label || ('Source ' + (i + 1)), url: s.url.trim(), type: sourceKindOf(s.url, s.type) });
    });
    return list;
}
const isPlayable = (ep) => episodeSources(ep).length > 0;
function toEmbedUrl(url) {
    const u = url.trim();
    const yt = u.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i);
    if (yt) {
        const start = (u.match(/[?&#](?:start|t)=(\d+)/) || [])[1];
        return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1${start ? '&start=' + start : ''}`;
    }
    return u;
}

/* ---------- Router + scroll memory ---------- */

try { history.scrollRestoration = 'manual'; } catch {}
const scrollMem = new Map();
let curHistKey = null;
window.addEventListener('scroll', () => {
    if (curHistKey && !document.body.classList.contains('is-locked')) scrollMem.set(curHistKey, window.scrollY);
}, { passive: true });

// Each history entry gets a key so Back/Forward can restore where you were.
function historyKey() {
    const st = history.state;
    if (st && st.lsKey) return { key: st.lsKey, traversal: true };
    const key = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    try { history.replaceState(Object.assign({}, st || {}, { lsKey: key }), ''); } catch {}
    return { key, traversal: false };
}
function parseHash() {
    let h = location.hash || '#/';
    if (h.startsWith('#show=')) {
        const p = new URLSearchParams(h.slice(1));
        const id = p.get('show') || '';
        const s = p.get('s'), e = p.get('e');
        let nh = '#/details/' + encodeURIComponent(id);
        if (s && e) nh += '/' + encodeURIComponent(s) + '/' + encodeURIComponent(e);
        history.replaceState(history.state, '', nh);
        h = nh;
    }
    if (!h.startsWith('#/')) return { name: 'home' };
    const parts = h.slice(2).split('/').filter(Boolean).map(p => { try { return decodeURIComponent(p); } catch { return p; } });
    if (!parts.length) return { name: 'home' };
    switch (parts[0]) {
        case 'shows': case 'movies': case 'coming-soon': case 'my-list': case 'faq':
            return { name: parts[0] };
        case 'search':
            return { name: 'search', q: parts.slice(1).join('/') };
        case 'details':
            if (parts.length >= 4) {
                const s = parseInt(parts[2], 10), e = parseInt(parts[3], 10);
                if (!isNaN(s) && !isNaN(e)) return { name: 'episode', id: parts[1], s, e };
            }
            if (parts.length >= 2) return { name: 'details', id: parts[1] };
            return { name: 'home' };
        default:
            return { name: 'notfound' };
    }
}
function updateNavActive(r) {
    const active = { home: 'home', shows: 'shows', movies: 'movies', 'coming-soon': 'coming-soon', search: 'search', 'my-list': 'my-list' }[r.name] || '';
    $$('[data-route]').forEach(el => {
        const on = el.dataset.route === active;
        el.classList.toggle('is-active', on);
        if (on) el.setAttribute('aria-current', 'page'); else el.removeAttribute('aria-current');
    });
}
function setTitle(part) {
    document.title = part ? `${part} · ${BRAND}` : `${BRAND} · Stream LEGO shows & movies`;
}
function route(opts = {}) {
    if (playerOpen()) closePlayerNow(true);
    closeAllModals(true);
    closeAllPopups();
    const r = parseHash();
    state.route = r;
    const { key, traversal } = historyKey();
    curHistKey = key;
    stopHero();
    if (state.durIO) { state.durIO.disconnect(); state.durIO = null; }
    updateNavActive(r);
    const keep = !!opts.keepScroll;
    const y = keep ? window.scrollY : (traversal ? (scrollMem.get(key) || 0) : 0);
    state.pendingScroll = y > 0 ? { key, y } : null;
    document.body.classList.toggle('no-page-anim', keep || traversal);
    switch (r.name) {
        case 'home': renderHome(); setTitle(''); break;
        case 'shows': case 'movies': case 'coming-soon': renderBrowse(r.name); break;
        case 'my-list': renderMyListPage(); break;
        case 'search': renderSearch(r.q || ''); setTitle('Search'); break;
        case 'faq': renderFaqPage(); setTitle('Help & FAQ'); break;
        case 'details': renderDetails(r.id, { keep }); break;
        case 'episode': renderEpisodePage(r.id, r.s, r.e); break;
        default: renderNotFound(); setTitle('Not found');
    }
    window.scrollTo(0, y);
    applyPendingScroll();
    updateTopbar();
    if (!keep) tvInitialFocus();
}
// Content that renders asynchronously (episode lists) re-applies the saved position.
function applyPendingScroll() {
    const ps = state.pendingScroll;
    if (!ps || ps.key !== curHistKey) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    window.scrollTo(0, Math.min(ps.y, Math.max(0, max)));
    if (max >= ps.y) state.pendingScroll = null;
}
window.addEventListener('hashchange', () => route());
window.addEventListener('popstate', () => {
    if (playerOpen()) { state.play.pushed = false; closePlayerNow(); }
});

function tvInitialFocus() {
    if (!tvActive) return;
    requestAnimationFrame(() => {
        const target = document.querySelector('#view .hero-slide.is-active .btn-primary') ||
            document.querySelector('#view .btn-primary') ||
            document.querySelector('#view a[href], #view button:not([tabindex="-1"]), #view input');
        if (target) target.focus({ preventScroll: true });
    });
}

const topbar = $('topbar');
function updateTopbar() { topbar.classList.toggle('is-solid', window.scrollY > 16); }
window.addEventListener('scroll', updateTopbar, { passive: true });

/* ==========================================================================
   Templates
   ========================================================================== */

// "Specials" (season 0) is not counted as a season.
const seasonCount = (show) => { const ps = playableSeasons(show); return ps.filter(s => +s.number !== 0).length || ps.length; };
const kindLabel = (show) => (show.comingSoon ? 'Coming soon' : (isMovie(show) ? 'Movie' : 'Series'));

function posterCard(show) {
    const soon = !!show.comingSoon;
    const kind = kindLabel(show);
    const sub = [kind, show.years].filter(Boolean).join(' · ');
    return `<div class="card poster-card" data-show="${esc(show.id)}">
        <a class="card-link" href="#/details/${encodeURIComponent(show.id)}" draggable="false" aria-label="${esc(show.title)}, ${esc(kind)}">
            <div class="card-media">
                ${show.poster ? `<img class="card-img fade" src="${esc(IMG.poster(show.poster))}" alt="" loading="lazy" decoding="async" draggable="false">` : ''}
                <div class="card-fallback"><span>${esc(show.title)}</span></div>
                ${show.newEpisodes && !soon ? '<span class="badge badge-accent card-badge">New episodes</span>' : ''}
                ${soon ? `<span class="badge badge-glass card-badge">${esc(show.comingSoonText || 'Coming soon')}</span>` : ''}
                <div class="card-hover"><div class="card-hover-title">${esc(show.title)}</div><div class="card-hover-sub">${esc(sub)}</div></div>
            </div>
        </a>
        ${soon ? '' : listBtnHtml(show.id, isInMyList(show.id), 'card-list')}
    </div>`;
}
function wideCard(show) {
    const sub = [isMovie(show) ? 'Movie' : 'Series', show.years].filter(Boolean).join(' · ');
    return `<div class="card wide-card">
        <a class="card-link" href="#/details/${encodeURIComponent(show.id)}" draggable="false" aria-label="${esc(show.title)}${show.comingSoon ? ', coming soon' : ''}">
            <div class="card-media card-media-wide">
                ${show.banner || show.poster ? `<img class="card-img fade" src="${esc(IMG.card(show.banner || show.poster))}" alt="" loading="lazy" decoding="async" draggable="false">` : ''}
                <div class="card-fallback"><span>${esc(show.title)}</span></div>
                <div class="card-scrim"></div>
                ${show.logo ? `<img class="card-logo" src="${esc(IMG.logo(show.logo))}" alt="" loading="lazy" decoding="async" draggable="false">` : `<div class="card-logo-text">${esc(show.title)}</div>`}
                ${show.comingSoon ? `<span class="badge badge-glass card-badge">${esc(show.comingSoonText || 'Coming soon')}</span>` : ''}
            </div>
        </a>
        <div class="card-caption"><div class="card-caption-title">${esc(show.title)}</div><div class="card-caption-sub">${esc(sub)}</div></div>
    </div>`;
}
function continueCard(en) {
    const show = getShow(en.showId);
    const p = en.p;
    const up = isUpNext(p);
    const img = p.thumb ? IMG.card(p.thumb) : IMG.card(show.banner || show.poster);
    const epLabel = isMovie(show) ? (p.title && p.title !== show.title ? p.title : 'Movie') : `${epCode(en.s, en.e)}${p.title ? ' · ' + p.title : ''}`;
    const left = up ? 'Up next' : (p.d ? `${fmtMinutes(p.d - p.t)} left` : `${fmtClock(p.t)} watched`);
    const verb = up ? 'Play' : 'Resume';
    return `<div class="card wide-card continue-card">
        <button class="card-link" type="button" data-resume="${esc(en.showId)}" data-s="${en.s}" data-e="${en.e}" aria-label="${verb} ${esc(show.title)}, ${esc(epLabel)}">
            <div class="card-media card-media-wide">
                ${img ? `<img class="card-img fade" src="${esc(img)}" alt="" loading="lazy" decoding="async" draggable="false">` : ''}
                <div class="card-fallback"><span>${esc(show.title)}</span></div>
                <div class="card-scrim card-scrim-soft"></div>
                <span class="card-play">${ICON.play}</span>
                ${up ? '<span class="badge badge-accent card-badge">Up next</span>' : ''}
                <div class="progress-bar"><span style="width:${up ? 0 : progPct(p).toFixed(1)}%"></span></div>
            </div>
            <div class="card-caption">
                <div class="card-caption-title">${esc(show.title)}</div>
                <div class="card-caption-sub">${esc(epLabel)}</div>
                <div class="card-caption-meta">${esc(left)}</div>
            </div>
        </button>
        <button class="card-remove" type="button" data-cont-remove="${esc(en.showId)}" aria-label="Remove ${esc(show.title)} from Continue Watching" title="Remove from row">${ICON.x}</button>
    </div>`;
}
function railSection({ id, title, link, linkLabel = 'See all', html, cls = '' }) {
    return `<section class="row ${cls}" aria-labelledby="${id}-h">
        <div class="row-head page-inner">
            <h2 class="row-title" id="${id}-h">${esc(title)}</h2>
            ${link ? `<a class="row-more" href="${link}">${esc(linkLabel)}${ICON.chevR}</a>` : ''}
        </div>
        <div class="rail">
            <button class="rail-btn rail-prev" type="button" aria-label="Scroll left" tabindex="-1">${ICON.chevL}</button>
            <div class="rail-track" id="${id}">${html}</div>
            <button class="rail-btn rail-next" type="button" aria-label="Scroll right" tabindex="-1">${ICON.chevR}</button>
        </div>
    </section>`;
}
function bindRails(scope) {
    $$('.rail', scope).forEach(rail => {
        if (rail.dataset.bound) { updateRail(rail); return; }
        rail.dataset.bound = '1';
        const track = rail.querySelector('.rail-track');
        rail.querySelector('.rail-prev').addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * 0.8, behavior: 'smooth' }));
        rail.querySelector('.rail-next').addEventListener('click', () => track.scrollBy({ left: track.clientWidth * 0.8, behavior: 'smooth' }));
        track.addEventListener('scroll', () => updateRail(rail), { passive: true });
        requestAnimationFrame(() => updateRail(rail));
    });
}
function updateRail(rail) {
    const t = rail.querySelector('.rail-track');
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    rail.classList.toggle('can-prev', t.scrollLeft > 4);
    rail.classList.toggle('can-next', t.scrollLeft < max - 4);
}
window.addEventListener('resize', () => $$('.rail').forEach(updateRail), { passive: true });

function emptyState({ icon = ICON.film, title, text = '', action = '' }) {
    return `<div class="empty"><div class="empty-icon">${icon}</div><h2>${esc(title)}</h2>${text ? `<p>${esc(text)}</p>` : ''}${action}</div>`;
}
function metaHtml(show, { seasons = true } = {}) {
    const bits = [];
    if (show.rating) bits.push(`<span class="badge badge-outline">${esc(show.rating)}</span>`);
    if (show.years) bits.push(`<span>${esc(show.years)}</span>`);
    const n = seasonCount(show);
    if (isMovie(show)) { if (show.runtime) bits.push(`<span>${esc(show.runtime)}</span>`); }
    else if (seasons && n && !show.comingSoon) bits.push(`<span>${plural(n, 'Season')}</span>`);
    if (show.genres && show.genres.length) bits.push(`<span>${esc(show.genres.slice(0, 3).join(', '))}</span>`);
    return bits.join('<i class="meta-sep" aria-hidden="true"></i>');
}
function findResumeTarget(show) {
    const latest = latestEntryForShow(show.id);
    if (latest) return { s: latest.s, e: latest.e, resume: isInProgress(latest.p), upNext: isUpNext(latest.p), p: latest.p };
    if (!playableSeasons(show).length) return null;
    return { s: null, e: null, resume: false };   // s:null → first playable episode
}
function resumeLabel(show, target) {
    if (!target) return 'Play';
    if (target.resume) return isMovie(show) ? 'Resume' : `Resume ${epCode(target.s, target.e)}`;
    if (target.upNext) return isMovie(show) ? 'Play' : `Play ${epCode(target.s, target.e)}`;
    return 'Play';
}

/* ==========================================================================
   Home
   ========================================================================== */

const FAQ_ITEMS = [
    ['What is litestreamsite?', 'litestreamsite is a free, fan-made site for watching LEGO series, movies and specials in one place. There is no sign-up and nothing to install.'],
    ['Where do the videos come from?', 'Videos are embedded or streamed from official sources.'],
    ['Do I need an account?', 'No. Your profile, My List and watch progress are saved in your browser on this device.'],
    ['Why is some content marked "Coming Soon"?', 'Some shows and seasons are still being prepared and will be available at a later date. Check the Coming Soon page or join the Discord for updates.'],
    ['How do I suggest a feature or report a broken episode?', 'Join the Discord server to make suggestions or report problems.'],
    ['What keyboard shortcuts work in the player?', 'Space or K plays and pauses, ← / → or J / L seek 10 seconds, ↑ / ↓ change volume, 0–9 jump through the episode, F toggles fullscreen, M mutes, C toggles subtitles, Shift+N / Shift+P change episode and Esc closes the player. Press ? anywhere to see the full list.'],
    ['Can I install it as an app?', 'Yes. Use "Install app" or "Add to Home Screen" in your browser menu to get litestreamsite on your phone, tablet or computer.'],
];
function faqHtml(withHeading = true) {
    return `<section class="faq" aria-labelledby="faqTitle">
        ${withHeading ? '<h2 class="section-title faq-title" id="faqTitle">Frequently asked questions</h2>' : '<h2 class="sr-only" id="faqTitle">Frequently asked questions</h2>'}
        ${FAQ_ITEMS.map(([q, a], i) => `<div class="faq-item">
            <h3><button class="faq-q" type="button" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}"><span>${esc(q)}</span><span class="faq-icon" aria-hidden="true">${ICON.plus}</span></button></h3>
            <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><div class="faq-a-inner"><p>${esc(a)}</p></div></div>
        </div>`).join('')}
    </section>`;
}
function bindFaq(scope) {
    $$('.faq-item', scope).forEach(item => {
        const q = item.querySelector('.faq-q');
        q.addEventListener('click', () => {
            const open = !item.classList.contains('is-open');
            $$('.faq-item', scope).forEach(i => { i.classList.remove('is-open'); i.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
            item.classList.toggle('is-open', open);
            q.setAttribute('aria-expanded', open);
        });
    });
}

function renderHome() {
    const view = $('view');
    const shows = state.shows.filter(s => !s.comingSoon && !isMovie(s));
    const movies = state.shows.filter(s => !s.comingSoon && isMovie(s));
    const soon = state.shows.filter(s => s.comingSoon);
    const heroItems = state.hero.filter(h => h && getShow(h.showId));
    view.innerHTML = `<div class="page page-home">
        ${heroItems.length ? heroHtml(heroItems) : ''}
        <div class="home-rows${heroItems.length ? '' : ' page-top'}">
            <div id="continueSlot"></div>
            <div id="myListSlot"></div>
            ${shows.length ? railSection({ id: 'rowShows', title: 'Series', link: '#/shows', html: shows.map(posterCard).join('') }) : ''}
            ${movies.length ? railSection({ id: 'rowMovies', title: 'Movies & Specials', link: '#/movies', html: movies.map(posterCard).join('') }) : ''}
            ${soon.length ? railSection({ id: 'rowSoon', title: 'Coming Soon', link: '#/coming-soon', html: soon.map(wideCard).join(''), cls: 'row-wide' }) : ''}
            <div class="page-inner">${faqHtml()}</div>
        </div>
    </div>`;
    if (heroItems.length) initHero(heroItems);
    renderContinueRow();
    renderMyListRow();
    bindRails(view);
    bindFaq(view);
}
function renderContinueRow() {
    const slot = $('continueSlot');
    if (!slot) return;
    const entries = continueEntries();
    slot.innerHTML = entries.length ? railSection({
        id: 'rowContinue',
        title: profile.name ? `Continue watching for ${profile.name}` : 'Continue Watching',
        html: entries.map(continueCard).join(''),
        cls: 'row-wide row-continue',
    }) : '';
    bindRails(slot);
}
function renderMyListRow() {
    const slot = $('myListSlot');
    if (!slot) return;
    const list = getMyList().map(getShow).filter(Boolean);
    slot.innerHTML = list.length ? railSection({ id: 'rowMyList', title: 'My List', link: '#/my-list', html: list.map(posterCard).join('') }) : '';
    bindRails(slot);
}

/* ---------- Hero carousel ---------- */

function heroHtml(items) {
    const n = items.length;
    return `<section class="hero" id="hero" aria-roledescription="carousel" aria-label="Featured titles" style="--hero-ms:${HERO_MS}ms">
        <div class="hero-slides">${items.map((it, i) => heroSlideHtml(it, i, n)).join('')}</div>
        ${n > 1 ? `<button class="hero-arrow hero-prev" type="button" aria-label="Previous featured title">${ICON.chevL}</button>
        <button class="hero-arrow hero-next" type="button" aria-label="Next featured title">${ICON.chevR}</button>
        <div class="hero-dots page-inner">${items.map((it, i) => `<button class="hero-dot${i === 0 ? ' is-active' : ''}" type="button" data-idx="${i}" aria-label="Show ${esc(it.title || getShow(it.showId).title)}"><span></span></button>`).join('')}</div>` : ''}
    </section>`;
}
function heroSlideHtml(item, i, n) {
    const show = getShow(item.showId);
    const soon = !!show.comingSoon;
    const title = item.title || show.title;
    const target = soon ? null : findResumeTarget(show);
    return `<article class="hero-slide${i === 0 ? ' is-active' : ''}" data-idx="${i}" aria-roledescription="slide" aria-label="${i + 1} of ${n}"${i ? ' aria-hidden="true" inert' : ''}>
        <div class="hero-bg" data-bg="${esc(IMG.banner(item.heroBanner || show.banner || ''))}"></div>
        <div class="hero-scrim"></div>
        <div class="hero-content page-inner">
            <div class="hero-kicker"><span class="hero-kicker-dot"></span>${isMovie(show) ? 'Featured movie' : 'Featured series'}</div>
            <h2 class="hero-title">${show.logo
                ? `<img class="hero-logo" src="${esc(IMG.logo(show.logo))}" alt="${esc(title)}" data-alt-text="${esc(title)}" decoding="async"${i ? ' loading="lazy"' : ''}>`
                : `<span class="hero-title-text">${esc(title)}</span>`}</h2>
            <div class="meta-line hero-meta">${metaHtml(show)}</div>
            <p class="hero-desc">${esc(item.description || show.summary || '')}</p>
            <div class="hero-actions">
                ${soon ? '' : `<button class="btn btn-primary btn-lg" type="button" data-play-show="${esc(show.id)}">${ICON.play}<span>${esc(resumeLabel(show, target))}</span></button>`}
                <a class="btn btn-glass btn-lg" href="#/details/${encodeURIComponent(show.id)}">${ICON.info}<span>More info</span></a>
                ${soon ? '' : listBtnHtml(show.id, isInMyList(show.id), 'icon-btn icon-btn-lg')}
            </div>
        </div>
    </article>`;
}
function initHero(items) {
    const el = $('hero');
    if (!el) return;
    const h = state.heroCtl = { el, n: items.length, idx: 0, timer: null, remaining: HERO_MS, t0: 0, holds: new Set() };
    loadHeroBg(0);
    if (h.n < 2) return;
    loadHeroBg(1);
    $$('.hero-dot', el).forEach(d => d.addEventListener('click', () => heroGo(+d.dataset.idx)));
    el.querySelector('.hero-prev').addEventListener('click', () => heroGo(h.idx - 1));
    el.querySelector('.hero-next').addEventListener('click', () => heroGo(h.idx + 1));
    el.addEventListener('mouseenter', () => heroHold('hover', true));
    el.addEventListener('mouseleave', () => heroHold('hover', false));
    el.addEventListener('focusin', () => heroHold('focus', true));
    el.addEventListener('focusout', (e) => { if (!el.contains(e.relatedTarget)) heroHold('focus', false); });
    let sx = 0, sy = 0;
    el.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    el.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) heroGo(h.idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
    if (document.hidden) h.holds.add('hidden');
    if (playerOpen()) h.holds.add('player');
    el.classList.toggle('is-paused', h.holds.size > 0);
    heroSchedule();
}
function loadHeroBg(i) {
    const h = state.heroCtl;
    if (!h) return;
    const slide = h.el.querySelectorAll('.hero-slide')[(i + h.n) % h.n];
    const bg = slide && slide.querySelector('.hero-bg');
    if (!bg || !bg.dataset.bg) return;
    const url = bg.dataset.bg;
    delete bg.dataset.bg;
    const im = new Image();
    im.onload = im.onerror = () => bg.classList.add('is-loaded');
    im.src = url;
    bg.style.backgroundImage = cssUrl(url);
}
function heroSchedule() {
    const h = state.heroCtl;
    if (!h) return;
    clearTimeout(h.timer);
    if (h.n < 2 || h.holds.size) return;
    h.t0 = Date.now();
    h.timer = setTimeout(() => heroGo(h.idx + 1), h.remaining);
}
function heroHold(reason, on) {
    const h = state.heroCtl;
    if (!h) return;
    const was = h.holds.size > 0;
    if (on) h.holds.add(reason); else h.holds.delete(reason);
    const now = h.holds.size > 0;
    if (was === now) return;
    h.el.classList.toggle('is-paused', now);
    if (now) { clearTimeout(h.timer); h.remaining = Math.max(0, h.remaining - (Date.now() - h.t0)); }
    else heroSchedule();
}
function heroGo(i) {
    const h = state.heroCtl;
    if (!h || !h.el.isConnected) { stopHero(); return; }
    h.idx = (i + h.n) % h.n;
    h.remaining = HERO_MS;
    $$('.hero-slide', h.el).forEach((s, j) => {
        const on = j === h.idx;
        s.classList.toggle('is-active', on);
        s.inert = !on;
        s.setAttribute('aria-hidden', on ? 'false' : 'true');
    });
    const dots = $$('.hero-dot', h.el);
    dots.forEach(d => d.classList.remove('is-active'));
    void h.el.offsetWidth; // restart the progress animation
    if (dots[h.idx]) dots[h.idx].classList.add('is-active');
    loadHeroBg(h.idx);
    loadHeroBg(h.idx + 1);
    heroSchedule();
}
function stopHero() {
    if (state.heroCtl) clearTimeout(state.heroCtl.timer);
    state.heroCtl = null;
}
document.addEventListener('visibilitychange', () => heroHold('hidden', document.hidden));

/* ==========================================================================
   Browse pages
   ========================================================================== */

const BROWSE_META = {
    'shows': { title: 'Series', eyebrow: 'Browse', blurb: 'Every LEGO series you can stream right now.', empty: 'No series here yet.' },
    'movies': { title: 'Movies & Specials', eyebrow: 'Browse', blurb: 'Films and TV specials, ready to watch.', empty: 'No movies here yet.' },
    'coming-soon': { title: 'Coming Soon', eyebrow: 'On the way', blurb: 'Titles being prepared for the site. Check back soon, or join the Discord for updates.', empty: 'Nothing scheduled right now.' },
};
function browseList(kind) {
    if (kind === 'shows') return state.shows.filter(s => !s.comingSoon && !isMovie(s));
    if (kind === 'movies') return state.shows.filter(s => !s.comingSoon && isMovie(s));
    return state.shows.filter(s => s.comingSoon);
}
const yearKey = (show) => {
    const y = String(show.years || '');
    const nums = (y.match(/\d{4}/g) || []).map(Number);
    if (/present/i.test(y)) nums.push(9999);
    return nums.length ? Math.max(...nums) : 0;
};
function renderBrowse(kind) {
    const meta = BROWSE_META[kind];
    setTitle(meta.title);
    const base = browseList(kind);
    const mem = browseMem[kind] || (browseMem[kind] = { genre: 'All', sort: 'default' });
    const genres = [...new Set(base.flatMap(s => s.genres || []))].sort();
    if (mem.genre !== 'All' && !genres.includes(mem.genre)) mem.genre = 'All';
    const wide = kind === 'coming-soon';
    $('view').innerHTML = `<div class="page page-browse"><div class="page-inner page-top">
        <header class="page-header">
            <p class="eyebrow">${esc(meta.eyebrow)}</p>
            <h1 class="page-title">${esc(meta.title)}</h1>
            <p class="page-sub">${esc(meta.blurb)}</p>
        </header>
        ${base.length ? `<div class="toolbar">
            <div class="chips" role="group" aria-label="Filter by genre">
                ${['All', ...genres].map(g => `<button class="chip${g === mem.genre ? ' is-active' : ''}" type="button" data-genre="${esc(g)}" aria-pressed="${g === mem.genre}">${esc(g)}</button>`).join('')}
            </div>
            <label class="select">
                <span class="sr-only">Sort titles</span>
                <select id="sortSelect">
                    <option value="default">Featured</option>
                    <option value="az">A–Z</option>
                    <option value="za">Z–A</option>
                    <option value="new">Newest</option>
                    <option value="old">Oldest</option>
                </select>
                ${ICON.chevD}
            </label>
        </div>` : ''}
        <p class="result-count" id="browseCount" aria-live="polite"></p>
        <div class="grid${wide ? ' grid-wide' : ''}" id="browseGrid"></div>
    </div></div>`;
    const apply = () => {
        let list = base.slice();
        if (mem.genre !== 'All') list = list.filter(s => (s.genres || []).includes(mem.genre));
        if (mem.sort === 'az') list.sort((a, b) => a.title.localeCompare(b.title));
        else if (mem.sort === 'za') list.sort((a, b) => b.title.localeCompare(a.title));
        else if (mem.sort === 'new') list.sort((a, b) => yearKey(b) - yearKey(a));
        else if (mem.sort === 'old') list.sort((a, b) => yearKey(a) - yearKey(b));
        $('browseGrid').innerHTML = list.length ? list.map(wide ? wideCard : posterCard).join('') : emptyState({ title: meta.empty });
        $('browseCount').textContent = base.length ? plural(list.length, 'title') : '';
    };
    const sel = $('sortSelect');
    if (sel) {
        sel.value = mem.sort;
        sel.addEventListener('change', () => { mem.sort = sel.value; apply(); });
    }
    $$('.chip[data-genre]').forEach(c => c.addEventListener('click', () => {
        mem.genre = c.dataset.genre;
        $$('.chip[data-genre]').forEach(x => { const on = x === c; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', on); });
        apply();
    }));
    apply();
}

function renderMyListPage() {
    setTitle('My List');
    $('view').innerHTML = `<div class="page page-browse"><div class="page-inner page-top">
        <header class="page-header">
            <p class="eyebrow">Saved for later</p>
            <h1 class="page-title">My List</h1>
            <p class="page-sub">Shows and movies you've saved. Stored in this browser.</p>
        </header>
        <p class="result-count" id="browseCount"></p>
        <div class="grid" id="myListGrid"></div>
    </div></div>`;
    renderMyListGrid();
}
function renderMyListGrid() {
    const grid = $('myListGrid');
    if (!grid) return;
    const list = getMyList().map(getShow).filter(Boolean);
    grid.innerHTML = list.length ? list.map(posterCard).join('') : emptyState({
        icon: ICON.bookmark, title: 'Your list is empty',
        text: 'Use the + button on any show or movie to save it here for later.',
        action: '<a class="btn btn-primary" href="#/shows">Browse series</a>',
    });
    $('browseCount').textContent = list.length ? plural(list.length, 'title') : '';
}

function renderFaqPage() {
    $('view').innerHTML = `<div class="page"><div class="page-inner page-top page-narrow">
        <header class="page-header">
            <p class="eyebrow">Help</p>
            <h1 class="page-title">Help &amp; FAQ</h1>
            <p class="page-sub">Answers to common questions. Still stuck? <a href="${DISCORD_URL}" target="_blank" rel="noopener">Ask on Discord</a>.</p>
        </header>
        ${faqHtml(false)}
    </div></div>`;
    bindFaq($('view'));
}
function renderNotFound(msg) {
    $('view').innerHTML = `<div class="page"><div class="page-inner page-top">${emptyState({
        icon: ICON.alert, title: 'Page not found',
        text: msg || "We couldn't find what you were looking for.",
        action: '<a class="btn btn-primary" href="#/">Go home</a>',
    })}</div></div>`;
}

/* ==========================================================================
   Search (titles + every episode)
   ========================================================================== */

let epIndexP = null, searchRun = 0;
function loadEpisodeIndex() {
    if (epIndexP) return epIndexP;
    const jobs = [];
    state.shows.filter(s => !s.comingSoon).forEach(show => playableSeasons(show).forEach(ref => {
        jobs.push(fetchSeason(ref.file).then(data => (isEpisodeSeason(data) ? data.episodes : []).map((ep, idx) => ({
            show, s: ref.number, ep, idx, t: norm(ep.title), d: norm(ep.description), st: norm(show.title),
        }))).catch(() => []));
    }));
    epIndexP = Promise.all(jobs).then(arr => arr.flat());
    return epIndexP;
}
function highlight(text, toks) {
    const t = String(text || '');
    const words = toks.filter(w => w.length > 1).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    if (!words.length) return esc(t);
    const re = new RegExp(`(${words.join('|')})`, 'gi');
    return t.split(re).map((part, i) => (i % 2 ? `<mark>${esc(part)}</mark>` : esc(part))).join('');
}
function searchTitles(toks) {
    return state.shows.map((s, i) => {
        const title = norm(s.title);
        const hay = [title, norm((s.genres || []).join(' ')), norm((s.starring || []).join(' ')), norm(s.creator), norm(s.summary)].join(' ');
        if (!toks.every(t => hay.includes(t))) return null;
        const q = toks.join(' ');
        const score = title.startsWith(q) || title.includes(' ' + q) ? 3 : (toks.every(t => title.includes(t)) ? 2 : 1);
        return { s, score, i };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.i - b.i).map(r => r.s);
}
function searchEpisodes(index, toks) {
    return index.map((r, i) => {
        const hay = r.t + ' ' + r.d + ' ' + r.st;
        if (!toks.every(t => hay.includes(t))) return null;
        const score = toks.every(t => r.t.includes(t)) ? 3 : (toks.some(t => r.t.includes(t)) ? 2 : 1);
        return { r, score, i };
    }).filter(Boolean).sort((a, b) => b.score - a.score || a.i - b.i).map(x => x.r);
}
function epResultHtml(r, toks) {
    const st = epStatus(r.ep);
    return `<a class="ep-result" href="#/details/${encodeURIComponent(r.show.id)}/${r.s}/${r.ep.number}">
        <div class="ep-result-thumb">${r.ep.thumbnail ? `<img class="fade" src="${esc(IMG.thumb(r.ep.thumbnail))}" alt="" loading="lazy" decoding="async">` : `<div class="thumb-empty">${ICON.film}</div>`}${st ? `<span class="badge badge-glass">${esc(st.label)}</span>` : ''}</div>
        <div class="ep-result-body">
            <div class="ep-result-kicker">${esc(r.show.title)} · ${esc(isMovie(r.show) ? 'Movie' : epCode(r.s, r.ep.number))}</div>
            <div class="ep-result-title">${highlight(r.ep.title || 'Episode ' + r.ep.number, toks)}</div>
            ${r.ep.description ? `<p class="ep-result-desc">${esc(r.ep.description)}</p>` : ''}
        </div>
    </a>`;
}
function renderSearch(q0) {
    $('view').innerHTML = `<div class="page page-search"><div class="page-inner page-top">
        <form class="search-field" id="searchForm" role="search" autocomplete="off">
            ${ICON.search}
            <input type="search" id="searchInput" placeholder="Search shows, movies and episodes" aria-label="Search shows, movies and episodes" enterkeyhint="search" spellcheck="false" autocomplete="off">
            <button class="search-clear" id="searchClear" type="button" aria-label="Clear search" hidden>${ICON.x}</button>
        </form>
        <div id="searchResults" aria-live="polite"></div>
    </div></div>`;
    const input = $('searchInput');
    input.value = q0;
    let deb = null;
    const run = () => {
        const raw = input.value.trim();
        $('searchClear').hidden = !raw;
        try { history.replaceState(history.state, '', '#/search' + (raw ? '/' + encodeURIComponent(raw) : '')); } catch {}
        const res = $('searchResults');
        const runId = ++searchRun;
        if (!raw) {
            res.innerHTML = `<section class="search-section"><h2 class="section-title">Browse everything</h2><div class="grid">${state.shows.map(posterCard).join('')}</div></section>`;
            return;
        }
        const toks = norm(raw).split(' ').filter(Boolean);
        if (!toks.length) { res.innerHTML = ''; return; }
        const titles = searchTitles(toks);
        res.innerHTML = `${titles.length ? `<section class="search-section"><h2 class="section-title">Titles <span class="count">${titles.length}</span></h2><div class="grid">${titles.map(posterCard).join('')}</div></section>` : ''}
            <section class="search-section" id="epResults"><div class="search-loading"><span class="spinner spinner-sm"></span>Searching episodes…</div></section>`;
        loadEpisodeIndex().then(index => {
            if (runId !== searchRun || !$('epResults')) return;
            const all = searchEpisodes(index, toks);
            const eps = all.slice(0, 60);
            if (eps.length) {
                $('epResults').innerHTML = `<h2 class="section-title">Episodes <span class="count">${all.length}</span></h2><div class="ep-results">${eps.map(r => epResultHtml(r, toks)).join('')}</div>`;
            } else if (titles.length) {
                $('epResults').innerHTML = '';
            } else {
                res.innerHTML = emptyState({ icon: ICON.search, title: `No results for "${raw}"`, text: 'Check the spelling, or try a show, character or episode name.' });
            }
        });
    };
    input.addEventListener('input', () => { clearTimeout(deb); deb = setTimeout(run, 160); });
    $('searchForm').addEventListener('submit', (e) => { e.preventDefault(); clearTimeout(deb); run(); input.blur(); });
    $('searchClear').addEventListener('click', () => { input.value = ''; run(); input.focus(); });
    run();
    if (q0) loadEpisodeIndex();
    if (!tvActive) setTimeout(() => { if (input.isConnected) input.focus({ preventScroll: true }); }, 60);
}

/* ==========================================================================
   Details page
   ========================================================================== */

const STOP = new Set(['lego', 'the', 'and', 'of', 'movie', 'part', 'second', 'legends', 'masters']);
function similarTitles(show) {
    const g = new Set(show.genres || []);
    const words = new Set(norm(show.title).split(' ').filter(w => w.length > 3 && !STOP.has(w)));
    return state.shows.filter(s => s.id !== show.id).map((s, i) => {
        const gOverlap = (s.genres || []).filter(x => g.has(x)).length;
        const wOverlap = norm(s.title).split(' ').filter(w => words.has(w)).length;
        return { s, score: gOverlap + wOverlap * 3 - (s.comingSoon ? 0.5 : 0), i };
    }).filter(x => x.score > 0.5).sort((a, b) => b.score - a.score || a.i - b.i).slice(0, 12).map(x => x.s);
}
function renderDetails(id, opts = {}) {
    const show = getShow(id);
    if (!show) { renderNotFound("That title doesn't exist or was removed."); setTitle('Not found'); return; }
    setTitle(show.title);
    const playable = playableSeasons(show);
    const target = show.comingSoon ? null : findResumeTarget(show);
    const keep = !!opts.keep && state.detail.show && state.detail.show.id === id;
    const hasEpisodes = playable.length > 0 && !isMovie(show) && !show.comingSoon;
    const similar = similarTitles(show);
    const tabs = [hasEpisodes && ['episodes', 'Episodes'], similar.length && ['similar', 'More like this'], ['about', 'Details']].filter(Boolean);
    let tab = keep ? state.detail.tab : tabs[0][0];
    if (!tabs.some(t => t[0] === tab)) tab = tabs[0][0];
    state.detail = { show, seasonIdx: keep ? state.detail.seasonIdx : -1, tab, reqId: state.detail.reqId + 1 };

    const resumeNote = target && target.resume && target.p
        ? `<div class="resume-note"><div class="progress-bar progress-inline"><span style="width:${progPct(target.p).toFixed(1)}%"></span></div><span>${isMovie(show) ? '' : esc(epCode(target.s, target.e)) + ' · '}${esc(target.p.d ? fmtMinutes(target.p.d - target.p.t) + ' left' : fmtClock(target.p.t) + ' watched')}</span></div>`
        : (target && target.upNext ? `<div class="resume-note"><span>Up next: ${esc(epCode(target.s, target.e))}${target.p.title ? ' · ' + esc(target.p.title) : ''}</span></div>` : '');

    $('view').innerHTML = `<div class="page page-details">
        <section class="detail-hero">
            <div class="detail-bg" style="background-image:${esc(cssUrl(IMG.banner(show.banner || show.poster || '')))}"></div>
            <div class="detail-scrim"></div>
            <div class="detail-content page-inner">
                ${show.logo
                    ? `<h1 class="detail-title"><img class="detail-logo" src="${esc(IMG.logo(show.logo))}" alt="${esc(show.title)}" data-alt-text="${esc(show.title)}"></h1>`
                    : `<h1 class="detail-title"><span class="detail-title-text">${esc(show.title)}</span></h1>`}
                <div class="meta-line">${metaHtml(show)}${show.comingSoon ? '' : '<i class="meta-sep" aria-hidden="true"></i><span class="badge badge-outline">HD</span>'}</div>
                <p class="detail-summary">${esc(show.summary || '')}</p>
                ${show.comingSoon && show.comingSoonNote ? `<p class="detail-note">${esc(show.comingSoonNote)}</p>` : ''}
                <div class="detail-actions">
                    ${show.comingSoon
                        ? `<span class="soon-pill">${ICON.clock}<span>${esc(show.comingSoonText || 'Coming soon')}</span></span>`
                        : `${target ? `<button class="btn btn-primary btn-lg" id="detailPlayBtn" type="button">${ICON.play}<span>${esc(resumeLabel(show, target))}</span></button>` : ''}
                           ${listBtnHtml(show.id, isInMyList(show.id), 'icon-btn icon-btn-lg')}`}
                    <button class="icon-btn icon-btn-lg" id="detailShareBtn" type="button" aria-label="Share" title="Share">${ICON.share}</button>
                </div>
                ${resumeNote}
                ${(show.seasons || []).some(s => s.comingSoonText) ? `<div class="tag-row">${show.seasons.filter(s => s.comingSoonText).map(s => `<span class="badge badge-accent-soft">${esc(s.comingSoonText)}</span>`).join('')}</div>` : ''}
            </div>
        </section>
        <div class="page-inner detail-body">
            <div class="tabs" role="tablist" id="detailTabs">
                ${tabs.map(([k, label]) => `<button class="tab" type="button" role="tab" id="tab-${k}" data-tab="${k}" aria-controls="tabPanel">${esc(label)}</button>`).join('')}
            </div>
            <div id="tabPanel" role="tabpanel"></div>
        </div>
    </div>`;

    const playBtn = $('detailPlayBtn');
    if (playBtn) playBtn.addEventListener('click', () => playEpisodeByRef(show.id, target.s, target.e));
    $('detailShareBtn').addEventListener('click', () => shareLink(show.title, '#/details/' + encodeURIComponent(show.id)));
    $$('#detailTabs .tab').forEach(t => t.addEventListener('click', () => setDetailTab(t.dataset.tab)));
    $('detailTabs').addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        if (tvActive) return;
        const list = $$('#detailTabs .tab');
        const i = list.indexOf(document.activeElement);
        if (i < 0) return;
        const next = list[(i + (e.key === 'ArrowRight' ? 1 : -1) + list.length) % list.length];
        next.focus(); setDetailTab(next.dataset.tab);
    });
    setDetailTab(tab);
}
function setDetailTab(tab) {
    state.detail.tab = tab;
    $$('#detailTabs .tab').forEach(t => {
        const on = t.dataset.tab === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on);
        t.tabIndex = on ? 0 : -1;
    });
    const panel = $('tabPanel');
    if (panel) panel.setAttribute('aria-labelledby', 'tab-' + tab);
    if (tab === 'episodes') renderEpisodesTab();
    else if (tab === 'similar') renderSimilarTab();
    else renderAboutTab();
}
function renderSimilarTab() {
    $('tabPanel').innerHTML = `<div class="grid">${similarTitles(state.detail.show).map(posterCard).join('')}</div>`;
}
function renderAboutTab() {
    const show = state.detail.show;
    const playable = playableSeasons(show);
    const fields = [];
    if (show.years) fields.push(['Released', esc(show.years)]);
    if (show.genres && show.genres.length) fields.push(['Genres', esc(show.genres.join(', '))]);
    if (show.rating) fields.push(['Rating', esc(show.rating)]);
    if (isMovie(show)) { if (show.runtime) fields.push(['Runtime', esc(show.runtime)]); }
    else if (playable.length && !show.comingSoon) fields.push(['Seasons', String(seasonCount(show))]);
    if (show.creator) fields.push(['Created by', esc(Array.isArray(show.creator) ? show.creator.join(', ') : show.creator)]);
    if (show.starring && show.starring.length) fields.push(['Starring', show.starring.map(esc).join('<br>')]);
    $('tabPanel').innerHTML = `<div class="about">
        <div class="about-main">
            <h2 class="about-title">${esc(show.title)}</h2>
            <p>${esc(show.summary || 'No description available.')}</p>
        </div>
        <dl class="about-facts">${fields.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v}</dd></div>`).join('')}</dl>
    </div>`;
}
function renderEpisodesTab() {
    const show = state.detail.show;
    const playable = playableSeasons(show);
    const panel = $('tabPanel');
    if (!playable.length) { panel.innerHTML = emptyState({ title: 'No episodes available yet' }); return; }
    let si = state.detail.seasonIdx;
    if (si < 0 || si >= playable.length) {
        si = 0;
        const latest = latestEntryForShow(show.id);
        const want = seasonMemo.has(show.id) ? seasonMemo.get(show.id) : (latest ? latest.s : null);
        if (want != null) { const i = playable.findIndex(s => s.number === want); if (i >= 0) si = i; }
    }
    const useMenu = playable.length > 6;
    let picker;
    if (playable.length === 1) picker = `<h2 class="season-single">${esc(seasonLabel(playable[0].number))}</h2>`;
    else if (useMenu) picker = `<div class="dropdown" id="seasonDropdown">
            <button class="dropdown-btn" id="seasonBtn" type="button" aria-haspopup="listbox" aria-expanded="false"><span id="seasonLabel">${esc(seasonLabel(playable[si].number))}</span>${ICON.chevD}</button>
            <div class="dropdown-menu" id="seasonMenu" role="listbox">${playable.map((s, i) => `<button class="dropdown-opt" type="button" role="option" data-si="${i}">${esc(seasonLabel(s.number))}</button>`).join('')}</div>
        </div>`;
    else picker = `<div class="chips season-chips" role="tablist" aria-label="Seasons">${playable.map((s, i) => `<button class="chip" type="button" role="tab" data-si="${i}">${esc(seasonLabel(s.number))}</button>`).join('')}</div>`;
    panel.innerHTML = `<div class="season-bar">${picker}<span class="season-count" id="seasonCount"></span></div><div class="ep-list" id="epList"></div>`;
    if (useMenu && playable.length > 1) {
        const dd = $('seasonDropdown'), btn = $('seasonBtn');
        btn.addEventListener('click', (e) => { e.stopPropagation(); setDropdown(!dd.classList.contains('is-open')); });
        $$('#seasonMenu .dropdown-opt').forEach(o => o.addEventListener('click', () => { setDropdown(false); pickDetailSeason(+o.dataset.si); btn.focus(); }));
    } else {
        $$('.season-chips .chip', panel).forEach(c => c.addEventListener('click', () => pickDetailSeason(+c.dataset.si)));
    }
    pickDetailSeason(si);
}
function setDropdown(open) {
    const dd = $('seasonDropdown');
    if (!dd) return;
    dd.classList.toggle('is-open', open);
    $('seasonBtn').setAttribute('aria-expanded', open);
    if (open) {
        const active = dd.querySelector('.dropdown-opt.is-active') || dd.querySelector('.dropdown-opt');
        if (active) { active.scrollIntoView({ block: 'nearest' }); if (tvActive || document.activeElement === $('seasonBtn')) active.focus({ preventScroll: true }); }
    }
}
document.addEventListener('click', (e) => {
    const dd = $('seasonDropdown');
    if (dd && dd.classList.contains('is-open') && !dd.contains(e.target)) setDropdown(false);
});
function pickDetailSeason(si) {
    const show = state.detail.show;
    const playable = playableSeasons(show);
    if (si < 0 || si >= playable.length) return;
    state.detail.seasonIdx = si;
    const ref = playable[si];
    seasonMemo.set(show.id, ref.number);
    const lbl = $('seasonLabel');
    if (lbl) lbl.textContent = seasonLabel(ref.number);
    $$('#seasonMenu .dropdown-opt').forEach((o, j) => { o.classList.toggle('is-active', j === si); o.setAttribute('aria-selected', j === si); });
    $$('.season-chips .chip').forEach((c, j) => { c.classList.toggle('is-active', j === si); c.setAttribute('aria-selected', j === si); });
    const reqId = ++state.detail.reqId;
    const done = (data) => {
        if (reqId !== state.detail.reqId || !$('epList')) return;
        if (data.type === 'external') renderExternalSeason(data);
        else renderEpisodeList(show, ref.number, data);
        applyPendingScroll();
    };
    const cached = seasonDataSync(ref.file);
    if (cached) { done(cached); return; }
    showEpSkeleton();
    fetchSeason(ref.file).then(done).catch(() => {
        if (reqId !== state.detail.reqId || !$('epList')) return;
        $('seasonCount').textContent = '';
        $('epList').innerHTML = emptyState({ icon: ICON.alert, title: "Couldn't load episodes", text: 'Check your connection and try again.', action: '<button class="btn btn-glass" type="button" id="retrySeason">Try again</button>' });
        $('retrySeason').addEventListener('click', () => pickDetailSeason(si));
    });
}
function showEpSkeleton() {
    const el = $('epList');
    if (!el) return;
    el.innerHTML = Array(4).fill('<div class="ep ep-skel"><div class="ep-thumb skeleton"></div><div class="ep-body"><div class="skel-line skeleton" style="width:55%"></div><div class="skel-line skeleton" style="width:90%"></div><div class="skel-line skeleton" style="width:70%"></div></div></div>').join('');
}
function renderExternalSeason(data) {
    $('seasonCount').textContent = '';
    const btn = data.button && data.button.url ? data.button : null;
    $('epList').innerHTML = `<div class="notice">
        <div class="notice-icon">${ICON.external}</div>
        <div class="notice-body">
            <h3>Not available to stream here</h3>
            ${data.note ? `<p>${esc(data.note)}</p>` : ''}
            ${btn ? `<a class="btn btn-primary" href="${esc(btn.url)}" target="_blank" rel="noopener">${ICON.external}<span>${esc(btn.label || 'Open')}</span></a>` : ''}
        </div>
    </div>`;
}
function epRowHtml(show, seasonNumber, ep, i) {
    const st = epStatus(ep);
    const p = st ? null : getProgress(show.id, seasonNumber, ep.number);
    const dur = st ? '' : knownDuration(ep);
    const playable = !st && isPlayable(ep);
    const href = `#/details/${encodeURIComponent(show.id)}/${seasonNumber}/${ep.number}`;
    return `<div class="ep${st ? ' is-status' : ''}${isWatched(p) ? ' is-watched' : ''}">
        <div class="ep-thumb">
            ${ep.thumbnail ? `<img class="fade" src="${esc(IMG.thumb(ep.thumbnail))}" alt="" loading="lazy" decoding="async" draggable="false">` : `<div class="thumb-empty">${ICON.film}</div>`}
            ${st ? `<span class="ep-status">${esc(st.label)}</span>` : ''}
            ${playable ? `<button class="ep-play" type="button" data-play-ep="${i}" aria-label="Play episode ${esc(String(ep.number))}: ${esc(ep.title || '')}"><span>${ICON.play}</span></button>` : ''}
            ${isWatched(p) ? `<span class="ep-check" title="Watched">${ICON.check}</span>` : ''}
            ${isInProgress(p) ? `<div class="progress-bar"><span style="width:${progPct(p).toFixed(1)}%"></span></div>` : ''}
        </div>
        <div class="ep-body">
            <div class="ep-head">
                <h3 class="ep-title"><a class="ep-link" href="${href}" draggable="false"><span class="ep-num">${esc(String(ep.number))}.</span> ${esc(ep.title || 'Episode ' + ep.number)}</a></h3>
                ${st ? '' : `<span class="ep-dur" data-dur-url="${esc((ep.embed || '').trim())}">${esc(dur)}</span>`}
            </div>
            ${ep.description ? `<p class="ep-desc">${esc(ep.description)}</p>` : ''}
        </div>
    </div>`;
}
function renderEpisodeList(show, seasonNumber, data) {
    const eps = Array.isArray(data.episodes) ? data.episodes : [];
    const el = $('epList');
    const upcoming = eps.filter(e => epStatus(e)).length;
    $('seasonCount').textContent = eps.length ? plural(eps.length, 'episode') + (upcoming ? ` · ${upcoming} coming soon` : '') : '';
    if (!eps.length) { el.innerHTML = emptyState({ title: 'No episodes in this season yet' }); return; }
    el.innerHTML = eps.map((ep, i) => epRowHtml(show, seasonNumber, ep, i)).join('');
    $$('[data-play-ep]', el).forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPlayer(show, seasonNumber, data, +btn.dataset.playEp);
    }));
    observeDurations(el);
}
function observeDurations(scope) {
    if (state.durIO) state.durIO.disconnect();
    if (!('IntersectionObserver' in window)) return;
    state.durIO = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            state.durIO.unobserve(en.target);
            if (!en.target.textContent.trim() && en.target.dataset.durUrl) queueDuration(en.target.dataset.durUrl, en.target);
        });
    }, { rootMargin: '200px 0px' });
    $$('.ep-dur', scope).forEach(r => state.durIO.observe(r));
}

/* ==========================================================================
   Episode page
   ========================================================================== */

function renderEpisodePage(id, sNum, eNum) {
    const show = getShow(id);
    if (!show) { renderNotFound("That title doesn't exist or was removed."); setTitle('Not found'); return; }
    const ref = playableSeasons(show).find(x => x.number === sNum);
    if (!ref) { location.replace('#/details/' + encodeURIComponent(id)); return; }
    const draw = (data) => {
        if (state.route.name !== 'episode' || state.route.id !== id || state.route.s !== sNum || state.route.e !== eNum) return;
        if (!isEpisodeSeason(data) || !data.episodes.length) { location.replace('#/details/' + encodeURIComponent(id)); return; }
        const idx = data.episodes.findIndex(x => x.number === eNum);
        if (idx < 0) { location.replace('#/details/' + encodeURIComponent(id)); return; }
        renderEpisodePageContent(show, ref.number, data, idx);
        applyPendingScroll();
    };
    const cached = seasonDataSync(ref.file);
    if (cached) { draw(cached); return; }
    setTitle(show.title);
    $('view').innerHTML = `<div class="page"><div class="page-inner page-top"><div class="ep-page-grid"><div class="ep-page-media skeleton"></div><div><div class="skel-line skeleton" style="width:30%"></div><div class="skel-line skeleton" style="width:70%;height:32px"></div><div class="skel-line skeleton" style="width:90%"></div><div class="skel-line skeleton" style="width:80%"></div></div></div></div></div>`;
    fetchSeason(ref.file).then(draw).catch(() => {
        $('view').innerHTML = `<div class="page"><div class="page-inner page-top">${emptyState({ icon: ICON.alert, title: "Couldn't load this episode", text: 'Check your connection and try again.', action: `<a class="btn btn-primary" href="#/details/${encodeURIComponent(id)}">Back to ${esc(show.title)}</a>` })}</div></div>`;
    });
}
function renderEpisodePageContent(show, seasonNumber, data, idx) {
    const eps = data.episodes;
    const ep = eps[idx];
    const st = epStatus(ep);
    const p = st ? null : getProgress(show.id, seasonNumber, ep.number);
    const watched = isWatched(p), inProg = isInProgress(p);
    const dur = st ? '' : knownDuration(ep);
    const prevEp = idx > 0 ? eps[idx - 1] : null;
    const nextEp = idx < eps.length - 1 ? eps[idx + 1] : null;
    const canPlay = isPlayable(ep);
    const base = `#/details/${encodeURIComponent(show.id)}/${seasonNumber}/`;
    const img = ep.thumbnail || show.banner || '';
    setTitle(`${ep.title || 'Episode ' + ep.number} · ${show.title}`);
    $('view').innerHTML = `<div class="page page-episode">
        <div class="ep-backdrop"><div class="ep-backdrop-img" style="background-image:${esc(cssUrl(IMG.card(img)))}"></div></div>
        <div class="page-inner page-top ep-page">
            <nav class="crumbs" aria-label="Breadcrumb">
                <a href="#/details/${encodeURIComponent(show.id)}">${ICON.chevL}<span>${esc(show.title)}</span></a>
                ${isMovie(show) ? '' : `<span class="crumb-sep">/</span><span>${esc(seasonLabel(seasonNumber))}</span>`}
            </nav>
            <div class="ep-page-grid">
                <div class="ep-page-media${st ? ' is-status' : ''}">
                    ${img ? `<img class="fade" src="${esc(IMG.still(img))}" alt="" decoding="async">` : `<div class="thumb-empty">${ICON.film}</div>`}
                    ${st ? `<span class="ep-status">${esc(st.label)}</span>` : ''}
                    ${canPlay ? `<button class="ep-page-play" type="button" data-ep-page-play aria-label="Play">${ICON.play}</button>` : ''}
                    ${inProg ? `<div class="progress-bar"><span style="width:${progPct(p).toFixed(1)}%"></span></div>` : ''}
                </div>
                <div class="ep-page-info">
                    <p class="eyebrow">${isMovie(show) ? 'Movie' : `${esc(seasonLabel(seasonNumber))} · Episode ${esc(String(ep.number))}`}</p>
                    <h1 class="ep-page-title">${esc(ep.title || 'Episode ' + ep.number)}</h1>
                    <div class="meta-line">
                        ${st ? `<span class="badge badge-accent-soft">${esc(st.label)}</span>` : ''}
                        ${dur ? `<span>${esc(dur)}</span>` : (ep.embed && !st ? '<span id="epPageDur"></span>' : '')}
                        ${show.rating ? `<span class="badge badge-outline">${esc(show.rating)}</span>` : ''}
                        ${watched ? `<span class="badge badge-success">${ICON.check}Watched</span>` : ''}
                    </div>
                    <p class="ep-page-desc">${esc(ep.description || 'No description available for this episode.')}</p>
                    <div class="detail-actions">
                        ${canPlay
                            ? `<button class="btn btn-primary btn-lg" type="button" data-ep-page-play>${ICON.play}<span>${inProg ? 'Resume' : 'Play'}</span></button>`
                            : `<button class="btn btn-primary btn-lg" type="button" disabled>${st ? esc(st.label) : 'Unavailable'}</button>`}
                        ${listBtnHtml(show.id, isInMyList(show.id), 'icon-btn icon-btn-lg')}
                        <button class="icon-btn icon-btn-lg" id="epShareBtn" type="button" aria-label="Share" title="Share">${ICON.share}</button>
                    </div>
                    ${inProg ? `<p class="hint">You're ${Math.round(progPct(p))}% through. Playback resumes from ${fmtClock(p.t)}.</p>` : ''}
                    ${st && st.id === 'upcoming' ? '<p class="hint">This episode isn\'t out yet. Check back soon.</p>' : ''}
                    <div class="ep-pager">
                        ${prevEp ? `<a class="pager-link" href="${base}${prevEp.number}">${ICON.chevL}<span><small>Previous</small>${esc(prevEp.title || 'Episode ' + prevEp.number)}</span></a>` : '<span></span>'}
                        ${nextEp ? `<a class="pager-link pager-next" href="${base}${nextEp.number}"><span><small>Next</small>${esc(nextEp.title || 'Episode ' + nextEp.number)}</span>${ICON.chevR}</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
        ${eps.length > 1 ? `<div id="epMoreSlot"></div>` : ''}
    </div>`;
    $$('[data-ep-page-play]').forEach(b => b.addEventListener('click', () => openPlayer(show, seasonNumber, data, idx)));
    $('epShareBtn').addEventListener('click', () => shareLink(`${show.title}: ${ep.title || ''}`, base + ep.number));
    const durEl = $('epPageDur');
    if (durEl) queueDuration((ep.embed || '').trim(), durEl);
    if (eps.length > 1) {
        const cards = eps.map((e2) => {
            const st2 = epStatus(e2);
            const p2 = st2 ? null : getProgress(show.id, seasonNumber, e2.number);
            return `<div class="card wide-card mini-ep${e2 === ep ? ' is-current' : ''}${st2 ? ' is-status' : ''}">
                <a class="card-link" href="${base}${e2.number}" draggable="false"${e2 === ep ? ' aria-current="page"' : ''}>
                    <div class="card-media card-media-wide">
                        ${e2.thumbnail ? `<img class="card-img fade" src="${esc(IMG.thumb(e2.thumbnail))}" alt="" loading="lazy" decoding="async" draggable="false">` : ''}
                        <div class="card-fallback"><span>${esc(e2.title || '')}</span></div>
                        ${st2 ? `<span class="ep-status">${esc(st2.label)}</span>` : ''}
                        ${e2 === ep ? '<span class="badge badge-accent card-badge">Now viewing</span>' : ''}
                        ${isWatched(p2) ? `<span class="ep-check">${ICON.check}</span>` : ''}
                        ${isInProgress(p2) ? `<div class="progress-bar"><span style="width:${progPct(p2).toFixed(1)}%"></span></div>` : ''}
                    </div>
                    <div class="card-caption"><div class="card-caption-sub">${esc(isMovie(show) ? '' : 'Episode ' + e2.number)}</div><div class="card-caption-title">${esc(e2.title || '')}</div></div>
                </a>
            </div>`;
        }).join('');
        $('epMoreSlot').innerHTML = railSection({ id: 'rowEpisodes', title: isMovie(show) ? 'More' : `More from ${seasonLabel(seasonNumber)}`, html: cards, cls: 'row-wide' });
        bindRails($('epMoreSlot'));
        const cur = $('epMoreSlot').querySelector('.is-current');
        const track = $('rowEpisodes');
        if (cur && track) track.scrollLeft = Math.max(0, cur.offsetLeft - track.clientWidth / 2 + cur.offsetWidth / 2);
    }
    tvInitialFocus();
}

async function shareLink(title, hash) {
    const url = location.origin + location.pathname + hash;
    if (navigator.share && window.matchMedia && matchMedia('(pointer: coarse)').matches) {
        try { await navigator.share({ title, url }); return; } catch (e) { if (e && e.name === 'AbortError') return; }
    }
    try { await navigator.clipboard.writeText(url); toast('Link copied to clipboard'); }
    catch { window.prompt('Copy this link:', url); }
}

/* ---------- Starting playback from anywhere ---------- */

function smartPlayShow(show) {
    if (show.comingSoon) { location.hash = '#/details/' + encodeURIComponent(show.id); return; }
    const target = findResumeTarget(show);
    if (!target) { location.hash = '#/details/' + encodeURIComponent(show.id); return; }
    playEpisodeByRef(show.id, target.s, target.e);
}
async function playEpisodeByRef(showId, sNum, eNum) {
    const show = getShow(showId);
    if (!show) return;
    const playable = playableSeasons(show);
    // An explicit season → just that one; otherwise walk seasons for the first
    // playable episode (skips external-only and upcoming seasons).
    const tryList = sNum != null ? playable.filter(x => x.number === sNum) : playable;
    if (!tryList.length) { location.hash = '#/details/' + encodeURIComponent(showId); return; }
    for (const ref of tryList) {
        let data;
        try { data = await fetchSeason(ref.file); } catch { continue; }
        if (!isEpisodeSeason(data) || !data.episodes.length) continue;
        const eps = data.episodes;
        if (eNum != null) {
            const idx = eps.findIndex(x => x.number === eNum);
            if (idx < 0) continue;
            if (!isPlayable(eps[idx])) { location.hash = `#/details/${encodeURIComponent(showId)}/${ref.number}/${eNum}`; return; }
            openPlayer(show, ref.number, data, idx);
            return;
        }
        const idx = eps.findIndex(isPlayable);
        if (idx < 0) continue;
        openPlayer(show, ref.number, data, idx);
        return;
    }
    location.hash = '#/details/' + encodeURIComponent(showId);
    toast('No streamable episodes available yet.', { icon: ICON.alert });
}
async function findNeighbor(show, seasonNumber, seasonData, epIdx, dir) {
    const eps = (seasonData && seasonData.episodes) || [];
    for (let i = epIdx + dir; i >= 0 && i < eps.length; i += dir) {
        if (isPlayable(eps[i])) return { seasonNumber, data: seasonData, idx: i };
    }
    const refs = playableSeasons(show);
    const si = refs.findIndex(r => r.number === seasonNumber);
    if (si < 0) return null;
    for (let k = si + dir; k >= 0 && k < refs.length; k += dir) {
        let data;
        try { data = await fetchSeason(refs[k].file); } catch { continue; }
        if (!isEpisodeSeason(data)) continue;
        const list = data.episodes;
        if (dir > 0) { const i = list.findIndex(isPlayable); if (i >= 0) return { seasonNumber: refs[k].number, data, idx: i }; }
        else { for (let i = list.length - 1; i >= 0; i--) if (isPlayable(list[i])) return { seasonNumber: refs[k].number, data, idx: i }; }
    }
    return null;
}

/* ==========================================================================
   Player
   ========================================================================== */

const playerEl = $('player');
const video = $('pVideo');
const frame = $('pFrame');
const stage = $('pVideoArea');
function playerOpen() { return playerEl.classList.contains('is-open'); }
const curEp = () => (state.play.seasonData && state.play.seasonData.episodes ? state.play.seasonData.episodes[state.play.epIdx] : null);

function revokeObjectUrls() {
    (video._objectUrls || []).forEach(u => { try { URL.revokeObjectURL(u); } catch {} });
    video._objectUrls = [];
}
function detachCueTrack() {
    if (state.play.cueTrack) { try { state.play.cueTrack.removeEventListener('cuechange', renderActiveCues); } catch {} state.play.cueTrack = null; }
}
// Stop whatever is playing and drop every per-source handler. Bumping loadTok
// invalidates late callbacks (resume seeks, subtitle fetches) from the old source.
function stopMedia() {
    state.play.loadTok++;
    video.ontimeupdate = video.onplay = video.onpause = video.onended = video.onwaiting =
        video.onplaying = video.oncanplay = video.onerror = video.onprogress = null;
    try { video.pause(); } catch {}
    detachCueTrack();
    state.play.subIdx = -1;
    if (state.hls) { try { state.hls.destroy(); } catch {} state.hls = null; }
    try { video.removeAttribute('src'); while (video.firstChild) video.removeChild(video.firstChild); video.load(); } catch {}
    revokeObjectUrls();
    // Removing the src attribute would leave the embed running; navigate it away instead.
    const fsrc = frame.getAttribute('src');
    if (fsrc && fsrc !== 'about:blank') frame.src = 'about:blank';
    frame.hidden = true;
    $$('.player-msg', stage).forEach(e => e.remove());
    playerEl.classList.remove('has-msg', 'is-embed');
    $$('.scrub-marker').forEach(m => m.remove());
    $('subOverlay').innerHTML = '';
    $('skipBtn').classList.remove('is-shown');
    hideUpNext();
    $('pLoader').classList.remove('is-shown');
    updateScrub(0, 0);
    $('pBuffered').style.width = '0%';
    $('timeDisplay').textContent = '0:00 / 0:00';
    $('qualWrap').hidden = true;
    $('pipBtn').hidden = true;
    $('airplayBtn').hidden = true;
    state.currentSkipTarget = null;
    closeAllPopups();
    updatePlayIcon(false);
    updateCCBtn();
}
function saveCurrentPosition() {
    const { show, seasonNumber, kind } = state.play;
    const ep = curEp();
    if (kind !== 'direct' || !show || !ep) return;
    if (video.currentTime > 0 && isFinite(video.duration) && video.duration > 0) {
        setProgress(show.id, seasonNumber, ep.number, video.currentTime, video.duration, { title: ep.title, thumb: ep.thumbnail });
    }
}

function openPlayer(show, seasonNumber, seasonData, epIdx) {
    const eps = (seasonData && seasonData.episodes) || [];
    const ep = eps[epIdx];
    if (!ep) return;
    if (playerOpen()) saveCurrentPosition();
    Object.assign(state.play, {
        show, seasonNumber, seasonData, epIdx,
        sources: episodeSources(ep), srcIdx: -1, kind: null, defaultSubPicked: false,
        next: null, prev: null, nextP: null, upNextDismissed: false, watchedMarked: false,
    });
    const tok = ++state.play.token;
    seasonMemo.set(show.id, seasonNumber);
    if (!playerOpen()) {
        state.play.returnFocus = document.activeElement;
        try { history.pushState({ lsPlayer: true }, '', location.href); state.play.pushed = true; } catch {}
    }
    stopMedia();
    const movie = isMovie(show);
    $('pShowName').textContent = show.title;
    $('pEpName').textContent = movie
        ? (ep.title && ep.title !== show.title ? ep.title : '')
        : `${epCode(seasonNumber, ep.number)} · ${ep.title || 'Episode ' + ep.number}`;
    $('srcWrap').hidden = state.play.sources.length < 2;
    $('prevEpBtn').hidden = movie;
    $('nextEpBtn').hidden = movie;
    updateEpNavButtons();
    playerEl.classList.add('is-open');
    document.body.classList.add('is-locked');
    heroHold('player', true);
    applySubStyle();

    if (!movie) {
        state.play.nextP = findNeighbor(show, seasonNumber, seasonData, epIdx, 1).catch(() => null);
        state.play.nextP.then(n => { if (tok === state.play.token) { state.play.next = n; updateEpNavButtons(); } });
        findNeighbor(show, seasonNumber, seasonData, epIdx, -1).catch(() => null)
            .then(n => { if (tok === state.play.token) { state.play.prev = n; updateEpNavButtons(); } });
    } else {
        state.play.nextP = Promise.resolve(null);
    }

    requestAnimationFrame(() => { if (playerOpen()) playerEl.focus({ preventScroll: true }); });
    if (!state.play.sources.length) {
        showPlayerMessage({ title: 'Video unavailable', text: 'This episode could not be loaded. Try again later or report it on Discord.', actions: discordBtn() });
        return;
    }
    const first = state.play.sources.findIndex(s => s.type !== 'tab');
    if (first < 0) { showSourcePanel('This episode opens in an external player:'); return; }
    startSource(first);
}
function updateEpNavButtons() {
    $('prevEpBtn').disabled = !state.play.prev;
    $('nextEpBtn').disabled = !state.play.next;
}
function startSource(i) {
    const src = state.play.sources[i];
    if (!src) return;
    if (src.type === 'tab') { window.open(src.url, '_blank', 'noopener'); return; }
    const ep = curEp();
    stopMedia();
    const ltok = state.play.loadTok;
    state.play.srcIdx = i;
    state.play.kind = src.type;
    if (src.type === 'iframe') {
        playerEl.classList.add('is-embed');
        playerEl.classList.remove('hide-ui');
        video.hidden = true;
        frame.hidden = false;
        frame.src = toEmbedUrl(src.url);
    } else {
        video.hidden = false;
        $('pLoader').classList.add('is-shown');
        $('airplayBtn').hidden = !window.WebKitPlaybackTargetAvailabilityEvent;
        $('pipBtn').hidden = !(document.pictureInPictureEnabled && !video.disablePictureInPicture);
        setupVideo(src.url, ep, ltok);
    }
    buildSrcMenu();
    resetCtrlTimer();
}

function setupVideo(url, ep, ltok) {
    const { show, seasonNumber: sNum } = state.play;
    const live = () => ltok === state.play.loadTok;
    const existing = getProgress(show.id, sNum, ep.number);
    const startTime = isInProgress(existing) ? existing.t : 0;
    const meta = { title: ep.title, thumb: ep.thumbnail };
    const introS = num(ep.introStart), introE = num(ep.introEnd);
    const recapS = num(ep.recapStart), recapE = num(ep.recapEnd);

    attachSubtitles(ep, ltok);
    applyStoredVolume();
    video.playbackRate = state.playbackSpeed;
    updateSpeedLabel();

    video.ontimeupdate = () => {
        const ct = video.currentTime, dur = video.duration;
        if (ct > 0 && isFinite(dur) && Date.now() - state.lastProgSave > 3000) {
            state.lastProgSave = Date.now();
            setProgress(show.id, sNum, ep.number, ct, dur, meta);
            if (!state.play.watchedMarked && ct / dur >= 0.95) { state.play.watchedMarked = true; queueUpNextMark(); }
        }
        updateScrub(ct, dur);
        updateTime(ct, dur);
        const sb = $('skipBtn');
        if (recapS != null && recapE != null && ct >= recapS && ct < recapE) {
            sb.textContent = 'Skip Recap'; state.currentSkipTarget = recapE; sb.classList.add('is-shown');
        } else if (introS != null && introE != null && ct >= introS && ct < introE) {
            sb.textContent = 'Skip Intro'; state.currentSkipTarget = introE; sb.classList.add('is-shown');
        } else { sb.classList.remove('is-shown'); state.currentSkipTarget = null; }
        const nx = state.play.next;
        const remain = dur - ct;
        if (nx && isFinite(dur) && dur > 60 && remain <= 15 && remain > 0 && !state.play.upNextDismissed) showUpNext(nx, remain, false);
        else if (remain > 15) hideUpNext();
    };
    video.onended = () => {
        if (!live()) return;
        if (isFinite(video.duration) && video.duration > 0) setProgress(show.id, sNum, ep.number, video.duration, video.duration, meta);
        queueUpNextMark();
        const tok = state.play.token;
        state.play.nextP.then(nx => {
            if (tok !== state.play.token) return;
            if (!nx) { requestClosePlayer(); return; }
            if (autoplayOn() && !state.play.upNextDismissed) playNext();
            else { showUpNext(nx, 0, true); playerEl.classList.remove('hide-ui'); }
        });
    };
    video.onplay = () => { updatePlayIcon(true); $('pLoader').classList.remove('is-shown'); resetCtrlTimer(); };
    video.onpause = () => { updatePlayIcon(false); playerEl.classList.remove('hide-ui'); saveCurrentPosition(); };
    video.onwaiting = () => $('pLoader').classList.add('is-shown');
    video.onplaying = () => $('pLoader').classList.remove('is-shown');
    video.oncanplay = () => $('pLoader').classList.remove('is-shown');
    video.onprogress = updateBuffered;

    const onReady = () => {
        if (!live()) return;
        $('pLoader').classList.remove('is-shown');
        // HLS duration is unknown at MANIFEST_PARSED, so the resume seek waits for metadata.
        let resumed = false;
        const applyResume = () => {
            if (!live() || resumed || !isFinite(video.duration) || !video.duration) return;
            resumed = true;
            if (startTime > 0 && startTime < video.duration - 10) video.currentTime = startTime;
            addScrubMarkers(video.duration, introS, introE, recapS, recapE);
        };
        applyResume();
        if (!resumed) {
            video.addEventListener('loadedmetadata', applyResume, { once: true });
            video.addEventListener('durationchange', applyResume, { once: true });
        }
        const p = video.play();
        if (p && p.catch) p.catch(() => { if (live()) { updatePlayIcon(false); playerEl.classList.remove('hide-ui'); $('pLoader').classList.remove('is-shown'); } });
        video.playbackRate = state.playbackSpeed;
        if (state.hls && state.hls.levels && state.hls.levels.length > 1) $('qualWrap').hidden = false;
    };
    if (/\.m3u8(\?|#|$)/i.test(url) && window.Hls && Hls.isSupported()) {
        const hls = new Hls({ maxBufferLength: 30 });
        state.hls = hls;
        let netRetries = 0, mediaRetries = 0;
        hls.on(Hls.Events.MANIFEST_PARSED, onReady);
        hls.on(Hls.Events.ERROR, (_, d) => {
            if (!live() || !d.fatal) return;
            if (d.type === Hls.ErrorTypes.NETWORK_ERROR && netRetries++ < 2) { hls.startLoad(); return; }
            if (d.type === Hls.ErrorTypes.MEDIA_ERROR && mediaRetries++ < 2) { hls.recoverMediaError(); return; }
            console.error('HLS fatal error', d);
            fatalPlaybackError();
        });
        hls.loadSource(url);
        hls.attachMedia(video);
    } else {
        video.onerror = () => { if (live()) fatalPlaybackError(); };
        video.addEventListener('loadedmetadata', onReady, { once: true });
        video.src = url;
    }
}
function queueUpNextMark() {
    const show = state.play.show;
    const p = state.play.nextP;
    if (!show || !p) return;
    p.then(nx => { if (nx) markUpNext(show.id, nx.seasonNumber, nx.data.episodes[nx.idx]); });
}
function discordBtn(label = 'Report on Discord') {
    return `<a class="btn btn-glass" href="${DISCORD_URL}" target="_blank" rel="noopener">${ICON.discord}<span>${esc(label)}</span></a>`;
}
function showPlayerMessage({ icon = ICON.alert, title, text, actions = '' }) {
    $$('.player-msg', stage).forEach(e => e.remove());
    $('pLoader').classList.remove('is-shown');
    const d = document.createElement('div');
    d.className = 'player-msg';
    d.innerHTML = `<div class="player-msg-icon">${icon}</div><h3>${esc(title)}</h3><p>${esc(text)}</p><div class="player-msg-actions">${actions}</div>`;
    stage.appendChild(d);
    playerEl.classList.add('has-msg');
    playerEl.classList.remove('hide-ui');
    return d;
}
function fatalPlaybackError() {
    const others = state.play.sources.some((s, i) => i !== state.play.srcIdx);
    if (others) { showSourcePanel('Playback failed with this source. Try another one:'); return; }
    const d = showPlayerMessage({
        title: 'Video unavailable',
        text: "This episode couldn't be loaded. Try again, or report it on Discord if it keeps happening.",
        actions: `<button class="btn btn-primary" type="button" data-retry>${ICON.refresh}<span>Try again</span></button>${discordBtn()}`,
    });
    d.querySelector('[data-retry]').addEventListener('click', () => startSource(Math.max(0, state.play.srcIdx)));
}
function showSourcePanel(msg) {
    const d = showPlayerMessage({
        icon: ICON.layers, title: 'Choose a source', text: msg,
        actions: `<div class="src-list">${state.play.sources.map((s, i) => s.type === 'tab'
            ? `<a class="src-choice" href="${esc(s.url)}" target="_blank" rel="noopener"><span>${esc(s.label)}</span><span class="tag">NEW TAB</span></a>`
            : `<button class="src-choice${i === state.play.srcIdx ? ' is-failed' : ''}" type="button" data-pick-src="${i}"><span>${esc(s.label)}</span><span class="tag">${srcTypeTag(s)}</span></button>`).join('')}</div>${discordBtn()}`,
    });
    $$('[data-pick-src]', d).forEach(b => b.addEventListener('click', () => startSource(+b.dataset.pickSrc)));
}
function buildSrcMenu() {
    const p = $('srcPopup');
    p.innerHTML = '<div class="popup-label">Sources</div>' + state.play.sources.map((s, i) =>
        `<button class="popup-item${i === state.play.srcIdx ? ' is-active' : ''}" type="button" role="menuitemradio" aria-checked="${i === state.play.srcIdx}" data-src-i="${i}"><span>${esc(s.label)}</span><span class="tag">${srcTypeTag(s)}</span></button>`).join('');
    $$('[data-src-i]', p).forEach(b => b.addEventListener('click', () => {
        closeAllPopups();
        const i = +b.dataset.srcI;
        const s = state.play.sources[i];
        if (s.type === 'tab') { window.open(s.url, '_blank', 'noopener'); return; }
        if (i !== state.play.srcIdx || playerEl.classList.contains('has-msg')) { saveCurrentPosition(); startSource(i); }
    }));
}

/* ---------- Up next ---------- */

const RING_LEN = 2 * Math.PI * 16;
function showUpNext(nx, remain, ended) {
    const el = $('upNext');
    const ep = nx.data.episodes[nx.idx];
    const key = nx.seasonNumber + ':' + nx.idx;
    if (el.dataset.key !== key) {
        el.dataset.key = key;
        $('upNextThumb').src = ep.thumbnail ? IMG.thumb(ep.thumbnail) : 'data:,';
        $('upNextName').textContent = `${epCode(nx.seasonNumber, ep.number)} · ${ep.title || 'Episode ' + ep.number}`;
        el.setAttribute('aria-label', `Play next episode: ${ep.title || 'Episode ' + ep.number}`);
    }
    const auto = autoplayOn() && !ended;
    $('upNextLabel').textContent = auto ? `Next episode in ${Math.max(1, Math.ceil(remain))}s` : 'Next episode';
    $('upNextRing').style.strokeDasharray = RING_LEN.toFixed(2);
    $('upNextRing').style.strokeDashoffset = auto ? (RING_LEN * clamp(remain / 15, 0, 1)).toFixed(2) : '0';
    el.classList.toggle('is-auto', auto);
    el.classList.add('is-shown');
}
function hideUpNext() {
    const el = $('upNext');
    el.classList.remove('is-shown');
}

/* ---------- Subtitles ---------- */

const getSubStyle = () => { const s = readJSON('lsSubStyle', null); return s && typeof s === 'object' ? s : { size: 'md', bg: 'solid' }; };
function applySubStyle() {
    const st = getSubStyle();
    const size = SUB_SIZES.find(s => s.id === st.size) || SUB_SIZES[1];
    playerEl.style.setProperty('--sub-scale', size.scale);
    playerEl.classList.remove('sub-bg-solid', 'sub-bg-soft', 'sub-bg-none');
    playerEl.classList.add('sub-bg-' + (SUB_BGS.some(b => b.id === st.bg) ? st.bg : 'solid'));
}
function attachSubtitles(ep, ltok) {
    const subs = (Array.isArray(ep.subtitles) ? ep.subtitles : []).filter(t => t && t.url && t.url.trim());
    subs.forEach((trk, i) => {
        fetch(trk.url.trim()).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); }).then(blob => {
            if (ltok !== state.play.loadTok || !playerOpen()) return;
            const t = document.createElement('track');
            t.kind = 'subtitles';
            t.label = trk.label || trk.lang || ('Track ' + (i + 1));
            t.srclang = trk.lang || '';
            const burl = URL.createObjectURL(blob);
            video._objectUrls.push(burl);
            t.src = burl;
            video.appendChild(t);
            try { t.track.mode = 'hidden'; } catch {}
            const wantDefault = trk.default || trk.lang === 'en';
            if (wantDefault && !state.play.defaultSubPicked && subsEnabled()) {
                state.play.defaultSubPicked = true;
                setTimeout(() => { if (ltok === state.play.loadTok) setActiveSubTrack(trackIndexOf(t.track)); }, 150);
            }
        }).catch(() => {});
    });
}
function trackIndexOf(track) {
    for (let i = 0; i < video.textTracks.length; i++) if (video.textTracks[i] === track) return i;
    return -1;
}
function setActiveSubTrack(idx) {
    for (let i = 0; i < video.textTracks.length; i++) { try { video.textTracks[i].mode = 'hidden'; } catch {} }
    detachCueTrack();
    $('subOverlay').innerHTML = '';
    state.play.subIdx = (idx != null && idx >= 0 && video.textTracks[idx]) ? idx : -1;
    if (state.play.subIdx >= 0) {
        state.play.lastSubIdx = state.play.subIdx;
        lsSet('lsSubsOn', '1');
        const t = video.textTracks[state.play.subIdx];
        state.play.cueTrack = t;
        t.addEventListener('cuechange', renderActiveCues);
        renderActiveCues();
    }
    updateCCBtn();
    syncSwitches();
}
function cueToHtml(text) {
    let s = String(text || '').replace(/<\/?(c|v|lang|ruby|rt)[^>]*>/gi, '').replace(/<\d{2}:[^>]*>/g, '');
    s = esc(s).replace(/&lt;(\/?)(i|b|u)&gt;/gi, '<$1$2>');
    return s.split('\n').map(l => l.trim()).filter(Boolean).map(l => `<span class="sub-line">${l}</span>`).join('');
}
function renderActiveCues() {
    const overlay = $('subOverlay');
    const t = state.play.cueTrack;
    if (!t || state.play.kind !== 'direct') { overlay.innerHTML = ''; return; }
    let html = '';
    if (t.activeCues) for (let i = 0; i < t.activeCues.length; i++) html += cueToHtml(t.activeCues[i].text);
    overlay.innerHTML = html;
}
function updateCCBtn() {
    const on = state.play.subIdx >= 0;
    $('ccBtn').classList.toggle('is-on', on);
    $('ccBtn').setAttribute('aria-pressed', on);
}
function turnSubsOff() {
    setActiveSubTrack(-1);
    lsSet('lsSubsOn', '0');
    syncSwitches();
}
function toggleSubtitles() {
    if (state.play.subIdx >= 0) { turnSubsOff(); return; }
    let idx = state.play.lastSubIdx;
    if (idx < 0 || !video.textTracks[idx]) idx = video.textTracks.length ? 0 : -1;
    if (idx < 0) { toast('No subtitles for this episode', { icon: ICON.alert }); return; }
    setActiveSubTrack(idx);
}
function buildSubMenu() {
    const tracks = video.textTracks;
    let h = '<div class="popup-label">Subtitles</div>';
    h += `<button class="popup-item${state.play.subIdx < 0 ? ' is-active' : ''}" type="button" data-sub="off">Off</button>`;
    let hasSource = false;
    for (let i = 0; i < tracks.length; i++) {
        const t = tracks[i];
        if (t.label && t.label.startsWith('AI:')) continue;
        hasSource = true;
        h += `<button class="popup-item${state.play.subIdx === i ? ' is-active' : ''}" type="button" data-sub="${i}">${esc(t.label || t.language || 'Track ' + (i + 1))}</button>`;
    }
    for (let i = 0; i < tracks.length; i++) {
        const t = tracks[i];
        if (!t.label || !t.label.startsWith('AI:')) continue;
        h += `<button class="popup-item${state.play.subIdx === i ? ' is-active' : ''}" type="button" data-sub="${i}">${esc(t.label)}</button>`;
    }
    if (!tracks.length) h += '<div class="popup-note">No subtitles for this episode.</div>';
    if (hasSource) {
        h += '<div class="popup-divider"></div><div class="popup-label">AI translate</div><div class="popup-grid">';
        TRANSLATE_LANGS.forEach(lang => { h += `<button class="popup-item" type="button" data-ai="${lang.code}" data-ai-label="${esc(lang.label)}">${esc(lang.label.replace(' (AI)', ''))}</button>`; });
        h += '</div>';
    }
    const st = getSubStyle();
    h += '<div class="popup-divider"></div><div class="popup-label">Size</div><div class="popup-seg">' +
        SUB_SIZES.map(s => `<button type="button" class="${st.size === s.id ? 'is-active' : ''}" data-sub-size="${s.id}">${s.label}</button>`).join('') + '</div>';
    h += '<div class="popup-label">Background</div><div class="popup-seg">' +
        SUB_BGS.map(b => `<button type="button" class="${(st.bg || 'solid') === b.id ? 'is-active' : ''}" data-sub-bg="${b.id}">${b.label}</button>`).join('') + '</div>';
    const p = $('subPopup');
    p.innerHTML = h;
    $$('[data-sub]', p).forEach(b => b.addEventListener('click', () => {
        if (b.dataset.sub === 'off') turnSubsOff();
        else setActiveSubTrack(parseInt(b.dataset.sub, 10));
        closeAllPopups();
    }));
    $$('[data-ai]', p).forEach(b => b.addEventListener('click', () => setAISub(b.dataset.ai, b.dataset.aiLabel)));
    $$('[data-sub-size]', p).forEach(b => b.addEventListener('click', () => {
        const st2 = getSubStyle(); st2.size = b.dataset.subSize; writeJSON('lsSubStyle', st2);
        applySubStyle(); buildSubMenu();
    }));
    $$('[data-sub-bg]', p).forEach(b => b.addEventListener('click', () => {
        const st2 = getSubStyle(); st2.bg = b.dataset.subBg; writeJSON('lsSubStyle', st2);
        applySubStyle(); buildSubMenu();
    }));
}
async function setAISub(code, label) {
    const tracks = video.textTracks;
    const full = 'AI: ' + label;
    for (let i = 0; i < tracks.length; i++) {
        if (tracks[i].label === full) { setActiveSubTrack(i); closeAllPopups(); return; }
    }
    let src = null;
    for (let i = 0; i < tracks.length; i++) if (!tracks[i].label || !tracks[i].label.startsWith('AI:')) { src = tracks[i]; break; }
    if (!src) { toast('No source subtitles to translate', { icon: ICON.alert }); return; }
    const ltok = state.play.loadTok;
    if (src.mode === 'disabled') src.mode = 'hidden';
    closeAllPopups();
    await new Promise(r => setTimeout(r, 800));
    if (!src.cues || !src.cues.length) { toast('No subtitles to translate yet', { icon: ICON.alert }); return; }
    toast('Translating subtitles…', { icon: ICON.clock });
    const cues = [];
    for (let i = 0; i < src.cues.length; i++) cues.push({ s: src.cues[i].startTime, e: src.cues[i].endTime, t: src.cues[i].text });
    try {
        const SEP = ' ||| ';
        const translated = [];
        for (let i = 0; i < cues.length; i += 30) {
            const c = cues.slice(i, i + 30);
            const joined = c.map(x => x.t.replace(/\n/g, ' ').replace(/\|\|\|/g, '')).join(SEP);
            const resp = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${code}&dt=t&q=${encodeURIComponent(joined)}`);
            const data = await resp.json();
            const ft = data && data[0] ? data[0].map(s => s[0]).join('') : '';
            const parts = ft.split(/\s*\|\|\|\s*/);
            for (let j = 0; j < c.length; j++) translated.push(j < parts.length && parts[j].trim() ? parts[j].trim() : c[j].t);
        }
        if (ltok !== state.play.loadTok) return;
        let vtt = 'WEBVTT\n\n';
        for (let i = 0; i < cues.length; i++) vtt += `${fmtVTT(cues[i].s)} --> ${fmtVTT(cues[i].e)}\n${translated[i] || cues[i].t}\n\n`;
        const burl = URL.createObjectURL(new Blob([vtt], { type: 'text/vtt' }));
        video._objectUrls.push(burl);
        const nt = document.createElement('track');
        nt.kind = 'subtitles';
        nt.label = full;
        nt.srclang = code;
        nt.src = burl;
        video.appendChild(nt);
        await new Promise(r => setTimeout(r, 300));
        setActiveSubTrack(trackIndexOf(nt.track));
        toast('Subtitles translated');
    } catch (err) {
        console.error('AI translation error:', err);
        toast('Translation failed', { icon: ICON.alert });
    }
}
function fmtVTT(s) {
    const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = Math.floor(s % 60), ms = Math.floor(s % 1 * 1000);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
}

/* ---------- Transport controls ---------- */

function flashCenter(playing) {
    const f = $('pFlash');
    f.innerHTML = playing ? ICON.play : ICON.pause;
    f.classList.remove('is-shown'); void f.offsetWidth; f.classList.add('is-shown');
}
function togglePlay() {
    if (state.play.kind !== 'direct' || playerEl.classList.contains('has-msg')) return;
    if (video.paused) { video.play().catch(() => {}); flashCenter(true); }
    else { video.pause(); flashCenter(false); }
}
function updatePlayIcon(playing) {
    const b = $('playBtn');
    b.innerHTML = playing
        ? '<svg viewBox="0 0 24 24"><path d="M6.5 5h3.5v14H6.5zM14 5h3.5v14H14z"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';
    b.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    b.title = playing ? 'Pause (Space)' : 'Play (Space)';
}
function applyStoredVolume() {
    const v = parseFloat(lsGet('lsVolume', '1'));
    video.volume = isFinite(v) ? clamp(v, 0, 1) : 1;
    video.muted = lsGet('lsMuted') === '1';
    syncVolumeUI();
}
function syncVolumeUI() {
    const muted = video.muted || video.volume === 0;
    const slider = $('volSlider');
    slider.value = muted ? 0 : video.volume;
    slider.style.setProperty('--fill', `${(muted ? 0 : video.volume) * 100}%`);
    $('muteBtn').innerHTML = muted
        ? '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    $('muteBtn').setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
}
function setVolume(v) {
    video.volume = clamp(v, 0, 1);
    video.muted = video.volume === 0;
    lsSet('lsVolume', video.volume);
    lsSet('lsMuted', video.muted ? '1' : '0');
    syncVolumeUI();
}
function toggleMute() {
    video.muted = !video.muted;
    if (!video.muted && video.volume === 0) video.volume = 0.5;
    lsSet('lsMuted', video.muted ? '1' : '0');
    lsSet('lsVolume', video.volume);
    syncVolumeUI();
}
function updateScrub(c, d) {
    const pct = d && isFinite(d) ? clamp((c / d) * 100, 0, 100) : 0;
    $('pFill').style.width = pct + '%';
    $('pHandle').style.left = pct + '%';
    $('progressWrap').setAttribute('aria-valuenow', Math.round(pct));
    $('progressWrap').setAttribute('aria-valuetext', `${fmtClock(c)} of ${fmtClock(d)}`);
}
function updateTime(c, d) { $('timeDisplay').textContent = `${fmtClock(c)} / ${fmtClock(d)}`; }
function updateBuffered() {
    if (video.buffered.length && video.duration && isFinite(video.duration)) {
        $('pBuffered').style.width = (video.buffered.end(video.buffered.length - 1) / video.duration * 100) + '%';
    }
}
function addScrubMarkers(dur, iS, iE, rS, rE) {
    const bar = $('progressTrack');
    $$('.scrub-marker').forEach(m => m.remove());
    const add = (s, e) => {
        if (s == null || e == null || s >= e) return;
        const m = document.createElement('div');
        m.className = 'scrub-marker';
        m.style.left = (s / dur * 100) + '%';
        m.style.width = ((e - s) / dur * 100) + '%';
        bar.appendChild(m);
    };
    add(rS, rE);
    add(iS, iE);
}
function seekBy(delta) {
    if (state.play.kind !== 'direct' || !isFinite(video.duration)) return;
    video.currentTime = clamp(video.currentTime + delta, 0, video.duration);
    flashSeek(delta < 0 ? 'left' : 'right');
    updateScrub(video.currentTime, video.duration);
    updateTime(video.currentTime, video.duration);
}
function flashSeek(side) {
    const el = $(side === 'left' ? 'seekLeft' : 'seekRight');
    el.classList.remove('is-shown'); void el.offsetWidth; el.classList.add('is-shown');
}
const isFullscreen = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
function lockLandscape() {
    try { if (screen.orientation && screen.orientation.lock) screen.orientation.lock('landscape').catch(() => {}); } catch {}
}
function videoNativeFS() {
    // iPhone Safari has no element fullscreen — use the video's own fullscreen.
    if (state.play.kind === 'direct' && video.webkitEnterFullscreen) { try { video.webkitEnterFullscreen(); } catch {} }
}
function toggleFS() {
    if (isFullscreen()) {
        try {
            if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        } catch {}
        return;
    }
    if (playerEl.requestFullscreen) playerEl.requestFullscreen().then(lockLandscape).catch(videoNativeFS);
    else if (playerEl.webkitRequestFullscreen) { playerEl.webkitRequestFullscreen(); lockLandscape(); }
    else videoNativeFS();
}
function updateFsIcon() {
    const fs = isFullscreen();
    $('fsBtn').innerHTML = fs
        ? '<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>'
        : '<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>';
    $('fsBtn').setAttribute('aria-label', fs ? 'Exit fullscreen' : 'Fullscreen');
}
['fullscreenchange', 'webkitfullscreenchange'].forEach(ev => document.addEventListener(ev, updateFsIcon));
// In iOS native fullscreen our overlay is hidden, so hand the active track to the native renderer.
video.addEventListener('webkitbeginfullscreen', () => { if (state.play.cueTrack) try { state.play.cueTrack.mode = 'showing'; } catch {} });
video.addEventListener('webkitendfullscreen', () => { if (state.play.cueTrack) try { state.play.cueTrack.mode = 'hidden'; } catch {} });
async function togglePiP() {
    try {
        if (document.pictureInPictureElement) await document.exitPictureInPicture();
        else await video.requestPictureInPicture();
    } catch { toast('Picture in picture is not available', { icon: ICON.alert }); }
}
function resetCtrlTimer() {
    playerEl.classList.remove('hide-ui');
    clearTimeout(state.controlsTimer);
    state.controlsTimer = setTimeout(() => {
        if (state.play.kind === 'direct' && !video.paused && !anyPopupOpen() && !playerEl.classList.contains('has-msg') &&
            !playerEl.querySelector('.controls:hover, .player-top:hover')) playerEl.classList.add('hide-ui');
    }, 3200);
}
function openNeighbor(nb) {
    if (!nb) return false;
    openPlayer(state.play.show, nb.seasonNumber, nb.data, nb.idx);
    return true;
}
function playNext() { if (!openNeighbor(state.play.next)) requestClosePlayer(); }
function playPrev() { openNeighbor(state.play.prev); }
function requestClosePlayer() {
    if (state.play.pushed) { state.play.pushed = false; history.back(); }
    else closePlayerNow();
}
function closePlayerNow(skipRefresh) {
    saveCurrentPosition();
    if (document.pictureInPictureElement) document.exitPictureInPicture().catch(() => {});
    if (isFullscreen()) {
        try {
            const p = (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            if (p && p.catch) p.catch(() => {});
        } catch {}
    }
    stopMedia();
    clearTimeout(state.controlsTimer);
    playerEl.classList.remove('is-open', 'hide-ui');
    if (!anyModalOpen()) document.body.classList.remove('is-locked');
    state.play.epIdx = -1;
    state.play.kind = null;
    state.play.pushed = false;
    state.play.token++;
    heroHold('player', false);
    const rf = state.play.returnFocus;
    state.play.returnFocus = null;
    if (skipRefresh) return;
    // Refresh progress indicators in place, keeping the scroll position.
    if (state.route.name === 'home') renderContinueRow();
    else if (state.route.name === 'details' || state.route.name === 'episode') route({ keepScroll: true });
    if (rf && rf.isConnected) { try { rf.focus({ preventScroll: true }); } catch {} }
}

/* ---------- Popups (speed, quality, subtitles, download, sources) ---------- */

const POPUPS = ['speedPopup', 'qualPopup', 'subPopup', 'dlPopup', 'srcPopup'];
const anyPopupOpen = () => POPUPS.some(id => $(id).classList.contains('is-open'));
function togglePopup(id) {
    const p = $(id);
    if (!p) return;
    const willOpen = !p.classList.contains('is-open');
    closeAllPopups();
    if (!willOpen) return;
    if (id === 'speedPopup') buildSpeedMenu();
    if (id === 'qualPopup') buildQualMenu();
    if (id === 'subPopup') buildSubMenu();
    if (id === 'dlPopup') buildDLMenu();
    if (id === 'srcPopup') buildSrcMenu();
    p.classList.add('is-open');
    const btn = document.querySelector(`[data-popup="${id}"]`);
    if (btn) btn.setAttribute('aria-expanded', 'true');
    if (tvActive) { const first = p.querySelector('button, a'); if (first) first.focus(); }
}
function closeAllPopups() {
    POPUPS.forEach(id => { const el = $(id); if (el) el.classList.remove('is-open'); });
    $$('[data-popup]').forEach(b => b.setAttribute('aria-expanded', 'false'));
}
$$('[data-popup]').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); togglePopup(btn.dataset.popup); resetCtrlTimer(); }));
document.addEventListener('click', (e) => { if (!e.target.closest('[data-popup]') && !e.target.closest('.popup')) closeAllPopups(); });

function updateSpeedLabel() { $('speedLabel').textContent = state.playbackSpeed === 1 ? '1×' : state.playbackSpeed + '×'; }
function buildSpeedMenu() {
    $('speedPopup').innerHTML = '<div class="popup-label">Playback speed</div>' + SPEEDS.map(s =>
        `<button class="popup-item${s === state.playbackSpeed ? ' is-active' : ''}" type="button" data-speed="${s}">${s === 1 ? 'Normal' : s + '×'}</button>`).join('');
    $$('#speedPopup [data-speed]').forEach(b => b.addEventListener('click', () => {
        state.playbackSpeed = parseFloat(b.dataset.speed);
        lsSet('lsSpeed', state.playbackSpeed);
        video.playbackRate = state.playbackSpeed;
        updateSpeedLabel();
        closeAllPopups();
    }));
}
function buildQualMenu() {
    const hls = state.hls;
    if (!hls || !hls.levels || hls.levels.length <= 1) return;
    const auto = hls.autoLevelEnabled;
    const cur = hls.currentLevel;
    let h = `<div class="popup-label">Quality</div><button class="popup-item${auto ? ' is-active' : ''}" type="button" data-q="-1"><span>Auto</span>${auto && cur >= 0 && hls.levels[cur] && hls.levels[cur].height ? `<span class="tag">${hls.levels[cur].height}p</span>` : ''}</button>`;
    hls.levels.map((l, i) => ({ l, i })).sort((a, b) => (b.l.height || b.l.bitrate) - (a.l.height || a.l.bitrate)).forEach(({ l, i }) => {
        const lb = l.height ? l.height + 'p' : Math.round(l.bitrate / 1000) + ' kbps';
        h += `<button class="popup-item${!auto && cur === i ? ' is-active' : ''}" type="button" data-q="${i}">${lb}</button>`;
    });
    const p = $('qualPopup');
    p.innerHTML = h;
    $$('[data-q]', p).forEach(b => b.addEventListener('click', () => {
        if (!state.hls) return;
        state.hls.currentLevel = parseInt(b.dataset.q, 10);
        closeAllPopups();
    }));
}

/* ---------- Downloads ---------- */

const scriptLoads = {};
function loadScript(src, ready) {
    if (ready()) return Promise.resolve();
    if (!scriptLoads[src]) {
        scriptLoads[src] = new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = () => (ready() ? resolve() : reject(new Error('script loaded without export')));
            s.onerror = () => { delete scriptLoads[src]; reject(new Error('script failed to load')); };
            document.head.appendChild(s);
        });
    }
    return scriptLoads[src];
}
const userErr = (msg) => Object.assign(new Error(msg), { userMessage: msg });
function dlBaseName() {
    const { show, seasonNumber } = state.play;
    const ep = curEp();
    const name = isMovie(show)
        ? show.title
        : `${show.title} - S${String(seasonNumber).padStart(2, '0')}E${String(ep.number).padStart(2, '0')}${ep.title ? ' - ' + ep.title : ''}`;
    return name.replace(/[<>:"/\\|?*\u0000-\u001F]/g, '').replace(/\s+/g, ' ').trim().slice(0, 150) || 'video';
}
function buildDLMenu() {
    const p = $('dlPopup');
    const ep = curEp();
    if (!ep) return;
    const src = state.play.sources[state.play.srcIdx];
    let h = '<div class="popup-label">Download</div>';
    if (state.dl.active) {
        h += `<div class="dl-progress"><div class="dl-text" id="dlText">${esc(state.dl.text)}</div><div class="dl-bar"><span id="dlBar" style="width:${state.dl.pct}%"></span></div></div>`;
    } else if (src && src.type === 'direct') {
        const hls = src.url.toLowerCase().includes('.m3u8');
        const ext = hls ? 'MP4' : (src.url.split(/[?#]/)[0].split('.').pop() || 'file').toUpperCase();
        h += `<button class="popup-item" type="button" data-dl="1"><span>This ${isMovie(state.play.show) ? 'movie' : 'episode'}</span><span class="tag">${esc(ext)}</span></button>`;
        h += '<div class="popup-note">Saves a copy to your device. Large files can take a few minutes.</div>';
    } else {
        h += '<div class="popup-note">Downloads aren\'t available for this source.</div>';
    }
    if (Array.isArray(ep.downloads) && ep.downloads.length) {
        h += '<div class="popup-divider"></div><div class="popup-label">Other downloads</div>';
        ep.downloads.forEach(dl => {
            if (!dl || !dl.url) return;
            h += `<a class="popup-item" href="${esc(dl.url)}" target="_blank" rel="noopener" download><span>${esc(dl.label || 'Download')}</span>${dl.size ? `<span class="tag">${esc(dl.size)}</span>` : ''}</a>`;
        });
    }
    p.innerHTML = h;
    const b = p.querySelector('[data-dl]');
    if (b) b.addEventListener('click', startDownload);
}
function setDlProgress(text, pct) {
    state.dl.text = text;
    state.dl.pct = clamp(Math.round(pct), 0, 100);
    const t = $('dlText'), bar = $('dlBar');
    if (t) t.textContent = text;
    if (bar) bar.style.width = state.dl.pct + '%';
    $('dlBtn').classList.toggle('is-busy', state.dl.active);
    $('dlBtn').style.setProperty('--dl', state.dl.pct + '%');
}
async function startDownload() {
    if (state.dl.active) return;
    const src = state.play.sources[state.play.srcIdx];
    if (!src || src.type !== 'direct') return;
    const name = dlBaseName();
    state.dl.active = true;
    setDlProgress('Starting…', 1);
    buildDLMenu();
    try {
        const ok = /\.m3u8(\?|#|$)/i.test(src.url) ? await downloadHls(src.url, name) : await downloadDirect(src.url, name);
        if (ok !== false) toast('Download complete', { icon: ICON.download });
    } catch (err) {
        console.error('Download failed', err);
        toast(err && err.userMessage ? err.userMessage : 'Download failed. Try again later.', { icon: ICON.alert });
    } finally {
        state.dl.active = false;
        setDlProgress('', 0);
        if ($('dlPopup').classList.contains('is-open')) buildDLMenu();
    }
}
async function fetchBuf(url, tries = 3) {
    for (let a = 1; ; a++) {
        try {
            const r = await fetch(url);
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return new Uint8Array(await r.arrayBuffer());
        } catch (e) {
            if (a >= tries) throw e;
            await new Promise(res => setTimeout(res, 500 * a));
        }
    }
}
async function downloadHls(url, name) {
    setDlProgress('Reading playlist…', 2);
    const master = await fetchText(url);
    let mediaUrl = url, media = master;
    if (/#EXT-X-STREAM-INF/i.test(master)) {
        const lines = master.split(/\r?\n/);
        let best = -1, bestUrl = '';
        for (let i = 0; i < lines.length; i++) {
            if (!lines[i].startsWith('#EXT-X-STREAM-INF')) continue;
            const bw = +((lines[i].match(/BANDWIDTH=(\d+)/i) || [])[1] || 0);
            let j = i + 1;
            while (j < lines.length && (!lines[j].trim() || lines[j].trim().startsWith('#'))) j++;
            const u = (lines[j] || '').trim();
            if (u && bw > best) { best = bw; bestUrl = u; }
        }
        if (bestUrl) { mediaUrl = new URL(bestUrl, url).href; media = await fetchText(mediaUrl); }
    }
    if (/#EXT-X-KEY:(?![^\n]*METHOD=NONE)/i.test(media)) throw userErr("This video is protected and can't be downloaded.");
    const initMatch = media.match(/#EXT-X-MAP:[^\n]*URI="([^"]+)"/i);
    const segs = media.split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith('#')).map(l => new URL(l, mediaUrl).href);
    if (!segs.length) throw new Error('playlist has no segments');
    const parts = new Array(segs.length);
    let next = 0, done = 0;
    const worker = async () => {
        while (next < segs.length) {
            const i = next++;
            parts[i] = await fetchBuf(segs[i]);
            done++;
            setDlProgress(`Downloading… ${Math.round(done / segs.length * 100)}%`, 3 + (done / segs.length) * 85);
        }
    };
    await Promise.all(Array.from({ length: Math.min(6, segs.length) }, worker));
    if (initMatch) {
        // fMP4 stream: init segment + fragments is already a valid MP4.
        const init = await fetchBuf(new URL(initMatch[1], mediaUrl).href);
        saveBlob(new Blob([init, ...parts], { type: 'video/mp4' }), name + '.mp4');
        return true;
    }
    // MPEG-TS stream: remux to MP4 so it plays everywhere; fall back to .ts.
    setDlProgress('Converting to MP4…', 92);
    let blob = null;
    try {
        await loadScript(MUX_JS_URL, () => !!(window.muxjs && window.muxjs.mp4 && window.muxjs.mp4.Transmuxer));
        await new Promise(r => setTimeout(r, 50)); // let the progress text paint before the synchronous remux
        blob = remuxTsToMp4(parts);
    } catch (e) { console.warn('MP4 conversion failed, saving MPEG-TS instead', e); }
    setDlProgress('Saving…', 98);
    if (blob) saveBlob(blob, name + '.mp4');
    else saveBlob(new Blob(parts, { type: 'video/mp2t' }), name + '.ts');
    return true;
}
function remuxTsToMp4(parts) {
    const tm = new window.muxjs.mp4.Transmuxer({ keepOriginalTimestamps: false });
    const out = [];
    let init = null;
    tm.on('data', (seg) => {
        if (!init && seg.initSegment && seg.initSegment.byteLength) init = new Uint8Array(seg.initSegment);
        if (seg.data && seg.data.byteLength) out.push(new Uint8Array(seg.data));
    });
    for (const p of parts) { tm.push(p); tm.flush(); }
    if (!init || !out.length) throw new Error('remux produced no output');
    return new Blob([init, ...out], { type: 'video/mp4' });
}
async function downloadDirect(url, name) {
    let r = null;
    try { r = await fetch(url); } catch {}
    if (!r || !r.ok || !r.body) {
        // The host doesn't allow in-page downloads; let the browser handle it.
        window.open(url, '_blank', 'noopener');
        toast('Opened in a new tab. Use your browser\'s save option.', { icon: ICON.external });
        return false;
    }
    const total = +r.headers.get('Content-Length') || 0;
    const reader = r.body.getReader();
    const chunks = [];
    let got = 0;
    for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        got += value.length;
        setDlProgress(total ? `Downloading… ${Math.round(got / total * 100)}%` : `Downloading… ${(got / 1048576).toFixed(1)} MB`, total ? 3 + got / total * 92 : 50);
    }
    const ext = (url.split(/[?#]/)[0].split('.').pop() || 'mp4').toLowerCase().slice(0, 5);
    saveBlob(new Blob(chunks, { type: r.headers.get('Content-Type') || 'video/mp4' }), `${name}.${ext}`);
    return true;
}
function saveBlob(blob, fn) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fn;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoking immediately can cancel the download in Firefox/Safari.
    setTimeout(() => URL.revokeObjectURL(url), 60000);
}

/* ---------- Player input ---------- */

$('playBtn').addEventListener('click', togglePlay);
$('prevEpBtn').addEventListener('click', playPrev);
$('nextEpBtn').addEventListener('click', playNext);
$('muteBtn').addEventListener('click', toggleMute);
$('fsBtn').addEventListener('click', toggleFS);
$('pipBtn').addEventListener('click', togglePiP);
$('playerBackBtn').addEventListener('click', requestClosePlayer);
$('skipBtn').addEventListener('click', () => { if (state.currentSkipTarget != null) video.currentTime = state.currentSkipTarget; });
$('upNext').addEventListener('click', (e) => { if (!e.target.closest('#upNextDismiss')) playNext(); });
$('upNext').addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target === $('upNext')) { e.preventDefault(); playNext(); } });
$('upNextDismiss').addEventListener('click', (e) => { e.stopPropagation(); state.play.upNextDismissed = true; hideUpNext(); });
$('airplayBtn').addEventListener('click', () => { if (video.webkitShowPlaybackTargetPicker) video.webkitShowPlaybackTargetPicker(); });
$('volSlider').addEventListener('input', (e) => setVolume(parseFloat(e.target.value)));
video.addEventListener('enterpictureinpicture', () => $('pipBtn').classList.add('is-on'));
video.addEventListener('leavepictureinpicture', () => $('pipBtn').classList.remove('is-on'));

// Pointer seeking: tap or drag anywhere on the bar, with a hover time preview.
(() => {
    const wrap = $('progressWrap'), tip = $('pTip');
    let dragging = false;
    const pctAt = (x) => { const r = wrap.getBoundingClientRect(); return clamp((x - r.left) / r.width, 0, 1); };
    const showTip = (x) => {
        if (!isFinite(video.duration)) { tip.classList.remove('is-shown'); return; }
        const pct = pctAt(x);
        tip.textContent = fmtClock(pct * video.duration);
        const r = wrap.getBoundingClientRect();
        const half = tip.offsetWidth / 2;
        tip.style.left = clamp(pct * r.width, half, r.width - half) + 'px';
        tip.classList.add('is-shown');
    };
    const seekTo = (x) => {
        if (!video.duration || !isFinite(video.duration)) return;
        video.currentTime = pctAt(x) * video.duration;
        updateScrub(video.currentTime, video.duration);
        updateTime(video.currentTime, video.duration);
    };
    wrap.addEventListener('pointerdown', (e) => {
        if (state.play.kind !== 'direct') return;
        dragging = true;
        wrap.classList.add('is-dragging');
        try { wrap.setPointerCapture(e.pointerId); } catch {}
        seekTo(e.clientX); showTip(e.clientX);
        resetCtrlTimer();
    });
    wrap.addEventListener('pointermove', (e) => {
        if (state.play.kind !== 'direct') return;
        showTip(e.clientX);
        if (dragging) { seekTo(e.clientX); resetCtrlTimer(); }
    });
    const end = () => { dragging = false; wrap.classList.remove('is-dragging'); };
    wrap.addEventListener('pointerup', end);
    wrap.addEventListener('pointercancel', end);
    wrap.addEventListener('pointerleave', () => { if (!dragging) tip.classList.remove('is-shown'); });
    wrap.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); seekBy(e.key === 'ArrowLeft' ? -5 : 5); }
    });
})();
playerEl.addEventListener('mousemove', resetCtrlTimer);

let lastTapTime = 0, lastTapX = 0;
stage.addEventListener('touchend', (e) => {
    state.lastTouch = Date.now();
    if (e.target.closest('.skip-btn, .upnext, .player-msg')) return;
    const now = Date.now();
    const x = e.changedTouches[0].clientX;
    const w = stage.clientWidth;
    if (now - lastTapTime < 300 && Math.abs(x - lastTapX) < 100) {
        e.preventDefault();
        if (state.play.kind !== 'direct' || !isFinite(video.duration)) return;
        seekBy(x < w / 2 ? -10 : 10);
        lastTapTime = 0;
        resetCtrlTimer();
    } else {
        lastTapTime = now; lastTapX = x;
        // A single tap toggles the controls rather than pausing.
        if (state.play.kind === 'direct' && !playerEl.classList.contains('hide-ui') && !video.paused) {
            playerEl.classList.add('hide-ui');
            closeAllPopups();
        } else resetCtrlTimer();
    }
});
stage.addEventListener('click', (e) => {
    if (Date.now() - state.lastTouch < 700) return;
    resetCtrlTimer();
    if (e.target.closest('button, a, .upnext, .skip-btn, .player-msg')) return;
    if (anyPopupOpen()) { closeAllPopups(); return; }
    togglePlay();
});
stage.addEventListener('dblclick', (e) => {
    if (Date.now() - state.lastTouch < 700) return;
    if (e.target.closest('button, a, .player-msg, .upnext')) return;
    toggleFS();
});

const ctrlButtons = () => $$('#controlsBar button, .player-top button').filter(b => b.offsetParent !== null && !b.disabled);
function onPlayerKey(e) {
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    const direct = state.play.kind === 'direct';
    const isBack = e.key === 'Escape' || e.keyCode === 461 || e.keyCode === 10009 || e.key === 'GoBack' || e.key === 'BrowserBack' || (tvActive && e.key === 'Backspace');
    if (isBack) {
        e.preventDefault();
        if (anyPopupOpen()) closeAllPopups(); else requestClosePlayer();
        return;
    }
    resetCtrlTimer();
    if (e.shiftKey && e.key.toLowerCase() === 'n') { e.preventDefault(); playNext(); return; }
    if (e.shiftKey && e.key.toLowerCase() === 'p') { e.preventDefault(); playPrev(); return; }
    const inUi = e.target.closest && e.target.closest('#controlsBar, .player-top, .popup, .upnext, .player-msg');
    if (tvActive && inUi && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        if (e.target.closest('.popup')) {
            const items = $$('button, a', e.target.closest('.popup'));
            const i = items.indexOf(e.target);
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { if (items[i + 1]) items[i + 1].focus(); }
            else if (items[i - 1]) items[i - 1].focus(); else closeAllPopups();
            return;
        }
        if (e.key === 'ArrowUp' && e.target.closest('#controlsBar')) { e.target.blur(); playerEl.focus({ preventScroll: true }); return; }
        const btns = ctrlButtons();
        const i = btns.indexOf(e.target);
        const next = btns[i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1)];
        if (next) next.focus();
        return;
    }
    if (tvActive && e.key === 'ArrowDown' && !inUi && direct) {
        e.preventDefault();
        const btns = $$('#controlsBar button').filter(b => b.offsetParent !== null && !b.disabled);
        if (btns.length) btns[0].focus();
        return;
    }
    if (e.key === ' ' || e.code === 'Space' || e.key.toLowerCase() === 'k') {
        if (e.target.closest('button, a, [role="button"]') && e.key === ' ') return;
        e.preventDefault(); togglePlay(); return;
    }
    if (e.key === 'Enter' && !e.target.closest('button, a, [role="button"]')) { e.preventDefault(); togglePlay(); return; }
    if (e.key === 'MediaPlayPause') { e.preventDefault(); togglePlay(); return; }
    if (!direct) return;
    const k = e.key.toLowerCase();
    if (e.key === 'ArrowRight' || k === 'l' || e.key === 'MediaFastForward') { e.preventDefault(); seekBy(10); return; }
    if (e.key === 'ArrowLeft' || k === 'j' || e.key === 'MediaRewind') { e.preventDefault(); seekBy(-10); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); setVolume((video.muted ? 0 : video.volume) + 0.05); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setVolume((video.muted ? 0 : video.volume) - 0.05); return; }
    if (k === 'f') { e.preventDefault(); toggleFS(); return; }
    if (k === 'm') { e.preventDefault(); toggleMute(); return; }
    if (k === 'c') { e.preventDefault(); toggleSubtitles(); return; }
    if (/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey && isFinite(video.duration)) {
        e.preventDefault();
        video.currentTime = video.duration * (+e.key / 10);
    }
}

/* ==========================================================================
   Modals
   ========================================================================== */

const MODALS = ['profileModal', 'settingsModal', 'shortcutsModal'];
const modalReturn = {};
function anyModalOpen() { return MODALS.some(id => $(id).classList.contains('is-open')) || playerOpen(); }
const topModal = () => MODALS.slice().reverse().find(id => $(id).classList.contains('is-open')) || null;
function openModal(id) {
    if (id === 'profileModal') prepareProfile();
    if (id === 'settingsModal') prepareSettings();
    modalReturn[id] = document.activeElement;
    document.body.classList.add('is-locked');
    $(id).classList.add('is-open');
    requestAnimationFrame(() => {
        const sheet = $(id).querySelector('.sheet');
        const first = tvActive ? sheet.querySelector('input, button:not(.sheet-close)') : null;
        (first || sheet).focus({ preventScroll: true });
    });
}
function closeModal(id) {
    const m = $(id);
    if (!m.classList.contains('is-open')) return;
    m.classList.remove('is-open');
    if (!anyModalOpen()) document.body.classList.remove('is-locked');
    const rf = modalReturn[id];
    if (rf && rf.isConnected) { try { rf.focus({ preventScroll: true }); } catch {} }
}
function closeAllModals(silent) {
    MODALS.forEach(id => { if (silent) $(id).classList.remove('is-open'); else closeModal(id); });
    if (silent && !playerOpen()) document.body.classList.remove('is-locked');
}
document.addEventListener('click', (e) => {
    const closer = e.target.closest('[data-close]');
    if (closer) { closeModal(closer.dataset.close); return; }
    const opener = e.target.closest('[data-open-modal]');
    if (opener) { e.preventDefault(); openModal(opener.dataset.openModal); }
});
// Keep Tab focus inside the open dialog.
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const id = topModal();
    if (!id) return;
    const sheet = $(id).querySelector('.sheet');
    const items = $$('a[href], button:not(:disabled), input, select, [tabindex="0"]', sheet).filter(el => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === sheet)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ---------- Profile ---------- */

function renderAvatarPreview() { $('avatarPreview').innerHTML = avatarInner(); }
function renderAvatarGrid() {
    $('avatarGrid').innerHTML = PROFILE_PICS.map(pic => `
        <button class="avatar-cell${profile.avatar === pic.id ? ' is-active' : ''}" type="button" data-avatar="${pic.id}" aria-pressed="${profile.avatar === pic.id}" title="${esc(pic.label)}">
            <img src="${esc(pic.url)}" alt="${esc(pic.label)}" loading="lazy" draggable="false">
        </button>`).join('');
    $$('#avatarGrid .avatar-cell').forEach(cell => cell.addEventListener('click', () => {
        profile.avatar = profile.avatar === cell.dataset.avatar ? '' : cell.dataset.avatar;
        saveProfile();
        renderAvatarGrid();
        renderAvatarPreview();
        refreshAvatarUI();
        const again = $('avatarGrid').querySelector(`[data-avatar="${cell.dataset.avatar}"]`);
        if (again) again.focus({ preventScroll: true });
    }));
}
function renderStats() {
    const entries = parseProgEntries().filter(en => en.p.t > 0);
    const completed = entries.filter(en => isWatched(en.p)).length;
    let totalSecs = 0;
    const showCounts = {};
    entries.forEach(en => {
        totalSecs += en.p.t || 0;
        const show = getShow(en.showId);
        if (show) showCounts[show.title] = (showCounts[show.title] || 0) + 1;
    });
    const top = Object.entries(showCounts).sort((a, b) => b[1] - a[1])[0];
    const hours = totalSecs / 3600;
    $('statGrid').innerHTML = `
        <div class="stat"><div class="stat-val">${entries.length}</div><div class="stat-label">Episodes started</div></div>
        <div class="stat"><div class="stat-val">${completed}</div><div class="stat-label">Episodes finished</div></div>
        <div class="stat"><div class="stat-val">${hours >= 10 ? Math.round(hours) : hours.toFixed(1)}h</div><div class="stat-label">Time watched</div></div>
        <div class="stat"><div class="stat-val">${getMyList().length}</div><div class="stat-label">In My List</div></div>
        ${top ? `<div class="stat stat-wide"><div class="stat-label">Most watched</div><div class="stat-show">${esc(top[0])}</div></div>` : ''}`;
}
function prepareProfile() {
    renderAvatarPreview();
    renderAvatarGrid();
    renderStats();
    $('profileNameInput').value = profile.name || '';
}
let nameDeb = null;
$('profileNameInput').addEventListener('input', (e) => {
    profile.name = e.target.value.trim().slice(0, 20);
    clearTimeout(nameDeb);
    nameDeb = setTimeout(() => {
        saveProfile(); refreshAvatarUI(); renderAvatarPreview();
        if (state.route.name === 'home') renderContinueRow();
    }, 250);
});
$('clearHistoryBtn').addEventListener('click', () => {
    if (!window.confirm('Clear all watch history and resume points? This cannot be undone.')) return;
    progressMap = {};
    saveProgress();
    renderStats();
    if (state.route.name === 'home') renderContinueRow();
    toast('Watch history cleared');
});
$('profileBtn').addEventListener('click', () => openModal('profileModal'));

/* ---------- Settings ---------- */

function prepareSettings() {
    buildThemeSwatches();
    applyAppearance();
    applyTvMode();
    syncSwitches();
}
$('settingsBtn').addEventListener('click', () => openModal('settingsModal'));
$$('#appearanceSeg .seg-btn').forEach(b => b.addEventListener('click', () => setAppearance(b.dataset.appearance)));
$$('#tvSeg .seg-btn').forEach(b => b.addEventListener('click', () => {
    lsSet('lsTvMode', b.dataset.tv);
    applyTvMode();
    toast(`TV mode: ${b.dataset.tv === 'auto' ? 'automatic' : b.dataset.tv}`);
}));
$('themeResetBtn').addEventListener('click', () => { lsDel('lsTheme'); applyAccent(DEFAULT_ACCENT, false); });
$('customAccentPicker').addEventListener('input', (e) => applyAccent(e.target.value));
$('autoplaySwitch').addEventListener('click', () => { lsSet('lsAutoplay', autoplayOn() ? '0' : '1'); syncSwitches(); });
$('subsSwitch').addEventListener('click', () => { lsSet('lsSubsOn', subsEnabled() ? '0' : '1'); syncSwitches(); });

/* ==========================================================================
   Global interactions
   ========================================================================== */

document.addEventListener('click', (e) => {
    const listBtn = e.target.closest('[data-toggle-list]');
    if (listBtn) { e.preventDefault(); e.stopPropagation(); toggleMyList(listBtn.dataset.toggleList); return; }
    const playShow = e.target.closest('[data-play-show]');
    if (playShow) { const show = getShow(playShow.dataset.playShow); if (show) smartPlayShow(show); return; }
    const resume = e.target.closest('[data-resume]');
    if (resume) { playEpisodeByRef(resume.dataset.resume, parseInt(resume.dataset.s, 10), parseInt(resume.dataset.e, 10)); return; }
    const rm = e.target.closest('[data-cont-remove]');
    if (rm) {
        const id = rm.dataset.contRemove;
        const keys = hideFromContinue(id);
        renderContinueRow();
        const show = getShow(id);
        toast(`Removed ${show ? show.title : 'title'} from Continue Watching`, { icon: ICON.x, action: { label: 'Undo', fn: () => { unhideProgress(keys); renderContinueRow(); } } });
    }
});
document.querySelector('.skip-link').addEventListener('click', (e) => { e.preventDefault(); $('view').focus(); });

// Images fade in once loaded; broken artwork falls back to a titled placeholder.
document.addEventListener('load', (e) => { const t = e.target; if (t && t.tagName === 'IMG') t.classList.add('is-loaded'); }, true);
document.addEventListener('error', (e) => {
    const t = e.target;
    if (!t || t.tagName !== 'IMG') return;
    if (t.classList.contains('hero-logo') || t.classList.contains('detail-logo')) {
        const span = document.createElement('span');
        span.className = t.classList.contains('hero-logo') ? 'hero-title-text' : 'detail-title-text';
        span.textContent = t.dataset.altText || t.alt || '';
        t.replaceWith(span);
        return;
    }
    if (t.classList.contains('card-logo')) {
        const host = t.parentElement;
        const caption = host && host.closest('.card') && host.closest('.card').querySelector('.card-caption-title');
        const d = document.createElement('div');
        d.className = 'card-logo-text';
        d.textContent = caption ? caption.textContent : '';
        t.replaceWith(d);
        return;
    }
    t.classList.add('is-failed');
    const host = t.closest('.card-media, .ep-thumb, .ep-result-thumb, .ep-page-media, .avatar-cell, .avatar');
    if (host) host.classList.add('img-failed');
}, true);

window.addEventListener('offline', () => toast("You're offline. Some videos may not load.", { icon: ICON.alert, duration: 5000 }));
window.addEventListener('online', () => toast('Back online'));

/* ---------- Keyboard: global shortcuts + TV spatial navigation ---------- */

function modalScope() { const id = topModal(); return id ? $(id).querySelector('.sheet') : null; }
function visibleFocusables(scope) {
    return $$('a[href], button:not(:disabled), input, select, [tabindex="0"]', scope || document).filter(el => {
        if (el.classList.contains('skip-link')) return false;
        if (el.closest('.player') || el.closest('[inert]')) return false;
        if (!scope && el.closest('.modal')) return false;
        if (el.tabIndex < 0) return false;
        const r = el.getBoundingClientRect();
        return r.width > 2 && r.height > 2;
    });
}
function spatialMove(dir) {
    const scope = modalScope();
    const els = visibleFocusables(scope);
    if (!els.length) return;
    const cur = document.activeElement;
    if (!cur || cur === document.body || !els.includes(cur)) {
        const viewEls = els.filter(el => el.closest('#view'));
        const pool = viewEls.length ? viewEls : els;
        const inView = pool.find(el => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.top < innerHeight * 0.9; }) || pool[0];
        inView.focus({ preventScroll: true });
        inView.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
        return;
    }
    const cr = cur.getBoundingClientRect();
    const cx = cr.left + cr.width / 2, cy = cr.top + cr.height / 2;
    let best = null, bestScore = Infinity;
    els.forEach(el => {
        if (el === cur) return;
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - cx, dy = r.top + r.height / 2 - cy;
        let primary, cross;
        if (dir === 'left') { if (dx >= -6) return; primary = -dx; cross = Math.abs(dy); }
        else if (dir === 'right') { if (dx <= 6) return; primary = dx; cross = Math.abs(dy); }
        else if (dir === 'up') { if (dy >= -6) return; primary = -dy; cross = Math.abs(dx); }
        else { if (dy <= 6) return; primary = dy; cross = Math.abs(dx); }
        if (cross > primary * 2 + 220) return;
        const score = primary + cross * 2.4;
        if (score < bestScore) { bestScore = score; best = el; }
    });
    if (best) {
        best.focus({ preventScroll: true });
        best.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
    }
}
document.addEventListener('keydown', (e) => {
    if (playerOpen()) { onPlayerKey(e); return; }
    const t = e.target;
    const typing = t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable;
    const isBackKey = e.keyCode === 461 || e.keyCode === 10009 || e.key === 'GoBack' || e.key === 'BrowserBack';
    if (e.key === 'Escape' || isBackKey || (tvActive && e.key === 'Backspace' && !typing)) {
        const dd = $('seasonDropdown');
        if (dd && dd.classList.contains('is-open')) { e.preventDefault(); setDropdown(false); $('seasonBtn').focus(); return; }
        const id = topModal();
        if (id) { e.preventDefault(); closeModal(id); return; }
        if (e.key === 'Escape' && typing && t.id === 'searchInput' && t.value) { e.preventDefault(); t.value = ''; t.dispatchEvent(new Event('input')); return; }
        if ((isBackKey || (tvActive && e.key === 'Backspace')) && state.route.name !== 'home') { e.preventDefault(); history.back(); }
        return;
    }
    if (!typing && !e.ctrlKey && !e.metaKey && !e.altKey && !topModal()) {
        if (e.key === '/') { e.preventDefault(); if (state.route.name === 'search') { const i = $('searchInput'); if (i) i.focus(); } else location.hash = '#/search'; return; }
        if (e.key === '?') { e.preventDefault(); openModal('shortcutsModal'); return; }
    }
    const dd = $('seasonDropdown');
    if (dd && dd.classList.contains('is-open') && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const opts = $$('.dropdown-opt', dd);
        const i = opts.indexOf(document.activeElement);
        const n = opts[clamp(i + (e.key === 'ArrowDown' ? 1 : -1), 0, opts.length - 1)];
        if (n) n.focus();
        return;
    }
    if (!tvActive) return;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    if (typing && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
    e.preventDefault();
    spatialMove(e.key.replace('Arrow', '').toLowerCase());
});

/* ==========================================================================
   Boot
   ========================================================================== */

initThemeUI();
refreshAvatarUI();
updateTopbar();

function boot() {
    Promise.all([
        fetch('data/show.json' + cacheBust).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }),
        fetch('data/hero.json' + cacheBust).then(r => (r.ok ? r.json() : { featured: [] })).catch(() => ({ featured: [] })),
    ]).then(([showData, heroJson]) => {
        state.shows = (showData && Array.isArray(showData.shows) ? showData.shows : []).filter(s => s && s.id && s.title);
        state.hero = heroJson && Array.isArray(heroJson.featured) ? heroJson.featured : [];
        migrateOldProgress();
        route();
    }).catch(err => {
        console.error('Boot failed', err);
        $('view').innerHTML = `<div class="page"><div class="page-inner page-top">${emptyState({
            icon: ICON.alert, title: "We couldn't load the library",
            text: 'Check your connection and try again.',
            action: '<button class="btn btn-primary" type="button" id="bootRetry">Try again</button>',
        })}</div></div>`;
        $('bootRetry').addEventListener('click', () => location.reload());
    });
}
boot();

})();
