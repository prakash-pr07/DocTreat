// import { FaGithub, FaLinkedin, FaArrowUp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCode } from "react-icons/fa";
// import { SiLeetcode } from "react-icons/si";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-300 px-6 py-10">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

//         {/* About Us */}
//         <div>
//           <h2 className="text-lg font-semibold mb-3 text-white">About DocTreat</h2>
//           <p className="text-sm">
//             DocTreat is a telemedicine platform that helps patients connect with trusted doctors based on their city,
//             book appointments, chat in real-time, and manage their health records—all in one place.
//           </p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h2 className="text-lg font-semibold mb-3 text-white">Quick Links</h2>
//           <ul className="text-sm space-y-2">
//             <li><a href="/" className="hover:underline">Home</a></li>
//             <li><a href="/login" className="hover:underline">Login</a></li>
//             <li><a href="/signup" className="hover:underline">Sign Up</a></li>
//             <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
//             <li><a href="/about" className="hover:underline">About</a></li>
//             <li><a href="/contact" className="hover:underline">Contact</a></li>
//           </ul>
//         </div>

//         {/* Our Mission */}
//         <div>
//           <h2 className="text-lg font-semibold mb-3 text-white">Our Mission</h2>
//           <p className="text-sm">
//             We aim to make healthcare more accessible and transparent by simplifying how people discover,
//             connect, and consult with medical professionals. No more long queues or uncertainty—just smart, digital healthcare.
//           </p>
//         </div>

//         {/* Contact & Social */}
//         <div>
//           <h2 className="text-lg font-semibold mb-3 text-white">Contact</h2>
//           <ul className="text-sm space-y-2">
//             <li className="flex items-center gap-2"><FaEnvelope /> prakashranjan.pr3636@gmail.com</li>
//             <li className="flex items-center gap-2"><FaPhone /> +91 9576409209</li>
//             <li className="flex items-center gap-2"><FaMapMarkerAlt /> Patna, India</li>
//           </ul>
//           <div className="flex gap-4 mt-4 text-xl">
//             <a href="https://github.com/prakash-pr07" target="_blank" rel="noreferrer" className="hover:text-white"><FaGithub /></a>
//             <a href="https://linkedin.com/in/prakash-ranjan-142382258" target="_blank" rel="noreferrer" className="hover:text-white"><FaLinkedin /></a>
//             <a href="https://leetcode.com/prakash_ranjan07" target="_blank" rel="noreferrer" className="hover:text-white"><SiLeetcode /></a>
//           </div>
//         </div>
//       </div>

//       {/* Footer Bottom */}
//       <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
//         <p>© {new Date().getFullYear()} DocTreat | Built with <FaCode className="inline text-red-500" /> by Prakash Ranjan</p>
//         <a href="#" className="inline-block mt-2 text-sm hover:underline text-gray-400">
//           <FaArrowUp className="inline mr-1" /> Back to Top
//         </a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import { FaGithub, FaLinkedin, FaArrowUp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCode } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-800 to-blue-800 text-gray-300 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* About Us */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-white underline underline-offset-4">About <span className="text-yellow-300">DocTreat</span></h2>
          <p className="text-sm leading-relaxed">
            <span className="text-white font-semibold">DocTreat</span> is a <span className="text-yellow-300 font-semibold">telemedicine platform</span> designed to make healthcare smarter.
            Patients can easily find doctors by <span className="text-white">city</span>, book appointments, chat in real-time, and upload medical records—all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-white underline underline-offset-4">Quick Links</h2>
          <ul className="text-sm space-y-2">
            <li><a href="/" className="hover:underline text-white">🏠 Home</a></li>
            <li><a href="/login" className="hover:underline text-white">🔐 Login</a></li>
            <li><a href="/signup" className="hover:underline text-white">📝 Sign Up</a></li>
            <li><a href="/dashboard" className="hover:underline text-white">📊 Dashboard</a></li>
            <li><a href="/about" className="hover:underline text-white">ℹ️ About</a></li>
            <li><a href="/contact" className="hover:underline text-white">📞 Contact</a></li>
          </ul>
        </div>

        {/* Our Mission */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-white underline underline-offset-4">Our Mission</h2>
          <p className="text-sm leading-relaxed">
            We want to <span className="text-yellow-300 font-semibold">transform access to healthcare</span> by making it more digital, accessible, and hassle-free.
            No more long queues. No more city-wide doctor hunts. Just <span className="font-semibold text-white">smart connections</span> and <span className="text-white font-semibold">better care</span>.
          </p>
        </div>

        {/* Contact & Social */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-white underline underline-offset-4">Contact Me</h2>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2"><FaEnvelope className="text-yellow-300" /> prakashranjan.pr3636@gmail.com</li>
            <li className="flex items-center gap-2"><FaPhone className="text-yellow-300" /> +91 9576409209</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-yellow-300" /> Patna, India</li>
          </ul>
          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://github.com/prakash-pr07" target="_blank" rel="noreferrer" className="hover:text-white"><FaGithub /></a>
            <a href="https://linkedin.com/in/prakash-ranjan-142382258" target="_blank" rel="noreferrer" className="hover:text-white"><FaLinkedin /></a>
            <a href="https://leetcode.com/prakash_ranjan07" target="_blank" rel="noreferrer" className="hover:text-white"><SiLeetcode /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-600 pt-6 text-center text-sm text-gray-300">
        <p>
          © {new Date().getFullYear()} <span className="font-bold text-white">DocTreat</span> | Built with <FaCode className="inline text-red-400" /> by
          <span className="text-yellow-300 font-semibold"> Prakash Ranjan</span>
        </p>
        <a href="#" className="inline-block mt-2 hover:underline text-gray-200">
          <FaArrowUp className="inline mr-1 text-yellow-300" /> Back to Top
        </a>
      </div>
    </footer>
  );
};

export default Footer;
