const fs = require("fs");
const mongoose = require("mongoose");
const Pizza = require("./models/pizzaModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABACE.replace("<username>", process.env.USER).replace(
  "<password>",
  process.env.PASSWORD
);

mongoose.connect(DB, {}).then(() => {
  console.log("Pizppy databace connected successfully");
});

const Data = JSON.parse(
  fs.readFileSync(`${__dirname}/data/data.json`, `utf-8`)
);

const imprtdata = async function () {
  try {
    await Pizza.create(Data);
    console.log("Data Imported successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async function () {
  try {
    await Pizza.deleteMany();
    console.log("Data Deleted successfully");
  } catch (err) {}
  process.exit();
};

if (process.argv[2] == "--i") {
  imprtdata();
} else if (process.argv[2] == "--d") {
  deleteData();
}
