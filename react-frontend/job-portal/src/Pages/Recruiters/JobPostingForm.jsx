import { useState } from "react";

export default function JobPostingForm() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    qualification: "",
    skills: [],
    otherSkills: "",
    experience: "",
    category: "",
    vacancies: "",
    employmentType: "",
    salary: "",
    responsibilities: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        skills: checked ? [...prev.skills, value] : prev.skills.filter((skill) => skill !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {[
          { label: "Job Title", name: "title", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Qualification Requirements", name: "qualification", type: "text" },
          { label: "Experience (Years)", name: "experience", type: "number" },
          { label: "Number of Vacancies", name: "vacancies", type: "number" },
          { label: "Salary", name: "salary", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-gray-700 font-medium">{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              onChange={handleChange}
              required
              className="p-2 border rounded w-full"
            />
          </div>
        ))}
        <div>
          <label className="block text-gray-700 font-medium">Job Category</label>
          <select name="category" onChange={handleChange} required className="p-2 border rounded w-full">
            <option value="">Select Job Category</option>
            <option value="Software Development">Software Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="Finance">Finance</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Skills</label>
          <div className="grid grid-cols-2 gap-2">
            {["JavaScript", "Python", "React", "Node.js", "UI/UX Design", "SEO"].map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
          <input
            name="otherSkills"
            type="text"
            placeholder="Other skills"
            onChange={handleChange}
            className="p-2 border rounded w-full mt-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Employment Type</label>
          <select name="employmentType" onChange={handleChange} required className="p-2 border rounded w-full">
            <option value="">Select Employment Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Key Responsibilities</label>
          <textarea name="responsibilities" onChange={handleChange} required className="p-2 border rounded w-full h-24" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Application Deadline</label>
          <input name="deadline" type="date" onChange={handleChange} required className="p-2 border rounded w-full" />
        </div>
        <button type="submit" className="p-2 bg-red-400 hover:bg-red-500 text-white rounded">Post Job</button>
      </form>
    </div>
  );
}
