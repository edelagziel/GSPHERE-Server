const projectRouters = require("express").Router({ mergeParams: true });
const ProjectController = require("../../controllers/projectController/projectController");

projectRouters.get("/mine", ProjectController.getMyProjects); 
projectRouters.get("/", ProjectController.getAllProjects);
projectRouters.get("/:id", ProjectController.getProjectById);
projectRouters.post("/", ProjectController.addNewProject);
projectRouters.put("/:id", ProjectController.modifyProject);
projectRouters.delete("/:id", ProjectController.deleteProject);


projectRouters.use("/:projectId/members", require("./projectMembers"));


module.exports = projectRouters;
