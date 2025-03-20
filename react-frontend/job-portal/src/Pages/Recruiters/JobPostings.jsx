import React, { useEffect, useState } from "react";
import JobPostingForm from "./JobPostingForm";
import JobUpdateForm from "./JobUpdateForm";
import JobListTable from "./JobListTable";

const JobPostings = () => {
  const [jobPostingForm, setJobPostingForm] = useState(false);
  const [jobUpdateForm, setJobUpdateForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Close the update form
  const closeUpdateForm = () => {
    setJobUpdateForm(false);
    setSelectedJobId(null);
  };



  return (
    <>
      {/* Button for adding new job posting */}
      {!jobPostingForm && !jobUpdateForm && (
        <button
          className="bg-red-400 rounded-md text-white hover:bg-red-500 mb-4 px-4 py-2"
          onClick={() => setJobPostingForm(true)}
        >
          Add New Job Posting
        </button>
      )}

      {/* Show the job list table when no forms are open */}
      {!jobPostingForm && !jobUpdateForm && (
        <JobListTable
          setJobUpdateForm={setJobUpdateForm}
          setSelectedJobId={setSelectedJobId}
        />
      )}

      {/* Show the job posting form */}
      {jobPostingForm && <JobPostingForm closeForm={setJobPostingForm} />}

      {/* Show the job update form */}
      {jobUpdateForm && (
        <JobUpdateForm jobId={selectedJobId} closeForm={closeUpdateForm} />
      )}
    </>
  );
};

export default JobPostings;
