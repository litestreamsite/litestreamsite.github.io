(() => {
'use strict';


document.documentElement.classList.add('js');

if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}


const BRAND = 'litestreamsite';
const DISCORD_URL = 'https://discord.gg/Rczuvm2S9A';
const MUX_JS_URL = 'https://cdn.jsdelivr.net/npm/mux.js@7.0.3/dist/mux.min.js';
const HERO_MS = 8000;

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
const SUB_COLORS = [
    { id: 'white', label: 'White', color: '#FFFFFF' }, { id: 'yellow', label: 'Yellow', color: '#FFE14D' },
    { id: 'cyan', label: 'Cyan', color: '#6BE4F0' }, { id: 'green', label: 'Green', color: '#8EF59B' },
];
const SUB_POSITIONS = [{ id: 'bottom', label: 'Bottom' }, { id: 'top', label: 'Top' }];
const SUB_DELAY_STEP = 0.25;
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
const TV_RE = /(smart-?tv|tizen|web0s|webos|netcast|nettv|viera|aquos|bravia|roku|dtv|playstation|xbox|crkey|googletv|google tv|hbbtv|vidaa|hisense|sony.?tv)/i;

const svgIcon = (d, sw = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
    flame: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 1.7c.5 3.2-1 5-2.7 6.8C9 10.300 7 12.200 7 15.300 7 19 9.700 22 13 22c3.600 0 6-2.900 6-6.500 0-3.300-1.800-5.500-3.100-7.100-.3 1.300-1 2.200-2 2.700.5-3.400-.2-7-.4-9.400z"/></svg>',
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
    watched: svgIcon('<circle cx="12" cy="12" r="9.25"/><path d="m8.25 12.25 2.5 2.5 5-5.25"/>'),
    shuffle: svgIcon('<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="m15 15 6 6"/><path d="M4 4l5 5"/>'),
    moon: svgIcon('<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z"/>'),
    user: svgIcon('<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5"/>'),
};


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


const cacheBust = '?v=' + Date.now();
const state = {
    shows: [], hero: [], collections: [], heroCtl: null,
    route: { name: 'home' },
    detail: { show: null, seasonIdx: -1, tab: 'episodes', reqId: 0 },
    play: {
        show: null, seasonNumber: null, seasonData: null, epIdx: -1,
        sources: [], srcIdx: -1, kind: null, token: 0, loadTok: 0,
        cueTrack: null, subIdx: -1, lastSubIdx: -1, defaultSubPicked: false,
        pushed: false, returnFocus: null,
        next: null, prev: null, nextP: null, upNextDismissed: false, watchedMarked: false, extra: false, queue: null, logT: null,
    },
    hls: null,
    playbackSpeed: parseFloat(lsGet('lsSpeed', '1')) || 1,
    dl: { active: false, text: '', pct: 0 },
    controlsTimer: null, currentSkipTarget: null,
    seasonCache: new Map(), seasonData: new Map(),
    durIO: null, lastTouch: 0, lastProgSave: 0,
    pendingScroll: null,
};
const seasonMemo = new Map();
const browseMem = {};
let tvActive = false;

const getShow = (id) => state.shows.find(s => s.id === id);
const playableSeasons = (show) => (show && Array.isArray(show.seasons) ? show.seasons.filter(s => s && s.file) : []);
const isMovie = (show) => !!show && show.type === 'movie';
const autoplayOn = () => lsGet('lsAutoplay') !== '0';
const subsEnabled = () => lsGet('lsSubsOn') !== '0';
const stillsMode = () => { const v = lsGet('lsHideStills', 'off'); return v === '1' || v === 'all' ? 'all' : (v === 'unwatched' ? 'unwatched' : 'off'); };
const stillHidden = (showId, s, e) => { const m = stillsMode(); return m === 'all' || (m === 'unwatched' && !isWatched(getProgress(showId, s, e))); };
const descHidden = (showId, s, e) => lsGet('lsHideDesc') === '1' && !isWatched(getProgress(showId, s, e));
const stillPlaceholder = (ep) => `<div class="thumb-empty thumb-hidden" aria-hidden="true">${esc(String(ep.number))}</div>`;
const HIDDEN_DESC = 'Description hidden until you watch this episode.';

function epStatus(ep) {
    const s = String(ep.status || '').toLowerCase().trim();
    if (s === 'upcoming' || s === 'soon' || s === 'coming-soon' || s === 'comingsoon' || (ep.upcoming && !s)) return { id: 'upcoming', label: ep.statusText || 'Coming soon' };
    if (s === 'unavailable') return { id: 'unavailable', label: ep.statusText || 'Unavailable' };
    if (!hasAnySource(ep)) return { id: 'unavailable', label: ep.statusText || 'Unavailable' };
    return null;
}
const hasAnySource = (ep) => !!((ep.embed && String(ep.embed).trim()) ||
    (Array.isArray(ep.sources) && ep.sources.some(x => x && x.url && String(x.url).trim())));


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


const PROG_KEY = 'lsProgressV2';
let progressMap = readJSON(PROG_KEY, {});
if (!progressMap || typeof progressMap !== 'object' || Array.isArray(progressMap)) progressMap = {};
const saveProgress = () => writeJSON(PROG_KEY, progressMap);
const progKey = (showId, s, e) => `${showId}|${s}|${e}`;
const getProgress = (showId, s, e) => progressMap[progKey(showId, s, e)] || null;
const isWatched = (p) => !!(p && (p.w || (p.d && p.t / p.d >= 0.95)));
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
function markUpNext(showId, s, ep) {
    if (!ep) return;
    const key = progKey(showId, s, ep.number);
    const prev = progressMap[key];
    if (prev && prev.t > 5) return;
    progressMap[key] = { t: 0, d: (prev && prev.d) || null, u: Date.now(), title: ep.title || '', thumb: ep.thumbnail || '', n: 1 };
    saveProgress();
}
function setWatched(showId, s, eps, on) {
    const before = [];
    eps.forEach(ep => {
        const key = progKey(showId, s, ep.number);
        const prev = progressMap[key];
        before.push([key, prev]);
        if (!on) { delete progressMap[key]; return; }
        progressMap[key] = { t: (prev && prev.t) || 0, d: (prev && prev.d) || null, u: Date.now(), title: ep.title || (prev && prev.title) || '', thumb: ep.thumbnail || (prev && prev.thumb) || '', w: 1 };
    });
    saveProgress();
    return before;
}
function restoreProgress(before) {
    before.forEach(([key, prev]) => { if (prev) progressMap[key] = prev; else delete progressMap[key]; });
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
    set('descSwitch', lsGet('lsHideDesc') === '1');
    set('altSwitch', altSourcesOn());
    const mode = stillsMode();
    $$('#stillsSeg .seg-btn').forEach(b => { const on = b.dataset.stills === mode; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on); });
}
function initThemeUI() {
    applyAccent(lsGet('lsTheme') || DEFAULT_ACCENT, false);
    applyAppearance();
    buildThemeSwatches();
    applyTvMode();
    syncSwitches();
}


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


