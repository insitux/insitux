(()=>{"use strict";var e={607:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.symbols=t.invoke=t.exeFunc=t.visBoo=t.visKey=t.visFun=t.visDic=t.visVec=t.visNum=t.visStr=t.insituxVersion=void 0,t.insituxVersion=20210926;const n=r(306),s=r(17),{abs:o,cos:a,sin:i,tan:c,pi:u,sign:l,sqrt:d,floor:m,ceil:p,round:v,max:f,min:y}=s,{logn:x,log2:h,log10:g}=s,{concat:b,has:A,flat:k,push:C,reverse:w,slice:N,splice:$,sortBy:B}=s,{ends:E,slen:M,starts:I,sub:P,subIdx:j,substr:H,upperCase:S,lowerCase:D}=s,{trim:q,trimStart:T,trimEnd:O}=s,{getTimeMs:_,randInt:F,randNum:U}=s,{isArray:V,isNum:K,len:R,objKeys:L,range:W,toNum:Z}=s,z=r(127),G=r(699),J=({v:e,t})=>{const r=e=>"str"===e.t?`"${e.v}"`:J(e);switch(t){case"bool":case"num":return`${e}`;case"str":case"key":case"ref":case"func":return e;case"vec":return`[${e.map(r).join(" ")}]`;case"dict":{const{keys:t,vals:n}=e,[s,o]=[t.map(r),n.map(r)];return`{${s.map(((e,t)=>`${e} ${o[t]}`)).join(", ")}}`}case"null":return"null"}return(0,G.assertUnreachable)(t)};let Q=[];const X=e=>Q.push({t:"bool",v:e}),Y=e=>Q.push({t:"num",v:e}),ee=(e="")=>Q.push({t:"str",v:e}),te=e=>Q.push({t:"key",v:e}),re=(e=[])=>Q.push({t:"vec",v:e}),ne=e=>Q.push({t:"dict",v:e}),se=()=>Q.push({t:"null",v:void 0}),oe=e=>Q.push({t:"func",v:e}),ae=({v:e})=>e,ie=({v:e})=>e,ce=({v:e})=>e,ue=({v:e})=>e,le=({t:e,v:t})=>"bool"===e?t:"null"!==e;t.visStr=e=>"str"===e.t,t.visNum=e=>"num"===e.t,t.visVec=e=>"vec"===e.t,t.visDic=e=>"dict"===e.t,t.visFun=e=>"func"===e.t,t.visKey=e=>"key"===e.t,t.visBoo=e=>"bool"==e.t;const de=({t:e,v:t})=>"vec"===e?N(t):"str"===e?[...t].map((e=>({t:"str",v:e}))):"dict"===e?t.keys.map(((e,r)=>({t:"vec",v:[e,t.vals[r]]}))):[],me=e=>e.reduce(((e,t)=>e+J(t)),""),pe=e=>{R(e)%2==1&&e.pop();const t=e.filter(((e,t)=>t%2==0)),r=e.filter(((e,t)=>t%2==1)),n=[],s=[];return t.forEach(((e,t)=>{const o=n.findIndex((t=>ye(t,e)));-1===o?(n.push(e),s.push(r[t])):s[o]=r[t]})),{t:"dict",v:{keys:n,vals:s}}},ve=(e,t)=>({e:"Type",m:e,errCtx:t}),fe=(e,t)=>R(e)===R(t)&&!e.some(((e,r)=>!ye(e,t[r]))),ye=(e,t)=>{const{t:r}=e;switch(r){case"null":return!0;case"bool":return e.v===t.v;case"num":return ae(e)===ae(t);case"vec":return fe(ce(e),ce(t));case"dict":return((e,t)=>{const[r,n]=[ue(e),ue(t)];return R(r.keys)===R(n.keys)&&fe(r.keys,n.keys)})(e,t);case"str":case"ref":case"key":case"func":return ie(e)===ie(t)}return(0,G.assertUnreachable)(r)},xe=({keys:e,vals:t},r)=>{const n=e.findIndex((e=>ye(e,r)));return-1===n?{t:"null",v:void 0}:t[n]},he=({keys:e,vals:t},r,n)=>{const[s,o]=[N(e),N(t)],a=e.findIndex((e=>ye(e,r)));return-1!==a?o[a]=n:(s.push(r),o.push(n)),{keys:s,vals:o}};async function ge(e,r,s,L,oe){const fe=e=>[ve(e,L)];if(oe){const t=(0,n.arityCheck)(e,R(r),L);if(t)return t}{const t=function(e,t,r){const{types:n,onlyNum:s}=G.ops[e],o=R(t);if(s){const n=t.findIndex((e=>"num"!==e.t));if(-1===n)return;const s=G.typeNames[t[n].t];return[ve(`${e} takes numeric arguments only, not ${s}`,r)]}if(!n)return;const a=n.map(((e,r)=>{if(r>=o)return!1;const n=t[r].t,s=G.typeNames[n];return V(e)?!A(e,n)&&`argument ${r+1} must be either: ${e.map((e=>G.typeNames[e])).join(", ")}, not ${s}`:e!==n&&`argument ${r+1} must be ${G.typeNames[e]}, not ${s}`})).filter((e=>!!e));return R(a)?a.map((e=>ve(e,r))):void 0}(e,r,L);if(t)return t}switch(e){case"execute-last":return await be(s,r.pop(),L)(r);case"str":return void Q.push({t:"str",v:me(r)});case"print":case"print-str":return s.exe(e,[{t:"str",v:me(r)}]),void se();case"vec":return void re(r);case"dict":return void Q.push(pe(r));case"len":return void Y("str"===r[0].t?M(ie(r[0])):"vec"===r[0].t?R(ce(r[0])):R(ue(r[0]).keys));case"to-num":return void(K(r[0].v)?Y(Z(r[0].v)):se());case"to-key":return void te(`:${J(r[0])}`);case"!":return void X(!le(r[0]));case"=":case"!=":for(let t=1,n=R(r);t<n;++t)if(ye(r[t-1],r[t])!==("="===e))return void X(!1);return void Q.push(r[0]);case"-":return void Y(1===R(r)?-ae(r[0]):r.map(ae).reduce(((e,t)=>e-t)));case"**":return void Y(ae(r[0])**(1===R(r)?2:ae(r[1])));case"+":return void Y(r.map(ae).reduce(((e,t)=>e+t)));case"*":return void Y(r.map(ae).reduce(((e,t)=>e*t)));case"/":return void Y(r.map(ae).reduce(((e,t)=>e/t)));case"//":return void Y(r.map(ae).reduce(((e,t)=>m(e/t))));case"rem":return void Y(r.map(ae).reduce(((e,t)=>e%t)));case"min":return void Y(r.map(ae).reduce(((e,t)=>y(e,t))));case"max":return void Y(r.map(ae).reduce(((e,t)=>f(e,t))));case"<":case">":case"<=":case">=":for(let t=1,n=R(r);t<n;++t){const[n,s]=[r[t-1].v,r[t].v];if("<"===e&&n>=s||">"===e&&n<=s||"<="===e&&n>s||">="===e&&n<s)return void X(!1)}return void X(!0);case"inc":return void Y(r[0].v+1);case"dec":return void Y(r[0].v-1);case"abs":return void Y(o(ae(r[0])));case"pi":return void Y(u);case"sin":case"cos":case"tan":case"sqrt":case"round":case"floor":case"ceil":case"logn":case"log2":case"log10":return void Y({sin:i,cos:a,tan:c,sqrt:d,round:v,floor:m,ceil:p,logn:x,log2:h,log10:g}[e](ae(r[0])));case"odd?":case"even?":return void X(ae(r[0])%2==("odd?"===e?1:0));case"pos?":case"neg?":case"zero?":{const t=ae(r[0]);return void X("pos?"===e?t>0:"neg?"===e?t<0:!t)}case"null?":case"num?":case"bool?":case"str?":case"dict?":case"vec?":case"key?":case"func?":return void X("null?"===e&&"null"===r[0].t||"num?"===e&&"num"===r[0].t||"bool?"===e&&"bool"===r[0].t||"str?"===e&&"str"===r[0].t||"dict?"===e&&"dict"===r[0].t||"vec?"===e&&"vec"===r[0].t||"key?"===e&&"key"===r[0].t||"func?"===e&&"func"===r[0].t);case"has?":return void X(P(ie(r[0]),ie(r[1])));case"idx":{let e=-1;if("str"===r[0].t){if("str"!==r[1].t)return fe("strings can only contain strings");if(!(R(r)<3)){const e=ie(r[0]).split("");return e[ae(r[2])]=ie(r[1]),void ee(e.join(""))}e=j(ie(r[0]),ie(r[1]))}else if("vec"===r[0].t){if(!(R(r)<3)){const e=de(r[0]);return e[ae(r[2])]=r[1],void re(e)}e=ce(r[0]).findIndex((e=>ye(e,r[1])))}return void(-1===e?se():Y(e))}case"map":case"for":case"reduce":case"filter":case"remove":case"find":case"count":{const t=be(s,r.shift(),L),n=e=>"vec"===e||"str"===e||"dict"===e,o="map"===e||"for"===e?r.findIndex((({t:e})=>!n(e))):n(r[0].t)?-1:0;if(-1!==o)return fe(`argument 2 must be either: string, vector, dictionary, not ${G.typeNames[r[o].t]}`);if("for"===e){const e=r.map(de),n=e.map(R),o=n.map(((e,t)=>N(n,0,t+1).reduce(((e,t)=>e*t))));o.unshift(1);const a=o.pop();if(a>s.loopBudget)return[{e:"Budget",m:"would exceed loop budget",errCtx:L}];const i=[];for(let r=0;r<a;++r){const s=o.map(((e,t)=>m(r/e%n[t]))),a=await t(e.map(((e,t)=>e[s[t]])));if(a)return a;i.push(Q.pop())}return void re(i)}if("map"===e){const e=r.map(de),n=y(...e.map(R)),s=[];for(let r=0;r<n;++r){const n=await t(e.map((e=>e[r])));if(n)return n;s.push(Q.pop())}return void re(s)}const a=de(r.shift()),i="remove"===e,c="find"===e,u="count"===e;if("reduce"!==e){const n=[];let s=0;for(let e=0,o=R(a);e<o;++e){const o=await t([a[e],...r]);if(o)return o;const l=le(Q.pop());if(u)s+=l?1:0;else{if(c&&l)return void Q.push(a[e]);c||l===i||n.push(a[e])}}switch(e){case"count":return void Y(s);case"find":return void se();default:return void re(n)}}if(R(a)<2)return void C(Q,a);let l=(R(r)?r:a).shift();for(let e=0,r=R(a);e<r;++e){const r=await t([l,a[e]]);if(r)return r;l=Q.pop()}Q.push(l)}return;case"rand-int":case"rand":{const t=R(r),[n,s]=[t<2?0:ae(r[0]),0===t?1+Z("rand-int"===e):ae(1===t?r[0]:r[1])];Y("rand-int"===e?F(n,s):U(n,s))}return;case"do":case"val":return void Q.push("do"===e?r.pop():r.shift());case"..":{const e=be(s,r.shift(),L);return await e(k(r.map((e=>"vec"===e.t?ce(e):[e]))))}case"into":{const e="vec"===r[0].t,t="vec"===r[1].t;if(e)re(b(ce(r[0]),t?ce(r[1]):de(r[1])));else if(t){const e=de(r[1]);Q.push(pe(b(k(de(r[0]).map(ce)),e)))}else{const{keys:e,vals:t}=ue(r[0]),n=ue(r[1]);ne({keys:b(e,n.keys),vals:b(t,n.vals)})}return}case"push":if("vec"===r[0].t){const e=ce(r[0]);if(R(r)<3)re(b(e,[r[1]]));else{const t=ae(r[2]);re(b(b(N(e,0,t),[r[1]]),N(e,t)))}}else R(r)<3?Q.push((({keys:e,vals:t},r)=>{const[n,s]=[N(e),N(t)],o=e.findIndex((e=>ye(e,r)));return-1!==o&&($(n,o,1),$(s,o,1)),{t:"dict",v:{keys:n,vals:s}}})(ue(r[0]),r[1])):ne(he(ue(r[0]),r[1],r[2]));return;case"sect":{const e=r[0],t="vec"===e.t,n=t?R(ce(e)):M(ie(e));let s=0,o=n;switch(R(r)){case 1:s=1;break;case 2:{const e=ae(r[1]);e<0?o+=e:s+=e;break}case 3:{const e=ae(r[1]),t=ae(r[2]);s=e<0?n+e+(t<0?t:0):s+e,o=(t<0?o:s)+t;break}}return s=f(s,0),o=y(o,n),s>o?void(t?re:ee)():void(t?re(N(ce(e),s,o)):ee(H(ie(r[0]),s,o-s)))}case"reverse":return void("str"===r[0].t?ee(me(w(de(r[0])))):re(w(de(r[0]))));case"sort":{if(!R(ce(r[0])))return void re();const e=de(r[0]),n=[];if(1===R(r))C(n,e.map((e=>[e,e])));else{const t=be(s,r.pop(),L);for(let r=0,s=R(e);r<s;++r){const s=await t([e[r]]);if(s)return s;n.push([e[r],Q.pop()])}}const o=n[0][1].t;return n.some((([e,{t}])=>t!==o||!A(["num","str"],t)))?fe("can only sort by all number or all string"):((0,t.visNum)(n[0][1])?B(n,(([e,t],[r,n])=>ae(t)>ae(n)?1:-1)):B(n,(([e,t],[r,n])=>ie(t)>ie(n)?1:-1)),void re(n.map((([e])=>e))))}case"range":{const[e,t,n]=r.map(ae),a=n&&n<0&&e<t,[i,c]=R(r)>1?a?[t-1,e-1]:[e,t]:[0,e],u=l((c-i)*(n||1))*(n||1),d=p(o((c-i)/u));if(!d)return void re([]);if(d>s.rangeBudget)return[{e:"Budget",m:"range budget depleted",errCtx:L}];s.rangeBudget-=d;const m=W(d).map((e=>e*u+i));return void re(m.map((e=>({t:"num",v:e}))))}case"empty?":return void X(!R(de(r[0])));case"keys":case"vals":return void re(ue(r[0])["keys"===e?"keys":"vals"]);case"split":return void re(ie(r[0]).split(R(r)>1?ie(r[1]):" ").map((e=>({t:"str",v:e}))));case"join":return void ee(ce(r[0]).map(J).join(R(r)>1?ie(r[1]):" "));case"starts-with?":return void X(I(ie(r[0]),ie(r[1])));case"ends-with?":return void X(E(ie(r[0]),ie(r[1])));case"upper-case":case"lower-case":case"trim":case"trim-start":case"trim-end":return void ee(("upper-case"===e?S:"lower-case"===e?D:"trim"===e?q:"trim-start"===e?T:O)(ie(r[0])));case"str*":{const e=ie(r[0]);return void ee(W(f(ae(r[1]),0)).map((t=>e)).join(""))}case"time":return void Y(_());case"version":return void Y(t.insituxVersion);case"tests":{const e=await(0,z.doTests)(we,!(R(r)&&le(r[0]))),t=e.pop();for(const t of e)await ge("print",[{v:t,t:"str"}],s,L,!1);ee(t)}return;case"symbols":return void re(Ne(s,!1).map((e=>({t:"str",v:e}))));case"eval":{delete s.env.funcs.entry;const e=R(Q),t=await Ce(s,ie(r[0]),L.invocationId);return t?(t.forEach((e=>{e.errCtx.invocationId="evaluated"})),[{e:"Eval",m:"error within evaluated code",errCtx:L},...t]):void(e===R(Q)&&se())}case"reset":return s.env.vars={},s.env.funcs={},s.env.lets=[],void se()}return[{e:"Unexpected",m:"operation doesn't exist",errCtx:L}]}function be(e,r,n,s=!0){const a=[{e:"Arity",m:"one argument required",errCtx:n}];if((0,t.visStr)(r)||(0,t.visFun)(r)){const t=r.v;return G.ops[t]?r=>ge(t,r,e,n,s):t in e.env.funcs?r=>ke(e,e.env.funcs[t],r):t in e.env.vars?be(e,e.env.vars[t],n):t in e.env.lets[R(e.env.lets)-1]?be(e,e.env.lets[R(e.env.lets)-1][t],n):I(t,"$")?async r=>{if(!R(r))return a;const s=await e.set(H(t,1),r[0]);return Q.push(r[0]),s?[{e:"External",m:s,errCtx:n}]:void 0}:async r=>{const{err:s,value:o}=await e.exe(t,r);return s||Q.push(o),s?[{e:"External",m:s,errCtx:n}]:void 0}}if((0,t.visKey)(r))return async e=>{if(!R(e))return a;if("dict"!==e[0].t){const t=G.typeNames[e[0].t];return[ve(`keyword as operation argument must be dictionary, not ${t}`,n)]}Q.push(xe(ue(e[0]),r))};if((0,t.visNum)(r)){const e=m(r.v);return async t=>{if(!R(t))return a;const r=t[0];if("str"!==r.t&&"vec"!==r.t&&"dict"!==r.t){const e=G.typeNames[r.t];return[ve(`number as operation argument must be string, vector, or dictionary, not ${e}`,n)]}const s=de(r);o(e)>=R(s)?se():e<0?Q.push(s[R(s)+e]):Q.push(s[e])}}if((0,t.visVec)(r)){const{v:e}=r;return async t=>{if(!R(t))return a;const r=e.find((e=>ye(e,t[0])));r?Q.push(r):se()}}if((0,t.visDic)(r)){const e=r.v;return async t=>{if(1===R(t))Q.push(xe(e,t[0]));else{if(2!==R(t))return[{e:"Arity",m:"dictionary as operation takes one or two arguments only",errCtx:n}];ne(he(e,t[0],t[1]))}}}if((0,t.visBoo)(r)){const e=r.v;return async t=>{if(!R(t)||R(t)>2)return[{e:"Arity",m:"boolean as operation takes one or two arguments only",errCtx:n}];Q.push(e?t[0]:R(t)>1?t[1]:{t:"null",v:void 0})}}return async e=>[{e:"Operation",m:`${J(r)} is an invalid operation`,errCtx:n}]}function Ae(e){const t=(e,t,r)=>he(e,{t:"key",v:t},r);return e.map((({e,m:r,errCtx:n})=>{let s=t({keys:[],vals:[]},":e",{t:"str",v:e});return s=t(s,":m",{t:"str",v:r}),s=t(s,":line",{t:"num",v:n.line}),s=t(s,":col",{t:"num",v:n.col}),{t:"dict",v:s}}))}async function ke(e,r,n){--e.callBudget,e.env.lets.push({});for(let s=0,o=R(r.ins);s<o;++s){const{typ:a,value:i,errCtx:c}=r.ins[s],u=e.loopBudget<1;if(u||e.callBudget<1)return[{e:"Budget",m:(u?"looped":"called")+" too many times",errCtx:c}];switch(a){case"nul":se();break;case"boo":X(i);break;case"num":Y(i);break;case"str":ee(i);break;case"key":te(i);break;case"var":e.env.vars[i]=Q[R(Q)-1];break;case"let":e.env.lets[R(e.env.lets)-1][i]=Q[R(Q)-1];break;case"par":{const e=i;-1===e?re(n):R(n)<=e?se():Q.push(n[e])}break;case"ref":{const t=i;if(G.ops[t])oe(t);else if(I(t,"$")){const{value:r,err:n}=await e.get(H(t,1));if(n)return[{e:"External",m:n,errCtx:c}];Q.push(r)}else if(t in e.env.vars)Q.push(e.env.vars[t]);else if(t in e.env.lets[R(e.env.lets)-1])Q.push(e.env.lets[R(e.env.lets)-1][t]);else{if(!(t in e.env.funcs))return[{e:"Reference",m:`"${t}" did not exist`,errCtx:c}];oe(t)}}break;case"op":case"exe":{let[a,u]=i;const l=$(Q,R(Q)-u,u);if(R(l)!==u)return[{e:"Unexpected",m:`${a} stack depleted`,errCtx:c}];if(s===o-1&&(0,t.visStr)(a)&&a.v===r.name){if(e.env.lets[R(e.env.lets)-1]={},s=-1,n=l,--e.recurBudget,!e.recurBudget)return[{e:"Budget",m:"recurred too many times",errCtx:c}];continue}const d=be(e,a,c,!1),m=await d(l);if(m){if(s+1!==o&&"cat"===r.ins[s+1].typ){++s,e.env.lets[R(e.env.lets)-1].errors={t:"vec",v:Ae(m)};break}return m}}break;case"or":le(Q[R(Q)-1])?s+=i:Q.pop();break;case"if":le(Q.pop())||(s+=i);break;case"jmp":case"cat":s+=i;break;case"loo":s+=i,--e.loopBudget;break;case"pop":$(Q,R(Q)-i,i);break;case"ret":i?$(Q,0,R(Q)-1):se(),s=o;break;default:(0,G.assertUnreachable)(a)}}e.env.lets.pop()}async function Ce(e,t,r){const s=(0,n.parse)(t,r);return R(s.errors)?s.errors:(e.env.funcs={...e.env.funcs,...s.funcs},"entry"in e.env.funcs?await ke(e,e.env.funcs.entry,[]):void 0)}async function we(e,t,r,n=!1){const{callBudget:s,loopBudget:o,recurBudget:a,rangeBudget:i}=e,c=await Ce(e,t,r);return e.env.lets=[],e.callBudget=s,e.recurBudget=a,e.loopBudget=o,e.rangeBudget=i,delete e.env.funcs.entry,!c&&n&&R(Q)&&await e.exe("print",[{t:"str",v:J(Q[R(Q)-1])}]),Q=[],c??[]}function Ne(e,t=!0){let r=t?["function"]:[];r=b(r,L(G.ops)),r=b(r,L(e.env.funcs)),r=b(r,L(e.env.vars));const n=["execute-last","entry"];return r.filter((e=>!A(n,e)))}t.exeFunc=ke,t.invoke=we,t.symbols=Ne},669:(e,t,r)=>{t.invoker=t.Z=void 0;const n=r(607),s=r(17),o=new Map;t.Z=/[\[\]\(\) ,]/,t.invoker=async function(e,r){const a=(0,s.getTimeMs)().toString();o.set(a,r);const i=await(0,n.invoke)(e,r,a,!0);let c=[];return i.forEach((({e,m:r,errCtx:{line:n,col:a,invocationId:i}})=>{const u=o.get(i);if(!u)return void c.push({type:"message",text:`${e} Error: line ${n} col ${a}: ${r}\n`});const l=u.split("\n")[n-1],d=(0,s.substr)(l,a-1).split(t.Z)[0],m=(0,s.trimStart)((0,s.substr)(l,0,a-1));if(c.push({type:"message",text:(0,s.padEnd)(`${n}`,4)+m}),d){const e=(0,s.substr)(l,a-1+d.length);c.push({type:"error",text:d}),c.push({type:"message",text:`${e}\n`})}else{const e=(0,s.substr)(l,a);c.push({type:"error",text:l[a-1]}),c.push({type:"message",text:`${e}\n`})}c.push({type:"message",text:`${e} Error: ${r}.\n`})})),c}},306:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.parse=t.arityCheck=void 0;const n=r(17),{concat:s,has:o,flat:a,push:i,slice:c}=n,{slen:u,starts:l,sub:d,substr:m,strIdx:p}=n,{isNum:v,len:f,toNum:y}=n,x=r(699),h=r(699);function g(e,t){const r=[];for(;;){const n=A(e,t);if(!f(n))break;i(r,n)}return r}function b(e,t,r){const{exactArity:n,maxArity:s,minArity:o}=x.ops[e],a=(n,s)=>[{e:"Arity",m:`${e} needs ${n} argument${1!==s?"s":""}, not ${t}`,errCtx:r}];if(void 0!==n){if(t!==n)return a(`exactly ${n}`,n)}else{if(o&&!s&&t<o)return a(`at least ${o}`,o);if(!o&&s&&t>s)return a(`at most ${s}`,s);if(o&&s&&(t<o||t>s))return a(`between ${o} and ${s}`,s)}}function A(e,t){if(!f(e))return[];const{typ:r,text:n,errCtx:s}=e.shift();switch(r){case"str":return[{typ:"str",value:n,errCtx:s}];case"num":return[{typ:"num",value:y(n),errCtx:s}];case"sym":if("true"===n||"false"===n)return[{typ:"boo",value:"true"===n,errCtx:s}];if("null"===n)return[{typ:"nul",value:void 0,errCtx:s}];if(l(n,":"))return[{typ:"key",value:n,errCtx:s}];if(l(n,"#")&&v(m(n,1))){const e=y(m(n,1));return e<0?[{typ:"nul",errCtx:s}]:[{typ:"par",value:e,errCtx:s}]}return o(t,n)?[{typ:"par",value:t.indexOf(n),errCtx:s}]:"args"===n?[{typ:"par",value:-1,errCtx:s}]:[{typ:"ref",value:n,errCtx:s}];case"ref":return[{typ:"def",value:n,errCtx:s}];case"(":return function(e,t){const r=e.shift();if(!r)return[];const{typ:n,text:s,errCtx:a}=r;let c=s;const u=e=>[{typ:"err",value:e,errCtx:a}];if("catch"===c){if("("!==e[0].typ)return u("first argument must be expression");const r=A(e,t),n=g(e,t);return f(r)&&f(n)?[...r,{typ:"cat",value:f(n),errCtx:a},...n]:u("must provide 2 arguments")}if("var"===c||"let"===c){const[r,n]=[A(e,t),A(e,t)];return f(r)&&f(n)&&!f(A(e,t))?[...n,{typ:c,value:r[0].value,errCtx:a}]:u("must provide reference name and value only")}if("if"===c||"when"===c){const r=A(e,t);if(!f(r))return u("must provide condition");const n=r;if("if"===c){const r=A(e,t);if(!f(r))return u("must provide a branch");n.push({typ:"if",value:f(r)+1,errCtx:a}),i(n,r);const s=A(e,t);if(f(s)){if(n.push({typ:"jmp",value:f(s),errCtx:a}),i(n,s),f(A(e,t)))return u("too many branches")}else n.push({typ:"jmp",value:1,errCtx:a}),n.push({typ:"nul",value:void 0,errCtx:a})}else{const r=g(e,t);n.push({typ:"if",value:f(r)+1,errCtx:a}),i(n,r),n.push({typ:"jmp",value:1,errCtx:a}),n.push({typ:"nul",value:void 0,errCtx:a})}return n}if("and"===c||"or"===c||"while"===c){const r=[];let n=0;for(;;){const s=A(e,t);if(!f(s))break;r.push(s),n+=f(s)}if(f(r)<2)return u("requires at least two arguments");const s=[];if("while"===c){n+=2;const e=r.shift();return i(s,e),s.push({typ:"if",value:n-f(e),errCtx:a}),r.forEach((e=>i(s,e))),s.push({typ:"pop",value:f(r),errCtx:a}),s.push({typ:"loo",value:-(n+1),errCtx:a}),s}n+=f(r),n+=y("and"===c);const o="and"===c?"if":"or";for(let e=0;e<f(r);++e)i(s,r[e]),n-=f(r[e]),s.push({typ:o,value:n,errCtx:a}),--n;return"and"===c?i(s,[{typ:"boo",value:!0,errCtx:a},{typ:"jmp",value:1,errCtx:a},{typ:"boo",value:!1,errCtx:a}]):s.push({typ:"boo",value:!1,errCtx:a}),s}const d=[];let m=0;if("("===n||o(t,s)||l(s,"#")){e.unshift(r);const n=A(e,t);i(d,n),c="execute-last",++m}const p=[];for(;f(e);){const r=A(e,t);if(!f(r))break;++m,i(p,r)}if("return"===c)return[...p,{typ:"ret",value:!!f(p),errCtx:a}];if(x.ops[c]){const e=b(c,m,a);e&&i(d,e.map((e=>u(e.m)[0])))}return d.push({typ:x.ops[c]?"op":"exe",value:["num"===n?{t:"num",v:y(c)}:l(c,":")?{t:"key",v:c}:x.ops[c]?{t:"func",v:c}:"true"===c||"false"===c?{t:"bool",v:"true"===c}:{t:"str",v:c},m],errCtx:a}),[...p,...d]}(e,t);case")":return[];default:return(0,h.assertUnreachable)(r)}}t.arityCheck=b,t.parse=function(e,t){const{tokens:r,stringError:n}=function(e,t){const r=[];let n=!1,s=!1,o=[0,0],a=!1,i=!1,c=!1,l=1,m=0;for(let v=0,y=u(e);v<y;++v){const u=p(e,v),x=v+1!==y?p(e,v+1):"";if(++m,c){"\n"===u&&(c=!1,++l,m=0);continue}if(s){s=!1,n&&(r[f(r)-1].text+={n:"\n",t:"\t",'"':'"'}[u]||`\\${u}`);continue}if("\\"===u){s=!0;continue}if('"'===u){(n=!n)&&(o=[l,m],r.push({typ:"str",text:"",errCtx:{invocationId:t,line:l,col:m}})),i=a=!1;continue}const h=d(" \t\n\r,",u);if(!n&&h){i=a=!1,"\n"===u&&(++l,m=0);continue}if(!n&&";"===u){c=!0;continue}const g={invocationId:t,line:l,col:m},b=e=>d("0123456789",e),A=d("()[]{}",u);if(i&&!b(u)&&(i="."===u&&!d(r[f(r)-1].text,"."),i||A||h||(a=!0,r[f(r)-1].typ="sym")),a&&A&&(a=!1),!n&&!a&&!i){if(A){const e={"[":"(","{":"(","(":"(",")":")","}":")","]":")"}[u];r.push({typ:e,text:e,errCtx:g}),"["===u?r.push({typ:"sym",text:"vec",errCtx:g}):"{"===u&&r.push({typ:"sym",text:"dict",errCtx:g});continue}i=b(u)||"."===u&&b(x)||"-"===u&&(b(x)||"."===x),a=!i;let e=a?"sym":"num";if(f(r)){const{typ:t,text:n}=r[f(r)-1];"sym"!==t||"var"!==n&&"let"!==n||(e="ref")}r.push({typ:e,text:"",errCtx:g})}r[f(r)-1].text+=u}return{tokens:r,stringError:n?o:void 0}}(e,t),o=function(e,t,r){const n=[],s=(e,t)=>n.push({e:"Parse",m:e,errCtx:t}),o=e=>f(t.filter((({typ:t})=>t===e))),[a,i]=[o("("),o(")")];{const[e,n]=function(e,t,r){const n=r>=t,[s,o]=[n?"(":")",n?")":"("],a=n?1:-1;for(let t=f(e),r=n?0:t-1,i=0;n?r<t:r>=0;r+=a){const{typ:t,errCtx:{line:n,col:a}}=e[r];if(i+=y(t===s)-y(t===o),i<0)return[n,a]}return[0,0]}(t,a,i);e+n&&s("unmatched parenthesis",{invocationId:r,line:e,col:n})}if(e){const[t,n]=e;s("unmatched double quotation marks",{invocationId:r,line:t,col:n})}let c;for(let e=0,r=!1;e<f(t);++e){if(r&&")"===t[e].typ){c=t[e];break}r="("===t[e].typ}return c&&s("empty expression forbidden",c.errCtx),n}(n,r,t);if(f(o))return{errors:o,funcs:{}};const l=function(e){const t=e=>f(e)>1&&"sym"===e[1].typ&&"function"===e[1].text,r=e.filter((e=>t(e))),n=a(e.filter((e=>!t(e)))),o=r.map((e=>({name:e[2].text,tokens:c(e,3),errCtx:e[2].errCtx})));return f(n)?s(o,[{name:"entry",tokens:n,errCtx:n[0].errCtx}]):o}(function(e){const t=[[]];let r=0;return e.forEach((e=>{t[f(t)-1].push(e),r+=y("("===e.typ)-y(")"===e.typ),0===r&&t.push([])})),t}(r)).map((e=>function({name:e,tokens:t},r){const[n,s]=function(e,t){const r=[],n=[];for(let t=0,s=!1;t<f(e);++t)s||(s="sym"!==e[t].typ),(s?n:r).push(e[t]);return[r,n]}(t);if("("===e)return{err:{e:"Parse",m:"nameless function",errCtx:r}};if(!f(n)&&!f(s))return{err:{e:"Parse",m:"empty function body",errCtx:r}};if(f(s)&&")"===s[0].typ){if(!f(n))return{err:{e:"Parse",m:"empty function body",errCtx:r}};s.unshift(n.pop())}f(n)&&!f(s)&&s.push(n.pop());const o=[];for(;f(s);)i(o,A(s,n.map((e=>e.text))));const a=o.filter((e=>"err"===e.typ));return f(a)?{err:{e:"Parse",m:a[0].value,errCtx:a[0].errCtx}}:{func:{name:e,ins:o}}}(e,{invocationId:t,line:e.errCtx.line,col:e.errCtx.col}))),[m,v]=function(e,t){const r=[],n=[];return e.forEach((e=>{return(t=e,t.err?n:r).push(e);var t})),[r,n]}(l);i(o,v.map((e=>e.err)));const x={};return m.forEach((({func:e})=>x[e.name]=e)),{errors:o,funcs:x}}},17:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.log10=t.log2=t.logn=t.pi=t.sign=t.ceil=t.floor=t.round=t.sqrt=t.tan=t.cos=t.sin=t.max=t.min=t.abs=t.getTimeMs=t.objKeys=t.range=t.randInt=t.randNum=t.padEnd=t.trimEnd=t.trimStart=t.trim=t.upperCase=t.lowerCase=t.reverse=t.sortBy=t.push=t.concat=t.flat=t.ends=t.starts=t.has=t.subIdx=t.sub=t.strIdx=t.substr=t.isArray=t.isNum=t.slen=t.len=t.splice=t.slice=t.toNum=void 0,t.toNum=e=>Number(e),t.slice=(e,t,r)=>e.slice(t,r),t.splice=(e,t,r)=>e.splice(t,r),t.len=e=>e.length,t.slen=e=>e.length,t.isNum=e=>!Number.isNaN(Number(e)),t.isArray=e=>Array.isArray(e),t.substr=(e,t,r)=>e.substring(t,t+(r??e.length)),t.strIdx=(e,t)=>e[t],t.sub=(e,t)=>e.includes(t),t.subIdx=(e,t)=>e.indexOf(t),t.has=(e,t)=>e.includes(t),t.starts=(e,t)=>e.startsWith(t),t.ends=(e,t)=>e.endsWith(t),t.flat=e=>e.flat(),t.concat=(e,t)=>e.concat(t),t.push=(e,t)=>e.push(...t),t.sortBy=(e,t)=>e.sort(t),t.reverse=e=>e.reverse(),t.lowerCase=e=>e.toLowerCase(),t.upperCase=e=>e.toUpperCase(),t.trim=e=>e.trim(),t.trimStart=e=>e.trimStart(),t.trimEnd=e=>e.trimEnd(),t.padEnd=(e,t)=>e.padEnd(t),t.randNum=(e,t)=>e+Math.random()*(t-e),t.randInt=(e,r)=>Math.floor((0,t.randNum)(e,r)),t.range=e=>[...Array(e).keys()],t.objKeys=e=>Object.keys(e),t.getTimeMs=()=>(new Date).getTime(),t.abs=Math.abs,t.min=Math.min,t.max=Math.max,t.sin=Math.sin,t.cos=Math.cos,t.tan=Math.tan,t.sqrt=Math.sqrt,t.round=Math.round,t.floor=Math.floor,t.ceil=Math.ceil,t.sign=Math.sign,t.pi=Math.PI,t.logn=Math.log,t.log2=Math.log2,t.log10=Math.log10},127:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.doTests=void 0;const n=r(17);async function s(e,t){return e.dict.has(t)?{value:e.dict.get(t),err:void 0}:{value:{t:"null",v:void 0},err:`"${t} not found.`}}async function o(e,t,r){e.dict.set(t,r)}async function a(e,t,r){const n={t:"null",v:void 0};switch(t){case"print-str":e.output+=r[0].v;break;case"print":case"test.function":e.output+=r[0].v+"\n";break;default:return{value:n,err:"operation does not exist"}}return{value:n,err:void 0}}const i=[{name:"Hello, world!",code:'"Hello, world!"',out:"Hello, world!"},{name:"Say Hello, world!",code:'(print "Hello, world!")',out:"Hello, world!\nnull"},{name:"1 + 1 = 2",code:"(+ 1 1)",out:"2"},{name:"Negate 1 = -1",code:"(- 1)",out:"-1"},{name:"(1+1)+1+(1+1) = 5",code:"(+ (+ 1 1) 1 (+ 1 1))",out:"5"},{name:"Conditional head",code:"((if true + -) 12 9 1)",out:"22"},{name:"Whens",code:'[(when 123 (print "hi") 234) (when false (print "bye"))]',out:"hi\n[234 null]"},{name:"Cond number head",code:"((if false 1 2) [:a :b :c])",out:":c"},{name:"and & short-circuit",code:"[(and true (if true null 1) true) (and 1 2 3)]",out:"[false true]"},{name:"or & short-circuit",code:'[(or true (print "hello") 1) (or false (print-str "-> ") 1)]',out:"-> [true 1]"},{name:"String retrieve",code:'(2 "Hello")',out:"l"},{name:"Vector retrieve",code:"(2 [:a :b :c :d])",out:":c"},{name:"Key as operation",code:'(:age {:name "Patrick" :age 24})',out:"24"},{name:"Dictionary as op 1",code:'({"name" "Patrick" "age" 24} "age")',out:"24"},{name:"Dictionary as op 2",code:'({"name" "Patrick"} "age" 24)',out:'{"name" "Patrick", "age" 24}'},{name:"Equalities",code:'[(= 1 2 1)\n            (!= 1 2 1)\n            (= "Hello" "hello")\n            (!= "world" "world")\n            (= [0 [1]] [0 [1]])]',out:"[false 1 false false [0 [1]]]"},{name:"Define and retrieve",code:"(var a 1) a",out:"1"},{name:"Define and add",code:"(var a 1) (inc a)",out:"2"},{name:"Define op and call",code:"(var f +) (f 2 2)",out:"4"},{name:"Define vec and call",code:"(var f [1]) (f 1)",out:"1"},{name:"Define num and call",code:"(var f 1) (f [:a :b :c])",out:":b"},{name:"Print simple vector",code:"[1 2 3]",out:"[1 2 3]"},{name:"Boolean select",code:"[(true 1 2) (false 1)]",out:"[1 null]"},{name:"Sum vector of numbers",code:"[(reduce + [1 2 3]) (reduce + [1 2 3] 3)]",out:"[6 9]"},{name:"Sum vectors of numbers",code:"(map + [1 2 3] [1 2 3 4])",out:"[2 4 6]"},{name:"Filter by integer",code:'(filter 2 [[1] [:a :b :c] "hello" "hi"])',out:'[[:a :b :c] "hello"]'},{name:"Comments, short decimal",code:';((print "Hello")\n           .456',out:"0.456"},{name:"Dictionary into vector",code:"(into [1 2] {3 4 5 6})",out:"[1 2 [3 4] [5 6]]"},{name:"Vector into dictionary",code:"(into {[0] 1 [2] 3} [[0] 2])",out:"{[0] 2, [2] 3}"},{name:"While loop",code:"(var n 5)\n           (while (< 0 n)\n             (print-str n)\n             (var n (dec n)))",out:"543215"},{name:"Catch error",code:'(catch\n             (:e (catch (+ 1 :a) (0 errors)))\n             (print "hi"))',out:"Type"},{name:"Define with no call",code:'(function func (print "Nothing."))'},{name:"Call greet func",code:'(function greeting (print "Hello!")) (greeting)',out:"Hello!\nnull"},{name:"Call const value func",code:"(function const 123) (const)",out:"123"},{name:"Call identity funcs",code:"(function id1 #)\n           (function id2 x x)\n           [(id1 123) (id2 456)]",out:"[123 456]"},{name:"Call greet with name",code:'(function greeting name (print "Hello, " name "!"))\n           (greeting "Patrick")',out:"Hello, Patrick!\nnull"},{name:"Call with too few args",code:"(function func a b c [a b c]) (func 1 2)",out:"[1 2 null]"},{name:"Define func and call",code:"(function func a b (+ a b)) (var f func) (f 2 2)",out:"4"},{name:"Anonymous parameters",code:"(function avg<n? (< (/ (.. + #) (len #)) #1))\n           (avg<n? [0 10 20 30 40] 5)",out:"false"},{name:"Call parameter",code:'(function f x (x "hello")) (f print)',out:"hello\nnull"},{name:"Let and retrieve",code:"(function f (let a 1) a) (f)",out:"1"},{name:"Let num op and call",code:"(function f (let n 0) (n [1])) (f)",out:"1"},{name:"Explicit return",code:"(function f (return 123) (print 456)) (f)",out:"123"},{name:"String instead of number",code:'(function sum (.. + args))\n           (print (sum 2 2))\n           (sum 2 "hi")',out:"4",err:["Type"]},{name:"Reference non-existing",code:"x",err:["Reference"]},{name:"Expired let retrieve",code:"(function f (let a 1) a) (f) a",err:["Reference"]},{name:"Call non-existing",code:"(x)",err:["External"]},{name:"Call budget",code:"(function f (f)) (f)",err:["Budget"]},{name:"Loop budget",code:"(var n 10000)\n           (while (< 0 n)\n             (var n (dec n)))",err:["Budget"]},{name:"Range budget",code:"(range 10000)",err:["Budget"]},{name:"Fibonacci 13",code:"(function fib n\n             (if (< n 2) n\n               (+ (fib (dec n))\n                  (fib (- n 2)))))\n           (fib 13)",out:"233"},{name:"dedupe (tail-call optim)",code:"(function dedupe list -out\n             (let out (or -out []))\n             (let next (if (out (0 list)) [] [(0 list)]))\n             (if (empty? list) out\n                 (dedupe (sect list) (into out next))))\n           (dedupe [1 1 2 3 3 3])",out:"[1 2 3]"},{name:"set get",code:"[($globals.time_offset 5.5) $globals.time_offset]",out:"[5.5 5.5]"},{name:"exe",code:"(test.function 123)",out:"123\nnull"},{name:"Empty parens",code:"()",err:["Parse"]},{name:"Imbalanced parens 1",code:'(print ("hello!")',err:["Parse"]},{name:"Imbalanced parens 2",code:'print "hello!")',err:["Parse"]},{name:"Imbalanced quotes 1",code:'(print "Hello)',err:["Parse","Parse"]},{name:"Imbalanced quotes 2",code:'print "Hello")',err:["Parse"]},{name:"Function as op",code:"(function)",err:["Parse"]},{name:"Function without name",code:"(function (+))",err:["Parse"]},{name:"Function without body",code:"(function func)",err:["Parse"]}];t.doTests=async function(e,t=!0){const r=[];for(let t=0;t<(0,n.len)(i);++t){const{name:c,code:u,err:l,out:d}=i[t],m={dict:new Map,output:""},p={funcs:{},vars:{},lets:[]},v=(0,n.getTimeMs)(),f=await e({get:e=>s(m,e),set:(e,t)=>o(m,e,t),exe:(e,t)=>a(m,e,t),env:p,loopBudget:1e4,rangeBudget:1e3,callBudget:1e3,recurBudget:1e4},u,"testing",!0),y=(l||[]).join()===f.map((({e})=>e)).join(),x=!d||(0,n.trim)(m.output)===d,h=(0,n.getTimeMs)()-v,[g,b,A,k]=[(0,n.padEnd)(`${t+1}`,3),(0,n.padEnd)(c,24),(0,n.padEnd)(`${h}ms`,6),y||f.map((({e,m:t,errCtx:{line:r,col:n}})=>`${e} ${r}:${n}: ${t}`))];r.push({okErr:y,okOut:x,elapsedMs:h,display:`${g} ${b} ${A} ${x} ${k}`})}const c=r.reduce(((e,{elapsedMs:t})=>e+t),0),u=(0,n.len)(r.filter((({okOut:e,okErr:t})=>e&&t)));return(0,n.concat)(r.filter((e=>!t||!e.okOut||!e.okErr)).map((e=>e.display)),[`---- ${u}/${(0,n.len)(r)} tests passed in ${c}ms.`])}},699:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.assertUnreachable=t.typeNames=t.ops=void 0,t.ops={print:{},"print-str":{},"execute-last":{},"!":{exactArity:1},"=":{minArity:2},"!=":{minArity:2},"+":{minArity:2,onlyNum:!0},"-":{minArity:1,onlyNum:!0},"*":{minArity:2,onlyNum:!0},"/":{minArity:2,onlyNum:!0},"//":{minArity:2,onlyNum:!0},"**":{minArity:1,onlyNum:!0},"<":{minArity:2,onlyNum:!0},">":{minArity:2,onlyNum:!0},"<=":{minArity:2,onlyNum:!0},">=":{minArity:2,onlyNum:!0},inc:{exactArity:1,onlyNum:!0},dec:{exactArity:1,onlyNum:!0},min:{minArity:2,onlyNum:!0},max:{minArity:2,onlyNum:!0},abs:{exactArity:1,onlyNum:!0},pi:{exactArity:0},sqrt:{exactArity:1,onlyNum:!0},round:{exactArity:1,onlyNum:!0},floor:{exactArity:1,onlyNum:!0},ceil:{exactArity:1,onlyNum:!0},logn:{exactArity:1,onlyNum:!0},log2:{exactArity:1,onlyNum:!0},log10:{exactArity:1,onlyNum:!0},"odd?":{exactArity:1,onlyNum:!0},"even?":{exactArity:1,onlyNum:!0},"pos?":{exactArity:1,onlyNum:!0},"neg?":{exactArity:1,onlyNum:!0},"zero?":{exactArity:1,onlyNum:!0},"null?":{exactArity:1},"num?":{exactArity:1},"bool?":{exactArity:1},"str?":{exactArity:1},"vec?":{exactArity:1},"dict?":{exactArity:1},"key?":{exactArity:1},"func?":{exactArity:1},rem:{minArity:2,onlyNum:!0},sin:{exactArity:1,onlyNum:!0},cos:{exactArity:1,onlyNum:!0},tan:{exactArity:1,onlyNum:!0},vec:{},dict:{},len:{exactArity:1,types:[["str","vec","dict"]]},"to-num":{exactArity:1,types:[["str","num"]]},"to-key":{exactArity:1,types:[["str","num"]]},"has?":{exactArity:2,types:["str","str"]},idx:{minArity:2,maxArity:3,types:[["str","vec"]]},map:{minArity:2},for:{minArity:2},reduce:{minArity:2,maxArity:3},filter:{minArity:2},remove:{minArity:2},find:{minArity:2},count:{minArity:2},str:{},rand:{maxArity:2,onlyNum:!0},"rand-int":{maxArity:2,onlyNum:!0},while:{},"..":{minArity:2},into:{exactArity:2,types:[["vec","dict"],["vec","dict"]]},push:{minArity:2,maxArity:3,types:[["vec","dict"]]},sect:{minArity:1,maxArity:3,types:[["vec","str"],"num","num"]},reverse:{exactArity:1,types:[["vec","str"]]},sort:{minArity:1,maxArity:2,types:["vec"]},keys:{exactArity:1,types:["dict"]},vals:{exactArity:1,types:["dict"]},do:{minArity:1},val:{minArity:1},range:{minArity:1,maxArity:3,types:["num","num","num"]},"empty?":{exactArity:1,types:[["str","vec","dict"]]},split:{minArity:1,maxArity:2,types:["str","str"]},join:{minArity:1,maxArity:2,types:["vec","str"]},"starts-with?":{exactArity:2,types:["str","str"]},"ends-with?":{exactArity:2,types:["str","str"]},"lower-case":{exactArity:1,types:["str"]},"upper-case":{exactArity:1,types:["str"]},trim:{exactArity:1,types:["str"]},"trim-start":{exactArity:1,types:["str"]},"trim-end":{exactArity:1,types:["str"]},"str*":{exactArity:2,types:["str","num"]},time:{exactArity:0},version:{exactArity:0},tests:{minArity:0,maxArity:1,types:["bool"]},symbols:{exactArity:0},eval:{exactArity:1,types:["str"]},reset:{exactArity:0}},t.typeNames={null:"null",str:"string",num:"number",bool:"boolean",key:"keyword",ref:"reference",vec:"vector",dict:"dictionary",func:"function"},t.assertUnreachable=e=>0}},t={},r=function r(n){var s=t[n];if(void 0!==s)return s.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}(669);window.insitux=r.invoker})();
//# sourceMappingURL=insitux.js.map