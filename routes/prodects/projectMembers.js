const projectMembersRouters = require("express").Router({ mergeParams: true });

const ProjectController =require("../../controllers/projectController/projectMemberController");


projectMembersRouters.get("/", ProjectController.getAllProjectMembersController);
projectMembersRouters.get("/:id", ProjectController.getProjectMemberByIdController);
projectMembersRouters.post("/", ProjectController.addProjectMemberController);
projectMembersRouters.put("/:id", ProjectController.updateProjectMemberRoleController);
projectMembersRouters.delete("/:id", ProjectController.removeProjectMemberController);


module.exports = projectMembersRouters;
