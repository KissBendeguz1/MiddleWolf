// Lightweight map initializer — no company-add UI
(function(){
  const LS_KEY = 'mw_companies_v1';
  const companies = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  // Ha üres a localStorage, töltsünk be 3 ideiglenes példát (Budapest, Debrecen, Szeged)
  if (companies.length === 0) {
    const now = Date.now();
    const seed = [
      { id: now + 1, name: 'Kávézó Példa', address: 'Kossuth L. u. 1', city: 'Budapest', lat: 47.497913, lng: 19.040236 },
      { id: now + 2, name: 'Minta Kft.', address: 'Piac tér 3', city: 'Debrecen', lat: 47.531604, lng: 21.627312 },
      { id: now + 3, name: 'Teszt Bt.', address: 'Fő utca 10', city: 'Szeged', lat: 46.253010, lng: 20.141425 }
    ];
    companies.push(...seed);
    try { localStorage.setItem(LS_KEY, JSON.stringify(companies)); } catch (e) { /* ignore */ }
  }
  let map, markersLayer;
  const markerEntries = []; // {company, marker}

  function init(){
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    s.onload = setupMap;
    document.head.appendChild(s);
  }

  function setupMap(){
    try{
      map = L.map('map', {scrollWheelZoom:true}).setView([47.1625, 19.5033], 7);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      markersLayer = L.layerGroup().addTo(map);
      addSavedMarkers();
    }catch(err){
      console.error('Leaflet init error', err);
      const container = document.getElementById('map');
      if(container) container.innerHTML = '<div style="padding:20px;color:#900">A térkép betöltése sikertelen. Ellenőrizd az internetkapcsolatot vagy a Leaflet betöltését.</div>';
    }
  }

  function addSavedMarkers(){
    markersLayer.clearLayers();
    markerEntries.length = 0;
    companies.forEach(c => {
      if(c && typeof c.lat === 'number' && typeof c.lng === 'number'){
        const m = L.marker([c.lat, c.lng]);
        const html = `<strong>${escapeHtml(c.name||'')}</strong><br/>${escapeHtml(c.address||'')} ${escapeHtml(c.city||'')}`;
        m.bindPopup(html);
        markerEntries.push({ company: c, marker: m });
        markersLayer.addLayer(m);
      }
    });
    // wire up filter buttons
    const applyBtn = document.getElementById('map-filter-apply');
    const clearBtn = document.getElementById('map-filter-clear');
    if(applyBtn) applyBtn.addEventListener('click', applyFilters);
    if(clearBtn) clearBtn.addEventListener('click', clearFilters);
  }

  function applyFilters(){
    const country = (document.getElementById('map-country-filter')?.value || '').toLowerCase();
    const city = (document.getElementById('map-city-filter')?.value || '').toLowerCase();
    const search = (document.getElementById('map-search')?.value || '').toLowerCase();
    const review = parseInt(document.getElementById('map-review-filter')?.value) || 0;

    markerEntries.forEach(entry => {
      const c = entry.company;
      const m = entry.marker;
      let visible = true;
      if(country){
        // best-effort: check city or name contains country token
        if(!(String(c.city||'').toLowerCase().includes(country) || String(c.name||'').toLowerCase().includes(country))) visible = false;
      }
      if(city){
        if(String(c.city||'').toLowerCase() !== city) visible = false;
      }
      if(search){
        const hay = (String(c.name||'') + ' ' + String(c.address||'') + ' ' + String(c.city||'')).toLowerCase();
        if(!hay.includes(search)) visible = false;
      }
      if(review){
        if(!(c.rating && Number(c.rating) >= review)) visible = false;
      }

      if(visible){
        if(!m._map) markersLayer.addLayer(m);
      } else {
        if(m._map) markersLayer.removeLayer(m);
      }
    });
  }

  function clearFilters(){
    const els = ['map-country-filter','map-city-filter','map-search','map-review-filter'];
    els.forEach(id => { const el = document.getElementById(id); if(el) { if(el.tagName==='INPUT') el.value=''; else el.selectedIndex=0; } });
    applyFilters();
  }

  function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]; }); }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
