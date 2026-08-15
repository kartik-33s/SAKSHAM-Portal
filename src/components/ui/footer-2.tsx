"use client";

import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Linkedin as LinkedinIcon,
  Twitter as TwitterIcon,
} from "lucide-react";
import { buttonVariants } from "./button";
import { PlayStoreButton } from "./play-store-button";
import { AppStoreButton } from "./app-store-button";

const footerLinks = [
  {
    title: "Legal Intelligence",
    links: [
      { href: "#", label: "Know Your Police Rights" },
      { href: "#", label: "Traffic Stop Manual" },
      { href: "#", label: "Arrest & Custody Rights" },
      { href: "#", label: "Zero FIR Filing Guide" },
      { href: "#", label: "Anti-Bribery SOP (1064)" },
      { href: "#", label: "Women Legal Protections" },
    ],
  },
  {
    title: "Statutory Law",
    links: [
      { href: "#", label: "BNSS 2023 Provisions" },
      { href: "#", label: "BNS 2023 Penal Code" },
      { href: "#", label: "Motor Vehicles Act 1988" },
      { href: "#", label: "D.K. Basu Guidelines" },
      { href: "#", label: "Arnesh Kumar 7-Yr Rule" },
      { href: "#", label: "CCTV Mandate (Paramvir Singh)" },
    ],
  },
  {
    title: "Emergency Support",
    links: [
      { href: "tel:112", label: "National Emergency (112)" },
      { href: "tel:15100", label: "NALSA Legal Aid (15100)" },
      { href: "tel:1064", label: "Anti-Corruption Bureau" },
      { href: "tel:1090", label: "Women Safety Helpline" },
      { href: "tel:1098", label: "Child Protection Line" },
      { href: "tel:1930", label: "Cyber Crime Reporting" },
    ],
  },
  {
    title: "Platform & Privacy",
    links: [
      { href: "#", label: "Citizen Terms & Conditions" },
      { href: "#", label: "Local-Only Data Privacy" },
      { href: "#", label: "Audio & GPS Evidence Rules" },
      { href: "#", label: "Legal Disclaimer" },
      { href: "#", label: "Open Source Shield" },
      { href: "#", label: "Contribute to SAKSHAM" },
    ],
  },
];

const socialLinks = [
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: TwitterIcon, href: "https://x.com", label: "Twitter" },
];

export function Footer2() {
  return (
    <footer className="bg-[#1f2224] text-white border-t border-white/10 mt-10 rounded-t-[16px] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Grid container with headings and links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          {footerLinks.map((item, i) => (
            <div key={i}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-[#e60000]">{item.title}</h3>
              <ul className="space-y-2 text-zinc-400 text-sm">
                {item.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-white transition-colors duration-150">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="h-px bg-white/10" />
        
        {/* Social Buttons + App Links */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 items-center">
            {socialLinks.map(({ icon: Icon, href, label }, i) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={buttonVariants({
                  variant: "outline",
                  size: "icon",
                })}
                key={i}
              >
                <Icon className="w-4 h-4 text-zinc-300" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#download-appstore" onClick={(e) => { e.preventDefault(); alert("SAKSHAM iOS App coming soon to App Store."); }}>
              <AppStoreButton />
            </a>

            <a href="#download-playstore" onClick={(e) => { e.preventDefault(); alert("SAKSHAM Android PWA / Play Store ready."); }}>
              <PlayStoreButton />
            </a>
          </div>
        </div>
        
        <div className="h-px bg-white/10" />
        
        <div className="text-center text-xs text-zinc-500 py-5">
          <p>
            © {new Date().getFullYear()} <strong className="text-zinc-300">SAKSHAM Citizen Legal Intelligence</strong>. Grounded in the Constitution of India, BNSS 2023 & BNS 2023.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer2;
