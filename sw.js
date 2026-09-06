const C='innovation-v9300';
const A=['./','./index.html','./manifest.webmanifest','./innovation-icon-192.png','./innovation-icon-512.png','./innovation-apple-touch-icon.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)));});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const isPage=e.request.mode==='navigate'||/\\.(?:html)$/.test(new URL(e.request.url).pathname);
 if(isPage){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return;}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
