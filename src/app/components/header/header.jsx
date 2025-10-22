import { BsGift } from "react-icons/bs";
import styles from "./header.module.css";
import Link from "next/link";

export default function Header() {

return (
    <header className={styles.mainHeader}>
        <div className={styles.label}>
            <p>
            <span><BsGift /></span>
            Free delivery on orders above ₹499
            <span> Subscribe & save 10%</span></p>
        </div>
         <nav className={styles.navBar}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.brandName}>
                    <img className="logo"
                        src="logo.png"
                        alt="Logo.png"
                        width={130}
                        height={34}>
                     </img>
                </Link>
                <div className={styles.navLinks}>
                    <ul>
                    <li><Link href="/" className={styles.navLink}>Home</Link></li>
                    <li><Link href="/products" className={styles.navLink}>Products</Link></li>
                    <li><Link href="/contact" className={styles.navLink}>Contact</Link></li>
                    <li><Link href="/about" className={styles.navLink}>About Us</Link></li>
                </ul>
                </div>
                <div>
                    <button className={styles.loginButton}>
                        Login</button>
                </div>
            </div>    
        </nav>
    </header>
)
} 
