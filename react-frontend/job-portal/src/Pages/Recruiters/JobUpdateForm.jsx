import { useState, useEffect } from "react";
import { isAuthenticated } from "../../api/UserAPI"; // Assuming this handles user authentication
import Swal from "sweetalert2";
import { getVacancyDetails } from "../../api/vacancyAPI";

export default function JobUpdateForm({ jobId, closeForm }) {
  const { token } = isAuthenticated();
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

  useEffect(()=>{
getVacancyDetails(jobId)
.then(data=>{
    if(data.error){
        Swal.fire(data.error)
    }
    else{
        setFormData(data.data)
    }
})
  },[jobId])


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        skills: checked ? [...prev.skills, value] : prev.skills.filter((skill) => skill !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formDataObj = new FormData();
    for (let key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      const response = await fetch(`http://localhost:5000/vacancy/update/${jobId}`, {
        method: "PUT",
        body: formDataObj,
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await response.json();
      if (result.error) {
        Swal.fire("Error", result.error, "error");
      } else {
        Swal.fire("Success!", "Job updated successfully", "success");
        closeForm(false);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update job. Try again later.", "error");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[ 
          { label: "Job Title", name: "title", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Qualification", name: "qualification", type: "text" },
          { label: "Experience (Years)", name: "experience", type: "number" },
          { label: "Vacancies", name: "vacancies", type: "number" },
          { label: "Salary", name: "salary", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label className="text-gray-700 block font-medium">{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              value={formData[field.name]}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
        ))}

        <div>
          <label className="text-gray-700 block font-medium">Job Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select Job Category</option>
            {["Software Development", "Marketing", "Design", "Finance", "Human Resources"].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
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
                  checked={formData.skills.includes(skill)}
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
            value={formData.otherSkills}
            onChange={handleChange}
            className="border p-2 rounded w-full mt-2"
          />
        </div>

        <div>
          <label className="text-gray-700 block font-medium">Employment Type</label>
          <select
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select Employment Type</option>
            {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="text-gray-700 block font-medium">Key Responsibilities</label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            required
            className="border h-24 p-2 rounded w-full resize-none"
          />
        </div>

        <div>
          <label className="text-gray-700 block font-medium">Application Deadline</label>
          <input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="text-gray-700 block font-medium">Upload Job Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="col-span-2 flex justify-end">
          <button type="submit" className="bg-red-400 p-2 rounded text-white hover:bg-red-500">
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
}
