import { Router } from "express";
import * as c from "../controllers/users.controller.js";

const router = Router();

router.get("/", c.list);
router.get("/:id", c.getOne);
router.post("/", c.create);
router.post("/login", c.login);

export default router;
