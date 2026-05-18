"use client";

import { useEffect,useState } from "react";
import Link from "next/link";

export default function SlotPage(){

const [user,setUser]=useState(null);

const [bet,setBet]=useState("");

const [slots,setSlots]=
useState(["🎰","🎰","🎰"]);

const [message,setMessage]=
useState("");

const [spinning,setSpinning]=
useState(false);

const symbols=[

"🍒",
"🍋",
"🍉",
"💎",
"⭐",
"🔔",
"7️⃣"

];

useEffect(()=>{

const data=
localStorage.getItem(
"user"
);

if(data){

setUser(
JSON.parse(data)
);

}

},[]);

const updateBalance=
async(amount)=>{

const updatedUser={

...user,

balance:
Number(user.balance)
+amount

};

setUser(
updatedUser
);

localStorage.setItem(

"user",

JSON.stringify(
updatedUser
)

);

await fetch(

"/api/updateBalance",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify({

id:user.id,

balance:
updatedUser.balance

})

}

);

};

const spin=()=>{

if(spinning)return;

if(!bet||bet<=0){

alert(
"Inserisci puntata"
);

return;

}

if(
Number(bet)>
Number(
user.balance
)
){

alert(
"Saldo insufficiente"
);

return;

}

setSpinning(true);

setMessage("");

let counter=0;

const animation=

setInterval(()=>{

setSlots([

symbols[
Math.floor(
Math.random()*
symbols.length
)],

symbols[
Math.floor(
Math.random()*
symbols.length
)],

symbols[
Math.floor(
Math.random()*
symbols.length
)]

]);

counter++;

if(
counter>=18
){

clearInterval(
animation
);

finishSpin();

}

},100);

};

const finishSpin=
async()=>{

const result=[

symbols[
Math.floor(
Math.random()*
symbols.length
)],

symbols[
Math.floor(
Math.random()*
symbols.length
)],

symbols[
Math.floor(
Math.random()*
symbols.length
)]

];

setSlots(
result
);

let win=0;

if(
result[0]===
result[1]
&&
result[1]===
result[2]
){

if(
result[0]==="7️⃣"
){

win=
Number(bet)*10;

setMessage(
"MEGA JACKPOT"
);

}

else{

win=
Number(bet)*5;

setMessage(
"TRIS"
);

}

}

else if(

result[0]===
result[1]

||

result[1]===
result[2]

||

result[0]===
result[2]

){

win=
Number(bet)*2;

setMessage(
"COPPIA"
);

}

else{

await updateBalance(
-Number(bet)
);

setMessage(
"RITENTA"
);

}

if(win>0){

await updateBalance(
win
);

}

setSpinning(false);

};

const reset=()=>{

setSlots([
"🎰",
"🎰",
"🎰"
]);

setBet("");

setMessage("");

};

return(

<div className="
min-h-screen
bg-gradient-to-b
from-slate-950
to-purple-950
text-white
p-10
">

<div className="
flex
justify-between
items-center
mb-10
">

<h1 className="
text-6xl
font-bold
text-pink-500
">

SLOT MACHINE

</h1>

<Link href="/home">

<button className="
bg-green-500
px-6
py-4
rounded-2xl
text-2xl
font-bold
">

HOME

</button>

</Link>

</div>

<div className="
max-w-[1200px]
mx-auto
grid
grid-cols-2
gap-10
">

<div className="
bg-slate-900
p-10
rounded-3xl
">

{user&&

<div className="
bg-slate-800
p-5
rounded-2xl
mb-8
">

<h2 className="
text-2xl
font-bold
">

{user.username}

</h2>

<p className="
text-green-400
text-2xl
">

Saldo:
{user.balance}€

</p>

</div>

}

<div className="
flex
justify-center
gap-6
mb-10
">

{slots.map(
(symbol,index)=>

<div
key={index}
className={`
w-[120px]
h-[120px]
bg-white
text-black
rounded-3xl
flex
items-center
justify-center
text-6xl
shadow-xl

${spinning
?
"animate-pulse"
:
""
}

`}
>

{symbol}

</div>

)}

</div>

<input
type="number"
placeholder="Puntata"
value={bet}
onChange={
e=>setBet(
e.target.value
)}
className="
w-full
p-5
rounded-xl
bg-slate-700
mb-6
text-2xl
"
/>

<button
onClick={spin}

disabled={
spinning
}

className="
w-full
bg-pink-500
hover:bg-pink-600
p-5
rounded-xl
text-3xl
font-bold
">

{spinning
?
"GIRA..."
:
"SPIN"
}

</button>

{message&&

<div className="
space-y-4
mt-8
">

<div className="
bg-slate-800
p-6
rounded-2xl
text-center
text-3xl
font-bold
">

{message}

</div>

<button
onClick={reset}
className="
w-full
bg-blue-500
p-4
rounded-xl
text-2xl
font-bold
">

GIOCA ANCORA

</button>

</div>

}

</div>

<div className="
bg-slate-900
p-8
rounded-3xl
">

<h2 className="
text-4xl
font-bold
text-yellow-400
mb-8
">

Regole

</h2>

<p>
• Coppia = x2
</p>

<p>
• Tris = x5
</p>

<p>
• Tre 7️⃣ = x10
</p>

<p>
• Saldo salvato nel database
</p>

<p>
• Ogni giro è casuale
</p>

</div>

</div>

</div>

);

}