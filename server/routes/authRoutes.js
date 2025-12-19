import express from "express";
import passport from "passport";

const router = express.Router();

// 1. DYNAMIC URL SETUP
// We explicitly check for the Render Environment Variable
const FRONTEND_URL = process.env.CLIENT_URL;

console.log("🔒 AUTH ROUTE CONFIG:", {
  FRONTEND_URL,
  MODE: process.env.NODE_ENV
});

// 2. GOOGLE STRATEGY
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/` }),
  (req, res) => {
    // 3. EXPLICIT SESSION SAVE
    // We save the session before redirecting to ensure the cookie is ready
    req.session.save((err) => {
      if (err) {
        console.error("❌ Session Save Error:", err);
        return res.redirect(`${FRONTEND_URL}/?error=session_failed`);
      }
      
      // 4. THE FIX: Redirect to Root (/) not /dashboard
      console.log("✅ Auth Success. Redirecting to:", FRONTEND_URL);
      res.redirect(`${FRONTEND_URL}/`); 
    });
  }
);

// 3. GITHUB STRATEGY
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: `${FRONTEND_URL}/` }),
  (req, res) => {
    req.session.save((err) => {
      if (err) {
        console.error("❌ Session Save Error:", err);
        return res.redirect(`${FRONTEND_URL}/?error=session_failed`);
      }
      console.log("✅ Auth Success. Redirecting to:", FRONTEND_URL);
      res.redirect(`${FRONTEND_URL}/`);
    });
  }
);

// 4. SESSION CHECK
router.get("/me", (req, res) => {
  // If user is logged in, send data
  if (req.user) {
    res.json(req.user);
  } else {
    // If not, send 401 (Unauthorized)
    res.status(401).json({ message: "No active session" });
  }
});

// 5. LOGOUT
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Session destroy failed" });
      
      // Clear the specific cookie name
      res.clearCookie("promptstudio.sid");
      res.json({ success: true });
    });
  });
});

export default router;