import{r as n,j as e,H as l,c}from"./app-C9UXce5l.js";import{A as i}from"./AuthenticatedLayout-DntZkt7J.js";import"./transition-Ke3ql-5d.js";function p(){const[t,r]=n.useState(!1),[o,s]=n.useState(""),d=async()=>{r(!0),s("در حال شروع پشتیبان‌گیری...");try{const a=await c.post(route("backup.run"));s(a.data.message+`

فایل:
`+a.data.file+`

مسیر:
`+a.data.path)}catch(a){s(a.response?.data?.message||"پشتیبان‌گیری ناموفق بود.")}finally{r(!1)}};return e.jsxs(i,{title:"پشتیبان‌گیری از پایگاه داده",children:[e.jsx(l,{title:"پشتیبان‌گیری از پایگاه داده"}),e.jsxs("div",{className:"mx-auto mt-10 max-w-3xl rounded-xl bg-white p-6 shadow-md",children:[e.jsx("h1",{className:"mb-4 text-xl font-bold",children:"اجرای پشتیبان‌گیری پایگاه داده"}),e.jsx("button",{onClick:d,disabled:t,className:`rounded px-4 py-2 font-semibold text-white ${t?"cursor-not-allowed bg-gray-400":"bg-teal-700 hover:bg-teal-900"}`,children:t?"در حال پشتیبان‌گیری...":"اجرای پشتیبان‌گیری"}),o&&e.jsx("div",{className:"mt-4 rounded border bg-gray-100 p-4",children:e.jsx("pre",{className:"text-sm",children:o})})]})]})}export{p as default};
