(function(){
"use strict";
var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
var K={lang:'rx.lang',theme:'rx.theme',data:'rx.data',opts:'rx.opts'};
var SAMPLE=JSON.parse($('#resume-data').textContent);
var REDUCED=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var hasMotion=(typeof window.Motion!=='undefined')&&window.Motion&&window.Motion.animate;

var STRINGS={
 en:{skip:'Skip to content',theme:'Theme',data:'Data',settings:'Settings',download_pdf:'Download PDF',import_json:'Import JSON',export_json:'Export current JSON',sample_json:'Download example JSON',reset_data:'Reset to sample',vcard_btn:'Download vCard (.vcf)',
 copied:'Copied to clipboard',imported_ok:'Resume updated from JSON',invalid_json:'Invalid JSON file',schema_issues:'Schema issues',reset_ok:'Sample data restored',exported_ok:'Downloaded',
 footer_note:'JSON-driven resume — edit the data, the document follows.',
 layout:'Layout',modern:'Modern',classic:'Classic',typography:'Typography',type_grot:'Grotesk',type_serif:'Serif',accent:'Accent color',motion:'Space effects',
 photo:'Photo',show:'Show',hide:'Hide',density:'Density',comfortable:'Comfortable',compact:'Compact',sections:'Sections',
 sec_highlights:'Key highlights',sec_timeline:'Career timeline',sec_casestudy:'Case study',sec_projects:'Projects',sec_testimonials:'Testimonials',sec_speaking:'Speaking & writing',sec_references:'References',sec_practices:'Practices',sec_community:'Community',sec_achievements:'Recognition',sec_interests:'Interests',sec_qr:'QR code',
 preview_back:'Back',preview_print:'Print / Save as PDF',preview_hint:'Choose “Save as PDF” as the destination in the print dialog.',pd_pages:'A4 pages',
 t_profile:'Profile',t_core:'Core competencies',t_industries:'Industries',t_engagement:'Open to',t_highlights:'Career highlights',t_timeline:'Career timeline',t_experience:'Experience',t_casestudy:'Signature case study',t_projects:'Selected Projects',t_testimonials:'Testimonials',t_speaking:'Speaking & Writing',t_references:'References',
 t_skills:'Skills',t_stack:'Tech Stack',t_practices:'Working practices',t_education:'Education',t_certs:'Certifications',t_languages:'Languages',t_achieve:'Recognition',t_community:'Community',t_interests:'Interests',
 cs_challenge:'Challenge',cs_approach:'Approach',cs_outcome:'Outcome',
 references:'References available upon request.',scan:'Scan for the online version',generated:'Generated'},
 fa:{skip:'پرش به محتوا',theme:'پوسته',data:'داده',settings:'تنظیمات',download_pdf:'دانلود PDF',import_json:'وارد کردن JSON',export_json:'خروجی JSON فعلی',sample_json:'دانلود نمونه JSON',reset_data:'بازنشانی به نمونه',vcard_btn:'دانلود کارت تماس (vCard)',
 copied:'در کلیپ‌بورد کپی شد',imported_ok:'رزومه از فایل JSON به‌روزرسانی شد',invalid_json:'فایل JSON نامعتبر است',schema_issues:'ایرادهای ساختاری داده',reset_ok:'دادهٔ نمونه بازیابی شد',exported_ok:'دانلود شد',
 footer_note:'رزومهٔ مبتنی بر JSON — داده را ویرایش کنید، سند به‌روزرسانی می‌شود.',
 layout:'چیدمان',modern:'مدرن',classic:'کلاسیک',typography:'تایپوگرافی',type_grot:'گروتسک',type_serif:'سریف',accent:'رنگ تاکیدی',motion:'جلوه‌های فضایی',
 photo:'عکس پروفایل',show:'نمایش',hide:'پنهان',density:'فشردگی',comfortable:'راحت',compact:'فشرده',sections:'بخش‌ها',
 sec_highlights:'نکات برجسته',sec_timeline:'خط زمانی',sec_casestudy:'مطالعهٔ موردی',sec_projects:'پروژه‌ها',sec_testimonials:'توصیه‌ها',sec_speaking:'سخنرانی و نوشتار',sec_references:'معرف‌ها',sec_practices:'روش‌های کاری',sec_community:'فعالیت اجتماعی',sec_achievements:'افتخارات',sec_interests:'علایق',sec_qr:'کد QR',
 preview_back:'بازگشت',preview_print:'چاپ / ذخیرهٔ PDF',preview_hint:'در پنجرهٔ چاپ، مقصد را «Save as PDF» انتخاب کنید.',pd_pages:'صفحهٔ A4',
 t_profile:'پروفایل',t_core:'شایستگی‌های کلیدی',t_industries:'حوزه‌های کاری',t_engagement:'علاقه‌مند به',t_highlights:'نکات برجستهٔ حرفه‌ای',t_timeline:'خط زمانی حرفه‌ای',t_experience:'تجربه کاری',t_casestudy:'مطالعهٔ موردی برجسته',t_projects:'پروژه‌های منتخب',t_testimonials:'توصیه‌ها',t_speaking:'سخنرانی‌ها و نوشتار',t_references:'معرف‌ها',
 t_skills:'مهارت‌ها',t_stack:'استک فنی',t_practices:'روش‌های کاری',t_education:'تحصیلات',t_certs:'گواهینامه‌ها',t_languages:'زبان‌ها',t_achieve:'افتخارات',t_community:'فعالیت‌های جمعی',t_interests:'علایق',
 cs_challenge:'چالش',cs_approach:'رویکرد',cs_outcome:'نتیجه',
 references:'ارائهٔ توصیه‌نامه در صورت درخواست.',scan:'برای نسخهٔ آنلاین اسکن کنید',generated:'تولیدشده'}
};
var THEMES=[
 {id:'gargantua',en:'Gargantua',fa:'سیاه‌چاله',sw:['#05060d','#f59e0b'],space:1},
 {id:'nebula',en:'Nebula',fa:'سحابی',sw:['#0e0b20','#a78bfa'],space:1},
 {id:'quasar',en:'Quasar',fa:'اختروشن',sw:['#071118','#22d3ee'],space:1},
 {id:'pulsar',en:'Pulsar',fa:'تپ‌اختر',sw:['#08130e','#34d399'],space:1},
 {id:'midnight',en:'Midnight',fa:'نیمه‌شب',sw:['#0d1220','#38bdf8'],space:0},
 {id:'paper',en:'Paper',fa:'کاغذی',sw:['#faf9f6','#a82016'],space:0},
 {id:'executive',en:'Executive',fa:'اجرایی',sw:['#f7f5ef','#1e3a5f'],space:0},
 {id:'minimal',en:'Minimal',fa:'مینیمال',sw:['#ffffff','#0c0c0c'],space:0}
];

var BH_PAL = {
  gargantua: {
    inner: '255, 246, 216',
    mid: '255, 196, 107',
    outer: '224, 90, 30',
    glow: '255, 168, 64'
  },
  nebula: {
    inner: '246, 240, 255',
    mid: '183, 148, 246',
    outer: '236, 72, 153',
    glow: '167, 139, 250'
  },
  quasar: {
    inner: '234, 252, 255',
    mid: '103, 232, 249',
    outer: '59, 130, 246',
    glow: '71, 192, 248'
  },
  pulsar: {
    inner: '234, 255, 243',
    mid: '110, 231, 183',
    outer: '13, 148, 136',
    glow: '52, 211, 153'
  }
};

var NEB = {
  gargantua: ['255, 158, 30', '120, 53, 15'],
  nebula: ['124, 58, 237', '236, 72, 153'],
  quasar: ['8, 145, 178', '37, 99, 235'],
  pulsar: ['16, 185, 129', '74, 222, 128']
};
var ACCENTS=['auto','#b42318','#1e3a5f','#0f766e','#6d28d9','#166534','#b45309','#0284c7'];
var DEF_OPTS={layout:'modern',photo:'on',density:'comfortable',typo:'grot',accent:'auto',motion:'on',
 secs:{highlights:1,timeline:1,casestudy:1,projects:1,testimonials:1,speaking:1,references:1,practices:1,community:1,achievements:1,interests:1,qr:1}};

var state={lang:'en',theme:'gargantua',data:SAMPLE,opts:JSON.parse(JSON.stringify(DEF_OPTS)),preview:false};
try{
  var sl=localStorage.getItem(K.lang); if(sl==='en'||sl==='fa')state.lang=sl;
  else if((navigator.language||'en').indexOf('fa')===0)state.lang='fa';
  var st=localStorage.getItem(K.theme); if(THEMES.some(function(t){return t.id===st}))state.theme=st;
  var so=localStorage.getItem(K.opts); if(so){var po=JSON.parse(so); if(po&&po.secs){state.opts={layout:po.layout||'modern',photo:po.photo||'on',density:po.density||'comfortable',typo:po.typo||'grot',accent:po.accent||'auto',motion:po.motion||'on',secs:Object.assign({},DEF_OPTS.secs,po.secs)}}}
  var sd=localStorage.getItem(K.data); if(sd){var pd=JSON.parse(sd); if(pd&&pd.profile&&pd.profile.name)state.data=pd;}
}catch(e){}

function T(k){return (STRINGS[state.lang]&&STRINGS[state.lang][k])||STRINGS.en[k]||k}
function L(v){if(v==null)return '';if(typeof v==='string')return v;return v[state.lang]!=null?v[state.lang]:(v.en!=null?v.en:'')}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function url(u){if(!u)return '#';if(/^https?:\/\//i.test(u))return u;return 'https://'+u}
function ic(n,c){return '<i data-lucide="'+n+'" class="'+(c||'w-3.5 h-3.5')+'" aria-hidden="true"></i>'}
function arr(v){return Array.isArray(v)?v:[]}
function secOn(k){return state.opts.secs[k]!==0}
function fmtNum(v,d){return v.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d})}
function faDigits(x){return String(x).replace(/\d/g,function(d){return '۰۱۲۳۴۵۶۷۸۹'[d]})}
function hexTriplet(h){var m=/^#([0-9a-f]{6})$/i.exec(h);if(!m)return null;var n=parseInt(m[1],16);return ((n>>16)&255)+' '+((n>>8)&255)+' '+(n&255)}
function initials(name){return String(name||'').split(/\s+/).map(function(w){return w.charAt(0)}).slice(0,2).join('').toUpperCase()}
function themeDef(){for(var i=0;i<THEMES.length;i++)if(THEMES[i].id===state.theme)return THEMES[i];return THEMES[0]}
var secCounter=0;
function secT(t){secCounter++;return '<div class="sec-title avoid-break"><span class="num ltr">'+String(secCounter).padStart(2,'0')+'</span><h2>'+esc(t)+'</h2><div class="rule"></div></div>'}

/* ================= SPACE ENGINE ================= */
var SP={scv:null,sctx:null,bcv:null,bctx:null,stars:[],shoots:[],parts:[],t:0,last:0,raf:null,nextShoot:0,bhCss:0};
function mixCol(a,b,t){
  var A=a.split(' ').map(Number),B=b.split(' ').map(Number),o=[];
  for(var i=0;i<3;i++)o.push(Math.round(A[i]+(B[i]-A[i])*t));
  return o.join(' ');
}
function spaceResize(){
  var dpr=Math.min(2,window.devicePixelRatio||1);
  SP.scv.width=Math.floor(window.innerWidth*dpr);SP.scv.height=Math.floor(window.innerHeight*dpr);
  SP.scv.style.width=window.innerWidth+'px';SP.scv.style.height=window.innerHeight+'px';
  SP.sctx.setTransform(dpr,0,0,dpr,0,0);
  var css=Math.min(330,window.innerWidth*0.74);
  SP.bhCss=css;
  SP.bcv.width=Math.floor(css*dpr);SP.bcv.height=Math.floor(css*dpr);
  SP.bctx.setTransform(dpr,0,0,dpr,0,0);
}
function genStars(){
  SP.stars=[];
  var cols=['255, 255, 255','214, 228, 255','255, 236, 200','190, 242, 255'];
  for(var i=0;i<240;i++){
    SP.stars.push({fx:Math.random(),fy:Math.random(),depth:0.25+Math.random()*0.75,
      sz:0.4+Math.random()*1.5,col:cols[(Math.random()*cols.length)|0],
      ph:Math.random()*6.283,tw:0.4+Math.random()*1.4});
  }
}
function genBH(){
  var pal=BH_PAL[state.theme]||BH_PAL.gargantua;
  SP.parts=[];
  for(var i=0;i<560;i++){
    var rr=1.42+Math.pow(Math.random(),0.85)*1.95;
    var heat=Math.pow(1-(rr-1.42)/1.95,1.15);
    var col=heat<0.5?mixCol(pal.outer,pal.mid,heat*2):mixCol(pal.mid,pal.inner,(heat-0.5)*2);
    SP.parts.push({rr:rr,a:Math.random()*6.283,sp:0.9*Math.pow(1/rr,1.5)*(0.85+Math.random()*0.3),
      sz:0.6+Math.random()*1.9,heat:heat,col:col});
  }
}
function drawSpace(now){
  var w=window.innerWidth,h=window.innerHeight,ctx=SP.sctx;
  ctx.clearRect(0,0,w,h);
  var nb=NEB[state.theme]||NEB.gargantua;
  var g1=ctx.createRadialGradient(w*0.22,h*0.28,0,w*0.22,h*0.28,Math.max(w,h)*0.55);
  g1.addColorStop(0,'rgba('+nb[0]+',0.085)');g1.addColorStop(1,'rgba('+nb[0]+',0)');
  ctx.fillStyle=g1;ctx.fillRect(0,0,w,h);
  var g2=ctx.createRadialGradient(w*0.78,h*0.64,0,w*0.78,h*0.64,Math.max(w,h)*0.5);
  g2.addColorStop(0,'rgba('+nb[1]+',0.065)');g2.addColorStop(1,'rgba('+nb[1]+',0)');
  ctx.fillStyle=g2;ctx.fillRect(0,0,w,h);
  var sc=window.scrollY||0;
  for(var i=0;i<SP.stars.length;i++){
    var s=SP.stars[i];
    var y=(s.fy*h+sc*s.depth*0.05)%(h+30)-15;
    var al=(0.35+0.65*s.depth)*(0.55+0.45*Math.sin(now*0.001*s.tw+s.ph));
    ctx.fillStyle='rgba('+s.col+','+al.toFixed(3)+')';
    var sz=s.sz*(0.7+0.5*s.depth);
    ctx.fillRect(s.fx*w,y,sz,sz);
  }
  if(now>SP.nextShoot){
    SP.nextShoot=now+6500+Math.random()*9000;
    if(SP.shoots.length<2)SP.shoots.push({x:Math.random()*w*0.7+w*0.1,y:Math.random()*h*0.3,vx:(5+Math.random()*4)*(Math.random()>0.5?1:-1),vy:2+Math.random()*2,life:1});
  }
  ctx.globalCompositeOperation='lighter';
  for(var j=SP.shoots.length-1;j>=0;j--){
    var p=SP.shoots[j];
    p.x+=p.vx;p.y+=p.vy;p.life-=0.016;
    if(p.life<=0||p.x<-60||p.x>w+60||p.y>h+60){SP.shoots.splice(j,1);continue}
    var gr=ctx.createLinearGradient(p.x,p.y,p.x-p.vx*13,p.y-p.vy*13);
    gr.addColorStop(0,'rgba(255, 255, 255,'+(0.85*p.life).toFixed(3)+')');
    gr.addColorStop(1,'rgba(255, 255, 255,0)');
    ctx.strokeStyle=gr;ctx.lineWidth=1.4;
    ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*13,p.y-p.vy*13);ctx.stroke();
  }
  ctx.globalCompositeOperation='source-over';
}
function drawBH(now){
  var pal=BH_PAL[state.theme]||BH_PAL.gargantua;
  var S=SP.bhCss,ctx=SP.bctx;
  ctx.clearRect(0,0,S,S);
  var cx=S/2,R=S*0.155;
  var amb=ctx.createRadialGradient(cx,cx,R*0.7,cx,cx,R*3.4);
  amb.addColorStop(0,'rgba('+pal.glow+',0.30)');amb.addColorStop(0.45,'rgba('+pal.glow+',0.10)');amb.addColorStop(1,'rgba('+pal.glow+',0)');
  ctx.fillStyle=amb;ctx.fillRect(0,0,S,S);
  ctx.globalCompositeOperation='lighter';
  [1.65,2.15,2.7].forEach(function(k,idx){
    ctx.beginPath();ctx.ellipse(cx,cx,R*k,R*k*0.34,0,0,6.283);
    ctx.strokeStyle='rgba('+pal.mid+','+(0.05+idx*0.012)+')';
    ctx.lineWidth=R*0.5;ctx.shadowBlur=R*0.7;ctx.shadowColor='rgba('+pal.glow+',0.5)';ctx.stroke();
  });
  ctx.shadowBlur=0;
  function lens(rx,ry,a0,a1,wd,al,col){
    ctx.beginPath();ctx.ellipse(cx,cx,rx,ry,0,a0,a1);
    ctx.strokeStyle='rgba('+col+','+al+')';ctx.lineWidth=wd;
    ctx.shadowBlur=R*0.75;ctx.shadowColor='rgba('+pal.glow+',0.8)';ctx.stroke();ctx.shadowBlur=0;
  }
  lens(R*1.5,R*1.0,Math.PI,Math.PI*2,R*0.30,0.42,pal.mid);
  lens(R*1.44,R*0.96,Math.PI*1.08,Math.PI*1.92,R*0.09,0.8,pal.inner);
  lens(R*1.42,R*0.94,0,Math.PI,R*0.26,0.3,pal.mid);
  var sq=0.34;
  function drawPart(p){
    var th=p.a+SP.t*p.sp;
    var x=cx+Math.cos(th)*p.rr*R;
    var y=cx+Math.sin(th)*p.rr*R*sq;
    var dop=1+0.85*Math.max(0,-Math.cos(th));
    var al=Math.min(1,(0.22+0.78*p.heat)*dop);
    ctx.fillStyle='rgba('+p.col+','+al.toFixed(3)+')';
    ctx.beginPath();ctx.arc(x,y,p.sz*(0.7+0.6*p.heat),0,6.283);ctx.fill();
  }
  var i,p;
  for(i=0;i<SP.parts.length;i++){p=SP.parts[i];if(Math.sin(p.a+SP.t*p.sp)<0)drawPart(p)}
  ctx.globalCompositeOperation='source-over';
  ctx.fillStyle='#020205';
  ctx.beginPath();ctx.arc(cx,cx,R,0,6.283);ctx.fill();
  ctx.globalCompositeOperation='lighter';
  var hot=ctx.createRadialGradient(cx-R*2.05,cx,0,cx-R*2.05,cx,R*1.7);
  hot.addColorStop(0,'rgba('+pal.glow+',0.20)');hot.addColorStop(1,'rgba('+pal.glow+',0)');
  ctx.fillStyle=hot;ctx.fillRect(0,0,S,S);
  ctx.beginPath();ctx.arc(cx,cx,R*1.055,0,6.283);
  ctx.strokeStyle='rgba('+pal.inner+',0.95)';ctx.lineWidth=2.2;
  ctx.shadowBlur=22;ctx.shadowColor='rgba('+pal.glow+',0.9)';ctx.stroke();
  ctx.beginPath();ctx.arc(cx,cx,R*1.17,0,6.283);
  ctx.strokeStyle='rgba('+pal.mid+',0.5)';ctx.lineWidth=1;
  ctx.shadowBlur=12;ctx.stroke();ctx.shadowBlur=0;
  for(i=0;i<SP.parts.length;i++){p=SP.parts[i];if(Math.sin(p.a+SP.t*p.sp)>=0)drawPart(p)}
  ctx.globalCompositeOperation='source-over';
}
function spaceActive(){return !!themeDef().space&&!state.preview&&state.opts.motion==='on'&&document.documentElement.dataset.pd!=='1'}
function shouldRun(){return spaceActive()&&!document.hidden&&!REDUCED}
function tick(now){
  if(!shouldRun()){SP.raf=null;return}
  var dt=Math.min(0.05,(now-SP.last)/1000||0.016);
  SP.last=now;SP.t+=dt;
  drawSpace(now);drawBH(now);
  SP.raf=requestAnimationFrame(tick);
}
function maybeSpace(){
  if(shouldRun()&&!SP.raf){SP.last=performance.now();SP.raf=requestAnimationFrame(tick)}
  if(!shouldRun()&&SP.raf){cancelAnimationFrame(SP.raf);SP.raf=null}
  if(REDUCED&&spaceActive()){drawSpace(performance.now());SP.t=2.2;drawBH(performance.now())}
}
document.addEventListener('visibilitychange',maybeSpace);

/* ================= QR ================= */
function qrSvg(text){
  try{
    if(typeof window.qrcode!=='function')return '';
    var q=window.qrcode(0,'M');q.addData(text);q.make();
    var n=q.getModuleCount(),cells='';
    for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(q.isDark(r,c))cells+='<rect x="'+c+'" y="'+r+'" width="1.02" height="1.02"/>';
    return '<svg viewBox="0 0 '+n+' '+n+'" shape-rendering="crispEdges" class="w-full h-auto" role="img" aria-label="QR code"><rect width="'+n+'" height="'+n+'" fill="rgb(var(--card))"/><g fill="rgb(var(--ink))">'+cells+'</g></svg>';
  }catch(e){return ''}
}

/* ================= BUILDERS ================= */
function contactChips(p){
  // SVGهای برند که از Lucide حذف شدن
  var brandIcons = {
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 shrink-0"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 shrink-0"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`
  };

  var items=[
    {icon:'mail',txt:p.email,act:'copy',val:p.email},
    {icon:'phone',txt:p.phone,act:'copy',val:p.phone},
    {icon:'map-pin',txt:L(p.location)},
    {icon:'globe',txt:p.website,href:url(p.website)},
    {icon:'github',txt:p.github,href:url(p.github)},
    {icon:'linkedin',txt:p.linkedin,href:url(p.linkedin)}
  ].filter(function(x){return x.txt});

  return items.map(function(x){
    // اگر آیکون برند بود از SVG استفاده کن، وگرنه از ic() معمولی
    var iconHtml = brandIcons[x.icon] 
      ? brandIcons[x.icon] 
      : ic(x.icon,'w-3.5 h-3.5 shrink-0');

    var inner = iconHtml + '<span class="ltr">' + esc(x.txt) + '</span>' + 
                (x.act==='copy' ? ic('copy','w-3 h-3 shrink-0 opacity-50') : '');

    if(x.href){
      return '<a class="contact-chip" href="'+esc(x.href)+'" target="_blank" rel="noopener">'+inner+'</a>';
    }
    return '<button class="contact-chip" data-action="copy" data-value="'+esc(x.val)+'" aria-label="Copy">'+inner+'</button>';
  }).join('');
}
function buildHeader(d){
  var p=d.profile||{};
  return '<div class="avoid-break"><div class="flex flex-col md:flex-row gap-7 md:gap-9 md:items-center">'+
    (p.photo?'<div class="shrink-0 mx-auto md:mx-0"><div class="photo-ring"><img src="'+esc(p.photo)+'" alt="'+esc(p.name)+'" width="148" height="148" loading="lazy" decoding="async" class="w-[124px] h-[124px] sm:w-[148px] sm:h-[148px] object-cover">'+(p.available?'<span class="status-dot" title="'+esc(L(p.available))+'"></span>':'')+'</div></div>':'')+
    '<div class="flex-1 min-w-0">'+
      '<h1 class="font-disp font-bold text-[2rem] sm:text-[2.7rem] leading-[1.06] tracking-tight break-words">'+esc(p.name||'')+'</h1>'+
      '<p class="t-acc font-disp font-semibold text-base sm:text-lg mt-1.5">'+esc(L(p.title))+'</p>'+
      '<p class="mono-label mt-2">'+esc(L(p.tagline))+'</p>'+
      (p.available?'<p class="flex items-center gap-2 mt-3 text-[11.5px] font-medium" style="color:#16a34a"><span class="w-1.5 h-1.5 rounded-full" style="background:#22c55e"></span>'+esc(L(p.available))+'</p>':'')+
      '<div class="flex flex-wrap gap-1.5 mt-4">'+contactChips(p)+'</div>'+
    '</div>'+
  '</div></div>';
}
function buildStats(d){
  var s=arr(d.stats); if(!s.length)return '';
  return '<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 avoid-break" style="border-top:1px solid rgb(var(--brd))">'+
  s.map(function(m,i){
    var num=m.num!=null;
    return '<div class="reveal" style="transition-delay:'+(i*0.07)+'s"><p class="font-disp font-bold text-[1.55rem] leading-none t-acc ltr tabular">'+(num?'<span data-count="'+m.num+'" data-dec="'+(m.dec||0)+'" data-suf="'+esc(m.suf||'')+'">0</span>':esc(m.value||''))+'</p><p class="text-mut text-[10.5px] mt-1.5 font-medium">'+esc(L(m.label))+'</p></div>';
  }).join('')+'</div>';
}
function buildHighlights(d){
  var h=arr(d.highlights); if(!h.length||!secOn('highlights'))return '';
  return '<section class="mt-9">'+secT(T('t_highlights'))+'<div class="hl-grid">'+
  h.map(function(x,i){
    return '<div class="hl-card reveal avoid-break" style="transition-delay:'+(i*0.06)+'s with">'+
      '<span class="t-acc">'+ic(x.icon||'zap','w-4 h-4')+'</span>'+
      '<p class="text-[12px] font-semibold leading-[1.55] mt-2">'+esc(L(x.text))+'</p>'+
      '<p class="font-mono text-[9.5px] t-acc mt-1.5 ltr">'+esc(L(x.metric))+'</p>'+
    '</div>';
  }).join('')+'</div></section>';
}
function buildTimeline(d){
  var x=arr(d.experience); if(!x.length||!secOn('timeline'))return '';
  var items=x.map(function(e,i){
    return '<div class="relative pt-5 min-w-[190px] shrink-0 reveal avoid-break" style="transition-delay:'+(i*0.06)+'s">'+
      '<span class="absolute top-0 start-0 w-2.5 h-2.5 rounded-full border-2" style="border-color:rgb(var(--acc));background:rgb(var(--card))"></span>'+
      '<p class="font-mono text-[9.5px] text-mut ltr">'+esc(L(e.dates))+'</p>'+
      '<p class="text-[12.5px] font-semibold mt-1">'+esc(L(e.role))+'</p>'+
      '<p class="text-[11px] t-acc">@ '+esc(e.company)+'</p>'+
    '</div>';
  }).join('');
  return '<section class="mt-9">'+secT(T('t_timeline'))+
    '<div class="relative overflow-x-auto pb-1"><div class="absolute top-[4px] inset-x-0 hairline"></div><div class="flex gap-8 min-w-max">'+items+'</div></div>'+
  '</section>';
}
function buildExperience(d){
  var x=arr(d.experience); if(!x.length)return '';
  return '<section class="mt-9">'+secT(T('t_experience'))+'<div>'+
  x.map(function(e,i){
    return '<div class="xp-item reveal avoid-break" style="transition-delay:'+(i*0.06)+'s">'+
      '<div class="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">'+
        '<h3 class="font-disp font-bold text-[15px]">'+esc(L(e.role))+'</h3>'+
        '<span class="text-[13px] font-semibold t-acc">@ '+esc(e.company||'')+'</span>'+
        '<span class="mono-label ms-auto ltr">'+esc(L(e.dates))+'</span>'+
      '</div>'+
      '<p class="text-mut text-[10.5px] mt-1">'+esc(L(e.location))+(e.current?' · <span class="t-acc">'+(state.lang==='fa'?'اکنون':'Present')+'</span>':'')+'</p>'+
      '<p class="text-[12.5px] text-mut leading-[1.8] mt-2">'+esc(L(e.description))+'</p>'+
      (arr(e.achievements).length?'<ul class="mt-2.5 space-y-1.5">'+arr(e.achievements).map(function(a){return '<li class="flex gap-2.5 text-[12.5px] leading-[1.7]"><span class="t-acc mt-[5px] shrink-0">'+ic('check','w-3.5 h-3.5')+'</span><span>'+esc(L(a))+'</span></li>'}).join('')+'</ul>':'')+
      (arr(e.technologies).length?'<div class="flex flex-wrap gap-1.5 mt-3">'+arr(e.technologies).map(function(t){return '<span class="chip ltr">'+esc(t)+'</span>'}).join('')+'</div>':'')+
    '</div>';
  }).join('')+'</div></section>';
}
function buildCaseStudy(d){
  var c=d.caseStudy; if(!c||!secOn('casestudy'))return '';
  function block(label,txt){return '<div><p class="mono-label mb-1.5">'+esc(label)+'</p><p class="text-[12px] text-mut leading-[1.75]">'+esc(txt)+'</p></div>'}
  return '<section class="mt-9">'+secT(T('t_casestudy'))+
    '<div class="ref-card reveal avoid-break">'+
      '<h3 class="font-disp font-bold text-[15px]">'+esc(L(c.title))+'</h3>'+
      '<div class="grid sm:grid-cols-3 gap-4 mt-4">'+
        block(T('cs_challenge'),L(c.challenge))+
        block(T('cs_approach'),L(c.approach))+
        block(T('cs_outcome'),L(c.outcome))+
      '</div>'+
      (arr(c.metrics).length?'<div class="flex flex-wrap gap-1.5 mt-4">'+arr(c.metrics).map(function(m){return '<span class="chip" style="color:rgb(var(--acc));border-color:rgb(var(--acc)/.35)">'+esc(L(m))+'</span>'}).join('')+'</div>':'')+
      (arr(c.tech).length?'<div class="flex flex-wrap gap-1.5 mt-2">'+arr(c.tech).map(function(t){return '<span class="chip ltr">'+esc(t)+'</span>'}).join('')+'</div>':'')+
    '</div></section>';
}
function buildProjects(d){
  var p=arr(d.projects); if(!p.length||!secOn('projects'))return '';
  return '<section class="mt-9">'+secT(T('t_projects'))+'<div>'+
  p.map(function(pr,i){
    return '<div class="proj-row reveal avoid-break" style="transition-delay:'+(i*0.05)+'s">'+
      '<div class="flex flex-wrap items-baseline gap-x-3 gap-y-0.5"><h3 class="font-disp font-bold text-[13.5px] ltr">'+esc(pr.name)+'</h3><span class="font-mono text-[9.5px] text-mut ltr">'+esc(pr.tech||'')+'</span></div>'+
      '<p class="text-[12.5px] text-mut leading-[1.7] mt-1">'+esc(L(pr.note))+'</p>'+
    '</div>';
  }).join('')+'</div></section>';
}
function buildTestimonials(d){
  var t=arr(d.testimonials); if(!t.length||!secOn('testimonials'))return '';
  return '<section class="mt-9">'+secT(T('t_testimonials'))+'<div class="grid sm:grid-cols-2 gap-3">'+
  t.map(function(x,i){
    return '<div class="ref-card reveal avoid-break" style="transition-delay:'+(i*0.06)+'s">'+
      '<span class="t-acc">'+ic('quote','w-4 h-4')+'</span>'+
      '<p class="text-[12.5px] leading-[1.8] mt-2">'+esc(L(x.quote))+'</p>'+
      '<p class="text-[11.5px] font-semibold mt-3">'+esc(x.name)+'</p>'+
      '<p class="text-[10.5px] t-acc">'+esc(L(x.role))+'</p>'+
    '</div>';
  }).join('')+'</div></section>';
}
function buildSpeaking(d){
  var s=arr(d.speaking); if(!s.length||!secOn('speaking'))return '';
  return '<section class="mt-9">'+secT(T('t_speaking'))+'<ul class="space-y-2.5">'+
  s.map(function(x,i){
    return '<li class="flex items-start gap-2.5 reveal" style="transition-delay:'+(i*0.05)+'s">'+
      '<span class="t-acc mt-[3px] shrink-0">'+ic(x.type==='writing'?'newspaper':'mic','w-3.5 h-3.5')+'</span>'+
      '<span class="flex-1 text-[12.5px]"><span class="font-semibold">'+esc(L(x.title))+'</span> <span class="text-mut">— '+esc(L(x.venue))+'</span></span>'+
      '<span class="chip ltr shrink-0">'+esc(x.year)+'</span></li>';
  }).join('')+'</ul></section>';
}
function buildReferences(d){
  var r=arr(d.references); if(!r.length||!secOn('references'))return '';
  return '<section class="mt-9">'+secT(T('t_references'))+'<div class="grid sm:grid-cols-2 gap-3">'+
  r.map(function(x,i){
    return '<div class="ref-card reveal avoid-break" style="transition-delay:'+(i*0.06)+'s">'+
      '<div class="flex items-center gap-3"><span class="ref-avatar">'+esc(initials(x.name))+'</span><div class="min-w-0"><p class="text-[12.5px] font-semibold">'+esc(x.name)+'</p><p class="text-[11px] t-acc">'+esc(L(x.role))+'</p></div></div>'+
      '<p class="text-[11px] text-mut mt-2">'+esc(L(x.relation))+'</p>'+
      '<button class="contact-chip mt-2.5 w-full justify-center" data-action="copy" data-value="'+esc(x.contact)+'">'+ic('mail','w-3 h-3')+'<span class="ltr">'+esc(x.contact)+'</span>'+ic('copy','w-3 h-3 opacity-50')+'</button>'+
    '</div>';
  }).join('')+'</div></section>';
}
function sideCard(title,body){return '<div class="side-card avoid-break">'+secT(title)+body+'</div>'}
function buildSidebar(d){
  var out='';
  if(arr(d.skills).length){
    out+=sideCard(T('t_skills'),'<div class="space-y-4">'+arr(d.skills).map(function(cat){
      return '<div><p class="text-[10.5px] font-semibold mb-2 text-mut">'+esc(L(cat.category))+'</p><div class="space-y-2.5">'+
      arr(cat.items).map(function(s){return '<div><div class="flex items-baseline justify-between mb-1"><span class="text-[11.5px] font-medium ltr">'+esc(s.name)+'</span><span class="font-mono text-[9px] text-mut ltr tabular">'+(s.level||0)+'%</span></div><div class="bar"><span class="bar-fill" data-w="'+(s.level||0)+'" style="--w:'+(s.level||0)+'%"></span></div></div>'}).join('')+
      '</div></div>';
    }).join('')+'</div>');
  }
  if(arr(d.techStack).length)out+=sideCard(T('t_stack'),'<div class="flex flex-wrap gap-1.5">'+arr(d.techStack).map(function(t){return '<span class="chip ltr">'+esc(t)+'</span>'}).join('')+'</div>');
  if(arr(d.practices).length&&secOn('practices')){
    out+=sideCard(T('t_practices'),'<div class="flex flex-wrap gap-1.5">'+arr(d.practices).map(function(p){return '<span class="chip">'+esc(L(p))+'</span>'}).join('')+'</div>');
  }
  if(arr(d.community).length&&secOn('community')){
    out+=sideCard(T('t_community'),'<ul class="space-y-3">'+arr(d.community).map(function(c){
      return '<li><p class="text-[12px] font-semibold">'+esc(L(c.role))+'</p><p class="text-[11px] t-acc">'+esc(L(c.org))+'</p><p class="font-mono text-[9px] text-mut mt-0.5 ltr">'+esc(L(c.dates))+'</p></li>';
    }).join('')+'</ul>');
  }
  if(arr(d.education).length){
    out+=sideCard(T('t_education'),arr(d.education).map(function(e){
      return '<div><p class="text-[12.5px] font-semibold">'+esc(L(e.degree))+'</p><p class="text-[11.5px] t-acc mt-0.5">'+esc(L(e.school))+'</p><p class="font-mono text-[9.5px] text-mut mt-1 ltr">'+esc(L(e.dates))+'</p></div>';
    }).join(''));
  }
  if(arr(d.certifications).length){
    out+=sideCard(T('t_certs'),'<ul class="space-y-2">'+arr(d.certifications).map(function(c){
      return '<li class="flex items-center justify-between gap-2 text-[11.5px]"><span class="ltr">'+esc(c.name)+'</span><span class="chip ltr shrink-0">'+esc(c.year)+'</span></li>';
    }).join('')+'</ul>');
  }
  if(arr(d.languages).length){
    out+=sideCard(T('t_languages'),'<ul class="space-y-2.5">'+arr(d.languages).map(function(l){
      return '<li class="flex items-center justify-between gap-2"><div><p class="text-[12px] font-medium">'+esc(L(l.name))+'</p><p class="text-mut text-[9.5px]">'+esc(L(l.level))+'</p></div><span class="flex gap-1" dir="ltr">'+[1,2,3,4,5].map(function(x){return '<span class="w-1.5 h-1.5 rounded-full '+(x<=(l.dots||0)?'bg-acc':'bg-ink/15')+'"></span>'}).join('')+'</span></li>';
    }).join('')+'</ul>');
  }
  if(arr(d.achievements).length&&secOn('achievements')){
    out+=sideCard(T('t_achieve'),'<ul class="space-y-2">'+arr(d.achievements).map(function(a){
      return '<li class="flex gap-2 text-[11.5px] leading-[1.65]"><span class="t-acc mt-[3px] shrink-0">'+ic('award','w-3.5 h-3.5')+'</span><span>'+esc(L(a.text))+'</span></li>';
    }).join('')+'</ul>');
  }
  if(arr(d.interests).length&&secOn('interests')){
    out+=sideCard(T('t_interests'),'<div class="flex flex-wrap gap-1.5">'+arr(d.interests).map(function(x){return '<span class="chip">'+esc(L(x))+'</span>'}).join('')+'</div>');
  }
  return out;
}
function buildFooter(d){
  var p=d.profile||{};
  var genDate='';try{genDate=new Intl.DateTimeFormat(state.lang==='fa'?'fa-IR':'en-GB',{month:'short',year:'numeric'}).format(new Date())}catch(e){}
  var qr='';
  if(secOn('qr')&&p.website){
    var svg=qrSvg(url(p.website));
    if(svg)qr='<div class="flex items-center gap-4 avoid-break"><div class="qr-box">'+svg+'</div><div><p class="text-[11.5px] font-semibold">'+esc(T('scan'))+'</p><p class="font-mono text-[10px] text-mut mt-1 ltr">'+esc(p.website)+'</p></div></div>';
  }
  var upd=(d.meta&&d.meta.updated)?L(d.meta.updated):'';
  return '<div class="mt-10 pt-6 avoid-break" style="border-top:1px solid rgb(var(--brd))">'+
    '<div class="flex items-start gap-4"><span class="quote-mark leading-none">“</span><div><p class="font-disp font-semibold text-[14px] leading-relaxed">'+esc(L(d.philosophy))+'</p><p class="mono-label mt-2">'+esc(T('references'))+'</p></div></div>'+
    '<div class="flex flex-wrap items-center justify-between gap-4 mt-6">'+
      qr+
      '<p class="mono-label ltr ms-auto">'+(upd?esc(upd)+' · ':'')+esc(T('generated'))+' · '+esc(genDate)+'</p>'+
    '</div>'+
  '</div>';
}
function buildDoc(){
  var d=state.data;secCounter=0;
  var extra='';
  if(arr(d.competencies).length)extra+='<p class="mono-label mt-4 mb-2">'+esc(T('t_core'))+'</p><div class="flex flex-wrap gap-1.5">'+arr(d.competencies).map(function(c){return '<span class="chip">'+esc(L(c))+'</span>'}).join('')+'</div>';
  if(arr(d.industries).length)extra+='<p class="mono-label mt-4 mb-2">'+esc(T('t_industries'))+'</p><div class="flex flex-wrap gap-1.5">'+arr(d.industries).map(function(c){return '<span class="chip">'+esc(L(c))+'</span>'}).join('')+'</div>';
  if(arr(d.engagement).length)extra+='<p class="mono-label mt-4 mb-2">'+esc(T('t_engagement'))+'</p><div class="flex flex-wrap gap-1.5">'+arr(d.engagement).map(function(c){return '<span class="chip" style="color:rgb(var(--acc));border-color:rgb(var(--acc)/.35)">'+esc(L(c))+'</span>'}).join('')+'</div>';
  $('#doc').innerHTML=
    buildHeader(d)+buildStats(d)+
    '<div id="doc-grid" class="grid lg:grid-cols-[1.8fr_1fr] gap-10 lg:gap-12 mt-9">'+
      '<div><section>'+secT(T('t_profile'))+'<p class="text-[13px] leading-[1.9] text-mut">'+esc(L(d.summary))+'</p>'+extra+'</section>'+
      buildHighlights(d)+ //buildTimeline(d)+
      buildExperience(d)+buildCaseStudy(d)+buildProjects(d)+buildTestimonials(d)+buildSpeaking(d)+buildReferences(d)+'</div>'+
      '<aside>'+buildSidebar(d)+'</aside>'+
    '</div>'+buildFooter(d);
  $('#wm').textContent=initials(d.profile&&d.profile.name);
}

/* ================= META / STATIC ================= */
function injectMeta(){
  var p=state.data.profile||{};
  document.title=(p.name||'Resume')+' — '+L(p.title);
  var desc=String(L(state.data.summary)).slice(0,160);
  var set=function(sel,attr,val){var m=document.querySelector(sel);if(m)m.setAttribute(attr,val)};
  set('meta[name="description"]','content',desc);
  set('meta[property="og:title"]','content',document.title);
  set('meta[property="og:description"]','content',desc);
  $('#jsonld').textContent=JSON.stringify({"@context":"https://schema.org","@type":"Person","name":p.name,"jobTitle":L(p.title),"email":p.email});
  $('#brand-name').textContent=String(p.name||'resume').toLowerCase().replace(/\s+/g,'.').replace(/[^\w.\-]/g,'');
}
function buildAccRow(){
  $('#acc-row').innerHTML=ACCENTS.map(function(a){
    if(a==='auto')return '<button class="acc-sw acc-auto" data-accent="auto" aria-pressed="'+String(state.opts.accent==='auto')+'" aria-label="Auto accent">A</button>';
    return '<button class="acc-sw" style="background:'+a+'" data-accent="'+a+'" aria-pressed="'+String(state.opts.accent===a)+'" aria-label="'+a+'"></button>';
  }).join('');
}
function updateStatic(){
  $$('[data-i18n]').forEach(function(el){el.textContent=T(el.dataset.i18n)});
  $$('[data-i18n-aria]').forEach(function(el){el.setAttribute('aria-label',T(el.dataset.i18nAria))});
  $('#seg-en').setAttribute('aria-pressed',String(state.lang==='en'));
  $('#seg-fa').setAttribute('aria-pressed',String(state.lang==='fa'));
  $('#pop-theme').innerHTML=THEMES.map(function(t){
    return '<button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-chip '+(state.theme===t.id?'t-acc':'')+'" data-action="set-theme" data-value="'+t.id+'">'+
    '<span class="w-5 h-5 rounded-md shrink-0" style="background:linear-gradient(135deg,'+t.sw[0]+' 50%,'+t.sw[1]+' 50%);border:1px solid rgb(var(--brd))"></span>'+
    '<span class="flex-1 text-start">'+(state.lang==='fa'?t.fa:t.en)+'</span>'+
    (t.space?ic('orbit','w-3.5 h-3.5 t-acc'):'')+
    (state.theme===t.id?ic('check','w-4 h-4'):'')+'</button>';
  }).join('');
  buildAccRow();
  refreshSettings();
  if(window.lucide)lucide.createIcons();
}
function refreshSettings(){
  $$('[data-opt]').forEach(function(b){b.setAttribute('aria-pressed',String(state.opts[b.dataset.opt]===b.dataset.value))});
  $$('[data-sec]').forEach(function(b){b.setAttribute('aria-pressed',String(secOn(b.dataset.sec)))});
  $$('#acc-row .acc-sw').forEach(function(b){b.setAttribute('aria-pressed',String(state.opts.accent===b.dataset.accent))});
}

/* ================= ANIMATION ================= */
function finalizeReveals(){
  $$('.reveal').forEach(function(el){el.classList.add('in')});
  $$('.bar-fill').forEach(function(el){el.style.width=el.dataset.w+'%'});
  $$('[data-count]').forEach(function(el){el.textContent=fmtNum(parseFloat(el.dataset.count),parseInt(el.dataset.dec||0))+(el.dataset.suf||'')});
}
function animateCount(el){
  var target=parseFloat(el.dataset.count),dec=parseInt(el.dataset.dec||'0',10),suf=el.dataset.suf||'';
  if(REDUCED){el.textContent=fmtNum(target,dec)+suf;return}
  var t0=performance.now(),dur=1500;
  (function frame(t){
    var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(2,-10*p);
    el.textContent=fmtNum(target*e,dec)+suf;
    if(p<1)requestAnimationFrame(frame);else el.textContent=fmtNum(target,dec)+suf;
  })(t0);
}
function afterRender(){
  if(window.lucide)lucide.createIcons();
  if(REDUCED){finalizeReveals();return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
  $$('.reveal').forEach(function(el){io.observe(el)});
  var bo=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.style.width=e.target.dataset.w+'%';bo.unobserve(e.target)}})},{threshold:.3});
  $$('.bar-fill').forEach(function(el){bo.observe(el)});
  var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){animateCount(e.target);co.unobserve(e.target)}})},{threshold:.4});
  $$('[data-count]').forEach(function(el){co.observe(el)});
}
function render(){buildDoc();afterRender();injectMeta()}

/* ================= OPTIONS ================= */
function persistOpts(){try{localStorage.setItem(K.opts,JSON.stringify(state.opts))}catch(e){}}
function applyAccent(){
  var h=document.documentElement,v=state.opts.accent;
  if(v==='auto'){h.style.removeProperty('--acc');h.style.removeProperty('--acc2');h.style.removeProperty('--acc-p')}
  else{var t=hexTriplet(v);if(t){h.style.setProperty('--acc',t);h.style.setProperty('--acc2',t);h.style.setProperty('--acc-p',t)}}
}
function setOpt(k,v){
  state.opts[k]=v;persistOpts();
  document.documentElement.dataset[k]=v;
  if(k==='accent')applyAccent();
  if(k==='motion')maybeSpace();
  refreshSettings();
}
function setAccent(v){state.opts.accent=v;persistOpts();applyAccent();refreshSettings()}
function toggleSec(k){state.opts.secs[k]=secOn(k)?0:1;persistOpts();refreshSettings();render()}

/* ================= LANGUAGE / THEME ================= */
function setLang(l){
  if(l===state.lang)return;state.lang=l;
  try{localStorage.setItem(K.lang,l)}catch(e){}
  document.documentElement.lang=l;document.documentElement.dir=(l==='fa'?'rtl':'ltr');
  var doc=$('#doc');doc.style.opacity='0';doc.style.transition='opacity .18s';
  setTimeout(function(){updateStatic();render();doc.style.opacity='1';if(state.preview)updatePageEstimate()},190);
}
function setTheme(t){
  if(!THEMES.some(function(x){return x.id===t}))return;
  state.theme=t;try{localStorage.setItem(K.theme,t)}catch(e){}
  document.documentElement.classList.add('theme-anim');
  document.documentElement.dataset.theme=t;
  document.documentElement.dataset.space=themeDef().space?'1':'0';
  genBH();
  setTimeout(function(){document.documentElement.classList.remove('theme-anim')},650);
  updateStatic();
  maybeSpace();
}

/* ================= PDF PREVIEW / PRINT ================= */
function updatePageEstimate(){
  var el=$('#pd-pages');if(!el)return;
  var sheet=document.querySelector('.sheet');if(!sheet){el.textContent='';return}
  var pages=Math.max(1,Math.ceil(sheet.offsetHeight/1040));
  var n=state.lang==='fa'?faDigits(pages):String(pages);
  el.textContent='≈ '+n+' '+T('pd_pages');
}
function enterPreview(){
  closePops();finalizeReveals();
  state.preview=true;
  document.documentElement.dataset.pd='1';
  window.scrollTo({top:0,behavior:'auto'});
  updatePageEstimate();
  maybeSpace();
}
function exitPreview(){
  state.preview=false;
  document.documentElement.removeAttribute('data-pd');
  maybeSpace();
}
function doPrint(){window.print()}
window.addEventListener('beforeprint',function(){finalizeReveals();document.documentElement.dataset.pd='1'});
window.addEventListener('afterprint',function(){if(!state.preview)document.documentElement.removeAttribute('data-pd')});
var rzT=false;
window.addEventListener('resize',function(){
  spaceResize();
  if(state.preview&&!rzT){rzT=true;requestAnimationFrame(function(){updatePageEstimate();rzT=false})}
});

/* ================= TOAST / FILES ================= */
function toast(msg,err){
  var t=document.createElement('div');t.className='toast'+(err?' err':'');
  t.innerHTML=ic(err?'x':'check','w-4 h-4 '+(err?'':'t-acc'))+'<span>'+esc(msg)+'</span>';
  $('#toasts').appendChild(t);
  if(hasMotion&&!REDUCED)Motion.animate(t,{opacity:[0,1],transform:['translateY(10px)','translateY(0)']},{duration:.35,easing:[.16,1,.3,1]});
  setTimeout(function(){t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(function(){t.remove()},320)},3800);
}
function download(name,text,type){
  var a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([text],{type:type||'application/json'}));
  a.download=name;document.body.appendChild(a);a.click();a.remove();
}
function dlVCard(){
  var p=state.data.profile||{};
  var ev=function(s){return String(s||'').replace(/\\/g,'\\\\').replace(/,/g,'\\,').replace(/;/g,'\\;')};
  var name=String(p.name||'');var parts=name.split(' ');
  var lines=['BEGIN:VCARD','VERSION:3.0','N:'+ev(parts.slice(1).join(' '))+';'+ev(parts[0]||''),'FN:'+ev(name),
    'TITLE:'+ev(L(p.title)),'TEL;TYPE=CELL:'+ev(p.phone),'EMAIL:'+ev(p.email),'URL:'+ev(url(p.website)),
    'ADR;TYPE=HOME:;;;'+ev(L(p.location))+';;;;','END:VCARD'];
  var slug=name.toLowerCase().replace(/\s+/g,'-').replace(/[^\w\-]/g,'')||'contact';
  download(slug+'.vcf',lines.join('\r\n'),'text/vcard');
  toast(T('exported_ok'));
}
function validateResume(d){
  var errs=[];
  if(typeof d!=='object'||d===null||Array.isArray(d))return ['Root must be a JSON object'];
  if(!d.profile||typeof d.profile!=='object')errs.push('profile: object required');
  else if(typeof d.profile.name!=='string'||!d.profile.name)errs.push('profile.name: non-empty string required');
  ['stats','highlights','experience','projects','speaking','references','community','skills','techStack','education','certifications','languages','achievements','interests','competencies','industries','engagement','practices','testimonials'].forEach(function(k){
    if(d[k]!=null&&!Array.isArray(d[k]))errs.push(k+': array expected');
  });
  arr(d.experience).forEach(function(e,i){if(!e||typeof e.company!=='string')errs.push('experience['+i+'].company: string required')});
  arr(d.projects).forEach(function(p,i){if(!p||typeof p.name!=='string')errs.push('projects['+i+'].name: string required')});
  return errs;
}
function handleFile(f){
  if(!f)return;
  var r=new FileReader();
  r.onload=function(){
    try{
      var d=JSON.parse(r.result);
      var errs=validateResume(d);
      if(errs.length){toast(T('schema_issues')+': '+errs.slice(0,3).join(' · '),true);return}
      state.data=d;try{localStorage.setItem(K.data,JSON.stringify(d))}catch(e){}
      render();toast(T('imported_ok'));
    }catch(e){toast(T('invalid_json'),true)}
  };
  r.readAsText(f);
}
function closePops(){$$('.pop').forEach(function(p){p.classList.add('hidden')});$$('[data-action="toggle-pop"]').forEach(function(b){b.setAttribute('aria-expanded','false')})}

/* ================= EVENTS ================= */
document.addEventListener('click',function(e){
  var el=e.target.closest('[data-action],[data-opt],[data-sec],[data-accent]');
  if(!e.target.closest('.pop')&&!e.target.closest('[data-action="toggle-pop"]'))closePops();
  if(!el)return;
  if(el.dataset.accent!=null){setAccent(el.dataset.accent);return}
  if(el.dataset.opt){setOpt(el.dataset.opt,el.dataset.value);return}
  if(el.dataset.sec){toggleSec(el.dataset.sec);return}
  var a=el.dataset.action,v=el.dataset.value;
  if(a==='set-lang')setLang(v);
  else if(a==='set-theme'){setTheme(v);closePops()}
  else if(a==='toggle-pop'){
    e.preventDefault();
    var p=document.getElementById(el.dataset.pop);if(!p)return;
    var was=p.classList.contains('hidden');closePops();
    if(was){p.classList.remove('hidden');el.setAttribute('aria-expanded','true');if(window.lucide)lucide.createIcons()}
  }
  else if(a==='print')enterPreview();
  else if(a==='pd-print')doPrint();
  else if(a==='pd-back')exitPreview();
  else if(a==='import-json'){$('#json-file').click();closePops()}
  else if(a==='export-json'){download('resume-data.json',JSON.stringify(state.data,null,2));toast(T('exported_ok'));closePops()}
  else if(a==='download-vcard'){dlVCard();closePops()}
  else if(a==='download-sample'){download('resume-example.json',JSON.stringify(SAMPLE,null,2));toast(T('exported_ok'));closePops()}
  else if(a==='reset-data'){state.data=SAMPLE;try{localStorage.removeItem(K.data)}catch(err){}render();toast(T('reset_ok'));closePops()}
  else if(a==='copy'&&navigator.clipboard&&v)navigator.clipboard.writeText(v).then(function(){toast(T('copied'))});
});
document.addEventListener('change',function(e){if(e.target.id==='json-file'){handleFile(e.target.files[0]);e.target.value=''}});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){if(state.preview)exitPreview();else closePops()}
});
var ticking=false;
window.addEventListener('scroll',function(){
  if(ticking)return;ticking=true;
  requestAnimationFrame(function(){
    var h=document.documentElement;
    var p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);
    $('#progress').style.width=(p*100).toFixed(1)+'%';
    ticking=false;
  });
},{passive:true});

/* ================= INIT ================= */
document.documentElement.lang=state.lang;
document.documentElement.dir=(state.lang==='fa'?'rtl':'ltr');
document.documentElement.dataset.theme=state.theme;
document.documentElement.dataset.space=themeDef().space?'1':'0';
document.documentElement.dataset.layout=state.opts.layout;
document.documentElement.dataset.photo=state.opts.photo;
document.documentElement.dataset.density=state.opts.density;
document.documentElement.dataset.typo=state.opts.typo;
document.documentElement.dataset.motion=state.opts.motion;
applyAccent();
SP.scv=$('#space-cv');SP.sctx=SP.scv.getContext('2d');
SP.bcv=$('#bh-cv');SP.bctx=SP.bcv.getContext('2d');
spaceResize();genStars();genBH();
updateStatic();
render();
maybeSpace();
})();
