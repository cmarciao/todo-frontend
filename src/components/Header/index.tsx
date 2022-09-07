import logoImg from "../../assets/logo.svg";

import styles from "./styles.module.css";

export function Header() {
    return (
        <header className={styles.header}>
            <img src={logoImg} alt="" />
            <div>
                <h1>to</h1>
                <h1>do</h1>
            </div>
        </header>
    )
}