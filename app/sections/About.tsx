"use client"

import { useDictionary } from "@/lib/dictionary-provider";

import Section from "../components/Section"

import Experience_icon from "@/public/assets/svg/Experience_icon";

import React from 'react';

import Carousel from "../components/Carousel";

type ImageCarouselProps = {}
const ImageCarousel: React.FC<ImageCarouselProps> = () => {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];
  return (
    <div className="w-[80%] h-[40%]">
      <Carousel justify="center">
        {slides.map((slide, index) => (
          <img key={index} src={slide.url} alt="About me" className="object-cover w-full h-full"/>
        ))}
      </Carousel>
    </div>
  )
}


type DescriptionProps = {}
const Description: React.FC<DescriptionProps> = () => {
  // Language import
  const {dictionary} = useDictionary();
  let description = dictionary.about.description;

  description = description.replace(/Scholarvy/g, 
    '<a target="_blank" href="https://www.scholarvy.com" class="text-blue-500 underline">Scholarvy</a>');

  return (
    <div className="text-justify px-4 md:text-sm
    text-xs" 
    dangerouslySetInnerHTML={{ __html: description }} 
    />
  )
}

type AchievementsProps = {}
const Achievements: React.FC<AchievementsProps> = () => {
  // Language import
  const {dictionary} = useDictionary();
  const achievements = dictionary.about.achievements.items;

  return (
    <div className="text-left w-full px-4
    flex-grow">
      <div className="flex gap-2">
        {dictionary.about.achievements.title} <Experience_icon/>
      </div>
      <div className="h-[80%]">
        <Carousel justify="center">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex flex-col gap-2
            w-[300px] md:w-[500px] h-[100px] p-3 md:text-sm text-xs line-clamp-3
            justify-center">
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}


type AboutProps = {}
const About: React.FC<AboutProps> = () => {
  // Language import
  const {dictionary} = useDictionary();

  return (
    <Section>
      <div className="h-full w-full flex flex-col
      items-center gap-6">
        <div className="text-center">
          <h3>
            {dictionary.about.title[0]}
          </h3>
          <h1 className="text-2xl">
            {dictionary.about.title[1]}
          </h1>
        </div>
        <ImageCarousel />
        <Description />
        <Achievements />
      </div>
    </Section>
  )
}

export default About;