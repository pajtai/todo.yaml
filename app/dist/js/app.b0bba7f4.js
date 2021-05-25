(function(e){function t(t){for(var o,i,a=t[0],d=t[1],u=t[2],l=0,p=[];l<a.length;l++)i=a[l],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&p.push(c[i][0]),c[i]=0;for(o in d)Object.prototype.hasOwnProperty.call(d,o)&&(e[o]=d[o]);s&&s(t);while(p.length)p.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,i=1;i<n.length;i++){var d=n[i];0!==c[d]&&(o=!1)}o&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},c={app:0},r=[];function i(e){return a.p+"js/"+({about:"about"}[e]||e)+"."+{about:"b2de0d19"}[e]+".js"}function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(e){var t=[],n=c[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=c[e]=[t,o]}));t.push(n[2]=o);var r,d=document.createElement("script");d.charset="utf-8",d.timeout=120,a.nc&&d.setAttribute("nonce",a.nc),d.src=i(e);var u=new Error;r=function(t){d.onerror=d.onload=null,clearTimeout(l);var n=c[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",u.name="ChunkLoadError",u.type=o,u.request=r,n[1](u)}c[e]=void 0}};var l=setTimeout((function(){r({type:"timeout",target:d})}),12e4);d.onerror=d.onload=r,document.head.appendChild(d)}return Promise.all(t)},a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/",a.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],u=d.push.bind(d);d.push=t,d=d.slice();for(var l=0;l<d.length;l++)t(d[l]);var s=u;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"02ad":function(e,t,n){},"095f":function(e,t,n){"use strict";n("02ad")},"470c":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23"),c={key:0},r={key:2};function i(e,t,n,i,a,d){var u=Object(o["resolveComponent"])("router-view");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[a.isMounted?(Object(o["openBlock"])(),Object(o["createBlock"])("h1",c,Object(o["toDisplayString"])(e.fileName),1)):Object(o["createCommentVNode"])("",!0),a.isMounted?(Object(o["openBlock"])(),Object(o["createBlock"])(u,{key:1,config:a.config},null,8,["config"])):Object(o["createCommentVNode"])("",!0),a.isMounted?(Object(o["openBlock"])(),Object(o["createBlock"])("footer",r,[Object(o["createVNode"])("div",null,[Object(o["createVNode"])("small",null,"Editing: "+Object(o["toDisplayString"])(a.path),1)]),this.shutdownButton?(Object(o["openBlock"])(),Object(o["createBlock"])("div",{key:0,onClick:t[1]||(t[1]=function(e){return d.close()}),class:"close"},"X")):Object(o["createCommentVNode"])("",!0)])):Object(o["createCommentVNode"])("",!0)],64)}var a=n("1da1"),d=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),{name:"App",data:function(){return{path:"",name:"",shutdownButton:!1,config:!1,isMounted:!1}},created:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([e.axios.get("/api/files/"),e.axios.get("/api/configuration/")]);case 2:n=t.sent,e.path=n[0].data.filePath,e.fileName=n[0].data.fileName,e.shutdownButton=!!n[1].data.shutdownServerButton,e.config=n[1].data,e.isMounted=!0;case 8:case"end":return t.stop()}}),t)})))()},methods:{close:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios.post("/api/shutdown",{action:"shutdown"});case 2:window.close();case 3:case"end":return t.stop()}}),t)})))()}}});n("c94c");d.render=i;var u=d,l=n("6c02"),s={class:"home"};function p(e,t,n,c,r,i){var a=Object(o["resolveComponent"])("Todo");return Object(o["openBlock"])(),Object(o["createBlock"])("div",s,[Object(o["createVNode"])(a,{config:n.config},null,8,["config"])])}n("4de4");var f={class:"add-todo"},b={key:0},m=Object(o["createVNode"])("i",{class:"fa fa-align-justify handle"},null,-1),h={key:1},O={key:2,class:"todo__importance"},j={key:3,class:"notes"},g={key:4,class:"todo__date"},k={class:"columns"},v=Object(o["createVNode"])("input",{class:"columns__checkbox",type:"checkbox"},null,-1),y=Object(o["createTextVNode"])(" Title "),w={key:1};function B(e,t,n,c,r,i){var a=Object(o["resolveComponent"])("datepicker"),d=Object(o["resolveComponent"])("draggable"),u=Object(o["resolveDirective"])("todo-focus");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[Object(o["createVNode"])("section",f,[Object(o["withDirectives"])(Object(o["createVNode"])("input",{class:["add-todo__input",{"add-todo__input-filtering":!!r.filter}],"onUpdate:modelValue":t[1]||(t[1]=function(e){return r.newTodo=e}),placeholder:"Enter todo",onKeyup:t[2]||(t[2]=Object(o["withKeys"])((function(){return i.addTodo&&i.addTodo.apply(i,arguments)}),["enter"])),type:"text"},null,34),[[o["vModelText"],r.newTodo]])]),Object(o["createVNode"])(d,{modelValue:r.todos,"onUpdate:modelValue":t[6]||(t[6]=function(e){return r.todos=e}),handle:".handle",tag:"ul","item-key":"_key",sort:!0},{item:Object(o["withCtx"])((function(e){var c=e.element;return[c&&i.show(c)?(Object(o["openBlock"])(),Object(o["createBlock"])("li",b,[c._editing?(Object(o["openBlock"])(),Object(o["createBlock"])("div",h,[Object(o["withDirectives"])(Object(o["createVNode"])("input",{"onUpdate:modelValue":t[3]||(t[3]=function(e){return r.editedString=e}),onBlur:function(e){return i.cancelEdit(c)},onKeyup:Object(o["withKeys"])((function(e){return i.doneEdit(c)}),["enter"]),type:"text"},null,40,["onBlur","onKeyup"]),[[u,c._editing],[o["vModelText"],r.editedString]])])):(Object(o["openBlock"])(),Object(o["createBlock"])("div",{key:0,onDblclick:function(e){return i.edit(c)}},[Object(o["withDirectives"])(Object(o["createVNode"])("input",{"onUpdate:modelValue":function(e){return c.done=e},type:"checkbox"},null,8,["onUpdate:modelValue"]),[[o["vModelCheckbox"],c.done]]),m,Object(o["createTextVNode"])("  "+Object(o["toDisplayString"])(c.title),1)],40,["onDblclick"])),n.config.columns.importance?(Object(o["openBlock"])(),Object(o["createBlock"])("div",O,[!c._editingImportance&&c.importance?(Object(o["openBlock"])(),Object(o["createBlock"])("span",{key:0,onDblclick:function(e){return i.editImportance(c)}},Object(o["toDisplayString"])(c.importance),41,["onDblclick"])):Object(o["createCommentVNode"])("",!0),c._editingImportance||c.importance?Object(o["createCommentVNode"])("",!0):(Object(o["openBlock"])(),Object(o["createBlock"])("span",{key:1,onDblclick:function(e){return i.editImportance(c)},class:"todo__importance_empty"},"Add Importance",40,["onDblclick"])),c._editingImportance?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createBlock"])("input",{key:2,"onUpdate:modelValue":t[4]||(t[4]=function(e){return r.editedString=e}),onBlur:function(e){return i.cancelEdit(c)},onKeyup:Object(o["withKeys"])((function(e){return i.doneEditImportance(c)}),["enter"]),type:"number"},null,40,["onBlur","onKeyup"])),[[u,c._editingImportance],[o["vModelText"],r.editedString]]):Object(o["createCommentVNode"])("",!0)])):Object(o["createCommentVNode"])("",!0),n.config.columns.notes?(Object(o["openBlock"])(),Object(o["createBlock"])("div",j,[!c._editingNotes&&c.notes?(Object(o["openBlock"])(),Object(o["createBlock"])("span",{key:0,onDblclick:function(e){return i.editNotes(c)}},Object(o["toDisplayString"])(c.notes),41,["onDblclick"])):Object(o["createCommentVNode"])("",!0),c.notes||c._editingNotes?Object(o["createCommentVNode"])("",!0):(Object(o["openBlock"])(),Object(o["createBlock"])("span",{key:1,class:"todo__notes_empty",onDblclick:function(e){return i.editNotes(c)}},"Add Note",40,["onDblclick"])),c._editingNotes?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createBlock"])("input",{key:2,"onUpdate:modelValue":t[5]||(t[5]=function(e){return r.editedString=e}),onBlur:function(e){return i.cancelEdit(c)},onKeyup:Object(o["withKeys"])((function(e){return i.doneEditNotes(c)}),["enter"]),type:"text"},null,40,["onBlur","onKeyup"])),[[u,c._editingNotes],[o["vModelText"],r.editedString]]):Object(o["createCommentVNode"])("",!0)])):Object(o["createCommentVNode"])("",!0),n.config.columns.dueDate?(Object(o["openBlock"])(),Object(o["createBlock"])("div",g,[Object(o["createVNode"])(a,{placeholder:"No Due Date",modelValue:c.dueDate,"onUpdate:modelValue":function(e){return c.dueDate=e}},null,8,["modelValue","onUpdate:modelValue"])])):Object(o["createCommentVNode"])("",!0)])):Object(o["createCommentVNode"])("",!0)]})),_:1},8,["modelValue"]),Object(o["createVNode"])("ul",k,[Object(o["createVNode"])("li",null,[Object(o["createVNode"])("div",{class:"columns__title",onClick:t[7]||(t[7]=function(e){return i.reOrder("title")})},[v,y]),n.config.columns.importance?(Object(o["openBlock"])(),Object(o["createBlock"])("div",{key:0,class:"columns__importance",onClick:t[8]||(t[8]=function(e){return i.reOrder("importance")})}," Importance ")):Object(o["createCommentVNode"])("",!0),n.config.columns.notes?(Object(o["openBlock"])(),Object(o["createBlock"])("div",w,"Notes")):Object(o["createCommentVNode"])("",!0),n.config.columns.dueDate?(Object(o["openBlock"])(),Object(o["createBlock"])("div",{key:2,class:"columns__due-date",onClick:t[9]||(t[9]=function(e){return i.reOrder("dueDate")})}," Due Date ")):Object(o["createCommentVNode"])("",!0)])])],64)}n("d81d"),n("159b"),n("4d63"),n("ac1f"),n("25f0"),n("fb6a"),n("b64b"),n("a434");var N=n("b76a"),_=n.n(N),V=n("24e7"),D={name:"Todo",components:{draggable:_.a,datepicker:V["a"]},props:["config"],data:function(){return{newTodo:"",filter:null,todos:[],editedString:null,keysToDelete:["_editing","_editingNotes","_editingImportance"]}},created:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios.get("/api/todo/");case 2:n=t.sent,e.todos=n.data.map((function(t,n){return t._key=n,e.keysToDelete.forEach((function(e){t[e]=!1})),t.dueDate&&(t.dueDate=new Date(t.dueDate)),t})),e.saveChanges=!0;case 5:case"end":return t.stop()}}),t)})))()},watch:{todos:{handler:function(){this.saveChanges?(this.save(),console.log("saved")):(console.log("skip save"),this.saveChanges=!0)},deep:!0},newTodo:{handler:function(){/^\//.test(this.newTodo)?this.filter=this.newTodo.substring(1):this.filter=null}}},methods:{show:function(e){if(!this.filter)return!0;var t=new RegExp(this.filter,"i"),n=e.title;return isNaN(e.importance)||(n+=""+e.importance),"string"===typeof e.notes&&(n+=e.notes),e.dueDate&&(n+=e.dueDate.toISOString().slice(0,10)),t.test(n)},addTodo:function(){this.config.addTodosToTop?this.todos.unshift(this.createTodo(this.newTodo)):this.todos.push(this.createTodo(this.newTodo)),this.newTodo=""},createTodo:function(e){var t={};return this.todos.length&&Object.keys(this.todos[0]).forEach((function(e){t[e]=null})),Object.assign(t,{title:e,done:!1})},reOrder:function(e){this.todos.sort((function(t,n){var o=t[e]-n[e];switch(e){case"importance":if(o>0)return-1;if(o<0)return 1;break;case"dueDate":if(!t[e]&&n[e])return 1;if(!n[e]&&t[e])return-1;if(o>0)return 1;if(o<0)return-1;break;case"title":if(console.log("sort"),t[e].toLowerCase()<n[e].toLowerCase())return-1;if(t[e].toLowerCase()>n[e].toLowerCase())return 1;break}return 0}))},save:function(){var e=this;this.axios.post("/api/todo/",this.todos.map((function(t){var n=Object.assign({},t);return e.keysToDelete.forEach((function(e){delete n[e]})),delete n._key,n.done||delete n.done,n.dueDate&&(n.dueDate=n.dueDate.toISOString()),n})));var t=this.todos.length;while(--t>-1){var n=this.todos[t];n.done&&(this.saveChanges=!1,this.todos.splice(t,1))}},edit:function(e){e._editing=!0,this.editedString=e.title},editNotes:function(e){e._editingNotes=!0,this.editedString=e.notes},editImportance:function(e){e._editingImportance=!0,this.editedString=e.importance},cancelEdit:function(e){e._editing=!1,e._editingNotes=!1,e._editingImportance=!1,this.editedString=null},doneEdit:function(e){e._editing=!1,e.title=this.editedString,this.editedString=null},doneEditNotes:function(e){e._editingNotes=!1,e.notes=this.editedString,this.editedString=null},doneEditImportance:function(e){e._editingImportance=!1,e.importance=parseInt(this.editedString),this.editedString=null}},directives:{"todo-focus":function(e,t){t.value&&e.focus()}}};n("095f");D.render=B;var C=D,T={name:"Home",components:{Todo:C},props:["config"]};T.render=p;var x=T,S=[{path:"/",name:"Home",component:x},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],E=Object(l["a"])({history:Object(l["b"])("/"),routes:S}),I=E,M=n("bc3a"),K=n.n(M),P=n("2106"),U=n.n(P);Object(o["createApp"])(u).use(I).use(U.a,K.a).mount("#app")},c94c:function(e,t,n){"use strict";n("470c")}});
//# sourceMappingURL=app.b0bba7f4.js.map