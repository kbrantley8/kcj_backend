require('./models/User')
const mongoose = require('mongoose')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

try {
    const credentials = require('./credentials/mongo-auth.json');
    mongo_username = credentials.username;
    mongo_password = credentials.password;
} catch (e) {
    console.log(e)
}

var connectionString = 'mongodb+srv://'+ mongo_username + ':' + mongo_password + '@cluster0.adrkn.mongodb.net/kcj_backend?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})


mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo', err)
})

const exampleRoutes = require('./routes/exampleRoutes');
app.use(exampleRoutes)

const userRoutes = require('./routes/userRoutes');
app.use(userRoutes)

app.get('/', (req, res) => res.send('This is the opening page of kcj'))

app.listen(3000, () => {
    console.log(`Listening on port 3000`)
})