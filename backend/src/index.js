require('dotenv').config();
const database = require('./db');

const router = require('./router/router');
const cookie_parse = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const app = express();

const cron = require('node-cron');
const Hashtag = require('../src/data/models/Hashtag');


if (process.env.TRENDINGRESETTIME !== 'false' && process.env.TRENDINGRESETTIME !== '') {


    cron.schedule(process.env.TRENDINGRESETTIME, () => {
        console.log("\n---------------SCHEDULED TASK----------------\n");
        console.log("Reiniciando Tendências de Hashtags");

        Hashtag.destroy({ where: {} })

        console.log("\n---------------TASK COMPLETED----------------");
    });

}


app.use(express.json());
app.use(cookie_parse());
app.use(cors({
    credentials: true,
    origin: true
}));

app.use(router);



app.listen(process.env.PORT || 3001, () => {
    database.sync();
    console.log("Backend running on port: " + process.env.PORT || 3001);
});