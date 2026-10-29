const PORTFOLIO_CONFIG = {
  // RESUME LINK:
  // Replace this URL whenever you update your resume (e.g. Google Drive, Dropbox, Notion, GitHub, etc.)
  resumeUrl: "https://drive.google.com/file/d/10ByzI7TW0ICR19J4WTcv4lUSZJ9SxzfX/view?usp=sharing",

  // CONTACT & SOCIAL PROFILES:
  email: "avinashpednekar431@gmail.com",
  github: "https://github.com/avipednekar",
  linkedin: "https://www.linkedin.com/in/avinash-pednekar",
  leetcode: "https://leetcode.com/u/Avinashp2004",
};

// Prevent accidental modification
if (typeof Object.freeze === "function") {
  Object.freeze(PORTFOLIO_CONFIG);
}

// Attach to window object for global browser access
if (typeof window !== "undefined") {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
}
