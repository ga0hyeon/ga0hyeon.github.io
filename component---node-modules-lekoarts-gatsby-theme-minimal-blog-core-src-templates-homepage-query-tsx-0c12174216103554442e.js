"use strict";(self.webpackChunkminimal_blog=self.webpackChunkminimal_blog||[]).push([[366],{8556:function(e,t,n){n.r(t),n.d(t,{Head:function(){return x},default:function(){return w}});var a=n(7294),r=n(8733),o=n(1883),i=n(6920),l=n(5221),c=n(4372);var s=e=>{let{children:t}=e;return(0,r.tZ)("section",{sx:{mb:[5,5,6],ul:{margin:0,padding:0},li:{listStyle:"none",mb:3,a:{variant:"links.listItem"}},variant:"section_bottom"}},t)},m=n(3494),p=n(4232),u=n(9706),g=n(8170),d=n(8871),h=n(1151);function E(e){const t=Object.assign({p:"p",br:"br"},(0,h.ah)(),e.components),{Text:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Text",!0),a.createElement(a.Fragment,null,a.createElement(n,{children:"👋",sx:{fontSize:[4,5,6],fontWeight:"bold",color:"heading"}}),"\n",a.createElement(t.p,null,"재미있어 보이는 것들을 공부합니다.",a.createElement(t.br),"\n","일기처럼 개발일지를 씁니다."))}var Z=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,h.ah)(),e.components);return t?a.createElement(t,e,a.createElement(E,e)):E(e)};function f(e){const{Title:t}=Object.assign({},(0,h.ah)(),e.components);return t||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Title",!0),a.createElement(t,{text:"Projects"})}var b=function(e){void 0===e&&(e={});const{wrapper:t}=Object.assign({},(0,h.ah)(),e.components);return t?a.createElement(t,e,a.createElement(f,e)):f(e)};var v=e=>{let{posts:t}=e;const{basePath:n,blogPath:a}=(0,m.Z)(),{siteTitle:d}=(0,p.Z)();return(0,r.tZ)(i.Z,null,(0,r.tZ)("h1",{sx:g.j},d),(0,r.tZ)("section",{sx:{mb:[5,6,7],p:{fontSize:[1,2,3],mt:2},variant:"section_hero"}},(0,r.tZ)(Z,null)),(0,r.tZ)(l.Z,{text:"Latest Posts"},(0,r.tZ)(o.Link,{to:(0,u.Z)("/"+n+"/"+a)},"Read all posts")),(0,r.tZ)(c.Z,{posts:t,showTags:!1}),(0,r.tZ)(s,null,(0,r.tZ)(b,null)))};const x=()=>(0,r.tZ)(d.Z,null);var w=function(e){let{...t}=e;const{data:{allPost:n}}=t;return a.createElement(v,Object.assign({posts:n.nodes},t))}},6799:function(e,t,n){var a=n(8733),r=n(7294),o=n(1883),i=n(3494),l=n(9706);t.Z=e=>{let{tags:t}=e;const{tagsPath:n,basePath:c}=(0,i.Z)();return(0,a.tZ)(r.Fragment,null,t.map(((e,t)=>(0,a.tZ)(r.Fragment,{key:e.slug},!!t&&", ",(0,a.tZ)(o.Link,{sx:e=>{var t;return{...null===(t=e.styles)||void 0===t?void 0:t.a}},to:(0,l.Z)("/"+c+"/"+n+"/"+e.slug)},e.name)))))}},4372:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(8733),r=n(7294),o=n(795),i=n(1883),l=n(6799);var c=e=>{let{post:t,showTags:n=!0}=e;return(0,a.tZ)(o.xu,{mb:4},(0,a.tZ)(i.Link,{to:t.slug,sx:e=>{var t;return{...null===(t=e.styles)||void 0===t?void 0:t.a,fontSize:[1,2,3],color:"text"}}},t.title),(0,a.tZ)("p",{sx:{color:"secondary",mt:1,a:{color:"secondary"},fontSize:[1,1,2]}},(0,a.tZ)("time",null,t.date),t.tags&&n&&(0,a.tZ)(r.Fragment,null," — ",(0,a.tZ)(l.Z,{tags:t.tags}))))};var s=e=>{let{posts:t,className:n="",showTags:r=!0}=e;return(0,a.tZ)("section",{sx:{mb:[5,6,7]},className:n},t.map((e=>(0,a.tZ)(c,{key:e.slug,post:e,showTags:r}))))}},8871:function(e,t,n){var a=n(7294),r=n(1883),o=n(4232);t.Z=e=>{let{title:t="",description:n="",pathname:i="",image:l="",children:c=null,canonicalUrl:s=""}=e;const m=(0,o.Z)(),{siteTitle:p,siteTitleAlt:u,siteUrl:g,siteDescription:d,siteImage:h,author:E,siteLanguage:Z}=m,f={title:t?t+" | "+p:u,description:n||d,url:""+g+(i||""),image:""+g+(l||h)};return a.createElement(a.Fragment,null,a.createElement("html",{lang:Z}),a.createElement("title",null,f.title),a.createElement("meta",{name:"description",content:f.description}),a.createElement("meta",{name:"image",content:f.image}),a.createElement("meta",{property:"og:title",content:f.title}),a.createElement("meta",{property:"og:url",content:f.url}),a.createElement("meta",{property:"og:description",content:f.description}),a.createElement("meta",{property:"og:image",content:f.image}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{property:"og:image:alt",content:f.description}),a.createElement("meta",{name:"twitter:card",content:"summary_large_image"}),a.createElement("meta",{name:"twitter:title",content:f.title}),a.createElement("meta",{name:"twitter:url",content:f.url}),a.createElement("meta",{name:"twitter:description",content:f.description}),a.createElement("meta",{name:"twitter:image",content:f.image}),a.createElement("meta",{name:"twitter:image:alt",content:f.description}),a.createElement("meta",{name:"twitter:creator",content:E}),a.createElement("meta",{name:"gatsby-theme",content:"@lekoarts/gatsby-theme-minimal-blog"}),a.createElement("link",{rel:"icon",type:"image/png",sizes:"32x32",href:(0,r.withPrefix)("/favicon-32x32.png")}),a.createElement("link",{rel:"icon",type:"image/png",sizes:"16x16",href:(0,r.withPrefix)("/favicon-16x16.png")}),a.createElement("link",{rel:"apple-touch-icon",sizes:"180x180",href:(0,r.withPrefix)("/apple-touch-icon.png")}),s?a.createElement("link",{rel:"canonical",href:s}):null,c)}}}]);
//# sourceMappingURL=component---node-modules-lekoarts-gatsby-theme-minimal-blog-core-src-templates-homepage-query-tsx-0c12174216103554442e.js.map