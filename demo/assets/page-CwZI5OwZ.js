var D=s=>{throw TypeError(s)};var A=(s,e,t)=>e.has(s)||D("Cannot "+t);var a=(s,e,t)=>(A(s,e,"read from private field"),t?t.call(s):e.get(s)),E=(s,e,t)=>e.has(s)?D("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(s):e.set(s,t),k=(s,e,t,r)=>(A(s,e,"write to private field"),r?r.call(s,t):e.set(s,t),t),P=(s,e,t)=>(A(s,e,"access private method"),t);import{S as z,P as F,Q as U,T as J,V,W as X,r as m,X as Y,Y as Z,B,D as n,Z as I,C as G,$ as ee,a0 as _,a1 as te,a2 as se}from"./index-CWU0nXLH.js";import{l as re,u as ne}from"./useChatHistory-CARmINUR.js";var C,j,d,b,w,M,q,K,ae=(K=class extends z{constructor(e,t){super();E(this,w);E(this,C);E(this,j);E(this,d);E(this,b);k(this,C,e),this.setOptions(t),this.bindMethods(),P(this,w,M).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){var r;const t=this.options;this.options=a(this,C).defaultMutationOptions(e),F(this.options,t)||a(this,C).getMutationCache().notify({type:"observerOptionsUpdated",mutation:a(this,d),observer:this}),t!=null&&t.mutationKey&&this.options.mutationKey&&U(t.mutationKey)!==U(this.options.mutationKey)?this.reset():((r=a(this,d))==null?void 0:r.state.status)==="pending"&&a(this,d).setOptions(this.options)}onUnsubscribe(){var e;this.hasListeners()||(e=a(this,d))==null||e.removeObserver(this)}onMutationUpdate(e){P(this,w,M).call(this),P(this,w,q).call(this,e)}getCurrentResult(){return a(this,j)}reset(){var e;(e=a(this,d))==null||e.removeObserver(this),k(this,d,void 0),P(this,w,M).call(this),P(this,w,q).call(this)}mutate(e,t){var r;return k(this,b,t),(r=a(this,d))==null||r.removeObserver(this),k(this,d,a(this,C).getMutationCache().build(a(this,C),this.options)),a(this,d).addObserver(this),a(this,d).execute(e)}},C=new WeakMap,j=new WeakMap,d=new WeakMap,b=new WeakMap,w=new WeakSet,M=function(){var t;const e=((t=a(this,d))==null?void 0:t.state)??J();k(this,j,{...e,isPending:e.status==="pending",isSuccess:e.status==="success",isError:e.status==="error",isIdle:e.status==="idle",mutate:this.mutate,reset:this.reset})},q=function(e){V.batch(()=>{var t,r,i,o,c,u,f,x;if(a(this,b)&&this.hasListeners()){const h=a(this,j).variables,p=a(this,j).context;(e==null?void 0:e.type)==="success"?((r=(t=a(this,b)).onSuccess)==null||r.call(t,e.data,h,p),(o=(i=a(this,b)).onSettled)==null||o.call(i,e.data,null,h,p)):(e==null?void 0:e.type)==="error"&&((u=(c=a(this,b)).onError)==null||u.call(c,e.error,h,p),(x=(f=a(this,b)).onSettled)==null||x.call(f,void 0,e.error,h,p))}this.listeners.forEach(h=>{h(a(this,j))})})},K);function ie(s,e){const t=X(),[r]=m.useState(()=>new ae(t,s));m.useEffect(()=>{r.setOptions(s)},[r,s]);const i=m.useSyncExternalStore(m.useCallback(c=>r.subscribe(V.batchCalls(c)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),o=m.useCallback((c,u)=>{r.mutate(c,u).catch(Y)},[r]);if(i.error&&Z(r.options.throwOnError,[i.error]))throw i.error;return{...i,mutate:o,mutateAsync:i.mutate}}/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 12-4-4-4 4",key:"177agl"}],["path",{d:"M12 16V8",key:"1sbj14"}]],ce=B("CircleArrowUp",oe);/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]],ue=B("CirclePlus",le);/**
 * @license lucide-react v0.479.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]],de=B("Pause",he),me=({user:s,assistant:e})=>n.jsxs("div",{className:"w-full mx-auto p-4 bg-white",children:[s&&n.jsx("div",{className:"flex justify-end",children:n.jsx("div",{className:"p-2 rounded-lg text-base bg-primary text-white",children:n.jsx("span",{className:"break-words",children:s})})}),e&&n.jsxs("div",{className:"flex items-start space-x-2 w-full mt-10",children:[n.jsx("img",{className:"w-9 h-9 rounded-full",src:re,alt:"logo"}),n.jsx("div",{className:"flex max-w-xl text-gray-500 text-base bg-gray-100 p-2 rounded-lg",children:n.jsx("span",{className:"break-words",children:e.split("<br />").map((t,r)=>n.jsxs("span",{children:[t,n.jsx("br",{})]},r))})})]})]});function fe(s){const e=new TextDecoder,t=new TextEncoder;let r="";const i=new TransformStream({async transform(o,c){var y,N,v;const u=e.decode(o,{stream:!0}),f=r+u;let x="";const h=f.split(`
`);f.endsWith(`
`)||(x=h.pop()??"");let p="";for(const O of h){const R=O.trim();if(R&&R.startsWith("data:")){const T=R.slice(5).trim();if(T==="[DONE]")continue;try{const g=JSON.parse(T.replace(/\\n/g,"<br />")),l=(v=(N=(y=g==null?void 0:g.choices)==null?void 0:y[0])==null?void 0:N.delta)==null?void 0:v.content;typeof l=="string"&&(p+=l)}catch(g){console.error("Lỗi JSON:",g,"Dữ liệu lỗi:",T)}}}r=x,c.enqueue(t.encode(p))},flush(o){r&&o.enqueue(t.encode(r))}});return s.pipeThrough(i)}const xe=I.create({baseURL:"https://server2.loca.lt"}),pe=async(s,e,t)=>{let r=0;await xe.post("/v1/chat/completions",{model:"Vistral-7B-Chat",messages:[{role:"user",content:s}],max_tokens:200,stream:!0},{responseType:"text",cancelToken:t,onDownloadProgress:i=>{const c=i.event.target.responseText,u=c.substring(r);r=c.length;const f=new ReadableStream({start(y){y.enqueue(new TextEncoder().encode(u)),y.close()}}),h=fe(f).getReader(),p=new TextDecoder;h.read().then(({value:y,done:N})=>{if(N)return;const v=p.decode(y,{stream:!0});v&&e(v)})}})},H=m.createContext({}),ye=({children:s})=>{const{isUser:e}=G(),{currentChatId:t}=ne(),[r,i]=m.useState(""),[o,c]=m.useState([]),[u,f]=m.useState(!1),x=m.useRef(null),{refetch:h}=ee({queryKey:["listChat"],queryFn:async()=>{const{data:l}=await se(t);return c(l),l},enabled:!1,retry:!1}),{mutate:p,isError:y,isPaused:N,error:v,isPending:O}=ie({mutationFn:async l=>{f(!0),x.current=I.CancelToken.source();let S="";await pe(l,Q=>{f(!1),S+=Q,c($=>{const L=[...$];return L[L.length-1].assistant=S,[...L]})},x.current.token),f(!1),R()}}),R=async()=>{try{const{user:l,assistant:S}=o[o.length-1];await te(t,l,S)}catch(l){console.error(l)}},T=l=>{if(o.length>5&&!e){_.warn("Vui lòng đăng nhập để có thể tiếp tục chat");return}e||_.warn("Đoạn chat của bạn sẽ không được lưu, Vui lòng đăng nhập"),c(S=>[...S,{user:l,assistant:""}]),p(l)},g=()=>{x.current&&x.current.cancel("Người dùng đã hủy request!"),f(!1)};return m.useEffect(()=>{const l=()=>{g()};return window.addEventListener("beforeunload",l),()=>{window.removeEventListener("beforeunload",l)}},[]),m.useEffect(()=>(t&&h(),()=>{g()}),[t,h]),m.useEffect(()=>{y&&f(!1)},[y,v]),n.jsx(H.Provider,{value:{prompt:r,isError:y,error:v,listChat:o,loadingResAt:u,isPending:O,isPaused:N,sendMessage:T,setPrompt:i,stopChat:g},children:s})},W=()=>{const s=m.useContext(H);if(!s)throw new Error("useChat must be used within ChatBotProvider");return s},ge=()=>{const{listChat:s,loadingResAt:e,isError:t,error:r}=W();return s.length?n.jsx("div",{className:"w-full flex-1 overflow-y-auto",children:n.jsx("div",{className:"min-w-[768px] max-md:min-w-full flex justify-center",children:n.jsxs("div",{className:"flex flex-col w-full max-w-2xl space-y-3 mb-4 ",children:[s.map((i,o)=>n.jsx(me,{user:i.user,assistant:i.assistant},o)),e&&n.jsx("span",{children:"Vui lòng chờ...."}),t&&r.code!=="ERR_CANCELED"&&n.jsx("span",{className:"text-red-500",children:"Xảy ra lỗi vui lòng thử lại"})]})})}):n.jsx("div",{className:"w-full text-center text-4xl p-4",children:n.jsx("h1",{children:"Tôi có thể giúp gì cho sức khỏe của bạn"})})},be=()=>{const{prompt:s,setPrompt:e,sendMessage:t,stopChat:r,isPending:i,isPaused:o}=W(),c=u=>{u.preventDefault(),!(!s.trim()||i)&&(t(s),e(""))};return n.jsx("div",{className:"flex w-full mb-10 justify-center items-center",children:n.jsxs("form",{onSubmit:c,className:"flex items-center justify-between min-w-[768px] bg-gradient-to-r from-primary to-blue-600 rounded-full px-4 py-2 shadow-md",children:[n.jsx("button",{type:"button",className:"p-2 text-white hover:opacity-70",children:n.jsx(ue,{className:"w-8 h-8"})}),n.jsx("input",{type:"text",className:"flex-1 bg-white px-4 py-1 rounded-full outline-none text-gray-700 mx-4",placeholder:"Hỏi bất cứ điều gì về sức khỏe của bạn",value:s,onChange:u=>e(u.target.value)}),i&&!o?n.jsx("button",{type:"button",className:"p-2 text-white hover:opacity-70",onClick:r,children:n.jsx(de,{})}):n.jsx("button",{type:"submit",className:"p-2 text-white hover:opacity-70",children:n.jsx(ce,{className:"w-8 h-8"})})]})})},je=()=>n.jsx("div",{className:"w-full h-full flex flex-col justify-center items-center",children:n.jsxs(ye,{children:[n.jsx(ge,{}),n.jsx(be,{})]})});export{je as default};
