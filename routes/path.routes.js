const express = require("express");
const router = express.Router();

const Path = require("../models/Path.model");

// get all the paths
router.get("/", (req, res, next) => {
  Path.find({ user: req.payload._id })
    .then((paths) => {
      if (!paths) {
        return res
          .status(404)
          .json({ message: "Path not found or unauthorized" });
      }
      res.status(200).json(paths);
    })
    .catch((error) => {
      next(error);
    });
});

// get single path
router.get("/:pathId", (req, res, next) => {
    Path.findOne({_id: req.params.pathId, user: req.payload._id})
    .then((path) => {
        if (!path) {
        return res.status(404).json({message: "Path not found or unauthorized"})
        }
        res.status(200).json(path)
    })
    .catch((error) => {
        next(error)
    })
})

// create new path
router.post("/", (req, res, next) => {
  const { city, coordinates, distance, title } = req.body;

  Path.create({
    user: req.payload._id,
    city,
    coordinates,
    distance,
    title,
  })
    .then((paths) => {
      if (!paths) {
        return res
          .status(404)
          .json({ message: "Path not found or unauthorized" });
      }
      res.status(201).json(paths);
    })
    .catch((error) => {
      next(error);
    });
});

// edit existing path (check for path ID and user ID)
router.put("/:pathId", (req, res, next) => {
  Path.findOneAndUpdate(
    { _id: req.params.pathId, user: req.payload._id },
    req.body,
    { returnDocument: "after" },
  )
    .then((updatedPath) => {
      if (!updatedPath) {
        return res
          .status(404)
          .json({ message: "Path not found or unauthorized" });
      }
      res.status(200).json(updatedPath);
    })
    .catch((error) => {
      next(error);
    });
});

//delete path (check for path ID and user ID)
router.delete("/:pathId", (req, res, next) => {
  Path.findOneAndDelete({ _id: req.params.pathId, user: req.payload._id })
    .then((path) => {
      if (!path) {
        return res
          .status(404)
          .json({ message: "Path not found or unauthorized" });
      }
      res.status(200).json(path);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
