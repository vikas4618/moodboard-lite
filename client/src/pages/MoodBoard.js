import React, { useState, useEffect } from "react";
import { API } from "../api";

function MoodBoard({ token }) {
  const [todayMood, setTodayMood] = useState(null);
  const [pastMoods, setPastMoods] = useState([]);
  const [emoji, setEmoji] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMoods();
  }, []);

  async function fetchMoods() {
    try {
      const res = await fetch(`${API}/api/moods`, {
        headers: { "x-auth-token": token },
      });
      const data = await res.json();
      setTodayMood(data.today || null);
      setPastMoods(data.past || []);
    } catch (err) {
      console.error("Fetch moods error:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (todayMood) {
      setMessage("You already entered your mood today! 😊");
      return;
    }

    try {
      const res = await fetch(`${API}/api/moods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ emojis: emoji, imageUrl, color, note }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Mood saved successfully!");
        setEmoji("");
        setImageUrl("");
        setColor("#ffffff");
        setNote("");
        await fetchMoods();
      } else if (data.msg && data.msg.toLowerCase().includes("already exists")) {
        setMessage("You already entered your mood today! 😊");
        await fetchMoods();
      } else {
        setMessage(data.msg || "Failed to save mood");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error saving mood");
    }
  }

  return (
    <div
      style={{
        minHeight: "10vh",
        background: "linear-gradient(135deg, #f8f9fc, #e9effd)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "4px 2px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          width: "200%",
          maxWidth: "800px",
          background: "white",
          padding: "40px",
          borderRadius: "56px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#29354d", marginBottom: 25 }}>
          Enter Your Mood
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <label>
            Emojis (space separated):
            <input
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="😄 🙂"
              required
              disabled={!!todayMood}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "4px",
              }}
            />
          </label>

          <label>
            Image/GIF URL:
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              disabled={!!todayMood}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "4px",
              }}
            />
          </label>

          <label>
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              disabled={!!todayMood}
              style={{
                width: "60px",
                height: "35px",
                border: "none",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            />
          </label>

          <label>
            Note (max 200):
            <textarea
              value={note}
              maxLength={200}
              onChange={(e) => setNote(e.target.value)}
              disabled={!!todayMood}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "4px",
              }}
            />
          </label>

          <button
            type="submit"
            disabled={!!todayMood}
            style={{
              background: todayMood ? "#ccc" : "#29354d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "16px",
              cursor: todayMood ? "not-allowed" : "pointer",
              marginTop: "10px",
            }}
          >
            {todayMood ? "Already Entered 🔒" : "Save Mood"}
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 15,
              textAlign: "center",
              color: message.includes("success") ? "green" : "red",
              fontWeight: 500,
            }}
          >
            {message}
          </p>
        )}

        <div style={{ marginTop: 30 }}>
          <h3 style={{ color: "#29354d" }}>Today's Mood</h3>
          {todayMood ? (
            <div
              style={{
                backgroundColor: todayMood.color || "#fff",
                padding: "15px",
                borderRadius: "8px",
                marginTop: "8px",
              }}
            >
              <p>
                <strong>Emojis:</strong> {todayMood.emojis || "—"}
              </p>
              <p>
                <strong>Note:</strong> {todayMood.note || "—"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(todayMood.date).toLocaleString()}
              </p>
            </div>
          ) : (
            <p>No mood entered today yet.</p>
          )}
        </div>

        <div style={{ marginTop: 30 }}>
          <h3 style={{ color: "#29354d" }}>Past Moods</h3>
          {pastMoods.length === 0 ? (
            <p>No past moods</p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {pastMoods.map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: "#f6f7fb",
                    padding: "12px",
                    borderRadius: "8px",
                  }}
                >
                  <p>
                    <strong>{m.emojis}</strong> — {m.note}
                  </p>
                  <small>{new Date(m.date).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoodBoard;
