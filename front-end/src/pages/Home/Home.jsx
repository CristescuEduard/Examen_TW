import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Job from "../../components/Job/Job";
import { Link } from "react-router-dom";

function Home() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/getJobs/")
            .then((res) => {
                const jobs = res.data;
                console.log(jobs);
                setJobs(jobs);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="home">
            <div className="home-container">
                <div className="jobs-container">
                    {jobs.map((job) => {
                        const { Jobid, descriere, deadline } = job;
                        return (
                            <Job
                                key={Jobid}
                                id={Jobid}
                                descriere={descriere}
                                deadline={deadline}
                            />
                        );
                    })}
                </div>

                <div className="add-job-btn-wrapper">
                    <Link to={`/addJob/${0}/${0}`} className="add-job-btn">
                        Adauga job
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
