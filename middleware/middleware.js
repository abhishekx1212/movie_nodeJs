const authentication = (req, res, next) => {
  // console.log(req.body);
  const { name, description, ratings } = req.body;
  // console.log(name,description,ratings);
  if (name && description && ratings) {
    next();
  } else {
    console.log("invalid data");
    res.redirect("/");
  }
};

module.exports = authentication;
