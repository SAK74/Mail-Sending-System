(this["webpackJsonpmail-sending-system"]=this["webpackJsonpmail-sending-system"]||[]).push([[0],{185:function(e,t,n){},270:function(e,t,n){},271:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n(44),i=n.n(c),s=n(19),a=n(42),l=n(3),o=n(15),u=n(62),d=n(131),j=n.n(d),b={};function f(e){return console.log("config: ",e),j()(e).then((function(e){return e.data})).catch((function(e){var t,n;e.response?(console.error("err.response: ",e.response),t=e.response.data.error?e.response.data.error.message:null===(n=e.response.data)||void 0===n?void 0:n.message):(console.error(e),t=e.message);throw console.log(t),$.dispatch(A(t)),Error(t)}))}var O,h,m={get:function(e){return f(e)},patch:function(e){return e.headers=Object(o.a)(Object(o.a)({},null===e||void 0===e?void 0:e.headers),null===b||void 0===b?void 0:b.headers),f(Object(o.a)(Object(o.a)({},e),{},{method:"PATCH"}))},post:function(e){return e.headers=Object(o.a)(Object(o.a)({},null===e||void 0===e?void 0:e.headers),null===b||void 0===b?void 0:b.headers),f(Object(o.a)(Object(o.a)({},e),{},{method:"POST"}))},_delete:function(e){return f(Object(o.a)(Object(o.a)({},e),{},{method:"DELETE"}))}},x=function(e){return"subscribers"===e?"https://enuxp5t0vvqu400.m.pipedream.net":"https://enb5zkce5jncfjh.m.pipedream.net"},p=function(e){return Object(a.b)("fetch".concat(e),(function(){return m.get(x(e)).then((function(e){return e.records}))}))},v=["id"],g=p("subscribers"),S=Object(a.c)({sortComparer:function(e,t){return e.createdTime.localeCompare(t.createdTime)}}),y=S.getInitialState({status:"iddle",error:null}),k=Object(a.d)({name:"subscribers",initialState:y,reducers:{updateSubscriber:function(e,t){var n=t.payload,r=n.id,c=Object(u.a)(n,v);S.updateOne(e,{id:r,changes:Object(o.a)({},c)})},_addSubscriber:function(e,t){var n=t.payload;return S.addOne(e,n)},_deleteSubscribers:function(e,t){var n=t.payload;return S.removeMany(e,n)},setStatusSubscr:function(e,t){var n=t.payload;e.status=n},setError:function(e,t){var n=t.payload;e.error=n}},extraReducers:(O={},Object(l.a)(O,g.pending,(function(e){e.status="pending"})),Object(l.a)(O,g.fulfilled,(function(e,t){var n=t.payload;e.status="iddle",S.setAll(e,n)})),Object(l.a)(O,g.rejected,(function(e,t){var n=t.error;t.payload;e.status="failed",e.error=n.message})),O)}),w=k.actions,C=w.setStatusSubscr,M=w.updateSubscriber,E=w._addSubscriber,T=w._deleteSubscribers,A=w.setError,I=S.getSelectors((function(e){return e.subscribers})),B=I.selectAll,q=(I.selectById,k.reducer),D=["id"],N=p("mails"),P=Object(a.c)({sortComparer:function(e,t){return e.createdTime.localeCompare(t.createdTime)}}),R=P.getInitialState({status:"iddle",error:null,openModal:!1}),z=Object(a.d)({name:"mails",initialState:R,reducers:{updateMail:function(e,t){var n=t.payload,r=n.id,c=Object(u.a)(n,D);return P.updateOne(e,{id:r,changes:Object(o.a)({},c)})},deleteMails:function(e,t){var n=t.payload;return P.removeMany(e,n)},addMail:function(e,t){var n=t.payload;return P.addOne(e,n)},setStatusMails:function(e,t){var n=t.payload;e.status=n},setStatusEditor:function(e,t){var n=t.payload;e.openModal=n}},extraReducers:(h={},Object(l.a)(h,N.pending,(function(e){e.status="pending"})),Object(l.a)(h,N.fulfilled,(function(e,t){var n=t.payload;e.status="iddle",P.setAll(e,n)})),Object(l.a)(h,N.rejected,(function(e,t){var n=t.error;e.status="failed",e.error=n.message})),h)}),W=z.reducer,F=z.actions,U=F.updateMail,_=F.deleteMails,G=F.setStatusMails,J=F.setStatusEditor,L=F.addMail,V=P.getSelectors((function(e){return e.mails})),H=V.selectAll,X=(V.selectById,Object(a.d)({name:"snackBar",initialState:{open:!1,message:""},reducers:{showSnack:function(e,t){var n=t.payload;e.open=!0,e.message=n},hideSnack:function(e){e.open=!1}}})),Y=X.reducer,K=X.actions,Q=K.showSnack,Z=K.hideSnack,$=Object(a.a)({reducer:{subscribers:q,mails:W,snackBar:Y}}),ee=n(53),te=n(16),ne=(n(185),n(336)),re=n(344),ce=n(33),ie=n(20),se=n.n(ie),ae=n(331),le=n(320),oe=n(340),ue=n(342),de=n(321),je=n(339),be=n(60),fe=n(4),Oe=n(330),he=n(1),me=["name","control","rules"],xe=Object(fe.a)((function(e){var t=e.name,n=e.control,r=e.rules,c=Object(u.a)(e,me),i=Object(be.a)({name:t,control:n,rules:r,defaultValue:""}),s=i.field,a=s.ref,l=s.onChange,d=s.onBlur,j=s.value,b=i.fieldState,f=b.invalid,O=b.error;return Object(he.jsx)(Oe.a,Object(o.a)(Object(o.a)({},c),{},{name:t,value:j,size:"small",label:t,error:f,helperText:f&&O.message,inputRef:a,inputProps:Object(o.a)(Object(o.a)({},d),{},{onChange:l})}))}))((function(e){return{margin:e.theme.spacing(1)}})),pe=n(11),ve=n(329),ge=n(142),Se=n(334),ye=n(136),ke=n.n(ye),we={url:"https://en94ayn8crcmn4i.m.pipedream.net"},Ce=$.dispatch,Me=function(e){return function(t,n){return Ce("subscribers"===e?C("pending"):G("pending")),function(e){return function(t,n){var r={baseURL:x(e),headers:{"Content-type":"application/json"},data:JSON.stringify(Object(o.a)(Object(o.a)({},{fields:n}),{},{id:t}))};return m.patch(r).then((function(e){return e}))}}(e)(t,n).then((function(t){console.log(t),Ce("subscribers"===e?M(t):U(t))})).finally((function(){return Ce("subscribers"===e?C("iddle"):G("iddle"))}))}},Ee=function(e){return function(t){t.length?confirm("Are You sure to delete selected items?!.")&&(Ce("subscribers"===e?C("pending"):G("pending")),function(e){return function(t){var n={baseURL:x(e),headers:{"Content-type":"application/json"},params:t};return m._delete(n).then((function(e){return e.records}))}}(e)(t).then((function(t){return Ce("subscribers"===e?T(t.map((function(e){return e.id}))):_(t.map((function(e){return e.id}))))})).finally((function(){return Ce("subscribers"===e?C("iddle"):G("iddle"))}))):alert("Neither item is't selected")}},Te=function(e){return function(t){return Ce(C("pending")),function(e){return function(t){var n={baseURL:x(e),headers:{"Content-type":"application/json"},data:JSON.stringify({fields:t})};return m.post(n).then((function(e){return e}))}}(e)(t).then((function(t){return Ce("subscribers"===e?E(t):L(t)),t.id})).finally((function(){return Ce(C("iddle"))}))}},Ae=function(e,t){var n;if(!e){var r=$.getState().mails;if(!(e=Object.values(r.entities).find((function(e){return"toSend"===e.fields.status}))))return void alert("Neither mail is't selected")}if(null===(n=t)||void 0===n||!n.length){var c,i=$.getState().subscribers;if(null===(c=t=Object.values(i.entities).filter((function(e){return e.fields.selected})))||void 0===c||!c.length)return void alert("Neither subscriber is't selected")}Ce(C("pending")),function(e,t){var n=e.map((function(e){var n={from:"exitedUser@sandbox9a593161d9ef4be5b0bb14cf2696733a.mailgun.org",to:e.email,subject:t.subject,text:t.content.replace("<name>",e.name)};return we.data=n,m.post(we).then((function(e){return e}))}));return Promise.allSettled(n).then((function(e){return console.log(e),e}))}(t.map((function(e){return e.fields})),e.fields).then((function(n){var r=t.filter((function(e,t){return"fulfilled"===n[t].status})).map((function(e){return e.fields.name})).join(", "),c=t.filter((function(e,t){return"rejected"===n[t].status})).map((function(e){return e.fields.name})).join(", ");r&&(Ce(Q("E-mail was sent to: ".concat(r))),Me("mails")(e.id,{status:"sent"})),c&&Ce(Q("Dont sent to ".concat(c)))})).finally((function(){return Ce(C("iddle"))}))};function Ie(e){var t=e.selSubscr,n=Object(r.useState)(null),c=Object(pe.a)(n,2),i=c[0],s=c[1];return Object(he.jsxs)(he.Fragment,{children:[Object(he.jsx)(ve.a,{title:"Menu",children:Object(he.jsx)(ue.a,{onClick:function(e){var t=e.currentTarget;return s(t)},children:Object(he.jsx)(ke.a,{fontSize:"large"})})}),Object(he.jsxs)(ge.a,{open:!!i,anchorEl:i,onClose:function(){return s(null)},children:[Object(he.jsx)(Se.a,{dense:!0,children:"Delete selected",onClick:function(){s(null),Ee("subscribers")(t.map((function(e){return e.id})))}},"delete"),Object(he.jsx)(Se.a,{dense:!0,children:"Send mail to selected",onClick:function(){s(null),Ae(null,t)}},"send mail")]})]})}var Be=n(335),qe=n(337),De=n(338),Ne=n(343);function Pe(){return Object(he.jsx)(he.Fragment,{children:new Array(Math.floor(7*Math.random()+3)).fill(null).map((function(e,t){return Object(he.jsxs)(Be.a,{children:[Object(he.jsx)(qe.a,{variant:"circular",children:Object(he.jsx)(De.a,{})}),Object(he.jsxs)(Ne.a,{sx:{flexGrow:1,ml:2,maxWidth:"".concat(40*Math.random()+30,"%")},children:[Object(he.jsx)(qe.a,{width:"40%"}),Object(he.jsx)(qe.a,{})]})]},t)}))})}var Re=Object(r.memo)(Pe),ze=n(137),We=n.n(ze);var Fe=Object(s.b)((function(e){var t=e.mails.openModal,n=t.subject,r=t.content;return{subject:t?n:"",content:t?r:"",id:null===t||void 0===t?void 0:t.id,openModal:Boolean(t)}}),{setStatusEditor:J})((function(e){var t=e.openModal,n=e.subject,c=e.content,i=e.id,s=e.setStatusEditor,a=Object(be.b)({defaultValues:{subject:n,content:c},mode:"all"}),l=a.control,u=a.handleSubmit,d=a.reset;Object(r.useEffect)((function(){return d({subject:n,content:c})}),[t]);var j=function(){var e=Object(ce.a)(se.a.mark((function e(t,n){var r;return se.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.target.innerText,console.log(t,r),!i){e.next=7;break}return e.next=5,Me("mails")(i,Object(o.a)(Object(o.a)({},t),{},{status:"toSend"}));case 5:e.next=9;break;case 7:return e.next=9,Te("mails")(Object(o.a)(Object(o.a)({},t),{},{status:"toSend"})).then((function(e){return i=e}));case 9:"SAVE"!==r&&Ae({id:i,fields:t}),s(!1);case 11:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return Object(he.jsx)(ae.a,{open:!!t,hideBackdrop:!0,sx:{display:"flex",justifyContent:"center",alignItems:"center",backdropFilter:"blur(2px)"},children:Object(he.jsx)(le.a,{in:!!t,timeout:800,children:Object(he.jsxs)(oe.a,{sx:{p:2,pt:5,display:"flex",flexDirection:"column",width:"70%",maxWidth:"95%",position:"relative"},children:[Object(he.jsx)(ue.a,{onClick:function(){return s(!1)},sx:{position:"absolute",top:0,right:0},children:Object(he.jsx)(We.a,{})}),Object(he.jsx)(xe,{name:"subject",control:l}),Object(he.jsx)(xe,{name:"content",multiline:!0,minRows:3,maxRows:6,required:!0,control:l,rules:{required:"This field must be filled",validate:function(e){return Boolean(e.replace(/\n/g,""))||"This field must be filled"}}}),Object(he.jsxs)(de.a,{direction:"row",spacing:3,children:[Object(he.jsx)(je.a,{children:"save & send",onClick:u(j)}),Object(he.jsx)(je.a,{children:"save",onClick:u(j)})]})]})})})})),Ue=n(333),_e=function(){var e=Object(s.d)((function(e){return e.snackBar})),t=e.open,n=e.message,r=Object(s.c)();return Object(he.jsx)(Ue.a,{open:t,message:n,transitionDuration:1e3,autoHideDuration:5e3,anchorOrigin:{vertical:"top",horizontal:"center"},onClose:function(){return r(Z())}},n)};function Ge(){var e=Object(s.d)((function(e){return e.subscribers.status})),t=Object(s.d)((function(e){return e.mails.status}));return Object(he.jsxs)("div",{className:"dashboard",children:[Object(he.jsxs)("nav",{children:[Object(he.jsx)(ee.b,{to:"/subscribers",children:"Subscribers"}),Object(he.jsx)(ee.b,{to:"mails",children:"E-mails"})]}),Object(he.jsx)("hr",{}),Object(he.jsx)(_e,{}),Object(he.jsx)(te.b,{}),Object(he.jsx)(ne.a,{children:Object(he.jsx)(re.a,{}),open:"pending"===e||"pending"===t,invisible:!0,sx:{zIndex:1301}}),Object(he.jsx)(Fe,{})]})}var Je=n(139),Le=n.n(Je),Ve=n(138),He=n.n(Ve);function Xe(){var e=Object(s.c)(),t=Object(be.b)({mode:"all"}),n=t.handleSubmit,r=t.formState.isSubmitting,c=t.reset,i=t.control,a=function(){var t=Object(ce.a)(se.a.mark((function t(n){return se.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Te("subscribers")(n).then((function(){c(),e(Q("Subscriber has been added successfully!"))}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(he.jsx)(oe.a,{sx:{p:2},children:Object(he.jsxs)("form",{onSubmit:n(a),noValidate:!0,children:[Object(he.jsx)(xe,{name:"name",required:!0,control:i,rules:{required:"Name is required!"}}),Object(he.jsx)(xe,{name:"email",required:!0,control:i,rules:{required:"E-mail is required!",validate:function(e){return He.a.isEmail(e)||"Wrong E-mail format"}}}),Object(he.jsx)(je.a,{variant:"outlined",type:"submit",children:"Add",endIcon:r?Object(he.jsx)(re.a,{size:15}):Object(he.jsx)(Le.a,{}),size:"small",sx:{ml:8}})]})})}var Ye=Object(r.memo)(Xe),Ke=n(341),Qe=n(346),Ze=n(332),$e=function(e){var t=e.name,n=e.ids,c=Object(r.useState)("indeterminate"),i=Object(pe.a)(c,2),s=i[0],a=i[1];return Object(he.jsx)(ve.a,{title:"checked"===s?"Unselect all":"Select all",children:Object(he.jsx)(Ze.a,{indeterminate:"indeterminate"===s,checked:"checked"===s,color:"default",onChange:function(){var e="checked"!==s,r=n.map((function(n){return Me(t)(n,{selected:e})}));Promise.all(r).then((function(){return a((function(e){return"checked"!==e?"checked":"unchecked"}))}))}})})},et=n(140),tt=n.n(et);function nt(e){var t=e.mails.filter((function(e){return e.fields.selected}));return Object(he.jsx)(ve.a,{title:"Delete selected",children:Object(he.jsx)(ue.a,{onClick:function(){return Ee("mails")(t.map((function(e){return e.id})))},children:Object(he.jsx)(tt.a,{})})})}function rt(){return Object(he.jsx)(he.Fragment,{children:new Array(Math.floor(5*Math.random()+3)).fill(null).map((function(e,t){return Object(he.jsxs)(Be.a,{children:[Object(he.jsxs)(Ne.a,{sx:{display:"flex",flexDirection:"column",flexGrow:1,alignItems:"flex-start",ml:7},children:[Object(he.jsx)(qe.a,{width:40*Math.random()+20+"%",component:"div"}),Object(he.jsx)(qe.a,{variant:"rectangular",width:"70%",height:30,component:"div"})]}),Object(he.jsx)(qe.a,{variant:"rectangular",width:20,height:20,sx:{mr:2}}),Object(he.jsx)(qe.a,{variant:"rectangular",width:20,height:20})]},t)}))})}var ct=Object(r.memo)(rt),it=n(322),st=n(323),at=n(345);function lt(e){var t=e.id,n=e.num,r=e.arr,c=e.email,i=e.name,a=e.selected,l=Object(s.d)((function(e){return e.subscribers})).status;return Object(he.jsx)(he.Fragment,{children:Object(he.jsx)(Be.a,{alignItems:"flex-start",divider:n!==r.length-1,secondaryAction:Object(he.jsx)(Ze.a,{edge:"end",checked:!!a,disabled:"pending"===l,onChange:function(){return Me("subscribers")(t,{selected:!a})}}),dense:!0,disablePadding:!0,children:Object(he.jsxs)(it.a,{onClick:function(){return Me("subscribers")(t,{selected:!a})},children:[Object(he.jsx)(st.a,{sx:{maxWidth:25},children:Object(he.jsxs)("h3",{children:[n+1,". "]})}),Object(he.jsx)(at.a,{children:Object(he.jsx)(De.a,{children:i.at(0).toUpperCase()})}),Object(he.jsx)(st.a,{primary:i,secondary:c})]})},t)})}var ot=Object(r.memo)(lt),ut=function(){var e=Object(s.d)((function(e){return e.subscribers})).status,t=Object(s.c)();Object(r.useEffect)((function(){"iddle"===e&&t(p("subscribers")())}),[]);var n=Object(s.d)(B);return Object(he.jsx)(oe.a,{sx:{maxWidth:500,width:"100%"},children:Object(he.jsxs)(Ke.a,{dense:!0,children:[Object(he.jsxs)(Qe.a,{sx:{display:"flex"},children:[Object(he.jsx)(Ie,{selSubscr:n.filter((function(e){return e.fields.selected}))}),Object(he.jsx)(Ne.a,{children:"Subscribers",component:"span",sx:{flexGrow:1}}),Object(he.jsx)($e,{name:"subscribers",ids:n.map((function(e){return e.id}))})]}),n.length||"pending"!==e?n.map((function(e,t,n){var r=e.id,c=e.fields;return Object(he.jsx)(ot,Object(o.a)({},Object(o.a)(Object(o.a)({},c),{},{num:t,arr:n,id:r})),r)})):Object(he.jsx)(Re,{})]})})},dt=n(351),jt=n(326),bt=n(327),ft=n(324),Ot=n(325),ht=n(347),mt=n(348),xt=n(349),pt=n(350);function vt(e){var t=e.subject,n=e.content,r=e.id,c=Object(s.c)();return Object(he.jsxs)(ht.a,{sx:{p:2,alignSelf:"start",width:200},children:[Object(he.jsx)(mt.a,{title:"Mail to send",titleTypographyProps:{variant:"body1"},subheader:t||"...",subheaderTypographyProps:{}}),Object(he.jsx)(xt.a,{sx:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},children:n||"..."}),Object(he.jsxs)(pt.a,{children:[Object(he.jsx)(ve.a,{title:"Show / edit",children:Object(he.jsx)("span",{children:Object(he.jsx)(ue.a,{children:Object(he.jsx)(ft.a,{color:r?"primary":"default"}),disabled:!r,onClick:function(){return c(J({subject:t,content:n,id:r}))}})})}),Object(he.jsx)(ve.a,{title:"Create new",children:Object(he.jsx)("span",{children:Object(he.jsx)(ue.a,{children:Object(he.jsx)(Ot.a,{color:"primary"}),onClick:function(){return c(J(!0))}})})})]})]})}var gt=Object(r.memo)(vt);var St=function(){var e=Object(s.d)(H).find((function(e){return"toSend"===e.fields.status})),t=Object(r.useState)(!1),n=Object(pe.a)(t,2),c=n[0],i=n[1];return Object(he.jsxs)(Ne.a,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[Object(he.jsxs)(Ne.a,{sx:{width:"70%",my:2},children:[Object(he.jsx)("span",{children:"Enter a new subscriber"}),Object(he.jsx)(ue.a,{onClick:function(){return i(!c)},children:c?Object(he.jsx)(bt.a,{}):Object(he.jsx)(jt.a,{})}),Object(he.jsx)(dt.a,{in:c,children:Object(he.jsx)(Ye,{})})]}),Object(he.jsxs)(de.a,{direction:"row",spacing:5,children:[Object(he.jsx)(ut,{}),e?Object(he.jsx)(gt,Object(o.a)({},Object(o.a)(Object(o.a)({},e.fields),{},{id:e.id}))):Object(he.jsx)(gt,{})]})]})},yt=n(328),kt=function(e){var t=e.subject,n=e.content,r=e.selected,c=e.id,i=e.status,a=Object(s.d)((function(e){return e.mails})).status,l=Object(s.c)(),o=Object(te.h)();return Object(he.jsx)(he.Fragment,{children:Object(he.jsx)(Be.a,{secondaryAction:Object(he.jsxs)(Ne.a,{children:["sent"!==i&&Object(he.jsx)(ve.a,{title:"Edit mail",children:Object(he.jsx)(ue.a,{children:Object(he.jsx)(ft.a,{}),onClick:function(){return l(J({subject:t,content:n,id:c}))}})}),Object(he.jsx)(ve.a,{title:"Send to selected subscribers",children:Object(he.jsx)(ue.a,{children:Object(he.jsx)(yt.a,{}),onClick:function(){Ae({id:c,fields:{subject:t,content:n}}),o("/subscribers",{replace:!0})}})})]}),children:Object(he.jsxs)(it.a,{onClick:function(){return Me("mails")(c,{selected:!r})},children:[Object(he.jsx)(Ze.a,{checked:!!r,disabled:"pending"===a,onClick:function(){return Me("mails")(c,{selected:!r})}}),Object(he.jsx)(st.a,{primary:t,secondary:n})]})})})},wt=Object(r.memo)(kt),Ct=function(e){var t=e.title,n=e.mails,r=Object(s.d)((function(e){return e.mails})).status;return Object(he.jsx)(oe.a,{sx:{width:"100%",maxWidth:500},children:Object(he.jsxs)(Ke.a,{dense:!0,children:[Object(he.jsxs)(Qe.a,{sx:{display:"flex"},children:[Object(he.jsx)($e,{name:"mails",ids:n.map((function(e){return e.id}))}),Object(he.jsx)(nt,{mails:n}),Object(he.jsx)(Ne.a,{component:"span",sx:{flexGrow:1},children:t})]}),n.length||"pending"!==r?n.map((function(e){var t=e.id,n=e.fields;return Object(he.jsx)(wt,Object(o.a)({},Object(o.a)(Object(o.a)({},n),{},{id:t})),t)})):Object(he.jsx)(ct,{})]})})},Mt=function(){var e=Object(s.d)(H);return Object(he.jsxs)(de.a,{direction:"row",spacing:5,paddingX:5,children:[Object(he.jsx)(Ct,{title:"Working direktory",mails:e.filter((function(e){return"sent"!==e.fields.status}))}),Object(he.jsx)(Ct,{title:"Sent mails",mails:e.filter((function(e){return"sent"===e.fields.status}))})]})};n(270);function Et(){return Object(he.jsx)("div",{className:"App",children:Object(he.jsx)(te.e,{children:Object(he.jsxs)(te.c,{path:"/",element:Object(he.jsx)(Ge,{}),children:[Object(he.jsx)(te.c,{path:"/",index:!0,element:Object(he.jsx)(te.a,{to:"subscribers"})}),Object(he.jsx)(te.c,{path:"subscribers",element:Object(he.jsx)(St,{})}),Object(he.jsx)(te.c,{path:"mails",element:Object(he.jsx)(Mt,{})})]})})})}$.dispatch(p("mails")());var Tt=document.getElementById("root");i.a.render(Object(he.jsx)(r.StrictMode,{children:Object(he.jsx)(s.a,{store:$,children:Object(he.jsx)(ee.a,{children:Object(he.jsx)(Et,{})})})}),Tt)}},[[271,1,2]]]);
//# sourceMappingURL=main.05220e5b.chunk.js.map