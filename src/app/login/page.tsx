import styles from "./page.module.css";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.loginForm}>
      <LoginForm />
    </div>
  );
}
