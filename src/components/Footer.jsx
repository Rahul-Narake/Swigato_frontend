import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import React from 'react';

export default function Footer() {
  return (
    <div className="w-full flex flex-col  md:px-44 px-4 mt-6 py-4 bg-gray-100 overflow-hidden">
      <div className="flex justify-between md:pr-8 pt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold italic text-black cursor-pointer">
          SWIGATO
        </h1>
        <div>
          <select
            className="border md:px-4 md:py-1 px-2 rounded-md md:mr-5 mr-3"
            name=""
            id=""
          >
            <option value="">India</option>
          </select>
          <select
            className="border md:px-4 md:py-1 px-2 rounded-md"
            name=""
            id=""
          >
            <option value="">English</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <div className="md:space-y-2">
          <h3 className="text-sm font-light md:text-base md:font-medium text-black cursor-pointer">
            About Swigato
          </h3>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Who We Are
          </p>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Blog
          </p>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Work With Us
          </p>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Investor Relations
          </p>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Report Fraud
          </p>
        </div>
        <div className="md:space-y-2">
          <h3 className="text-sm font-light md:text-base md:font-medium text-black cursor-pointer">
            SWIGOVERSE
          </h3>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Swigato
          </p>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer ">
            Blinkit
          </p>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Feeding India
          </p>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Hyperpure
          </p>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Swigoland
          </p>
        </div>
        <div className="md:space-y-2">
          <h3 className="text-sm font-light md:text-base md:font-medium text-black cursor-pointer">
            FOR RESTAURANTS
          </h3>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Partner with us
          </p>
          <p className="text-sm font-thin md:text-base md:font-normal text-gray-500 cursor-pointer">
            Apps for you
          </p>
        </div>
        <div className="md:space-y-2 md:pr-32 pr-20">
          <h3 className="text-sm font-light md:text-base md:font-medium text-black cursor-pointer">
            Social Networks
          </h3>
          <div className="flex md:space-x-3 space-x-2 justify-between items-center">
            <p>
              <Instagram className="w-[18px] cursor-pointer" />
            </p>
            <p>
              <Facebook className="w-[18px] cursor-pointer" />
            </p>
            <p>
              <Twitter className="w-[18px] cursor-pointer" />
            </p>
            <p>
              <Linkedin className="w-[18px] cursor-pointer" />
            </p>
            <p>
              <Youtube className="w-[18px] cursor-pointer" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
