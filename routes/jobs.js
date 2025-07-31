const jobsRouters = require("express").Router({ mergeParams: true });


const jobsController = require("../controllers/jobsController");


jobsRouters.post("/", jobsController.createJobController);

jobsRouters.put("/:id", jobsController.updateJobController);

jobsRouters.delete("/:id", jobsController.deleteJobController);

jobsRouters.patch("/:id/status", jobsController.updateJobStatusController);

jobsRouters.get("/my", jobsController.getMyJobsController);

jobsRouters.get("/active", jobsController.getActiveJobsController);

jobsRouters.get("/:id/candidates", jobsController.getJobCandidatesController);



module.exports=jobsRouters