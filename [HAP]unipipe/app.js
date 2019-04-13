const express = require('express')
const errorHandler = require('error-handler')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const ejs = require('ejs')
const favicon = require('serve-favicon')
const session = require('express-session')
const http = require('http')
const methodOverride = require('method-override')
const mysql = require('mysql')
const libgen = require('libgen');

const uploadsRoute = require('./routes/uploadsroute')
const commentRoute = require('./routes/commentsroute')
const likesRoute = require('./routes/likesroute')
const loginRoute = require('./routes/loginroute')
const signupRoute = require('./routes/signuproute')



var app = express()

app.set('port', 8000)
app.set('view engine', 'ejs')
app.engine('ejs',ejs.renderFile)
app.use(favicon(path.join(__dirname, 'public/favicon.ico')))
app.use(logger('dev'))
app.use(session({
		   secret: 'mysecret',
		   saveUninitialized: true,
		   reSave: true
		}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/login', loginRoute)
app.use('/signup', signupRoute)
app.use('/upload', uploadsRoute)
app.use('/comment', commentRoute)
app.use('/likes', likesRoute)


if (app.get('env' === 'development')){
	app.use(errorHandler())
}



var con = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'mysqladmin',
		database: 'unipipe'
	})




app.get('/search', (req, res)=>{

const options = {
  mirror: 'http://gen.lib.rus.ec',
  query: 'philosophy of religion',
  count: 5
};

libgen.search(options, (err, data) => {
  if (err)
    return console.error(err);
  console.log(data)
  

  render('search', {data:data})
})
  
});

app.get('/', (req, res)=>{



var query = `SELECT * FROM UPLOADS INNER JOIN UNIPIPEUSERS ON UPLOADS.UPLOADED_BY = UNIPIPEUSERS.USERNAME  WHERE UNIPIPEUSERS.USERNAME = "${req.query.user_id}";`

con.query(query, null, (err, resSet)=>{

	var query2 = `SELECT * FROM COMMENTS INNER JOIN UNIPIPEUSERS ON COMMENTS.COMMENT_BY = UNIPIPEUSERS.USERNAME`

	con.query(query2, null, (err, resSet1)=>{


		res.render('index', {
			user_post: resSet,
			comments: resSet1,
			top_username: req.query.user_id
		})


	})
})
})


http.createServer(app).listen(app.get('port'),e=>console.log(`Server started on port: ${app.get('port')}`))
