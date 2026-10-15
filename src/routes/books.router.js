import { Router } from "express";
import * as c from "../controllers/books.controller.js";

const router = Router();

router.get("/search", c.search); 
router.get("/:id", c.getOne);   
router.post("/", c.create);

export default router;
