import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-100 md:px-20 min-h-screen px-6 py-10">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl text-red-400 font-bold mb-4">Privacy Policy</h2>
        <p className="text-gray-600 text-lg">
          This Privacy Policy explains how Index IT Hub collects, uses, and protects your personal information.
        </p>
      </div>

      {/* Main Content Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">1. Information We Collect</h3>
          <p className="text-gray-600">
            We collect personal information that you provide to us when you use our services, such as name, email address, and job preferences.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">2. How We Use Your Information</h3>
          <p className="text-gray-600">
            We use the information we collect to enhance your experience, provide tailored services, and send you job updates or related content.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">3. How We Protect Your Information</h3>
          <p className="text-gray-600">
            We implement industry-standard security measures to protect your personal information and ensure that it is kept secure.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">4. Third-Party Disclosure</h3>
          <p className="text-gray-600">
            We do not sell or rent your personal information to third parties. We may share information with trusted partners to provide better services to you.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">5. Your Rights</h3>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal information. You can contact us for any inquiries related to your privacy.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">6. Changes to This Policy</h3>
          <p className="text-gray-600">
            We reserve the right to update this Privacy Policy at any time. Please review it periodically to stay informed of any changes.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl text-gray-800 font-semibold mb-4">7. Contact Information</h3>
          <p className="text-gray-600">
            If you have any questions or concerns regarding our privacy practices, please contact us at <a href="mailto:info@indexithub.com" className="text-red-400 hover:underline">info@indexithub.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
