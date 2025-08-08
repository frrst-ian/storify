#! /usr/bin/env node
require('dotenv').config();
const { Client } = require("pg");

const SQL = `
YOUR QUERY!
`;

async function main() {
  console.log("Seeding database...");
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await client.end();
    console.log("Done!");
  }
}

main();