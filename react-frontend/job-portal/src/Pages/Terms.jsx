import React from 'react';

const Terms = () => {
  return (
    <div className="bg-gray-100 md:px-20 min-h-screen px-6 py-10">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl text-red-400 font-bold mb-4">Terms & Conditions</h2>
        <p className="text-gray-600 text-lg">
          Welcome to Index IT Hub! Please read our Terms & Conditions carefully before using our website.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">1. Introduction</h3>
          <p className="text-gray-600">
            By accessing or using our website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please refrain from using the site.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">2. Use of the Website</h3>
          <p className="text-gray-600">
            You may use our website for lawful purposes only. You must not engage in any activity that disrupts or interferes with the website’s functionality or violates the rights of others.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">3. Intellectual Property</h3>
          <p className="text-gray-600">
            All content, logos, and trademarks on this website are the property of Index IT Hub or its licensors. You are granted a limited, non-exclusive, non-transferable license to access and use the website for personal use only.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">4. Privacy Policy</h3>
          <p className="text-gray-600">
            Our privacy policy governs how we collect, use, and protect your data. Please review our <a href="/privacy-policy" className="text-red-400 hover:underline">Privacy Policy</a> for more details.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">5. Disclaimers</h3>
          <p className="text-gray-600">
            The content on our website is provided "as is." We make no representations or warranties regarding the accuracy or completeness of the information available on the site.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">6. Limitation of Liability</h3>
          <p className="text-gray-600">
            Index IT Hub will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or any related services.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">7. Changes to Terms</h3>
          <p className="text-gray-600">
            We reserve the right to modify these Terms & Conditions at any time. Any changes will be posted on this page, and it is your responsibility to review them periodically.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">8. Contact Information</h3>
          <p className="text-gray-600">
            If you have any questions or concerns about these Terms & Conditions, feel free to contact us at <a href="mailto:info@indexithub.com" className="text-red-400 hover:underline">info@indexithub.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
