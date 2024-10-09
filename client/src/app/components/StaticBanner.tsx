"use client";
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';

const dishes = [
  "",
  "",
  ""
];

const StaticBanner = () => {
  const [currentDish, setCurrentDish] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDish((prev) => (prev + 1) % dishes.length);
    }, 2000); // Change image every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.banner}>
      <h1>Welcome to Baby Hippo restaurant!!!</h1>
      <p>Here we offer a variety of delicious dishes:</p>
      <Image src=""
       alt="background res"
        width={500} height={300} />

      <p>
        <span className={styles.cuisineType}>elegant Western cuisine...</span>
      </p>
      <Image
        src={dishes[currentDish]}
        alt="Dish"
        width={500}
        height={300}
        className={styles.dishImage}
      />
    </div>
  );
};

export default StaticBanner;



