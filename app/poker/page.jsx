"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PokerPage(){

const [user,setUser]=useState(null);

const [bet,setBet]=useState("");

const [playerCards,setPlayerCards]=
useState([]);

const [dealerCards,setDealerCards]=
useState([]);

const [tableCards,setTableCards]=
useState([]);

const [visibleCards,setVisibleCards]=
useState([]);

const [phase,setPhase]=
useState(0);

const [message,setMessage]=
useState("");

const [gameStarted,setGameStarted]=
useState(false);

const cards=[

"🂡","🂮","🂭","🂫",
"🂱","🂾","🂽","🂻",
"🃁","🃎","🃍","🃋",
"🃑","🃞","🃝","🃛",

"2♠","3♠","4♠","5♠",
"6♠","7♠","8♠","9♠",

"2♥","3♥","4♥","5♥",
"6♥","7♥","8♥","9♥",

"2♦","3♦","4♦","5♦",
"6♦","7♦","8♦","9♦",

"2♣","3♣","4♣","5♣",
"6♣","7♣","8♣","9♣"

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

setUser(updatedUser);

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

const random=()=>{

return cards[
Math.floor(
Math.random()*
cards.length
)
];

};

const startGame=()=>{

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

setPlayerCards([

random(),
random()

]);

setDealerCards([

random(),
random()

]);

const table=[

random(),
random(),
random(),
random(),
random()

];

setTableCards(
table
);

setVisibleCards([]);

setPhase(0);

setGameStarted(
true
);

setMessage("");

};

const nextBet=
async()=>{

if(
phase===0
){

setVisibleCards(
tableCards.slice(
0,3
)
);

setPhase(1);

}

else if(
phase===1
){

setVisibleCards(
tableCards.slice(
0,4
)
);

setPhase(2);

}

else if(
phase===2
){

setVisibleCards(
tableCards
);

setPhase(3);

}

else{

const player=

Math.floor(
Math.random()*100
);

const dealer=

Math.floor(
Math.random()*100
);

if(
player>
dealer
){

setMessage(
"Hai vinto"
);

await updateBalance(
Number(bet)
);

}

else{

setMessage(
"Hai perso"
);

await updateBalance(
-Number(bet)
);

}

}

};

const fold=
async()=>{

setMessage(
"Hai lasciato"
);

await updateBalance(
-Number(bet)
);

};

const reset=()=>{

setPlayerCards([]);

setDealerCards([]);

setVisibleCards([]);

setPhase(0);

setBet("");

setMessage("");

setGameStarted(
false
);

};

return(

<div className="
min-h-screen
bg-green-900
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
">

TEXAS HOLD'EM

</h1>

<Link href="/home">

<button className="
bg-blue-500
px-6
py-4
rounded-2xl
text-2xl
">

HOME

</button>

</Link>

</div>

<div className="
grid
grid-cols-2
gap-10
">

<div className="
bg-slate-900
p-8
rounded-3xl
">

{user&&

<div className="
bg-slate-800
p-5
rounded-2xl
mb-6
">

<h2>
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

<h2 className="
text-2xl
mb-3
">

Le tue carte

</h2>

<div className="
flex
gap-4
mb-8
">

{playerCards.map(
(c,i)=>

<div
key={i}
className="
bg-white
text-black
w-[90px]
h-[130px]
rounded-2xl
flex
justify-center
items-center
text-5xl
"
>

{c}

</div>

)}

</div>

<h2 className="
text-2xl
mb-3
">

Tavolo

</h2>

<div className="
flex
gap-4
mb-8
">

{visibleCards.map(
(c,i)=>

<div
key={i}
className="
bg-yellow-200
text-black
w-[90px]
h-[130px]
rounded-2xl
flex
justify-center
items-center
text-5xl
"
>

{c}

</div>

)}

</div>

{!gameStarted&&

<div>

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
p-4
bg-slate-700
rounded-xl
mb-4
"
/>

<button
onClick={startGame}
className="
w-full
bg-green-500
p-4
rounded-xl
text-2xl
"
>

INIZIA

</button>

</div>

}

{gameStarted
&&
message===""

&&

<div className="
flex
gap-4
">

<button
onClick={nextBet}
className="
flex-1
bg-green-500
p-4
rounded-xl
text-2xl
">

BET

</button>

<button
onClick={fold}
className="
flex-1
bg-red-500
p-4
rounded-xl
text-2xl
">

LASCIA

</button>

</div>

}

{message&&

<div className="
mt-8
space-y-4
">

<div className="
bg-slate-700
p-5
rounded-2xl
text-center
text-3xl
">

{message}

</div>

<button
onClick={reset}
className="
w-full
bg-yellow-500
p-4
rounded-xl
text-2xl
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
text-yellow-400
mb-6
">

Regole

</h2>

<p>• Ricevi 2 carte</p>

<p>• BET → prosegui</p>

<p>• Flop: 3 carte</p>

<p>• Turn: +1 carta</p>

<p>• River: +1 carta</p>

<p>• LASCIA = perdi</p>

<p>• Ultimo confronto casuale</p>

</div>

</div>

</div>

);

}