const router = require("express").Router();
let Blogh = require("../Models/Blogh");

router.route("/add").post((req, res) => {
  const blogtitle = req.body.blogtitle;
  const authorname = req.body.authorname;
  const date = req.body.date;
  const blogsummary = req.body.blogsummary;
  const blogbody = req.body.blogbody;
  const image = req.body.image;

  const newBlogh = new Blogh({
    blogtitle,
    authorname,
    date,
    blogsummary,
    blogbody,
    image,
  });

  newBlogh
    .save()
    .then(() => {
      res.json("Event Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Blogh.find()
    .then((bloghs) => {
      res.json(bloghs);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  let blogId = req.params.id;
  const { blogtitle, authorname, date, blogsummary, blogbody } = req.body;

  const updateBlogh = {
    blogtitle,
    authorname,
    date,
    blogsummary,
    blogbody,
  };

  const update = await Blogh.findByIdAndUpdate(blogId, updateBlogh)
    .then(() => {
      res.status(200).send({ status: "Blog  Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let blogId = req.params.id;
  await Blogh.findByIdAndDelete(blogId)
    .then(() => {
      res.status(200).send({ status: " Blog  Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Errot with delete data", error: err.message });
    });
});

router.route("/get/:id").get(async (req, res) => {
  let blogId = req.params.id;
  const blog = await Blogh.findById(blogId)
    .then((blog) => {
      res.status(200).send({ status: "Blog  Fetched", blog });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with get Blog ", error: err.message });
    });
});

module.exports = router;

