// src/pages/Home.js
import React from "react";

const Home = () => {
  const cardData = [
    {
      title: "AI Medical Assistant",
      description: "Ask health-related questions to AI instantly.",
    },
    {
      title: "Find a Doctor",
      description: "Search doctors by city and view their profiles.",
    },
    {
      title: "Live Chat",
      description: "Talk to your doctor in real-time using chat.",
    },
    {
      title: "Book Appointment",
      description: "Fix appointments and get email confirmations.",
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-2 pb-6 space-y-[1vh]">
      <div className="w-[80vw] h-[60vh] border border-gray-500 rounded-lg p-6 shadow-lg text-white bg-gradient-to-br from-purple-800 to-blue-800 flex">
        {/* Left Section - DocTreat Intro */}
        <div className="w-1/2 pr-6 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-yellow-300">Welcome to DocTreat</h1>
          <p className="text-lg text-white leading-relaxed">
            <strong>DocTreat</strong> is your digital healthcare companion.
            It helps you <strong>instantly chat with doctors</strong>, ask <strong>AI-powered medical questions</strong>,
            and book <strong>real-time appointments</strong> — all in one place. With smart features and a clean interface,
            DocTreat brings healthcare to your fingertips, anytime, anywhere.
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 flex justify-center items-center p-[5%]">
          <img
             src="/images/doctor.png"
             alt="Doctor"
             className="rounded-lg shadow-2xl w-[90%] h-[90%] object-contain"
          />


        </div>
      </div>

      {/* Cards */}
      {cardData.map((card, index) => (
        <div
          key={index}
          className="w-[80vw] h-[60vh] border border-gray-500 rounded-lg p-6 shadow-lg text-white 
                   bg-gradient-to-br from-purple-800 to-blue-800 hover:brightness-110 transition-all duration-300
                   flex flex-col justify-center cursor-pointer"
        >
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">{card.title}</h2>
          <p className="text-white text-lg font-medium">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
