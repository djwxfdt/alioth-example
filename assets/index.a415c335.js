var b=Object.defineProperty,f=Object.defineProperties;var p=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var m=(t,e,a)=>e in t?b(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,n=(t,e)=>{for(var a in e||(e={}))R.call(e,a)&&m(t,a,e[a]);if(h)for(var a of h(e))y.call(e,a)&&m(t,a,e[a]);return t},s=(t,e)=>f(t,p(e));import{r as H,o as P,m as W,d,R as i,n as F,F as I,B as S,I as z,D}from"./index.23403e58.js";import{R as u}from"./resize-image.9da615b9.js";const x=t=>{const{passProps:e}=t,[a,l]=H.exports.useState(!1),c=P(),E=W(),g=d(o=>{c(t.attributes.id,s(n({},t.passProps),{width:o}))}),w=d(()=>{l(!0)}),v=d(o=>{const r=new window.Image;r.src=o.png,r.onload=()=>{c(t.attributes.id,s(n(n({},t.passProps),o),{originalWidth:r.naturalWidth,originalHeight:r.naturalHeight})),l(!1)}});return E.readOnly?i.createElement(u,{fileUrl:e.png,width:e.width,originalWidth:e.originalWidth,originalHeight:e.originalHeight,onResizeEnd:g,readOnly:!0}):i.createElement("span",s(n({},t.attributes),{"data-alioth-void":!0}),i.createElement(F,{placement:"bottom",overlay:i.createElement("div",{className:"alioth-draw-overlay"},i.createElement(I,{title:"\u7F16\u8F91"},i.createElement(S,{className:"alioth-draw-overlay-btn",onClick:w},i.createElement(z,{type:"select"}))))},i.createElement(u,{fileUrl:e.png,width:e.width,originalWidth:e.originalWidth,originalHeight:e.originalHeight,onResizeEnd:g})),i.createElement(D,s(n({visible:a,onVisibleChange:l},t.passProps),{onSave:v})))};export{x as default};