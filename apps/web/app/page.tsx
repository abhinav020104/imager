"use client";

import { motion } from "framer-motion";
import { CameraIcon, UserIcon, SmileIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../@#/components/ui/carousel";

import pic1 from "../assets/photo1.jpg";
import pic2 from "../assets/photo2.jpg";
import pic3 from "../assets/photo3.jpg";
import pic4 from "../assets/photo4.jpg";

import CursorBlob from "@#/components/CursorBlob";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 text-gray-800 overflow-hidden">
      <CursorBlob />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-[500px] flex flex-col items-center justify-center text-center px-6 mt-0"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-indigo-600">
          Transform Your Photos with <span className="text-purple-600">AI Magic</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-600">
          Upload your photo and let AI create professional, casual, and creative portraits in seconds.
        </p>
        <a href="#choose-style">
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-lg hover:from-indigo-600 hover:to-purple-600 transition">
            Dive In Now!
          </button>
        </a>
      </motion.section>

      <section id="choose-style" className="min-h-screen py-10 scroll-mt-20">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-indigo-700"
        >
          Pick Your Perfect Look
        </motion.h2>

        <div className="flex w-full items-center justify-center">
          <Carousel opts={{ align: "start" }} className="w-full max-w-4xl">
            <CarouselContent className="flex">
              <CarouselItem className="basis-1/2 flex items-center justify-center p-4">
                <img
                  src={pic3.src}
                  alt="Image 3"
                  className="w-full h-[500px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </CarouselItem>
              <CarouselItem className="basis-1/2 flex items-center justify-center p-4">
                <img
                  src={pic2.src}
                  alt="Image 2"
                  className="w-full h-[500px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </CarouselItem>
              <CarouselItem className="basis-1/2 flex items-center justify-center p-4">
                <img
                  src={pic1.src}
                  alt="Image 1"
                  className="w-full h-[500px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </CarouselItem>
              <CarouselItem className="basis-1/2 flex items-center justify-center p-4">
                <img
                  src={pic4.src}
                  alt="Image 4"
                  className="w-full h-[500px] object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      <section className="py-10">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-12 text-indigo-700"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {[
            { icon: <CameraIcon size={36} />, title: "Upload Your Photo", description: "Choose your best photo to start with." },
            { icon: <SmileIcon size={36} />, title: "AI Enhances It", description: "Let our AI add magic touches." },
            { icon: <UserIcon size={36} />, title: "Download & Share", description: "Get your new portraits and share them!" },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center flex flex-col items-center hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
