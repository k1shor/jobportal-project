import { useState } from "react";
import { isAuthenticated } from "../../api/UserAPI";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function JobPostingForm({ closeForm }) {
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
    employerId: "",
    image: null,
  });

  const { token } = isAuthenticated();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((skill) => skill !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, responsibilities: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/vacancy/post-vacancy", {
        method: "POST",
        body: formDataObj,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result.error) {
        console.log(result.error);
      } else {
        alert("Job Posted Successfully:");
        closeForm(false);
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          { label: "Job Title", name: "title", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Qualification Requirements", name: "qualification", type: "text" },
          { label: "Experience (Years)", name: "experience", type: "number" },
          { label: "Number of Vacancies", name: "vacancies", type: "number" },
          { label: "Salary", name: "salary", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-gray-700 block font-medium">{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
        ))}
        <div>
          <label className="text-gray-700 block font-medium">Job Category</label>
          <select name="category" onChange={handleChange} required className="border p-2 rounded w-full">
            <option value="">Select Job Category</option>
            <option value="Software Development">Software Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
            <option value="Finance">Finance</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>
        <div>
          <label className="text-gray-700 block font-medium">Employment Type</label>
          <select name="employmentType" onChange={handleChange} required className="border p-2 rounded w-full">
            <option value="">Select Employment Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="text-gray-700 block font-medium">Skills</label>
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
            className="border p-2 rounded w-full mt-2"
          />
        </div>
        <div className="col-span-2">
          <label className="text-gray-700 block font-medium">Key Responsibilities</label>
          <ReactQuill value={formData.responsibilities} onChange={handleQuillChange} className="bg-white rounded border" />
        </div>
        <div>
          <label className="text-gray-700 block font-medium">Application Deadline</label>
          <input name="deadline" type="date" onChange={handleChange} required className="border p-2 rounded w-full" />
        </div>
        <div>
          <label className="text-gray-700 block font-medium">Upload Job Image</label>
          <input name="image" type="file" accept="image/*" onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <div className="col-span-2 flex justify-between mt-4">
          <button type="button" onClick={() => closeForm(false)} className="bg-gray-400 p-2 rounded text-white hover:bg-gray-500">Cancel</button>
          <button type="submit" className="bg-red-400 p-2 rounded text-white hover:bg-red-500">Post Job</button>
        </div>
      </form>
    </div>
  );
}
