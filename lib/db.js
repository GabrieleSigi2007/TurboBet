import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDB() {

  return open({
    filename: "./turbobet.db",
    driver: sqlite3.Database,
  });
}

export async function createTable() {

  const db = await openDB();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      balance INTEGER DEFAULT 100
    )
  `);
}