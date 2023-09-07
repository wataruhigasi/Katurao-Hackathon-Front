"use client";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white p-4 flex justify-end">
      <button className="rounded-full text-green-500 border border-green-500 font-semibold rounded hover:bg-green-100 px-4 py-2 mr-2">
        <Link href="/keijiban/threads/new">スレッド作成</Link>
      </button>
      <button className="rounded-full text-green-500 border border-green-500 font-semibold rounded hover:bg-green-100 px-4 py-2">
        <Link href="/keijiban/articles/new">記事作成</Link>
      </button>
    </header>
  );
};

export default Header;
