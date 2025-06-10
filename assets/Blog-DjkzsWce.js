import{c as r,r as l,j as e}from"./index-CTGfdJ3c.js";import{T as m}from"./tag-CcQJP0Ot.js";/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],p=r("calendar",d);/**
 * @license lucide-react v0.513.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],x=r("user",u);function f(){const[a,o]=l.useState("all"),n=[{id:"all",name:"All Posts"},{id:"news",name:"News"},{id:"tutorials",name:"Tutorials"},{id:"updates",name:"Updates"},{id:"tips",name:"Tips & Tricks"}],s=[{id:1,title:"ASTER v3.0 Released: Major Update with New Features",category:"updates",date:"2024-03-18",author:"ASTER Team",content:`ASTER v3.0 brings significant improvements to multi-user computing. Key features include:
- Enhanced performance optimization
- New security features
- Improved user management
- Better network stability`,tags:["release","v3.0","update"]},{id:2,title:"How to Set Up Multiple Workstations with ASTER",category:"tutorials",date:"2024-03-15",author:"John Doe",content:`Learn how to configure multiple workstations using ASTER:
1. Hardware requirements
2. Network setup
3. User configuration
4. Performance optimization`,tags:["setup","tutorial","configuration"]},{id:3,title:"Top 10 Tips for Optimizing ASTER Performance",category:"tips",date:"2024-03-12",author:"Jane Smith",content:`Discover the best practices for getting the most out of ASTER:
- System optimization
- Network configuration
- User management
- Resource allocation`,tags:["optimization","performance","tips"]}],c=a==="all"?s:s.filter(t=>t.category===a);return e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsx("h1",{className:"text-4xl font-bold mb-8",children:"ASTER Blog"}),e.jsx("div",{className:"flex gap-4 mb-8 overflow-x-auto pb-2",children:n.map(t=>e.jsx("button",{onClick:()=>o(t.id),className:`px-4 py-2 rounded-full whitespace-nowrap ${a===t.id?"bg-primary text-primary-content":"bg-base-200 hover:bg-base-300"}`,children:t.name},t.id))}),e.jsx("div",{className:"grid gap-8",children:c.map(t=>e.jsxs("article",{className:"bg-base-200 rounded-lg p-6",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4",children:t.title}),e.jsxs("div",{className:"flex gap-4 text-sm text-base-content/70 mb-4",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(p,{className:"w-4 h-4"}),t.date]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(x,{className:"w-4 h-4"}),t.author]})]}),e.jsx("div",{className:"prose max-w-none mb-4",children:e.jsx("div",{className:"whitespace-pre-wrap",children:t.content})}),e.jsx("div",{className:"flex gap-2",children:t.tags.map(i=>e.jsxs("span",{className:"flex items-center gap-1 px-3 py-1 bg-base-300 rounded-full text-sm",children:[e.jsx(m,{className:"w-3 h-3"}),i]},i))})]},t.id))})]})}export{f as default};
