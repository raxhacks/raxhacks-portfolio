"use client"

import Image from "next/image";
import Section from "../components/Section";

import ProfilePic from "@/public/assets/images/profile.jpeg";

import Linkedin_icon from "@/public/assets/svg/Linkedin_icon";
import Github_icon from "@/public/assets/svg/Github_icon";

import { useDictionary } from "@/lib/dictionary-provider";

type ButtonsProps = {}
const Buttons: React.FC<ButtonsProps> = () => {
  // Language import
  const {dictionary} = useDictionary();

  const buttons = [
    {
      name: dictionary.profile.downloadcv,
      callback: "#"
    },
    {
      name: dictionary.profile.contactinfo,
      callback: "#"
    }
  ]
  return (
    <div className="inline-flex gap-3 w-full h-auto
    md:flex-row flex-col items-center">
      {buttons.map((button, index) => (
        <button key={index} className="bg-blue-400 text-white
        p-3 rounded-lg hover:bg-blue-600 duration-150 
        w-[150px] sm:w-[200px] md:w-full h-full">
          {button.name}
        </button>
      ))}
    </div>
  )
}

type ProfileInfoProps = {}
const ProfileInfo: React.FC<ProfileInfoProps> = () => {
  // Language import
  const {dictionary} = useDictionary();
  return (
    <div className="inline-flex flex-col
    items-center w-full gap-3 justify-center
    h-auto">
      <h3 className="text-white">
        {dictionary.profile.presentation}
      </h3>
      <h1 className="md:text-4xl text-center
      text-2xl">
        Raymundo Guzmán
      </h1>
      <h2 className="text-base text-center
      md:text-2xl">
        {dictionary.profile.jobtitle}
      </h2>
      <Buttons />
      <div className="flex gap-4">
        <a target='_blank' href="https://www.linkedin.com/in/rgzmn/">
          <Linkedin_icon 
          className="w-8 h-8 
          md:w-[40px] md:h-[40px]"/>
        </a>
        <a target="_blank" href="https://github.com/raxhacks"> 
          <Github_icon 
          className="w-8 h-8 
          md:w-[40px] md:h-[40px]"/>
        </a>
      </div>
    </div>
  )
}

type PictureProps = {}
const Picture: React.FC<PictureProps> = () => {
  return (
    <div className="inline-flex w-full
    justify-center">
      <div className="w-full h-auto rounded-full
      overflow-hidden max-w-[250px] md:max-w-[400px]">
        <Image src={ProfilePic} alt="Profile picture" 
        width={400} height={400}
        className="object-cover w-full h-full"/>
      </div>
    </div>
  )
}

type ProfileProps = {}
const Profile: React.FC<ProfileProps> = () => {
  return (
    <Section>
      <div className={`h-[80vh] w-full
      md:inline-flex md:items-center`}>
        <div className="md:flex w-full
        lg:justify-center">
          <Picture />
          {/* Add a margin top for mobile */}
          <div className="mt-6 md:mt-0 md:ml-6"/>
          <ProfileInfo />
        </div>
      </div>
    </Section>
  )
}

export default Profile;