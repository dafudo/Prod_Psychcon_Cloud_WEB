/* TDP staging public-site interactions.
   Zero third-party libraries, no analytics, no data collection. */
(()=>{'use strict';
  const root=document.documentElement;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!reduced.matches)root.classList.add('has-motion');
  let observer=null;
  let activeNavigation=0;
  let scrollQueued=false;
  const allowed=/^\/(?:pl|en)(?:\/(?:about|board|assessment|apply|pricing|partners))?\/?$/;
  const qs=(selector,scope=document)=>scope.querySelector(selector);
  function svgArrow(){
    return '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20 20 4M8 4h12v12"/></svg>';
  }
  function setDrawer(open,{restoreFocus=false}={}){
    const drawer=qs('[data-drawer]'),button=qs('[data-burger]');
    if(!drawer||!button)return;
    const next=Boolean(open);
    drawer.setAttribute('aria-hidden',next?'false':'true');
    button.setAttribute('aria-expanded',next?'true':'false');
    button.setAttribute('aria-label',next?(root.lang==='en'?'Close menu':'Zamknij menu'):(root.lang==='en'?'Open menu':'Otwórz menu'));
    document.body.classList.toggle('drawer-locked',next);
    if(next){
      const first=qs('a',drawer);
      if(first)requestAnimationFrame(()=>first.focus({preventScroll:true}));
    }else if(restoreFocus){
      button.focus({preventScroll:true});
    }
  }
  function scrollProgress(){
    scrollQueued=false;
    const available=document.documentElement.scrollHeight-window.innerHeight;
    const pct=available>0?Math.min(1,Math.max(0,window.scrollY/available)):0;
    const bar=qs('[data-progress]');
    if(bar)bar.style.transform='scaleX('+pct+')';
    const header=qs('[data-header]');
    if(header)header.classList.toggle('scrolled',window.scrollY>25);
  }
  function queueProgress(){
    if(scrollQueued)return;
    scrollQueued=true;requestAnimationFrame(scrollProgress);
  }
  function observeReveals(){
    if(observer){observer.disconnect();observer=null;}
    const items=[...document.querySelectorAll('.reveal')];
    if(reduced.matches||!('IntersectionObserver' in window)){
      items.forEach(el=>el.classList.add('revealed'));return;
    }
    observer=new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting){
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    },{threshold:0.08,rootMargin:'0px 0px -20px 0px'});
    items.forEach(el=>observer.observe(el));
  }
  function syncSocialAndAppHead(parsed){
    const tags='meta[property^="og:"],meta[name^="twitter:"]';
    document.head.querySelectorAll(tags).forEach(node=>node.remove());
    parsed.head.querySelectorAll(tags).forEach(node=>document.head.appendChild(document.importNode(node,true)));
    document.head.querySelector('link[rel="manifest"]')?.remove();
    const nextManifest=parsed.head.querySelector('link[rel="manifest"]');
    if(nextManifest)document.head.appendChild(document.importNode(nextManifest,true));
    const appTitle=parsed.head.querySelector('meta[name="apple-mobile-web-app-title"]')?.content;
    const titleTag=document.head.querySelector('meta[name="apple-mobile-web-app-title"]');
    if(appTitle&&titleTag)titleTag.content=appTitle;
  }
  function initialize(){
    setDrawer(false);
    observeReveals();
    scrollProgress();
  }
  async function navigate(url,{replace=false,historyEvent=false}={}){
    const destination=new URL(url,location.origin);
    if(destination.origin!==location.origin||!allowed.test(destination.pathname)){location.assign(destination.href);return;}
    const seq=++activeNavigation;
    setDrawer(false);
    let markup;
    try{
      const response=await fetch(destination.href,{headers:{Accept:'text/html'}});
      if(!response.ok||!response.headers.get('content-type')?.includes('text/html'))throw Error('Invalid response');
      markup=await response.text();
    }catch{location.assign(destination.href);return;}
    if(seq!==activeNavigation)return;
    const parsed=new DOMParser().parseFromString(markup,'text/html');
    const nextShell=qs('[data-site-shell]',parsed);
    if(!nextShell){location.assign(destination.href);return;}
    const nextTitle=parsed.title;
    const desc=qs('meta[name=description]',parsed)?.content||'';
    let changed=false;
    function change(){
      if(changed)return;
      changed=true;
      const current=qs('[data-site-shell]');
      if(!current)return;
      current.replaceWith(document.importNode(nextShell,true));
      root.lang=parsed.documentElement.lang==='en'?'en':'pl';
      document.title=nextTitle;
      const currentDesc=qs('meta[name=description]');
      if(currentDesc)currentDesc.content=desc;
      syncSocialAndAppHead(parsed);
      if(!historyEvent){
        if(replace)history.replaceState({},'',destination.pathname+destination.search+destination.hash);
        else history.pushState({},'',destination.pathname+destination.search+destination.hash);
      }
      window.scrollTo({top:0,left:0,behavior:'instant'});
      initialize();
      const h1=qs('#main h1');
      if(h1){h1.tabIndex=-1;h1.focus({preventScroll:true});}
    }
    if(!reduced.matches&&typeof document.startViewTransition==='function'){
      try{await document.startViewTransition(change).finished;}
      catch{change();}
    }else{change();}
  }
  document.addEventListener('click',event=>{
    const toggle=event.target.closest?.('[data-burger]');
    if(toggle){event.preventDefault();setDrawer(toggle.getAttribute('aria-expanded')!=='true');return;}
    const a=event.target.closest?.('a[href]');
    if(!a)return;
    if(a.hasAttribute('download')||a.target&&a.target!=='_self')return;
    if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
    const u=new URL(a.href,location.origin);
    if(u.origin!==location.origin)return;
    if(u.pathname===location.pathname&&u.hash){setDrawer(false);return;}
    if(!allowed.test(u.pathname))return;
    event.preventDefault();
    if(u.pathname===location.pathname&&u.search===location.search&&u.hash===location.hash){setDrawer(false);return;}
    void navigate(u.href);
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&qs('[data-burger]')?.getAttribute('aria-expanded')==='true'){
      event.preventDefault();setDrawer(false,{restoreFocus:true});
    }
    if(event.key==='Tab'&&qs('[data-burger]')?.getAttribute('aria-expanded')==='true'){
      const box=qs('[data-drawer]');if(!box)return;
      const els=[...box.querySelectorAll('a[href],button:not([disabled])')];
      if(!els.length)return;
      const first=els[0],last=els[els.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  window.addEventListener('scroll',queueProgress,{passive:true});
  window.addEventListener('resize',()=>{
    if(window.innerWidth>940&&qs('[data-burger]')?.getAttribute('aria-expanded')==='true')setDrawer(false);
    queueProgress();
  },{passive:true});
  window.addEventListener('popstate',()=>{void navigate(location.href,{historyEvent:true});});
  reduced.addEventListener?.('change',()=>{
    root.classList.toggle('has-motion',!reduced.matches);
    observeReveals();
  });
  initialize();
})();