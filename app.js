import { firebaseConfig, iglesia, maxFotosPorCarpeta } from "./config.js?v5-2026.09.05";
import { semanas as SEMILLA, anio as SEM_ANIO, trimestre as SEM_TRI } from "./datos-iniciales.js?v5-2026.09.05";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ═══════════ datos fijos ═══════════ */
const BLOBS = {"a":{"ar":0.8043,"sub":[[[0.9996,0.4548],[0.999,0.2342],[0.9945,0.2007],[0.9857,0.1688],[0.9729,0.1388],[0.9565,0.1109],[0.9367,0.0854],[0.9139,0.0626],[0.8883,0.0429],[0.8602,0.0266],[0.83,0.0139],[0.798,0.0051],[0.7644,0.0006],[0.7323,0.0004],[0.7031,0.0038],[0.675,0.0104],[0.6482,0.0201],[0.6227,0.0326],[0.5989,0.0478],[0.577,0.0655],[0.5572,0.0856],[0.5398,0.1079],[0.5248,0.1321],[0.5126,0.1581],[0.5033,0.1858],[0.4964,0.1858],[0.4871,0.1581],[0.4749,0.1321],[0.4599,0.1079],[0.4424,0.0856],[0.4226,0.0655],[0.4007,0.0478],[0.3769,0.0326],[0.3515,0.0201],[0.3246,0.0104],[0.2965,0.0038],[0.2673,0.0004],[0.2352,0.0006],[0.2016,0.0051],[0.1696,0.0139],[0.1394,0.0266],[0.1113,0.0429],[0.0857,0.0626],[0.0629,0.0854],[0.0431,0.1109],[0.0267,0.1388],[0.0139,0.1688],[0.0051,0.2007],[0.0006,0.2342],[0.0,0.5452],[0.0004,0.7484],[0.0027,0.7826],[0.0094,0.8153],[0.0202,0.8464],[0.0349,0.8754],[0.053,0.9022],[0.0744,0.9263],[0.0986,0.9476],[0.1255,0.9657],[0.1546,0.9802],[0.1858,0.991],[0.2186,0.9977],[0.2529,1.0],[0.2824,0.9983],[0.311,0.9933],[0.3385,0.9851],[0.3646,0.974],[0.3892,0.9601],[0.4121,0.9436],[0.433,0.9247],[0.4517,0.9035],[0.4679,0.8803],[0.4816,0.8551],[0.4924,0.8282],[0.5001,0.7998],[0.5078,0.8282],[0.5186,0.8551],[0.5323,0.8803],[0.5485,0.9035],[0.5672,0.9247],[0.5881,0.9436],[0.611,0.9601],[0.6356,0.974],[0.6618,0.9851],[0.6893,0.9933],[0.718,0.9983],[0.7475,1.0],[0.7818,0.9977],[0.8146,0.991],[0.8458,0.9802],[0.8749,0.9657],[0.9018,0.9476],[0.926,0.9263],[0.9474,0.9022],[0.9655,0.8755],[0.9802,0.8464],[0.991,0.8154],[0.9977,0.7827],[1.0,0.7486],[0.9996,0.4548]]]},"b":{"ar":0.7772,"sub":[[[1.0,0.2192],[0.9996,0.7958],[0.9966,0.825],[0.9907,0.8528],[0.9821,0.879],[0.9711,0.9033],[0.9579,0.9256],[0.9426,0.9454],[0.9255,0.9626],[0.9067,0.9768],[0.8865,0.9879],[0.865,0.9955],[0.8426,0.9995],[0.8209,0.9996],[0.8011,0.9966],[0.7821,0.9907],[0.764,0.9821],[0.7469,0.971],[0.731,0.9576],[0.7165,0.942],[0.7033,0.9244],[0.6917,0.9051],[0.6819,0.884],[0.6739,0.8615],[0.6678,0.8378],[0.6633,0.8378],[0.6572,0.8615],[0.6492,0.884],[0.6393,0.9051],[0.6277,0.9244],[0.6146,0.942],[0.6,0.9576],[0.5841,0.971],[0.567,0.9821],[0.5489,0.9907],[0.5299,0.9966],[0.5101,0.9996],[0.4899,0.9996],[0.4701,0.9966],[0.4511,0.9907],[0.433,0.9821],[0.4159,0.971],[0.4,0.9576],[0.3855,0.942],[0.3723,0.9244],[0.3607,0.9051],[0.3509,0.884],[0.3429,0.8615],[0.3368,0.8378],[0.3323,0.8378],[0.3263,0.8615],[0.3182,0.884],[0.3083,0.9051],[0.2967,0.9244],[0.2836,0.942],[0.269,0.9576],[0.2531,0.971],[0.2361,0.9821],[0.218,0.9907],[0.199,0.9966],[0.1793,0.9996],[0.1576,0.9995],[0.1351,0.9955],[0.1136,0.9879],[0.0934,0.9768],[0.0746,0.9626],[0.0574,0.9454],[0.0421,0.9256],[0.0289,0.9033],[0.0179,0.879],[0.0093,0.8528],[0.0034,0.825],[0.0004,0.7958],[0.0,0.2192],[0.0015,0.1895],[0.006,0.1609],[0.0133,0.1339],[0.0231,0.1086],[0.0352,0.0853],[0.0495,0.0642],[0.0657,0.0457],[0.0837,0.0299],[0.1032,0.0172],[0.1241,0.0078],[0.1461,0.002],[0.169,0.0],[0.1891,0.0015],[0.2085,0.006],[0.2271,0.0133],[0.2447,0.0231],[0.2612,0.0354],[0.2764,0.0499],[0.2903,0.0665],[0.3027,0.085],[0.3134,0.1053],[0.3224,0.127],[0.3294,0.1502],[0.3344,0.1745],[0.3395,0.1502],[0.3465,0.127],[0.3555,0.1053],[0.3663,0.085],[0.3787,0.0665],[0.3926,0.0499],[0.4078,0.0354],[0.4243,0.0231],[0.4419,0.0133],[0.4605,0.006],[0.4799,0.0015],[0.5,0.0],[0.5201,0.0015],[0.5395,0.006],[0.5581,0.0133],[0.5757,0.0231],[0.5922,0.0354],[0.6074,0.0499],[0.6213,0.0665],[0.6337,0.085],[0.6444,0.1053],[0.6534,0.127],[0.6604,0.1502],[0.6654,0.1745],[0.6705,0.1502],[0.6775,0.127],[0.6865,0.1053],[0.6973,0.085],[0.7097,0.0665],[0.7236,0.0499],[0.7388,0.0354],[0.7553,0.0231],[0.7729,0.0133],[0.7915,0.006],[0.8109,0.0015],[0.831,0.0],[0.8539,0.002],[0.8759,0.0078],[0.8968,0.0172],[0.9163,0.0299],[0.9343,0.0457],[0.9505,0.0642],[0.9648,0.0853],[0.9769,0.1086],[0.9867,0.1339],[0.994,0.1609],[0.9985,0.1895],[1.0,0.2192]]]},"c":{"ar":1.1334,"sub":[[[0.5,0.0],[0.5342,0.0011],[0.5679,0.0042],[0.6008,0.0094],[0.633,0.0165],[0.6643,0.0254],[0.6947,0.0362],[0.7241,0.0488],[0.7524,0.0629],[0.7796,0.0787],[0.8056,0.0961],[0.8303,0.1149],[0.8536,0.135],[0.8755,0.1566],[0.8958,0.1793],[0.9146,0.2033],[0.9318,0.2284],[0.9471,0.2545],[0.9607,0.2816],[0.9724,0.3097],[0.9821,0.3386],[0.9898,0.3682],[0.9954,0.3986],[0.9988,0.4296],[1.0,0.4612],[1.0,1.0],[0.0,1.0],[0.0,0.4612],[0.0012,0.4296],[0.0046,0.3986],[0.0102,0.3682],[0.0179,0.3386],[0.0276,0.3097],[0.0393,0.2816],[0.0529,0.2545],[0.0682,0.2284],[0.0854,0.2033],[0.1042,0.1793],[0.1245,0.1566],[0.1464,0.135],[0.1697,0.1149],[0.1944,0.0961],[0.2204,0.0787],[0.2476,0.0629],[0.2759,0.0488],[0.3053,0.0362],[0.3357,0.0254],[0.367,0.0165],[0.3992,0.0094],[0.4321,0.0042],[0.4658,0.0011],[0.5,0.0]]]}};

