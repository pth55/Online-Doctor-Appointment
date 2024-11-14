import React from 'react';

function About() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl mx-auto mt-5">
      <h1 className="text-4xl font-semibold text-center text-[#FFA500] mb-6">About Our Hospital</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to our hospital, where compassionate care meets world-class medical expertise. Our mission is to provide
        comprehensive healthcare services to individuals and families, ensuring that every patient receives personalized
        treatment in a warm and supportive environment.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        We offer a wide range of medical services, including emergency care, specialized treatments, and routine checkups,
        all delivered by a team of experienced professionals. Our state-of-the-art facilities and patient-centric approach
        ensure that you receive the best possible care at every stage of your journey with us.
      </p>
      <h2 className="text-2xl font-semibold text-[#FFA500] mb-4">Our Values</h2>
      <ul className="list-disc list-inside text-lg text-gray-700">
        <li>Compassionate care for every patient</li>
        <li>Commitment to excellence in healthcare</li>
        <li>Innovative and advanced medical practices</li>
        <li>Patient safety and satisfaction are our top priorities</li>
      </ul>
      <h2 className="text-2xl font-semibold text-[#FFA500] mt-6 mb-4">Our Promise</h2>
      <p className="text-lg text-gray-700">
        We are dedicated to treating each patient with the respect and dignity they deserve. With our expert team of doctors,
        nurses, and staff, we promise to provide you with high-quality care in a comfortable and caring environment. Thank you
        for trusting us with your health.
      </p>
    </div>
  );
}

export default About;
