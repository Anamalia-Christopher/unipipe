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
const mailgun = require('mailgun')

const uploadsRoute = require('./routes/uploadsroute')
const loaduploadsRoute = require('./routes/loaduploadsroute')



var app = express()

app.set('port', 8000)
app.set('view engine', 'html')
app.engine('html',ejs.renderFile)
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


app.use('/upload', uploadsRoute)
app.use('/loaduploads', loaduploadsRoute)


if (app.get('env' === 'development')){
	app.use(errorHandler())
}



app.get('/', (req, res)=>{
	res.render('index.html')
})


http.createServer(app).listen(app.get('port'),e=>console.log(`Server started on port: ${app.get('port')}`))
