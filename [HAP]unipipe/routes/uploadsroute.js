const express = require("express")
const multer = require('multer')
const path = require('path')
const mysql = require('mysql')

var router = express.Router()

var mutableFileLink 


var storage = multer.diskStorage({

	destination: (req, file, cb)=>{
		cb(null, './tmp/uploads')
	},
	filename: (req, file, cb)=>{
		tempFileLink = `${file.fieldname}-${Date.now()}${file.originalname.substring(file.originalname.indexOf("."), (file.originalname.length))}`
		mutableFileLink = path.join(__dirname, tempFileLink)
		cb(null, tempFileLink)
	}
})

var mul = multer({
	storage: storage, 
	fileFilter: (req, file, callback)=>{
	    // var ext = path.extname(file.originalname);
	    // console.log(ext)
	    // if((ext != '.png' || ext != '.PNG') && (ext != '.jpg' || ext != '.JPG') && (ext != '.doc' ||  ex != '.DOC') && (ext != '.jpeg' || ext != '.JPEG')&& (ext != '.pow' | ext != '.POW') && (ext != '.xlsx' || ext != '.XLSX')) {
	    //     return callback(new Error('Only images are allowed'))
	    // }
	    callback(null, true)
	}
})


var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'mysqladmin',
		database: 'unipipe'
	})

router.use((req, res, next)=>{

	console.log("connected")

	next()
})


router.get('/', (req, res)=>{

	res.render('uploads.html')

	res.end()

})


router.post('/', mul.single('avatar'), (req, res)=>{

	//save file details to database
	if(mutableFileLink){

		var {title,description,search_keys} = req.body

		var query = `INSERT INTO uploads(title, description, search_keys, item_link) VALUES ("${title}","${description}","${search_keys}","${mutableFileLink}")`

		con.query(query, null, (err, res)=>{
			if(err)
				console.log(err)
		})

		res.json({
			status: 'success',
			message: 'File upload success'
		})
	} else{
		res.json({
			status: 'error',
			message: 'No file selected'
		})
	}
})




module.exports = router