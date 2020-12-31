const express = require('express')
const mongoose = require('mongoose')
const { runInContext } = require('vm')
const User = mongoose.model('User')

const router = express.Router()

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).send(users)
    } catch (e) {
        return res.status(422).send({error: e.message})
    }
})

router.post('/user/create', async (req, res) => {
    const { email, user_type } = req.body;

    try {
        const user = new User({ email, user_type });

        await user.save()

        res.status(200).send(user)

    } catch (e) {
        return res.status(422).send({error: e.message})
    }
})

router.get('/user/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ 'email': email });

        if (!user) {
            return res.status(404).send({error: "Could not find the specified user. Please try again."})
        }

        res.status(200).send(user)
    } catch (e) {
        return res.status(400).send({error: e.message})
    }
});

router.put('/user/edit/email', async (req, res) => {

    const { old_email, new_email } = req.body;

    try {
        var user = await User.findOneAndUpdate({ 'email': old_email}, { 'email': new_email })

        if (!user) {
            return res.status(404).send({error: "Could not find the specified user. Please try again."})
        }

        res.status(200).send(user)
    } catch (e) {
        res.send({error: e.message})
    }
})

router.delete('/user/delete/:email', async (req, res) => {

    const email = req.params.email;

    try {
        var data = await User.deleteOne({ email })
        if (!data.deletedCount) {
            return res.status(404).send({error: "Could not find the specified user. Please try again."})
        } else {
            return res.status(200).send(true)
        }
    } catch (e) {
        res.send({error: e.message})
    }
})

module.exports = router;