const CATS = [
  {k:"estudios",  n:"Personas recibiendo estudios bíblicos", t:"Personas Recibiendo\nEstudios Bíblicos", s:"a"},
  {k:"literatura",n:"Literatura distribuida",                t:"Literatura\nDistribuida",                s:"b"},
  {k:"campos",    n:"Campos nuevos",                         t:"Campos\nNuevos",                         s:"c"},
  {k:"parejas",   n:"Parejas misioneras",                    t:"Parejas\nMisioneras",                    s:"a"},
  {k:"contactos", n:"Contactos misioneros",                  t:"Contactos\nMisioneros",                  s:"b"},
  {k:"filiales",  n:"Nuevas filiales",                       t:"Nuevas\nFiliales",                       s:"c"},
  {k:"campanas",  n:"Campañas de barrio",                    t:"Campañas\nde Barrio",                    s:"a"},
  {k:"bautismos", n:"Personas que se han bautizado",         t:"Personas que se\nhan Bautizado",         s:"b"},
  {k:"servicio",  n:"Servicio a la comunidad",               t:"Servicio a la\nComunidad", s:"c", money:true},
];
const ORD = {1:"1er",2:"2do",3:"3er",4:"4to"};

/* ═══════════ estado ═══════════ */
let historial = [];       // [{id,semana,trimestre,anio,valores}]
let banco = {};           // {cat:[url,...]}  fotos del repo
let elegida = {};         // {cat:indice}     cuál del banco se está usando
let mias = {};            // {cat:dataURL}    fotos subidas por el usuario
let db = null, catActiva = null;

const el = id => document.getElementById(id);
const say = (m, c) => { const s = el("status"); s.textContent = m||""; s.className = "status" + (c?" "+c:""); };
const conexion = c => { el("conexion").className = "conexion " + c; };

/* ═══════════ periodo ═══════════ */
function hoyPeriodo(){
  const d = new Date();
  const tri = Math.floor(d.getMonth()/3)+1;
  const ini = new Date(d.getFullYear(), (tri-1)*3, 1);
  return { semana: Math.min(14, Math.floor((d-ini)/(7*864e5))+1), trimestre: tri, anio: d.getFullYear() };
}
const leerPeriodo = () => ({
  semana:+el("f-sem").value || 1,
  trimestre:+el("f-tri").value || 1,
  anio:+el("f-anio").value || new Date().getFullYear(),
});
const idPeriodo = p => `${p.anio}-T${p.trimestre}-S${String(p.semana).padStart(2,"0")}`;
const periodoTxt = p => `Semana ${p.semana}  ·  ${ORD[p.trimestre]} trimestre ${p.anio}`;

