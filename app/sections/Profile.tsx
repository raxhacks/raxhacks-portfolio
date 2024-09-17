"use client"

import Image from "next/image";
import Section from "../components/Section";

import ProfilePic from "@/public/assets/images/profile.jpeg";

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
    <div className="inline-flex gap-3">
      {buttons.map((button, index) => (
        <button key={index} className="bg-blue-400 text-white
        p-3 rounded-lg hover:bg-blue-600 duration-150">
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
    items-center w-full gap-3 justify-center">
      <h3 className="text-white">
        {dictionary.profile.presentation}
      </h3>
      <h1 className="text-4xl text-center">
        Raymundo Guzmán
      </h1>
      <h2 className="text-2xl">
        {dictionary.profile.jobtitle}
      </h2>
      <Buttons />
    </div>
  )
}

type PictureProps = {}
const Picture: React.FC<PictureProps> = () => {
  return (
    <div className="inline-flex w-full
    justify-center">
      <div className="h-[400px] w-[400px] rounded-full
      overflow-hidden">
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
          <div className="mt-12 lg:mt-0"/>
          <ProfileInfo />
        </div>
      </div>
    </Section>
  )
}

export default Profile;