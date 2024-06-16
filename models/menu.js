const mongoose = require("mongoose");
const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    taste: {
      type: String,
      enum: ["sweet", "spicy", "sour"],
    },
    is_drink: {
      type: Boolean,
      default: false,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    num_sales: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

//MenuItem is temporary and Menuitem permanent name of database file
const MenuItem = mongoose.model("MenuItem", menuItemSchema, "Menuitem");
module.exports = MenuItem;