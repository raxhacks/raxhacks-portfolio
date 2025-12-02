"use client";

import { Github, Linkedin, Mail, FileText } from 'lucide-react';

export default function Contact() {
  const contactLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/raxhacks',
      bgColor: 'hover:bg-[#333]',
      beforeColor: 'hover:before:bg-[#262626]',
      afterColor: 'hover:after:bg-[#4a4a4a]',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/rgzmn',
      bgColor: 'hover:bg-[#0077b5]',
      beforeColor: 'hover:before:bg-[#005f8f]',
      afterColor: 'hover:after:bg-[#3399cc]',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:raxhacksofficial@gmail.com',
      bgColor: 'hover:bg-[#dd4b39]',
      beforeColor: 'hover:before:bg-[#b33a2b]',
      afterColor: 'hover:after:bg-[#e66a5a]',
    },
    {
      icon: FileText,
      label: 'Resume',
      href: 'https://docs.google.com/document/u/1/export?format=pdf&id=1jZztiTKtB7xbqgQdFPiGFxvj-lcCdoOfAR8NxsMkrLA&token=AC4w5ViCIZrc-K1Eioa_NuRemUQQZrbD4A%3A1764695468200&ouid=102337538904554996674&includes_info_params=true&usp=drive_web&cros_files=false&tab=t.0&inspectorResult=%7B%22pc%22%3A1%2C%22lplc%22%3A77%7D',
      bgColor: 'hover:bg-[#27ae60]',
      beforeColor: 'hover:before:bg-[#1e8449]',
      afterColor: 'hover:after:bg-[#52be80]',
      targetBlank: false,
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ul className="flex m-0 p-0 list-none">
        {contactLinks.map((link) => (
          <li key={link.label} className="mx-[5px] group">
            <a
              href={link.href}
              target={'targetBlank' in link && link.targetBlank === false ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className={`
                relative block w-[210px] h-[80px] bg-white text-left pl-5
                -rotate-[30deg] skew-x-[25deg]
                transition-all duration-500
                shadow-[-20px_20px_10px_rgba(0,0,0,0.5)]
                hover:translate-x-5 hover:-translate-y-4
                hover:shadow-[-50px_50px_50px_rgba(0,0,0,0.5)]
                ${link.bgColor}
                before:content-[''] before:absolute before:top-0 before:-left-5
                before:h-full before:w-5 before:bg-[#b1b1b1]
                before:skew-y-[-45deg] before:origin-top-right
                before:transition-all before:duration-500
                ${link.beforeColor}
                after:content-[''] after:absolute after:-bottom-5 after:left-0
                after:h-5 after:w-full after:bg-[#b1b1b1]
                after:skew-x-[-45deg] after:origin-top-left
                after:transition-all after:duration-500
                ${link.afterColor}
                no-underline
              `}
            >
              <div className="flex items-center h-full">
                <link.icon 
                  className="w-8 h-8 text-[#262626] transition-colors duration-500 mr-3 group-hover:text-white shrink-0" 
                />
                <span 
                  className="text-[#262626] text-sm tracking-[2px] transition-colors duration-500 group-hover:text-white"
                >
                  {link.label}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}