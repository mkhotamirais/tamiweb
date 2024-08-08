import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa6";

export default function ContactUs() {
  return (
    <section className="bg-gray-50 min-h-[50vh] relative overflow-hidden flex items-center justify-center">
      <div className="absolute z-20 bg-black/50 inset-0" />
      <Image
        src="/school-1/uns-hero-image.jpg"
        width={1000}
        height={700}
        alt="school building"
        className="absolute z-10 w-full h-full object-cover object-center"
      />
      <div className="relative z-30 py-12 max-w-xl text-gray-200">
        <div className="px-3">
          <h3 className="font-merriweather text-2xl text-center font-semibold mb-2">Contact Form</h3>
          <p className="text-sm text-gray-200 text-center">
            You may contact us directly by phone at <span className="font-semibold text-blue-300">(123) 456-7890</span>,
            via email at <span className="text-blue-300 font-semibold">ahmad.rafi@bluefieldhigh.edu</span>, or through
            the contact form below:{" "}
          </p>
        </div>
        <form action="" className="my-4 px-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <input type="text" className="border rounded p-2 bg-black/50" placeholder="Your name" />
            <input type="email" className="border rounded p-2 bg-black/50" placeholder="example@gmail.com" />
          </div>
          <textarea name="" id="" className="h-48 rounded w-full bg-black/50 border p-2" placeholder="Your message" />
          <button
            type="button"
            aria-label="send email"
            className="flex items-center gap-2 px-5 border bg-black/50 border-blue-500 p-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Send
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </section>
  );
}
