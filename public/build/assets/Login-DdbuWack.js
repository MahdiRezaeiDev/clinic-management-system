import{u as N,r as o,j as e,H as v}from"./app-DvkKJIuX.js";import{C as k}from"./Checkbox-BMOhdnGt.js";import{I as x}from"./InputError-CxUV_2Ga.js";import{I as c}from"./InputLabel-C7Vyt1oB.js";import{P as M}from"./PrimaryButton-dQtuBUK-.js";import{T as p}from"./TextInput-Bxels8nw.js";import{G as _}from"./GuestLayout-CrkS9mer.js";import{c as a}from"./createLucideIcon-VM9AGcQF.js";import{M as h}from"./mail-Bb_F8pBs.js";import{E as H}from"./eye-Cj4pYTsH.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],E=a("eye-off",C);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M12 7v4",key:"xawao1"}],["path",{d:"M14 21v-3a2 2 0 0 0-4 0v3",key:"1rgiei"}],["path",{d:"M14 9h-4",key:"1w2s2s"}],["path",{d:"M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2",key:"1tthqt"}],["path",{d:"M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16",key:"dw4p4i"}]],z=a("hospital",L);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=[["path",{d:"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",key:"1pdavp"}],["path",{d:"M20.054 15.987H3.946",key:"14rxg9"}]],S=a("laptop",I);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]],u=a("lock",$);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"m10 17 5-5-5-5",key:"1bsop3"}],["path",{d:"M15 12H3",key:"6jk70r"}],["path",{d:"M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4",key:"u53s6r"}]],g=a("log-in",F);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],V=a("shield",P);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],q=a("smartphone",T);function U({status:i}){const{data:r,setData:l,post:w,processing:n,errors:d,reset:y}=N({email:"",password:"",remember:!1}),[m,f]=o.useState(!1),[t,b]=o.useState(!1);o.useEffect(()=>{const s=()=>{b(window.innerWidth<768)};return s(),window.addEventListener("resize",s),()=>window.removeEventListener("resize",s)},[]);const j=s=>{s.preventDefault(),w(route("login"),{onFinish:()=>y("password")})};return e.jsxs(_,{children:[e.jsx(v,{title:"ورود به حساب کاربری"}),e.jsxs("div",{className:"fixed inset-0 -z-10 h-full w-full bg-gradient-to-br from-teal-50 via-white to-blue-50",children:[!t&&e.jsx("div",{className:"absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"}),e.jsx("div",{className:"absolute left-0 top-0 h-48 w-48 animate-pulse rounded-full bg-teal-100 opacity-20 blur-3xl md:h-96 md:w-96"}),e.jsx("div",{className:"absolute bottom-0 right-0 h-48 w-48 animate-pulse rounded-full bg-blue-100 opacity-20 blur-3xl md:h-96 md:w-96"})]}),e.jsx("div",{className:"flex min-h-screen items-center justify-center px-3 py-6 sm:px-4 sm:py-8 md:px-6 lg:px-8",dir:"rtl",children:e.jsxs("div",{className:"w-full max-w-[90%] sm:max-w-md md:max-w-lg",children:[e.jsxs("div",{className:"mb-4 text-center sm:mb-6 md:mb-8",children:[e.jsx("div",{className:"flex justify-center",children:e.jsx("div",{className:"rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 p-0.5 shadow-lg sm:rounded-2xl sm:p-1 md:shadow-xl",children:e.jsx("div",{className:"rounded-lg bg-white p-2 sm:rounded-xl sm:p-3",children:e.jsx(z,{className:"h-8 w-8 text-teal-600 sm:h-10 sm:w-10 md:h-12 md:w-12"})})})}),e.jsx("h2",{className:"mt-3 text-xl font-bold text-gray-800 sm:mt-4 sm:text-2xl md:mt-6 md:text-3xl",children:"کلینیک مادر و کودک"}),e.jsx("p",{className:"mt-1 text-xs text-gray-500 sm:text-sm",children:"سیستم مدیریت یکپارچه کلینیک"}),e.jsxs("div",{className:"mt-2 flex items-center justify-center gap-2 text-xs text-gray-400 sm:hidden",children:[e.jsx(q,{className:"h-3 w-3"}),e.jsx("span",{children:"نسخه موبایل"})]}),e.jsxs("div",{className:"mt-2 hidden items-center justify-center gap-2 text-xs text-gray-400 sm:flex",children:[e.jsx(S,{className:"h-3 w-3"}),e.jsx("span",{children:"نسخه دسکتاپ"})]})]}),i&&e.jsx("div",{className:"mb-3 rounded-lg border border-green-200 bg-green-50 p-3 text-xs text-green-700 sm:mb-4 sm:rounded-xl sm:p-4 sm:text-sm",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(V,{className:"h-3 w-3 sm:h-4 sm:w-4"}),i]})}),e.jsxs("div",{className:"overflow-hidden rounded-xl bg-white shadow-lg sm:rounded-2xl md:shadow-2xl",children:[e.jsx("div",{className:"bg-gradient-to-r from-teal-700 to-teal-600 px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5",children:e.jsxs("div",{className:"flex items-center gap-2 sm:gap-3",children:[e.jsx("div",{className:"rounded-lg bg-white/10 p-1.5 backdrop-blur-sm sm:p-2",children:e.jsx(g,{className:"h-4 w-4 text-white sm:h-5 sm:w-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-base font-bold text-white sm:text-lg",children:"ورود به حساب کاربری"}),e.jsx("p",{className:"text-[10px] text-teal-100 sm:text-xs",children:"برای دسترسی به داشبورد وارد شوید"})]})]})}),e.jsxs("form",{onSubmit:j,className:"p-4 sm:p-5 md:p-6",children:[e.jsxs("div",{className:"mb-4 space-y-1 sm:mb-5",children:[e.jsx(c,{htmlFor:"email",value:"ایمیل آدرس",className:"text-xs font-medium text-gray-700 sm:text-sm"}),e.jsxs("div",{className:"relative",children:[e.jsx(h,{className:"absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400 sm:h-4 sm:w-4"}),e.jsx(p,{id:"email",type:"email",name:"email",value:r.email,autoComplete:"username",isFocused:!0,onChange:s=>l("email",s.target.value),placeholder:"example@clinic.com",className:"w-full rounded-lg border border-gray-200 px-3 py-2 pr-8 text-xs transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 sm:px-4 sm:py-3 sm:pr-10 sm:text-sm",style:{minHeight:t?"44px":"auto"}})]}),e.jsx(x,{message:d.email,className:"mt-1 text-xs"})]}),e.jsxs("div",{className:"mb-3 space-y-1 sm:mb-4",children:[e.jsx(c,{htmlFor:"password",value:"رمز عبور",className:"text-xs font-medium text-gray-700 sm:text-sm"}),e.jsxs("div",{className:"relative",children:[e.jsx(u,{className:"absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-400 sm:h-4 sm:w-4"}),e.jsx(p,{id:"password",type:m?"text":"password",name:"password",value:r.password,autoComplete:"current-password",onChange:s=>l("password",s.target.value),placeholder:"••••••••",className:"w-full rounded-lg border border-gray-200 px-3 py-2 pl-8 pr-8 text-xs transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 sm:px-4 sm:py-3 sm:pl-10 sm:pr-10 sm:text-sm",style:{minHeight:t?"44px":"auto"}}),e.jsx("button",{type:"button",onClick:()=>f(!m),className:"absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all hover:text-gray-600",style:{padding:t?"8px":"4px"},children:m?e.jsx(E,{className:"h-3 w-3 sm:h-4 sm:w-4"}):e.jsx(H,{className:"h-3 w-3 sm:h-4 sm:w-4"})})]}),e.jsx(x,{message:d.password,className:"mt-1 text-xs"})]}),e.jsxs("div",{className:"mb-4 flex flex-col items-start gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between",children:[e.jsxs("label",{className:"flex cursor-pointer items-center gap-2",children:[e.jsx(k,{name:"remember",checked:r.remember,onChange:s=>l("remember",s.target.checked),className:"rounded border-gray-300 text-teal-600 focus:ring-teal-500",style:{transform:t?"scale(1.2)":"scale(1)"}}),e.jsx("span",{className:"text-xs text-gray-600 sm:text-sm",children:"مرا به خاطر بسپار"})]}),e.jsx("a",{href:route("password.request"),className:"text-xs text-teal-600 transition-all hover:text-teal-700 hover:underline sm:text-sm",style:{padding:t?"8px 0":"0"},children:"رمز عبور را فراموش کرده‌اید؟"})]}),e.jsx(M,{type:"submit",disabled:n,className:"w-full rounded-lg bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-3 text-xs font-bold text-white shadow-lg transition-all hover:from-teal-700 hover:to-teal-600 hover:shadow-xl disabled:opacity-50 sm:px-6 sm:py-3 sm:text-sm",style:{minHeight:t?"48px":"auto"},children:n?e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx("span",{className:"h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-4 sm:w-4"}),e.jsx("span",{className:"text-xs sm:text-sm",children:"در حال ورود..."})]}):e.jsxs("span",{className:"flex items-center justify-center gap-2",children:[e.jsx(g,{className:"h-3 w-3 sm:h-4 sm:w-4"}),e.jsx("span",{className:"text-xs sm:text-sm",children:"ورود به حساب"})]})}),e.jsxs("div",{className:"mt-4 rounded-lg border border-teal-100 bg-teal-50/50 p-3 sm:mt-6 sm:rounded-xl sm:p-4",children:[e.jsx("p",{className:"mb-2 text-[10px] font-medium text-teal-700 sm:text-xs",children:"اطلاعات آزمایشی"}),e.jsxs("div",{className:"space-y-1 text-[10px] text-gray-600 sm:text-xs",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(h,{className:"h-2.5 w-2.5 text-gray-400 sm:h-3 sm:w-3"}),e.jsx("span",{className:"truncate",children:"admin@clinic.com"})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(u,{className:"h-2.5 w-2.5 text-gray-400 sm:h-3 sm:w-3"}),e.jsx("span",{children:"password"})]})]})]})]})]}),e.jsx("p",{className:"mt-4 text-center text-[10px] text-gray-400 sm:mt-6 sm:text-xs",children:"© ۱۴۰۵ کلینیک مادر و کودک. تمامی حقوق محفوظ است."})]})}),e.jsx("style",{jsx:!0,children:`
                /* Ensure proper RTL spacing */
                input,
                button,
                a {
                    font-family: inherit;
                }

                /* Better touch targets on mobile */
                @media (max-width: 640px) {
                    button,
                    a,
                    input,
                    label {
                        cursor: pointer;
                        -webkit-tap-highlight-color: transparent;
                    }

                    input,
                    button {
                        font-size: 16px !important; /* Prevents zoom on iOS */
                    }
                }

                /* Smooth scrolling */
                * {
                    -webkit-overflow-scrolling: touch;
                }
            `})]})}export{U as default};
