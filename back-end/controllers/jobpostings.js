const JobPostingsDB=require("../models").JobPostings;
const controller={
    addJob: async(req,res)=>{
        try {
            let reqBody = req.body;
            if (
              reqBody.descriere &&
              reqBody.deadline
            ) {
                let job = await JobPostingsDB.create(req.body);
                res
                  .status(201)
                  .send({ message: "Job added successfully" });
              }
          } catch (err) {
            res.status(500).send({ message: `${err}` });
          }
    },

    getJobs: async(req,res)=>{
        try {
            const jobs = await JobPostingsDB.findAll();
            if (jobs) {
                return res.status(200).send(jobs);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getJobById: async(req,res) =>{
        try {
            const job = await JobPostingsDB.findOne({where:{Jobid:req.params.ID}});
            if (job) {
                return res.status(200).send(job);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    modifyJob: async(req,res)=>{
        try {
            const job = await JobPostingsDB.findOne({where:{Jobid:req.params.ID}});
            if (job) {
                const timeElapsed = Date.now();
                const today= new Date(timeElapsed);
                const deadlineString= new Date(req.body.deadline);
                if(deadlineString.getTime()>today.getTime()&&req.body.descriere.length>3){
                    job.update({deadline:req.body.deadline});
                    job.update({descriere:req.body.descriere});
                    return res.status(200).send({ message:"Job modificat"})
                }
                else{
                    return res.status(404).send({message:"Date invalide"})
                }
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    deleteJob: async(req,res)=>{
        try {
            if (req.params.ID>0) {
              const job = await JobPostingsDB.findOne({where:{Jobid:req.params.ID}});
              if (job == null) {
                res.status(404).send({ message: "Job not found" });
              }else {
              JobPostingsDB.destroy({where:{Jobid: req.params.ID}});
              res.status(201).send({message: "Job deleted"});
            }
          } 
        }catch (err) {
            res.status(500).send({ message: `${err}` });
          }
    },

    getJobFiltered: async(req,res)=>{
        try {
            const timeElapsed = Date.now();
            const today= new Date(timeElapsed);
            if(today.getDate()<26) today.setDate(today.getDate()+5);
            else{
                today.setDate(today.getDate()+5-31)
                if(today.getMonth()!=11)today.setMonth(today.getMonth()+2);
                else{
                    today.setMonth(1);
                    today.setFullYear(today.getFullYear()+1);
                }

            }
            const jobs = await JobPostingsDB.findAll({where:{deadline:today,Jobid:req.params.ID}});
            if (jobs) {
                return res.status(200).send(jobs);
            } else {
                return res.status(404).send({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    
}

module.exports=controller;