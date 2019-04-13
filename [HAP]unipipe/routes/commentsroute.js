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



router.post('/', (req, res)=>{

		var {username,comment_text,comment_on} = req.body


		var query = `INSERT INTO comments(comment_by, comment_text, comment_on) VALUES ("${username}","${comment_text}", "${comment_on}")`

		con.query(query, null, (err, res)=>{
			if(err)
				console.log(err)
		})


		res.redirect('/?user_id=' + username)

		res.end()
	
})




module.exports = router