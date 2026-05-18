"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

  const router = useRouter();

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");

  const register=async()=>{

    try{

      const response=
      await fetch(
      "/api/register",
      {

      method:"POST",

      headers:{

      "Content-Type":
      "application/json"

      },

      body:JSON.stringify({

      username,
      password,
      email

      })

      });

      const data=
      await response.json();

      if(data.success){

        alert(
        "Registrazione completata"
        );

      }

      else{

        alert(
        data.message
        ||
        "Errore"
        );

      }

    }

    catch{

      alert(
      "Errore registrazione"
      );

    }

  };

  const login=async()=>{

    try{

      const response=
      await fetch(
      "/api/login",
      {

      method:"POST",

      headers:{

      "Content-Type":
      "application/json"

      },

      body:JSON.stringify({

      username,
      password

      })

      });

      const data=
      await response.json();

      console.log(data);

      if(data.twoFactor){

        localStorage.setItem(

        "pendingUser",

        data.userId

        );

        router.push(
        "/verify"
        );

      }

      else{

        alert(

        data.message ||

        "Username o password errati"

        );

      }

    }

    catch(error){

      console.log(error);

      alert(
      "Errore login"
      );

    }

  };

  return(

<div className="
min-h-screen
flex
items-center
justify-center
bg-slate-900
">

<div className="
w-[500px]
bg-slate-800
p-10
rounded-3xl
shadow-2xl
">

<h1 className="
text-5xl
font-bold
text-green-500
text-center
mb-10
">

TurboBet

</h1>

<input
type="text"
placeholder="Username"
className="
w-full
p-4
rounded-xl
mb-5
bg-slate-700
text-white
"
onChange={
e=>
setUsername(
e.target.value
)}
/>

<input
type="email"
placeholder="Email (solo registrazione)"
className="
w-full
p-4
rounded-xl
mb-5
bg-slate-700
text-white
"
onChange={
e=>
setEmail(
e.target.value
)}
/>

<input
type="password"
placeholder="Password"
className="
w-full
p-4
rounded-xl
mb-8
bg-slate-700
text-white
"
onChange={
e=>
setPassword(
e.target.value
)}
/>

<div className="
flex
gap-4
">

<button
onClick={login}
className="
flex-1
bg-green-500
hover:bg-green-600
p-4
rounded-xl
text-xl
font-bold
"
>

LOGIN

</button>

<button
onClick={register}
className="
flex-1
bg-blue-500
hover:bg-blue-600
p-4
rounded-xl
text-xl
font-bold
"
>

REGISTER

</button>

</div>

<div className="
mt-8
text-center
text-gray-400
">

2FA attiva via email

</div>

</div>

</div>

  );

}