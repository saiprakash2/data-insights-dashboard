import express from "express";
import pkg from "pg";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

// app.get("/analytics/summary", async (req, res) => {
//   try {
//     const result = await pool.query(`SELECT COUNT(*) AS total_records FROM "DataRecords"`);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

app.get("/api/summary", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) AS record_count,
        COALESCE(SUM("Amount"),0) AS total_amount
      FROM "DataRecords"
    `);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`✅ Node Analytics running on port ${process.env.PORT}`);
});