/* ═══════════ cálculos ═══════════ */
const orden = r => r.anio*1000 + r.trimestre*100 + r.semana;
function anteriores(p){
  const prev = historial.filter(r => orden(r) < orden(p)).sort((a,b)=>orden(a)-orden(b));
  return prev.length ? prev[prev.length-1].valores : {};
}
function records(p){
  const rec = {};
  historial.filter(r => orden(r) < orden(p)).forEach(r =>
    CATS.forEach(c => {
      const v = r.valores[c.k];
      if(typeof v === "number") rec[c.k] = Math.max(rec[c.k] ?? 0, v);
    }));
  return rec;
}
function valoresForm(){
  const v = {};
  CATS.forEach(c => {
    const raw = el("in-"+c.k).value.trim();
    if(raw !== "") v[c.k] = Number(raw);
  });
  return v;
}
const fmt = (v, money) =>
  (v === undefined || v === null || v === 0) ? "—"
  : (money ? "$"+Number(v).toLocaleString("en-US") : String(v));

/* ═══════════ banco de fotos ═══════════ */
function existe(url){
  return new Promise(res => { const i = new Image(); i.onload=()=>res(true); i.onerror=()=>res(false); i.src=url; });
}
async function cargarBanco(){
  const carpetas = [...CATS.map(c=>c.k), "portada"];
  await Promise.all(carpetas.map(async k => {
    const urls = []; let fallos = 0;
    for(let n=1; n<=maxFotosPorCarpeta && fallos<2; n++){
      let hallada = false;
      for(const ext of ["jpg","jpeg","png","webp"]){
        const u = `fotos/${k}/${n}.${ext}`;
        if(await existe(u)){ urls.push(u); hallada = true; break; }
      }
      fallos = hallada ? 0 : fallos+1;
    }
    banco[k] = urls;
    elegida[k] = 0;
  }));
}
const fotoActual = k => mias[k] || banco[k]?.[elegida[k]] || "";
function otraFoto(k){
  const n = banco[k]?.length || 0;
  if(n < 2){ say(n ? "Solo hay una foto en esa carpeta. Agrega más al repositorio." : "No hay fotos en esa carpeta.", "err"); return false; }
  let i; do { i = Math.floor(Math.random()*n); } while(i === elegida[k]);
  elegida[k] = i; delete mias[k];
  return true;
}

/* ═══════════ pintado ═══════════ */
function pintarEco(){
  const p = leerPeriodo();
  el("eco").textContent = periodoTxt(p);
  el("edicion").classList.toggle("oculto", !historial.some(r => r.id === idPeriodo(p)));
}
function pintarLista(){
  const p = leerPeriodo(), ant = anteriores(p), rec = records(p);
  el("lista").innerHTML = CATS.map(c => {
    const fa = fmt(ant[c.k], c.money);
    const r = rec[c.k];
    const fr = (r && r > 0) ? fmt(r, c.money) : null;
    return `<div class="row">
      <div class="meta">
        <div class="name">${c.n}</div>
        <div class="sub"><span>anterior <b>${fa}</b></span>${fr?`<span class="rec">récord <b>${fr}</b></span>`:""}</div>
      </div>
      <div>
        <input type="number" id="in-${c.k}" inputmode="numeric" min="0" placeholder="—" aria-label="${c.n}">
        <div class="delta" id="d-${c.k}"></div>
      </div>
    </div>`;
  }).join("");
  CATS.forEach(c => el("in-"+c.k).addEventListener("input", () => pintarDelta(c)));
  precargar(p);
}
function pintarDelta(c){
  const a = anteriores(leerPeriodo())[c.k];
  const raw = el("in-"+c.k).value.trim(), d = el("d-"+c.k);
  if(raw === "" || typeof a !== "number"){ d.textContent = ""; d.className = "delta"; return; }
  const dif = Number(raw) - a;
  const f = v => c.money ? "$"+Math.abs(v).toLocaleString("en-US") : String(Math.abs(v));
  d.textContent = dif>0 ? "▲ +"+f(dif) : dif<0 ? "▼ -"+f(dif) : "= 0";
  d.className = "delta " + (dif>0?"up":dif<0?"down":"eq");
}
function precargar(p){
  const ya = historial.find(r => r.id === idPeriodo(p));
  CATS.forEach(c => {
    el("in-"+c.k).value = (ya && typeof ya.valores[c.k] === "number") ? ya.valores[c.k] : "";
    pintarDelta(c);
  });
}
function pintarThumbs(){
  el("thumbs").innerHTML = CATS.map(c =>
    `<button class="thumb${mias[c.k]?" mia":""}" data-k="${c.k}" type="button" aria-label="Cambiar foto de ${c.n}">
       ${mias[c.k]?'<span class="marca">mía</span>':""}
       <img src="${fotoActual(c.k)}" alt="">
       <span>${c.n}</span>
     </button>`).join("");
  document.querySelectorAll(".thumb").forEach(b => b.addEventListener("click", () => abrirSheet(b.dataset.k)));
}
function pintarHist(){
  const h = el("hist"), act = idPeriodo(leerPeriodo());
  if(!historial.length){
    h.innerHTML = '<p class="empty">Todavía no hay semanas guardadas. Captura la primera y guárdala.</p>';
    return;
  }
  const ord = [...historial].sort((a,b) => orden(b)-orden(a));
  h.innerHTML = `<table><thead><tr><th>Periodo</th>${
      CATS.map(c=>`<th title="${c.n}">${c.n.split(" ")[0].slice(0,4)}</th>`).join("")}<th></th><th></th></tr></thead><tbody>`
    + ord.map(r => `<tr class="${r.id===act?"viendo":""}"><td>S${r.semana} T${r.trimestre} ${r.anio}</td>`
        + CATS.map(c => `<td>${typeof r.valores[c.k]==="number" ? r.valores[c.k] : "—"}</td>`).join("")
        + `<td><button class="mini ed" data-ed="${r.id}" type="button">editar</button></td>`
        + `<td><button class="mini del" data-del="${r.id}" type="button">borrar</button></td></tr>`).join("")
    + `</tbody></table>`;
  h.querySelectorAll("[data-ed]").forEach(b => b.addEventListener("click", () => editar(b.dataset.ed)));
  h.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => borrar(b.dataset.del)));
}
function refrescar(){ pintarEco(); pintarLista(); pintarHist(); pintarSemilla(); }

