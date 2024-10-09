import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <h3>Baby Hippo Restaurant</h3>
        <p>1234, Ho Chi Minh City</p>
        <p>Phone: 0900111222</p>
        <p>Email: babyhippo@gmail.com</p>
      </div>
      <div className={styles.socialLinks}>
        <a href="https://youtube.com">YouTube</a>
        <a href="https://facebook.com">Facebook</a>
        <a href="https://instagram.com">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
