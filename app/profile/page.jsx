"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {

  const router = useRouter();

  const [user, setUser] = useState(null);

  const [amount, setAmount] = useState("");

  useEffect(() => {

    const data =
      localStorage.getItem("user");

    if(data){

      setUser(
        JSON.parse(data)
      );

    }
    else{

      router.push("/login");

    }

  }, []);

  const recharge=()=>{

    if(!amount || amount<=0){

      alert(
      "Inserisci un importo valido"
      );

      return;
    }

    const updatedUser={

      ...user,

      balance:
      Number(user.balance)
      +
      Number(amount)

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

    setAmount("");

    alert(
      "Ricarica effettuata"
    );

  };

  const logout=()=>{

    localStorage.removeItem(
      "user"
    );

    router.push(
      "/login"
    );

  };

  return (

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
text-5xl
font-bold
text-green-500
">

PROFILO

</h1>

<div className="
flex
gap-4
">

<Link href="/home">

<button className="
bg-blue-500
hover:bg-blue-600
px-6
py-4
rounded-2xl
text-xl
font-bold
">

HOME

</button>

</Link>

<button
onClick={logout}
className="
bg-red-500
hover:bg-red-600
px-6
py-4
rounded-2xl
text-xl
font-bold
"
>

ESCI

</button>

</div>

</div>

<div className="
max-w-[900px]
mx-auto
bg-slate-800
rounded-3xl
p-10
shadow-2xl
">

{user && (

<>

<div className="
bg-slate-700
rounded-2xl
p-6
mb-8
">

<h2 className="
text-3xl
font-bold
mb-4
">

👤 {user.username}

</h2>

<p className="
text-3xl
text-green-400
font-bold
">

Saldo:
{user.balance}€

</p>

</div>

<div className="
bg-slate-700
rounded-2xl
p-6
mb-8
">

<h2 className="
text-2xl
font-bold
mb-4
">

💳 Ricarica saldo

</h2>

<input
type="number"
placeholder="
Importo"
value={amount}
onChange={
e=>setAmount(
e.target.value
)}
className="
w-full
bg-slate-600
p-4
rounded-xl
text-xl
mb-4
"
/>

<button
onClick={recharge}
className="
w-full
bg-green-500
hover:bg-green-600
p-4
rounded-xl
text-xl
font-bold
"
>

RICARICA

</button>

</div>

<div className="
bg-slate-700
rounded-2xl
p-6
">

<h2 className="
text-2xl
font-bold
mb-4
">

📊 Informazioni account

</h2>

<p className="
text-xl
mb-2
">

Username:
{user.username}

</p>

<p className="
text-xl
">

Stato:
Online

</p>

</div>

</>

)}

</div>

</div>

  );

}