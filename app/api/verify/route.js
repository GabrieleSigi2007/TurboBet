import db from "@/lib/mysql";

export async function POST(req){

const body=
await req.json();

const [rows]=

await db.execute(

`SELECT *

FROM users

WHERE otp_code=?`,

[
body.code
]

);

if(rows.length===0){

return Response.json({

success:false

});

}

if(

Date.now()>

rows[0].otp_expire

){

return Response.json({

success:false

});

}

return Response.json({

success:true,

user:
rows[0]

});

}