"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const Header = () => {
  return (
    <header className={styles.headerStyle}>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>
          <Link href="/keijiban/threads/new">スレッド作成</Link>
        </button>
        <button className={styles.button}>
          <Link href="/keijiban/articles/new">記事作成</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
