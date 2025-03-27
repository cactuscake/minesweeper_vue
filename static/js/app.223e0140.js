(function(){"use strict";var e={25:function(e,a,t){var n=t(3751),l=t(810),r=t(641);const o={id:"app"};function i(e,a){const t=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.CE)("div",o,[(0,r.bF)(t)])}var s=t(6262);const u={},d=(0,s.A)(u,[["render",i]]);var c=d,v=t(5220);t(4114);const f=(0,l.nY)("game",{state:()=>({difficulty:"easy",boardSize:{rows:8,cols:8},mines:10,leaderboard:JSON.parse(localStorage.getItem("leaderboard"))||[]}),actions:{setDifficulty(e){"easy"===e?(this.boardSize={rows:8,cols:8},this.mines=10):"medium"===e?(this.boardSize={rows:16,cols:16},this.mines=40):"hard"===e&&(this.boardSize={rows:16,cols:32},this.mines=100),this.difficulty=e},addToLeaderboard(e){this.leaderboard.push(e),this.leaderboard.sort(((e,a)=>e.time-a.time)),this.leaderboard=this.leaderboard.slice(0,10),localStorage.setItem("leaderboard",JSON.stringify(this.leaderboard))}}}),m={class:"settings-container"},h={class:"difficulty-options"};var b={__name:"GameSettings",setup(e){const a=f(),t=(0,v.rd)(),n=e=>{a.setDifficulty(e)},l=()=>{t.push("/game")};return(e,a)=>{const t=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",m,[a[4]||(a[4]=(0,r.Lk)("h1",{class:"settings-h1"},"Сапёр",-1)),(0,r.Lk)("div",h,[(0,r.Lk)("button",{onClick:a[0]||(a[0]=e=>n("easy"))},"Простой (8x8, 10 мин)"),(0,r.Lk)("button",{onClick:a[1]||(a[1]=e=>n("medium"))},"Средний (16x16, 40 мин)"),(0,r.Lk)("button",{onClick:a[2]||(a[2]=e=>n("hard"))},"Сложный (32x16, 100 мин)")]),(0,r.Lk)("button",{class:"settings-button",onClick:l},"Начать игру"),(0,r.bF)(t,{to:"/leaderboard"},{default:(0,r.k6)((()=>a[3]||(a[3]=[(0,r.eW)("Таблица лидеров")]))),_:1})])}}};const p=(0,s.A)(b,[["__scopeId","data-v-eb08e63e"]]);var g=p,k=(t(8111),t(2489),t(33)),M=t(953);const y={class:"leaderboard-container"},C={class:"difficulty-tabs"},S=["onClick"],L={key:0};var w={__name:"GameLeaderboard",setup(e){const a=f(),t=(0,M.KR)("easy"),n=(0,r.EW)((()=>a.leaderboard.filter((e=>e.difficulty===t.value)).slice(0,10))),l=e=>{const a={easy:"Простой",medium:"Средний",hard:"Сложный"};return a[e]||e},o=e=>{const a=Math.floor(e/60),t=e%60;return`${a.toString().padStart(2,"0")}:${t.toString().padStart(2,"0")}`};return(e,a)=>{const i=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",y,[a[3]||(a[3]=(0,r.Lk)("h1",null,"Таблица лидеров",-1)),(0,r.Lk)("div",C,[((0,r.uX)(),(0,r.CE)(r.FK,null,(0,r.pI)(["easy","medium","hard"],(e=>(0,r.Lk)("button",{key:e,onClick:a=>t.value=e,class:(0,k.C4)({active:t.value===e})},(0,k.v_)(l(e)),11,S))),64))]),(0,r.Lk)("table",null,[a[1]||(a[1]=(0,r.Lk)("thead",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("th",null,"Место"),(0,r.Lk)("th",null,"Имя"),(0,r.Lk)("th",null,"Время"),(0,r.Lk)("th",null,"Дата")])],-1)),(0,r.Lk)("tbody",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(n.value,((e,a)=>((0,r.uX)(),(0,r.CE)("tr",{key:a},[(0,r.Lk)("td",null,(0,k.v_)(a+1),1),(0,r.Lk)("td",null,(0,k.v_)(e.name),1),(0,r.Lk)("td",null,(0,k.v_)(o(e.time)),1),(0,r.Lk)("td",null,(0,k.v_)(e.date),1)])))),128)),0===n.value.length?((0,r.uX)(),(0,r.CE)("tr",L,a[0]||(a[0]=[(0,r.Lk)("td",{colspan:"4"},"Нет записей",-1)]))):(0,r.Q3)("",!0)])]),(0,r.bF)(i,{to:"/"},{default:(0,r.k6)((()=>a[2]||(a[2]=[(0,r.eW)("Вернуться к настройкам")]))),_:1})])}}};const R=(0,s.A)(w,[["__scopeId","data-v-2587b486"]]);var _=R;t(1701);const E={class:"timer"};function x(e,a,t,n,l,o){return(0,r.uX)(),(0,r.CE)("div",E,(0,k.v_)(n.formattedTime),1)}var z={props:{isRunning:Boolean},emits:["time-update"],setup(e,{emit:a}){const t=(0,M.KR)(0);let n=null;const l=(0,r.EW)((()=>{const e=Math.floor(t.value/60),a=t.value%60;return`${e.toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}`}));return(0,r.wB)((()=>e.isRunning),(e=>{e?n=setInterval((()=>{t.value++,a("time-update",t.value)}),1e3):clearInterval(n)})),(0,r.hi)((()=>{clearInterval(n)})),{formattedTime:l}}};const X=(0,s.A)(z,[["render",x],["__scopeId","data-v-4dd2ce80"]]);var j=X;const $={class:"game-container"},I={class:"game-header"},O=["onClick","onContextmenu","onMouseup"],K={key:1},F={key:2},A={key:3},T={class:"mines-counter"},D={key:0,class:"game-over"};var Q={__name:"GameBoard",setup(e){const a=f(),t=(0,v.rd)(),l=(0,M.KR)([]),o=(0,M.KR)(!1),i=(0,M.KR)(!1),s=(0,M.KR)(!1),u=(0,M.KR)(0),d=(0,M.KR)(0),c=(0,r.EW)((()=>({"grid-template-columns":`repeat(${a.boardSize.cols}, 30px)`,"grid-template-rows":`repeat(${a.boardSize.rows}, 30px)`}))),m=()=>{i.value=!1,s.value=!1,o.value=!1,u.value=a.mines,d.value=0,l.value=Array(a.boardSize.rows).fill().map((()=>Array(a.boardSize.cols).fill().map((()=>({isMine:!1,isRevealed:!1,adjacentMines:0,flag:null})))))},h=(e,t)=>{let n=0;const r=a.boardSize.rows,o=a.boardSize.cols,i=[];for(let a=Math.max(0,e-1);a<=Math.min(r-1,e+1);a++)for(let e=Math.max(0,t-1);e<=Math.min(o-1,t+1);e++)i.push(`${a},${e}`);while(n<a.mines){const e=Math.floor(Math.random()*r),a=Math.floor(Math.random()*o);i.includes(`${e},${a}`)||l.value[e][a].isMine||(l.value[e][a].isMine=!0,n++)}for(let a=0;a<r;a++)for(let e=0;e<o;e++)if(!l.value[a][e].isMine){let t=0;for(let n=Math.max(0,a-1);n<=Math.min(r-1,a+1);n++)for(let a=Math.max(0,e-1);a<=Math.min(o-1,e+1);a++)l.value[n][a].isMine&&t++;l.value[a][e].adjacentMines=t}},b=(e,t)=>{if(i.value||l.value[e][t].isRevealed||"flag"===l.value[e][t].flag)return;if(o.value||(o.value=!0,h(e,t)),l.value[e][t].isMine)return l.value[e][t].isRevealed=!0,S(),i.value=!0,void(o.value=!1);const n=(e,t)=>{if(!(e<0||e>=a.boardSize.rows||t<0||t>=a.boardSize.cols||l.value[e][t].isRevealed||"flag"===l.value[e][t].flag)&&(l.value[e][t].isRevealed=!0,0===l.value[e][t].adjacentMines))for(let l=Math.max(0,e-1);l<=Math.min(a.boardSize.rows-1,e+1);l++)for(let r=Math.max(0,t-1);r<=Math.min(a.boardSize.cols-1,t+1);r++)l===e&&r===t||n(l,r)};n(e,t),C()},p=(e,a)=>{if(i.value||l.value[e][a].isRevealed)return;const t=l.value[e][a];t.flag?"flag"===t.flag?(t.flag="question",u.value++):t.flag=null:(t.flag="flag",u.value--),C()},g=(e,t)=>{if(!l.value[e][t].isRevealed||0===l.value[e][t].adjacentMines)return;const n=l.value[e][t],r=y(e,t);if(r===n.adjacentMines)for(let o=Math.max(0,e-1);o<=Math.min(a.boardSize.rows-1,e+1);o++)for(let n=Math.max(0,t-1);n<=Math.min(a.boardSize.cols-1,t+1);n++)o===e&&n===t||l.value[o][n].flag||b(o,n)},y=(e,t)=>{let n=0;for(let r=Math.max(0,e-1);r<=Math.min(a.boardSize.rows-1,e+1);r++)for(let e=Math.max(0,t-1);e<=Math.min(a.boardSize.cols-1,t+1);e++)"flag"===l.value[r][e].flag&&n++;return n},C=()=>{let e=!0,t=!0;for(let n=0;n<a.boardSize.rows;n++)for(let r=0;r<a.boardSize.cols;r++){const a=l.value[n][r];a.isMine||a.isRevealed||(e=!1),a.isMine&&"flag"!==a.flag&&(t=!1)}(e||t)&&(s.value=!0,i.value=!0,o.value=!1)},S=()=>{for(let e=0;e<a.boardSize.rows;e++)for(let t=0;t<a.boardSize.cols;t++)l.value[e][t].isMine&&(l.value[e][t].isRevealed=!0)},L=e=>{d.value=e},w=()=>{m()},R=()=>{const e=prompt("Введите ваше имя для таблицы лидеров:");e&&(a.addToLeaderboard({name:e,time:d.value,difficulty:a.difficulty,date:(new Date).toLocaleDateString()}),t.push("/leaderboard"))};return(0,r.sV)((()=>{m()})),(e,a)=>{const t=(0,r.g2)("router-link");return(0,r.uX)(),(0,r.CE)("div",$,[(0,r.Lk)("div",I,[(0,r.Lk)("button",{class:"restart-btn",onClick:w},"↻"),(0,r.bF)(j,{isRunning:o.value,onTimeUpdate:L},null,8,["isRunning"]),(0,r.bF)(t,{to:"/"},{default:(0,r.k6)((()=>a[0]||(a[0]=[(0,r.eW)("Настройки")]))),_:1})]),(0,r.Lk)("div",{class:"board",style:(0,k.Tr)(c.value)},[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(l.value,((e,a)=>((0,r.uX)(),(0,r.CE)("div",{key:a,class:"row"},[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(e,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{key:t,class:(0,k.C4)(["cell",[e.isRevealed?"revealed":"hidden",e.isMine&&e.isRevealed?"mine":"","flag"===e.flag?"flagged":"","question"===e.flag?"question":""]]),onClick:(0,n.D$)((e=>b(a,t)),["left"]),onContextmenu:(0,n.D$)((e=>p(a,t)),["right","prevent"]),onMouseup:(0,n.D$)((e=>g(a,t)),["middle"])},[e.isRevealed&&e.adjacentMines>0&&!e.isMine?((0,r.uX)(),(0,r.CE)("span",{key:0,class:(0,k.C4)(`number-${e.adjacentMines}`)},(0,k.v_)(e.adjacentMines),3)):(0,r.Q3)("",!0),e.isMine&&e.isRevealed?((0,r.uX)(),(0,r.CE)("span",K,"💣")):(0,r.Q3)("",!0),"flag"!==e.flag||e.isRevealed?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("span",F,"🚩")),"question"!==e.flag||e.isRevealed?(0,r.Q3)("",!0):((0,r.uX)(),(0,r.CE)("span",A,"?"))],42,O)))),128))])))),128))],4),(0,r.Lk)("div",T,(0,k.v_)(u.value),1),i.value?((0,r.uX)(),(0,r.CE)("div",D,[(0,r.Lk)("h2",null,(0,k.v_)(s.value?"Победа!":"Поражение!"),1),(0,r.Lk)("button",{onClick:w},"Играть снова"),(0,r.bF)(t,{to:"/"},{default:(0,r.k6)((()=>a[1]||(a[1]=[(0,r.eW)("Настройки")]))),_:1}),s.value?((0,r.uX)(),(0,r.CE)("button",{key:0,onClick:R},"Сохранить результат")):(0,r.Q3)("",!0)])):(0,r.Q3)("",!0)])}}};const W=(0,s.A)(Q,[["__scopeId","data-v-b18f3bc2"]]);var q=W;const B=[{path:"/",component:g},{path:"/game",component:q},{path:"/leaderboard",component:_}],G=(0,v.aE)({history:(0,v.LA)(),routes:B});var J=G;const N=(0,n.Ef)(c);N.use((0,l.Ey)()),N.use(J),N.mount("#app")}},a={};function t(n){var l=a[n];if(void 0!==l)return l.exports;var r=a[n]={exports:{}};return e[n].call(r.exports,r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(a,n,l,r){if(!n){var o=1/0;for(d=0;d<e.length;d++){n=e[d][0],l=e[d][1],r=e[d][2];for(var i=!0,s=0;s<n.length;s++)(!1&r||o>=r)&&Object.keys(t.O).every((function(e){return t.O[e](n[s])}))?n.splice(s--,1):(i=!1,r<o&&(o=r));if(i){e.splice(d--,1);var u=l();void 0!==u&&(a=u)}}return a}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[n,l,r]}}(),function(){t.d=function(e,a){for(var n in a)t.o(a,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:a[n]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){var e={524:0};t.O.j=function(a){return 0===e[a]};var a=function(a,n){var l,r,o=n[0],i=n[1],s=n[2],u=0;if(o.some((function(a){return 0!==e[a]}))){for(l in i)t.o(i,l)&&(t.m[l]=i[l]);if(s)var d=s(t)}for(a&&a(n);u<o.length;u++)r=o[u],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(d)},n=self["webpackChunkminesweeper"]=self["webpackChunkminesweeper"]||[];n.forEach(a.bind(null,0)),n.push=a.bind(null,n.push.bind(n))}();var n=t.O(void 0,[504],(function(){return t(25)}));n=t.O(n)})();
//# sourceMappingURL=app.223e0140.js.map