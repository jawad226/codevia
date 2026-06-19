"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("Failed to send message. Please try again.");
    }

    // Clear status after 5 seconds
    setTimeout(() => setStatus(""), 5000);
  };

  const contactDetails = [
    {
      icon: <MapPin className="w-5 h-5 text-blue-700" />,
      title: "Address",
      desc: "123 Tech Avenue, Silicon Valley, CA 94043",
    },
    {
      icon: <Mail className="w-5 h-5 text-blue-700" />,
      title: "Email",
      desc: "info@codevia.com",
    },
    {
      icon: <Phone className="w-5 h-5 text-blue-700" />,
      title: "Phone",
      desc: "+92 (319) 0412258",
    },
  ];

  return (
    <section className="min-h-screen bg-white py-18 px-6">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* LEFT PANEL */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-black p-10"
        >
          <h3 className="text-sm tracking-wide uppercase font-semibold mb-2">
            Contact Details
          </h3>
          <h1 className="text-[#4338ca] text-4xl font-extrabold mb-6">
            Our Contacts
          </h1>
          <p className="opacity-90 leading-relaxed mb-10">
            Feel free to call or email us anytime. We respond to all inquiries
            within 24 hours and are always happy to assist you.
          </p>

          <div className="space-y-6">
            {contactDetails.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="p-3 rounded-full bg-blue-100">{item.icon}</div>
                <div>
                  <p className="font-semibold text-black">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl shadow-lg mt-8 text-black bg-gray-100"
        >
          <h3 className="text-[#3730a3] text-sm uppercase font-semibold tracking-wide mb-2">
            Get in Touch
          </h3>
          <h1 className="text-4xl font-bold mb-8">Ready to Get Started?</h1>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {["name", "email"].map((field, i) => (
              <input
                key={i}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                value={form[field as "name" | "email"]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              />
            ))}
          </div>

          <textarea
            name="message"
            placeholder="Message..."
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            type="submit"
            className="flex items-center gap-2 bg-[#3730a3] text-white hover:bg-[#312e81] px-8 py-3 rounded-lg mt-6 transition shadow-lg"
          >
            Send Message <Send className="w-4 h-4" />
          </button>

          {status && (
            <p className="text-gray-600 text-sm mt-3">{status}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