/* ═══════════ hoja de foto ═══════════ */
function abrirSheet(k){
  catActiva = k;
  const c = CATS.find(x => x.k === k);
  el("sheet-img").src = fotoActual(k);
  el("sheet-tit").textContent = c.n;
  const n = banco[k]?.length || 0;
  el("sheet-sub").textContent = mias[k]
    ? "Ahora usa una foto tuya."
    : `Foto ${elegida[k]+1} de ${n} en la carpeta de este indicador.`;
  el("sheet-quitar").classList.toggle("oculto", !mias[k]);
  el("sheet").classList.remove("oculto");
}
const cerrarSheet = () => { el("sheet").classList.add("oculto"); catActiva = null; };

async function guardarFotoMia(k, dataURL){
  mias[k] = dataURL;
  pintarThumbs();
  try{ await setDoc(doc(db,"fotos",k), {data:dataURL}); say("Foto guardada.","ok"); }
  catch(e){ console.error(e); say("La foto se ve aquí, pero no se pudo guardar en línea.","err"); }
}
async function quitarFotoMia(k){
  delete mias[k]; pintarThumbs();
  try{ await deleteDoc(doc(db,"fotos",k)); say("Se restauró la foto original.","ok"); }
  catch(e){ console.error(e); say("No se pudo quitar en línea.","err"); }
}

/* ═══════════ guardar / editar / borrar ═══════════ */
async function guardar(){
  const p = leerPeriodo();
  const reg = { ...p, id: idPeriodo(p), valores: valoresForm() };
  try{
    await setDoc(doc(db,"semanas",reg.id), reg);
    say(`Semana ${p.semana} guardada.`,"ok");
  }catch(e){ console.error(e); say("No se pudo guardar. Revisa tu internet e inténtalo otra vez.","err"); }
}
function editar(id){
  const r = historial.find(x => x.id === id);
  if(!r) return;
  el("f-sem").value = r.semana; el("f-tri").value = r.trimestre; el("f-anio").value = r.anio;
  refrescar();
  window.scrollTo({top:0, behavior:"smooth"});
  say(`Editando la semana ${r.semana}. Cambia lo que necesites y guarda.`,"work");
}
async function borrar(id){
  const r = historial.find(x => x.id === id);
  if(!confirm(`¿Borrar la semana ${r.semana} del ${ORD[r.trimestre]} trimestre ${r.anio}?`)) return;
  try{ await deleteDoc(doc(db,"semanas",id)); say("Semana borrada.","ok"); }
  catch(e){ console.error(e); say("No se pudo borrar.","err"); }
}

/* ═══════════ carga inicial del trimestre ═══════════ */
function faltantesSemilla(){
  return SEMILLA.filter(f => !historial.some(r =>
    r.anio === SEM_ANIO && r.trimestre === SEM_TRI && r.semana === f.semana));
}
function pintarSemilla(){
  const caja = el("semilla"), faltan = db ? faltantesSemilla() : [];
  caja.classList.toggle("oculto", faltan.length === 0);
  if(faltan.length) el("semilla-n").textContent = faltan.length;
}
async function cargarSemilla(){
  const faltan = faltantesSemilla();
  if(!faltan.length) return;
  el("btn-semilla").disabled = true;
  say(`Cargando ${faltan.length} semanas…`, "work");
  try{
    for(const f of faltan){
      const p = { anio:SEM_ANIO, trimestre:SEM_TRI, semana:f.semana };
      const valores = {};
      CATS.forEach(c => { if(typeof f[c.k] === "number") valores[c.k] = f[c.k]; });
      await setDoc(doc(db,"semanas", idPeriodo(p)), { ...p, id:idPeriodo(p), valores });
    }
    say(`Se cargaron ${faltan.length} semanas.`, "ok");
  }catch(e){ console.error(e); say("No se pudo cargar el historial. Revisa tu internet.","err"); }
  el("btn-semilla").disabled = false;
}

/* ═══════════ gráficos ═══════════ */
const cv = el("cv"), ctx = cv.getContext("2d");
function fondo(w,h,base){
  cv.width=w; cv.height=h;
  ctx.fillStyle = `rgb(${base.join(",")})`; ctx.fillRect(0,0,w,h);
  const bloom = (cx,cy,r,col,al) => {
    const g = ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    g.addColorStop(0,`rgba(${col.join(",")},${al})`);
    g.addColorStop(1,`rgba(${col.join(",")},0)`);
    ctx.fillStyle = g; ctx.fillRect(0,0,w,h);
  };
  bloom(w*.92,h*.06,w*.62,[140,175,168],.30);
  bloom(w*.05,h*1.02,w*.60,[226,186,120],.26);
  bloom(w*.18,h*.30,w*.42,[150,185,190],.12);
  return cv.toDataURL("image/jpeg",.9);
}
function recorte(src, shape){
  return new Promise((res,rej) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onerror = () => rej(new Error("no se pudo leer la imagen"));
    im.onload = () => {
      const b = BLOBS[shape], W = 900, H = Math.round(W*b.ar);
      const c = document.createElement("canvas"); c.width=W; c.height=H;
      const g = c.getContext("2d");
      g.fillStyle = "#fff";
      g.beginPath();
      b.sub.forEach(sp => { sp.forEach((pt,i) => i ? g.lineTo(pt[0]*W,pt[1]*H) : g.moveTo(pt[0]*W,pt[1]*H)); g.closePath(); });
      g.clip(); g.fillRect(0,0,W,H);
      const s = Math.min(im.width, im.height*(W/H)), sh = s*(H/W);
      g.drawImage(im,(im.width-s)/2,(im.height-sh)/2,s,sh,0,0,W,H);
      res({ data:c.toDataURL("image/png"), ar:b.ar });
    };
    im.src = src;
  });
}
function aDataURL(src){
  return new Promise((res,rej) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onerror = () => rej(new Error("no se pudo cargar "+src));
    im.onload = () => {
      const c = document.createElement("canvas");
      c.width = im.width; c.height = im.height;
      c.getContext("2d").drawImage(im,0,0);
      res(c.toDataURL("image/png"));
    };
    im.src = src;
  });
}

