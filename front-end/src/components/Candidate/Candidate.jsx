import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import "./Candidate.css";

function Candidate({ candidateId, nume, cv, email }) {
    const { id } = useParams();

    const deleteCandidate = async () => {
        try {
            await axios.delete(
                `http://localhost:8080/deleteCandidate/${+id}/${candidateId}`
            );
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="candidate">
            <h2>
                Candidatul {candidateId}: {nume}
            </h2>
            <p>{cv}</p>
            <p>{email}</p>
            <div className="candidate-btns">
                <Link
                    to={`/addCandidate/${id}/${candidateId}/${1}`}
                    className="modify-candidate-btn"
                >
                    Modifica candidat
                </Link>
                <button
                    className="delete-candidate-btn"
                    onClick={deleteCandidate}
                >
                    Sterge candidat
                </button>
            </div>
        </div>
    );
}

export default Candidate;
