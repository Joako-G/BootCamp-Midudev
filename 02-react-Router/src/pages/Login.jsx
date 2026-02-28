import { NavLink, useNavigate } from "react-router";
import styles from "./Login.module.css";
import { useId } from "react";
import { useAuthStore } from "../store/AuthStore";

export default function Login() {
    const emailId = useId()
    const passwordId = useId()
    const navigate = useNavigate()
    const { login } = useAuthStore()


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get(emailId);
        const password = formData.get(passwordId);

        if ( email && password ) {
            login()
            navigate("/search")
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.titleLogin}>Bienvenido de vuelta</h1>
            <div className={styles.containerLogin}>
                <form onSubmit={handleSubmit} className={styles.formLogin} action="">

                    <label htmlFor={emailId}>Email</label>
                    <input className={styles.formInput} name={emailId} placeholder="Email" id={emailId} type="email" />

                    <label htmlFor={passwordId}>Password</label>
                    <input className={styles.formInput} name={passwordId} placeholder="Password" id={passwordId} type="password" />

                    <div className={styles.check}>
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button>Login</button>

                    <div className={styles.divider}>
                        <NavLink className={styles.navLink} to="/register">Don't have an account?</NavLink>
                    </div>

                    <div className={styles.typeBtn}>
                        <button>Sing up as a developer</button>
                        <button>Sing up as a company</button>
                    </div>
                </form>
            </div>
        </div >
    )
}