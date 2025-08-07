
import React, { useState } from "react";
import Footer from "../components/Footer";

const Home = () => {
  const navbarLinks = [
    { name: "Home", path: "/", description: "Go to the homepage." },
    { name: "Ask AI", path: "/ask-ai", description: "Chat with our AI medical assistant." },
    { name: "Connect Doctors", path: "/connect-doctors", description: "Find doctors in your city." },
    { name: "Login", path: "/login", description: "Login to your account." },
    { name: "Signup", path: "/signup", description: "Create a new account." },
  ];

  const features = [
    {
      icon: "🔍",
      title: "Search a Doctor",
      description: "Real-time discovery with trusted doctors."
    },
    {
      icon: "📅",
      title: "Book an Appointment",
      description: "Easy, fast, and secure doctor bookings."
    },
    {
      icon: "📤",
      title: "Upload & Track Medical Docs",
      description: "Stay organized with all your health records."
    },
    {
      icon: "⭐",
      title: "Premium Access for Direct Connection",
      description: "Instant communication with top specialists."
    }
  ];

  const faqs = [
    {
      question: "What is DocTreat?",
      answer: "DocTreat is a digital healthcare platform connecting patients with certified doctors across India."
    },
    {
      question: "How do I book an appointment?",
      answer: "Simply search for a doctor by city or specialty, select a time slot, and confirm your booking."
    },
    {
      question: "What is Premium membership?",
      answer: "Premium gives you faster access to top doctors and priority support for just ₹10."
    },
    {
      question: "How can I maintain my medical records?",
      answer: "You can upload prescriptions, reports, and track your health history from your dashboard."
    },
    {
      question: "How do I trust that these are verified doctors?",
      answer: "Every doctor on DocTreat is verified through official documentation and medical board certifications."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-white flex flex-col items-center pt-10 pb-10 space-y-12">
        {/* Hero Section */}
        <div className="w-[90vw] max-w-7xl border border-gray-300 rounded-2xl p-8 shadow-xl bg-gradient-to-br from-purple-900 to-blue-900 text-white flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-5xl font-extrabold text-yellow-300">Your Health, Simplified</h1>
            <p className="text-lg leading-relaxed">
              With <strong>DocTreat</strong>, instantly connect with expert doctors, ask AI-powered health questions, and manage your wellness from anywhere. Hassle-free, secure, and always accessible.
            </p>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
            <img src="/images/doctor.png" alt="Doctor" className="w-[300px] h-auto object-contain rounded-xl shadow-2xl" />
          </div>
        </div>

        {/* Why Choose DocTreat */}
        <div className="w-[90vw] max-w-7xl border border-gray-300 rounded-2xl p-8 shadow-md bg-gradient-to-br from-purple-800 to-blue-800 text-white">
          <h2 className="text-3xl font-bold text-center text-yellow-300 mb-8">Why Choose DocTreat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-all text-black">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-purple-700 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="w-[90vw] max-w-7xl border border-gray-300 rounded-2xl p-8 shadow-md bg-gradient-to-br from-purple-800 to-blue-800 text-white">
          <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6">What Patients Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Ravi Verma", text: "Very helpful platform. Booking was quick and easy!" },
              { name: "Anjali Desai", text: "The AI assistant gave surprisingly accurate suggestions." },
              { name: "Karan Mehta", text: "Found a great doctor in my area within minutes." },
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-lg text-black">
                <p className="italic mb-2">“{review.text}”</p>
                <p className="text-right font-bold text-purple-700">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="w-[90vw] max-w-7xl border border-gray-300 rounded-2xl p-8 shadow-lg bg-gradient-to-br from-purple-800 to-blue-800 text-white">
          <h2 className="text-3xl font-bold text-center text-yellow-300 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  className="w-full text-left p-4 bg-white text-black rounded-md shadow hover:bg-purple-700 hover:text-white transition-all"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                </button>
                {openIndex === index && (
                  <div className="p-4 bg-purple-100 text-black rounded-b-md">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

