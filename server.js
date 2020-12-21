const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const exampleRoutes = require('./routes/exampleRoutes');
app.use(exampleRoutes)

app.get('/', (req, res) => res.send('This is the opening page of kcj'))

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})