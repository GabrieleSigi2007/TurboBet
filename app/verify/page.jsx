"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Verify(){

const router=
useRouter();

const [code,setCode]=
useState("");

const verify=
async()=>{

const response=

await fetch(
"/api/verify",
{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify({

code

})

}

);

const data=
await response.json();

if(data.success){

localStorage.setItem(

"user",

JSON.stringify(
data.user
)

);

router.push(
"/home"
);

}
else{

alert(
"Codice errato"
);

}

};

return(

<div className="
min-h-screen
bg-slate-900
flex
justify-center
items-center
text-white
">

<div className="
bg-slate-800
p-10
rounded-3xl
w-[500px]
">

<h1 className="
text-4xl
mb-8
font-bold
text-center
">

2FA

</h1>

<input

placeholder="
Codice"

onChange={

e=>setCode(
e.target.value
)

}

className="
w-full
p-4
bg-slate-700
rounded-xl
mb-6
"

/>

<button

onClick={verify}

className="
w-full
bg-green-500
p-4
rounded-xl
text-xl
"

>

VERIFICA

</button>

</div>

</div>

);

}