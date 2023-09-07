"use client";
import Link from "next/link";

const DoneButton = () => {
  return (
    <button className="rounded-full text-green-500 border border-green-500 font-semibold rounded hover:bg-green-100 px-4 py-2 mr-2">
      <Link href="/keijiban/">投稿</Link>
    </button>
  );
};

export default DoneButton;
