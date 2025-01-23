import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-netflix-dark text-gray-400 py-8 mt-16">
      <div className="container mx-auto px-4">
        {/* Social Media Icons */}
        <div className="flex gap-6 mb-8">
          <a href="#" className="hover:text-white transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Youtube className="w-6 h-6" />
          </a>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="#" className="block hover:text-white">Audio Description</Link>
            <Link to="#" className="block hover:text-white">Gift Cards</Link>
            <Link to="#" className="block hover:text-white">Investor Relations</Link>
          </div>
          <div className="space-y-4">
            <Link to="#" className="block hover:text-white">Terms of Use</Link>
            <Link to="#" className="block hover:text-white">Legal Notices</Link>
            <Link to="#" className="block hover:text-white">Corporate Information</Link>
          </div>
          <div className="space-y-4">
            <Link to="#" className="block hover:text-white">Help Center</Link>
            <Link to="#" className="block hover:text-white">Media Center</Link>
            <Link to="#" className="block hover:text-white">Jobs</Link>
          </div>
          <div className="space-y-4">
            <Link to="#" className="block hover:text-white">Privacy</Link>
            <Link to="#" className="block hover:text-white">Cookie Preferences</Link>
            <Link to="#" className="block hover:text-white">Contact Us</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-sm">
          © 2023-2025 Ceeflix.
        </div>
      </div>
    </footer>
  );
};