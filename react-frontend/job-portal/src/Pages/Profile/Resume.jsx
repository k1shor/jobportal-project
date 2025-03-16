import React, { useState } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { API } from '../../config';

const Resume = ({ user }) => {
    const { fullName, email, profile_picture, phone, date_of_birth, gender, bio, education, experience } = user;
    
    const [color1, setColor1] = useState("#4f46e5"); // Default blue
    const [color2, setColor2] = useState("#9333ea"); // Default purple

    const downloadPDF = async () => {
        const element = document.getElementById("resume-container");
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    };

    return (
        <div className="mx-auto max-w-4xl px-6 py-8">
            <div className="mb-6 flex gap-4">
                <div className="flex flex-col w-1/2">
                    <label htmlFor="color1" className="mb-2 font-semibold text-lg">Choose Gradient Color 1</label>
                    <div className="flex gap-2 items-center">
                        <input
                            id="color1"
                            type="color"
                            value={color1}
                            onChange={(e) => setColor1(e.target.value)}
                            className="p-3 border rounded text-lg"
                        />
                        <div className="w-12 h-12 rounded-full" style={{ backgroundColor: color1 }}></div>
                    </div>
                </div>
                <div className="flex flex-col w-1/2">
                    <label htmlFor="color2" className="mb-2 font-semibold text-lg">Choose Gradient Color 2</label>
                    <div className="flex gap-2 items-center">
                        <input
                            id="color2"
                            type="color"
                            value={color2}
                            onChange={(e) => setColor2(e.target.value)}
                            className="p-3 border rounded text-lg"
                        />
                        <div className="w-12 h-12 rounded-full" style={{ backgroundColor: color2 }}></div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <p className="font-semibold text-lg">Gradient Preview</p>
                <div className="mt-4 p-6 text-white rounded" style={{ background: `linear-gradient(to right, ${color1} 0%, ${color2} 100%)` }}>
                    <p>This is a preview of your selected gradient.</p>
                </div>
            </div>

            <div id="resume-container" className="p-8 bg-white shadow-lg rounded-lg">
                <div className="p-8 text-white rounded-t-lg" style={{ background: `linear-gradient(to right, ${color1} 0%, ${color2} 100%)` }}>
                    <div className="flex items-center space-x-6">
                        <img
                            src={profile_picture ? `${API}/${profile_picture}` : "/default-profile.png"}
                            alt={fullName}
                            className="w-28 h-28 rounded-full border-4 border-white"
                        />
                        <div>
                            <h1 className="text-4xl font-bold">{fullName}</h1>
                            <p className="text-xl opacity-80">{email}</p>
                            <p className="text-xl opacity-80">{phone}</p>
                        </div>
                    </div>
                </div>
                <div className="p-8">
                    <h2 className="text-3xl font-semibold mb-4">Personal Information</h2>
                    <p className="text-xl"><span className="font-semibold">Date of Birth:</span> {date_of_birth?.split('T')[0]}</p>
                    <p className="text-xl"><span className="font-semibold">Gender:</span> {gender}</p>
                    <p className="text-xl"><span className="font-semibold">Bio:</span> {bio}</p>
                    <h2 className="text-3xl font-semibold mt-6 mb-4">Education</h2>
                    {education?.length > 0 ? (
                        <ul className="list-disc pl-6 text-xl">
                            {education.map((edu, index) => (
                                <li key={index}>{edu.degree} from {edu.college}, {edu.university} ({edu.passed_year})</li>
                            ))}
                        </ul>
                    ) : <p className="text-xl">No education details available.</p>}
                    <h2 className="text-3xl font-semibold mt-6 mb-4">Experience</h2>
                    {experience?.length > 0 ? (
                        <ul className="list-disc pl-6 text-xl">
                            {experience.map((exp, index) => (
                                <li key={index}>{exp.position} at {exp.company} ({exp.year})</li>
                            ))}
                        </ul>
                    ) : <p className="text-xl">No job experience available.</p>}
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <button className="px-8 py-3 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600" onClick={downloadPDF}>
                    Download as PDF
                </button>
            </div>
        </div>
    );
};

export default Resume;