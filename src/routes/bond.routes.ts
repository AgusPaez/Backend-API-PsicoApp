//imports
import { Router } from "express";
import * as bondController from "../controllers/bond.controller";

const router = Router();
//get all bonds
router.get("/", bondController.findAll);
//create bond
router.post("/", bondController.createBond);
//get one bond
router.get("/:id", bondController.getOne);
//delete bond
router.delete("/:id", bondController.destroy);
//edit bond
router.put("/:id", bondController.update);

export default router;
