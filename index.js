const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./Product');

// setup database
const db = 'mongodb://localhost/indomar';
mongoose.connect(db, { useNewUrlParser: true });

// setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup view
// app.set('view engine', 'ejs');

// setup public dir
// app.use(express.static(__dirname + '/public'));

// route index
app.get('/', (req, res) => {

  Product.find({})
    .exec((err, products) => {
      if (err) {
        res.send(err)
      } else {
        res.render('index', {
          products: products
        });
      }
    })
});

// route get all products
app.get('/products', (req, res) => {
  Product.find({})
    .exec((err, products) => {
      if (err) {
        res.send(err);
      } else {
        console.log(products);
        res.json(products);
        //res.send(products);
      }
    });
});

// route single product
app.get('/product/:id', (req, res) => {
  Product.findOne({
    _id: req.params.id
  })
    .exec((err, product) => {
      if (err) {
        res.send(err);
      } else {
        res.json(product)
      }
    });
});

// Post new product
app.post('/product', (req, res) => {
  const newProduct = new Product();

  newProduct.name = req.body.name;
  newProduct.quantity = req.body.quantity;
  newProduct.descrip = req.body.descrip;

  newProduct.save((err, result) => {
    if (err) {
      res.send('error saving product');
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

// update
// app.put('/product', (r,s) => {});

app.put('/product/:id', (req, res) => {
  Product.findOneAndUpdate({
    _id: req.params.id
  },
    { $set: { name: req.body.name } },
    { upsert: true },
    (err, newProduct) => {
      if (err) {
        res.send('Error')
      } else {
        console.log(newProduct);
        res.send(newProduct);
      }
    });
});

// delete
app.delete('/product/:id', (req, res) => {
  Product.findOneAndRemove({
    _id: req.params.id
  }, (err, product) => {
    if (err) {
      res.send('error deleting');
    } else {
      console.log(product);
      res.send(product);
    }
  })
});

// setup server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});