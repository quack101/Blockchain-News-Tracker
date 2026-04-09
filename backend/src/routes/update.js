// const express = require("express");
// const router = express.Router();

// const hashService = require("../services/hash");
// const blockchain = require("../services/blockchain");

// router.post("/", async (req, res) => {
//   try {
//     const { id, content } = req.body;

//     const hash = hashService.hashContent(content);

//     const result = await blockchain.updateNews(id, hash);

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

router.post("/", async (req, res) => {
  try {
    const { id, content } = req.body;

    const hash = hashService.hashContent(content);

    const result = await blockchain.updateNews(id, hash);

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;