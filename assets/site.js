(function(){
const C=window.AAVARAN_CONFIG,$=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const page=document.body.dataset.page||"home";
const nav=[["Home","index.html","home"],["About","about.html","about"],["Menu","menu.html","menu"],["Experiences","index.html#experiences"],["Gallery","index.html#gallery"],["Contact","contact.html","contact"]];
const brand=`<a class="brand" href="index.html" aria-label="${C.name} home"><span class="brand-mark" aria-hidden="true">✺</span><span><span class="brand-name">${esc(C.name)}</span><span class="brand-sub">${esc(C.descriptor)}</span></span></a>`;
$("#site-header").outerHTML=`<div class="demo-note">${esc(C.demoNotice)}</div><header class="site-header"><div class="wrap nav">${brand}
<nav class="nav-links" id="navLinks" aria-label="Main navigation">${nav.map(n=>`<a href="${n[1]}"${n[2]===page?' aria-current="page"':""}>${n[0]}</a>`).join("")}<a class="nav-reserve" href="contact.html#reservations">Reserve a Table</a></nav>
<a class="btn btn-outline" href="contact.html#reservations">Reserve a Table</a>
<button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="navLinks" aria-label="Open navigation">Menu ☰</button></div></header>`;
const note=$(".demo-note"),setH=()=>document.documentElement.style.setProperty("--note-h",note.offsetHeight+"px");setH();addEventListener("resize",setH);
const t=$("#menuToggle"),l=$("#navLinks");
const setNav=o=>{l.classList.toggle("open",o);t.setAttribute("aria-expanded",o);t.setAttribute("aria-label",o?"Close navigation":"Open navigation")};
t.onclick=()=>setNav(!l.classList.contains("open"));l.querySelectorAll("a").forEach(a=>a.onclick=()=>setNav(false));
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&l.classList.contains("open")){setNav(false);t.focus()}});
const wa=C.whatsapp?`<a href="https://wa.me/${C.whatsapp}">WhatsApp ↗</a>`:"";
$("#site-footer").outerHTML=`<footer class="footer"><div class="wrap"><div class="footer-grid"><div>${brand}<p>A contemporary expression of India's culinary heritage, shaped by flavour, craft, and thoughtful hospitality.</p></div>
<div><h3>Explore</h3>${nav.map(n=>`<a href="${n[1]}">${n[0]}</a>`).join("")}</div>
<div><h3>Get in Touch</h3><p>${esc(C.address)}</p><a href="mailto:${C.email}">${esc(C.email)}</a>${C.phone?`<a href="tel:${C.phone}">${esc(C.phoneDisplay)}</a>`:`<p>${esc(C.phoneDisplay)}</p>`}${wa}${C.instagram?`<a href="${C.instagram}">Instagram ↗</a>`:""}<a href="contact.html#reservations">Reserve a Table</a></div>
<div><h3>Stay at the Table</h3><p>Seasonal menus and special evenings.</p><form class="newsletter" id="nl" novalidate><label for="nlEmail" style="position:absolute;left:-9999px">Your email address</label><input id="nlEmail" type="email" placeholder="Your email address" required><button aria-label="Join newsletter">→</button></form><p id="nlMsg" role="status" style="font-size:10px"></p></div></div>
<div class="footer-bottom"><span>© 2026 ${esc(C.name)}. Portfolio concept — not a real restaurant.</span></div></div></footer>`;
$("#nl").onsubmit=e=>{e.preventDefault();const i=$("#nlEmail");$("#nlMsg").textContent=i.checkValidity()?"Demo only — newsletter signup is not connected.":"Please enter a valid email address."};
document.body.insertAdjacentHTML("beforeend",`<div class="mobile-cta"><a class="btn" href="contact.html#reservations">Reserve a Table</a>${C.phone?`<a class="btn btn-outline" href="tel:${C.phone}" aria-label="Call the restaurant">Call</a>`:""}</div>`);
document.addEventListener("click",e=>{if(l.classList.contains("open")&&!e.target.closest("#navLinks,#menuToggle"))setNav(false)});
const mc=$(".mobile-cta"),sh=()=>mc.classList.toggle("show",scrollY>420);addEventListener("scroll",sh,{passive:true});sh();
// scroll reveal (content visible by default if JS/IO fail)
if("IntersectionObserver"in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e))}else document.querySelectorAll(".reveal").forEach(e=>e.classList.add("in"));
// menu
const M=window.AAVARAN_MENU,tabs=$("#menuTabs"),out=$("#menuOut");
if(M&&tabs){const show=id=>{tabs.querySelectorAll(".tab").forEach(b=>b.setAttribute("aria-selected",b.dataset.id===id));
const c=M.categories.find(x=>x.id===id);out.setAttribute("aria-labelledby","tab-"+id);
out.innerHTML=c.items.map(i=>`<article class="menu-item"><img src="${i.img}" alt="${esc(i.alt||"")}" width="150" height="150" decoding="async"><div><h3><span><span class="${i.veg?"veg-dot":"nonveg-dot"}" role="img" aria-label="${i.veg?"Vegetarian":"Non-vegetarian"}"></span>${esc(i.n)}${i.chef?'<span class="badge">Chef\'s pick</span>':""}</span><span class="price">₹${i.p}</span></h3><p>${esc(i.d)}</p></div></article>`).join("")};
tabs.innerHTML=M.categories.map(c=>`<button class="tab" role="tab" id="tab-${c.id}" data-id="${c.id}" aria-selected="false">${esc(c.name)}</button>`).join("");
tabs.onclick=e=>{const b=e.target.closest(".tab");if(b){show(b.dataset.id);history.replaceState(null,"","#"+b.dataset.id)}};
tabs.onkeydown=e=>{const b=[...tabs.children],i=b.indexOf(document.activeElement);if(i<0||!/Arrow/.test(e.key))return;const n=b[(i+(e.key==="ArrowRight"?1:b.length-1))%b.length];n.focus();show(n.dataset.id)};
$("#menuNote").textContent=M.note;show(M.categories.some(c=>"#"+c.id===location.hash)?location.hash.slice(1):M.categories[0].id)}
// forms
const rules={name:v=>v.trim().length>1||"Please enter your name.",email:v=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)||"Please enter a valid email address.",
phone:v=>/^[+\d][\d\s()-]{7,}$/.test(v.trim())||"Please enter a valid phone number.",date:v=>(v&&v>=new Date().toISOString().slice(0,10))||"Please choose today or a future date.",
time:v=>!!v||"Please choose a time.",message:v=>v.trim().length>4||"Please write a short message."};
function wire(f,onOk){f.noValidate=true;const d=f.querySelector('[name=date]');if(d)d.min=new Date().toISOString().slice(0,10);
f.onsubmit=e=>{e.preventDefault();let bad=null;f.querySelectorAll("[data-rule]").forEach(el=>{const r=rules[el.dataset.rule](el.value),er=f.querySelector("#"+el.id+"Err");
er.textContent=r===true?"":r;el.setAttribute("aria-invalid",r!==true);if(r!==true&&!bad)bad=el});
const s=f.querySelector(".status");if(bad){s.textContent="Please fix the highlighted fields.";bad.focus();return}
const b=f.querySelector("button[type=submit]");b.disabled=true;b.firstChild.textContent="Preparing…";
setTimeout(()=>{b.disabled=false;b.firstChild.textContent=b.dataset.label;onOk(Object.fromEntries(new FormData(f)),s)},600)}}
const mail=(sub,d)=>`mailto:${C.email}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(Object.entries(d).filter(e=>e[1]).map(e=>e[0]+": "+e[1]).join("\n"))}`;
const R=$("#reservationForm");if(R)wire(R,(d,s)=>{s.innerHTML=`This is a <strong>demo</strong>: nothing has been sent and no table is held or confirmed. To send this as a booking <em>request</em>, <a href="${mail("Reservation request — "+d.name,d)}">open an email draft</a>${C.whatsapp?` or <a href="https://wa.me/${C.whatsapp}?text=${encodeURIComponent("Reservation request: "+d.name+", "+d.guests+", "+d.date+" "+d.time)}">WhatsApp</a>`:""}.`;s.focus()});
const K=$("#contactForm");if(K)wire(K,(d,s)=>{s.innerHTML=`Demo only — nothing has been sent. <a href="${mail("Enquiry from "+d.name,d)}">Open an email draft</a> to send it.`;s.focus()});
const info=$("#hours");if(info)info.innerHTML=C.hours.map(h=>`<dt>${esc(h[0])}</dt><dd>${esc(h[1])}</dd>`).join("");
const ad=$("#addr");if(ad)ad.textContent=C.address;
})();
