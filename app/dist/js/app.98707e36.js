(function(e){function t(t){for(var o,i,a=t[0],s=t[1],u=t[2],l=0,b=[];l<a.length;l++)i=a[l],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&b.push(c[i][0]),c[i]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);d&&d(t);while(b.length)b.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,i=1;i<n.length;i++){var s=n[i];0!==c[s]&&(o=!1)}o&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},c={app:0},r=[];function i(e){return a.p+"js/"+({about:"about"}[e]||e)+"."+{about:"b2de0d19"}[e]+".js"}function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(e){var t=[],n=c[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=c[e]=[t,o]}));t.push(n[2]=o);var r,s=document.createElement("script");s.charset="utf-8",s.timeout=120,a.nc&&s.setAttribute("nonce",a.nc),s.src=i(e);var u=new Error;r=function(t){s.onerror=s.onload=null,clearTimeout(l);var n=c[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",u.name="ChunkLoadError",u.type=o,u.request=r,n[1](u)}c[e]=void 0}};var l=setTimeout((function(){r({type:"timeout",target:s})}),12e4);s.onerror=s.onload=r,document.head.appendChild(s)}return Promise.all(t)},a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/",a.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=u;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1cbe":function(e,t,n){},2507:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23"),c=(n("9911"),{key:0}),r={key:2},i={class:"files"};function a(e,t,n,a,s,u){var l=Object(o["resolveComponent"])("router-view");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[s.isMounted?(Object(o["openBlock"])(),Object(o["createBlock"])("h1",c,Object(o["toDisplayString"])(e.fileName),1)):Object(o["createCommentVNode"])("",!0),s.isMounted?(Object(o["openBlock"])(),Object(o["createBlock"])(l,{key:1,config:s.config},null,8,["config"])):Object(o["createCommentVNode"])("",!0),s.isMounted?(Object(o["openBlock"])(),Object(o["createBlock"])("footer",r,[Object(o["createVNode"])("ul",i,[Object(o["createVNode"])("li",null,[Object(o["createVNode"])("small",null,"Editing: "+Object(o["toDisplayString"])(s.path),1)]),(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(s.otherFiles,(function(e){return Object(o["openBlock"])(),Object(o["createBlock"])("li",{class:"files__choices",key:e.fileName},[Object(o["createVNode"])("small",null,[Object(o["createVNode"])("a",{onClick:[t[1]||(t[1]=Object(o["withModifiers"])((function(){}),["prevent"])),function(t){return u.go(e)}],href:u.link(e)},"Switch to: "+Object(o["toDisplayString"])(e.filePath),9,["onClick","href"])])])})),128))]),this.shutdownButton?(Object(o["openBlock"])(),Object(o["createBlock"])("div",{key:0,onClick:t[2]||(t[2]=function(e){return u.close()}),class:"close"},"X")):Object(o["createCommentVNode"])("",!0)])):Object(o["createCommentVNode"])("",!0)],64)}var s=n("1da1"),u=(n("96cf"),n("d3b7"),n("3ca3"),n("ddb0"),{name:"App",data:function(){return{path:"",name:"",shutdownButton:!1,config:!1,isMounted:!1,otherFiles:[]}},watch:{$route:{handler:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([e.axios.get("/api/files/".concat(e.getParam())),e.axios.get("/api/configuration/".concat(e.getParam()))]);case 2:n=t.sent,e.path=n[0].data.filePath,e.fileName=n[0].data.fileName,e.otherFiles=n[0].data.otherFiles||[],e.shutdownButton=!!n[1].data.shutdownServerButton,e.config=n[1].data,e.isMounted=!0;case 9:case"end":return t.stop()}}),t)})))()}}},methods:{close:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios.post("/api/shutdown",{action:"shutdown"});case 2:window.close();case 3:case"end":return t.stop()}}),t)})))()},link:function(e){return"/?file=".concat(e.fileName)},go:function(e){console.log(this.link(e)),this.$router.push(this.link(e))},getParam:function(){return this.$route.query.file?"?file=".concat(this.$route.query.file):""}}});n("c04ec");u.render=a;var l=u,d=n("6c02"),b={class:"home"};function p(e,t,n,c,r,i){var a=Object(o["resolveComponent"])("Todo");return Object(o["openBlock"])(),Object(o["createBlock"])("div",b,[Object(o["createVNode"])(a,{config:n.config},null,8,["config"])])}n("4de4");var f={class:"add-todo"},h={class:"columns"},m={key:1},k={key:0,class:"todo__item"},O=Object(o["createVNode"])("i",{class:"fa fa-align-justify handle"},null,-1),j=Object(o["createTextVNode"])("   "),g={key:0,class:"subtasks"},v={key:1},y={key:2,class:"todo__importance"},w={key:3,class:"notes"},_={key:4,class:"todo__date"},B=Object(o["createVNode"])("div",{class:"break"},null,-1),N={key:5,class:"todo__subtasks"};function V(e,t,n,c,r,i){var a=Object(o["resolveComponent"])("datepicker"),s=Object(o["resolveComponent"])("draggable"),u=Object(o["resolveDirective"])("todo-focus");return Object(o["openBlock"])(),Object(o["createBlock"])(o["Fragment"],null,[Object(o["createVNode"])("section",f,[Object(o["withDirectives"])(Object(o["createVNode"])("input",{class:["add-todo__input",{"add-todo__input-filtering":!!r.filter}],"onUpdate:modelValue":t[1]||(t[1]=function(e){return r.newTodo=e}),placeholder:"Enter todo",onKeyup:t[2]||(t[2]=Object(o["withKeys"])((function(){return i.addTodo&&i.addTodo.apply(i,arguments)}),["enter"])),type:"text"},null,34),[[o["vModelText"],r.newTodo]])]),Object(o["createVNode"])("ul",null,[Object(o["createVNode"])("li",h,[Object(o["createVNode"])("div",{class:"columns__title",onClick:t[3]||(t[3]=function(e){return i.reOrder("title")})},"Title"),n.config.columns.importance?(Object(o["openBlock"])(),Object(o["createBlock"])("div",{key:0,class:"columns__importance",onClick:t[4]||(t[4]=function(e){return i.reOrder("importance")})}," Importance ")):Object(o["createCommentVNode"])("",!0),n.config.columns.notes?(Object(o["openBlock"])(),Object(o["createBlock"])("div",m,"Notes")):Object(o["createCommentVNode"])("",!0),n.config.columns.dueDate?(Object(o["openBlock"])(),Object(o["createBlock"])("div",{key:2,class:"columns__due-date",onClick:t[5]||(t[5]=function(e){return i.reOrder("dueDate")})}," Due Date ")):Object(o["createCommentVNode"])("",!0)])]),Object(o["createVNode"])(s,{modelValue:r.todos,"onUpdate:modelValue":t[9]||(t[9]=function(e){return r.todos=e}),handle:".handle",tag:"ul","item-key":"_key",sort:!0},{item:Object(o["withCtx"])((function(e){var c=e.element;return[c&&i.show(c)?(Object(o["openBlock"])(),Object(o["createBlock"])("li",k,[c._editing?(Object(o["openBlock"])(),Object(o["createBlock"])("div",v,[Object(o["withDirectives"])(Object(o["createVNode"])("input",{"onUpdate:modelValue":t[6]||(t[6]=function(e){return r.editedString=e}),onBlur:function(e){return i.cancelEdit(c)},onKeyup:Object(o["withKeys"])((function(e){return i.doneEdit(c)}),["enter"]),type:"text"},null,40,["onBlur","onKeyup"]),[[u,c._editing],[o["vModelText"],r.editedString]])])):(Object(o["openBlock"])(),Object(o["createBlock"])("div",{key:0,onDblclick:function(e){return i.edit(c)},class:"todo__title",style:{position:"relative","margin-right":"1rem"}},[Object(o["withDirectives"])(Object(o["createVNode"])("input",{class:"todo__input","onUpdate:modelValue":function(e){return c.done=e},type:"checkbox"},null,8,["onUpdate:modelValue"]),[[o["vModelCheckbox"],c.done]]),O,j,n.config.subtasks?(Object(o["openBlock"])(),Object(o["createBlock"])("span",g,[Object(o["createVNode"])("i",{onClick:function(e){return i.toggleSubtasks(c)},class:{fa:!0,"fa-chevron-down":c._showSubstasks,"fa-chevron-right":!c._showSubstasks}},null,10,["onClick"]),Object(o["createVNode"])("span",{style:{opacity:(c.subtasks||[]).length?1:0}},"("+Object(o["toDisplayString"])((c.subtasks||[]).length)+")",5)])):Object(o["createCommentVNode"])("",!0),Object(o["createTextVNode"])(" "+Object(o["toDisplayString"])(c.title),1)],40,["onDblclick"])),n.config.columns.importance?(Object(o["openBlock"])(),Object(o["createBlock"])("div",y,[!c._editingImportance&&c.importance?(Object(o["openBlock"])(),Object(o["createBlock"])("span",{key:0,onDblclick:function(e){return i.editImportance(c)}},Object(o["toDisplayString"])(c.importance),41,["onDblclick"])):Object(o["createCommentVNode"])("",!0),c._editingImportance||c.importance?Object(o["createCommentVNode"])("",!0):(Object(o["openBlock"])(),Object(o["createBlock"])("span",{key:1,onDblclick:function(e){return i.editImportance(c)},class:"todo__importance_empty"},"Add Importance",40,["onDblclick"])),c._editingImportance?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createBlock"])("input",{key:2,"onUpdate:modelValue":t[7]||(t[7]=function(e){return r.editedString=e}),onBlur:function(e){return i.cancelEdit(c)},onKeyup:Object(o["withKeys"])((function(e){return i.doneEditImportance(c)}),["enter"]),type:"number"},null,40,["onBlur","onKeyup"])),[[u,c._editingImportance],[o["vModelText"],r.editedString]]):Object(o["createCommentVNode"])("",!0)])):Object(o["createCommentVNode"])("",!0),n.config.columns.notes?(Object(o["openBlock"])(),Object(o["createBlock"])("div",w,[!c._editingNotes&&c.notes?(Object(o["openBlock"])(),Object(o["createBlock"])("span",{key:0,onDblclick:function(e){return i.editNotes(c)}},Object(o["toDisplayString"])(c.notes),41,["onDblclick"])):Object(o["createCommentVNode"])("",!0),c.notes||c._editingNotes?Object(o["createCommentVNode"])("",!0):(Object(o["openBlock"])(),Object(o["createBlock"])("span",{key:1,class:"todo__notes_empty",onDblclick:function(e){return i.editNotes(c)}},"Add Note",40,["onDblclick"])),c._editingNotes?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createBlock"])("input",{key:2,"onUpdate:modelValue":t[8]||(t[8]=function(e){return r.editedString=e}),onBlur:function(e){return i.cancelEdit(c)},onKeyup:Object(o["withKeys"])((function(e){return i.doneEditNotes(c)}),["enter"]),type:"text"},null,40,["onBlur","onKeyup"])),[[u,c._editingNotes],[o["vModelText"],r.editedString]]):Object(o["createCommentVNode"])("",!0)])):Object(o["createCommentVNode"])("",!0),n.config.columns.dueDate?(Object(o["openBlock"])(),Object(o["createBlock"])("div",_,[Object(o["createVNode"])(a,{placeholder:"No Due Date",modelValue:c.dueDate,"onUpdate:modelValue":function(e){return c.dueDate=e}},null,8,["modelValue","onUpdate:modelValue"])])):Object(o["createCommentVNode"])("",!0),B,n.config.subtasks&&c._showSubstasks?(Object(o["openBlock"])(),Object(o["createBlock"])("ul",N,[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(c.subtasks,(function(e){return Object(o["openBlock"])(),Object(o["createBlock"])("li",{key:e},[Object(o["createVNode"])("input",{class:"todd__input",type:"checkbox",onChange:function(t){return i.finishSubtask(e,c)}},null,40,["onChange"]),Object(o["createTextVNode"])(Object(o["toDisplayString"])(e),1)])})),128))])):Object(o["createCommentVNode"])("",!0),n.config.subtasks&&c._showSubstasks?Object(o["withDirectives"])((Object(o["openBlock"])(),Object(o["createBlock"])("input",{key:6,class:"add-subtask__input",type:"text","onUpdate:modelValue":function(e){return c._newSubtask=e},placeholder:"Enter subtask",onKeyup:Object(o["withKeys"])((function(e){return i.addSubtask(c)}),["enter"])},null,40,["onUpdate:modelValue","onKeyup"])),[[o["vModelText"],c._newSubtask]]):Object(o["createCommentVNode"])("",!0)])):Object(o["createCommentVNode"])("",!0)]})),_:1},8,["modelValue"])],64)}n("d81d"),n("159b"),n("4d63"),n("ac1f"),n("25f0"),n("fb6a"),n("a434"),n("b64b");var S=n("b76a"),D=n.n(S),C=n("24e7"),T={name:"Todo",components:{draggable:D.a,datepicker:C["a"]},props:["config"],data:function(){return{newTodo:"",filter:null,todos:[],editedString:null,keysToDelete:["_editing","_editingNotes","_editingImportance","_newSubtask","_showSubtasks"]}},created:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.displayTodos();case 2:case"end":return t.stop()}}),t)})))()},watch:{$route:{handler:function(){this.displayTodos()}},todos:{handler:function(){this.saveChanges?(this.save(),console.log("saved")):(console.log("skip save"),this.saveChanges=!0)},deep:!0},newTodo:{handler:function(){/^\//.test(this.newTodo)?this.filter=this.newTodo.substring(1):this.filter=null}}},methods:{displayTodos:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.axios.get("/api/todo/".concat(e.getParam()));case 2:n=t.sent,e.todos=n.data.map((function(t,n){return t._key=n,e.keysToDelete.forEach((function(e){t[e]=!1})),t.dueDate&&(t.dueDate=new Date(t.dueDate)),t._newSubtask="",t})),e.saveChanges=!0;case 5:case"end":return t.stop()}}),t)})))()},getParam:function(){return this.$route.query.file?"?file=".concat(this.$route.query.file):""},show:function(e){if(!this.filter)return!0;var t=new RegExp(this.filter,"i"),n=e.title;return isNaN(e.importance)||(n+=""+e.importance),"string"===typeof e.notes&&(n+=e.notes),e.dueDate&&(n+=e.dueDate.toISOString().slice(0,10)),t.test(n)},addTodo:function(){this.config.addTodosToTop?this.todos.unshift(this.createTodo(this.newTodo)):this.todos.push(this.createTodo(this.newTodo)),this.newTodo=""},addSubtask:function(e){e.subtasks=e.subtasks||[],e.subtasks.push(e._newSubtask),e._newSubtask=""},finishSubtask:function(e,t){t.subtasks.splice(t.subtasks.indexOf(e),1)},toggleSubtasks:function(e){e._showSubstasks=!e._showSubstasks,console.log(e._showSubstasks)},createTodo:function(e){var t={};return this.todos.length&&Object.keys(this.todos[0]).forEach((function(e){t[e]=null})),Object.assign(t,{title:e,done:!1})},reOrder:function(e){this.todos.sort((function(t,n){var o=t[e]-n[e];switch(e){case"importance":if(o>0)return-1;if(o<0)return 1;break;case"dueDate":if(!t[e]&&n[e])return 1;if(!n[e]&&t[e])return-1;if(o>0)return 1;if(o<0)return-1;break;case"title":if(console.log("sort"),t[e].toLowerCase()<n[e].toLowerCase())return-1;if(t[e].toLowerCase()>n[e].toLowerCase())return 1;break}return 0}))},save:function(){var e=this;this.axios.post("/api/todo/".concat(this.getParam()),this.todos.map((function(t){var n=Object.assign({},t);return e.keysToDelete.forEach((function(e){delete n[e]})),delete n._key,n.done||delete n.done,n.dueDate&&(n.dueDate=n.dueDate.toISOString()),n})));var t=this.todos.length;while(--t>-1){var n=this.todos[t];n.done&&(this.saveChanges=!1,this.todos.splice(t,1))}},edit:function(e){e._editing=!0,this.editedString=e.title},editNotes:function(e){e._editingNotes=!0,this.editedString=e.notes},editImportance:function(e){e._editingImportance=!0,this.editedString=e.importance},cancelEdit:function(e){e._editing=!1,e._editingNotes=!1,e._editingImportance=!1,this.editedString=null},doneEdit:function(e){e._editing=!1,e.title=this.editedString,this.editedString=null},doneEditNotes:function(e){e._editingNotes=!1,e.notes=this.editedString,this.editedString=null},doneEditImportance:function(e){e._editingImportance=!1,e.importance=parseInt(this.editedString),this.editedString=null}},directives:{"todo-focus":function(e,t){t.value&&e.focus()}}};n("e91e");T.render=V;var x=T,E={name:"Home",components:{Todo:x},props:["config"]};E.render=p;var I=E,P=[{path:"/",name:"Home",component:I},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],M=Object(d["a"])({history:Object(d["b"])("/"),routes:P}),K=M,U=n("bc3a"),R=n.n(U),F=n("2106"),L=n.n(F);Object(o["createApp"])(l).use(K).use(L.a,R.a).mount("#app")},c04ec:function(e,t,n){"use strict";n("2507")},e91e:function(e,t,n){"use strict";n("1cbe")}});
//# sourceMappingURL=app.98707e36.js.map