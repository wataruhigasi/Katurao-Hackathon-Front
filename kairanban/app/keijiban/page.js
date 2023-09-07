"use client";
import Header from "../../components/Header/index.js";

const Page = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">
        <span className="font-bold text-blue-500">John:</span>
        <p className="text-gray-700">
          こんにちは、どのようにお手伝いできますか？
        </p>
      </div>
    </div>
  );
};

export default Page;
