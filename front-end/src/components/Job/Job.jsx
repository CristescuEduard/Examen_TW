import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Job.css";
function Job({ id, descriere, deadline }) {
    const ddl = new Date(deadline);
    const deleteJob = async () => {
        try {
            await axios.delete("http://localhost:8080/deleteJob/" + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="job">
            <h2>Job {id}</h2>
            <p>{descriere}</p>
            <p>{`${ddl.toLocaleDateString()} ${ddl.toLocaleTimeString()}`}</p>
            <div className="job-btns">
                <Link to={`/addJob/${id}/${1}`} className="modify-job-btn">
                    Modifica job
                </Link>
                <button className="delete-job-btn" onClick={deleteJob}>
                    Sterge job
                </button>
                <Link className="view-candidates-btn" to={`/candidates/${id}`}>
                    Vizualizeaza candidati
                </Link>
            </div>
        </div>
    );
}

export default Job;
