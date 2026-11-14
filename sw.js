self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(clients.claim()));
self.addEventListener("fetch",()=>{});
self.addEventListener("push",e=>{
  let d={};try{d=e.data.json()}catch(_){}
  e.waitUntil(self.registration.showNotification(d.title||"Daily Thought Record",{
    body:d.body||"Time for your thought record.",icon:"icon-192.png",badge:"icon-192.png",tag:"dtr-reminder",data:{url:d.url||"./"}}));
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(l=>{
    for(const c of l){if("focus" in c)return c.focus()}
    return clients.openWindow(e.notification.data.url);
  }));
});