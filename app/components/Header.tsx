"use client"

import { useDictionary } from "@/lib/dictionary-provider";

import Language_icon from "@/public/assets/svg/Language_icon";

type HamburguerProps = {}
const Hamburguer: React.FC<HamburguerProps> = () => {
  return (
    <button className="text-white text-lg lg:hidden">
      H
    </button>
  )
}

type LanguageSwitcherProps = {}
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = () => {
  // Language import
  const {dictionary} = useDictionary();
  const languages = dictionary.header.languages;
  return (
    <li className="text-white text-2xl relative">
      <Language_icon />
      <div className="bg-white w-[100px] absolute 
      -left-[90px] text-lg hidden">
        {languages.map((language, index) => (
          <button key={index} className="text-black p-3
          hover:bg-[#b4b4b4] w-full">
            {language.name}
          </button>
        ))}
      </div>
    </li>
  )
}

type NavItemsProps = {}
const NavItems: React.FC<NavItemsProps> = () => {
  // Language import
  const {dictionary} = useDictionary();
  const links = [
    {
      name: dictionary.header.about,
      href: "#about"
    },
    {
      name: dictionary.header.experience,
      href: "#experience"
    },
    {
      name: dictionary.header.projects,
      href: "#projects"
    },
    {
      name: dictionary.header.contact,
      href: "#contact"
    }
  ]
  return (
    <div>
      <ul className="nav-links gap-6 hidden
      lg:!flex lg:items-center">
        {links.map((link, index) => (
          <li key={index} className="text-white
          text-2xl inline-block">
            <a href = {link.href}>
              {link.name}
            </a>
          </li>
        ))}
        <LanguageSwitcher />
      </ul>
      <Hamburguer />
    </div>
  )
}

type HeaderProps = {}
const Header: React.FC<HeaderProps> = () => {
  return (
    <nav className="h-[17vh] p-[2rem]
     items-center flex">
      <div className="text-white text-2xl
      flex-grow">
        Raymundo Guzmán
      </div>
      <NavItems />
    </nav>
  )
}

export default Header;