import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-20 py-16">
      <div className="container flex flex-col items-center justify-between mx-auto space-y-4 md:flex-row md:space-y-0">
        {/* Copyright Section */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Usama Forayaje. All rights reserved.
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition "
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition "
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition "
            aria-label="Facebook"
          >
            <Facebook  className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition "
            aria-label="Instagram"
          >
            <Instagram  className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition "
            aria-label="Twitter"
          >
            <Twitter  className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
