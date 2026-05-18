import { NextResponse } from "next/server";
import db from "@/lib/mysql";

export async function POST(req){

 const body=
 await req.json();

 try{

 await db.execute(

 `INSERT INTO users
 (username,password,email,balance)

 VALUES(?,?,?,?)`,

 [

 body.username,
 body.password,
 body.email,
 100

 ]

 );

 return NextResponse.json({

 success:true

 });

 }

 catch(error){

 return NextResponse.json({

 success:false,

 message:error.message

 });

 }

}