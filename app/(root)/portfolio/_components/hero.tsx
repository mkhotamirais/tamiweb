"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaEnvelope, FaHouse } from "react-icons/fa6";
import { FaFileDownload } from "react-icons/fa";
import useSectionView from "./useSectionView";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useMm } from "@/hooks/useMm";

export default function Hero() {
  const { me, closeMe, openMe } = useMm();

  const { ref } = useSectionView("home");
  const { scrollY } = useScroll();

  const yImage = useTransform(scrollY, [0, 500], [0, 150]);
  const scaleH1 = useTransform(scrollY, [0, 500], [1, 0]);

  const onClick = () => {
    !me ? openMe() : closeMe();
  };

  return (
    <section
      id="home"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-100 to-cyan-500"
    >
      <div className="max-w-xl w-full flex flex-col items-center gap-4 sm:gap-8">
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
        <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} style={{ scale: scaleH1 }}>
          <h1 className="text-2xl font-raleway text-center max-w-lg md:max-w-xl mx-auto">
            I&apos;m <b>Mkhotami</b>, a <b>web developer</b> with expertise in <b>MERN</b> and <b>NextJs</b>. I build
            dynamic, <b>responsive web applications</b> and create seamless user experiences with efficient code.
          </h1>
          <div className="flex gap-2 flex-col sm:flex-row items-center justify-center mt-6">
            <a title="cv mkhotami" href="/portofolio-saya/CV-KHOTAMI-RAIS.pdf">
              <Button type="button" aria-label="contact me" className="rounded-full">
                Download CV
                <FaFileDownload className="ml-2" />
              </Button>
            </a>
            <Button
              title="contact me"
              asChild
              variant={"outline"}
              size={"icon"}
              type="button"
              aria-label="contact me"
              className="rounded-full"
            >
              <Link href="#contact">
                <FaEnvelope />
              </Link>
            </Button>
            <Button onClick={onClick} title="my homepage" variant={"secondary"} size="icon" className="rounded-full">
              <FaHouse />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