function ovalo(src){
  return new Promise((res,rej) => {
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onerror = () => rej(new Error("no se pudo leer la imagen"));
    im.onload = () => {
      const ar = 0.804, W = 1400, H = Math.round(W*ar);
      const c = document.createElement("canvas"); c.width=W; c.height=H;
      const g = c.getContext("2d");
      g.save();
      g.beginPath(); g.ellipse(W/2,H/2,W/2,H/2,0,0,Math.PI*2); g.clip();
      const s2 = Math.min(im.width, im.height*(W/H)), sh = s2*(H/W);
      g.drawImage(im,(im.width-s2)/2,(im.height-sh)/2,s2,sh,0,0,W,H);
      g.restore();
      const bw = Math.round((5/72)/5.35*W);
      g.strokeStyle = "#333333"; g.lineWidth = bw;
      g.beginPath(); g.ellipse(W/2,H/2,W/2-bw/2,H/2-bw/2,0,0,Math.PI*2); g.stroke();
      res({ data:c.toDataURL("image/png"), ar });
    };
    im.src = src;
  });
}

async function armar(){
  const p = leerPeriodo(), vals = valoresForm(), ant = anteriores(p), rec = records(p);
  const imgs = {};
  for(const c of CATS) imgs[c.k] = await recorte(fotoActual(c.k), c.s);
  imgs.portada = await ovalo(fotoActual("portada"));
  const logo = await aDataURL("fotos/logo.png");
  return {
    p, txt: periodoTxt(p), logo,
    bgS: fondo(1400,1050,[246,245,240]),
    bgC: fondo(1400,1050,[243,242,236]),
    imgs,
    items: CATS.map(c => {
      const now = typeof vals[c.k] === "number" ? vals[c.k] : null;
      const a = ant[c.k], r = rec[c.k];
      let arrow=null, col=null, delta=null;
      if(now !== null && typeof a === "number"){
        const d = now - a;
        const f = v => c.money ? "$"+Math.abs(v).toLocaleString("en-US") : String(Math.abs(v));
        if(d>0){ arrow="▲"; col="up"; delta="+"+f(d); }
        else if(d<0){ arrow="▼"; col="down"; delta="-"+f(d); }
        else { arrow="="; col="eq"; delta="0"; }
      }
      return { ...c, now, rec:r, arrow, col, delta,
        esRec: now !== null && now > 0 && (r === undefined || now > r),
        fNow: fmt(now,c.money), fAnt: fmt(a,c.money), fRec: fmt(r,c.money) };
    })
  };
}

