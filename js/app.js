
/* ── IDIOMAS ── */
const LANGS=window.LANGS;
const FLAGS={es:'🇪🇸 ES',en:'🇬🇧 EN',it:'🇮🇹 IT',de:'🇩🇪 DE',fr:'🇫🇷 FR'};
const langBtn=document.getElementById('langBtn'),langMenu=document.getElementById('langMenu');

function applyLang(l){
  const d=LANGS[l];if(!d)return;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k=el.getAttribute('data-i18n');
    if(d[k]!==undefined)el.innerHTML=d[k];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const k=el.getAttribute('data-i18n-placeholder');
    if(d[k]!==undefined)el.placeholder=d[k];
  });
  const sw=document.getElementById('sofia-welcome');
  if(sw&&d.sofia_welcome){sw.textContent=d.sofia_welcome;if(chatHistory&&chatHistory[0])chatHistory[0].text=d.sofia_welcome}
  langBtn.textContent=FLAGS[l];
  langMenu.classList.remove('show');
  document.documentElement.lang=l;
}

langBtn.onclick=()=>langMenu.classList.toggle('show');
langMenu.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>applyLang(b.dataset.lang));
document.addEventListener('click',e=>{if(!e.target.closest('.lang'))langMenu.classList.remove('show')});
const hamBtn=document.getElementById('hamBtn'),mobileNav=document.getElementById('mobileNav');
hamBtn.onclick=()=>{mobileNav.classList.toggle('open');hamBtn.textContent=mobileNav.classList.contains('open')?'✕':'☰'};
mobileNav.querySelectorAll('a').forEach(a=>a.onclick=()=>{mobileNav.classList.remove('open');hamBtn.textContent='☰'});
document.addEventListener('click',e=>{if(!e.target.closest('nav')){mobileNav.classList.remove('open');hamBtn.textContent='☰'}});

/* ── ESTRELLAS INTERACTIVAS ── */
document.querySelectorAll('.star-btn').forEach(b=>{
  b.addEventListener('mouseenter',()=>{
    const n=parseInt(b.dataset.star);
    document.querySelectorAll('.star-btn').forEach((s,i)=>s.style.color=i<n?'var(--gold)':'rgba(255,255,255,.12)');
  });
  b.addEventListener('mouseleave',()=>{
    document.querySelectorAll('.star-btn').forEach((s,i)=>s.style.color=i<currentRating?'var(--gold)':'rgba(255,255,255,.12)');
  });
});

function submitEval(){
  const name=document.getElementById('eval-name').value.trim();
  const plan=document.getElementById('eval-plan').value;
  const comment=document.getElementById('eval-comment').value.trim();
  if(!name||!plan||!comment||currentRating===0){alert('Por favor completa todos los campos y selecciona una puntuación.');return;}
  const stars='★'.repeat(currentRating)+'☆'.repeat(5-currentRating);
  const initials=name.split(' ').map(w=>w[0]).join('').substring(0,2).toUpperCase();
  const card=document.createElement('div');
  card.className='eval-card';
  card.innerHTML=`<div class="eval-stars">${stars}</div><p class="eval-comment">"${comment}"</p><div class="eval-author"><div class="eval-avatar">${initials}</div><div><div class="eval-name">${name}</div><div class="eval-role">${plan}</div></div></div>`;
  document.getElementById('eval-cards').prepend(card);
  document.getElementById('eval-name').value='';
  document.getElementById('eval-plan').value='';
  document.getElementById('eval-comment').value='';
  setRating(0);
}

requestIdleCallback?requestIdleCallback(initChat):setTimeout(initChat,300);
