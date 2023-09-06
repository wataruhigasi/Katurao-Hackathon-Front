// import React from "react";
// import { useRouter } from "next/router";

// function Keijiban() {
//   const router = useRouter();
//   const linkToarticle = () => {
//     router.push("/article");
//   };
//   return <button onClick={linkToarticle}>Articles</button>;
// }

// export default Keijiban;

import Link from "next/link";

const Page = () => {
  return (
    <div>
      <h1>掲示板ページ</h1>
      <button className="bg-yellow-900 text-white font-bold py-4 px-6 rounded">
        <Link href="/keijiban/articles">
          aaaa
          {/* <a>記事一覧へ移動</a> */}
        </Link>
      </button>
    </div>
  );
};

export default Page;
