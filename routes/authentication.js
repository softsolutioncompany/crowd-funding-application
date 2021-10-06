const express = require('express')
const router = express.Router()
const User = require('../models/User');
const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {

	if(!req.body.firstname){
		res.json({ success: false, message: 'You must provide your firstname'});
	} else {
		if(!req.body.lastname){
			res.json({ success: false, message: 'You must provide your lastname'});
		} else {
			if(!req.body.email){
				res.json({ success: false, message: 'You must provide your email'});
			} else {
				if(!req.body.telephone){
					res.json({ success: false, message: 'You must provide your telephone number'});
				} else {
					if(!req.body.username){
						res.json({ success: false, message: 'You must provide your username'});
					} else {
						if(!req.body.password){
							res.json({ success: false, message: 'You must provide your password'});
						} else {
							let user = new User({
								firstname: req.body.firstname,
								lastname: req.body.lastname,
								email: req.body.email,
								telephone: req.body.telephone,
								username: req.body.username,
								password: req.body.password
							});

							user.save((err, user) => {
								if(err){
									console.log(err)
								} else {
									let token = jwt.sign({ userId: user._id}, 'secret', {expiresIn: '24h'});
									res.cookie('token', token);
									res.json({ success: true, message: 'User has been registered successfully'})
								}
							})
						}
					}
				}
			}
		}
	}

});


router.post('/login', (req, res) => {
	User.findOne({ username: req.body.username}, (err, user) => {
		if(err){
			res.json({ success: false, message: 'Cant connect'})
		} else {
			if(!user){
				res.json({ success: false, message: 'User not found'})
			} else {
				if(user.password != req.body.password){
					res.json({ success: false, message: 'Wrong password'})
				} else {
					if(user.password == req.body.password){
						let token = jwt.sign({ userId: user._id}, 'secret', {expiresIn: '24h'});
						res.cookie('token', token);
						res.json({ success: true, message: 'Logged in successfully'})
					}
				}
			}
		}
	})
})

router.get('/logout', (req, res) => {
	res.clearCookie('token');
	res.json({ success: true, message: 'Logged out successfully'})
})



module.exports = router