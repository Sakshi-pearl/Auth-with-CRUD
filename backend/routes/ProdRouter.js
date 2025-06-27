import express from "express";
import { ensureAuth } from "../models/Auth.js";

const router = express.Router();

router.get("/", ensureAuth, (_req, res) => {
  res.status(200).json([{ name: "Prod1" }, { name: "pro2" }]);
});

export default router;
