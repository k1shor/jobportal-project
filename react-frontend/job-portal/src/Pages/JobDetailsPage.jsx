import React from 'react';
import { useParams } from 'react-router-dom';

const jobData = [
  { id: 1, title: "Frontend Developer", company: "TechCorp", location: "New York, USA", type: "Full-Time", description: "Develop and maintain user-facing features with React.js." },
  { id: 2, title: "Backend Developer", company: "CodeHouse", location: "San Francisco, USA", type: "Part-Time", description: "Build and optimize server-side applications with Node.js." },
  { id: 3, title: "UI/UX Designer", company: "DesignPro", location: "London, UK", type: "Remote", description: "Design intuitive and visually appealing user interfaces." },
  { id: 4, title: "Project Manager", company: "AgileSoft", location: "Berlin, Germany", type: "Full-Time", description: "Lead and manage agile software development projects." },
];

const JobDetailsPage = () => {
  const { id } = useParams();
  const job = jobData.find((job) => job.id === parseInt(id));

  if (!job) {
    return <div className='text-center text-gray-600 p-8'>Job not found.</div>;
  }

  return (
    <div className='min-h-screen bg-gray-100 p-8 flex justify-center'>
      <div className='max-w-3xl bg-white p-6 rounded-xl shadow-lg'>
        <h2 className='text-3xl font-bold text-red-400 mb-4'>{job.title}</h2>
        <p className='text-gray-600'><strong>Company:</strong> {job.company}</p>
        <p className='text-gray-600'><strong>Location:</strong> {job.location}</p>
        <p className='text-gray-600'><strong>Job Type:</strong> {job.type}</p>
        <p className='text-gray-800 mt-4'>{job.description}</p>
      </div>
    </div>
  );
};

export default JobDetailsPage;
