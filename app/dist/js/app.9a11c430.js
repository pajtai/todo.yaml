(function(e){function t(t){for(var o,c,i=t[0],u=t[1],l=t[2],d=0,p=[];d<i.length;d++)c=i[d],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&p.push(r[c][0]),r[c]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);s&&s(t);while(p.length)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,c=1;c<n.length;c++){var u=n[c];0!==r[u]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={app:0},a=[];function c(e){return i.p+"js/"+({about:"about"}[e]||e)+"."+{about:"b85a058f"}[e]+".js"}function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=o);var a,u=document.createElement("script");u.charset="utf-8",u.timeout=120,i.nc&&u.setAttribute("nonce",i.nc),u.src=c(e);var l=new Error;a=function(t){u.onerror=u.onload=null,clearTimeout(d);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",l.name="ChunkLoadError",l.type=o,l.request=a,n[1](l)}r[e]=void 0}};var d=setTimeout((function(){a({type:"timeout",target:u})}),12e4);u.onerror=u.onload=a,document.head.appendChild(u)}return Promise.all(t)},i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var s=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23");function r(e,t,n,r,a,c){var i=Object(o["resolveComponent"])("router-view");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[Object(o["createVNode"])(i),Object(o["createVNode"])("footer",null,[Object(o["createVNode"])("small",null,"Editing: "+Object(o["toDisplayString"])(a.path),1)])],64)}var a=n("1da1"),c=(n("96cf"),{name:"App",data:function(){return{path:""}},created:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios.get("/api/file/");case 2:n=t.sent,e.path=n.data.filePath;case 4:case"end":return t.stop()}}),t)})))()}});n("7c70");c.render=r;var i=c,u=(n("d3b7"),n("3ca3"),n("ddb0"),n("6c02")),l={class:"home"};function d(e,t,n,r,a,c){var i=Object(o["resolveComponent"])("Todo");return Object(o["openBlock"])(),Object(o["createBlock"])("div",l,[Object(o["createVNode"])(i)])}var s=Object(o["createVNode"])("label",null,"Add Todo:",-1);function p(e,t,n,r,a,c){var i=Object(o["resolveComponent"])("draggable");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[Object(o["createVNode"])("section",null,[s,Object(o["withDirectives"])(Object(o["createVNode"])("input",{"onUpdate:modelValue":t[1]||(t[1]=function(e){return a.newTodo=e}),onKeyup:t[2]||(t[2]=Object(o["withKeys"])((function(){return c.addTodo&&c.addTodo.apply(c,arguments)}),["enter"])),type:"text"},null,544),[[o["vModelText"],a.newTodo]])]),Object(o["createVNode"])("ul",null,[Object(o["createVNode"])(i,{modelValue:a.todos,"onUpdate:modelValue":t[3]||(t[3]=function(e){return a.todos=e}),"item-key":"key",onChange:c.save,sort:!0},{item:Object(o["withCtx"])((function(e){var t=e.element;return[Object(o["createVNode"])("li",null,[t.editing?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createBlock"])("input",{key:1,"onUpdate:modelValue":function(e){return t.title=e},onKeyup:Object(o["withKeys"])((function(e){return c.doneEdit(t)}),["enter"]),type:"text"},null,40,["onUpdate:modelValue","onKeyup"])),[[o["vModelText"],t.title]]):(Object(o["openBlock"])(),Object(o["createBlock"])("div",{key:0,onDblclick:function(e){return c.edit(t)}},[Object(o["withDirectives"])(Object(o["createVNode"])("input",{"onUpdate:modelValue":function(e){return t.done=e},type:"checkbox"},null,8,["onUpdate:modelValue"]),[[o["vModelCheckbox"],t.done]]),Object(o["createTextVNode"])(" "+Object(o["toDisplayString"])(t.title),1)],40,["onDblclick"]))])]})),_:1},8,["modelValue","onChange"])])],64)}n("d81d"),n("a434");var f=n("b76a"),b=n.n(f),h={name:"Todo",components:{draggable:b.a},data:function(){return{newTodo:"",todos:[]}},created:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios.get("/api/todo/");case 2:n=t.sent,e.todos=n.data.map((function(e,t){return e.key=t,e.editing=!1,e})),e.saveChanges=!0;case 5:case"end":return t.stop()}}),t)})))()},watch:{todos:{handler:function(){this.saveChanges?(this.save(),console.log("saved")):(console.log("skip save"),this.saveChanges=!0)},deep:!0}},methods:{addTodo:function(){this.todos.push(v(this.newTodo)),this.newTodo=""},save:function(){this.axios.post("/api/todo/",this.todos);var e=this.todos.length;while(--e>-1){var t=this.todos[e];t.done&&(this.saveChanges=!1,this.todos.splice(e,1))}},edit:function(e){e.editing=!0},doneEdit:function(e){e.editing=!1}}};function v(e){return{title:e,done:!1}}h.render=p;var m=h,j={name:"Home",components:{Todo:m}};j.render=d;var O=j,g=[{path:"/",name:"Home",component:O},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],y=Object(u["a"])({history:Object(u["b"])("/"),routes:g}),w=y,k=n("bc3a"),x=n.n(k),V=n("2106"),T=n.n(V);Object(o["createApp"])(i).use(w).use(T.a,x.a).mount("#app")},"7c70":function(e,t,n){"use strict";n("b920")},b920:function(e,t,n){}});
//# sourceMappingURL=app.9a11c430.js.map