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

app.use(express.static(path.resolve(__dirname, '../../client/dist')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist', 'index.html'));
});

mongodb.MongoClient.connect(connectionString)
  .then((client) => {
    console.log('Connected to Database');

    const db = client.db('khabib-test');
    const sessionsCollection = db.collection('sessions2');

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
        var performance = 0;
        var reps = 0;
        const maxReps = combo.strikes.length / combo.sequence.length;

        var i = 0;
        strikesLoop: while (
          i <
          combo.strikes.length - combo.sequence.length + 1
        ) {
          var j = 0;
          while (j < combo.sequence.length) {
            if (combo.strikes[i + j].type != combo.sequence[j]) {
              performance =
                performance - 0.005 * combo.strikes[i + j].force < 0
                  ? 0
                  : performance - 0.005 * combo.strikes[i + j].force;
              combo.strikes[i + j] = {
                performance: performance,
                ...combo.strikes[i + j],
              };
              i++;
              continue strikesLoop;
            }

            performance = performance + 0.01 * combo.strikes[i + j].force;
            combo.strikes[i + j] = {
              performance: performance,
              ...combo.strikes[i + j],
            };

            j++;
          }

          reps++;
          i = i + j;
        }

        const accuracy = reps / maxReps;

        return {
          ...combo,
          accuracy: +accuracy.toFixed(3),
          // force: +force.toFixed(3),
          performance: +performance.toFixed(3),
        };
      });

      var performance = 0;
      processedCombos.forEach((combo) => (performance += combo.performance));
      performance = performance / processedCombos.length;

      var accuracy = 0;
      processedCombos.forEach((combo) => (accuracy += combo.accuracy));
      accuracy = accuracy / processedCombos.length;

      const processedData = {
        _id: ObjectId(req.body._id),
        start: new Date(req.body.start),
        end: new Date(req.body.end),
        accuracy,
        performance,
        combos: processedCombos,
        completed: true,
      };

      sessionsCollection
        .replaceOne({ _id: processedData._id }, processedData)
        .then(() => {
          res.send();
        })
        .catch((error) => console.error(error));

      res.send({ success: true });
    });

    app.get('/api/start-session', (req, res) => {
      sessionsCollection
        .find({ completed: false })
        .sort({ _id: -1 })
        .limit(1)
        .toArray()
        .then((result) => {
          res.send(result[0]);
        })
        .catch((e) => console.error(e));
    });

    app.post('/api/start-session', (req, res) => {
      const sequence = req.body.sequence.map((sequence) => {
        const combo =
          sequence.type === 'Jabs'
            ? ['jab']
            : sequence.type === 'Crosses'
            ? ['cross']
            : [''];
        return { combo: combo, ...sequence };
      });

      sessionsCollection.insertOne(
        { completed: false, ...req.body, sequence: sequence },
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