function sourceKindOf(url, declared) {
    if (declared === 'tab' || declared === 'iframe' || declared === 'direct') return declared;
    if (!url || !url.trim()) return 'none';
    const u = url.toLowerCase().split(/[?#]/)[0];
    if (/\.(m3u8|mp4|webm|mov|m4v|mkv)$/.test(u)) return 'direct';
    return 'iframe';
}
function srcTypeTag(src) {
    if (src.type === 'tab') return 'NEW TAB';
    if (src.type === 'iframe') return youtubeId(src.url) ? 'YOUTUBE' : 'EMBED';
    return src.url.toLowerCase().includes('.m3u8') ? 'HLS' : 'MP4';
}
function allSources(ep) {
    if (!ep || epStatus(ep)) return [];
    const list = [];
    if (ep.embed && ep.embed.trim()) list.push({ label: 'Default', url: ep.embed.trim(), type: sourceKindOf(ep.embed), def: true });
    (Array.isArray(ep.sources) ? ep.sources : []).forEach((s, i) => {
        if (!s || !s.url || !s.url.trim()) return;
        list.push({ label: s.label || ('Source ' + (i + 1)), url: s.url.trim(), type: sourceKindOf(s.url, s.type) });
    });
    return list;
}
const AD_FREE_EMBEDS = /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com|youtube-nocookie\.com|youtu\.be)\//i;
const altSourcesOn = () => lsGet('lsAltSources') === '1';
const isAltSource = (src) => src.type === 'tab' || (src.type === 'iframe' && !AD_FREE_EMBEDS.test(src.url));
const episodeSources = (ep) => (altSourcesOn() ? allSources(ep) : allSources(ep).filter(s => !isAltSource(s)));
const isPlayable = (ep) => episodeSources(ep).length > 0;
const needsAltSources = (ep) => !altSourcesOn() && !isPlayable(ep) && allSources(ep).length > 0;
const ALT_LABEL = 'Alternate source';
const youtubeId = (url) => (String(url).match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i) || [])[1] || '';
function toEmbedUrl(url) {
    const u = url.trim();
    const yt = youtubeId(u);
    if (yt) {
        const start = (u.match(/[?&#](?:start|t)=(\d+)/) || [])[1];
        return `https://www.youtube.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1${start ? '&start=' + start : ''}`;
    }
    return u;
}


try { history.scrollRestoration = 'manual'; } catch {}
const scrollMem = new Map();
let curHistKey = null;
window.addEventListener('scroll', () => {
    if (curHistKey && !document.body.classList.contains('is-locked')) scrollMem.set(curHistKey, window.scrollY);
}, { passive: true });

function historyKey() {
    const st = history.state;
    if (st && st.lsKey) return { key: st.lsKey, traversal: true };
    const key = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    try { history.replaceState(Object.assign({}, st || {}, { lsKey: key }), ''); } catch {}
    return { key, traversal: false };
}
function parseStartTime(v) {
    if (v == null || v === '') return null;
    const s = String(v).trim();
    if (/^\d+(\.\d+)?$/.test(s)) return +s;
    const hms = s.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
    if (hms && (hms[1] || hms[2] || hms[3])) return (+hms[1] || 0) * 3600 + (+hms[2] || 0) * 60 + (+hms[3] || 0);
    if (/^\d+(:\d{1,2}){1,2}$/.test(s)) return s.split(':').reduce((a, n) => a * 60 + +n, 0);
    return null;
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
    const qi = h.startsWith('#/search') ? -1 : h.indexOf('?');
    const query = new URLSearchParams(qi >= 0 ? h.slice(qi + 1) : '');
    if (qi >= 0) h = h.slice(0, qi);
    const parts = h.slice(2).split('/').filter(Boolean).map(p => { try { return decodeURIComponent(p); } catch { return p; } });
    if (!parts.length) return { name: 'home' };
    switch (parts[0]) {
        case 'shows': case 'movies': case 'coming-soon': case 'my-list': case 'faq':
            return { name: parts[0] };
        case 'search':
            return { name: 'search', q: parts.slice(1).join('/') };
        case 'person':
            return parts[1] ? { name: 'person', person: parts[1] } : { name: 'home' };
        case 'collections':
            return parts[1] ? { name: 'collection', id: parts[1] } : { name: 'collections' };
        case 'recap':
            return { name: 'recap', ym: parts[1] || '' };
        case 'details':
            if (parts.length >= 4) {
                const s = parseInt(parts[2], 10), e = parseInt(parts[3], 10);
                if (!isNaN(s) && !isNaN(e)) return { name: 'episode', id: parts[1], s, e, t: parseStartTime(query.get('t')) };
            }
            if (parts.length >= 2) return { name: 'details', id: parts[1] };
            return { name: 'home' };
        default:
            return { name: 'notfound' };
    }
}
function updateNavActive(r) {
    const active = { home: 'home', shows: 'shows', movies: 'movies', 'coming-soon': 'coming-soon', search: 'search', 'my-list': 'my-list', collections: 'collections', collection: 'collections' }[r.name] || '';
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
        case 'episode': renderEpisodePage(r.id, r.s, r.e, r.t); break;
        case 'person': renderPersonPage(r.person); break;
        case 'collections': renderCollections(); setTitle('Collections'); break;
        case 'collection': renderCollection(r.id); break;
        case 'recap': renderRecap(r.ym); break;
        default: renderNotFound(); setTitle('Not found');
    }
    window.scrollTo(0, y);
    applyPendingScroll();
    updateTopbar();
    if (!keep) tvInitialFocus();
}
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
    if (!tvActive || topModal()) return;
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
                ${newBadgeText(show) ? `<span class="badge badge-accent card-badge">${esc(newBadgeText(show))}</span>` : ''}
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
    const img = IMG.card((!stillHidden(en.showId, en.s, en.e) && p.thumb) || show.banner || show.poster);
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
function newBadgeText(show) {
    if (show.comingSoon) return '';
    const v = show.newEpisodes || show.new;
    if (!v) return '';
    return typeof v === 'string' ? v : (show.newEpisodes ? 'New episodes' : 'New');
}
function metaHtml(show, { seasons = true } = {}) {
    const bits = [];
    const fresh = newBadgeText(show);
    if (fresh) bits.push(`<span class="badge badge-accent">${esc(fresh)}</span>`);
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
    return { s: null, e: null, resume: false };
}
function resumeLabel(show, target) {
    if (!target) return 'Play';
    if (target.resume) return isMovie(show) ? 'Resume' : `Resume ${epCode(target.s, target.e)}`;
    if (target.upNext) return isMovie(show) ? 'Play' : `Play ${epCode(target.s, target.e)}`;
    return 'Play';
}


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
            <div id="homeStrip"></div>
            <div id="continueSlot"></div>
            <div id="myListSlot"></div>
            ${state.collections.length ? railSection({ id: 'rowCollections', title: 'Collections', link: '#/collections', html: state.collections.map(collectionCard).join(''), cls: 'row-wide' }) : ''}
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
    renderHomeStrip();
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
    void h.el.offsetWidth;
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
function epResultHtml(r, toks, note) {
    const st = epStatus(r.ep);
    return `<a class="ep-result" href="#/details/${encodeURIComponent(r.show.id)}/${r.s}/${r.ep.number}">
        <div class="ep-result-thumb">${stillHidden(r.show.id, r.s, r.ep.number) ? stillPlaceholder(r.ep) : r.ep.thumbnail ? `<img class="fade" src="${esc(IMG.thumb(r.ep.thumbnail))}" alt="" loading="lazy" decoding="async">` : `<div class="thumb-empty">${ICON.film}</div>`}${st ? `<span class="badge badge-glass">${esc(st.label)}</span>` : (needsAltSources(r.ep) ? `<span class="badge badge-glass">${ALT_LABEL}</span>` : '')}</div>
        <div class="ep-result-body">
            <div class="ep-result-kicker">${esc(r.show.title)} · ${esc(isMovie(r.show) ? 'Movie' : epCode(r.s, r.ep.number))}</div>
            <div class="ep-result-title">${highlight(r.ep.title || 'Episode ' + r.ep.number, toks)}</div>
            ${note ? `<div class="ep-result-note">${esc(note)}</div>` : ''}
            ${r.ep.description ? (descHidden(r.show.id, r.s, r.ep.number) ? `<p class="ep-result-desc desc-hidden">${HIDDEN_DESC}</p>` : `<p class="ep-result-desc">${esc(r.ep.description)}</p>`) : ''}
        </div>
    </a>`;
}
function renderSearch(q0) {
    $('view').innerHTML = `<div class="page page-search"><div class="page-inner page-top">
        <form class="search-field" id="searchForm" role="search" autocomplete="off">
            ${ICON.search}
            <input type="search" id="searchInput" placeholder="Search shows, episodes and people" aria-label="Search shows, movies, episodes and people" enterkeyhint="search" spellcheck="false" autocomplete="off">
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
            <section class="search-section" id="peopleResults"></section>
            <section class="search-section" id="epResults"><div class="search-loading"><span class="spinner spinner-sm"></span>Searching episodes…</div></section>`;
        Promise.all([loadEpisodeIndex(), loadPeople()]).then(([index, people]) => {
            if (runId !== searchRun || !$('epResults')) return;
            const persons = [...people.values()].filter(p => { const n = norm(p.name); return toks.every(t => n.includes(t)); })
                .sort((a, b) => creditCount(b) - creditCount(a)).slice(0, 12);
            $('peopleResults').innerHTML = persons.length ? `<h2 class="section-title">People <span class="count">${persons.length}</span></h2><div class="person-chips">${persons.map(personChipHtml).join('')}</div>` : '';
            const all = searchEpisodes(index, toks);
            const eps = all.slice(0, 60);
            if (eps.length) {
                $('epResults').innerHTML = `<h2 class="section-title">Episodes <span class="count">${all.length}</span></h2><div class="ep-results">${eps.map(r => epResultHtml(r, toks)).join('')}</div>`;
            } else if (titles.length || persons.length) {
                $('epResults').innerHTML = '';
            } else {
                res.innerHTML = emptyState({ icon: ICON.search, title: `No results for "${raw}"`, text: 'Check the spelling, or try a show, character, episode or person.' });
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


const nameList = (v) => (Array.isArray(v) ? v : (v ? [v] : []))
    .map(x => String((x && typeof x === 'object' ? x.name : x) || '').trim()).filter(Boolean);
function epCredits(ep) {
    const cast = (Array.isArray(ep.cast) ? ep.cast : (ep.cast ? [ep.cast] : [])).map(c => (c && typeof c === 'object'
        ? { name: String(c.name || '').trim(), role: String(c.role || c.character || '').trim() }
        : { name: String(c || '').trim(), role: '' })).filter(c => c.name);
    return { cast, writers: nameList(ep.writers), directors: nameList(ep.directors) };
}
const personHref = (name) => '#/person/' + encodeURIComponent(name);
const personLink = (name) => `<a class="person-link" href="${personHref(name)}">${esc(name)}</a>`;
const creditCount = (p) => p.acted.length + p.wrote.length + p.directed.length + p.shows.length;

let peopleP = null;
function loadPeople() {
    if (peopleP) return peopleP;
    peopleP = loadEpisodeIndex().then(index => {
        const map = new Map();
        const get = (name) => {
            const k = norm(name);
            if (!map.has(k)) map.set(k, { name, acted: [], wrote: [], directed: [], shows: [] });
            return map.get(k);
        };
        index.forEach(r => {
            const c = epCredits(r.ep);
            c.cast.forEach(x => get(x.name).acted.push({ r, role: x.role }));
            c.writers.forEach(n => get(n).wrote.push({ r }));
            c.directors.forEach(n => get(n).directed.push({ r }));
        });
        state.shows.forEach(show => {
            nameList(show.starring).forEach(n => get(n).shows.push({ show, as: 'Starring' }));
            nameList(show.creator).forEach(n => get(n).shows.push({ show, as: 'Created' }));
        });
        return map;
    });
    return peopleP;
}
function personChipHtml(p) {
    const n = p.acted.length + p.wrote.length + p.directed.length;
    const sub = n ? plural(n, 'episode') : plural(p.shows.length, 'title');
    return `<a class="person-chip" href="${personHref(p.name)}"><span class="cast-avatar" aria-hidden="true">${esc(initials(p.name))}</span><span class="cast-text"><span class="cast-name">${esc(p.name)}</span><span class="cast-role">${esc(sub)}</span></span></a>`;
}
function creditGroupsHtml(list, note) {
    const groups = new Map();
    list.forEach(x => { const id = x.r.show.id; if (!groups.has(id)) groups.set(id, []); groups.get(id).push(x); });
    return [...groups.values()].map(items => `<div class="credit-group">
        <h3 class="credit-show"><a href="#/details/${encodeURIComponent(items[0].r.show.id)}">${esc(items[0].r.show.title)}</a> <span class="count">${items.length}</span></h3>
        <div class="ep-results">${items.map(x => epResultHtml(x.r, [], note(x))).join('')}</div>
    </div>`).join('');
}
function renderPersonPage(name) {
    setTitle(name);
    $('view').innerHTML = `<div class="page"><div class="page-inner page-top">
        <header class="person-head">
            <span class="person-avatar" aria-hidden="true">${esc(initials(name))}</span>
            <div>
                <p class="eyebrow">Cast &amp; crew</p>
                <h1 class="page-title">${esc(name)}</h1>
                <p class="page-sub" id="personSummary"></p>
            </div>
        </header>
        <div id="personBody"><div class="search-loading"><span class="spinner spinner-sm"></span>Finding credits…</div></div>
    </div></div>`;
    const key = norm(name);
    loadPeople().then(map => {
        if (state.route.name !== 'person' || norm(state.route.person) !== key || !$('personBody')) return;
        const p = map.get(key);
        if (!p) {
            $('personBody').innerHTML = emptyState({ icon: ICON.user, title: 'No credits yet', text: `Nothing on ${BRAND} credits ${name} yet.` });
            return;
        }
        const bits = [];
        if (p.acted.length) bits.push(`appears in ${plural(p.acted.length, 'episode')}`);
        if (p.wrote.length) bits.push(`wrote ${p.wrote.length}`);
        if (p.directed.length) bits.push(`directed ${p.directed.length}`);
        const summary = bits.join(' · ');
        $('personSummary').textContent = summary.charAt(0).toUpperCase() + summary.slice(1);
        const sections = [];
        const starring = p.shows.filter(x => x.as === 'Starring').map(x => x.show);
        const created = p.shows.filter(x => x.as === 'Created').map(x => x.show);
        if (created.length) sections.push(['Created', `<div class="grid">${created.map(posterCard).join('')}</div>`]);
        if (starring.length) sections.push(['Starring in', `<div class="grid">${starring.map(posterCard).join('')}</div>`]);
        if (p.directed.length) sections.push([`Directed <span class="count">${p.directed.length}</span>`, creditGroupsHtml(p.directed, () => '')]);
        if (p.wrote.length) sections.push([`Written <span class="count">${p.wrote.length}</span>`, creditGroupsHtml(p.wrote, () => '')]);
        if (p.acted.length) sections.push([`Acted in <span class="count">${p.acted.length}</span>`, creditGroupsHtml(p.acted, x => (x.role ? 'as ' + x.role : ''))]);
        $('personBody').innerHTML = sections.map(([h, html]) => `<section class="search-section"><h2 class="section-title">${h}</h2>${html}</section>`).join('');
        applyPendingScroll();
    });
}


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
const getCollection = (id) => state.collections.find(c => c.id === id);
function collectionSections(c) {
    return (c.sections || []).map(sec => {
        const entries = [];
        (sec.items || []).forEach(item => {
            const show = getShow(item.show);
            if (!show) { console.warn(`collections.json: no show or movie with id "${item.show}" in show.json`); return; }
            const refs = playableSeasons(show);
            const picked = Array.isArray(item.seasons) ? refs.filter(r => item.seasons.includes(r.number)) : refs;
            (picked.length ? picked : [null]).forEach(ref => {
                const whole = isMovie(show) || refs.length < 2;
                entries.push({
                    show, seasonNumber: ref ? ref.number : null, file: ref ? ref.file : '',
                    soon: !!show.comingSoon || !ref, title: item.label || show.title,
                    sub: whole ? kindLabel(show) : seasonLabel(ref.number), thumb: '', total: 0, watched: 0,
                });
            });
        });
        return { title: sec.title || '', note: sec.note || '', numbered: sec.numbered !== false, entries };
    }).filter(sec => sec.entries.length);
}
const collectionsWith = (show) => state.collections.filter(c => (c.sections || []).some(sec => (sec.items || []).some(i => i.show === show.id)));
function collectionCard(c) {
    const secs = collectionSections(c);
    const first = secs.length ? secs[0].entries[0].show : null;
    const art = c.banner || (first && (first.banner || first.poster)) || '';
    const parts = secs.reduce((n, sec) => n + sec.entries.length, 0);
    return `<div class="card wide-card">
        <a class="card-link" href="#/collections/${encodeURIComponent(c.id)}" draggable="false" aria-label="${esc(c.title)}">
            <div class="card-media card-media-wide">
                ${art ? `<img class="card-img fade" src="${esc(IMG.card(art))}" alt="" loading="lazy" decoding="async" draggable="false">` : ''}
                <div class="card-fallback"><span>${esc(c.title)}</span></div>
                <div class="card-scrim card-scrim-soft"></div>
            </div>
        </a>
        <div class="card-caption"><div class="card-caption-title">${esc(c.title)}</div><div class="card-caption-sub">${esc(c.kicker || 'Collection')} · ${plural(parts, 'part')}</div></div>
    </div>`;
}
function renderCollections() {
    $('view').innerHTML = `<div class="page"><div class="page-inner page-top">
        <h1 class="page-title">Collections</h1>
        <p class="page-sub">Watch orders that take you through a whole story, across every show and movie in it.</p>
        ${state.collections.length ? `<div class="col-grid">${state.collections.map(collectionCard).join('')}</div>` : emptyState({ title: 'No collections yet' })}
    </div></div>`;
}
function colRowHtml(en, s, i, numbered) {
    const art = en.show.banner || en.show.poster;
    return `<li class="col-row"><button class="col-link" type="button" data-col-play="${s}:${i}" id="colRow-${s}-${i}" aria-label="Play ${esc(en.title)}, ${esc(en.sub)}">
        ${numbered ? `<span class="col-num">${i + 1}</span>` : ''}
        <span class="col-thumb">${art ? `<img src="${esc(IMG.thumb(art))}" alt="" loading="lazy" decoding="async">` : ''}${en.soon ? '' : `<span class="card-play">${ICON.play}</span>`}</span>
        <span class="col-text">
            <span class="col-title">${esc(en.title)}</span>
            <span class="col-sub">${esc(en.sub)}</span>
            ${en.soon ? `<span class="badge badge-accent-soft">${esc(en.show.comingSoonText || 'Coming soon')}</span>` : '<span class="col-meta"></span>'}
        </span>
    </button></li>`;
}
let colView = null;
function renderCollection(id) {
    const c = getCollection(id);
    if (!c) { renderNotFound("That collection doesn't exist or was removed."); setTitle('Not found'); return; }
    setTitle(c.title);
    const secs = collectionSections(c);
    const first = secs.length ? secs[0].entries[0].show : null;
    const art = c.banner || (first && (first.banner || first.poster)) || '';
    const view = colView = { c, secs };
    $('view').innerHTML = `<div class="page page-details">
        <section class="detail-hero col-hero">
            <div class="detail-bg" style="background-image:${esc(cssUrl(IMG.banner(art)))}"></div>
            <div class="detail-scrim"></div>
            <div class="detail-content page-inner">
                <div class="hero-kicker"><span class="hero-kicker-dot"></span>${esc(c.kicker || 'Collection')}</div>
                <h1 class="detail-title"><span class="detail-title-text">${esc(c.title)}</span></h1>
                ${c.description ? `<p class="detail-summary">${esc(c.description)}</p>` : ''}
                <div class="detail-actions"><button class="btn btn-primary btn-lg" id="colPlayBtn" type="button">${ICON.play}<span>Start watching</span></button></div>
                <div class="resume-note" id="colProgress" hidden></div>
            </div>
        </section>
        <div class="page-inner col-body">
            ${secs.map((sec, s) => `<section class="col-section">
                <h2 class="col-heading">${esc(sec.title)}</h2>
                ${sec.note ? `<p class="col-note">${esc(sec.note)}</p>` : ''}
                <ol class="col-list">${sec.entries.map((en, i) => colRowHtml(en, s, i, sec.numbered)).join('')}</ol>
            </section>`).join('')}
        </div>
    </div>`;
    $('colPlayBtn').addEventListener('click', () => playCollectionEntry(...collectionResumePoint(view)));
    const all = secs.flatMap(sec => sec.entries).filter(en => en.file);
    Promise.all(all.map(en => fetchSeason(en.file).then(data => {
        if (!isEpisodeSeason(data)) return;
        const eps = data.episodes.filter(ep => !epStatus(ep));
        en.total = eps.length;
        en.watched = eps.filter(ep => isWatched(getProgress(en.show.id, en.seasonNumber, ep.number))).length;
        en.thumb = (data.episodes[0] && data.episodes[0].thumbnail) || '';
    }).catch(() => {}))).then(() => { if (colView === view) fillCollectionProgress(view); });
}
function fillCollectionProgress(view) {
    let total = 0, watched = 0;
    view.secs.forEach((sec, s) => sec.entries.forEach((en, i) => {
        const row = $(`colRow-${s}-${i}`);
        if (!row) return;
        const img = row.querySelector('.col-thumb img');
        if (img && en.thumb && !stillsMode().includes('all')) img.src = IMG.thumb(en.thumb);
        const meta = row.querySelector('.col-meta');
        if (!meta) return;
        if (!en.total) { meta.textContent = 'Not available to stream'; return; }
        if (s === 0) { total += en.total; watched += en.watched; }
        const done = en.watched >= en.total;
        meta.innerHTML = `<span>${done ? 'Watched' : (isMovie(en.show) ? 'Not watched yet' : `${en.watched} of ${plural(en.total, 'episode')} watched`)}</span>
            ${en.watched && !done ? `<span class="progress-bar progress-inline"><span style="width:${(en.watched / en.total * 100).toFixed(1)}%"></span></span>` : ''}`;
        row.classList.toggle('is-done', done);
    }));
    const note = $('colProgress');
    if (note && total) {
        note.hidden = !watched;
        note.innerHTML = `<div class="progress-bar progress-inline"><span style="width:${(watched / total * 100).toFixed(1)}%"></span></div><span>${watched} of ${plural(total, 'episode')} watched</span>`;
    }
    const btn = $('colPlayBtn');
    if (btn) {
        const label = btn.querySelector('span');
        if (total && watched >= total) label.textContent = 'Watch again';
        else if (watched) label.textContent = 'Continue watching';
    }
}
function collectionResumePoint(view) {
    const entries = view.secs.length ? view.secs[0].entries : [];
    const left = (en) => en.file && !en.soon && en.watched < en.total;
    let last = -1;
    entries.forEach((en, i) => { if (en.watched > 0) last = i; });
    const from = last < 0 ? 0 : last;
    const i = entries.findIndex((en, k) => k >= from && left(en));
    return [0, i < 0 ? 0 : i];
}
async function playCollectionEntry(s, i) {
    const sec = colView && colView.secs[s];
    const en = sec && sec.entries[i];
    if (!en) return;
    if (en.soon || !en.file) { location.hash = '#/details/' + encodeURIComponent(en.show.id); return; }
    let data;
    try { data = await fetchSeason(en.file); } catch { toast("Couldn't load this season", { icon: ICON.alert }); return; }
    const eps = isEpisodeSeason(data) ? data.episodes : [];
    let idx = eps.findIndex(ep => isPlayable(ep) && !isWatched(getProgress(en.show.id, en.seasonNumber, ep.number)));
    if (idx < 0) idx = eps.findIndex(isPlayable);
    if (idx < 0) { toastNothingToPlay(eps.some(needsAltSources)); return; }
    openPlayer(en.show, en.seasonNumber, data, idx, { queue: { entries: sec.entries, idx: i } });
}

const LOG_KEY = 'lsWatchLog';
const STREAK_MIN_SECONDS = 60;
let watchLog = readJSON(LOG_KEY, {});
if (!watchLog || typeof watchLog !== 'object' || Array.isArray(watchLog)) watchLog = {};
const pad2 = (n) => String(n).padStart(2, '0');
const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
const monthKey = (d = new Date()) => `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
const parseDay = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const monthName = (ym, opts = { month: 'long', year: 'numeric' }) => parseDay(ym + '-01').toLocaleDateString('en', opts);
function logDay() {
    const k = dayKey();
    if (!watchLog[k]) watchLog[k] = { s: 0, t: {}, e: [] };
    return watchLog[k];
}
function logWatch(showId, secs) {
    const day = logDay();
    day.s = Math.round((day.s + secs) * 10) / 10;
    day.t[showId] = Math.round(((day.t[showId] || 0) + secs) * 10) / 10;
    writeJSON(LOG_KEY, watchLog);
    if (day.s < STREAK_MIN_SECONDS || lsGet('lsStreakDay') === dayKey()) return;
    lsSet('lsStreakDay', dayKey());
    const n = streakInfo().current;
    if (n >= 2) toast(`${n}-day watch streak`, { icon: ICON.flame });
}
function logFinished(showId, s, e) {
    const key = `${showId}|${s}|${e}`;
    const day = logDay();
    if (!day.e.includes(key)) day.e.push(key);
    writeJSON(LOG_KEY, watchLog);
}
function watchDays() {
    const days = {};
    Object.entries(watchLog).forEach(([k, d]) => { days[k] = { s: d.s || 0, t: d.t || {}, e: d.e || [], est: false }; });
    parseProgEntries().forEach(en => {
        if (!en.p.u || !(en.p.t > 0) || isUpNext(en.p)) return;
        const k = dayKey(new Date(en.p.u));
        if (watchLog[k]) return;
        if (!days[k]) days[k] = { s: 0, t: {}, e: [], est: true };
        days[k].s += en.p.t;
        days[k].t[en.showId] = (days[k].t[en.showId] || 0) + en.p.t;
        if (isWatched(en.p)) days[k].e.push(en.key);
    });
    return days;
}
const countsForStreak = (d) => !!d && (d.s >= STREAK_MIN_SECONDS || d.e.length > 0);
function runsIn(keys) {
    let best = 0, run = 0, prev = null;
    keys.slice().sort().forEach(k => {
        const gap = prev ? Math.round((parseDay(k) - parseDay(prev)) / 86400000) : 0;
        run = gap === 1 ? run + 1 : 1;
        best = Math.max(best, run);
        prev = k;
    });
    return best;
}
function streakInfo() {
    const days = watchDays();
    const keys = Object.keys(days).filter(k => countsForStreak(days[k]));
    const has = new Set(keys);
    const d = new Date();
    if (!has.has(dayKey(d))) d.setDate(d.getDate() - 1);
    let current = 0;
    while (has.has(dayKey(d))) { current++; d.setDate(d.getDate() - 1); }
    return { current, best: runsIn(keys) };
}
function monthSummary(ym, days = watchDays()) {
    const keys = Object.keys(days).filter(k => k.startsWith(ym + '-')).sort();
    const shows = {}, eps = new Set();
    let secs = 0, est = false, peak = null;
    keys.forEach(k => {
        const d = days[k];
        secs += d.s;
        est = est || d.est;
        d.e.forEach(e => eps.add(e));
        Object.entries(d.t).forEach(([id, n]) => { shows[id] = (shows[id] || 0) + n; });
        if (!peak || d.s > days[peak].s) peak = k;
    });
    const top = Object.entries(shows).map(([id, n]) => ({ show: getShow(id), secs: n })).filter(x => x.show).sort((a, b) => b.secs - a.secs);
    return { ym, keys, secs, eps: eps.size, top, peak, est, streak: runsIn(keys.filter(k => countsForStreak(days[k]))) };
}
function recapMonths(days = watchDays()) {
    return [...new Set(Object.keys(days).map(k => k.slice(0, 7)))].sort();
}
function prevMonthKey() {
    const d = new Date();
    d.setDate(1); d.setMonth(d.getMonth() - 1);
    return monthKey(d);
}
function renderHomeStrip() {
    const slot = $('homeStrip');
    if (!slot) return;
    const days = watchDays();
    const last = prevMonthKey();
    const ready = new Date().getDate() <= 7 && recapMonths(days).includes(last);
    const { current } = streakInfo();
    const parts = [];
    if (current >= 2) parts.push(`<span class="strip-streak">${ICON.flame}<span>${current}-day streak</span></span>`);
    if (ready) parts.push(`<span>Your ${esc(monthName(last, { month: 'long' }))} recap is ready</span>`);
    else if (current >= 2) parts.push('<span>See your month so far</span>');
    slot.innerHTML = parts.length ? `<div class="page-inner"><a class="home-strip" href="#/recap${ready ? '/' + last : ''}">${parts.join('')}${ICON.chevR}</a></div>` : '';
}
function recapCalendarHtml(ym, days) {
    const first = parseDay(ym + '-01');
    const total = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7;
    const max = Math.max(1, ...Object.keys(days).filter(k => k.startsWith(ym + '-')).map(k => days[k].s));
    const cells = Array.from({ length: lead }, () => '<span class="cal-cell cal-blank"></span>');
    for (let i = 1; i <= total; i++) {
        const k = `${ym}-${pad2(i)}`;
        const d = days[k];
        const level = d && d.s > 0 ? Math.max(1, Math.ceil(d.s / max * 4)) : 0;
        cells.push(`<span class="cal-cell cal-${level}" title="${esc(parseDay(k).toLocaleDateString('en', { month: 'short', day: 'numeric' }))}${d ? ': ' + esc(fmtMinutes(d.s)) : ''}">${i}</span>`);
    }
    return `<div class="cal-head">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(x => `<span>${x}</span>`).join('')}</div><div class="cal-grid">${cells.join('')}</div>`;
}
function renderRecap(ym) {
    const days = watchDays();
    const months = recapMonths(days);
    const now = monthKey();
    if (!/^\d{4}-\d{2}$/.test(ym)) ym = months.includes(now) || !months.length ? now : months[months.length - 1];
    const label = monthName(ym);
    setTitle(`${label} recap`);
    const sum = monthSummary(ym, days);
    const i = months.indexOf(ym);
    const prev = i > 0 ? months[i - 1] : (i < 0 ? months.filter(m => m < ym).pop() : null);
    const next = i >= 0 && i < months.length - 1 ? months[i + 1] : (i < 0 ? months.find(m => m > ym) : null);
    const nav = `<div class="recap-nav">
        ${prev ? `<a class="btn btn-sm btn-glass" href="#/recap/${prev}">${ICON.chevL}<span>${esc(monthName(prev, { month: 'short' }))}</span></a>` : '<span></span>'}
        ${next ? `<a class="btn btn-sm btn-glass" href="#/recap/${next}"><span>${esc(monthName(next, { month: 'short' }))}</span>${ICON.chevR}</a>` : '<span></span>'}
    </div>`;
    const head = `<h1 class="page-title">Your ${esc(label)}</h1>`;
    if (!sum.keys.length) {
        $('view').innerHTML = `<div class="page"><div class="page-inner page-top recap">${head}${nav}${emptyState({ title: 'Nothing watched this month', text: 'Watch something and your recap will build itself here.', action: '<a class="btn btn-primary" href="#/">Find something to watch</a>' })}</div></div>`;
        return;
    }
    const streak = streakInfo();
    const topMax = sum.top.length ? sum.top[0].secs : 1;
    const hero = sum.top[0] ? sum.top[0].show : null;
    $('view').innerHTML = `<div class="page"><div class="page-inner page-top recap">
        ${head}
        <p class="page-sub">${ym === now ? 'Your month so far.' : 'How your month looked.'}${sum.est ? ' Some of this is estimated from your watch history, because daily tracking started later.' : ''}</p>
        ${nav}
        <div class="recap-stats">
            <div class="stat"><div class="stat-val">${esc(fmtMinutes(sum.secs))}</div><div class="stat-label">Time watched</div></div>
            <div class="stat"><div class="stat-val">${sum.eps}</div><div class="stat-label">Episodes finished</div></div>
            <div class="stat"><div class="stat-val">${sum.keys.length}</div><div class="stat-label">Days watched</div></div>
            <div class="stat"><div class="stat-val">${sum.streak}</div><div class="stat-label">Longest streak</div></div>
        </div>
        ${hero ? `<a class="recap-top" href="#/details/${encodeURIComponent(hero.id)}">
            <span class="recap-top-bg" style="background-image:${esc(cssUrl(IMG.banner(hero.banner || hero.poster || '')))}"></span>
            <span class="recap-top-text"><span class="recap-top-label">Your top ${isMovie(hero) ? 'movie' : 'show'}</span><span class="recap-top-title">${esc(hero.title)}</span><span class="recap-top-sub">${esc(fmtMinutes(sum.top[0].secs))} watched</span></span>
        </a>` : ''}
        <div class="recap-cols">
            ${sum.top.length > 1 ? `<section><h2 class="col-heading">What you watched</h2><ol class="recap-bars">${sum.top.slice(0, 6).map(x => `<li>
                <span class="recap-bar-label"><a href="#/details/${encodeURIComponent(x.show.id)}">${esc(x.show.title)}</a><span>${esc(fmtMinutes(x.secs))}</span></span>
                <span class="recap-bar"><span style="width:${(x.secs / topMax * 100).toFixed(1)}%"></span></span>
            </li>`).join('')}</ol></section>` : ''}
            <section><h2 class="col-heading">Your days</h2>${recapCalendarHtml(ym, days)}
                <p class="col-note">${sum.peak ? `Your biggest day was ${esc(parseDay(sum.peak).toLocaleDateString('en', { month: 'long', day: 'numeric' }))}, with ${esc(fmtMinutes(days[sum.peak].s))} watched.` : ''}${streak.current >= 2 ? ` You're on a ${streak.current}-day streak.` : ''}</p>
            </section>
        </div>
        <div class="recap-actions"><button class="btn btn-glass" id="recapCopyBtn" type="button">Copy my recap</button></div>
    </div></div>`;
    $('recapCopyBtn').addEventListener('click', async () => {
        const text = `My ${label} on ${BRAND}: ${fmtMinutes(sum.secs)} watched, ${plural(sum.eps, 'episode')} finished over ${plural(sum.keys.length, 'day')}${hero ? `. Top pick: ${hero.title}` : ''}.`;
        try { await navigator.clipboard.writeText(text); toast('Recap copied'); }
        catch { toast("Couldn't copy your recap", { icon: ICON.alert }); }
    });
}
const showExtras = (show) => (Array.isArray(show.extras) ? show.extras : []).filter(x => x && x.url && String(x.url).trim());
const extraTitle = (x, i) => x.title || x.kind || `Extra ${i + 1}`;
function extraThumb(show, x) {
    if (x.thumbnail) return IMG.card(x.thumbnail);
    const yt = youtubeId(x.url);
    return yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : IMG.card(show.banner || show.poster || '');
}
function extraCard(show, x, i) {
    const title = extraTitle(x, i);
    const img = extraThumb(show, x);
    const sub = [x.kind, fmtEpDuration(x.duration)].filter(Boolean).join(' · ');
    return `<div class="card wide-card">
        <button class="card-link" type="button" data-extra="${i}" aria-label="Play ${esc(title)}">
            <div class="card-media card-media-wide">
                ${img ? `<img class="card-img fade" src="${esc(img)}" alt="" loading="lazy" decoding="async" draggable="false">` : ''}
                <div class="card-fallback"><span>${esc(title)}</span></div>
                <div class="card-scrim card-scrim-soft"></div>
                <span class="card-play">${ICON.play}</span>
            </div>
            <div class="card-caption">
                <div class="card-caption-title">${esc(title)}</div>
                ${sub ? `<div class="card-caption-sub">${esc(sub)}</div>` : ''}
            </div>
        </button>
    </div>`;
}
function playExtra(show, i) {
    const x = showExtras(show)[i];
    if (!x) return;
    const ep = {
        number: i + 1, title: extraTitle(x, i), thumbnail: x.thumbnail || '', subtitles: x.subtitles,
        sources: [{ label: 'Default', url: String(x.url).trim(), type: x.type }],
    };
    openPlayer(show, null, { episodes: [ep] }, 0, { extra: true });
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
    const extras = showExtras(show);
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
                           ${listBtnHtml(show.id, isInMyList(show.id), 'icon-btn icon-btn-lg')}
                           ${hasEpisodes ? `<button class="icon-btn icon-btn-lg" id="detailRandomBtn" type="button" aria-label="Play a random episode" title="Random episode">${ICON.shuffle}</button>` : ''}`}
                    <button class="icon-btn icon-btn-lg" id="detailShareBtn" type="button" aria-label="Share" title="Share">${ICON.share}</button>
                </div>
                ${resumeNote}
                ${collectionsWith(show).length ? `<div class="tag-row">${collectionsWith(show).map(c => `<a class="col-tag" href="#/collections/${encodeURIComponent(c.id)}">${ICON.layers}<span>${esc(c.title)}</span></a>`).join('')}</div>` : ''}
                ${(show.seasons || []).some(s => s.comingSoonText) ? `<div class="tag-row">${show.seasons.filter(s => s.comingSoonText).map(s => `<span class="badge badge-accent-soft">${esc(s.comingSoonText)}</span>`).join('')}</div>` : ''}
            </div>
        </section>
        <div class="page-inner detail-body">
            <div class="tabs" role="tablist" id="detailTabs">
                ${tabs.map(([k, label]) => `<button class="tab" type="button" role="tab" id="tab-${k}" data-tab="${k}" aria-controls="tabPanel">${esc(label)}</button>`).join('')}
            </div>
            <div id="tabPanel" role="tabpanel"></div>
        </div>
        ${extras.length ? railSection({ id: 'extrasRail', title: 'Extras', cls: 'row-wide', html: extras.map((x, i) => extraCard(show, x, i)).join('') }) : ''}
    </div>`;
    if (extras.length) bindRails($('view'));

    const playBtn = $('detailPlayBtn');
    if (playBtn) playBtn.addEventListener('click', () => playEpisodeByRef(show.id, target.s, target.e));
    $('detailShareBtn').addEventListener('click', () => openShare({
        title: show.title, sub: [kindLabel(show), show.years].filter(Boolean).join(' · '),
        image: show.banner || show.poster, path: sharePath(show.id),
    }));
    const randomBtn = $('detailRandomBtn');
    if (randomBtn) randomBtn.addEventListener('click', () => playRandomEpisode(show, randomBtn));
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
    if (nameList(show.creator).length) fields.push(['Created by', nameList(show.creator).map(personLink).join(', ')]);
    if (nameList(show.starring).length) fields.push(['Starring', nameList(show.starring).map(personLink).join('<br>')]);
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
    panel.innerHTML = `<div class="season-bar">${picker}<span class="season-count" id="seasonCount"></span><button class="btn btn-sm btn-glass season-watch" id="seasonWatchBtn" type="button" hidden></button></div><div class="ep-list" id="epList"></div>`;
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
    if ($('seasonWatchBtn')) $('seasonWatchBtn').hidden = true;
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
    if ($('seasonWatchBtn')) $('seasonWatchBtn').hidden = true;
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
function watchBtnHtml(watched, attrs, cls = 'ep-watch') {
    const label = watched ? 'Mark as unwatched' : 'Mark as watched';
    return `<button class="${cls}${watched ? ' is-on' : ''}" type="button" ${attrs} aria-pressed="${watched}" aria-label="${label}" title="${label}">${ICON.watched}</button>`;
}
function epRowHtml(show, seasonNumber, ep, i) {
    const st = epStatus(ep);
    const p = st ? null : getProgress(show.id, seasonNumber, ep.number);
    const dur = st ? '' : knownDuration(ep);
    const playable = !st && isPlayable(ep);
    const lock = !st && needsAltSources(ep);
    const href = `#/details/${encodeURIComponent(show.id)}/${seasonNumber}/${ep.number}`;
    return `<div class="ep${st || lock ? ' is-status' : ''}${isWatched(p) ? ' is-watched' : ''}">
        <div class="ep-thumb">
            ${stillHidden(show.id, seasonNumber, ep.number) ? stillPlaceholder(ep) : ep.thumbnail ? `<img class="fade" src="${esc(IMG.thumb(ep.thumbnail))}" alt="" loading="lazy" decoding="async" draggable="false">` : `<div class="thumb-empty">${ICON.film}</div>`}
            ${st ? `<span class="ep-status">${esc(st.label)}</span>` : (lock ? `<span class="ep-status">${ALT_LABEL}</span>` : '')}
            ${playable ? `<button class="ep-play" type="button" data-play-ep="${i}" aria-label="Play episode ${esc(String(ep.number))}: ${esc(ep.title || '')}"><span>${ICON.play}</span></button>` : ''}
            ${isWatched(p) ? `<span class="ep-check" title="Watched">${ICON.check}</span>` : ''}
            ${isInProgress(p) ? `<div class="progress-bar"><span style="width:${progPct(p).toFixed(1)}%"></span></div>` : ''}
        </div>
        <div class="ep-body">
            <div class="ep-head">
                <h3 class="ep-title"><a class="ep-link" href="${href}" draggable="false"><span class="ep-num">${esc(String(ep.number))}.</span> ${esc(ep.title || 'Episode ' + ep.number)}</a></h3>
                ${st ? '' : `<span class="ep-dur" data-dur-url="${esc((ep.embed || '').trim())}">${esc(dur)}</span>${watchBtnHtml(isWatched(p), `data-watch-ep="${i}"`)}`}
            </div>
            ${ep.description ? (descHidden(show.id, seasonNumber, ep.number) ? `<p class="ep-desc desc-hidden">${HIDDEN_DESC}</p>` : `<p class="ep-desc">${esc(ep.description)}</p>`) : ''}
        </div>
    </div>`;
}
function renderEpisodeList(show, seasonNumber, data) {
    const eps = Array.isArray(data.episodes) ? data.episodes : [];
    const el = $('epList');
    const statuses = eps.map(epStatus).filter(Boolean);
    const upcoming = statuses.filter(x => x.id === 'upcoming').length, unavailable = statuses.length - upcoming;
    $('seasonCount').textContent = eps.length ? plural(eps.length, 'episode') + (upcoming ? ` · ${upcoming} coming soon` : '') + (unavailable ? ` · ${unavailable} unavailable` : '') : '';
    const released = eps.map((e, i) => i).filter(i => !epStatus(eps[i]));
    const allWatched = released.length > 0 && released.every(i => isWatched(getProgress(show.id, seasonNumber, eps[i].number)));
    const sw = $('seasonWatchBtn');
    if (sw) {
        sw.hidden = !released.length;
        sw.innerHTML = `${ICON.watched}<span>${allWatched ? 'Mark season unwatched' : 'Mark season watched'}</span>`;
        sw.onclick = () => toggleWatched(show, seasonNumber, data, released, !allWatched);
    }
    if (!eps.length) { el.innerHTML = emptyState({ title: 'No episodes in this season yet' }); return; }
    el.innerHTML = eps.map((ep, i) => epRowHtml(show, seasonNumber, ep, i)).join('');
    $$('[data-play-ep]', el).forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPlayer(show, seasonNumber, data, +btn.dataset.playEp);
    }));
    $$('[data-watch-ep]', el).forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleWatched(show, seasonNumber, data, [+btn.dataset.watchEp], btn.getAttribute('aria-pressed') !== 'true');
    }));
    observeDurations(el);
}
async function toggleWatched(show, s, data, idxs, on) {
    const eps = idxs.map(i => data.episodes[i]).filter(Boolean);
    if (!eps.length) return;
    const before = setWatched(show.id, s, eps, on);
    if (on && !isMovie(show)) {
        const nx = await findNeighbor(show, s, data, Math.max(...idxs), 1).catch(() => null);
        if (nx) {
            const next = nx.data.episodes[nx.idx];
            const key = progKey(show.id, nx.seasonNumber, next.number);
            before.push([key, progressMap[key]]);
            markUpNext(show.id, nx.seasonNumber, next);
        }
    }
    refreshAfterWatch();
    const what = eps.length === 1 ? (eps[0].title || 'Episode ' + eps[0].number) : plural(eps.length, 'episode');
    toast(`Marked ${what} as ${on ? 'watched' : 'unwatched'}`, {
        icon: on ? ICON.check : ICON.x,
        action: { label: 'Undo', fn: () => { restoreProgress(before); refreshAfterWatch(); } },
    });
}
function refreshAfterWatch() {
    const a = document.activeElement;
    const sel = a && a.id ? '#' + a.id : (a && a.dataset && a.dataset.watchEp != null ? `[data-watch-ep="${a.dataset.watchEp}"]` : null);
    route({ keepScroll: true });
    const el = sel && document.querySelector(sel);
    if (el) el.focus({ preventScroll: true });
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


function renderEpisodePage(id, sNum, eNum, startAt) {
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
        if (startAt != null) {
            try { history.replaceState(history.state, '', location.pathname + location.search + location.hash.replace(/\?.*$/, '')); } catch {}
            state.route.t = null;
            if (isPlayable(data.episodes[idx])) openPlayer(show, ref.number, data, idx, { startAt });
        }
    };
    const cached = seasonDataSync(ref.file);
    if (cached) { draw(cached); return; }
    setTitle(show.title);
    $('view').innerHTML = `<div class="page"><div class="page-inner page-top"><div class="ep-page-grid"><div class="ep-page-media skeleton"></div><div><div class="skel-line skeleton" style="width:30%"></div><div class="skel-line skeleton" style="width:70%;height:32px"></div><div class="skel-line skeleton" style="width:90%"></div><div class="skel-line skeleton" style="width:80%"></div></div></div></div></div>`;
    fetchSeason(ref.file).then(draw).catch(() => {
        $('view').innerHTML = `<div class="page"><div class="page-inner page-top">${emptyState({ icon: ICON.alert, title: "Couldn't load this episode", text: 'Check your connection and try again.', action: `<a class="btn btn-primary" href="#/details/${encodeURIComponent(id)}">Back to ${esc(show.title)}</a>` })}</div></div>`;
    });
}
const fmtAirDate = (v) => {
    const d = v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(v + 'T00:00:00') : null;
    return d && !isNaN(d) ? d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : (v ? String(v) : '');
};
const initials = (name) => name.split(/\s+/).filter(w => /^[a-z0-9]/i.test(w)).map(w => w[0]).slice(0, 2).join('').toUpperCase() || '?';
function creditsHtml(ep) {
    const { cast, writers, directors } = epCredits(ep);
    if (!cast.length && !writers.length && !directors.length) return '';
    const facts = [['Directed by', directors], ['Written by', writers]].filter(([, list]) => list.length)
        .map(([k, list]) => `<div><dt>${k}</dt><dd>${list.map(personLink).join(', ')}</dd></div>`).join('');
    return `<section class="credits page-inner" aria-labelledby="creditsTitle">
        <h2 class="section-title" id="creditsTitle">Cast &amp; crew</h2>
        ${facts ? `<dl class="credit-facts">${facts}</dl>` : ''}
        ${cast.length ? `<ul class="cast-grid">${cast.map(c => `<li><a class="cast-card" href="${personHref(c.name)}">
            <span class="cast-avatar" aria-hidden="true">${esc(initials(c.name))}</span>
            <span class="cast-text"><span class="cast-name">${esc(c.name)}</span>${c.role ? `<span class="cast-role">${esc(c.role)}</span>` : ''}</span>
        </a></li>`).join('')}</ul>` : ''}
    </section>`;
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
    const lock = !st && needsAltSources(ep);
    const base = `#/details/${encodeURIComponent(show.id)}/${seasonNumber}/`;
    const img = (!stillHidden(show.id, seasonNumber, ep.number) && ep.thumbnail) || show.banner || '';
    const hideDesc = !!ep.description && descHidden(show.id, seasonNumber, ep.number);
    const aired = fmtAirDate(ep.airDate);
    setTitle(`${ep.title || 'Episode ' + ep.number} · ${show.title}`);
    $('view').innerHTML = `<div class="page page-episode">
        <div class="ep-backdrop"><div class="ep-backdrop-img" style="background-image:${esc(cssUrl(IMG.card(img)))}"></div></div>
        <div class="page-inner page-top ep-page">
            <nav class="crumbs" aria-label="Breadcrumb">
                <a href="#/details/${encodeURIComponent(show.id)}">${ICON.chevL}<span>${esc(show.title)}</span></a>
                ${isMovie(show) ? '' : `<span class="crumb-sep">/</span><span>${esc(seasonLabel(seasonNumber))}</span>`}
            </nav>
            <div class="ep-page-grid">
                <div class="ep-page-media${st || lock ? ' is-status' : ''}">
                    ${img ? `<img class="fade" src="${esc(IMG.still(img))}" alt="" decoding="async">` : `<div class="thumb-empty">${ICON.film}</div>`}
                    ${st ? `<span class="ep-status">${esc(st.label)}</span>` : (lock ? `<span class="ep-status">${ALT_LABEL}</span>` : '')}
                    ${canPlay ? `<button class="ep-page-play" type="button" data-ep-page-play aria-label="Play">${ICON.play}</button>` : ''}
                    ${inProg ? `<div class="progress-bar"><span style="width:${progPct(p).toFixed(1)}%"></span></div>` : ''}
                </div>
                <div class="ep-page-info">
                    <p class="eyebrow">${isMovie(show) ? 'Movie' : `${esc(seasonLabel(seasonNumber))} · Episode ${esc(String(ep.number))}`}</p>
                    <h1 class="ep-page-title">${esc(ep.title || 'Episode ' + ep.number)}</h1>
                    <div class="meta-line">
                        ${st ? `<span class="badge badge-accent-soft">${esc(st.label)}</span>` : ''}
                        ${dur ? `<span>${esc(dur)}</span>` : (ep.embed && !st ? '<span id="epPageDur"></span>' : '')}
                        ${aired ? `<span>${esc(aired)}</span>` : ''}
                        ${show.rating ? `<span class="badge badge-outline">${esc(show.rating)}</span>` : ''}
                        ${watched ? `<span class="badge badge-success">${ICON.check}Watched</span>` : ''}
                    </div>
                    ${hideDesc
                        ? `<p class="ep-page-desc desc-hidden" id="epDesc">${HIDDEN_DESC} <button class="link-btn" type="button" id="epDescReveal">Show anyway</button></p>`
                        : `<p class="ep-page-desc">${esc(ep.description || 'No description available for this episode.')}</p>`}
                    <div class="detail-actions">
                        ${canPlay
                            ? `<button class="btn btn-primary btn-lg" type="button" data-ep-page-play>${ICON.play}<span>${inProg ? 'Resume' : 'Play'}</span></button>`
                            : (lock
                                ? '<button class="btn btn-primary btn-lg" type="button" data-alt-enable><span>Turn on alternate sources</span></button>'
                                : `<button class="btn btn-primary btn-lg" type="button" disabled>${st ? esc(st.label) : 'Unavailable'}</button>`)}
                        ${listBtnHtml(show.id, isInMyList(show.id), 'icon-btn icon-btn-lg')}
                        ${st ? '' : watchBtnHtml(watched, 'id="epWatchBtn"', 'icon-btn icon-btn-lg')}
                        <button class="icon-btn icon-btn-lg" id="epShareBtn" type="button" aria-label="Share" title="Share">${ICON.share}</button>
                    </div>
                    ${inProg ? `<p class="hint">You're ${Math.round(progPct(p))}% through. Playback resumes from ${fmtClock(p.t)}.</p>` : ''}
                    ${st && st.id === 'upcoming' ? '<p class="hint">This episode isn\'t out yet. Check back soon.</p>' : ''}
                    ${lock ? '<p class="hint">This episode plays in a third-party player, which may show pop-up ads. An ad blocker helps.</p>' : ''}
                    <div class="ep-pager">
                        ${prevEp ? `<a class="pager-link" href="${base}${prevEp.number}">${ICON.chevL}<span><small>Previous</small>${esc(prevEp.title || 'Episode ' + prevEp.number)}</span></a>` : '<span></span>'}
                        ${nextEp ? `<a class="pager-link pager-next" href="${base}${nextEp.number}"><span><small>Next</small>${esc(nextEp.title || 'Episode ' + nextEp.number)}</span>${ICON.chevR}</a>` : ''}
                    </div>
                </div>
            </div>
        </div>
        ${creditsHtml(ep)}
        ${eps.length > 1 ? `<div id="epMoreSlot"></div>` : ''}
    </div>`;
    $$('[data-ep-page-play]').forEach(b => b.addEventListener('click', () => openPlayer(show, seasonNumber, data, idx)));
    $('epShareBtn').addEventListener('click', () => openShare({
        title: isMovie(show) ? show.title : `${ep.title || 'Episode ' + ep.number}`,
        sub: isMovie(show) ? kindLabel(show) : `${show.title} · ${epCode(seasonNumber, ep.number)}`,
        image: img, path: sharePath(show.id, seasonNumber, ep.number), time: inProg ? p.t : null,
    }));
    const wb = $('epWatchBtn');
    if (wb) wb.addEventListener('click', () => toggleWatched(show, seasonNumber, data, [idx], !watched));
    const reveal = $('epDescReveal');
    if (reveal) reveal.addEventListener('click', () => { const d = $('epDesc'); d.classList.remove('desc-hidden'); d.textContent = ep.description; });
    const durEl = $('epPageDur');
    if (durEl) queueDuration((ep.embed || '').trim(), durEl);
    if (eps.length > 1) {
        const cards = eps.map((e2) => {
            const st2 = epStatus(e2);
            const p2 = st2 ? null : getProgress(show.id, seasonNumber, e2.number);
            return `<div class="card wide-card mini-ep${e2 === ep ? ' is-current' : ''}${st2 || needsAltSources(e2) ? ' is-status' : ''}">
                <a class="card-link" href="${base}${e2.number}" draggable="false"${e2 === ep ? ' aria-current="page"' : ''}>
                    <div class="card-media card-media-wide">
                        ${stillHidden(show.id, seasonNumber, e2.number) ? stillPlaceholder(e2) : e2.thumbnail ? `<img class="card-img fade" src="${esc(IMG.thumb(e2.thumbnail))}" alt="" loading="lazy" decoding="async" draggable="false">` : ''}
                        <div class="card-fallback"><span>${esc(e2.title || '')}</span></div>
                        ${st2 ? `<span class="ep-status">${esc(st2.label)}</span>` : (needsAltSources(e2) ? `<span class="ep-status">${ALT_LABEL}</span>` : '')}
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


const siteBase = () => location.origin + location.pathname.replace(/[^/]*$/, '');
const sharePath = (showId, s, e) => `s/${encodeURIComponent(showId)}/` + (s != null && e != null ? `${s}/${e}/` : '');
const shareCtx = { opts: null };
function shareUrl() {
    const o = shareCtx.opts;
    const withTime = o.time != null && $('shareTimeChk').checked;
    return siteBase() + o.path + (withTime ? `?t=${Math.floor(o.time)}` : '');
}
function openShare(opts) {
    shareCtx.opts = opts;
    $('sharePreview').innerHTML = `<div class="share-thumb">${opts.image ? `<img src="${esc(IMG.card(opts.image))}" alt="">` : ''}</div>
        <div class="share-meta"><div class="share-site">${BRAND}</div><div class="share-title">${esc(opts.title)}</div>${opts.sub ? `<div class="share-sub">${esc(opts.sub)}</div>` : ''}</div>`;
    const hasTime = opts.time != null && opts.time >= 1;
    $('shareTimeRow').hidden = !hasTime;
    $('shareTimeChk').checked = hasTime && !!opts.timeDefault;
    $('shareTimeLabel').textContent = hasTime ? fmtClock(opts.time) : '';
    $('shareNative').hidden = !navigator.share;
    updateShareUrl();
    if (playerOpen() && isFullscreen()) toggleFS();
    openModal('shareModal');
}
function updateShareUrl() { if (shareCtx.opts) $('shareUrl').value = shareUrl(); }
$('shareTimeChk').addEventListener('change', updateShareUrl);
$('shareCopy').addEventListener('click', async () => {
    const url = shareUrl();
    try { await navigator.clipboard.writeText(url); toast('Link copied'); }
    catch { $('shareUrl').select(); document.execCommand && document.execCommand('copy'); toast('Link copied'); }
});
$('shareUrl').addEventListener('focus', (e) => e.target.select());
$('shareNative').addEventListener('click', async () => {
    const o = shareCtx.opts;
    try { await navigator.share({ title: o.title, text: o.sub ? `${o.title} · ${o.sub}` : o.title, url: shareUrl() }); } catch {}
});
$('shareTargets').addEventListener('click', (e) => {
    const b = e.target.closest('[data-share-to]');
    if (!b || !shareCtx.opts) return;
    const url = encodeURIComponent(shareUrl());
    const text = encodeURIComponent(`Watching ${shareCtx.opts.title}${shareCtx.opts.sub ? ' · ' + shareCtx.opts.sub : ''}`);
    const to = {
        x: `https://x.com/intent/post?text=${text}&url=${url}`,
        bluesky: `https://bsky.app/intent/compose?text=${text}%20${url}`,
        reddit: `https://www.reddit.com/submit?url=${url}&title=${encodeURIComponent(shareCtx.opts.title)}`,
        whatsapp: `https://wa.me/?text=${text}%20${url}`,
        email: `mailto:?subject=${encodeURIComponent(shareCtx.opts.title)}&body=${text}%0A${url}`,
    }[b.dataset.shareTo];
    if (to) window.open(to, '_blank', 'noopener');
});


async function playRandomEpisode(show, btn) {
    if (btn) btn.disabled = true;
    const seasons = await Promise.all(playableSeasons(show).map(ref => fetchSeason(ref.file).then(data => ({ ref, data })).catch(() => null)));
    if (btn) btn.disabled = false;
    const pool = [];
    seasons.forEach(x => {
        if (x && isEpisodeSeason(x.data)) x.data.episodes.forEach((ep, idx) => { if (isPlayable(ep)) pool.push({ s: x.ref.number, data: x.data, idx }); });
    });
    if (!pool.length) { toastNothingToPlay(seasons.some(x => x && isEpisodeSeason(x.data) && x.data.episodes.some(needsAltSources))); return; }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    openPlayer(show, pick.s, pick.data, pick.idx);
}
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
    const tryList = sNum != null ? playable.filter(x => x.number === sNum) : playable;
    if (!tryList.length) { location.hash = '#/details/' + encodeURIComponent(showId); return; }
    let locked = false;
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
        if (idx < 0) { locked = locked || eps.some(needsAltSources); continue; }
        openPlayer(show, ref.number, data, idx);
        return;
    }
    location.hash = '#/details/' + encodeURIComponent(showId);
    toastNothingToPlay(locked);
}
function toastNothingToPlay(locked) {
    if (locked) toast('This plays from alternate sources, which are turned off.', { icon: ICON.layers, duration: 6000, action: { label: 'Turn on', fn: openAltPrompt } });
    else toast('No streamable episodes available yet.', { icon: ICON.alert });
}
async function findQueueNeighbor(queue, dir) {
    for (let k = queue.idx + dir; k >= 0 && k < queue.entries.length; k += dir) {
        const en = queue.entries[k];
        if (!en.file) continue;
        let data;
        try { data = await fetchSeason(en.file); } catch { continue; }
        if (!isEpisodeSeason(data)) continue;
        const list = data.episodes;
        let i = -1;
        if (dir > 0) i = list.findIndex(isPlayable);
        else for (let j = list.length - 1; j >= 0 && i < 0; j--) if (isPlayable(list[j])) i = j;
        if (i >= 0) return { show: en.show, seasonNumber: en.seasonNumber, data, idx: i, queue: { entries: queue.entries, idx: k } };
    }
    return null;
}
async function findNeighbor(show, seasonNumber, seasonData, epIdx, dir, queue) {
    const eps = (seasonData && seasonData.episodes) || [];
    for (let i = epIdx + dir; i >= 0 && i < eps.length; i += dir) {
        if (isPlayable(eps[i])) return { seasonNumber, data: seasonData, idx: i };
    }
    if (queue) return findQueueNeighbor(queue, dir);
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
function stopMedia() {
    state.play.loadTok++;
    video.ontimeupdate = video.onplay = video.onpause = video.onended = video.onwaiting =
        video.onplaying = video.oncanplay = video.onerror = video.onprogress = null;
    try { video.pause(); } catch {}
    detachCueTrack();
    state.play.subIdx = -1;
    state.play.subDelay = 0;
    state.play.tick = state.play.onEnded = null;
    castState.loaded = false;
    if (state.hls) { try { state.hls.destroy(); } catch {} state.hls = null; }
    try { video.removeAttribute('src'); while (video.firstChild) video.removeChild(video.firstChild); video.load(); } catch {}
    revokeObjectUrls();
    const fsrc = frame.getAttribute('src');
    if (fsrc && fsrc !== 'about:blank') frame.src = 'about:blank';
    frame.hidden = true;
    stopYouTube();
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
const playNoun = () => (state.play.extra ? 'video' : (isMovie(state.play.show) ? 'movie' : 'episode'));
function saveCurrentPosition() {
    const { show, seasonNumber, kind, extra } = state.play;
    const ep = curEp();
    if ((kind !== 'direct' && kind !== 'youtube') || !show || !ep || extra) return;
    const t = mediaTime(), d = mediaDuration();
    if (t > 0 && isFinite(d) && d > 0) setProgress(show.id, seasonNumber, ep.number, t, d, { title: ep.title, thumb: ep.thumbnail });
}


const yt = { player: null, ready: false, timer: null, tracks: [], cc: null, ccInit: false, apiP: null };
const ytActive = () => state.play.kind === 'youtube' && yt.ready;
const hasCustomControls = () => state.play.kind === 'direct' || state.play.kind === 'youtube';
function loadYouTubeApi() {
    if (window.YT && YT.Player) return Promise.resolve();
    if (!yt.apiP) {
        yt.apiP = new Promise((resolve, reject) => {
            const prev = window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(); };
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.onerror = reject;
            document.head.appendChild(tag);
            setTimeout(reject, 8000);
        }).catch(err => { yt.apiP = null; throw err; });
    }
    return yt.apiP;
}
function stopYouTube() {
    clearInterval(yt.timer);
    const p = yt.player;
    Object.assign(yt, { player: null, ready: false, timer: null, tracks: [], cc: null, ccInit: false });
    if (p) { try { p.destroy(); } catch {} }
    $('pYT').innerHTML = '';
    playerEl.classList.remove('is-yt', 'yt-strip');
}
function startPlainEmbed(url) {
    stopYouTube();
    state.play.kind = 'iframe';
    playerEl.classList.add('is-embed');
    playerEl.classList.remove('hide-ui', 'is-casting');
    video.hidden = true;
    frame.hidden = false;
    frame.src = toEmbedUrl(url);
    $('pLoader').classList.remove('is-shown');
    updateCastButton();
}
function syncYtAudio() {
    if (!ytActive()) return;
    try {
        yt.player.setVolume(Math.round(video.volume * 100));
        if (video.muted) yt.player.mute(); else yt.player.unMute();
        yt.player.setPlaybackRate(state.playbackSpeed);
    } catch {}
}
video.addEventListener('volumechange', syncYtAudio);
function sizeYtLayout() {
    if (playerEl.classList.contains('is-yt')) playerEl.style.setProperty('--yt-ctrl', $('controlsBar').offsetHeight + 'px');
}
window.addEventListener('resize', sizeYtLayout);
window.addEventListener('blur', () => setTimeout(() => {
    if (state.play.kind === 'youtube' && document.activeElement && document.activeElement.tagName === 'IFRAME') playerEl.focus({ preventScroll: true });
}, 0));

function ytReadTracks() {
    let list = [];
    try {
        list = (yt.player && yt.player.getOption('captions', 'tracklist')) || [];
        const cur = yt.player && yt.player.getOption('captions', 'track');
        if (cur && cur.languageCode) list = [...list, cur];
    } catch {}
    list.forEach(t => { if (!yt.tracks.some(x => x.languageCode === t.languageCode)) yt.tracks.push(t); });
}
function ytApplyCaptionSize() {
    if (!yt.cc) return;
    const i = SUB_SIZES.findIndex(x => x.id === getSubStyle().size);
    try { yt.player.setOption('captions', 'fontSize', (i < 0 ? 1 : i) - 1); } catch {}
}
function ytSetCaptions(code) {
    yt.cc = code || null;
    try {
        if (code) { yt.player.loadModule('captions'); yt.player.setOption('captions', 'track', yt.tracks.find(t => t.languageCode === code) || { languageCode: code }); }
        else if (yt.player) yt.player.setOption('captions', 'track', {});
    } catch {}
    ytApplyCaptionSize();
    if (code) { lsSet('lsSubsOn', '1'); syncSwitches(); }
    updateCCBtn();
}
function ytPickTrack() {
    return yt.tracks.find(t => t.languageCode === 'en' && !t.kind) || yt.tracks.find(t => /^en/.test(t.languageCode)) || yt.tracks[0];
}
function ytDefaultCaptions(ep) {
    if (yt.ccInit) return;
    ytReadTracks();
    if (!yt.tracks.length) return;
    yt.ccInit = true;
    const own = (ep.subtitles || []).some(t => t && t.url && t.url.trim());
    if (subsEnabled() && !own) ytSetCaptions(ytPickTrack().languageCode);
    else ytSetCaptions(null);
}
function syncYtStrip() {
    playerEl.classList.toggle('yt-strip', !!(state.play.cueTrack || $('skipBtn').classList.contains('is-shown') || $('upNext').classList.contains('is-shown')));
}
function ytFailed(id) {
    if (state.play.sources.some((s, i) => i !== state.play.srcIdx)) { fatalPlaybackError(); return; }
    showPlayerMessage({
        title: 'Video unavailable',
        text: `YouTube won't play this ${playNoun()} here. It may still work on YouTube itself.`,
        actions: `<a class="btn btn-primary" href="https://www.youtube.com/watch?v=${encodeURIComponent(id)}" target="_blank" rel="noopener"><span>Watch on YouTube</span></a>` + discordBtn(),
    });
}
function setupYouTube(url, ep, ltok) {
    const { startTime, live, introS, introE, recapS, recapE, creditsS } = bindPlayback(ep, ltok);
    const id = youtubeId(url);
    const linkStart = parseInt((url.match(/[?&#](?:start|t)=(\d+)/) || [])[1], 10) || 0;
    const start = Math.floor(startTime || linkStart);
    updateSpeedLabel();
    loadYouTubeApi().then(() => {
        if (!live()) return;
        const el = document.createElement('iframe');
        el.title = 'Video player';
        el.allow = 'autoplay; encrypted-media; picture-in-picture; web-share';
        el.referrerPolicy = 'strict-origin-when-cross-origin';
        const q = new URLSearchParams({ enablejsapi: 1, origin: location.origin, controls: 0, disablekb: 1, fs: 0, rel: 0, iv_load_policy: 3, playsinline: 1, autoplay: 1 });
        if (start) q.set('start', start);
        el.src = `https://www.youtube.com/embed/${id}?${q}`;
        $('pYT').appendChild(el);
        let lastT = -1, marked = false, askedForCaptions = false;
        yt.player = new YT.Player(el, { events: {
            onReady: () => {
                if (!live()) return;
                yt.ready = true;
                syncYtAudio();
                yt.timer = setInterval(() => {
                    if (!live() || !yt.ready) return;
                    const ct = yt.player.getCurrentTime() || 0, dur = yt.player.getDuration() || 0;
                    if (!dur) return;
                    if (!marked) { marked = true; addScrubMarkers(dur, introS, introE, recapS, recapE, creditsS); }
                    if (ct !== lastT) { lastT = ct; if (state.play.tick) state.play.tick(ct, dur); }
                    $('pBuffered').style.width = ((yt.player.getVideoLoadedFraction() || 0) * 100) + '%';
                    if (askedForCaptions) ytDefaultCaptions(ep);
                    renderActiveCues();
                    syncYtStrip();
                }, 250);
            },
            onStateChange: (e) => {
                if (!live()) return;
                const st = window.YT.PlayerState;
                if (e.data === st.PLAYING) {
                    $('pLoader').classList.remove('is-shown');
                    updatePlayIcon(true);
                    setPlaybackState('playing');
                    if (!askedForCaptions) { askedForCaptions = true; try { yt.player.loadModule('captions'); } catch {} }
                } else if (e.data === st.PAUSED) {
                    updatePlayIcon(false);
                    saveCurrentPosition();
                    setPlaybackState('paused');
                } else if (e.data === st.ENDED) {
                    updatePlayIcon(false);
                    if (state.play.onEnded) state.play.onEnded();
                }
            },
            onError: () => { if (live()) ytFailed(id); },
        } });
    }).catch(() => { if (live()) startPlainEmbed(url); });
}

const mediaTime = () => (ytActive() ? yt.player.getCurrentTime() : (castActive() ? castState.player.currentTime : video.currentTime)) || 0;
const mediaDuration = () => (ytActive() ? (yt.player.getDuration() || NaN) : (castActive() ? castState.player.duration : video.duration));
const mediaPaused = () => (ytActive() ? yt.player.getPlayerState() !== window.YT.PlayerState.PLAYING : (castActive() ? castState.player.isPaused : video.paused));
function seekMedia(t) {
    const d = mediaDuration();
    if (!isFinite(d) || !d) return;
    t = clamp(t, 0, d);
    if (ytActive()) yt.player.seekTo(t, true);
    else if (castActive()) { castState.player.currentTime = t; castState.ctl.seek(); }
    else video.currentTime = t;
    updateScrub(t, d);
    updateTime(t, d);
}
function playMedia() {
    if (ytActive()) { yt.player.playVideo(); return; }
    if (castActive()) { if (castState.player.isPaused) castState.ctl.playOrPause(); return; }
    const p = video.play();
    if (p && p.catch) p.catch(() => {});
}
function pauseMedia() {
    if (ytActive()) { yt.player.pauseVideo(); return; }
    if (castActive()) { if (!castState.player.isPaused) castState.ctl.playOrPause(); return; }
    video.pause();
}

function openPlayer(show, seasonNumber, seasonData, epIdx, opts = {}) {
    const eps = (seasonData && seasonData.episodes) || [];
    const ep = eps[epIdx];
    if (!ep) return;
    if (playerOpen()) saveCurrentPosition();
    Object.assign(state.play, {
        show, seasonNumber, seasonData, epIdx,
        sources: episodeSources(ep), srcIdx: -1, kind: null, defaultSubPicked: false,
        next: null, prev: null, nextP: null, upNextDismissed: false, watchedMarked: false, creditsJumped: false,
        startAt: opts.startAt != null ? opts.startAt : null, extra: !!opts.extra, queue: opts.queue || null, logT: null,
    });
    const tok = ++state.play.token;
    if (!opts.extra) seasonMemo.set(show.id, seasonNumber);
    if (!playerOpen()) {
        state.play.returnFocus = document.activeElement;
        try { history.pushState({ lsPlayer: true }, '', location.href); state.play.pushed = true; } catch {}
    }
    stopMedia();
    const single = isMovie(show) || !!opts.extra;
    const queue = state.play.queue;
    const standalone = !!opts.extra || (isMovie(show) && !queue);
    $('pShowName').textContent = show.title;
    $('pEpName').textContent = single
        ? (ep.title && ep.title !== show.title ? ep.title : '')
        : `${epCode(seasonNumber, ep.number)} · ${ep.title || 'Episode ' + ep.number}`;
    $('srcWrap').hidden = allSources(ep).length < 2;
    $('prevEpBtn').hidden = standalone;
    $('nextEpBtn').hidden = standalone;
    updateEpNavButtons();
    playerEl.classList.add('is-open');
    document.body.classList.add('is-locked');
    heroHold('player', true);
    applySubStyle();
    updateMediaSession();

    if (!standalone) {
        state.play.nextP = findNeighbor(show, seasonNumber, seasonData, epIdx, 1, queue).catch(() => null);
        state.play.nextP.then(n => { if (tok === state.play.token) { state.play.next = n; updateEpNavButtons(); } });
        findNeighbor(show, seasonNumber, seasonData, epIdx, -1, queue).catch(() => null)
            .then(n => { if (tok === state.play.token) { state.play.prev = n; updateEpNavButtons(); } });
    } else {
        state.play.nextP = Promise.resolve(null);
    }

    requestAnimationFrame(() => { if (playerOpen()) playerEl.focus({ preventScroll: true }); });
    if (!state.play.sources.length && needsAltSources(ep)) {
        showPlayerMessage({
            icon: ICON.layers, title: 'Alternate source needed',
            text: 'This plays in a third-party player that may show pop-up ads. Turn on alternate sources to watch it.',
            actions: '<button class="btn btn-primary" type="button" data-alt-enable>Turn on alternate sources</button>',
        });
        return;
    }
    if (!state.play.sources.length) {
        showPlayerMessage({ title: 'Video unavailable', text: `This ${playNoun()} could not be loaded. Try again later or report it on Discord.`, actions: discordBtn() });
        return;
    }
    const first = state.play.sources.findIndex(s => s.type !== 'tab');
    if (first < 0) { showSourcePanel(`This ${playNoun()} opens in an external player:`); return; }
    startSource(first);
}
function updateEpNavButtons() {
    $('prevEpBtn').disabled = !state.play.prev;
    $('nextEpBtn').disabled = !state.play.next;
    setMediaAction('previoustrack', state.play.prev ? playPrev : null);
    setMediaAction('nexttrack', state.play.next ? playNext : null);
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
    if (src.type === 'iframe' && youtubeId(src.url)) {
        state.play.kind = 'youtube';
        playerEl.classList.add('is-yt');
        playerEl.classList.remove('hide-ui', 'is-casting');
        video.hidden = true;
        $('pLoader').classList.add('is-shown');
        sizeYtLayout();
        setupYouTube(src.url, ep, ltok);
    } else if (src.type === 'iframe') {
        playerEl.classList.add('is-embed');
        playerEl.classList.remove('hide-ui', 'is-casting');
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
    updateCastButton();
    resetCtrlTimer();
}

function bindPlayback(ep, ltok) {
    const { show, seasonNumber: sNum } = state.play;
    const live = () => ltok === state.play.loadTok;
    const existing = getProgress(show.id, sNum, ep.number);
    const startTime = state.play.startAt != null ? state.play.startAt : (isInProgress(existing) ? existing.t : 0);
    state.play.startAt = null;
    const meta = { title: ep.title, thumb: ep.thumbnail };
    const extra = state.play.extra;
    const saveProg = extra ? () => {} : (t, d) => setProgress(show.id, sNum, ep.number, t, d, meta);
    const logTime = (ct) => {
        const last = state.play.logT;
        state.play.logT = ct;
        if (!extra && last != null && ct > last && ct - last <= 12) logWatch(show.id, ct - last);
    };
    const introS = num(ep.introStart), introE = num(ep.introEnd);
    const recapS = num(ep.recapStart), recapE = num(ep.recapEnd);
    const creditsS = num(ep.creditsStart);

    attachSubtitles(ep, ltok);
    applyStoredVolume();
    video.playbackRate = state.playbackSpeed;
    updateSpeedLabel();

    state.play.tick = (ct, dur) => {
        if (ct > 0 && isFinite(dur) && Date.now() - state.lastProgSave > 3000) {
            state.lastProgSave = Date.now();
            saveProg(ct, dur);
            logTime(ct);
            if (!state.play.watchedMarked && ct / dur >= 0.95) {
                state.play.watchedMarked = true;
                queueUpNextMark();
                if (!extra) logFinished(show.id, sNum, ep.number);
            }
        }
        updateScrub(ct, dur);
        updateTime(ct, dur);
        updatePositionState(ct, dur);
        const sb = $('skipBtn');
        if (recapS != null && recapE != null && ct >= recapS && ct < recapE) {
            sb.textContent = 'Skip Recap'; state.currentSkipTarget = recapE; sb.classList.add('is-shown');
        } else if (introS != null && introE != null && ct >= introS && ct < introE) {
            sb.textContent = 'Skip Intro'; state.currentSkipTarget = introE; sb.classList.add('is-shown');
        } else { sb.classList.remove('is-shown'); state.currentSkipTarget = null; }
        const nx = state.play.next;
        if (!nx || !isFinite(dur) || dur <= 60) return;
        const credits = creditsS != null && creditsS > 0 && creditsS < dur - 5 ? creditsS : null;
        const showAt = credits != null ? credits : dur - 15;
        const autoAt = credits != null ? Math.min(credits + 10, dur) : dur;
        if (ct >= showAt && ct < dur && !state.play.upNextDismissed) {
            showUpNext(nx, autoAt - ct, false, autoAt - showAt);
            if (credits != null && ct >= autoAt && willAutoplay() && !state.play.creditsJumped) { state.play.creditsJumped = true; state.play.onEnded(); }
        } else if (ct < showAt) hideUpNext();
    };
    state.play.onEnded = () => {
        if (!live()) return;
        const dur = mediaDuration();
        if (isFinite(dur) && dur > 0) saveProg(dur, dur);
        queueUpNextMark();
        const tok = state.play.token;
        state.play.nextP.then(nx => {
            if (tok !== state.play.token) return;
            if (sleepAtEpisodeEnd()) return;
            if (!nx) { requestClosePlayer(); return; }
            if (willAutoplay() && !state.play.upNextDismissed) playNext();
            else { showUpNext(nx, 0, true); playerEl.classList.remove('hide-ui'); }
        });
    };
    return { startTime, live, introS, introE, recapS, recapE, creditsS };
}

function setupVideo(url, ep, ltok) {
    const { startTime, live, introS, introE, recapS, recapE, creditsS } = bindPlayback(ep, ltok);
    video.ontimeupdate = () => { if (!castActive() && state.play.tick) state.play.tick(video.currentTime, video.duration); };
    video.onended = () => { if (!castActive() && state.play.onEnded) state.play.onEnded(); };
    video.onplay = () => { updatePlayIcon(true); $('pLoader').classList.remove('is-shown'); resetCtrlTimer(); setPlaybackState('playing'); };
    video.onpause = () => {
        if (castActive()) return;
        updatePlayIcon(false); playerEl.classList.remove('hide-ui'); saveCurrentPosition(); setPlaybackState('paused');
    };
    video.onwaiting = () => { if (!castActive()) $('pLoader').classList.add('is-shown'); };
    video.onplaying = () => $('pLoader').classList.remove('is-shown');
    video.oncanplay = () => $('pLoader').classList.remove('is-shown');
    video.onprogress = updateBuffered;

    const onReady = () => {
        if (!live()) return;
        $('pLoader').classList.remove('is-shown');
        let resumed = false;
        const applyResume = () => {
            if (!live() || resumed || !isFinite(video.duration) || !video.duration) return;
            resumed = true;
            if (startTime > 0 && startTime < video.duration - 10) video.currentTime = startTime;
            addScrubMarkers(video.duration, introS, introE, recapS, recapE, creditsS);
        };
        applyResume();
        if (!resumed) {
            video.addEventListener('loadedmetadata', applyResume, { once: true });
            video.addEventListener('durationchange', applyResume, { once: true });
        }
        if (state.hls && state.hls.levels && state.hls.levels.length > 1) $('qualWrap').hidden = false;
        if (castConnected()) { castLoad(startTime); return; }
        const p = video.play();
        if (p && p.catch) p.catch(() => { if (live()) { updatePlayIcon(false); playerEl.classList.remove('hide-ui'); $('pLoader').classList.remove('is-shown'); } });
        video.playbackRate = state.playbackSpeed;
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


const hasMediaSession = 'mediaSession' in navigator;
function setMediaAction(action, fn) { if (hasMediaSession) { try { navigator.mediaSession.setActionHandler(action, fn); } catch {} } }
function setPlaybackState(s) { if (hasMediaSession) { try { navigator.mediaSession.playbackState = s; } catch {} } }
function updateMediaSession() {
    if (!hasMediaSession || !window.MediaMetadata) return;
    const { show, seasonNumber, extra } = state.play;
    const ep = curEp();
    if (!show || !ep) { navigator.mediaSession.metadata = null; return; }
    const art = (!stillHidden(show.id, seasonNumber, ep.number) && ep.thumbnail) || show.banner;
    const artwork = [];
    if (art) artwork.push({ src: IMG.card(art), sizes: '780x439' });
    if (show.poster) artwork.push({ src: IMG.poster(show.poster), sizes: '500x750' });
    try {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: extra ? ep.title : (isMovie(show) ? show.title : (ep.title || 'Episode ' + ep.number)),
            artist: extra ? show.title : (isMovie(show) ? BRAND : `${show.title} · ${epCode(seasonNumber, ep.number)}`),
            album: extra || isMovie(show) ? '' : seasonLabel(seasonNumber),
            artwork,
        });
    } catch {}
}
let lastPosState = 0;
function updatePositionState(ct, dur) {
    if (!hasMediaSession || !navigator.mediaSession.setPositionState || !isFinite(dur) || dur <= 0 || Date.now() - lastPosState < 1000) return;
    lastPosState = Date.now();
    try { navigator.mediaSession.setPositionState({ duration: dur, position: clamp(ct, 0, dur), playbackRate: castActive() ? 1 : (video.playbackRate || 1) }); } catch {}
}
setMediaAction('play', () => { if (playerOpen()) playMedia(); });
setMediaAction('pause', () => { if (playerOpen()) pauseMedia(); });
setMediaAction('seekbackward', (d) => { if (playerOpen()) seekBy(-((d && d.seekOffset) || 10)); });
setMediaAction('seekforward', (d) => { if (playerOpen()) seekBy((d && d.seekOffset) || 10); });
setMediaAction('seekto', (d) => { if (playerOpen() && d && d.seekTime != null) seekMedia(d.seekTime); });
setMediaAction('stop', () => { if (playerOpen()) requestClosePlayer(); });


const SLEEP_MINUTES = [15, 30, 45, 60, 90];
const sleep = { mode: null, at: 0, timer: null };
const willAutoplay = () => autoplayOn() && sleep.mode !== 'episode';
function setSleep(mode, minutes) {
    clearTimeout(sleep.timer);
    Object.assign(sleep, { mode, at: mode === 'time' ? Date.now() + minutes * 60000 : 0, timer: null });
    if (mode === 'time') sleep.timer = setTimeout(sleepNow, minutes * 60000);
    $('sleepBtn').classList.toggle('is-on', !!mode);
    const what = playNoun();
    toast(!mode ? 'Sleep timer off' : (mode === 'episode' ? `Playback will stop after this ${what}` : `Playback will stop in ${plural(minutes, 'minute')}`), { icon: ICON.moon });
}
function cancelSleep() {
    clearTimeout(sleep.timer);
    Object.assign(sleep, { mode: null, at: 0, timer: null });
    $('sleepBtn').classList.remove('is-on');
}
function sleepAtEpisodeEnd() {
    if (sleep.mode !== 'episode') return false;
    sleepNow();
    return true;
}
function sleepNow() {
    cancelSleep();
    if (!playerOpen()) return;
    fadeOutAndPause(() => {
        if (!playerOpen()) return;
        const d = showPlayerMessage({
            icon: ICON.moon, title: 'Sleep timer', text: 'Playback paused. Sleep well!',
            actions: `<button class="btn btn-primary" type="button" data-keep-watching>${ICON.play}<span>Keep watching</span></button>`,
        });
        d.querySelector('[data-keep-watching]').addEventListener('click', () => {
            d.remove();
            playerEl.classList.remove('has-msg');
            const dur = mediaDuration();
            if (isFinite(dur) && mediaTime() >= dur - 1 && state.play.next) playNext(); else playMedia();
        });
    });
}
function fadeOutAndPause(done) {
    if (castActive() || video.paused) { pauseMedia(); done(); return; }
    const start = video.volume, steps = 30;
    let i = 0;
    const iv = setInterval(() => {
        i++;
        video.volume = start * (1 - i / steps);
        if (i >= steps || video.paused) { clearInterval(iv); video.pause(); video.volume = start; done(); }
    }, 100);
}
function buildSleepMenu() {
    const p = $('sleepPopup');
    const what = playNoun();
    const left = sleep.mode === 'time' ? Math.max(1, Math.ceil((sleep.at - Date.now()) / 60000)) : 0;
    let h = '<div class="popup-label">Sleep timer</div>';
    if (sleep.mode) h += `<div class="popup-note">${sleep.mode === 'episode' ? `Stops at the end of this ${what}.` : `Stops in ${plural(left, 'minute')}.`}</div>`;
    h += `<button class="popup-item${!sleep.mode ? ' is-active' : ''}" type="button" data-sleep="off">Off</button>`;
    SLEEP_MINUTES.forEach(m => { h += `<button class="popup-item" type="button" data-sleep="${m}">${m < 60 ? m + ' minutes' : (m === 60 ? '1 hour' : m / 60 + ' hours')}</button>`; });
    h += `<button class="popup-item${sleep.mode === 'episode' ? ' is-active' : ''}" type="button" data-sleep="episode">End of this ${what}</button>`;
    p.innerHTML = h;
    $$('[data-sleep]', p).forEach(b => b.addEventListener('click', () => {
        const v = b.dataset.sleep;
        if (v === 'off') { cancelSleep(); toast('Sleep timer off', { icon: ICON.moon }); }
        else setSleep(v === 'episode' ? 'episode' : 'time', +v);
        closeAllPopups();
    }));
}


const castState = { ctx: null, player: null, ctl: null, loaded: false };
const castConnected = () => !!(castState.ctx && castState.ctx.getCurrentSession());
const castActive = () => castState.loaded && castConnected();
function initCast() {
    if (!window.chrome || /iPhone|iPad|iPod/i.test(navigator.userAgent) || tvActive) return;
    window.__onGCastApiAvailable = (ok) => {
        if (!ok || !window.cast || !window.cast.framework) return;
        const fw = window.cast.framework;
        const ctx = castState.ctx = fw.CastContext.getInstance();
        ctx.setOptions({ receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID, autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED });
        castState.player = new fw.RemotePlayer();
        const ctl = castState.ctl = new fw.RemotePlayerController(castState.player);
        const E = fw.RemotePlayerEventType;
        ctx.addEventListener(fw.CastContextEventType.CAST_STATE_CHANGED, updateCastButton);
        ctl.addEventListener(E.IS_CONNECTED_CHANGED, onCastConnection);
        ctl.addEventListener(E.CURRENT_TIME_CHANGED, () => {
            if (castActive() && state.play.tick) state.play.tick(castState.player.currentTime, castState.player.duration);
        });
        ctl.addEventListener(E.IS_PAUSED_CHANGED, () => {
            if (!castActive()) return;
            updatePlayIcon(!castState.player.isPaused);
            setPlaybackState(castState.player.isPaused ? 'paused' : 'playing');
            if (castState.player.isPaused) { playerEl.classList.remove('hide-ui'); saveCurrentPosition(); }
        });
        ctl.addEventListener(E.PLAYER_STATE_CHANGED, () => {
            if (!castActive()) return;
            const ps = castState.player.playerState;
            $('pLoader').classList.toggle('is-shown', ps === 'BUFFERING');
            const ms = ctx.getCurrentSession().getMediaSession();
            if (ps === 'IDLE' && ms && ms.idleReason === 'FINISHED' && state.play.onEnded) state.play.onEnded();
        });
        updateCastButton();
    };
    const s = document.createElement('script');
    s.src = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';
    s.async = true;
    document.head.appendChild(s);
}
function updateCastButton() {
    const st = castState.ctx ? castState.ctx.getCastState() : 'NO_DEVICES_AVAILABLE';
    const btn = $('castBtn');
    btn.hidden = st === 'NO_DEVICES_AVAILABLE' || state.play.kind === 'iframe' || state.play.kind === 'youtube';
    btn.classList.toggle('is-on', st === 'CONNECTED');
    btn.setAttribute('aria-label', st === 'CONNECTED' ? 'Casting. Choose to stop or switch device' : 'Cast to a TV');
}
function onCastConnection() {
    if (castState.player.isConnected) {
        if (playerOpen() && state.play.kind === 'direct') castLoad(video.currentTime);
    } else if (castState.loaded || playerEl.classList.contains('is-casting')) {
        const saved = castState.player.savedPlayerState;
        castState.loaded = false;
        playerEl.classList.remove('is-casting');
        if (playerOpen() && state.play.kind === 'direct') {
            if (saved && saved.currentTime) video.currentTime = saved.currentTime;
            if (state.hls) state.hls.startLoad(video.currentTime);
            video.play().catch(() => {});
        }
    }
    updateCastButton();
}
function castSubTrackId() {
    const ep = curEp();
    const t = state.play.subIdx >= 0 ? video.textTracks[state.play.subIdx] : null;
    if (!ep || !t) return null;
    const i = (ep.subtitles || []).filter(x => x && x.url && x.url.trim()).findIndex((x, j) => (x.label || x.lang || 'Track ' + (j + 1)) === t.label);
    return i >= 0 ? i + 1 : null;
}
function castLoad(startTime) {
    const session = castState.ctx && castState.ctx.getCurrentSession();
    const src = state.play.sources[state.play.srcIdx];
    const { show, seasonNumber, extra } = state.play;
    const ep = curEp();
    if (!session || !src || src.type !== 'direct' || !ep) return;
    const media = chrome.cast.media;
    const hls = /\.m3u8(\?|#|$)/i.test(src.url);
    const info = new media.MediaInfo(src.url, hls ? 'application/x-mpegurl' : 'video/mp4');
    info.streamType = media.StreamType.BUFFERED;
    if (hls) { info.hlsSegmentFormat = media.HlsSegmentFormat.TS; info.hlsVideoSegmentFormat = media.HlsVideoSegmentFormat.MPEG2_TS; }
    const md = extra || isMovie(show) ? new media.MovieMediaMetadata() : new media.TvShowMediaMetadata();
    md.title = extra ? ep.title : (isMovie(show) ? show.title : (ep.title || 'Episode ' + ep.number));
    if (extra) md.subtitle = show.title;
    else if (isMovie(show)) md.subtitle = BRAND;
    else { md.seriesTitle = show.title; md.season = seasonNumber; md.episode = ep.number; }
    const art = (!stillHidden(show.id, seasonNumber, ep.number) && ep.thumbnail) || show.banner;
    if (art) md.images = [new chrome.cast.Image(IMG.card(art))];
    info.metadata = md;
    info.tracks = (ep.subtitles || []).filter(t => t && t.url && t.url.trim()).map((t, i) => {
        const tr = new media.Track(i + 1, media.TrackType.TEXT);
        tr.trackContentId = new URL(t.url.trim(), location.href).href;
        tr.trackContentType = 'text/vtt';
        tr.subtype = media.TextTrackType.SUBTITLES;
        tr.name = t.label || t.lang || 'Track ' + (i + 1);
        tr.language = t.lang || 'en';
        return tr;
    });
    const req = new media.LoadRequest(info);
    req.currentTime = startTime || 0;
    req.autoplay = true;
    const sub = castSubTrackId();
    if (sub) req.activeTrackIds = [sub];
    castState.loaded = true;
    video.pause();
    if (state.hls) state.hls.stopLoad();
    playerEl.classList.add('is-casting');
    $('castLabel').textContent = `Playing on ${session.getCastDevice().friendlyName || 'your TV'}`;
    updatePlayIcon(true);
    session.loadMedia(req).catch(err => {
        console.warn('Cast load failed', err);
        castState.loaded = false;
        playerEl.classList.remove('is-casting');
        toast("Couldn't play this on the TV", { icon: ICON.alert });
        if (state.hls) state.hls.startLoad(video.currentTime);
        video.play().catch(() => {});
    });
}
function castSyncSubs() {
    const ms = castActive() && castState.ctx.getCurrentSession().getMediaSession();
    if (!ms) return;
    const id = castSubTrackId();
    try { ms.editTracksInfo(new chrome.cast.media.EditTracksInfoRequest(id ? [id] : []), () => {}, () => {}); } catch {}
}
$('castBtn').addEventListener('click', () => {
    if (castState.ctx) castState.ctx.requestSession().catch(() => {});
});

function queueUpNextMark() {
    const show = state.play.show;
    const p = state.play.nextP;
    if (!show || !p) return;
    p.then(nx => { if (nx) markUpNext((nx.show || show).id, nx.seasonNumber, nx.data.episodes[nx.idx]); });
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
        text: `This ${playNoun()} couldn't be loaded. Try again, or report it on Discord if it keeps happening.`,
        actions: `<button class="btn btn-primary" type="button" data-retry>${ICON.refresh}<span>Try again</span></button>` +
            (allSources(curEp()).length > state.play.sources.length ? '<button class="btn btn-glass" type="button" data-alt-enable>Try alternate sources</button>' : '') + discordBtn(),
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
    const hidden = allSources(curEp()).length - state.play.sources.length;
    if (hidden > 0) p.insertAdjacentHTML('beforeend', `<div class="popup-divider"></div><div class="popup-note">${plural(hidden, 'more source')} from third-party players, which may show pop-up ads.</div><button class="popup-item" type="button" data-alt-enable>Turn on alternate sources</button>`);
}


const RING_LEN = 2 * Math.PI * 16;
function showUpNext(nx, remain, ended, span = 15) {
    const el = $('upNext');
    const ep = nx.data.episodes[nx.idx];
    const nshow = nx.show || state.play.show;
    const key = nshow.id + ':' + nx.seasonNumber + ':' + nx.idx;
    if (el.dataset.key !== key) {
        el.dataset.key = key;
        const art = (!stillHidden(nshow.id, nx.seasonNumber, ep.number) && ep.thumbnail) || nshow.banner;
        $('upNextThumb').src = art ? IMG.thumb(art) : 'data:,';
        $('upNextName').textContent = isMovie(nshow) ? nshow.title
            : `${nshow.id !== state.play.show.id ? nshow.title + ' · ' : ''}${epCode(nx.seasonNumber, ep.number)} · ${ep.title || 'Episode ' + ep.number}`;
        el.setAttribute('aria-label', `Play next episode: ${ep.title || 'Episode ' + ep.number}`);
    }
    const auto = willAutoplay() && !ended;
    $('upNextLabel').textContent = auto ? `Next episode in ${Math.max(1, Math.ceil(remain))}s` : 'Next episode';
    $('upNextRing').style.strokeDasharray = RING_LEN.toFixed(2);
    $('upNextRing').style.strokeDashoffset = auto ? (RING_LEN * clamp(remain / span, 0, 1)).toFixed(2) : '0';
    el.classList.toggle('is-auto', auto);
    el.classList.add('is-shown');
}
function hideUpNext() {
    const el = $('upNext');
    el.classList.remove('is-shown');
}


const getSubStyle = () => { const s = readJSON('lsSubStyle', null); return s && typeof s === 'object' ? s : { size: 'md', bg: 'solid' }; };
function applySubStyle() {
    const st = getSubStyle();
    const size = SUB_SIZES.find(s => s.id === st.size) || SUB_SIZES[1];
    playerEl.style.setProperty('--sub-scale', size.scale);
    playerEl.classList.remove('sub-bg-solid', 'sub-bg-soft', 'sub-bg-none');
    playerEl.classList.add('sub-bg-' + (SUB_BGS.some(b => b.id === st.bg) ? st.bg : 'solid'));
    playerEl.style.setProperty('--sub-color', (SUB_COLORS.find(c => c.id === st.color) || SUB_COLORS[0]).color);
    ytApplyCaptionSize();
    playerEl.classList.toggle('sub-pos-top', st.pos === 'top');
}
function shiftTrackCues(track) {
    const cues = track && track.cues;
    if (!cues) return;
    const d = state.play.subDelay || 0;
    for (let i = 0; i < cues.length; i++) {
        const c = cues[i];
        if (c._s == null) { c._s = c.startTime; c._e = c.endTime; }
        c.startTime = Math.max(0, c._s + d);
        c.endTime = Math.max(0, c._e + d);
    }
}
function setSubDelay(d) {
    state.play.subDelay = Math.round(clamp(d, -30, 30) * 100) / 100;
    for (let i = 0; i < video.textTracks.length; i++) shiftTrackCues(video.textTracks[i]);
    renderActiveCues();
}
const fmtSubDelay = (d) => (!d ? 'In sync' : `${+Math.abs(d).toFixed(2)}s ${d > 0 ? 'later' : 'earlier'}`);
function parseSubTime(s) {
    const m = String(s).trim().match(/^(?:(\d+):)?(\d{1,2}):(\d{1,2})(?:[.,](\d{1,3}))?$/);
    return m ? (+m[1] || 0) * 3600 + +m[2] * 60 + +m[3] + (m[4] ? +('0.' + m[4]) : 0) : NaN;
}
function parseSubtitles(text) {
    const cues = [];
    String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split(/\n[ \t]*\n/).forEach(block => {
        const lines = block.split('\n');
        const ti = lines.findIndex(l => l.includes('-->'));
        if (ti < 0 || /^(NOTE|STYLE|REGION)\b/.test(lines[0])) return;
        const [a, b] = lines[ti].split('-->');
        const s = parseSubTime(a), e = parseSubTime(String(b).trim().split(/\s+/)[0]);
        const t = lines.slice(ti + 1).join('\n').trim();
        if (isFinite(s) && isFinite(e) && e > s && t) cues.push({ s, e, t });
    });
    return cues.sort((x, y) => x.s - y.s);
}
function shiftSubtitles(cues, offset) {
    const first = cues.length ? cues[0].s : 0;
    const shift = (first >= 3600 ? -Math.floor(first / 3600) * 3600 : 0) + (num(offset) || 0);
    if (!shift) return cues;
    return cues.map(c => ({ s: Math.max(0, c.s + shift), e: c.e + shift, t: c.t })).filter(c => c.e > c.s);
}
const toVtt = (cues) => 'WEBVTT\n\n' + cues.map(c => `${fmtVTT(c.s)} --> ${fmtVTT(c.e)}\n${c.t.replace(/-->/g, '->')}`).join('\n\n') + '\n';
function addSubTrack(cues, label, lang) {
    const t = document.createElement('track');
    t.kind = 'subtitles';
    t.label = label;
    t.srclang = lang || '';
    const burl = URL.createObjectURL(new Blob([toVtt(cues)], { type: 'text/vtt' }));
    video._objectUrls.push(burl);
    t.src = burl;
    t.addEventListener('load', () => { if (state.play.subDelay) shiftTrackCues(t.track); });
    video.appendChild(t);
    try { t.track.mode = 'hidden'; } catch {}
    return t;
}
function attachSubtitles(ep, ltok) {
    const subs = (Array.isArray(ep.subtitles) ? ep.subtitles : []).filter(t => t && t.url && t.url.trim());
    subs.forEach((trk, i) => {
        fetchText(trk.url.trim()).then(text => {
            if (ltok !== state.play.loadTok || !playerOpen()) return;
            const cues = shiftSubtitles(parseSubtitles(text), trk.offset);
            if (!cues.length) { console.warn('Subtitle file has no cues', trk.url); return; }
            const t = addSubTrack(cues, trk.label || trk.lang || ('Track ' + (i + 1)), trk.lang);
            const wantDefault = trk.default || trk.lang === 'en';
            if (wantDefault && !state.play.defaultSubPicked && subsEnabled()) {
                state.play.defaultSubPicked = true;
                setTimeout(() => { if (ltok === state.play.loadTok) setActiveSubTrack(trackIndexOf(t.track)); }, 150);
            }
        }).catch(err => console.warn('Subtitles failed to load (the host may block cross-origin requests)', trk.url, err));
    });
}
$('subFileInput').addEventListener('change', (e) => {
    const input = e.target;
    const file = input.files && input.files[0];
    input.value = '';
    if (!file || !playerOpen()) return;
    const ltok = state.play.loadTok;
    file.text().then(text => {
        if (ltok !== state.play.loadTok) return;
        const cues = shiftSubtitles(parseSubtitles(text));
        if (!cues.length) { toast("That file doesn't contain any subtitles", { icon: ICON.alert }); return; }
        const t = addSubTrack(cues, file.name.replace(/\.[^.]+$/, '').slice(0, 40) || 'Subtitles', '');
        setTimeout(() => { if (ltok === state.play.loadTok) setActiveSubTrack(trackIndexOf(t.track)); }, 150);
        toast('Subtitles loaded');
    }).catch(() => toast("Couldn't read that file", { icon: ICON.alert }));
});
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
        if (yt.cc) ytSetCaptions(null);
        state.play.lastSubIdx = state.play.subIdx;
        lsSet('lsSubsOn', '1');
        const t = video.textTracks[state.play.subIdx];
        state.play.cueTrack = t;
        t.addEventListener('cuechange', renderActiveCues);
        renderActiveCues();
    }
    updateCCBtn();
    syncSwitches();
    castSyncSubs();
}
const CUE_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00A0', lrm: '\u200E', rlm: '\u200F' };
function cueToHtml(text) {
    let s = String(text || '').replace(/\{\\[^}]*\}/g, '').replace(/<([ibu])\.[^>]*>/gi, '<$1>').replace(/<(?!\/?[ibu]>)[^>]*>/gi, '')
        .replace(/&(amp|lt|gt|quot|apos|nbsp|lrm|rlm);/g, (_, n) => CUE_ENTITIES[n]);
    s = esc(s).replace(/&lt;(\/?)(i|b|u)&gt;/gi, '<$1$2>');
    return s.split('\n').map(l => l.trim()).filter(Boolean).map(l => `<span class="sub-line">${l}</span>`).join('');
}
function renderActiveCues() {
    const overlay = $('subOverlay');
    const t = state.play.cueTrack;
    if (!t || !hasCustomControls()) { overlay.innerHTML = ''; return; }
    let html = '';
    if (state.play.kind === 'youtube') {
        const now = mediaTime();
        for (let i = 0; t.cues && i < t.cues.length; i++) if (t.cues[i].startTime <= now && t.cues[i].endTime > now) html += cueToHtml(t.cues[i].text);
        if (overlay.dataset.html === html) return;
        overlay.dataset.html = html;
    } else if (t.activeCues) for (let i = 0; i < t.activeCues.length; i++) html += cueToHtml(t.activeCues[i].text);
    overlay.innerHTML = html;
}
function updateCCBtn() {
    const on = state.play.subIdx >= 0 || !!yt.cc;
    $('ccBtn').classList.toggle('is-on', on);
    $('ccBtn').setAttribute('aria-pressed', on);
}
function turnSubsOff() {
    if (yt.cc) ytSetCaptions(null);
    setActiveSubTrack(-1);
    lsSet('lsSubsOn', '0');
    syncSwitches();
}
function toggleSubtitles() {
    if (state.play.subIdx >= 0 || yt.cc) { turnSubsOff(); return; }
    let idx = state.play.lastSubIdx;
    if (idx < 0 || !video.textTracks[idx]) idx = video.textTracks.length ? 0 : -1;
    if (idx < 0 && state.play.kind === 'youtube') { ytReadTracks(); if (yt.tracks.length) { ytSetCaptions(ytPickTrack().languageCode); return; } }
    if (idx < 0) { toast('No subtitles for this episode', { icon: ICON.alert }); return; }
    setActiveSubTrack(idx);
}
function buildSubMenu() {
    const tracks = video.textTracks;
    let h = '<div class="popup-label">Subtitles</div>';
    h += `<button class="popup-item${state.play.subIdx < 0 && !yt.cc ? ' is-active' : ''}" type="button" data-sub="off">Off</button>`;
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
    if (state.play.kind === 'youtube') {
        ytReadTracks();
        yt.tracks.forEach(t => { h += `<button class="popup-item${yt.cc === t.languageCode ? ' is-active' : ''}" type="button" data-yt-cc="${esc(t.languageCode)}"><span>${esc(t.displayName || t.languageName || t.languageCode)}</span><span class="tag">YOUTUBE</span></button>`; });
    }
    if (!tracks.length && !yt.tracks.length) h += '<div class="popup-note">No subtitles for this episode.</div>';
    if (hasCustomControls()) h += '<button class="popup-item" type="button" data-sub-file><span>Load from file…</span><span class="tag">VTT / SRT</span></button>';
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
    h += '<div class="popup-label">Colour</div><div class="popup-seg">' +
        SUB_COLORS.map(c => `<button type="button" class="sub-color${(st.color || 'white') === c.id ? ' is-active' : ''}" data-sub-color="${c.id}" style="--c:${c.color}" aria-label="${c.label}" title="${c.label}"><span></span></button>`).join('') + '</div>';
    h += '<div class="popup-label">Position</div><div class="popup-seg">' +
        SUB_POSITIONS.map(o => `<button type="button" class="${(st.pos || 'bottom') === o.id ? 'is-active' : ''}" data-sub-pos="${o.id}">${o.label}</button>`).join('') + '</div>';
    if (tracks.length) {
        const d = state.play.subDelay || 0;
        h += `<div class="popup-label">Timing</div><div class="popup-seg sub-sync">
            <button type="button" data-sub-delay="${-SUB_DELAY_STEP}" aria-label="Show subtitles earlier" title="Earlier">&minus;</button>
            <span class="sub-sync-val" id="subSyncVal" aria-live="polite">${fmtSubDelay(d)}</span>
            <button type="button" data-sub-delay="${SUB_DELAY_STEP}" aria-label="Show subtitles later" title="Later">+</button>
            <button type="button" data-sub-delay="reset" id="subSyncReset"${d ? '' : ' disabled'}>Reset</button>
        </div>`;
    }
    const p = $('subPopup');
    p.innerHTML = h;
    const rebuild = () => { const top = p.scrollTop; buildSubMenu(); p.scrollTop = top; };
    const saveStyle = (k, v) => { const st2 = getSubStyle(); st2[k] = v; writeJSON('lsSubStyle', st2); applySubStyle(); rebuild(); };
    $$('[data-sub-color]', p).forEach(b => b.addEventListener('click', () => saveStyle('color', b.dataset.subColor)));
    $$('[data-sub-pos]', p).forEach(b => b.addEventListener('click', () => saveStyle('pos', b.dataset.subPos)));
    $$('[data-sub-delay]', p).forEach(b => b.addEventListener('click', () => {
        const v = b.dataset.subDelay;
        setSubDelay(v === 'reset' ? 0 : (state.play.subDelay || 0) + parseFloat(v));
        $('subSyncVal').textContent = fmtSubDelay(state.play.subDelay);
        $('subSyncReset').disabled = !state.play.subDelay;
    }));
    $$('[data-sub]', p).forEach(b => b.addEventListener('click', () => {
        if (b.dataset.sub === 'off') turnSubsOff();
        else setActiveSubTrack(parseInt(b.dataset.sub, 10));
        closeAllPopups();
    }));
    const fileBtn = p.querySelector('[data-sub-file]');
    if (fileBtn) fileBtn.addEventListener('click', () => { closeAllPopups(); $('subFileInput').click(); });
    $$('[data-ai]', p).forEach(b => b.addEventListener('click', () => setAISub(b.dataset.ai, b.dataset.aiLabel)));
    $$('[data-yt-cc]', p).forEach(b => b.addEventListener('click', () => { setActiveSubTrack(-1); ytSetCaptions(b.dataset.ytCc); closeAllPopups(); }));
    $$('[data-sub-size]', p).forEach(b => b.addEventListener('click', () => {
        const st2 = getSubStyle(); st2.size = b.dataset.subSize; writeJSON('lsSubStyle', st2);
        applySubStyle(); rebuild();
    }));
    $$('[data-sub-bg]', p).forEach(b => b.addEventListener('click', () => {
        const st2 = getSubStyle(); st2.bg = b.dataset.subBg; writeJSON('lsSubStyle', st2);
        applySubStyle(); rebuild();
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
    for (let i = 0; i < src.cues.length; i++) {
        const c = src.cues[i];
        cues.push({ s: c._s != null ? c._s : c.startTime, e: c._e != null ? c._e : c.endTime, t: c.text });
    }
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
        const nt = addSubTrack(cues.map((c, i) => ({ s: c.s, e: c.e, t: translated[i] || c.t })), full, code);
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


function flashCenter(playing) {
    const f = $('pFlash');
    f.innerHTML = playing ? ICON.play : ICON.pause;
    f.classList.remove('is-shown'); void f.offsetWidth; f.classList.add('is-shown');
}
function togglePlay() {
    if (!hasCustomControls() || playerEl.classList.contains('has-msg')) return;
    if (mediaPaused()) { playMedia(); flashCenter(true); }
    else { pauseMedia(); flashCenter(false); }
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
    if (castActive()) { castState.player.volumeLevel = clamp(v, 0, 1); castState.ctl.setVolumeLevel(); }
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
function addScrubMarkers(dur, iS, iE, rS, rE, cS) {
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
    add(cS, cS != null ? dur : null);
}
function seekBy(delta) {
    if (!hasCustomControls() || !isFinite(mediaDuration())) return;
    seekMedia(mediaTime() + delta);
    flashSeek(delta < 0 ? 'left' : 'right');
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
    openPlayer(nb.show || state.play.show, nb.seasonNumber, nb.data, nb.idx, { queue: nb.queue || state.play.queue });
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
    if (castActive()) { try { castState.ctl.stop(); } catch {} }
    playerEl.classList.remove('is-casting');
    cancelSleep();
    if (hasMediaSession) { navigator.mediaSession.metadata = null; setPlaybackState('none'); }
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
    if (state.route.name === 'home') renderContinueRow();
    else if (['details', 'episode', 'collection', 'recap'].includes(state.route.name)) route({ keepScroll: true });
    if (rf && rf.isConnected) { try { rf.focus({ preventScroll: true }); } catch {} }
}


const POPUPS = ['speedPopup', 'qualPopup', 'subPopup', 'dlPopup', 'srcPopup', 'sleepPopup', 'morePopup'];
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
    if (id === 'sleepPopup') buildSleepMenu();
    if (id === 'morePopup') buildMoreMenu();
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
document.addEventListener('click', (e) => { if (e.target.isConnected && !e.target.closest('[data-popup]') && !e.target.closest('.popup')) closeAllPopups(); });

function buildMoreMenu() {
    const src = state.play.sources[state.play.srcIdx];
    const items = [['speedPopup', 'Playback speed', state.playbackSpeed === 1 ? 'Normal' : state.playbackSpeed + '×']];
    if (!$('qualWrap').hidden) items.push(['qualPopup', 'Quality', '']);
    items.push(['sleepPopup', 'Sleep timer', sleep.mode ? (sleep.mode === 'episode' ? 'End of ' + playNoun() : 'On') : 'Off']);
    if (src && src.type === 'direct') items.push(['dlPopup', 'Download', '']);
    if (!$('pipBtn').hidden) items.push(['pip', 'Picture in picture', '']);
    const p = $('morePopup');
    p.innerHTML = '<div class="popup-label">More</div>' + items.map(([id, label, val]) =>
        `<button class="popup-item" type="button" data-more="${id}"><span>${esc(label)}</span>${val ? `<span class="tag">${esc(val)}</span>` : ''}</button>`).join('');
    $$('[data-more]', p).forEach(b => b.addEventListener('click', () => {
        if (b.dataset.more === 'pip') { closeAllPopups(); togglePiP(); return; }
        togglePopup(b.dataset.more);
    }));
}
function updateSpeedLabel() { $('speedLabel').textContent = state.playbackSpeed === 1 ? '1×' : state.playbackSpeed + '×'; }
function buildSpeedMenu() {
    $('speedPopup').innerHTML = '<div class="popup-label">Playback speed</div>' + SPEEDS.map(s =>
        `<button class="popup-item${s === state.playbackSpeed ? ' is-active' : ''}" type="button" data-speed="${s}">${s === 1 ? 'Normal' : s + '×'}</button>`).join('');
    $$('#speedPopup [data-speed]').forEach(b => b.addEventListener('click', () => {
        state.playbackSpeed = parseFloat(b.dataset.speed);
        lsSet('lsSpeed', state.playbackSpeed);
        video.playbackRate = state.playbackSpeed;
        syncYtAudio();
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
    const { show, seasonNumber, extra } = state.play;
    const ep = curEp();
    const name = extra ? `${show.title} - ${ep.title}` : isMovie(show)
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
        h += `<button class="popup-item" type="button" data-dl="1"><span>This ${playNoun()}</span><span class="tag">${esc(ext)}</span></button>`;
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
        const init = await fetchBuf(new URL(initMatch[1], mediaUrl).href);
        saveBlob(new Blob([init, ...parts], { type: 'video/mp4' }), name + '.mp4');
        return true;
    }
    setDlProgress('Converting to MP4…', 92);
    let blob = null;
    try {
        await loadScript(MUX_JS_URL, () => !!(window.muxjs && window.muxjs.mp4 && window.muxjs.mp4.Transmuxer));
        await new Promise(r => setTimeout(r, 50));
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
    setTimeout(() => URL.revokeObjectURL(url), 60000);
}


$('playBtn').addEventListener('click', togglePlay);
$('prevEpBtn').addEventListener('click', playPrev);
$('nextEpBtn').addEventListener('click', playNext);
$('muteBtn').addEventListener('click', toggleMute);
$('fsBtn').addEventListener('click', toggleFS);
$('pipBtn').addEventListener('click', togglePiP);
$('playerBackBtn').addEventListener('click', requestClosePlayer);
$('skipBtn').addEventListener('click', () => { if (state.currentSkipTarget != null) seekMedia(state.currentSkipTarget); });
$('pShareBtn').addEventListener('click', () => {
    const { show, seasonNumber, extra } = state.play;
    const ep = curEp();
    if (!show || !ep) return;
    if (extra) { openShare({ title: ep.title, sub: show.title, image: ep.thumbnail || show.banner, path: sharePath(show.id) }); return; }
    const t = hasCustomControls() ? mediaTime() : null;
    openShare({
        title: isMovie(show) ? show.title : (ep.title || 'Episode ' + ep.number),
        sub: isMovie(show) ? kindLabel(show) : `${show.title} · ${epCode(seasonNumber, ep.number)}`,
        image: (!stillHidden(show.id, seasonNumber, ep.number) && ep.thumbnail) || show.banner,
        path: sharePath(show.id, seasonNumber, ep.number), time: t, timeDefault: true,
    });
});
$('upNext').addEventListener('click', (e) => { if (!e.target.closest('#upNextDismiss')) playNext(); });
$('upNext').addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target === $('upNext')) { e.preventDefault(); playNext(); } });
$('upNextDismiss').addEventListener('click', (e) => { e.stopPropagation(); state.play.upNextDismissed = true; hideUpNext(); });
$('airplayBtn').addEventListener('click', () => { if (video.webkitShowPlaybackTargetPicker) video.webkitShowPlaybackTargetPicker(); });
$('volSlider').addEventListener('input', (e) => setVolume(parseFloat(e.target.value)));
video.addEventListener('enterpictureinpicture', () => $('pipBtn').classList.add('is-on'));
video.addEventListener('leavepictureinpicture', () => $('pipBtn').classList.remove('is-on'));

(() => {
    const wrap = $('progressWrap'), tip = $('pTip');
    let dragging = false;
    const pctAt = (x) => { const r = wrap.getBoundingClientRect(); return clamp((x - r.left) / r.width, 0, 1); };
    const showTip = (x) => {
        if (!isFinite(mediaDuration())) { tip.classList.remove('is-shown'); return; }
        const pct = pctAt(x);
        tip.textContent = fmtClock(pct * mediaDuration());
        const r = wrap.getBoundingClientRect();
        const half = tip.offsetWidth / 2;
        tip.style.left = clamp(pct * r.width, half, r.width - half) + 'px';
        tip.classList.add('is-shown');
    };
    const seekTo = (x) => seekMedia(pctAt(x) * mediaDuration());
    wrap.addEventListener('pointerdown', (e) => {
        if (!hasCustomControls()) return;
        dragging = true;
        wrap.classList.add('is-dragging');
        try { wrap.setPointerCapture(e.pointerId); } catch {}
        seekTo(e.clientX); showTip(e.clientX);
        resetCtrlTimer();
    });
    wrap.addEventListener('pointermove', (e) => {
        if (!hasCustomControls()) return;
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
        if (state.play.kind !== 'direct' || !isFinite(mediaDuration())) return;
        seekBy(x < w / 2 ? -10 : 10);
        lastTapTime = 0;
        resetCtrlTimer();
    } else {
        lastTapTime = now; lastTapX = x;
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
    const direct = hasCustomControls();
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
    if ((e.key === '[' || e.key === ']') && video.textTracks.length) {
        e.preventDefault();
        setSubDelay((state.play.subDelay || 0) + (e.key === ']' ? SUB_DELAY_STEP : -SUB_DELAY_STEP));
        toast(`Subtitles: ${fmtSubDelay(state.play.subDelay)}`, { icon: ICON.clock, duration: 1400 });
        return;
    }
    if (/^[0-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey && isFinite(mediaDuration())) {
        e.preventDefault();
        seekMedia(mediaDuration() * (+e.key / 10));
    }
}


const MODALS = ['profileModal', 'settingsModal', 'shortcutsModal', 'shareModal', 'sourcesModal'];
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
    if (id === 'sourcesModal' && lsGet('lsAltSources') == null) lsSet('lsAltSources', '0');
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
    const entries = parseProgEntries().filter(en => en.p.t > 0 || en.p.w);
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
    const streak = streakInfo();
    $('statGrid').innerHTML = `
        <div class="stat"><div class="stat-val">${entries.length}</div><div class="stat-label">Episodes started</div></div>
        <div class="stat"><div class="stat-val">${completed}</div><div class="stat-label">Episodes finished</div></div>
        <div class="stat"><div class="stat-val">${hours >= 10 ? Math.round(hours) : hours.toFixed(1)}h</div><div class="stat-label">Time watched</div></div>
        <div class="stat"><div class="stat-val">${getMyList().length}</div><div class="stat-label">In My List</div></div>
        <div class="stat stat-half"><div class="stat-val">${streak.current}</div><div class="stat-label">Day streak</div></div>
        <div class="stat stat-half"><div class="stat-val">${streak.best}</div><div class="stat-label">Best streak</div></div>
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
    watchLog = {};
    writeJSON(LOG_KEY, watchLog);
    renderStats();
    if (state.route.name === 'home') renderContinueRow();
    toast('Watch history cleared');
});
$('profileBtn').addEventListener('click', () => openModal('profileModal'));


const BACKUP_KEYS = ['lsAutoplay', 'lsSubsOn', 'lsAltSources', 'lsHideStills', 'lsHideDesc', 'lsAppearance', 'lsTheme', 'lsTvMode', 'lsSpeed', 'lsVolume', 'lsMuted'];
function makeBackup() {
    const settings = {};
    BACKUP_KEYS.forEach(k => { const v = lsGet(k); if (v != null) settings[k] = v; });
    return { app: BRAND, v: 1, at: new Date().toISOString(), profile, myList: getMyList(), progress: progressMap, watchLog, subStyle: getSubStyle(), settings };
}
function applyBackup(data) {
    if (!data || typeof data !== 'object' || data.app !== BRAND) throw userErr(`That isn't a ${BRAND} backup.`);
    const list = getMyList();
    let titles = 0, episodes = 0;
    (Array.isArray(data.myList) ? data.myList : []).forEach(id => { if (typeof id === 'string' && !list.includes(id)) { list.push(id); titles++; } });
    writeJSON('myList', list);
    Object.entries(data.progress && typeof data.progress === 'object' ? data.progress : {}).forEach(([k, p]) => {
        if (!p || typeof p !== 'object' || typeof p.t !== 'number' || k.split('|').length !== 3) return;
        const cur = progressMap[k];
        if (!cur || (p.u || 0) > (cur.u || 0)) { progressMap[k] = p; episodes++; }
    });
    saveProgress();
    Object.entries(data.watchLog && typeof data.watchLog === 'object' ? data.watchLog : {}).forEach(([k, d]) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(k) && d && typeof d.s === 'number' && (!watchLog[k] || d.s > watchLog[k].s)) watchLog[k] = d;
    });
    writeJSON(LOG_KEY, watchLog);
    const bp = data.profile && typeof data.profile === 'object' ? data.profile : {};
    if (!profile.name && bp.name) profile.name = String(bp.name).slice(0, 20);
    if (!profile.avatar && bp.avatar) profile.avatar = String(bp.avatar);
    saveProfile();
    if (data.subStyle && typeof data.subStyle === 'object') writeJSON('lsSubStyle', data.subStyle);
    Object.entries(data.settings && typeof data.settings === 'object' ? data.settings : {})
        .forEach(([k, v]) => { if (BACKUP_KEYS.includes(k) && typeof v === 'string') lsSet(k, v); });
    state.playbackSpeed = parseFloat(lsGet('lsSpeed', '1')) || 1;
    initThemeUI();
    refreshAvatarUI();
    prepareProfile();
    if (state.route.name === 'home') { renderContinueRow(); renderMyListRow(); }
    else if (state.route.name === 'my-list') renderMyListGrid();
    else refreshEpisodeViews();
    toast(`Imported ${plural(titles, 'title')} and progress for ${plural(episodes, 'episode')}`);
}
async function encodeTransferCode(obj) {
    let bytes = new TextEncoder().encode(JSON.stringify(obj)), prefix = 'LS0.';
    if (window.CompressionStream) {
        bytes = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer());
        prefix = 'LS1.';
    }
    let bin = '';
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return prefix + btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function decodeTransferCode(code) {
    const m = String(code || '').replace(/\s+/g, '').match(/^LS([01])\.([A-Za-z0-9_-]+)$/);
    if (!m) throw userErr("That code doesn't look right. Copy the whole code and try again.");
    let bytes;
    try { bytes = Uint8Array.from(atob(m[2].replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)); }
    catch { throw userErr("That code doesn't look right. Copy the whole code and try again."); }
    if (m[1] === '1') {
        if (!window.DecompressionStream) throw userErr("This browser can't read transfer codes. Use a backup file instead.");
        bytes = new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
    }
    return JSON.parse(new TextDecoder().decode(bytes));
}
function confirmImport(data) {
    const titles = Array.isArray(data && data.myList) ? data.myList.length : 0;
    const eps = data && data.progress && typeof data.progress === 'object' ? Object.keys(data.progress).length : 0;
    return window.confirm(`Import ${plural(titles, 'saved title')} and ${plural(eps, 'watch record')}? They'll be merged with what's already on this device, and your settings will be replaced.`);
}
$('exportFileBtn').addEventListener('click', () => {
    saveBlob(new Blob([JSON.stringify(makeBackup(), null, 2)], { type: 'application/json' }), `${BRAND}-backup-${new Date().toISOString().slice(0, 10)}.json`);
    toast('Backup downloaded', { icon: ICON.download });
});
$('importFileBtn').addEventListener('click', () => $('importFileInput').click());
$('importFileInput').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
        const data = JSON.parse(await file.text());
        if (data && data.app === BRAND && !confirmImport(data)) return;
        applyBackup(data);
    } catch (err) { toast(err && err.userMessage ? err.userMessage : "Couldn't read that backup file", { icon: ICON.alert }); }
});
$('copyCodeBtn').addEventListener('click', async () => {
    try {
        const code = await encodeTransferCode(makeBackup());
        await navigator.clipboard.writeText(code);
        toast('Transfer code copied. Paste it into "Enter a code" on your other device.', { duration: 5000 });
    } catch { toast("Couldn't copy the code. Use a backup file instead.", { icon: ICON.alert }); }
});
$('pasteCodeBtn').addEventListener('click', () => {
    const box = $('codeBox');
    box.hidden = !box.hidden;
    $('pasteCodeBtn').setAttribute('aria-expanded', String(!box.hidden));
    if (!box.hidden) $('codeInput').focus();
});
$('codeApplyBtn').addEventListener('click', async () => {
    try {
        const data = await decodeTransferCode($('codeInput').value);
        if (data && data.app === BRAND && !confirmImport(data)) return;
        applyBackup(data);
        $('codeInput').value = '';
        $('codeBox').hidden = true;
        $('pasteCodeBtn').setAttribute('aria-expanded', 'false');
    } catch (err) { toast(err && err.userMessage ? err.userMessage : "Couldn't read that code", { icon: ICON.alert }); }
});


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
$$('#stillsSeg .seg-btn').forEach(b => b.addEventListener('click', () => { lsSet('lsHideStills', b.dataset.stills); syncSwitches(); refreshEpisodeViews(); }));
$('altSwitch').addEventListener('click', () => setAltSources(!altSourcesOn()));
function openAltPrompt() { closeAllPopups(); openModal('sourcesModal'); }
function setAltSources(on) {
    lsSet('lsAltSources', on ? '1' : '0');
    syncSwitches();
    if (playerOpen() && state.play.show && curEp()) openPlayer(state.play.show, state.play.seasonNumber, state.play.seasonData, state.play.epIdx, { extra: state.play.extra, queue: state.play.queue });
    else refreshEpisodeViews();
}
$('altAcceptBtn').addEventListener('click', () => { closeModal('sourcesModal'); setAltSources(true); toast('Alternate sources turned on'); });
$('altDeclineBtn').addEventListener('click', () => { closeModal('sourcesModal'); setAltSources(false); });
$('descSwitch').addEventListener('click', () => { lsSet('lsHideDesc', lsGet('lsHideDesc') === '1' ? '0' : '1'); syncSwitches(); refreshEpisodeViews(); });
function refreshEpisodeViews() {
    const r = state.route;
    if (r.name === 'home') renderContinueRow();
    else if (r.name === 'details' && state.detail.tab === 'episodes') renderEpisodesTab();
    else if (r.name === 'episode') renderEpisodePage(r.id, r.s, r.e);
    else if (r.name === 'person') renderPersonPage(r.person);
    else if (r.name === 'search' && $('searchInput')) $('searchInput').dispatchEvent(new Event('input'));
}


document.addEventListener('click', (e) => {
    const listBtn = e.target.closest('[data-toggle-list]');
    if (listBtn) { e.preventDefault(); e.stopPropagation(); toggleMyList(listBtn.dataset.toggleList); return; }
    if (e.target.closest('[data-alt-enable]')) { e.preventDefault(); openAltPrompt(); return; }
    const playShow = e.target.closest('[data-play-show]');
    if (playShow) { const show = getShow(playShow.dataset.playShow); if (show) smartPlayShow(show); return; }
    const extra = e.target.closest('[data-extra]');
    if (extra) { playExtra(state.detail.show, +extra.dataset.extra); return; }
    const colRow = e.target.closest('[data-col-play]');
    if (colRow) { const [sec, idx] = colRow.dataset.colPlay.split(':').map(Number); playCollectionEntry(sec, idx); return; }
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
    if (playerOpen() && !topModal()) { onPlayerKey(e); return; }
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


initThemeUI();
refreshAvatarUI();
updateTopbar();
initCast();

function boot() {
    Promise.all([
        fetch('data/show.json' + cacheBust).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }),
        fetch('data/hero.json' + cacheBust).then(r => (r.ok ? r.json() : { featured: [] })).catch(() => ({ featured: [] })),
        fetch('data/collections.json' + cacheBust).then(r => (r.ok ? r.json() : { collections: [] })).catch(() => ({ collections: [] })),
    ]).then(([showData, heroJson, colJson]) => {
        state.shows = (showData && Array.isArray(showData.shows) ? showData.shows : []).filter(s => s && s.id && s.title);
        state.hero = heroJson && Array.isArray(heroJson.featured) ? heroJson.featured : [];
        state.collections = (colJson && Array.isArray(colJson.collections) ? colJson.collections : []).filter(c => c && c.id && c.title);
        state.hero.forEach(h => { if (h && !getShow(h.showId)) console.warn(`hero.json: no show or movie with id "${h.showId}" in show.json, so it isn't featured`); });
        migrateOldProgress();
        route();
        if (lsGet('lsAltSources') == null) setTimeout(() => { if (!topModal()) openModal('sourcesModal'); }, 700);
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
