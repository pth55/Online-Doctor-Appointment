import React from 'react';

function Contact() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl mx-auto mt-5">
      <h1 className="text-4xl font-semibold text-center text-[#FFA500] mb-6">Contact Us</h1>
      
      <p className="text-lg text-gray-700 mb-4">
        We're here to assist you! If you have any questions, concerns, or need more information, please feel free to reach
        out to us. Our dedicated team is always ready to help.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Contact Information */}
        <div className="text-lg text-gray-700">
          <h2 className="text-2xl font-semibold text-[#FFA500] mb-4">Our Contact Information</h2>
          <p><strong>Phone:</strong> +91 998812399</p>
          <p><strong>Email:</strong> contact@hospital.com</p>
          <p><strong>Address:</strong> 29-1-4 Kanuru, Vijayawada, Andhra Pradesh 520007</p>
        </div>

        {/* Contact Form */}
        <div className="text-lg text-gray-700">
          <h2 className="text-2xl font-semibold text-[#FFA500] mb-4">Send Us a Message</h2>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdc357]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdc357]"
            />
            <textarea
              placeholder="Your Message"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fdc357]"
            />
            <button
              type="submit"
              className="bg-[#FFA500] text-white p-3 rounded-lg hover:bg-[#ff8800] transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Maps Location */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#FFA500] mb-4">Our Location..</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            title="Hospital Location"
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.google.com/maps/dir//FMPQ%2BWVG,+Chalasani+Nagar,+Kanuru,+Vijayawada,+Andhra+Pradesh+520007/@16.4872911,80.6072979,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3a35fb173e554b57:0xa655e3faf4247975!2m2!1d80.6896997!2d16.4873072?entry=ttu&g_ep=EgoyMDI0MTEwNS4wIKXMDSoASAFQAw%3D%3D"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <p className="text-lg text-gray-700">
        We look forward to hearing from you and assisting with any healthcare needs. Thank you for choosing us!
      </p>
    </div>
  );
}

export default Contact;
