import{r as o,j as e,L as u,a as y}from"./app-BMRIRtC2.js";import{K as k}from"./transition-H1DAjSOi.js";const f=o.createContext(),c=({children:s})=>{const[t,r]=o.useState(!1),n=()=>{r(a=>!a)};return e.jsx(f.Provider,{value:{open:t,setOpen:r,toggleOpen:n},children:e.jsx("div",{className:"relative",children:s})})},N=({children:s})=>{const{open:t,setOpen:r,toggleOpen:n}=o.useContext(f);return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:n,children:s}),t&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>r(!1)})]})},C=({align:s="right",width:t="48",contentClasses:r=" bg-white",children:n})=>{const{open:a,setOpen:d}=o.useContext(f);let h="origin-top";s==="left"?h="ltr:origin-top-left rtl:origin-top-right start-0":s==="right"&&(h="ltr:origin-top-right rtl:origin-top-left end-0");let x="";return t==="48"&&(x="w-48"),e.jsx(e.Fragment,{children:e.jsx(k,{show:a,enter:"transition ease-out duration-200",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:e.jsx("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${h} ${x}`,onClick:()=>d(!1),children:e.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+r,children:n})})})})},M=({className:s="",children:t,...r})=>e.jsx(u,{...r,className:"block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "+s,children:t});c.Trigger=N;c.Content=C;c.Link=M;function m({active:s=!1,className:t="",children:r,...n}){return e.jsx(u,{...n,className:`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${s?"border-indigo-400 bg-indigo-50 text-indigo-700 focus:border-indigo-700 focus:bg-indigo-100 focus:text-indigo-800":"border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus:border-gray-300 focus:bg-gray-50 focus:text-gray-800"} font-medium transition duration-150 ease-in-out focus:outline-none ${t}`,children:r})}/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),L=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,n)=>n?n.toUpperCase():r.toLowerCase()),g=s=>{const t=L(s);return t.charAt(0).toUpperCase()+t.slice(1)},j=(...s)=>s.filter((t,r,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===r).join(" ").trim(),$=s=>{for(const t in s)if(t.startsWith("aria-")||t==="role"||t==="title")return!0};/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var A={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=o.forwardRef(({color:s="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:n,className:a="",children:d,iconNode:h,...x},w)=>o.createElement("svg",{ref:w,...A,width:t,height:t,stroke:s,strokeWidth:n?Number(r)*24/Number(t):r,className:j("lucide",a),...!d&&!$(x)&&{"aria-hidden":"true"},...x},[...h.map(([v,b])=>o.createElement(v,b)),...Array.isArray(d)?d:[d]]));/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=(s,t)=>{const r=o.forwardRef(({className:n,...a},d)=>o.createElement(R,{ref:d,iconNode:t,className:j(`lucide-${_(g(s))}`,`lucide-${s}`,n),...a}));return r.displayName=g(s),r};/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],D=i("calendar",z);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M12 14v4",key:"1thi36"}],["path",{d:"M14.172 2a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 20 7.828V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z",key:"1o66bk"}],["path",{d:"M8 14h8",key:"1fgep2"}],["rect",{x:"8",y:"10",width:"8",height:"8",rx:"1",key:"1aonk6"}]],T=i("card-sim",O);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z",key:"q0gr47"}]],E=i("chart-area",q);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],F=i("chevron-down",P);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["circle",{cx:"8",cy:"8",r:"6",key:"3yglwk"}],["path",{d:"M18.09 10.37A6 6 0 1 1 10.34 18",key:"t5s6rm"}],["path",{d:"M7 6h1v4",key:"1obek4"}],["path",{d:"m16.71 13.88.7.71-2.82 2.82",key:"1rbuyh"}]],S=i("coins",G);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M16 10h2",key:"8sgtl7"}],["path",{d:"M16 14h2",key:"epxaof"}],["path",{d:"M6.17 15a3 3 0 0 1 5.66 0",key:"n6f512"}],["circle",{cx:"9",cy:"11",r:"2",key:"yxgjnd"}],["rect",{x:"2",y:"5",width:"20",height:"14",rx:"2",key:"qneu4z"}]],H=i("id-card",B);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],K=i("layout-dashboard",I);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],V=i("menu",U);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["path",{d:"M11 15h2",key:"199qp6"}],["path",{d:"M12 12v3",key:"158kv8"}],["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M15.282 19a1 1 0 0 0 .948-.68l2.37-6.988a7 7 0 1 0-13.2 0l2.37 6.988a1 1 0 0 0 .948.68z",key:"1jofit"}],["path",{d:"M9 9a3 3 0 1 1 6 0",key:"jdoeu8"}]],Z=i("parking-meter",W);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M5 16v2",key:"g5qcv5"}],["path",{d:"M19 16v2",key:"1gbaio"}],["rect",{width:"20",height:"8",x:"2",y:"8",rx:"2",key:"vjsjur"}],["path",{d:"M18 12h.01",key:"yjnet6"}]],Q=i("radio-receiver",J);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],p=i("user",X);function Y({title:s}){const t=y().props.auth.user;return e.jsx("nav",{className:"absolute right-0 top-0 z-10 hidden w-full items-center bg-teal-700 p-4 md:flex md:flex-row md:flex-nowrap md:justify-end print:hidden",children:e.jsxs("div",{className:"mx-autp flex w-full flex-wrap items-center justify-between px-4 md:flex-nowrap md:px-10",children:[e.jsx("p",{className:"text-sm font-semibold uppercase text-white md:inline-block",children:s}),e.jsx("div",{className:"flex list-none flex-wrap items-center",children:e.jsxs(c,{children:[e.jsx(c.Trigger,{children:e.jsx("span",{className:"inline-flex rounded-md",children:e.jsxs("button",{type:"button",className:"inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none",children:[e.jsx(p,{className:"h-5 w-5"}),e.jsx("svg",{className:"-me-0.5 ms-2 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:e.jsx("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]})})}),e.jsxs(c.Content,{children:[e.jsxs("div",{className:"flex w-full items-center justify-between whitespace-nowrap bg-teal-700 p-4 font-normal text-white",children:[e.jsx("p",{className:"text-xs",children:"حساب کاربری:"}),e.jsx("p",{className:"text-xs",children:t.name})]}),e.jsx(m,{href:route("profile.edit"),active:route().current("profile.edit"),className:"block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-teal-700",children:"پروفایل کاربری"}),e.jsx(m,{method:"post",href:route("logout"),className:"block w-full whitespace-nowrap bg-transparent px-4 py-2 text-right text-sm font-normal text-teal-700",children:"خروج"})]})]})})]})})}function l({active:s=!1,className:t="",children:r,...n}){return e.jsx(u,{...n,className:"block px-2 py-3 text-sm font-bold uppercase hover:bg-teal-700 "+(s?" bg-teal-700 text-white":"text-blueGray-800 hover:text-white")+t,children:r})}function ee(){const{auth:s}=y().props,t=s.user,r=o.useRef(),n=()=>{const a=r.current;a&&(a.classList.toggle("hidden"),a.classList.toggle("bg-white"),a.classList.toggle("py-3"),a.classList.toggle("px-6"))};return e.jsx("nav",{className:"relative z-10 flex flex-wrap items-center justify-between bg-white p-4 shadow-xl md:fixed md:bottom-0 md:right-0 md:top-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto print:hidden",children:e.jsxs("div",{className:"mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch",children:[e.jsx("button",{className:"cursor-pointer rounded border border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black opacity-50 md:hidden",type:"button",onClick:n,children:e.jsx(V,{className:"h-6 w-6"})}),e.jsx("a",{className:"text-blueGray-800 inline-block px-5 text-lg font-bold md:block md:pb-2",href:route("dashboard"),children:"کلینیک مادر و طفل"}),e.jsx("div",{className:"flex list-none flex-wrap items-center md:hidden",children:e.jsxs(c,{children:[e.jsx(c.Trigger,{children:e.jsx("span",{className:"inline-flex rounded-md",children:e.jsxs("button",{type:"button",className:"inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none",children:[e.jsx(p,{className:"h-5 w-5"}),e.jsx(F,{className:"ml-1 h-4 w-4"})]})})}),e.jsxs(c.Content,{children:[e.jsxs("div",{className:"bg-blueGray-700 flex w-full items-center justify-between whitespace-nowrap p-4 font-normal text-white",children:[e.jsx("p",{className:"text-xs",children:"حساب کاربری:"}),e.jsx("p",{className:"text-xs",children:t.name})]}),e.jsx(m,{active:route().current("profile.edit"),href:route("profile.edit"),className:"text-blueGray-700 block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal",children:"پروفایل کاربری"}),e.jsx(m,{active:route().current("logout"),href:route("logout"),method:"post",as:"button",className:"w-full px-4 py-2 text-left text-sm font-normal outline-none focus:outline-none",children:"خروج"})]})]})}),e.jsx("aside",{className:"absolute left-0 right-0 top-0 z-40 hidden h-auto flex-1 flex-col items-stretch overflow-y-auto overflow-x-hidden shadow md:relative md:mt-4 md:flex md:opacity-100 md:shadow-none print:hidden",id:"sidebar",ref:r,children:e.jsxs("ul",{className:"flex list-none flex-col md:min-w-full md:flex-col",children:[e.jsx("li",{children:e.jsx(l,{href:route("dashboard"),active:route().current("dashboard"),children:e.jsxs("div",{className:"flex items-end gap-2",children:[e.jsx(K,{className:"h-5 w-5"}),e.jsx("span",{children:"داشبورد"})]})})}),e.jsx("li",{children:e.jsx(l,{href:route("staffs.index"),active:route().current("staffs.*"),children:e.jsxs("div",{className:"flex items-end gap-2",children:[e.jsx(p,{className:"h-5 w-5"}),"مدیریت پرسنل"]})})}),e.jsx("li",{children:e.jsx(l,{href:route("visits.index"),active:route().current("visits.*"),children:e.jsxs("div",{className:"flex items-end gap-2",children:[e.jsx(D,{className:"h-5 w-5"}),"ویزیت‌ها"]})})}),e.jsx("li",{children:e.jsx(l,{href:route("suppliers.index"),active:route().current("suppliers.index"),children:e.jsxs("div",{className:"flex items-end gap-2",children:[e.jsx(Z,{className:"h-5 w-5"}),"شرکت های همکار"]})})}),e.jsx("li",{children:e.jsx(l,{href:route("medicine.index"),active:route().current("medicine.*"),children:e.jsxs("div",{className:"flex items-end gap-2",children:[e.jsx(T,{className:"h-5 w-5"}),"خرید دارو"]})})}),e.jsx("li",{children:e.jsx(l,{href:route("pharmacy.index"),active:route().current("pharmacy.*"),children:e.jsxs("div",{className:"flex items-end gap-2",children:[e.jsx(S,{className:"h-5 w-5"}),"فروش دارو"]})})}),e.jsx("li",{children:e.jsx(l,{href:route("incomes.index"),active:route().current("incomes.*"),children:e.jsxs("div",{className:"flex items-end gap-2",children:[e.jsx(Q,{className:"h-5 w-5"}),"مدیریت عواید"]})})}),e.jsx("li",{children:e.jsx(l,{href:route("expenses.index"),active:route().current("expenses.*"),children:e.jsxs("div",{className:"flex items-end gap-2",children:[e.jsx(H,{className:"h-5 w-5"}),"مدیریت هزینه ها"]})})}),e.jsx("li",{children:e.jsx(l,{href:route("reports"),active:route().current("reports.*"),children:e.jsxs("div",{className:"flex items-end gap-2",children:[e.jsx(E,{className:"h-5 w-5"}),"گزارشات مدیریتی"]})})})]})})]})})}function re({title:s,children:t}){return e.jsxs("div",{className:"min-h-screen",children:[e.jsx(ee,{}),e.jsxs("main",{className:"relative md:mr-64",children:[e.jsx(Y,{title:s}),e.jsx("div",{className:"md:py-16",children:t})]})]})}export{re as A,i as c};
