import React, { useState } from "react";
import { login } from "../api";

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      const res = await login(email, password);
      onLogin(res.token);
    } catch (err) {
      setErr(err.message);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8f9fc, #e9effd)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          margin: "auto",
          padding: "40px 30px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20, color: "#29354d" }}>
          MoodBoard Lite
        </h2>
        <h3 style={{ textAlign: "center", marginBottom: 30 }}>Login</h3>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
              width: "100%",
            }}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
              width: "100%",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              background: "#29354d",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            Login
          </button>
        </form>

        {err && <div style={{ color: "red", marginTop: 10, textAlign: "center" }}>{err}</div>}

        <div
          style={{
            marginTop: 20,
            textAlign: "center",
            color: "#333",
          }}
        >
          Don’t have an account?{" "}
          <button
            onClick={onSwitch}
            style={{
              border: "none",
              background: "none",
              color: "#29354d",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
