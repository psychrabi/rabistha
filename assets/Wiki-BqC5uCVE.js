import{c as s,u as c,r,j as e,L as d,O as h}from"./index-CQqMSyWK.js";import{L as p}from"./link-DvdeHSoN.js";import{C as u}from"./circle-help-C6HAFOpt.js";/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}]],x=s("book",m);/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],f=s("file-text",k);/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],j=s("history",y);/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],N=s("star",v);function S(){const{category:i}=c(),[o,n]=r.useState(i),l={"quick-start":{title:"Quick Start Guide",icon:e.jsx(x,{className:"w-5 h-5"}),path:"/wiki/quick-start",description:"Get started with ASTER quickly and efficiently"},"user-manual":{title:"User Manual",icon:e.jsx(f,{className:"w-5 h-5"}),path:"/wiki/user-manual",description:"Comprehensive guide to ASTER features and functionality"},faq:{title:"FAQ",icon:e.jsx(u,{className:"w-5 h-5"}),path:"/wiki/faq",description:"Frequently asked questions and answers"},solutions:{title:"Solutions",icon:e.jsx(N,{className:"w-5 h-5"}),path:"/wiki/solutions",description:"Troubleshooting guides and solutions"},"version-history":{title:"Version History",icon:e.jsx(j,{className:"w-5 h-5"}),path:"/wiki/version-history",description:"Release notes and version updates"},"useful-links":{title:"Useful Links",icon:e.jsx(p,{className:"w-5 h-5"}),path:"/wiki/useful-links",description:"Additional resources and external links"}};return e.jsxs("div",{className:"flex min-h-screen",children:[e.jsxs("div",{className:"w-64 bg-base-200 p-4",children:[e.jsx("h2",{className:"text-xl font-bold mb-4",children:"Wiki Navigation"}),e.jsx("div",{className:"flex flex-col gap-2",children:Object.entries(l).map(([t,a])=>e.jsxs(d,{to:a.path,className:`flex items-center gap-2 p-2 rounded-lg hover:bg-base-300 ${o===t?"bg-primary text-primary-content":""}`,onClick:()=>n(t),children:[a.icon,e.jsx("span",{children:a.title})]},t))})]}),e.jsx("div",{className:"flex-1 p-8",children:e.jsxs("div",{className:"prose max-w-none",children:[e.jsx("h1",{className:"text-4xl font-bold mb-8",children:"ASTER Documentation"}),e.jsx("p",{className:"text-lg mb-8",children:"Welcome to the ASTER documentation. Choose a section from the sidebar to learn more about ASTER‘s features and functionality."}),e.jsx(h,{})]})})]})}export{S as default};
