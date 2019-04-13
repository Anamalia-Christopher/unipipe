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
	res.render('signup.ejs')
})

router.post('/', (req, res)=>{
	//add login information

	var {username, password, full_name, fb_profile_link, belongs_to_uni} = req.body

	var query = `INSERT INTO UNIPIPEUSERS(USERNAME,FULL_NAME,FB_PROFILE_LINK,BELONGS_TO_UNI) VALUES("${username}","${full_name}","${fb_profile_link}","${belongs_to_uni}")`

	con.query(query, null, (err, resSet)=>{

	if(err) {console.log(err)}

		res.json({
			status: "success",
			message: "Account added successfully"
		})

		
	})

})



module.exports = router