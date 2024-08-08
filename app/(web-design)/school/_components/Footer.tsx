import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaMapLocation,
  FaPhone,
  FaSchool,
  FaTwitter,
} from "react-icons/fa6";
import { menu } from "./Header";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white mt-auto px-3 md:px-12 lg:px-24 pt-12">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Information */}
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-4 flex flex-col gap-2 font-merriweather">
              <FaSchool className="text-3xl" />
              Bluefield High School
            </h2>
            <p className="text-sm text-blue-200">
              At Bluefield Highschool, we are committed to providing a nurturing and innovative learning environment.
            </p>
            <div className="flex space-x-4 mt-8">
              <a href="https://facebook.com" title="social" className="text-white hover:text-blue-400">
                <FaFacebookF size={16} />
              </a>
              <a href="https://twitter.com" title="social" className="text-white hover:text-blue-400">
                <FaTwitter size={16} />
              </a>
              <a href="https://instagram.com" title="social" className="text-white hover:text-blue-400">
                <FaInstagram size={16} />
              </a>
              <a href="https://linkedin.com" title="social" className="text-white hover:text-blue-400">
                <FaLinkedin size={16} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-4 font-merriweather">Quick Links</h2>
            <ul className="text-sm flex flex-col gap-2">
              {menu.map((item, index) => (
                <li key={index}>
                  <a href="/about-us" className="text-blue-300 capitalize hover:text-white transition-all">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Social Media Links */}
          <div className="col-span-1">
            <h2 className="text-lg font-semibold mb-4 font-merriweather">Contact Us</h2>
            <div className="text-sm text-blue-100 flex flex-col gap-3">
              <div>
                <FaMapLocation className="inline mr-2" />
                <span>1234 School Lane, Bluefield, State, 12345</span>
              </div>
              <div>
                <FaEnvelope className="inline mr-2" />
                <a href="mailto:ahmad.rafi@bluefieldhigh.edu" className="underline">
                  ahmad.rafi@bluefieldhigh.edu
                </a>
              </div>
              <div>
                <FaPhone className="inline mr-2" /> (123) 456-7890
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center py-4">
          <small>
            &copy; {new Date().getFullYear()}{" "}
            <Link href="" className="text-blue-400 font-semibold hover:underline">
              Bluefield High School
            </Link>
            . All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
