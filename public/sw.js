if(!self.define){let e,i={};const s=(s,c)=>(s=new URL(s+".js",c).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let r={};const a=e=>s(e,o),d={module:{uri:o},exports:r,require:a};i[o]=Promise.all(c.map((e=>d[e]||a(e)))).then((e=>(n(...e),r)))}}define(["./workbox-4aa34959"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-BJseGf_a.js",revision:null},{url:"assets/index-DdOn0QbH.css",revision:null},{url:"index.html",revision:"90b02a94bc10f3151845000dd7f096bf"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"c922903877ab5aa42c17a9d4a59c9cda"},{url:"images\\icons\\icon-128x128.png",revision:"62cd6920935f8ba5c046b313782b2183"},{url:"images\\icons\\icon-144x144.png",revision:"1ac953f7409155dd12457886eb3b5fbe"},{url:"images\\icons\\icon-152x152.png",revision:"c2c123cf3b45b6c1ac62329812cfcf5a"},{url:"images\\icons\\icon-192x192.png",revision:"6cfc77b34c197cf0625c0146d41a707e"},{url:"images\\icons\\icon-384x384.png",revision:"828683bc460dc2f430eee46490704d96"},{url:"images\\icons\\icon-512x512.png",revision:"b162901bfc687566310e6f3687a91e21"},{url:"images\\icons\\icon-72x72.png",revision:"4daa99c2670cc23c96ca8eb374bed5f6"},{url:"images\\icons\\icon-96x96.png",revision:"8c01d5c8c50f1ef7cedc233139e3d93c"},{url:"manifest.webmanifest",revision:"82b36980468da69aafe70633cad47913"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/\/assets\//,new e.CacheFirst({cacheName:"assets-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET")}));
