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

  const dummyDoctors = [
    {
      name: "Dr. Meera Sharma",
      profile: "/images/doctor1.png",
    },
    {
      name: "Dr. Arjun Patel",
      profile: "/images/doctor2.png",
    },
    {
      name: "Dr. Sneha Reddy",
      profile: "/images/doctor3.png",
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center pt-2 pb-6 space-y-[1vh]">
      {/* First Section - Intro */}
      <div className="w-[80vw] h-[60vh] border border-gray-500 rounded-lg p-6 shadow-lg text-white bg-gradient-to-br from-purple-800 to-blue-800 flex">
        <div className="w-1/2 pr-6 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-yellow-300">Welcome to DocTreat</h1>
          <p className="text-lg text-white leading-relaxed">
            <strong>DocTreat</strong> is your digital healthcare companion.
            It helps you <strong>instantly chat with doctors</strong>, ask <strong>AI-powered medical questions</strong>,
            and book <strong>real-time appointments</strong> — all in one place. With smart features and a clean interface,
            DocTreat brings healthcare to your fingertips, anytime, anywhere.
          </p>
        </div>

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
          {index !== 1 ? (
            <>
              <h2 className="text-3xl font-bold mb-4 text-yellow-300">{card.title}</h2>
              <p className="text-white text-lg font-medium">{card.description}</p>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-2 text-yellow-300">Meet Our Top Doctors</h2>
              <p className="text-white text-lg mb-6">
                Trusted professionals ready to help. Here are a few of them:
              </p>

              <div className="flex justify-between gap-4">
                {dummyDoctors.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center bg-white text-black rounded-lg p-4 w-1/3 shadow-md border border-gray-400"
                  >
                    <img
                      src={doc.profile}
                      alt={doc.name}
                      className="w-20 h-20 rounded-full object-cover mb-2"
                    />
                    <h4 className="font-semibold text-lg text-center">{doc.name}</h4>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
