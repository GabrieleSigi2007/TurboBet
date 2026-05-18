import { NextResponse } from "next/server";
import db from "@/lib/mysql";
import transporter from "@/lib/email";

export async function POST(req){

try{

const body=
await req.json();

const [rows]=

await db.execute(

`SELECT *
FROM users
WHERE username=?
AND password=?`,

[
body.username,
body.password
]

);

if(rows.length===0){

return NextResponse.json({

success:false,

message:
"Credenziali errate"

});

}

const otp=

Math.floor(
100000+
Math.random()*900000
);

console.log(
"OTP:",
otp
);

await db.execute(

`UPDATE users

SET otp_code=?,
otp_expire=?

WHERE id=?`

,

[
String(otp),
Date.now()+300000,
rows[0].id
]

);

try{

await transporter.sendMail({

from:
process.env.EMAIL_USER,

to:
rows[0].email,

subject:
"TurboBet codice 2FA",

text:

`Il tuo codice è:

${otp}

Scade in 5 minuti.`

});

console.log(
"MAIL INVIATA"
);

}

catch{

console.log(
"Email fallita, uso terminale"
);

}

return NextResponse.json({

twoFactor:true,

userId:
rows[0].id,

user:
rows[0]

});

}

catch(error){

return NextResponse.json({

success:false,

message:
error.message

});

}

}