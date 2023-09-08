"use client";
import Header from "../../components/Header/index.js";
import Canvas from "../../components/Rakugaki/index.js";

const Page = () => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  console.log(screenWidth);
  console.log(screenHeight);
  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <Canvas width={screenWidth} height={screenHeight} />
    </div>
  );
};

export default Page;
