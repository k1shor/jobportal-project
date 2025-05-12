import React, { useState, useEffect } from "react";
import Select from "react-select";
import { isAuthenticated, updateProfile } from "../../api/UserAPI";
import { getAllSkills } from "../../api/SkillAPI";

// const skillOptions = useState([
//   { value: "JavaScript", label: "JavaScript" },
//   { value: "React", label: "React" },
//   { value: "Node.js", label: "Node.js" },
//   { value: "Express", label: "Express" },
//   { value: "MongoDB", label: "MongoDB" },
//   { value: "TypeScript", label: "TypeScript" },
//   { value: "C#", label: "C#" },
//   { value: ".NET", label: ".NET" },
//   { value: "SQL", label: "SQL" },
//   { value: "Docker", label: "Docker" },
//   { value: "AWS", label: "AWS" },
//   { value: "TailwindCSS", label: "TailwindCSS" },
//   { value: "Next.js", label: "Next.js" }
// ];

const Setting = ({ user }) => {
let [skillOptions, setSkillOptions] = useState([])

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    bio: "",
    password: "",
    date_of_birth: "",
    gender: "",
    profilePicture: "",
    education: [],
    experience: [],
    skills: []
  });

  const { token } = isAuthenticated();

  useEffect(() => {
    getAllSkills()
    .then(data=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            setSkillOptions(data.map(skill=>({value: skill._id, label: skill.name})))
        }
    })
    const savedData = user || {};
    setFormData((prevData) => ({ ...prevData, ...savedData }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedInputChange = (index, e, category) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[category]];
    updatedArray[index] = { ...updatedArray[index], [name]: value };
    setFormData({ ...formData, [category]: updatedArray });
  };

  const addEntry = (category, newEntry) => {
    setFormData({ ...formData, [category]: [...formData[category], newEntry] });
  };

  const removeEntry = (category, index) => {
    const updatedArray = formData[category].filter((_, i) => i !== index);
    setFormData({ ...formData, [category]: updatedArray });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
  };

  const handleSave = () => {
    console.log("Settings saved:", formData);
    let info = new FormData();
    for (var key in formData) {
      if (["education", "experience", "skills"].includes(key)) {
        info.append(key, JSON.stringify(formData[key]));
      } else {
        info.append(key, formData[key]);
      }
    }

    updateProfile(token, info)
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Your settings have been saved.");
        }
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth?.toString().split("T")[0] || ""}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mt-1 p-2 block w-full border rounded-md"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Skills Multi-select */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Skills</label>
          <Select
            isMulti
            name="skills"
            options={skillOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={formData.skills.map((skill) => ({
              label: skill,
              value: skill
            }))}
            onChange={(selectedOptions) =>
              setFormData({
                ...formData,
                skills: selectedOptions.map((option) => option.name)
              })
            }
          />
        </div>

        {/* Education */}
        <div>
          <label className="block font-medium text-gray-700">Educational Qualifications</label>
          {formData.education.map((edu, index) => (
            <div key={index} className="space-y-2">
              <input type="text" name="degree" placeholder="Degree" value={edu.degree} onChange={(e) => handleNestedInputChange(index, e, "education")} className="mt-1 p-2 block w-full border rounded-md" />
              <input type="text" name="college" placeholder="College" value={edu.college} onChange={(e) => handleNestedInputChange(index, e, "education")} className="mt-1 p-2 block w-full border rounded-md" />
              <input type="text" name="university" placeholder="University" value={edu.university} onChange={(e) => handleNestedInputChange(index, e, "education")} className="mt-1 p-2 block w-full border rounded-md" />
              <input type="text" name="passedYear" placeholder="Passed Year" value={edu.passedYear} onChange={(e) => handleNestedInputChange(index, e, "education")} className="mt-1 p-2 block w-full border rounded-md" />
              <button onClick={() => removeEntry("education", index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={() => addEntry("education", { degree: "", college: "", university: "", passedYear: "" })} className="text-blue-500 mt-2">Add Education</button>
        </div>

        {/* Experience */}
        <div>
          <label className="block font-medium text-gray-700">Job Experience</label>
          {formData.experience.map((exp, index) => (
            <div key={index} className="space-y-2">
              <input type="text" name="position" placeholder="Position" value={exp.position} onChange={(e) => handleNestedInputChange(index, e, "experience")} className="mt-1 p-2 block w-full border rounded-md" />
              <input type="text" name="company" placeholder="Company" value={exp.company} onChange={(e) => handleNestedInputChange(index, e, "experience")} className="mt-1 p-2 block w-full border rounded-md" />
              <input type="text" name="year" placeholder="Year" value={exp.year} onChange={(e) => handleNestedInputChange(index, e, "experience")} className="mt-1 p-2 block w-full border rounded-md" />
              <button onClick={() => removeEntry("experience", index)} className="text-red-500">Remove</button>
            </div>
          ))}
          <button onClick={() => addEntry("experience", { position: "", company: "", year: "" })} className="text-blue-500 mt-2">Add Experience</button>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Setting;
