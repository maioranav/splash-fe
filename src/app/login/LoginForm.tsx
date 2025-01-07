"use client";
import { myTokenFetch } from "@/lib/admin-features/loginSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useReCaptcha } from "next-recaptcha-v3";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const LoginForm = () => {
  const loginSlice = useAppSelector((store) => store.login);
  const [username, setUserName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const { executeRecaptcha } = useReCaptcha();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username && password) dispatch(myTokenFetch({ username, password, gRecaptcha: await executeRecaptcha("form_submit") }));
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e);
    const { id, value } = e.target as HTMLInputElement;
    if (id === "username") {
      setUserName(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  useEffect(() => {
    if (loginSlice.token && loginSlice.status === "idle") redirect("/admin");
  }, [loginSlice]);

  return (
    <>
      {
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input type="text" className="form-control" id="username" required onChange={(e) => handleChange(e)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" required onChange={(e) => handleChange(e)} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loginSlice.status == "loading"}>
            {loginSlice.status == "loading" ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
          {loginSlice.status == "failed" && (
            <div className="alert alert-danger my-3" role="alert">
              Unable to login
            </div>
          )}
        </form>
      }
    </>
  );
};
