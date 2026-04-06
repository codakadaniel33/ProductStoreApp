import React from 'react';
import { FaTiktok, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-r from-slate-900/50 to-blue-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Media Links */}
          <div className="flex items-center gap-6">
            {/* TikTok */}
            <a
              href="https://vm.tiktok.com/ZS98gy6QF6HNP-pjlc3/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              aria-label="Follow us on TikTok"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-black to-gray-800 group-hover:from-black group-hover:to-gray-700 transition-colors">
                <FaTiktok className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium hidden sm:block">TikTok</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/michy_de_perfume?utm_source=qr&igsh=Y3dxZ2xmNDkyemh0"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              aria-label="Follow us on Instagram"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-orange-500 transition-all duration-300">
                <FaInstagram className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium hidden sm:block">Instagram</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-slate-400 text-sm">
              © {currentYear} Gifted Services. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Follow us for the latest updates and exclusive offers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
