const jobsRouters = require("express").Router({ mergeParams: true });


const jobsController = require("../controllers/jobsController");


jobsRouters.post("/", jobsController.createJobController);

jobsRouters.put("/:id", jobsController.updateJobController);

jobsRouters.delete("/:id", jobsController.deleteJobController);

jobsRouters.patch("/:id/status", jobsController.updateJobStatusController);

// קבלת רשימת כל המשרות של המגייס (כולל סגורות ופתוחות)
jobsRouters.get("/my", jobsController.getMyJobsController);

// קבלת רשימת המשרות הפעילות בלבד (פתוחות לגיוס)
jobsRouters.get("/active", jobsController.getActiveJobsController);

// קבלת רשימת מועמדים למשרה מסוימת
jobsRouters.get("/:id/candidates", jobsController.getJobCandidatesController);



module.exports=jobsRouters