const db = require("../models");
const Day = db.day;
const Image = db.image;
const Bar = db.bar;
const fs = require('fs');
const User = require("../models/user");
const { dashboard } = require("../helpers");
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
      switch (req.body.bar) {
        case 'Continental':
          amounts = [
            {
              label: 'Caja',
              value: day?.amounts.find((amount) => amount.label === 'Caja')?.value,
            },
            {
              label: 'Desayunos',
              value: day?.amounts.find((amount) => amount.label === 'Desayunos')?.value,
            },
            {
              label: 'Comidas',
              value: day?.amounts.find((amount) => amount.label === 'Comidas')?.value,
            },
            {
              label: 'Meriendas',
              value: day?.amounts.find((amount) => amount.label === 'Meriendas')?.value,
            },
            {
              label: 'Efectivo',
              value: day?.amounts.find((amount) => amount.label === 'Efectivo')?.value,
            },
            {
              label: 'Tarjeta',
              value: day?.amounts.find((amount) => amount.label === 'Tarjeta')?.value,
            },
            {
              label: 'Carta',
              value: day?.amounts.find((amount) => amount.label === 'Carta')?.value,
            },
            {
              label: 'Menu',
              value: day?.amounts.find((amount) => amount.label === 'Menu')?.value,
            },
          ]
          break
        case 'Jauja':
          amounts = [
            {
              label: 'Caja',
              value: day?.amounts.find((amount) => amount.label === 'Caja')?.value,
            },
          ]
          break
        case 'Bro':
          amounts = [
            {
              label: 'Caja',
              value: day?.amounts.find((amount) => amount.label === 'Caja')?.value,
            },
            {
              label: 'Caja2',
              value: day?.amounts.find((amount) => amount.label === 'Caja2')?.value,
            },
          ]
          break
      }
      res.status(200).send({
        amounts: day ? day.amounts : amounts,
        notes: day?.notes,
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
    console.log(req.body.amounts)
    if (!day) {
      const day = new Day({
        date: req.body.date,
        bar: req.body.bar,
        amounts: req.body.amounts,
        notes: req.body.notes,
      });
      day.save((err, day) => {
        if (err) {
          console.log(err)
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
      day.amounts = req.body.amounts
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
    let bitmap = fs.readFileSync('./' + img.path);
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
      let bitmap = fs.readFileSync('./' + img.path);
      let base64 = bitmap.toString('base64');
      bitmaps.push({
        id: img._id,
        img: base64
      })
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

exports.deleteImage = (req, res) => {
  Image.findOne({
    _id: req.body.id,
  }).exec((err, img) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (!img) {
      return res.status(200).send({ message: 'No image for that id' })
    }
    fs.unlinkSync('./' + img.path)
    Image.deleteOne({
      _id: req.body.id,
    }).exec((err, img) => {
      if (err) {
        res.status(500).send({ message: err })
        return
      }
      if (!img) {
        return res.status(200).send({ message: 'No image for that id' })
      }
      res.status(200).send({ message: 'Image deleted' })
    })
  })
};

exports.getDashboard = (req, res) => {
  console.log(req.query)
  Day.find({
    bar: req.query.bar
  }).exec((err, days) => {
    if (err) {
      res.status(500).send({ message: err })
      return
    }
    if (!days) {
      return res.status(200).send({ message: 'No days for that bar' })
    }
    data = dashboard.dashboard(days)
    res.status(200).send({ data: data })
  })
};

exports.loginStatus = (req, res) => {
  res.status(200).send({ message: 'Logged in' })
};
