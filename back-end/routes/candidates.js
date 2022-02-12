const express = require("express");
const router = express.Router();
const candidatesController=require("../controllers").candidates;

router.post('/addCandidate/:JobID', candidatesController.addCandidate);

router.get('/getCandidatesForJob/:JobID', candidatesController.getCandidatesForJob)
router.get('/getCandidateForJobById/:JobID/:CandidateID', candidatesController.getCandidateForJobById)

router.put('/modifyCandidate/:JobID/:CandidateID', candidatesController.modifyCandidate);

router.delete('/deleteCandidate/:JobID/:CandidateID', candidatesController.deleteCandidate);
module.exports=router;