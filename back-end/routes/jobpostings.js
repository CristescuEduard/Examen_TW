const express = require("express");
const router = express.Router();
const jobpostingsController=require("../controllers").jobpostings;
router.post('/addJob',jobpostingsController.addJob);

router.get('/getJobs',jobpostingsController.getJobs);
router.get('/getJob/:ID',jobpostingsController.getJobById);
router.get('/getJobFiltered/:ID', jobpostingsController.getJobFiltered);

router.put('/modifyJob/:ID',jobpostingsController.modifyJob);

router.delete('/deleteJob/:ID',jobpostingsController.deleteJob);

module.exports=router;