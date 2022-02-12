const CandidatesDB = require("../models").Candidates;
const controller = {
    addCandidate: async (req, res) => {
        try {
            let reqBody = req.body;
            if (reqBody.nume && reqBody.cv && reqBody.email) {
                reqBody.Jobid = req.params.JobID;
                let candidate = await CandidatesDB.create(reqBody);
                res.status(201).send({
                    message: "Candidate added successfully",
                });
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },

    getCandidatesForJob: async (req, res) => {
        try {
            const candidates = await CandidatesDB.findAll({
                where: { Jobid: req.params.JobID },
            });
            if (candidates) {
                return res.status(200).send(candidates);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    getCandidateForJobById: async (req, res) => {
        try {
            const candidate = await CandidatesDB.findOne({
                where: {
                    Jobid: req.params.JobID,
                    Candidateid: req.params.CandidateID,
                },
            });
            if (candidate) {
                return res.status(200).send(candidate);
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    modifyCandidate: async (req, res) => {
        try {
            const candidat = await CandidatesDB.findOne({
                where: {
                    Jobid: req.params.JobID,
                    Candidateid: req.params.CandidateID,
                },
            });
            if (candidat) {
                const verificare =
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (
                    req.body.nume.length >= 5 &&
                    req.body.cv.length >= 100 &&
                    verificare.test(String(req.body.email).toLowerCase())
                ) {
                    candidat.update({
                        nume: req.body.nume,
                        cv: req.body.cv,
                        email: req.body.email,
                    });
                    return res
                        .status(200)
                        .send({ message: "Candidat modificat" });
                } else {
                    return res
                        .status(404)
                        .send({ message: "Candidat invalid" });
                }
            } else {
                return res.status(404).send({ message: "Not found" });
            }
        } catch (err) {
            return res.status(500).send(err);
        }
    },

    deleteCandidate: async (req, res) => {
        try {
            if (req.params.JobID > 0 && req.params.CandidateID > 0) {
                const candidat = await CandidatesDB.findOne({
                    where: {
                        Jobid: req.params.JobID,
                        Candidateid: req.params.CandidateID,
                    },
                });
                if (candidat == null) {
                    res.status(404).send({ message: "Candidat not found" });
                } else {
                    CandidatesDB.destroy({
                        where: {
                            Jobid: req.params.JobID,
                            Candidateid: req.params.CandidateID,
                        },
                    });
                    res.status(201).send({ message: "Candidate deleted" });
                }
            }
        } catch (err) {
            res.status(500).send({ message: `${err}` });
        }
    },
};

module.exports = controller;