/* ═══════════ PDF ═══════════ */
async function hacerPDF(){
  const { jsPDF } = window.jspdf;
  const D = await armar();
  const doc2 = new jsPDF({unit:"in", format:[10,7.5], orientation:"landscape"});
  const INK=[19,34,30], SOFT=[90,107,101], MUT=[154,165,160], TEAL=[62,124,135],
        GOLD=[201,138,46], UP=[47,125,79], DOWN=[180,69,47];
  const col = c => c==="up"?UP : c==="down"?DOWN : SOFT;

  doc2.addImage(D.bgC,"JPEG",0,0,10,7.5);
  doc2.addImage(D.logo,"PNG",.59,.50,.95,.95);
  doc2.addImage(D.imgs.portada.data,"PNG",4.57,.35,5.35,4.30);
  doc2.setTextColor(...INK); doc2.setFont("helvetica","bold"); doc2.setFontSize(60);
  doc2.text("Tabla",.75,2.66);
  doc2.setTextColor(...TEAL); doc2.setFont("helvetica","normal"); doc2.setFontSize(50);
  doc2.text("comparativa",.26,3.50);
  doc2.setTextColor(...INK); doc2.setFont("helvetica","bold"); doc2.setFontSize(26);
  doc2.text(iglesia.nombre,.19,4.82);
  doc2.setTextColor(...SOFT); doc2.setFont("helvetica","normal"); doc2.setFontSize(22);
  doc2.text(iglesia.distrito,.31,5.24);
  doc2.text(iglesia.asociacion,.26,5.64);
  doc2.setDrawColor(...TEAL); doc2.setFillColor(255,255,255);
  doc2.roundedRect(1.65,6.34,5.61,.55,.27,.27,"FD");
  doc2.setTextColor(...TEAL); doc2.setFont("helvetica","bold"); doc2.setFontSize(18);
  doc2.text(D.txt,4.51,6.71,{align:"center"});

  D.items.forEach((it,i) => {
    doc2.addPage([10,7.5],"landscape");
    doc2.addImage(D.bgS,"JPEG",0,0,10,7.5);
    const img = D.imgs[it.k], bw = 5.15, bh = bw*img.ar;
    doc2.addImage(img.data,"PNG",4.75,(7.5-bh)/2,bw,bh);

    doc2.setTextColor(...INK); doc2.setFont("helvetica","bold"); doc2.setFontSize(29);
    it.t.split("\n").forEach((ln,j) => doc2.text(ln,.57,.80+j*.49));
    doc2.setTextColor(...(it.now===null?MUT:INK));
    doc2.setFont("helvetica", it.now===null?"normal":"bold");
    doc2.setFontSize(it.now===null?100:(it.money?46:88));
    doc2.text(it.fNow,1.16,3.44);
    doc2.setTextColor(...MUT); doc2.setFont("helvetica","bold"); doc2.setFontSize(13);
    doc2.text("ACTUAL",1.35,3.85);
    if(it.arrow){
      // los triangulos se dibujan: las fuentes base del PDF no tienen los simbolos
      const cx = 2.83, cy = 3.82, r = 0.085;
      doc2.setFillColor(...col(it.col));
      if(it.col === "up")        doc2.triangle(cx-r, cy+r, cx+r, cy+r, cx, cy-r, "F");
      else if(it.col === "down") doc2.triangle(cx-r, cy-r, cx+r, cy-r, cx, cy+r, "F");
      else                       doc2.rect(cx-r, cy-0.025, r*2, 0.05, "F");
      doc2.setTextColor(...col(it.col)); doc2.setFont("helvetica","bold"); doc2.setFontSize(19);
      doc2.text(it.delta, 3.05, 3.88);
    }
    doc2.setTextColor(...SOFT); doc2.setFont("helvetica","bold");
    doc2.setFontSize(it.money?26:48); doc2.text(it.fAnt,.35,5.46);
    doc2.setTextColor(...MUT); doc2.setFontSize(13); doc2.text("ANTERIOR",.35,5.81);
    if(it.esRec){
      doc2.setDrawColor(...GOLD); doc2.setFillColor(250,243,229);
      doc2.roundedRect(2.82,4.95,1.90,.62,.31,.31,"FD");
      doc2.setTextColor(...GOLD); doc2.setFontSize(10);
      doc2.text("NUEVO RECORD",3.77,5.32,{align:"center"});
    } else if(it.rec && it.rec>0){
      doc2.setTextColor(...GOLD); doc2.setFont("helvetica","bold");
      doc2.setFontSize(it.money?26:48); doc2.text(it.fRec,2.85,5.46);
      doc2.setTextColor(...MUT); doc2.setFontSize(13); doc2.text("RÉCORD",2.85,5.81);
    }
    doc2.setTextColor(...SOFT); doc2.setFont("helvetica","normal"); doc2.setFontSize(9);
    doc2.text(`${String(i+1).padStart(2,"0")} / 09`,9.4,7.05,{align:"right"});
  });

  doc2.addPage([10,7.5],"landscape");
  doc2.addImage(D.bgS,"JPEG",0,0,10,7.5);
  doc2.setTextColor(...INK); doc2.setFont("helvetica","bold"); doc2.setFontSize(24);
  doc2.text("Resumen",.7,.95);
  doc2.setTextColor(...TEAL); doc2.setFontSize(10); doc2.text(D.txt,.72,1.25);
  let y = 1.55; const cw = [3.8,1.6,1.6,1.6], x0 = .7;
  const cx = j => x0 + cw.slice(0,j).reduce((a,b)=>a+b,0);
  doc2.setFillColor(...TEAL); doc2.rect(x0,y,8.6,.42,"F");
  doc2.setTextColor(255,255,255); doc2.setFontSize(9);
  ["INDICADOR","ACTUAL","ANTERIOR","RÉCORD"].forEach((h,j) =>
    j===0 ? doc2.text(h,cx(0)+.12,y+.28) : doc2.text(h,cx(j)+cw[j]/2,y+.28,{align:"center"}));
  y += .42;
  D.items.forEach((it,i) => {
    doc2.setFillColor(...(i%2===0?[255,255,255]:[241,241,236])); doc2.rect(x0,y,8.6,.44,"F");
    doc2.setDrawColor(222,221,214); doc2.line(x0,y+.44,x0+8.6,y+.44);
    doc2.setFont("helvetica","normal"); doc2.setFontSize(10); doc2.setTextColor(...INK);
    doc2.text(it.t.replace("\n"," "),cx(0)+.12,y+.29);
    doc2.setFont("helvetica","bold"); doc2.setFontSize(11);
    doc2.setTextColor(...(it.now===null?MUT:INK));
    doc2.text(it.fNow,cx(1)+cw[1]/2,y+.29,{align:"center"});
    doc2.setFont("helvetica","normal"); doc2.setFontSize(10); doc2.setTextColor(...SOFT);
    doc2.text(it.fAnt,cx(2)+cw[2]/2,y+.29,{align:"center"});
    doc2.setFont("helvetica","bold"); doc2.setTextColor(...GOLD);
    doc2.text(it.fRec,cx(3)+cw[3]/2,y+.29,{align:"center"});
    y += .44;
  });
  doc2.setFont("helvetica","italic"); doc2.setFontSize(9); doc2.setTextColor(...MUT);
  doc2.text("El guion (—) indica que no hay dato registrado.",.7,7.0);
  doc2.save(nombre(D.p,"pdf"));
}

