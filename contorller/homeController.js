//for indexhome router
const Books = require("../models/bookModel");

exports.homepage = async (req, res) => {
  console.log(res.user);
  let books;
  try {
    books = await Books.find()
      .populate("author")
      .sort({ createdAt: "desc" })
      .limit(20)
      .exec();
  } catch {
    books = [];
  }
  res.render("home", { user: res.user || null, books: books });
};
