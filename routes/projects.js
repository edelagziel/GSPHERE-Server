const projectRouters = require("express").Router();
const ProjectController=require("../controllers/projectController");



projectRouters.get("/", ProjectController.addnewProject);
projectRouters.get("/:id",ProjectController.addnewProject);
projectRouters.post("/", ProjectController.addnewProject);
projectRouters.put("/:id", ProjectController.addnewProject);
projectRouters.delete("/:id", ProjectController.addnewProject);
