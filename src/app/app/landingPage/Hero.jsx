"use client";

import { useState } from "react";
import styles from "./hero.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useAlert } from "../../components/alert/alertProvider";

export default function Hero() {
    const [showConfirm, setShowConfirm] = useState(false);
    const promoCode = "COMBO25";
    const { showAlert } = useAlert(); // ✅ use custom toast

    const handleCopyClick = () => {
        setShowConfirm(true); 
    };

    const confirmCopy = () => {
        navigator.clipboard.writeText(promoCode); 
        setShowConfirm(false);

        // ✅ Show custom toast instead of alert
        showAlert({
            message: `Promo code "${promoCode}" copied!`,
            type: "success",
            autoDismiss: true,
            duration: 3000
        });
    };

    const cancelCopy = () => {
        setShowConfirm(false);
    };

    return (
        <>
            <div className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    {/* LEFT SECTION */}
                    <div className={styles.heroLeft}>
                        <div className={styles.label}>
                            <div className={styles.avatars}>
                                <Image src="/w1.jpg" alt="user1" width={28} height={28} className={styles.avatarImg} />
                                <Image src="/w2.jpg" alt="user2" width={28} height={28} className={styles.avatarImg} />
                                <Image src="/w3.jpg" alt="user3" width={28} height={28} className={styles.avatarImg} />
                            </div>
                            <p>Trusted by 100k+ women across India</p>
                            <FaStar color="#800D45" size={16} />
                        </div>

                        <h2>
                            Period care that puts <span>you first.</span>
                        </h2>
                        <p className={styles.subtext}>
                            Cramps. Mood swings. Leaks. Still expected to perform? You deserve better support.
                        </p>

                        <div className={styles.promoCode}>
                            <p>Use code: <span>{promoCode}</span></p>
                            <button className={styles.copyBtn} onClick={handleCopyClick}>Copy</button>
                        </div>

                        <button className={styles.exploreBtn}>Explore Our Products</button>

                        <div className={styles.reviewSection}>
                            <div className={styles.rating}>
                                <div className={styles.stars}>
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} color="#ff4c8b" />
                                    ))}
                                </div>
                                <p>4.9/5 from 12k+ reviews</p>
                            </div>
                            <div className={styles.fastDelivery}>
                                <h4>100X</h4>
                                <p>Faster Delivery</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className={styles.heroRight}>
                        <Image src="/1.png" alt="product" width={660} height={650} priority />
                    </div>
                </div>
            </div>

            {/* Confirmation Popup */}
            {showConfirm && (
                <div className={styles.overlay}>
                    <div className={styles.confirmCard}>
                        <h3>Copy Promo Code?</h3>
                        <p>Do you want to copy <strong>{promoCode}</strong> to your clipboard?</p>
                        <div className={styles.confirmButtons}>
                            <button onClick={confirmCopy} className={styles.yesBtn}>Yes</button>
                            <button onClick={cancelCopy} className={styles.noBtn}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
