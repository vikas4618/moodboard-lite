const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");
const auth = require("../middleware/auth");

// Helper to get today's date as YYYY-MM-DD (local timezone)
function getTodayDateOnly() {
  const today = new Date();
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0]; // e.g. "2025-11-02"
}

// =====================================
//  POST  /api/moods → Save today's mood
// =====================================
router.post("/", auth, async (req, res) => {
  try {
    const { emojis, imageUrl, color, note } = req.body;
    const user = req.user.id;
    const dateOnly = getTodayDateOnly();

    // Check if a mood already exists for this date
    const existing = await Mood.findOne({ user, dateOnly });

    if (existing) {
      return res.status(400).json({ msg: "Mood for today already exists" });
    }

    // Save a new mood with dateOnly
    const mood = new Mood({
      user,
      emojis,
      imageUrl,
      color,
      note,
      dateOnly,
      date: new Date(),
    });

    await mood.save();
    res.json({ msg: "Mood saved successfully", mood });
  } catch (err) {
    console.error("POST /api/moods error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// =====================================
//  GET  /api/moods → Fetch today's + past moods
// =====================================
router.get("/", auth, async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user.id }).sort({ date: -1 });

    const today = getTodayDateOnly();

    const todayMood = moods.find((m) => m.dateOnly === today);
    const past = moods.filter((m) => m.dateOnly !== today);

    return res.json({
      today: todayMood || null,
      past: past || [],
    });
  } catch (err) {
    console.error("GET /api/moods error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
