import React from 'react';
import styles from './LoginHeader.module.css';

const LoginHeader = (props) => {
    return (
        <div>
            <span className={styles.logo}>j</span>
            <span><svg width="52" height="52" className={styles.circle1}>
            <circle cx="26" cy="26" r="25" fill="#1F4F7B" opacity="0.4" />
            </svg></span>
            <span><svg width="52" height="52" className={styles.circle2}>
            <circle cx="26" cy="26" r="25" fill="#1F4F7B" opacity="0.4" />
            </svg></span>
            <span className={styles.logo}>l</span>
            <span className={styles.logo}>e</span>
            <p className={styles.slogan}>Building Product Selection Platform</p>
        </div>
    )
}

export default LoginHeader;