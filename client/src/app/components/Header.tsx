import React from 'react';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import Image from 'next/image';
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {/* Add logo here hihihi */}
        <Image src="" 
        alt="Baby Hippo Restaurant Logo" 
        width={50}
        height={25}
        />
      </div>
      <nav>
      {/* <nav style={{ display: "flex", justifyContent: "center", gap: "20px", padding: "10px", backgroundColor: "#f8f9fa" }}>
            <Link href="/" style={{ textDecoration: "none", color: "#0070f3", fontSize: "18px" }}>Home</Link>
            <Link href="/login" style={{ textDecoration: "none", color: "#0070f3", fontSize: "18px" }}>Login</Link>
            <Link href="/about" style={{ textDecoration: "none", color: "#0070f3", fontSize: "18px" }}>About</Link>
        </nav> */}

        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/login">Sign In & Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
