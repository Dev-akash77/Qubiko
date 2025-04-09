import React from "react";
import Header_p from "../UI/Header_p";
import { FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GrLanguage } from "react-icons/gr";
const Contact = () => {
  return (
    <div className="min-h-[100dvh] w-screen cc">
      <div className="mobile_Screen md:border md:rounded-md cc overflow-hidden">
        <div className="h-full overflow-hidden cc w-full">
          <div className="container h-full">
            <Header_p text="Contact" logo={false} />
            <div className="cc w-full gap-5">
              <a
                href="https://wa.me/918101602709?text=Hi%2C%20I%20want%20to%20build%20a%20web%20app%20%2F%20website!"
                target="_blank"
                rel="noopener noreferrer"
                className="border-gray-200 border-2 rounded-lg px-5 py-4 w-full flex items-center gap-4 mt-5"
              >
                <FaWhatsapp className="text-blue-700 text-2xl" />
                <h2 className="font-semibold">WhatsApp</h2>
              </a>

              <a
                href="https://www.instagram.com/akash_biswa_s/"
                target="_blank"
                className="border-gray-200 border-2 rounded-lg px-5 py-4 w-full flex items-center gap-4"
              >
                <AiFillInstagram className="text-blue-700 text-2xl" />
                <h2 className="font-semibold">Instagram</h2>
              </a>

              <a
                href="https://github.com/Dev-akash77"
                target="_blank"
                className="border-gray-200 border-2 rounded-lg px-5 py-4 w-full flex items-center gap-4"
              >
                <FaGithub className="text-blue-700 text-2xl" />
                <h2 className="font-semibold">Github</h2>
              </a>

              <a
                href="https://www.linkedin.com/in/akash-biswas-486435289/"
                target="_blank"
                className="border-gray-200 border-2 rounded-lg px-5 py-4 w-full flex items-center gap-4"
              >
                <FaLinkedin className="text-blue-700 text-2xl" />
                <h2 className="font-semibold">Linkedin</h2>
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=100044966861269"
                target="_blank"
                className="border-gray-200 border-2 rounded-lg px-5 py-4 w-full flex items-center gap-4"
              >
                <FaFacebook className="text-blue-700 text-2xl" />
                <h2 className="font-semibold">Facebook</h2>
              </a>

              <a
                href="https://akash-biswas.netlify.app/"
                target="_blank"
                className="border-gray-200 border-2 rounded-lg px-5 py-4 w-full flex items-center gap-4"
              >
                <GrLanguage className="text-blue-700 text-2xl" />
                <h2 className="font-semibold">Website</h2>
              </a>

              <a
                href="mailto:akashrahul2006@gmail.com"
                target="_blank"
                className="border-gray-200 border-2 rounded-lg px-5 py-4 w-full flex items-center gap-4"
              >
                <MdEmail className="text-blue-700 text-2xl" />
                <h2 className="font-semibold">Email</h2>
              </a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
