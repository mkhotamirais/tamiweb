"use client";

import useSectionView from "./useSectionView";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Title } from "./components";
import EmailSendBtn from "./email-send-btn";
import { emailAction } from "./email-action";

export default function Contact() {
  const { ref } = useSectionView("contact");

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      ref={ref}
      className="scroll-mt-16 sm:scroll-mt-24 w-[min(100%,38rem)] mx-auto px-3 mb-24"
    >
      <Title>Contact Me</Title>
      <p className="text-center -mt-3">
        You may reach me directly via email at{" "}
        <a href="mailto:tami01.job@gmail.com" className="underline">
          tami01.job@gmail.com
        </a>{" "}
        or through the contact form provided below.
      </p>
      <form
        action={async (formData) => {
          const { data } = await emailAction(formData);
          if (data?.error) {
            toast.error(data?.error?.message);
            return;
          }
          toast.success("Email send successfully!");
        }}
        className="mt-10 flex flex-col"
      >
        <input
          id="sender"
          name="sender"
          type="email"
          required
          maxLength={500}
          placeholder="example@gmail.com"
          className="h-14 rounded-lg bg-inherit border border-black/10 dark:border-white/50 p-4"
        />
        <textarea
          id="message"
          name="message"
          required
          maxLength={2000}
          placeholder="your message"
          className="h-52 my-3 bg-inherit rounded-lg border border-black/10 dark:border-white/50 p-4"
        ></textarea>
        <EmailSendBtn />
      </form>
    </motion.section>
  );
}
