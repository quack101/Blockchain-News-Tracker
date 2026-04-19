const express = require("express");
const router = express.Router();

const blockchain = require("../services/blockchain");
const storage = require("../storage/articles");

// ✅ GET article by ID (SMART: Always returns the LATEST version)
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Get full history of this chain
    const history = await blockchain.getHistory(id);

    if (!history || history.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    // The last item in the history array is the current latest version
    const latestVersion = history[history.length - 1];

    // Get off-chain content for the latest version
    const content = storage.getContent(latestVersion.id);

    res.json({
      ...latestVersion,
      content: content || null,
      versionNumber: history.length, // Let the frontend know which version this is
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