/* ═══════════ PowerPoint ═══════════ */
async function hacerPPT(){
  const D = await armar();
  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_4x3";
  const INK="13221E", SOFT="5A6B65", MUT="9AA5A0", TEAL="3E7C87",
        GOLD="C98A2E", UP="2F7D4F", DOWN="B4452F", TF="Arial Black", BF="Arial";
  const col = c => c==="up"?UP : c==="down"?DOWN : SOFT;
  const sh = () => ({type:"outer",color:"1B2A26",blur:20,offset:6,angle:90,opacity:.16});

  const s = pres.addSlide();
  s.addImage({data:D.bgC,x:0,y:0,w:10,h:7.5});
  s.addImage({data:D.logo,x:.59,y:.50,w:.95,h:.95});
  s.addImage({data:D.imgs.portada.data,x:4.57,y:.35,w:5.35,h:4.30,
    shadow:{type:"outer",color:"000000",blur:30,offset:10,angle:90,opacity:.22}});
  s.addText("Tabla",{x:.75,y:1.89,w:6,h:.90,fontFace:TF,fontSize:66,color:INK,isTextBox:true,margin:0,valign:"middle"});
  s.addText("comparativa",{x:.26,y:2.86,w:6,h:.75,fontFace:BF,fontSize:54,color:TEAL,isTextBox:true,margin:0,valign:"middle"});
  s.addText(iglesia.nombre,{x:.19,y:4.51,w:5.54,h:.35,fontFace:BF,bold:true,fontSize:28,color:INK,isTextBox:true,margin:0,charSpacing:1.5});
  s.addText(iglesia.distrito,{x:.31,y:4.97,w:5.00,h:.30,fontFace:BF,fontSize:24,color:SOFT,isTextBox:true,margin:0});
  s.addText(iglesia.asociacion,{x:.26,y:5.37,w:5.48,h:.30,fontFace:BF,fontSize:24,color:SOFT,isTextBox:true,margin:0});
  s.addShape("roundRect",{x:1.65,y:6.34,w:5.61,h:.55,rectRadius:.27,fill:{color:"FFFFFF",transparency:25},line:{color:TEAL,width:1,transparency:55}});
  s.addText(D.txt,{x:2.27,y:6.34,w:4.48,h:.55,fontFace:BF,bold:true,fontSize:20,color:TEAL,align:"center",valign:"middle",isTextBox:true,margin:0});

  D.items.forEach((it,i) => {
    const sl = pres.addSlide();
    sl.addImage({data:D.bgS,x:0,y:0,w:10,h:7.5});
    const img = D.imgs[it.k], bw = 5.15, bh = bw*img.ar;
    sl.addImage({data:img.data,x:4.75,y:(7.5-bh)/2,w:bw,h:bh,shadow:sh()});
    sl.addText(it.t,{x:.57,y:.39,w:5.92,h:1.40,fontFace:TF,fontSize:32,color:INK,isTextBox:true,margin:0,valign:"top",lineSpacingMultiple:1.10});
    sl.addText(it.fNow,{x:1.16,y:2.05,w:3.40,h:1.45,fontFace:it.now===null?BF:TF,
      fontSize: it.now===null?115:(it.money?50:100), color: it.now===null?MUT:INK,
      isTextBox:true,margin:0,valign:"bottom"});
    sl.addText("ACTUAL",{x:1.35,y:3.62,w:1.30,h:.30,fontFace:BF,bold:true,fontSize:16,color:MUT,isTextBox:true,margin:0,charSpacing:2});
    if(it.arrow) sl.addText(`${it.arrow} ${it.delta}`,{x:2.75,y:3.58,w:1.90,h:.38,fontFace:BF,bold:true,fontSize:22,color:col(it.col),isTextBox:true,margin:0,valign:"middle"});
    sl.addText(it.fAnt,{x:.35,y:4.90,w:2.30,h:.60,fontFace:BF,bold:true,fontSize:it.money?30:54,color:SOFT,isTextBox:true,margin:0,valign:"middle"});
    sl.addText("ANTERIOR",{x:.35,y:5.58,w:2.30,h:.30,fontFace:BF,bold:true,fontSize:16,color:MUT,isTextBox:true,margin:0,charSpacing:2});
    if(it.esRec){
      sl.addShape("roundRect",{x:2.82,y:4.95,w:1.90,h:.62,rectRadius:.31,fill:{color:GOLD,transparency:82},line:{color:GOLD,width:1,transparency:40}});
      sl.addText("★ NUEVO RÉCORD",{x:2.82,y:4.95,w:1.90,h:.62,fontFace:BF,bold:true,fontSize:11,color:GOLD,align:"center",valign:"middle",isTextBox:true,margin:0});
    } else if(it.rec && it.rec>0){
      sl.addText(it.fRec,{x:2.85,y:4.90,w:2.30,h:.60,fontFace:BF,bold:true,fontSize:it.money?30:54,color:GOLD,isTextBox:true,margin:0,valign:"middle"});
      sl.addText("RÉCORD",{x:2.85,y:5.58,w:2.30,h:.30,fontFace:BF,bold:true,fontSize:16,color:MUT,isTextBox:true,margin:0,charSpacing:2});
    }
    sl.addText(`${String(i+1).padStart(2,"0")} / 09`,{x:8.6,y:6.85,w:1,h:.32,fontFace:BF,fontSize:10,color:SOFT,align:"right",isTextBox:true,margin:0,charSpacing:1});
  });

  const rs = pres.addSlide();
  rs.addImage({data:D.bgS,x:0,y:0,w:10,h:7.5});
  rs.addText("Resumen",{x:.7,y:.45,w:6,h:.55,fontFace:TF,fontSize:27,color:INK,isTextBox:true,margin:0});
  rs.addText(D.txt,{x:.72,y:1.02,w:6,h:.3,fontFace:BF,bold:true,fontSize:11,color:TEAL,isTextBox:true,margin:0});
  const head = (t,a) => ({text:t,options:{bold:true,color:"FFFFFF",fill:{color:TEAL},fontSize:10.5,align:a,charSpacing:1}});
  const rows = [[head("INDICADOR","left"),head("ACTUAL","center"),head("ANTERIOR","center"),head("RÉCORD","center")]];
  D.items.forEach((it,i) => {
    const bg = i%2===0 ? "FFFFFF" : "F1F1EC";
    rows.push([
      {text:it.t.replace("\n"," "),options:{fontSize:11.5,color:INK,fill:{color:bg},align:"left"}},
      {text:it.fNow,options:{fontSize:13,bold:true,color:it.now===null?MUT:INK,fill:{color:bg},align:"center"}},
      {text:it.fAnt,options:{fontSize:11.5,color:SOFT,fill:{color:bg},align:"center"}},
      {text:it.fRec,options:{fontSize:11.5,bold:true,color:GOLD,fill:{color:bg},align:"center"}},
    ]);
  });
  rs.addTable(rows,{x:.7,y:1.45,w:8.6,colW:[3.8,1.6,1.6,1.6],rowH:.49,fontFace:BF,valign:"middle",
    border:{type:"solid",color:"DEDDD6",pt:1},margin:[4,10,4,10]});
  rs.addText("El guion (—) indica que no hay dato registrado.",{x:.7,y:6.8,w:6,h:.3,fontFace:BF,italic:true,fontSize:10,color:MUT,isTextBox:true,margin:0});

  await pres.writeFile({fileName:nombre(D.p,"pptx")});
}
/* ═══════════ Excel ═══════════ */
function hacerXLS(){
  if(!historial.length){ throw new Error("sin historial"); }
  const enc = ["Año","Trimestre","Semana", ...CATS.map(c => c.n)];
  const filas = [...historial].sort((a,b) => orden(a)-orden(b))
    .map(r => [r.anio, r.trimestre, r.semana,
      ...CATS.map(c => typeof r.valores[c.k] === "number" ? r.valores[c.k] : "")]);
  const hoja = XLSX.utils.aoa_to_sheet([enc, ...filas]);
  hoja["!cols"] = enc.map((h,i) => ({ wch: i < 3 ? 10 : Math.max(14, h.length + 2) }));
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Historial");
  XLSX.writeFile(libro, `Historial_tabla_comparativa_${new Date().toISOString().slice(0,10)}.xlsx`);
}

