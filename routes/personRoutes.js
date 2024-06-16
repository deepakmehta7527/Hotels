const express = require("express");
const router = express.Router();
const person = require("./../models/person"); //just given path "require("./models/person")" but in real we have "module.exports=Persion"
//"./ means single stepout from current folder and ../ means enter current folder to new folder"

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const persondata = new person(data);
    var datasave = await persondata.save();
    console.log("datasave");
    res.status(200).json(datasave);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "some error" });
  }
});

router.get("/", async (req, res) => {
  try {
    var datafind = await person.find();
    res.status(200).json(datafind);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "some error" });
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const response = await person.find({ work: worktype });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "some error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    var perid = req.params.id;

    var updateper = req.body;

    var updateperson = await person.findByIdAndUpdate(perid, updateper, {
      new: true,
      runValidators: true,
    });

    if (!updateperson) {
      return res.status(404).json({ error: "person not found" });
    }

    res.status(200).send(updateperson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var delid = req.params.id;
    var delitem = await person.findByIdAndDelete(delid);
    if (!delitem) {
      return res.status(404).json("person not found");
    }
    console.log("deleted successfully");
    res.status(200).json({ deleted: "item deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
