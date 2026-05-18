"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function VirtualPage(){

const [user,setUser]=useState(null);

const [bet,setBet]=useState("");

const [selectedHorse,setSelectedHorse]=
useState(null);

const [message,setMessage]=
useState("");

const [running,setRunning]=
useState(false);

const finish=100;

const horsesInitial=[

{
id:1,
name:"🐎 Thunder",
quote:2,
pos:0
},

{
id:2,
name:"🏇 Flash",
quote:3,
pos:0
},

{
id:3,
name:"🐴 Storm",
quote:4,
pos:0
},

{
id:4,
name:"⚡ Rocket",
quote:5,
pos:0
}

];

const [horses,setHorses]=
useState(horsesInitial);

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

const startRace=
async()=>{

if(!selectedHorse){

alert(
"Scegli un cavallo"
);

return;

}

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

setRunning(true);

setMessage("");

setHorses(
horsesInitial
);

const race=

setInterval(()=>{

setHorses(
prev=>{

const updated=

prev.map(
h=>({

...h,

pos:
h.pos+
Math.random()*8

})
);

const winner=

updated.find(
h=>
h.pos>=finish
);

if(winner){

clearInterval(
race
);

finishRace(
winner
);

}

return updated;

});

},200);

};

const finishRace=
async(winner)=>{

setRunning(false);

if(
winner.id===
selectedHorse
){

const horse=

horses.find(
h=>
h.id===
selectedHorse
);

const win=

Number(bet)
*
horse.quote;

setMessage(

"HAI VINTO "
+
win+
"€"

);

await updateBalance(
win
);

}

else{

await updateBalance(
-Number(bet)
);

setMessage(

winner.name+
" ha vinto"

);

}

};

const reset=()=>{

setSelectedHorse(
null
);

setBet("");

setMessage("");

setRunning(false);

setHorses(
horsesInitial
);

};

return(

<div className="
min-h-screen
bg-gradient-to-b
from-green-900
to-slate-950
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
text-yellow-400
">

VIRTUAL HORSE

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
mb-8
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
mb-5
">

Scegli cavallo

</h2>

<div className="
space-y-4
mb-6
">

{horses.map(
horse=>

<button

key={horse.id}

disabled={running}

onClick={()=>

setSelectedHorse(
horse.id
)}

className={`

w-full
p-4
rounded-xl
text-xl

${selectedHorse===
horse.id

?"bg-yellow-500"

:"bg-slate-700"}

`}
>

{horse.name}

Quota x
{horse.quote}

</button>

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
p-4
rounded-xl
bg-slate-700
mb-6
"
/>

<button
disabled={running}
onClick={startRace}
className="
w-full
bg-yellow-500
p-5
rounded-xl
text-3xl
font-bold
">

{running
?"CORSA..."
:"START"
}

</button>

{message&&

<div className="
space-y-4
mt-6
">

<div className="
bg-slate-800
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
bg-blue-500
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
mb-8
">

Pista

</h2>

<div className="
space-y-5
">

{horses.map(
horse=>

<div
key={horse.id}
>

<div className="
flex
justify-between
mb-2
">

<span>
{horse.name}
</span>

<span>

{Math.floor(
horse.pos
)}m

</span>

</div>

<div className="
bg-slate-700
h-[50px]
rounded-full
overflow-hidden
">

<div

style={{

width:
`${horse.pos}%`

}}

className="
h-full
bg-yellow-500
transition-all
duration-200
flex
items-center
justify-end
pr-4
"

>

🐎

</div>

</div>

</div>

)}

</div>

</div>

</div>

</div>

);

}