const express = require('express');
const cors = require('cors');
const kundaliRoute = require('./routes/kundaliRoutes');
const connectToDB = require('./connectToDB');
require('dotenv').config();
const remedyRoute = require('./routes/remedyRoute')
const path = require('path');
const matchMatchingRoute = require('./routes/matchMatchingRoutes');
const childBirthRoute = require('./routes/childBirthRoutes')
const dashaFalRoutes = require("./routes/dashaFalRoutes");
const authRoutes = require('./routes/authRoutes')



const app = express();
app.use(express.json());
app.use(cors());
const URL = process.env.Mongo_DB_URL
const PORT = process.env.PORT;

connectToDB(URL)

app.use("/api", authRoutes);
app.post('/kundali', kundaliRoute);
app.post('/match', matchMatchingRoute);
app.post('/child', childBirthRoute);
app.use("/api", remedyRoute);
app.use("/api", dashaFalRoutes);



app.listen(PORT, () => {
  console.log(`Kundali API server running on port ${PORT}`);
});