import styles from "./page.module.scss";
import { LoginForm } from "./LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className={styles.loginForm}>
      <Image src={"/imgs/logo_splash_tr.webp"} alt="Radio Splash" width={300} height={160} className="mb-4" />
      <LoginForm />
      {
        // eslint-disable-next-line @next/next/no-html-link-for-pages
        <a href="/">Torna al sito</a>
      }
    </div>
  );
}
