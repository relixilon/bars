const db = require("../models");
const Day = db.day;
const Image = db.image;
const fs = require('fs');
const path = require('path');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.getDay = (req, res) => {
  Day.findOne({
    date: req.body.date,
    bar: req.body.bar
  }).exec((err, day) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (!day) {
      return res.status(200).send({ message: 'No data for that day' })
    }
    images = Image.find({
      date: req.body.date,
      bar: req.body.bar
    }).exec((err, images) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (!images) {
        return res.status(200).send({ message: 'No images for that day' })
      }
      res.status(200).send({
        amount: day.amount,
        notes: day.notes,
        images: images

      })
    })
  })
};

// submit day or update amount if exists
exports.submitDay = (req, res) => {

  Day.findOne({
    date: req.body.date,
    bar: req.body.bar
  }).exec((err, day) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (!day) {
      const day = new Day({
        date: req.body.date,
        bar: req.body.bar,
        amount: req.body.amount,
        notes: req.body.notes,
      });
      day.save((err, day) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }
        res.status(200).send({ message: 'Day was created successfully!' })
      })
      if (req.body.images) {
        req.body.images.forEach(img => {
          const image = new Image({
            date: req.body.date,
            img: img,
            bar: req.body.bar,
          });
          image.save((err, image) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }
          })
        });
      }
    } else {
      day.amount = req.body.amount
      day.notes = req.body.notes
      if (req.body.images) {
        req.body.images.forEach(img => {
          const image = new Image({
            date: req.body.date,
            img: img,
            bar: req.body.bar,
          });
          image.save((err, image) => {
            if (err) {
              res.status(500).send({ message: err })
              return
            }
          })
        });
      }

      day.save((err, day) => {
        if (err) {
          res.status(500).send({ message: err })
          return
        }
        res.status(200).send({ message: 'Day was updated successfully!' })
      })
    }
  })
};

exports.submitImage = (req, res, next) => {
  console.log(req.file)
  const image = new Image({
    date: req.body.date,
    bar: req.body.bar,
    img: {
      data: fs.readFileSync(path.join('/home/mario/projects/bar/server/uploads/' + req.file.filename)),
      contentType: 'image/png'
    }
  });
  image.save((err, image) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    res.status(200).send({ message: 'Image was created successfully!' })
  })
};

exports.getImage = (req, res) => {
  Image.find({
    date: req.body.date,
    bar: req.body.bar
  }).exec((err, image) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (!image) {
      return res.status(200).send({ message: 'No image for that day' })
    }
    console.log(Object.keys(image))
    console.log(image)
    res.status(200).sendFile('')
  })
};


exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

