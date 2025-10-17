import React from 'react';

const LegalPage = ({ title, lastUpdated, sections }) => {
  return (
    <div className="bg-gray-900 min-h-screen py-24 md:py-32 px-4">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <h1 className="text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          {title}
        </h1>

        <p className="text-lg text-gray-300 mb-8">Last updated: {lastUpdated}</p>

        {/* Iterate over sections to display each titled section */}
        {sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-200 mb-4">
              {section.title}
            </h2>
            <p className="text-gray-400">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalPage;