const nombre = (p,ext) => `Tabla_comparativa_S${p.semana}_T${p.trimestre}_${p.anio}.${ext}`;

async function correr(fn, etiqueta){
  const bs = [el("btn-pdf"), el("btn-ppt"), el("btn-xls"), el("btn-save")];
  bs.forEach(b => b.disabled = true);
  say(`Armando el ${etiqueta}…`,"work");
  try{ await fn(); say(`${etiqueta} descargado.`,"ok"); }
  catch(e){
    console.error(e);
    say(`No se pudo armar el ${etiqueta}: ${e && e.message ? e.message : e}`, "err");
  }
  bs.forEach(b => b.disabled = false);
}

/* ═══════════ arranque ═══════════ */
const VERSION = "v5-2026.09.05";
async function iniciar(){
  el("version").textContent = VERSION;
  const hoy = hoyPeriodo();
  el("f-sem").value = hoy.semana;
  el("f-tri").value = hoy.trimestre;
  el("f-anio").value = hoy.anio;

  await cargarBanco();
  pintarThumbs();
  refrescar();

  ["f-sem","f-tri","f-anio"].forEach(id => el(id).addEventListener("change", refrescar));
  el("btn-save").addEventListener("click", guardar);
  el("btn-semilla").addEventListener("click", cargarSemilla);
  el("btn-pdf").addEventListener("click", () => correr(hacerPDF,"PDF"));
  el("btn-ppt").addEventListener("click", () => correr(hacerPPT,"PowerPoint"));
  el("btn-xls").addEventListener("click", () => {
    if(!historial.length){ say("Todavía no hay semanas guardadas que exportar.","err"); return; }
    correr(async () => hacerXLS(), "Excel");
  });

  el("sheet-cerrar").addEventListener("click", cerrarSheet);
  el("sheet").addEventListener("click", e => { if(e.target === el("sheet")) cerrarSheet(); });
  el("sheet-azar").addEventListener("click", () => {
    if(otraFoto(catActiva)){ pintarThumbs(); abrirSheet(catActiva); }
  });
  el("sheet-subir").addEventListener("click", () => el("file").click());
  el("sheet-quitar").addEventListener("click", () => { const k = catActiva; cerrarSheet(); quitarFotoMia(k); });
  el("file").addEventListener("change", () => {
    const f = el("file").files?.[0], k = catActiva;
    el("file").value = "";
    if(!f || !k) return;
    const rd = new FileReader();
    rd.onload = () => {
      const im = new Image();
      im.onload = () => {
        const c = document.createElement("canvas"); c.width = c.height = 900;
        const g = c.getContext("2d");
        const s = Math.min(im.width, im.height);
        g.drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,900,900);
        cerrarSheet();
        guardarFotoMia(k, c.toDataURL("image/jpeg",.78));
      };
      im.src = rd.result;
    };
    rd.readAsDataURL(f);
  });

  // Firebase
  if(String(firebaseConfig.projectId).startsWith("PEGA_AQUI")){
    el("aviso-config").classList.remove("oculto");
    conexion("err");
    say("Sin base de datos: puedes generar archivos, pero no se guarda el historial.","err");
    return;
  }
  try{
    db = getFirestore(initializeApp(firebaseConfig));
    onSnapshot(collection(db,"semanas"), snap => {
      historial = snap.docs.map(d => ({ id:d.id, ...d.data() }));
      conexion("ok"); refrescar();
    }, e => { console.error(e); conexion("err"); say("Se perdió la conexión con la base de datos.","err"); });
    onSnapshot(collection(db,"fotos"), snap => {
      mias = {}; snap.docs.forEach(d => mias[d.id] = d.data().data);
      pintarThumbs();
    });
  }catch(e){
    console.error(e); conexion("err");
    say("No se pudo conectar. Revisa los datos de config.js.","err");
  }
}
iniciar();
