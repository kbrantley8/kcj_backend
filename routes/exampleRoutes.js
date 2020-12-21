const express = require('express')
const router = express.Router()

router.get('/test_endpoint', (req, res) => {
    console.log('test_endpoint called at ' + new Date().toLocaleString())
    
    res.send('GaTech')
})

router.post('/add_num', async (req, res) => {
    const num_to_add = req.body.num;

    console.log('add_num called at ' + new Date().toLocaleString() + ' with param: ' + num_to_add)

    if (typeof num_to_add != 'number') {
        return res.status(400).send({ error: 'Value passed in must be a number' })
    }

    let num_to_return = 15 + num_to_add;
    return res.status(200).send(num_to_return.toString());
})

module.exports = router;