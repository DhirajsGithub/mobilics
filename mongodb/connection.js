// const url = "mongodb://127.0.0.1:27017/mobilicsDB";
const url =
  "mongodb+srv://dhirajborse:tAhXGWRCf7c4xjF8@cluster0.tzdsj.mongodb.net/mobilicsDB";
const mongoose = require("mongoose");

const connectMongo = async () =>
  mongoose.connect(url, { useNewUrlParser: true });

export default connectMongo;
