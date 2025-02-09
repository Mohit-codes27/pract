// import React from 'react'

// export default function About() {
//   return (
//       <div className="py-16 bg-[#eff7fc]">
//           <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
//               <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
//                   <div className="md:5/12 lg:w-5/12">
//                       <img
//                           src="https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?cs=srgb&dl=pexels-canvastudio-3153201.jpg&fm=jpg"
//                           alt="image"
//                       />
//                   </div>
//                   <div className="md:7/12 lg:w-6/12">
//                       <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
//                           React development is carried out by passionate developers
//                       </h2>
//                       <p className="mt-6 text-gray-600">
//                           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem
//                           accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde
//                           aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!
//                       </p>
//                       <p className="mt-4 text-gray-600">
//                           Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at?
//                           Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.
//                       </p>
//                   </div>
//               </div>
//           </div>
//       </div>
//   );
// }

import { Link } from "react-router-dom"; // Corrected import
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react"; // Added WhatsApp icon

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <input type="text" placeholder="Your Name" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <input type="email" placeholder="Your Email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <textarea placeholder="Your Message" rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
            </div>
            <button type="submit" className="w-full bg-[#0a66c2] text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600">
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 mt-1 text-[#0a66c2]" />
              <div>
                <h3 className="font-semibold">Team Availability</h3>
                <p className="text-gray-600">Monday to Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 mt-1 text-[#0a66c2]" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <a href="mailto:internswallah@gmail.com" className="text-[#0a66c2] hover:underline">
                  internswallah@gmail.com
                </a>
              </div>
            </div>

            {/* WhatsApp Contact Section */}
            <div className="flex items-start space-x-3">
              <MessageCircle className="w-5 h-5 mt-1 text-[#0a66c2]" />
              <div>
                <h3 className="font-semibold">Message Us on WhatsApp</h3>
                <a
                  href="https://wa.me/917011989792"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0a66c2] hover:underline"
                >
                  Chat with us...
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex-1">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 text-[#0a66c2]" />
                  <div>
                    <h3 className="font-semibold">Office Address</h3>
                    <p className="text-gray-600">123 Tech Park, Innovation Street</p>
                    <p className="text-gray-600">Silicon Valley, CA 94000</p>
                  </div>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="flex-1">
                <iframe
                  className="w-full h-full rounded-md shadow-md"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.54005991464!2d77.04416915996975!3d28.527252733620696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1739043697188!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


