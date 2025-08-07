import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

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
      const emailjs = await import("@emailjs/browser");

      await emailjs.default.send(
        "service_yi5mafl",
        "template_53etai6",
        {
          from_name: formData.fullName,
          from_email: formData.email,
          message: formData.message,
        },
        "w45_OTiEFmmlREKb3"
      );

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
      ref={sectionRef}
      id="contact"
      className="px-6 sm:px-8 md:px-12 py-8 flex flex-col items-center justify-center font-inter"
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold relative inline-block leading-tight">
          Get In Touch
          <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 rounded-full"></span>
        </h2>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl md:max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* Full Name */}
        <div className="flex flex-col">
          <label
            htmlFor="fullName"
            className="text-base sm:text-lg font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Your name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full bg-transparent border-b border-gray-700 text-white placeholder-gray-500 py-2 focus:outline-none focus:border-white transition-all duration-300"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="text-base sm:text-lg font-semibold mb-2"
          >
            Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Mail"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-transparent border-b border-gray-700 text-white placeholder-gray-500 py-2 focus:outline-none focus:border-white transition-all duration-300"
            required
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2 flex flex-col">
          <label
            htmlFor="message"
            className="text-base sm:text-lg font-semibold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Don't be shy, drop a message..."
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full bg-transparent border-b border-gray-700 text-white placeholder-gray-500 py-2 resize-none focus:outline-none focus:border-white transition-all duration-300"
            required
          ></textarea>
        </div>

        {/* Feedback Status */}
        {submitStatus && (
          <div className="md:col-span-2 text-center">
            <p
              className={`font-semibold ${
                submitStatus === "success" ? "text-green-400" : "text-red-500"
              }`}
            >
              {submitStatus === "success"
                ? "Message sent successfully! 🎉"
                : "Failed to send message. Please try again."}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-full text-base sm:text-lg font-semibold shadow-xl transition-all duration-300 transform ${
              isSubmitting
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-white text-black hover:shadow-2xl hover:-translate-y-1"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
