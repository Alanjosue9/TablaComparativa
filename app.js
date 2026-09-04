import { firebaseConfig, iglesia, maxFotosPorCarpeta } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ═══════════ datos fijos ═══════════ */
const BLOBS = {"a":{"ar":0.8043,"sub":[[[0.9996,0.4548],[0.999,0.2342],[0.9945,0.2007],[0.9857,0.1688],[0.9729,0.1388],[0.9565,0.1109],[0.9367,0.0854],[0.9139,0.0626],[0.8883,0.0429],[0.8602,0.0266],[0.83,0.0139],[0.798,0.0051],[0.7644,0.0006],[0.7323,0.0004],[0.7031,0.0038],[0.675,0.0104],[0.6482,0.0201],[0.6227,0.0326],[0.5989,0.0478],[0.577,0.0655],[0.5572,0.0856],[0.5398,0.1079],[0.5248,0.1321],[0.5126,0.1581],[0.5033,0.1858],[0.4964,0.1858],[0.4871,0.1581],[0.4749,0.1321],[0.4599,0.1079],[0.4424,0.0856],[0.4226,0.0655],[0.4007,0.0478],[0.3769,0.0326],[0.3515,0.0201],[0.3246,0.0104],[0.2965,0.0038],[0.2673,0.0004],[0.2352,0.0006],[0.2016,0.0051],[0.1696,0.0139],[0.1394,0.0266],[0.1113,0.0429],[0.0857,0.0626],[0.0629,0.0854],[0.0431,0.1109],[0.0267,0.1388],[0.0139,0.1688],[0.0051,0.2007],[0.0006,0.2342],[0.0,0.5452],[0.0004,0.7484],[0.0027,0.7826],[0.0094,0.8153],[0.0202,0.8464],[0.0349,0.8754],[0.053,0.9022],[0.0744,0.9263],[0.0986,0.9476],[0.1255,0.9657],[0.1546,0.9802],[0.1858,0.991],[0.2186,0.9977],[0.2529,1.0],[0.2824,0.9983],[0.311,0.9933],[0.3385,0.9851],[0.3646,0.974],[0.3892,0.9601],[0.4121,0.9436],[0.433,0.9247],[0.4517,0.9035],[0.4679,0.8803],[0.4816,0.8551],[0.4924,0.8282],[0.5001,0.7998],[0.5078,0.8282],[0.5186,0.8551],[0.5323,0.8803],[0.5485,0.9035],[0.5672,0.9247],[0.5881,0.9436],[0.611,0.9601],[0.6356,0.974],[0.6618,0.9851],[0.6893,0.9933],[0.718,0.9983],[0.7475,1.0],[0.7818,0.9977],[0.8146,0.991],[0.8458,0.9802],[0.8749,0.9657],[0.9018,0.9476],[0.926,0.9263],[0.9474,0.9022],[0.9655,0.8755],[0.9802,0.8464],[0.991,0.8154],[0.9977,0.7827],[1.0,0.7486],[0.9996,0.4548]]]},"b":{"ar":0.7772,"sub":[[[1.0,0.2192],[0.9996,0.7958],[0.9966,0.825],[0.9907,0.8528],[0.9821,0.879],[0.9711,0.9033],[0.9579,0.9256],[0.9426,0.9454],[0.9255,0.9626],[0.9067,0.9768],[0.8865,0.9879],[0.865,0.9955],[0.8426,0.9995],[0.8209,0.9996],[0.8011,0.9966],[0.7821,0.9907],[0.764,0.9821],[0.7469,0.971],[0.731,0.9576],[0.7165,0.942],[0.7033,0.9244],[0.6917,0.9051],[0.6819,0.884],[0.6739,0.8615],[0.6678,0.8378],[0.6633,0.8378],[0.6572,0.8615],[0.6492,0.884],[0.6393,0.9051],[0.6277,0.9244],[0.6146,0.942],[0.6,0.9576],[0.5841,0.971],[0.567,0.9821],[0.5489,0.9907],[0.5299,0.9966],[0.5101,0.9996],[0.4899,0.9996],[0.4701,0.9966],[0.4511,0.9907],[0.433,0.9821],[0.4159,0.971],[0.4,0.9576],[0.3855,0.942],[0.3723,0.9244],[0.3607,0.9051],[0.3509,0.884],[0.3429,0.8615],[0.3368,0.8378],[0.3323,0.8378],[0.3263,0.8615],[0.3182,0.884],[0.3083,0.9051],[0.2967,0.9244],[0.2836,0.942],[0.269,0.9576],[0.2531,0.971],[0.2361,0.9821],[0.218,0.9907],[0.199,0.9966],[0.1793,0.9996],[0.1576,0.9995],[0.1351,0.9955],[0.1136,0.9879],[0.0934,0.9768],[0.0746,0.9626],[0.0574,0.9454],[0.0421,0.9256],[0.0289,0.9033],[0.0179,0.879],[0.0093,0.8528],[0.0034,0.825],[0.0004,0.7958],[0.0,0.2192],[0.0015,0.1895],[0.006,0.1609],[0.0133,0.1339],[0.0231,0.1086],[0.0352,0.0853],[0.0495,0.0642],[0.0657,0.0457],[0.0837,0.0299],[0.1032,0.0172],[0.1241,0.0078],[0.1461,0.002],[0.169,0.0],[0.1891,0.0015],[0.2085,0.006],[0.2271,0.0133],[0.2447,0.0231],[0.2612,0.0354],[0.2764,0.0499],[0.2903,0.0665],[0.3027,0.085],[0.3134,0.1053],[0.3224,0.127],[0.3294,0.1502],[0.3344,0.1745],[0.3395,0.1502],[0.3465,0.127],[0.3555,0.1053],[0.3663,0.085],[0.3787,0.0665],[0.3926,0.0499],[0.4078,0.0354],[0.4243,0.0231],[0.4419,0.0133],[0.4605,0.006],[0.4799,0.0015],[0.5,0.0],[0.5201,0.0015],[0.5395,0.006],[0.5581,0.0133],[0.5757,0.0231],[0.5922,0.0354],[0.6074,0.0499],[0.6213,0.0665],[0.6337,0.085],[0.6444,0.1053],[0.6534,0.127],[0.6604,0.1502],[0.6654,0.1745],[0.6705,0.1502],[0.6775,0.127],[0.6865,0.1053],[0.6973,0.085],[0.7097,0.0665],[0.7236,0.0499],[0.7388,0.0354],[0.7553,0.0231],[0.7729,0.0133],[0.7915,0.006],[0.8109,0.0015],[0.831,0.0],[0.8539,0.002],[0.8759,0.0078],[0.8968,0.0172],[0.9163,0.0299],[0.9343,0.0457],[0.9505,0.0642],[0.9648,0.0853],[0.9769,0.1086],[0.9867,0.1339],[0.994,0.1609],[0.9985,0.1895],[1.0,0.2192]]]},"c":{"ar":1.1334,"sub":[[[0.5,0.0],[0.5342,0.0011],[0.5679,0.0042],[0.6008,0.0094],[0.633,0.0165],[0.6643,0.0254],[0.6947,0.0362],[0.7241,0.0488],[0.7524,0.0629],[0.7796,0.0787],[0.8056,0.0961],[0.8303,0.1149],[0.8536,0.135],[0.8755,0.1566],[0.8958,0.1793],[0.9146,0.2033],[0.9318,0.2284],[0.9471,0.2545],[0.9607,0.2816],[0.9724,0.3097],[0.9821,0.3386],[0.9898,0.3682],[0.9954,0.3986],[0.9988,0.4296],[1.0,0.4612],[1.0,1.0],[0.0,1.0],[0.0,0.4612],[0.0012,0.4296],[0.0046,0.3986],[0.0102,0.3682],[0.0179,0.3386],[0.0276,0.3097],[0.0393,0.2816],[0.0529,0.2545],[0.0682,0.2284],[0.0854,0.2033],[0.1042,0.1793],[0.1245,0.1566],[0.1464,0.135],[0.1697,0.1149],[0.1944,0.0961],[0.2204,0.0787],[0.2476,0.0629],[0.2759,0.0488],[0.3053,0.0362],[0.3357,0.0254],[0.367,0.0165],[0.3992,0.0094],[0.4321,0.0042],[0.4658,0.0011],[0.5,0.0]]]}};
const STARS = {"teal":"data:image/png;base64,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","gold":"data:image/png;base64,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"};

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
function refrescar(){ pintarEco(); pintarLista(); pintarHist(); }

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
async function armar(){
  const p = leerPeriodo(), vals = valoresForm(), ant = anteriores(p), rec = records(p);
  const imgs = {};
  for(const c of CATS) imgs[c.k] = await recorte(fotoActual(c.k), c.s);
  imgs.portada = await recorte(fotoActual("portada"), "a");
  return {
    p, txt: periodoTxt(p),
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
        esRec: now !== null && now > 0 && (r === undefined || now >= r),
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
  doc2.addImage(STARS.gold,"PNG",8.85,.45,.7,.7);
  doc2.addImage(STARS.teal,"PNG",.45,6.5,.5,.5);
  doc2.addImage("fotos/logo.png","PNG",.75,.65,.95,.95);
  doc2.addImage(D.imgs.portada.data,"PNG",4.95,1.55,5.05,5.05*D.imgs.portada.ar);
  doc2.setTextColor(...INK); doc2.setFont("helvetica","bold"); doc2.setFontSize(46);
  doc2.text("Tabla",.75,2.5);
  doc2.setTextColor(...TEAL); doc2.setFont("helvetica","normal"); doc2.setFontSize(34);
  doc2.text("comparativa",.75,3.2);
  doc2.setTextColor(...INK); doc2.setFont("helvetica","bold"); doc2.setFontSize(13);
  doc2.text(iglesia.nombre,.75,4.1);
  doc2.setTextColor(...SOFT); doc2.setFont("helvetica","normal"); doc2.setFontSize(11);
  doc2.text(iglesia.distrito,.75,4.42);
  doc2.text(iglesia.asociacion,.75,4.7);
  doc2.setDrawColor(...TEAL); doc2.setFillColor(255,255,255);
  doc2.roundedRect(.75,5.15,3.5,.55,.27,.27,"FD");
  doc2.setTextColor(...TEAL); doc2.setFont("helvetica","bold"); doc2.setFontSize(11);
  doc2.text(D.txt,2.5,5.49,{align:"center"});

  D.items.forEach((it,i) => {
    doc2.addPage([10,7.5],"landscape");
    doc2.addImage(D.bgS,"JPEG",0,0,10,7.5);
    doc2.addImage(i%2===0?STARS.teal:STARS.gold,"PNG",.55,6.35,.55,.55);
    const img = D.imgs[it.k], bw = 5.0, bh = bw*img.ar;
    doc2.addImage(img.data,"PNG",5.0,(7.5-bh)/2,bw,bh);

    doc2.setTextColor(...INK); doc2.setFont("helvetica","bold"); doc2.setFontSize(17);
    it.t.split("\n").forEach((ln,j) => doc2.text(ln,.75,1.35+j*.33));
    doc2.setTextColor(...MUT); doc2.setFontSize(8); doc2.text("ACTUAL",.75,2.72);
    doc2.setTextColor(...(it.now===null?MUT:INK));
    doc2.setFont("helvetica", it.now===null?"normal":"bold");
    doc2.setFontSize(it.now===null?46:(it.money?42:66));
    doc2.text(it.fNow,.75,3.75);
    if(it.arrow){
      doc2.setTextColor(...col(it.col)); doc2.setFont("helvetica","bold"); doc2.setFontSize(17);
      doc2.text(`${it.arrow} ${it.delta}`,2.65,3.5);
    }
    doc2.setTextColor(...MUT); doc2.setFont("helvetica","bold"); doc2.setFontSize(8);
    doc2.text("ANTERIOR",.75,4.92);
    doc2.setTextColor(...SOFT); doc2.setFontSize(16); doc2.text(it.fAnt,.75,5.3);
    if(it.esRec){
      doc2.setDrawColor(...GOLD); doc2.setFillColor(250,243,229);
      doc2.roundedRect(2.7,4.82,2.2,.56,.28,.28,"FD");
      doc2.setTextColor(...GOLD); doc2.setFontSize(9);
      doc2.text("NUEVO RECORD",3.8,5.16,{align:"center"});
    } else if(it.rec && it.rec>0){
      doc2.setTextColor(...MUT); doc2.setFontSize(8); doc2.text("RÉCORD",2.75,4.92);
      doc2.setTextColor(...GOLD); doc2.setFontSize(16); doc2.text(it.fRec,2.75,5.3);
    }
    doc2.setTextColor(...SOFT); doc2.setFont("helvetica","normal"); doc2.setFontSize(9);
    doc2.text(`${String(i+1).padStart(2,"0")} / 09`,9.4,7.05,{align:"right"});
  });

  doc2.addPage([10,7.5],"landscape");
  doc2.addImage(D.bgS,"JPEG",0,0,10,7.5);
  doc2.addImage(STARS.gold,"PNG",8.95,.5,.5,.5);
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
  s.addImage({data:STARS.gold,x:8.85,y:.45,w:.7,h:.7,transparency:45});
  s.addImage({data:STARS.teal,x:.45,y:6.5,w:.5,h:.5,transparency:55});
  s.addImage({path:"fotos/logo.png",x:.75,y:.65,w:.95,h:.95});
  s.addImage({data:D.imgs.portada.data,x:4.95,y:1.55,w:5.35,h:5.35*D.imgs.portada.ar,shadow:sh()});
  s.addText("Tabla",{x:.75,y:1.85,w:6,h:.9,fontFace:TF,fontSize:52,color:INK,isTextBox:true,margin:0,valign:"middle"});
  s.addText("comparativa",{x:.75,y:2.65,w:6,h:.75,fontFace:BF,fontSize:38,color:TEAL,isTextBox:true,margin:0,valign:"middle"});
  s.addText(iglesia.nombre,{x:.75,y:3.85,w:5,h:.35,fontFace:BF,bold:true,fontSize:15,color:INK,isTextBox:true,margin:0,charSpacing:1.5});
  s.addText(iglesia.distrito,{x:.75,y:4.22,w:5,h:.3,fontFace:BF,fontSize:13,color:SOFT,isTextBox:true,margin:0});
  s.addText(iglesia.asociacion,{x:.75,y:4.5,w:5,h:.3,fontFace:BF,fontSize:13,color:SOFT,isTextBox:true,margin:0});
  s.addShape("roundRect",{x:.75,y:5.15,w:3.5,h:.55,rectRadius:.27,fill:{color:"FFFFFF",transparency:25},line:{color:TEAL,width:1,transparency:55}});
  s.addText(D.txt,{x:.75,y:5.15,w:3.5,h:.55,fontFace:BF,bold:true,fontSize:12,color:TEAL,align:"center",valign:"middle",isTextBox:true,margin:0});

  D.items.forEach((it,i) => {
    const sl = pres.addSlide();
    sl.addImage({data:D.bgS,x:0,y:0,w:10,h:7.5});
    sl.addImage({data:i%2===0?STARS.teal:STARS.gold,x:.55,y:6.35,w:.55,h:.55,transparency:55});
    const img = D.imgs[it.k], bw = 5.15, bh = bw*img.ar;
    sl.addImage({data:img.data,x:5.15,y:(7.5-bh)/2,w:bw,h:bh,shadow:sh()});
    sl.addText(it.t,{x:.75,y:1.0,w:4.6,h:1.4,fontFace:TF,fontSize:19,color:INK,isTextBox:true,margin:0,valign:"top",lineSpacingMultiple:1.12});
    sl.addText("ACTUAL",{x:.75,y:2.52,w:2,h:.26,fontFace:BF,bold:true,fontSize:9,color:MUT,isTextBox:true,margin:0,charSpacing:2});
    sl.addText(it.fNow,{x:.72,y:2.72,w:3,h:1.6,fontFace:it.now===null?BF:TF,
      fontSize: it.now===null?60:(it.money?56:88), color: it.now===null?MUT:INK,
      isTextBox:true,margin:0,valign:"middle"});
    if(it.arrow) sl.addText(`${it.arrow} ${it.delta}`,{x:2.6,y:3.1,w:2.2,h:.6,fontFace:BF,bold:true,fontSize:20,color:col(it.col),isTextBox:true,margin:0,valign:"middle"});
    sl.addText("ANTERIOR",{x:.75,y:4.72,w:1.9,h:.26,fontFace:BF,bold:true,fontSize:9,color:MUT,isTextBox:true,margin:0,charSpacing:2});
    sl.addText(it.fAnt,{x:.75,y:4.96,w:1.9,h:.45,fontFace:BF,bold:true,fontSize:19,color:SOFT,isTextBox:true,margin:0,valign:"middle"});
    if(it.esRec){
      sl.addShape("roundRect",{x:2.7,y:4.78,w:2.15,h:.58,rectRadius:.29,fill:{color:GOLD,transparency:82},line:{color:GOLD,width:1,transparency:40}});
      sl.addText("★  NUEVO RÉCORD",{x:2.7,y:4.78,w:2.15,h:.58,fontFace:BF,bold:true,fontSize:10,color:GOLD,align:"center",valign:"middle",isTextBox:true,margin:0});
    } else if(it.rec && it.rec>0){
      sl.addText("RÉCORD",{x:2.75,y:4.72,w:1.9,h:.26,fontFace:BF,bold:true,fontSize:9,color:MUT,isTextBox:true,margin:0,charSpacing:2});
      sl.addText(it.fRec,{x:2.75,y:4.96,w:1.9,h:.45,fontFace:BF,bold:true,fontSize:19,color:GOLD,isTextBox:true,margin:0,valign:"middle"});
    }
    sl.addText(`${String(i+1).padStart(2,"0")} / 09`,{x:8.6,y:6.85,w:1,h:.32,fontFace:BF,fontSize:10,color:SOFT,align:"right",isTextBox:true,margin:0,charSpacing:1});
  });

  const rs = pres.addSlide();
  rs.addImage({data:D.bgS,x:0,y:0,w:10,h:7.5});
  rs.addImage({data:STARS.gold,x:8.95,y:.5,w:.5,h:.5,transparency:55});
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
const nombre = (p,ext) => `Tabla_comparativa_S${p.semana}_T${p.trimestre}_${p.anio}.${ext}`;

async function correr(fn, etiqueta){
  const bs = [el("btn-pdf"), el("btn-ppt"), el("btn-save")];
  bs.forEach(b => b.disabled = true);
  say(`Armando el ${etiqueta}…`,"work");
  try{ await fn(); say(`${etiqueta} descargado.`,"ok"); }
  catch(e){ console.error(e); say(`No se pudo armar el ${etiqueta}. Recarga la página e inténtalo otra vez.`,"err"); }
  bs.forEach(b => b.disabled = false);
}

/* ═══════════ arranque ═══════════ */
async function iniciar(){
  const hoy = hoyPeriodo();
  el("f-sem").value = hoy.semana;
  el("f-tri").value = hoy.trimestre;
  el("f-anio").value = hoy.anio;

  await cargarBanco();
  pintarThumbs();
  refrescar();

  ["f-sem","f-tri","f-anio"].forEach(id => el(id).addEventListener("change", refrescar));
  el("btn-save").addEventListener("click", guardar);
  el("btn-pdf").addEventListener("click", () => correr(hacerPDF,"PDF"));
  el("btn-ppt").addEventListener("click", () => correr(hacerPPT,"PowerPoint"));

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
