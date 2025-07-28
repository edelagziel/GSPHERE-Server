const joubsRouters = require("express").Router({ mergeParams: true });

const joubsController =require("../controllers/joubsController");




// joubsRouters.get("/", joubsController.getAllJoubsInfoController);
// joubsRouters.get("/:id", joubsController.getJoubsInfoByIdController);
// joubsRouters.post("/", joubsController.uploudeNewJoubController);
// joubsRouters.post("/", joubsController.addNewcandiatetojoubsController);
// joubsRouters.put("/:id", joubsController.updatejoubsStatusController);
// joubsRouters.delete("/:id", joubsController.removeJoubsController);




module.exports={joubsRouters}