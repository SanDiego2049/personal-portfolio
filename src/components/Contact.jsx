import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const serviceID = "service_yi5mafl";
      const templateID = "template_53etai6";
      const userID = "w45_OTiEFmmlREKb3";

      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        message: formData.message,
      };

      // Import EmailJS dynamically to avoid build issues
      const emailjs = await import("@emailjs/browser");

      // Send email using EmailJS
      await emailjs.default.send(serviceID, templateID, templateParams, userID);

      setSubmitStatus("success");
      setFormData({ fullName: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="px-6 sm:px-8 md:px-12 py-8 flex flex-col items-center justify-center"
    >
      <div className="max-w-7xl w-full text-center">
        {/* Title Section */}
        <div className="flex items-center justify-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight relative inline-block">
            Get In Touch
            {/* Decorative underline/element */}
            <span className="absolute bottom-0 left-0 w-full h-1.5 sm:h-2 bg-gradient-to-r from-purple-500 to-blue-500 opacity-30"></span>
          </h2>
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6 sm:gap-y-8 max-w-lg mx-auto md:max-w-full">
          {/* Full Name Input */}
          <div className="flex flex-col items-start">
            <label
              htmlFor="fullName"
              className="text-lg sm:text-xl md:text-2xl font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter Your Name"
              className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 pb-2 focus:outline-none focus:border-white text-base sm:text-lg"
              required
            />
          </div>
          {/* Mail Input */}
          <div className="flex flex-col items-start">
            <label
              htmlFor="email"
              className="text-lg sm:text-xl md:text-2xl font-semibold mb-2"
            >
              Mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Mail"
              className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 pb-2 focus:outline-none focus:border-white text-base sm:text-lg"
              required
            />
          </div>
          {/* Message Input */}
          <div className="md:col-span-2 flex flex-col items-start">
            <label
              htmlFor="message"
              className="text-lg sm:text-xl md:text-2xl font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Don't Be Shy, Write A Message And Send It Now"
              rows="4"
              className="w-full bg-transparent border-b border-gray-600 text-white placeholder-gray-500 pb-2 focus:outline-none focus:border-white text-base sm:text-lg resize-none"
              required
            ></textarea>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <div className="md:col-span-2 text-center">
              <p className="text-green-500 font-semibold">
                Message sent successfully! 🎉
              </p>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="md:col-span-2 text-center">
              <p className="text-red-500 font-semibold">
                Failed to send message. Please try again.
              </p>
            </div>
          )}

          <div className="md:col-span-2 text-center mt-6 sm:mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-white text-black"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
