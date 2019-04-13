module.exports = router
const express = require("express")
const path = require('path')
const mysql = require('mysql')

var router = express.Router()

var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'mysqladmin',
		database: 'unipipe'
	})

router.get('/', (req, res)=>{
	//user login in page
	res.render('signin.ejs')
})

router.post('/', (req, res)=>{
	//add login information

	var {username, password} = req.body

	var query = `SELECT * FROM unipipeusers WHERE username LIKE "${username}"`

	con.query(query, null, (err, resSet)=>{

		res.redirect(`/?user_id=${resSet[0].username}`);

	})

})



module.exports = router