import React from 'react';

export default function SellerLandingPage() {
  return (
    <div className="w-full flex flex-col md:px-4 px-2 mt-4">
      <div className="w-full h-auto bg-[url('https://b.zmtcdn.com/merchant-onboarding/f57794be6408563354c463c702ab45b91600672364.png')] flex flex-col items-center justify-center py-4 ">
        <h1 className="font-bold text-xl">How it works?</h1>
        <div className="flex md:flex-row flex-wrap md:space-x-4 space-x-2 space-y-2 justify-center">
          <div className="flex flex-col bg-white rounded-md w-60 h-auto space-y-2 p-2">
            <div className="flex justify-center">
              <img
                src="https://b.zmtcdn.com/merchant-onboarding/ecb5e086ee64a4b8b063011537be18171600699886.png"
                alt="pic1"
                className="bg-white"
              />
            </div>
            <p className="text-center text-black font-semibold">Step 1</p>
            <p className="text-center text-black">Create your page on Zomato</p>
            <p className="text-center text-gray-500 text-sm">
              Help users discover your place by creating a listing on Zomato
            </p>
          </div>

          {/* two */}
          <div className="flex flex-col bg-white rounded-sm w-60 h-auto space-y-2 p-2">
            <div className="flex justify-center">
              <img
                src="https://b.zmtcdn.com/merchant-onboarding/71d998231fdaeb0bffe8ff5872edcde81600699935.png"
                alt="pic1"
                className="bg-white"
              />
            </div>
            <p className="text-center text-black font-semibold">Step 2</p>
            <p className="text-center text-black">
              Register for online ordering
            </p>
            <p className="text-center text-gray-500 text-sm">
              And deliver orders to millions of customers with ease
            </p>
          </div>

          {/* three */}
          <div className="flex flex-col bg-white rounded-sm w-60 h-auto space-y-2 p-2">
            <div className="flex justify-center">
              <img
                src="https://b.zmtcdn.com/merchant-onboarding/efdd6ac0cd160a46c97ad58d9bbd73fd1600699950.png"
                alt="pic1"
                className="bg-white"
              />
            </div>
            <p className="text-center text-black font-semibold">Step 3</p>
            <p className="text-center text-black">
              Start receiving orders online
            </p>
            <p className="text-center text-gray-500 text-sm">
              Manage orders on our partner app, web dashboard or API partners
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
