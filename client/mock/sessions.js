export const session1 = {
  _id: "ObjectId('617594177132ef340363addb')",
  start: '2021-10-24T17:12:55.297+00:00',
  end: '2021-10-24T17:42:55.297+00:00',
  type: 'drill',
  difficulty: 'medium',
  accuracy: 100,
  performance: 258.84615384615387,
  measurements: [
    {
      time: 0,
      force: 200,
      accuracy: 70,
    },
    {
      time: 2,
      force: 300,
      accuracy: 70,
    },
    {
      time: 3,
      force: 350,
      accuracy: 75,
    },
    {
      time: 5,
      force: 450,
      accuracy: 90,
    },
    {
      time: 10,
      force: 400,
      accuracy: 75,
    },
    {
      time: 25,
      force: 200,
      accuracy: 65,
    },
    {
      time: 30,
      force: 250,
      accuracy: 70,
    },
    {
      time: 35,
      force: 400,
      accuracy: 80,
    },
    {
      time: 40,
      force: 450,
      accuracy: 85,
    },
    {
      time: 45,
      force: 500,
      accuracy: 90,
    },
    {
      time: 50,
      force: 300,
      accuracy: 80,
    },
    {
      time: 55,
      force: 250,
      accuracy: 80,
    },
    {
      time: 57,
      force: 200,
      accuracy: 75,
    },
  ],
};

export const session2 = {
  _id: "ObjectId('6175e6b8e664e91a4b2550d4')",
  start: '2021-10-24T23:05:28.364+00:00',
  end: '2021-10-24T23:45:55.297+00:00',
  type: 'drill',
  difficulty: 'medium',
  accuracy: 90,
  performance: 258.84615384615387,
  measurements: [
    {
      time: 0,
      force: 200,
      accuracy: 70,
    },
    {
      time: 2,
      force: 300,
      accuracy: 70,
    },
    {
      time: 3,
      force: 350,
      accuracy: 75,
    },
    {
      time: 5,
      force: 450,
      accuracy: 90,
    },
    {
      time: 10,
      force: 400,
      accuracy: 75,
    },
    {
      time: 25,
      force: 200,
      accuracy: 65,
    },
    {
      time: 30,
      force: 250,
      accuracy: 70,
    },
    {
      time: 35,
      force: 400,
      accuracy: 80,
    },
    {
      time: 40,
      force: 450,
      accuracy: 85,
    },
    {
      time: 45,
      force: 500,
      accuracy: 90,
    },
    {
      time: 50,
      force: 300,
      accuracy: 80,
    },
    {
      time: 55,
      force: 250,
      accuracy: 80,
    },
    {
      time: 57,
      force: 200,
      accuracy: 75,
    },
  ],
};

export const session3 = {
  _id: "ObjectId('6176aaf6faf38494cda803b9')",
  start: '2021-10-25T13:02:46.564+00:00',
  end: '2021-10-25T13:52:46.564+00:00',
  type: 'drill',
  difficulty: 'medium',
  accuracy: 80,
  performance: 258.84615384615387,
  measurements: [
    {
      time: 0,
      force: 200,
      accuracy: 70,
    },
    {
      time: 2,
      force: 300,
      accuracy: 70,
    },
    {
      time: 3,
      force: 350,
      accuracy: 75,
    },
    {
      time: 5,
      force: 450,
      accuracy: 90,
    },
    {
      time: 10,
      force: 400,
      accuracy: 75,
    },
    {
      time: 25,
      force: 200,
      accuracy: 65,
    },
    {
      time: 30,
      force: 250,
      accuracy: 70,
    },
    {
      time: 35,
      force: 400,
      accuracy: 80,
    },
    {
      time: 40,
      force: 450,
      accuracy: 85,
    },
    {
      time: 45,
      force: 500,
      accuracy: 90,
    },
    {
      time: 50,
      force: 300,
      accuracy: 80,
    },
    {
      time: 55,
      force: 250,
      accuracy: 80,
    },
    {
      time: 57,
      force: 200,
      accuracy: 75,
    },
  ],
};

export const session4 = {
  _id: "ObjectId('6176aaf6faf38494cda803ba')",
  start: '2021-10-25T13:02:46.816+00:00',
  end: '2021-10-25T13:59:46.816+00:00',
  type: 'drill',
  difficulty: 'medium',
  accuracy: 70,
  performance: 258.84615384615387,
  measurements: [
    {
      time: 0,
      force: 200,
      accuracy: 70,
    },
    {
      time: 2,
      force: 300,
      accuracy: 70,
    },
    {
      time: 3,
      force: 350,
      accuracy: 75,
    },
    {
      time: 5,
      force: 450,
      accuracy: 90,
    },
    {
      time: 10,
      force: 400,
      accuracy: 75,
    },
    {
      time: 25,
      force: 200,
      accuracy: 65,
    },
    {
      time: 30,
      force: 250,
      accuracy: 70,
    },
    {
      time: 35,
      force: 400,
      accuracy: 80,
    },
    {
      time: 40,
      force: 450,
      accuracy: 85,
    },
    {
      time: 45,
      force: 500,
      accuracy: 90,
    },
    {
      time: 50,
      force: 300,
      accuracy: 80,
    },
    {
      time: 55,
      force: 250,
      accuracy: 80,
    },
    {
      time: 57,
      force: 200,
      accuracy: 75,
    },
  ],
};

export default {
  'GET /api/sessions': (req, res) => {
    const updatedSessions = [session1, session2, session3, session4].map(session => {
      const sessionPerformance = session.measurements.map(point => {
        point = {
          ...point,
          performance: (point.force * point.accuracy) / 100,
        };

        return point;
      });

      return {
        ...session,
        measurements: sessionPerformance,
      };
    });

    setTimeout(() => {
      res.send(updatedSessions);
    }, 2000);
  },

  'GET /api/sessions/latest': (req, res) => {
    const session4Performance = session4.measurements.map(point => {
      point = {
        ...point,
        performance: (point.force * point.accuracy) / 100,
      };

      return point;
    });

    setTimeout(() => {
      res.send({
        ...session4,
        measurements: session4Performance,
      });
    }, 2000);
  },

  'GET /api/sessions/history': (req, res) => {
    const history = [
      {
        start: session1.start,
        performance: session1.performance,
      },
      {
        start: session2.start,
        performance: session2.performance,
      },
      {
        start: session3.start,
        performance: session3.performance,
      },
      {
        start: session4.start,
        performance: session4.performance,
      },
    ];


    setTimeout(() => {
      res.send({
        ...session4,
        measurements: session4Performance,
      });
    }, 2000);
  },

  'POST /api/sessions': (req, res) => {
    res.end('OK');
  },
};
