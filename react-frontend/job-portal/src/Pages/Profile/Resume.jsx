import React from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resume = () => {

    // function to download the resume as PDF
    const downloadPDF = async () => {
        const element = document.getElementById("user-details"); // ID of the element to capture
        const canvas = await html2canvas(element, { scale: 2, useCORS: true }); // Increase scale for better quality
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        // Adjust dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("user-details.pdf");
    };

    // main function return statement
    return (
        <div className={'mx-10'}>
            <div id="user-details">
                <div className="min-h-screen bg-gray-100 py-8">
                    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                        {/* User Details Content */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                            <div className="flex items-center space-x-4">
                                <img
                                    // src={'/pp.jpg'}
                                    src="http://localhost:5000/profile/default.png"
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full border-4 border-white "
                                    onLoad={() => console.log('Image loaded!')} // Ensure image is loaded
                                />
                                <div className="text-white">
                                    <h1 className="text-2xl font-bold">
                                        <span>{'Gaurav'}</span>
                                        <span> {'Kushwaha'}</span>
                                    </h1>
                                    <p className="text-sm opacity-80">{'rockymoderator@gmail.com'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Download button */}
            <div>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={downloadPDF}
                >
                    Download as PDF
                </button>
            </div>
        </div>
    );
};

export default Resume;