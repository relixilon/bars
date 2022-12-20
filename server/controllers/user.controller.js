const db = require("../models");
const Day = db.day;
const Image = db.image;
const Bar = db.bar;
const fs = require('fs');
const User = require("../models/user");
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
  const image = new Image({
    date: req.body.date,
    bar: req.body.bar,
    path: req.file.path,
  });
  image.save((err, image) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    res.status(200).send({ message: 'Image was created successfully!' })
  })
};

exports.getImageAmount = (req, res) => {
  Image.find({
    date: req.query.date,
    bar: req.query.bar
  }).exec((err, images) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (!images) {
      return res.status(200).send({ amount: 0 })
    }
    res.status(200).send({ amount: images.length, images: images })
  })
};

exports.getImage = (req, res) => {
  Image.findOne({
    _id: req.query.id,
  }).exec((err, img) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (!img) {
      return res.status(200).send({ message: 'No image for that day' })
    }
    let bitmap = fs.readFileSync('/home/mario/projects/bar/server/' + img.path);
    let base64 = bitmap.toString('base64');
    res.status(200).send({ img: base64 })
  })
};

exports.getImages = (req, res) => {
  Image.find({
    date: req.query.date,
    bar: req.query.bar
  }).exec((err, images) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (!images) {
      return res.status(200).send({ images: [] })
    }
    let bitmaps = []
    images.forEach(img => {
      let bitmap = fs.readFileSync('/home/mario/projects/bar/server/' + img.path);
      let base64 = bitmap.toString('base64');
      bitmaps.push(base64)
    });
    res.status(200).send({ images: bitmaps })
  })
};


exports.getUser = (req, res) => {
  User.findOne({
    _id: req.userId
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (!user) {
      return res.status(200).send({ message: 'No user for that id' })
    }
    barNames = []
    Bar.find({
      _id: { $in: user.bars }
    }).exec((err, bars) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (!bars) {
        console.log('No bars for that user')
        return
      }
      res.status(200).send({
        username: user.username,
        roles: user.roles,
        bars: bars
      })

    })

  })
};

exports.loginStatus = (req, res) => {
  res.status(200).send({ message: 'Logged in' })
};


exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

