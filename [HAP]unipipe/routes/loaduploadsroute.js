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

	res.render('loaduploads.html')

	res.end()

})

roter.get('/items', (req, res)=>{

	var query = "SELECT * FROM UPLOADS"

	con.query(query, null, (err, res)=>{

		console.log(res)
	})

})



module.exports = routerconst express = require("express")
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

	res.render('loaduploads.html')

	res.end()

})

roter.get('/items', (req, res)=>{

	var query = "SELECT * FROM UPLOADS"

	con.query(query, null, (err, res)=>{

		console.log(res)
	})

})



module.exports = router