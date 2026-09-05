import { ArrowRight } from "lucide-react";
import { Container } from "../shared/Container";
import {
  FaTwitter as TwitterIcon,
  FaInstagram as InstagramIcon,
} from "react-icons/fa";
import { FaMeta as MetaIcon } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="w-full bg-[#1A6B4C] text-white pt-16 pb-8 border-t border-[#237c57]">
      <Container>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Left Column: Brand Info & Newsletter (Spans 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <h2 className="text-xl font-black tracking-wider uppercase mb-3 text-white">
              AL ZAGHAW
            </h2>
            <p className="text-xs text-gray-200 font-medium mb-6 max-w-sm leading-relaxed">
              AL ZAGHAW is a forward-thinking company committed to delivering
              high-quality products and services that meet the evolving needs of
              modern customers.
            </p>

            {/* Email Subscription Box */}
            <div className="w-full max-w-sm relative flex items-center mb-6">
              <input
                type="email"
                placeholder="Your Email Here"
                className="w-full bg-[#237c57]/70 border border-white/20 rounded-full py-3 pl-5 pr-14 text-xs text-white placeholder:text-gray-300 focus:outline-none focus:border-white/50"
              />
              <button className="absolute right-1.5 w-8 h-8 rounded-full bg-[#FEF08A] text-gray-900 flex items-center justify-center hover:bg-[#fde047] transition-colors shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-white">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <MetaIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Columns: Links (Spans 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-6">
            {/* Column 1: Delugo */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-white">Delugo</h3>
              <ul className="flex flex-col gap-2.5 text-xs text-gray-200 font-medium">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Updates
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Beta
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Collaboration
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Product */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-white">Product</h3>
              <ul className="flex flex-col gap-2.5 text-xs text-gray-200 font-medium">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Business
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Designers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Classrooms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Newcomers
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Learning */}
            <div>
              <h3 className="text-sm font-bold mb-4 text-white">Learning</h3>
              <ul className="flex flex-col gap-2.5 text-xs text-gray-200 font-medium">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Learn Hub
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Manuals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Communities
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-xs text-gray-300 font-medium">
          Copyright © AL ZAGHAW 2026.
        </div>
      </Container>
    </footer>
  );
}
