"use client";
import "./ContactForm.css";
import { useState } from "react";
import { NonceService } from "@/app/utils/nonce.service";
export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    object: "",
    email: "",
    message: "",
  });
  const [hasError, setError] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChanges = (event: { target: { id: string; value: string } }) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/mailer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-fe-nonce": await NonceService.instance.getNonce(),
        },
        body: JSON.stringify(formData),
      });

      setSuccess(response.ok);
      setError(!response.ok);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group mb-3">
        <label className="my-1" htmlFor="name">
          Nome
        </label>
        <input onChange={handleChanges} type="text" className="form-control" id="name" placeholder="Nome" required />
      </div>
      <div className="form-group mb-3">
        <label className="my-1" htmlFor="object">
          Oggetto
        </label>
        <input onChange={handleChanges} type="text" className="form-control" id="object" placeholder="Oggetto" />
      </div>
      <div className="form-group mb-3">
        <label className="my-1" htmlFor="email">
          Email
        </label>
        <input onChange={handleChanges} type="email" className="form-control" id="email" placeholder="Email" required />
      </div>
      <div className="form-group mb-3">
        <label className="my-1" htmlFor="message">
          Messaggio
        </label>
        <textarea onChange={handleChanges} className="form-control" id="message" placeholder="Scrivi il tuo messaggio" required></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Invia
      </button>
      {isLoading && <div className="spinner-border spinner-border-sm mx-3" role="status"></div>}
      {!isLoading && isSuccess && !hasError && (
        <div className="alert alert-success my-3" role="alert">
          Messaggio inviato!
        </div>
      )}
      {!isLoading && !isSuccess && hasError && (
        <div className="alert alert-danger my-3" role="alert">
          Qualcosa è andato storto, riprova più tardi.
        </div>
      )}
    </form>
  );
};
