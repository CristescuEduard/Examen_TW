const express = require("express");
const router = express.Router();
const jobpostings=require("./jobpostings");
const candidates= require("./candidates")
router.use("/",jobpostings,candidates);
module.exports=router;