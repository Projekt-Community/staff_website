import{y as i,g as S,z as b,A as C,B as N}from"./index.f848b64c.js";const u=["sm","md","lg","xl","xxl"],j=(()=>u.reduce((t,l)=>(t[l]={type:[Boolean,String,Number],default:!1},t),{}))(),k=(()=>u.reduce((t,l)=>(t["offset"+i(l)]={type:[String,Number],default:null},t),{}))(),v=(()=>u.reduce((t,l)=>(t["order"+i(l)]={type:[String,Number],default:null},t),{}))(),y={col:Object.keys(j),offset:Object.keys(k),order:Object.keys(v)};function E(t,l,e){let a=t;if(!(e==null||e===!1)){if(l){const n=l.replace(t,"");a+=`-${n}`}return t==="col"&&(a="v-"+a),t==="col"&&(e===""||e===!0)||(a+=`-${e}`),a.toLowerCase()}}const P=["auto","start","end","center","baseline","stretch"],M=S()({name:"VCol",props:{cols:{type:[Boolean,String,Number],default:!1},...j,offset:{type:[String,Number],default:null},...k,order:{type:[String,Number],default:null},...v,alignSelf:{type:String,default:null,validator:t=>P.includes(t)},...b()},setup(t,l){let{slots:e}=l;const a=C(()=>{const n=[];let s;for(s in y)y[s].forEach(o=>{const c=t[o],g=E(s,o,c);g&&n.push(g)});const r=n.some(o=>o.startsWith("v-col-"));return n.push({"v-col":!r||!t.cols,[`v-col-${t.cols}`]:t.cols,[`offset-${t.offset}`]:t.offset,[`order-${t.order}`]:t.order,[`align-self-${t.alignSelf}`]:t.alignSelf}),n});return()=>{var n;return N(t.tag,{class:a.value},(n=e.default)==null?void 0:n.call(e))}}}),x=["sm","md","lg","xl","xxl"],f=["start","end","center"],L=["space-between","space-around","space-evenly"];function d(t,l){return x.reduce((e,a)=>(e[t+i(a)]=l(),e),{})}const O=[...f,"baseline","stretch"],$=t=>O.includes(t),V=d("align",()=>({type:String,default:null,validator:$})),G=[...f,...L],h=t=>G.includes(t),_=d("justify",()=>({type:String,default:null,validator:h})),B=[...f,...L,"stretch"],w=t=>B.includes(t),A=d("alignContent",()=>({type:String,default:null,validator:w})),m={align:Object.keys(V),justify:Object.keys(_),alignContent:Object.keys(A)},I={align:"align",justify:"justify",alignContent:"align-content"};function T(t,l,e){let a=I[t];if(e!=null){if(l){const n=l.replace(t,"");a+=`-${n}`}return a+=`-${e}`,a.toLowerCase()}}const R=S()({name:"VRow",props:{dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:$},...V,justify:{type:String,default:null,validator:h},..._,alignContent:{type:String,default:null,validator:w},...A,...b()},setup(t,l){let{slots:e}=l;const a=C(()=>{const n=[];let s;for(s in m)m[s].forEach(r=>{const o=t[r],c=T(s,r,o);c&&n.push(c)});return n.push({"v-row--no-gutters":t.noGutters,"v-row--dense":t.dense,[`align-${t.align}`]:t.align,[`justify-${t.justify}`]:t.justify,[`align-content-${t.alignContent}`]:t.alignContent}),n});return()=>{var n;return N(t.tag,{class:["v-row",a.value]},(n=e.default)==null?void 0:n.call(e))}}}),z=(t,l)=>{const e=t.__vccOpts||t;for(const[a,n]of l)e[a]=n;return e};export{R as V,z as _,M as a};
