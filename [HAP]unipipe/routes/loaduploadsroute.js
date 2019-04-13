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

	res.render('loaduploads.ejs')

	res.end()

})

router.get('/items', (req, res)=>{

	var query = "SELECT * FROM UPLOADS INNER JOIN UNIPIPEUSERS ON UPLOADS.UPLOADED_BY = UNIPIPEUSERS.USERNAME;"

	con.query(query, null, (err, resSet)=>{

		res.json({
			id: resSet.id,
			title: resSet.title,
			description: resSet.description,
			item_link: resSet.item_link,
			date_added: resSet.date_added,
			uploaded_by: resSet.full_name
		})
	})

})



module.exports = router