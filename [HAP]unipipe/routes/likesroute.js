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

		var {username,like_on} = req.body


		console.log(like_on)

		var topquery = `SELECT LIKES FROM UPLOADS WHERE ID=${like_on}`

		con.query(topquery, null, (err, resSet)=>{

			console.log('dkdk')
			console.log(resSet)

			var query = `INSERT INTO UPLOADS(LIKES) VALUES () ${resSet.LIKES} + 1`

			con.query(query, (err, resSet1)=>{

				console.log(resSet1)

			})
		})


		res.redirect('/?user_id=' + username)

		res.end()
	
})




module.exports = router