import bodyParser from 'body-parser';
import fileupload from 'express-fileupload';
import express from 'express';
import cors from 'cors';
import mongodb from 'mongodb';
import fs from 'fs';

const app = express();
app.use(cors());
const connectionString = 'connectionString';
app.use(fileupload());
const ObjectId = mongodb.ObjectID;

mongodb.MongoClient.connect(connectionString)
  .then((client) => {
    console.log('Connected to Database');

    const db = client.db('khabib-test');
    const sessionsCollection = db.collection('sessions');
    const preparedSessionsCollection = db.collection('prepared_sessions');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.get('/api/sessions', (req, res) => {
      req.query.sessionId
        ? sessionsCollection
            .find({ _id: ObjectId(req.query.sessionId) })
            .toArray()
            .then((results) => {
              res.send(results[0]);
            })
            .catch((error) => console.error(error))
        : sessionsCollection
            .find({ completed: true })
            .sort({ start: 1 })
            .toArray()
            .then((results) => {
              res.send(results);
            })
            .catch((error) => console.error(error));
    });

    app.get('/api/sessions/latest', (_req, res) => {
      sessionsCollection
        .find({ completed: true })
        .sort({ _id: -1 })
        .limit(1)
        .toArray()
        .then((result) => {
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

      sessionsCollection
        .insertOne(processedData)
        .then(() => {
          res.send();
        })
        .catch((error) => console.error(error));

      res.send();
    });

    app.post('/api/start-session', (req, res) => {
      sessionsCollection.insertOne(
        { completed: false, ...req.body },
        function (err, result) {
          if (err) {
            throw err;
          } else {
            res.send(result);
          }
        },
      );
    });

    app.get(`/recordings`, function (req, res) {
      const path = `recordings/${req.query.sessionId}.mp4`;
      const stat = fs.statSync(path);
      const fileSize = stat.size;
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
      }
    });

    app.post('/api/recordings', async (req, res) => {
      fs.writeFileSync(
        './recordings/' + req.files.inputFile.name + '.mp4',
        req.files.inputFile.data,
      );

      res.send();
    });

    app.listen(3001, function () {
      console.log('listening on 3001');
    });
  })
  .catch((error) => console.error(error));
