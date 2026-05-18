"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlackjackPage() {

  const [user,setUser]=useState(null);

  const [playerCards,setPlayerCards]=useState([]);
  const [dealerCards,setDealerCards]=useState([]);

  const [playerTotal,setPlayerTotal]=useState(0);
  const [dealerTotal,setDealerTotal]=useState(0);

  const [bet,setBet]=useState("");

  const [message,setMessage]=useState("");

  const [gameStarted,setGameStarted]=useState(false);

  const [revealDealer,setRevealDealer]=
  useState(false);

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

  const randomCard=()=>{

    const cards=[

    1,2,3,4,5,
    6,7,8,9,
    10,10,10,10

    ];

    return cards[

    Math.floor(
    Math.random()*
    cards.length
    )

    ];

  };

  const calculateTotal=
  (cards)=>{

    let total=

    cards.reduce(
    (a,b)=>a+b,
    0
    );

    let aces=

    cards.filter(
    c=>c===1
    ).length;

    while(
    aces>0
    ){

    if(
    total+10<=21
    ){

      total+=10;

    }

    aces--;

    }

    return total;

  };

  const startGame=()=>{

    if(
    !bet
    ||
    bet<=0
    ){

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

    const player=[

      randomCard(),
      randomCard()

    ];

    const dealer=[

      randomCard(),
      randomCard()

    ];

    setPlayerCards(
    player
    );

    setDealerCards(
    dealer
    );

    setPlayerTotal(
    calculateTotal(
    player
    )
    );

    setDealerTotal(
    calculateTotal(
    dealer
    )
    );

    setRevealDealer(
    false
    );

    setGameStarted(
    true
    );

    setMessage("");

  };

  const hit=
  async()=>{

    const newCards=[

    ...playerCards,

    randomCard()

    ];

    const total=

    calculateTotal(
    newCards
    );

    setPlayerCards(
    newCards
    );

    setPlayerTotal(
    total
    );

    if(
    total>21
    ){

      setRevealDealer(
      true
      );

      setMessage(
      "Hai sballato"
      );

      await updateBalance(
      -Number(bet)
      );

    }

  };

  const stand=
  async()=>{

    setRevealDealer(
    true
    );

    let dealer=[
    ...dealerCards
    ];

    let total=

    calculateTotal(
    dealer
    );

    while(
    total<17
    ){

      dealer.push(
      randomCard()
      );

      total=
      calculateTotal(
      dealer
      );

    }

    setDealerCards(
    dealer
    );

    setDealerTotal(
    total
    );

    if(
    total>21
    ){

      setMessage(
      "Banco sballa"
      );

      await updateBalance(
      Number(bet)
      );

    }

    else if(
    playerTotal>
    total
    ){

      setMessage(
      "Hai vinto"
      );

      await updateBalance(
      Number(bet)
      );

    }

    else if(
    playerTotal<
    total
    ){

      setMessage(
      "Hai perso"
      );

      await updateBalance(
      -Number(bet)
      );

    }

    else{

      setMessage(
      "Pareggio"
      );

    }

  };

  const reset=()=>{

    setPlayerCards([]);

    setDealerCards([]);

    setPlayerTotal(0);

    setDealerTotal(0);

    setMessage("");

    setBet("");

    setGameStarted(
    false
    );

    setRevealDealer(
    false
    );

  };

  return(

<div className="
min-h-screen
bg-slate-900
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
text-purple-500
">

BLACKJACK

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
bg-slate-800
p-8
rounded-3xl
">

{user&&

<div className="
bg-slate-700
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
mb-10
">

<h2 className="
text-3xl
mb-4
">

Le tue carte

</h2>

<div className="
flex
gap-4
mb-4
">

{playerCards.map(
(card,index)=>

<div
key={index}
className="
w-[80px]
h-[120px]
bg-white
text-black
rounded-2xl
flex
items-center
justify-center
text-4xl
font-bold
"
>

{card}

</div>

)}

</div>

<p>
Totale:
{playerTotal}
</p>

</div>

<div>

<h2 className="
text-3xl
mb-4
">

Banco

</h2>

<div className="
flex
gap-4
mb-4
">

{dealerCards.map(
(card,index)=>{

if(
index===0
&&
!revealDealer
){

return(

<div
key={index}
className="
w-[80px]
h-[120px]
bg-red-500
rounded-2xl
flex
items-center
justify-center
text-4xl
"
>

?

</div>

);

}

return(

<div
key={index}
className="
w-[80px]
h-[120px]
bg-red-500
rounded-2xl
flex
items-center
justify-center
text-4xl
"
>

{card}

</div>

);

})}

</div>

<p>

Totale:

{revealDealer
?dealerTotal
:"?"}

</p>

</div>

{!gameStarted &&

<div className="
space-y-4
mt-8
">

<input
type="number"
value={bet}
placeholder="Puntata"
onChange={
e=>
setBet(
e.target.value
)}
className="
w-full
p-4
bg-slate-700
rounded-xl
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
font-bold
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
mt-8
">

<button
onClick={hit}
className="
flex-1
bg-blue-500
p-4
rounded-xl
text-2xl
font-bold
"
>

HIT

</button>

<button
onClick={stand}
className="
flex-1
bg-red-500
p-4
rounded-xl
text-2xl
font-bold
"
>

STAND

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
font-bold
">

GIOCA ANCORA

</button>

</div>

}

</div>

<div className="
bg-slate-800
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
• Obiettivo: avvicinarsi a 21
</p>

<p>
• Asso = 1 o 11
</p>

<p>
• Figure = 10
</p>

<p>
• HIT = carta
</p>

<p>
• STAND = fermati
</p>

<p>
• Prima carta banco coperta
</p>

</div>

</div>

</div>

);

}