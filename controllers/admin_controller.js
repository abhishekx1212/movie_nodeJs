const user = require("../model/usrTbl");
const fs = require("fs");

const index = (req, res) => {
  user
    .find({})
    .then((data) => {
      return res.render("index", { data });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const add = (req, res) => {
  return res.render("add");
};

const create = async (req, res) => {
  const { name, description, ratings } = req.body;
  let  id  = req.body.id;

  if (id) {
    if (req.file) {
      let image = req.file.path;

      user
        .findById(id)
        .then((oneRecord) => {
          fs.unlinkSync(oneRecord.image);
        })
        .catch((err) => {
          console.log(err);
        });

      await user
        .findByIdAndUpdate(id, { name, description, ratings, image })
        .then((data) => {
          console.log("data updated");
          res.redirect("/");
        });
    } else {
      await user
        .findByIdAndUpdate(id, { name, description, ratings })
        .then((data) => {
          console.log("data updated");
          res.redirect("/");
        });
    }
  } else {
    let image = "";
    if (req.file) {
      image = req.file.path;
    }
    await user
      .create({ name, description, ratings, image })
      .then((data) => {
        console.log("data inserted..");
        return res.redirect("/create");
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
};

const deleteData = async (req, res) => {
  let { id } = req.params;

  user
    .findById(id)
    .then((oneRecord) => {
      fs.unlinkSync(oneRecord.image);
    })
    .catch((err) => {
      console.log(err);
    });

  try {
    await user.findByIdAndDelete(id);
    console.log("data deleted");
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// const updateData = async (req, res) => {
//   let { id } = req.params;
//   await user.findByIdAndUpdate(id, req.body).then((data) => {
//     console.log("data updated");
//     res.send("data updated");
//   });
// };

module.exports = { index, create, deleteData, add };
