import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CandidateForm.css";

function CandidateForm() {
    const [nume, setNume] = useState("");
    const [cv, setCv] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const { id, bool, candidateId } = useParams();

    const addCandidate = async () => {
        const formValues = { nume, cv, email };
        try {
            await axios.post(
                "http://localhost:8080/addCandidate/" + id,
                formValues
            );
            navigate(`/candidates/${id}`);
        } catch (err) {
            console.log(err);
        }
    };

    const modifyCandidate = async () => {
        const formValues = { nume, cv, email };
        try {
            await axios.put(
                `http://localhost:8080/modifyCandidate/${+id}/${+candidateId}`,
                formValues
            );
            navigate(`/candidates/${id}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="job-form">
            <div className="job-form-container">
                <div className="job-form-wrapper">
                    <div className="form-control">
                        <label>Nume</label>
                        <input
                            type="text"
                            value={nume}
                            onChange={(e) => setNume(e.target.value)}
                            placeholder="Numele..."
                        />
                    </div>
                    <div className="form-control">
                        <label>CV</label>
                        <textarea
                            className="descriere-job"
                            value={cv}
                            onChange={(e) => setCv(e.target.value)}
                            placeholder="CV-ul..."
                        ></textarea>
                    </div>
                    <div className="form-control">
                        <label>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Mailul..."
                        />
                    </div>
                </div>

                {+bool ? (
                    <button className="add-job-btn" onClick={modifyCandidate}>
                        Modifica Candidat
                    </button>
                ) : (
                    <button className="add-job-btn" onClick={addCandidate}>
                        Adauga Candidat
                    </button>
                )}
            </div>
        </div>
    );
}

export default CandidateForm;
