import db from "@/lib/mysql";

export async function POST(req){

const body=
await req.json();

await db.execute(

`UPDATE users

SET balance=?

WHERE id=?`,

[
body.balance,
body.id
]

);

return Response.json({

success:true

});

}