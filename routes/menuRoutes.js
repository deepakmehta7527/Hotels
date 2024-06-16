const express = require("express");
const router = express.Router();

const menu = require("./../models/menu");

router.post("/", async (req, res) => {
  try {
    var menuitem = req.body;
    var menudata = new menu(menuitem);
    var datasave = await menudata.save();
    console.log("data save successfully");
    res.status(200).json(datasave);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    var menuitem = await menu.find();
    console.log("data found");
    res.status(200).json(menuitem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:menuitem", async (req, res) => {
  try {
    const menuitem = req.params.menuitem;
    if (menuitem == "spicy" || menuitem == "sweet" || menuitem == "sour") {
      var item = await menu.find({ taste: menuitem });
      console.log("item found successfully");
      res.status(200).send(item);
    } else {
      res.status(500).json("invalid menuitem");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "some internal error" });
  }
});



module.exports = router;
