// const express = require("express");
// const router = express.Router();

// const hashService = require("../services/hash");
// const blockchain = require("../services/blockchain");
// const storage = require("../storage/articles");

// router.post("/", async (req, res) => {
//   try {
//     const { content } = req.body;

//     if (!content) {
//       return res.status(400).json({ error: "Content required" });
//     }

//     const hash = hashService.hashContent(content);

//     const result = await blockchain.publishNews(hash);

//     storage.addArticle(result.articleId, content);

//     res.json(result);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const hashService = require("../services/hash");
const blockchain = require("../services/blockchain");
const storage = require("../storage/articles");

router.post("/", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Content required" });
    }

    const hash = hashService.hashContent(content);

    const result = await blockchain.publishNews(hash);

    storage.saveArticle(result.articleId, content);

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;