const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(cors());
const connectionString = 'connectionString';
const ObjectId = require('mongodb').ObjectID;

MongoClient.connect(connectionString)
  .then((client) => {
    console.log('Connected to Database');

    const db = client.db('khabib-test');
    const sessionsCollection = db.collection('sessions');
    const preparedSessionsCollection = db.collection('prepared_sessions');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // app.get("/", (req, res) => {
    //   sessionsCollection
    //     .find()
    //     .toArray()
    //     .then((results) => {
    //       console.log(results);
    //       res.send(results);
    //     })
    //     .catch((error) => console.error(error));
    // });

    app.get('/api/sessions', (req, res) => {
      // console.log(req.query);
      req.query.sessionId
        ? sessionsCollection
            .find({ _id: ObjectId(req.query.sessionId) })
            .toArray()
            .then((results) => {
              // console.log(results);
              res.send(results[0]);
            })
            .catch((error) => console.error(error))
        : sessionsCollection
            .find()
            .sort({ start: 1 })
            .toArray()
            .then((results) => {
              // console.log(results);
              res.send(results);
            })
            .catch((error) => console.error(error));
    });

    // app.get(`/api/sessions?sessionId`, (req, res) => {
    //   sessionsCollection
    //     .find({ _id: sessionId })
    //     .then((result) => {
    //       console.log(result);
    //       res.send(result);
    //     })
    //     .catch((e) => console.error(e));
    // });

    app.get('/api/sessions/latest', (req, res) => {
      sessionsCollection
        .find()
        .sort({ _id: -1 })
        // .sort({ start: -1 })
        .limit(1)
        .toArray()
        .then((result) => {
          // console.log(result);
          res.send(result[0]);
        })
        .catch((e) => console.error(e));
    });

    app.post('/api/sessions', (req, res) => {
      const processedCombos = req.body.combos.map((combo) => {
        const accuracy =
          combo.strikes.filter((strike) => strike.hit).length /
          combo.strikes.length;
        var force = 0;
        combo.strikes
          .filter((strike) => strike.hit)
          .forEach((strike) => (force += strike.force));
        force = force / combo.strikes.length.filter((strike) => strike.hit);
        const performance = accuracy * force;

        return {
          ...combo,
          accuracy: +accuracy.toFixed(3),
          force: +force.toFixed(3),
          performance: +performance.toFixed(3),
        };
      });

      var numStrikes = 0;
      var numHits = 0;
      processedCombos.forEach((combo) => {
        numStrikes += combo.strikes.length;
        numHits += combo.strikes.filter((strike) => strike.hit).length;
      });
      const accuracy = +(numHits / numStrikes).toFixed(3);

      var performance = 0;
      processedCombos.forEach((combo) => (performance += combo.performance));
      performance = performance / processedCombos.length;

      const processedData = {
        start: new Date(req.body.start),
        end: new Date(req.body.end),
        accuracy,
        performance,
        combos: processedCombos,
      };

      // console.log(processedData);

      sessionsCollection
        .insertOne(processedData)
        .then((result) => {
          // console.log(result);
          res.send();
        })
        .catch((error) => console.error(error));

      res.send();
    });

    app.post('/api/start-session', (req, res) => {
      // console.log(req.body);
      preparedSessionsCollection
        .insertOne(req.body)
        .then((result) => {
          // console.log(result);
          res.send();
        })
        .catch((error) => console.error(error));

      res.send();
    });

    app.listen(3001, function () {
      console.log('listening on 3001');
    });
  })
  .catch((error) => console.error(error));
