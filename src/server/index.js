const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

dotenv.config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'))

// MeaningCloud Auth
const API_DATA = {
    API_URL: "https://api.meaningcloud.com/sentiment-2.1",
    API_KEY: process.env.MEANING_CLOUD_KEY
}

// console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/view/index.html'))
    // res.sendFile('dist/index.html')
})

// check url sentiment
app.post('/check-url', async function (req, res) {
    // console.log(req.body);
    const {articleUrl} = req.body
    console.log(articleUrl);
    // building the MeaningCloud URL
    analyzeUrl = `${API_DATA.API_URL}?key=${API_DATA.API_KEY}&url=${articleUrl}&lang=en`
    const result = await fetch(analyzeUrl);
    const articleAnalsys = await result.json()
    // console.log(articleAnalsys);
    try {
        const projectData = {
            score_tag : articleAnalsys.score_tag,
            agreement : articleAnalsys.agreement,
            subjectivity : articleAnalsys.subjectivity,
            confidence : articleAnalsys.confidence,
            irony : articleAnalsys.irony
          }
        // console.log(projectData);
        // send the result to the client
        res.send(projectData)
    }
    catch(error) {
        console.log(error);
    }
})
// designates what port the app will listen to for incoming requests

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const port = 8000;
app.listen(port, function () {
    console.log(`Server run on port ${port}`)
    console.log(`API_key = ${API_DATA.API_KEY}`);
})