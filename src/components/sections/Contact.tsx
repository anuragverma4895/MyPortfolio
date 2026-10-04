import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { EarthCanvas } from "../canvas";
import { SectionWrapper } from "../../hoc";
import { slideIn } from "../../utils/motion";
import { config } from "../../constants/config";
import { Header } from "../atoms/Header";

const INITIAL_STATE = Object.fromEntries(
  Object.keys(config.contact.form).map((input) => [input, ""])
);

const WHATSAPP_NUMBER = "918874096365"; // India country code + number

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const name = form.name || "Someone";
    const email = form.email || "Not provided";
    const message = form.message || "No message";

    // Build WhatsApp message
    const whatsappMessage = `🔔 *New Portfolio Contact*%0A%0A👤 *Name:* ${encodeURIComponent(name)}%0A📧 *Email:* ${encodeURIComponent(email)}%0A%0A💬 *Message:*%0A${encodeURIComponent(message)}`;

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, "_blank");

    setLoading(false);
    setForm(INITIAL_STATE);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-8 overflow-hidden xl:grid xl:grid-cols-[0.92fr_1fr] xl:items-center xl:gap-10">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="glass-card w-full rounded-2xl p-6 sm:p-8"
      >
        <Header useMotion={false} {...config.contact} />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-5"
        >
          {Object.keys(config.contact.form).map((input) => {
            const { span, placeholder } =
              config.contact.form[input as keyof typeof config.contact.form];
            const Component = input === "message" ? "textarea" : "input";

            return (
              <label key={input} className="flex flex-col">
                <span className="mb-2 text-[14px] font-medium text-white">{span}</span>
                <Component
                  type={input === "email" ? "email" : "text"}
                  name={input}
                  value={form[`${input}`]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="input-glow rounded-lg px-5 py-3 text-[14px] font-medium text-white placeholder:text-secondary/50"
                  style={{
                    background: 'rgba(12, 10, 30, 0.8)',
                  }}
                  {...(input === "message" && { rows: 4 })}
                />
              </label>
            );
          })}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="btn-solid w-fit rounded-xl px-8 py-3 text-[14px] font-bold cursor-pointer flex items-center gap-2 active:scale-95 transition-transform"
            >
              {/* WhatsApp icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {loading ? "Sending..." : "Send via WhatsApp"}
            </button>

            <span className="text-secondary text-[12px]">
              Opens WhatsApp with your message
            </span>
          </div>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="contact-earth w-full h-[330px] md:h-[480px] xl:h-[560px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
