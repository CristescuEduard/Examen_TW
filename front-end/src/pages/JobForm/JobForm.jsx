import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./JobForm.css";

function JobForm() {
    const [descriere, setDescriere] = useState("");
    const [deadline, setDeadline] = useState(new Date());

    const navigate = useNavigate();
    const { bool, id } = useParams();

    console.log(bool);
    const addJob = async () => {
        const formValues = { descriere, deadline };
        try {
            await axios.post("http://localhost:8080/addJob", formValues);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const modifyJob = async () => {
        const formValues = { descriere, deadline };
        try {
            await axios.put(
                "http://localhost:8080/modifyJob/" + id,
                formValues
            );
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="job-form">
            <div className="job-form-container">
                <div className="job-form-wrapper">
                    <div className="form-control">
                        <label>Descriere</label>
                        <textarea
                            className="descriere-job"
                            value={descriere}
                            onChange={(e) => setDescriere(e.target.value)}
                            placeholder="Descriere..."
                        ></textarea>
                    </div>

                    <div className="form-control">
                        <label>Deadline</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>
                </div>

                {+bool ? (
                    <button className="modify-job-btn" onClick={modifyJob}>
                        Modifica Job
                    </button>
                ) : (
                    <button className="add-job-btn" onClick={addJob}>
                        Adauga Job
                    </button>
                )}
            </div>
        </div>
    );
}

export default JobForm;
