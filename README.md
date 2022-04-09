A client application for Great Sparring Partner.

Data sent from an ESP32 microcontroller is processed and inserted into a MongoDB database in `/server/src/server.js` and displayed in a React web application using Recharts.

The overview page shows the user's performance during the most recent sparring session as well as their performance over several sessions. They can select their desired drills and duration to begin a new session.

<img src="https://user-images.githubusercontent.com/35076041/162553281-5919f49a-90a5-4367-9f9f-9cb09a9088a1.png" alt="Overview" width="60%">

The user is then directed to a camera screen to record their performance. They can later stream the video by tapping on the corresponding results card.

<img src="https://user-images.githubusercontent.com/35076041/162553284-459aeef9-c54b-4bbb-9162-dfd63b7c3c24.png" alt="Camera" width="60%">
