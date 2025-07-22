import React from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-600">CONTACT US</h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto mt-2 mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800">
          We’re here to help you grow!
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Have questions about internships, mentorships, or job listings?
        </p>
        <p className="text-lg text-gray-600">
          Reach out anytime — we're available 24/7!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        {/* Contact Info */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Get In Touch
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">
                    support@internswallah.com
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-500">+91 70119 89792</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Office</p>
                  <p className="text-sm text-gray-500">
                    Internswallah HQ
                    <br />
                    New Delhi, India
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MessageCircle className="h-6 w-6 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">WhatsApp</p>
                  <a
                    href="https://wa.me/917011989792"
                    className="inline-flex items-center px-4 py-2 mt-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Chat with Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send a Message
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Jane Intern"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your contact number"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="How can we assist you?"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Google Maps */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Find Us Here</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.48429062043!2d77.06889736546224!3d28.52758200762379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3a887fefcc5%3A0x63bb4315ef5e7a54!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1717755555555!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Internswallah Location"
              className="rounded-md"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
