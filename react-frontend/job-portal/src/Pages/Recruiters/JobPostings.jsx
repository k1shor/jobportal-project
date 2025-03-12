// JobPostings.js
import React, { useEffect, useState } from 'react';
import JobPostingForm from './JobPostingForm';
import { getAllVacancies } from '../../api/vacancyAPI';
import JobListTable from './JobListTable';

const JobPostings = () => {
  const [jobPostingForm, setJobPostingForm] = useState(false)



  return (
    <>
      {
        !jobPostingForm &&
        <button className="px-4 py-2 bg-red-400 text-white rounded-md mb-4 hover:bg-red-500" onClick={() => setJobPostingForm(!jobPostingForm)}>
          Add New Job Posting
        </button>
      }
      {!jobPostingForm && <JobListTable jobPostingForm={jobPostingForm} />}
      {jobPostingForm && <JobPostingForm closeForm={setJobPostingForm} />}
    </>
  );
};

export default JobPostings;
