const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');

function apiRouter(database) {
  const router = express.Router();

  router.use(
      checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: '/api/authenticate'})
  );

  router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ error: err.message });
    }
  });

  router.get('/contacts', (req, res) => {

    const contactsCollection = database.collection('contacts');

    contactsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
    });

  });

  router.get('/approvals', (req, res) => {

    const contactsCollection = database.collection('approvals');

    contactsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
    });

  });

  router.post('/approvals', (req, res) => {
    const review = req.body;

    const reviewsCollection = database.collection('approvals');

    reviewsCollection.insertOne(review, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });

  router.delete('/approvals', (req, res) => {
    const review = req.body;

    const query = { id: review.id };

    console.log(query);

    const reviewsCollection = database.collection('approvals');

    reviewsCollection.deleteOne(query, (err, r) => {
      if (err) {
        /* return res.status(500).json({ error: 'Error deleting the record.' }) */
        throw err;
      }

      //const deletedReview = r.ops[0];

      console.log("1 deleted record");

      //return res.status(201).json(r);
    });
  });


  router.post('/contacts', (req, res) => {
    const user = req.body;

    const contactsCollection = database.collection('contacts');

    contactsCollection.insertOne(user, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });

  router.get('/reviews', (req, res) => {

      const car = req.query;
      console.log(req.query);
    
      const reviewsCollection = database.collection('reviews');
    
      reviewsCollection.find(car).toArray((err, docs) => {
      return res.json(docs)
     });
    
  });

  router.post('/reviews', (req, res) => {
    const review = req.body;

    const reviewsCollection = database.collection('reviews');

    reviewsCollection.insertOne(review, (err, r) => {
      if (err) {
        return res.status(500).json({ error: 'Error inserting new record.' })
      }

      const newRecord = r.ops[0];

      return res.status(201).json(newRecord);
    });
  });

  router.get('/cars', (req, res) => {
    
      const carsCollection = database.collection('cars');
    
      carsCollection.find({}).toArray((err, docs) => {
      return res.json(docs)
     });
    
  });
    
  

  router.post('/authenticate', (req, res) => {
    const user = req.body;

    const usersCollection = database.collection('users');

    usersCollection
      .findOne({ username: user.username }, (err, result) => {
        if (!result) {
          return res.status(404).json({ error: 'user not found' })
        }

        if (!bcrypt.compareSync(user.password, result.password)) {
          return res.status(401).json({ error: 'incorrect password '});
        }

        const payload = {
          username: result.username,
          admin: result.admin
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

        return res.json({
          message: 'successfuly authenticated',
          token: token,
          user: result.username
        });
      });
  });

  return router;
}

module.exports = apiRouter;
