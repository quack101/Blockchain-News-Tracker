// const express = require("express");
// const router = express.Router();

// const blockchain = require("../services/blockchain");

// router.get("/:id", async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     const history = await blockchain.getHistory(id);

//     res.json(history);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();

const blockchain = require("../services/blockchain");

// ✅ GET history
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const history = await blockchain.getHistory(id);

    res.json(history);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



