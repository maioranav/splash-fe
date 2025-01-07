import styles from "./page.module.scss";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.loginForm}>
      <LoginForm />
    </div>
  );
}
