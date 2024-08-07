"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaSquareGithub } from "react-icons/fa6";
import { FaFileDownload } from "react-icons/fa";
import useSectionView from "./useSectionView";
import Link from "next/link";

export default function Hero() {
  const { ref } = useSectionView("home");
  const { scrollY } = useScroll();

  const yImage = useTransform(scrollY, [0, 500], [0, 150]);
  const scaleH1 = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleXButtons = useTransform(scrollY, [0, 500], [1, 0]);
  const opacityButtons = useTransform(scrollY, [0, 500], [1, 0]);
  const yButtons = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section id="home" ref={ref} className="min-h-screen flex items-center justify-center px-3">
      <div className="max-w-xl w-full flex flex-col items-center mb-8 gap-4 sm:gap-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ y: yImage }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src="/portfolio/me-square-bg-white.png"
            alt="mkhotami face"
            width={80}
            height={80}
            className="border-[.3rem] size-[80px] border-gray-200 rounded-full"
            quality={80}
            priority={true}
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ scale: scaleH1 }}
          className="text-2xl font-raleway leading-relaxed text-center sm:text-3xl max-w-lg md:max-w-xl mx-auto"
        >
          My name is <b>Khotami</b>, I am a <b>Fullstack Developer</b> with <b>2 years</b> of experience. Specializing
          in <u>React and Next.js</u>. I enjoy building <i>sites and apps</i>.
        </motion.h1>{" "}
        <motion.div
          style={{ scaleX: scaleXButtons, opacity: opacityButtons, y: yButtons }}
          className="flex gap-2 flex-col sm:flex-row items-center"
        >
          <Link href="#contact">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.3 } }}
              type="button"
              className="group bg-gray-800 text-white px-6 h-10 sm:h-12 rounded-full"
              aria-label="contact me"
            >
              <div className="group-hover:scale-110 flex items-center gap-2 transition">
                Contact Me
                <FaEnvelope />
              </div>
            </motion.button>
          </Link>
          <a title="cv mkhotami" href="/portofolio-saya/CV-KHOTAMI-RAIS.pdf">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.5 } }}
              type="button"
              className="group bg-white text-gray-900 border px-6 h-10 sm:h-12 rounded-full"
              aria-label="contact me"
            >
              <div className="group-hover:scale-110 focus:scale-90 flex items-center gap-2 transition">
                Download CV
                <FaFileDownload />
              </div>
            </motion.button>
          </a>
          <a title="linkedin mkhotami" href="https://www.linkedin.com/in/mkhotami-rais/">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.7 } }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.05 }}
              type="button"
              className="group bg-white text-gray-900 border size-10 sm:size-12 rounded-full flex items-center justify-center"
              aria-label="contact me"
            >
              <FaLinkedin className="group-hover:scale-110 transition" />
            </motion.button>
          </a>
          <a title="github mkhotami" href="https://github.com/mkhotamirais">
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.9 } }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.05 }}
              type="button"
              className="group bg-white text-gray-900 border size-10 sm:size-12 rounded-full flex items-center justify-center"
              aria-label="contact me"
            >
              <FaSquareGithub className="group-hover:scale-110 transition" />
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
