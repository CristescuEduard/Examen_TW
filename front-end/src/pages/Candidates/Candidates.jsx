import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Candidate from "../../components/Candidate/Candidate";
import "./Candidates.css";

function Candidates() {
    const [candidates, setCandidates] = useState([]);

    const { id } = useParams();

    console.log(id);

    useEffect(() => {
        axios
            .get("http://localhost:8080/getCandidatesForJob/" + id)
            .then((res) => {
                const candidates = res.data;
                console.log(candidates);
                setCandidates(candidates);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="home">
            <div className="home-container">
                <div className="candidates-container">
                    {candidates.map((candidate) => {
                        const { Candidateid, nume, cv, email } = candidate;
                        return (
                            <Candidate
                                key={Candidateid}
                                candidateId={Candidateid}
                                nume={nume}
                                cv={cv}
                                email={email}
                            />
                        );
                    })}
                </div>

                <div className="add-candidate-btn-wrapper">
                    <Link
                        to={`/addCandidate/${id}/${0}/${0}`}
                        className="add-candidate-btn"
                    >
                        Adauga candidat
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Candidates;
