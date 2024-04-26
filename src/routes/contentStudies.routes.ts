//imports
import { Router } from "express";
import * as contentStudiesController from "../controllers/contentStudies.controller";
const router = Router();

//get all content
router.get("/findAll", contentStudiesController.findAll);
//create content
router.post("/", contentStudiesController.createContentStudies);
//get content by id
router.get("/:id", contentStudiesController.getOne);
//delete one part of content by id
router.delete("/:id", contentStudiesController.destroy);
//update content
router.patch("/:id", contentStudiesController.update);

export default router;
