const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
//const {logger}= require('./middleware/logEvents.js')
//const errorHandler = require('./middleware/errorHandler.js')
const PORT = process.env.PORT || 3500

//app.use(logger)

/*app.use((req,res,next)=>{
  logEvents(`${req.method} \t${req.headers.origin} \t ${req.url}` , 'reqLog.txt')
    console.log(`${req.method} ${req.path}`);
    next()
})*/

// serve static files like CSS
//app.use(logger)
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',express.static(path.join(__dirname, 'public')))
app.use('/subdir',express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'))



// hello route with middleware chain
app.get(['/hello', '/hello.html'], (req, res, next) => {
  console.log('hello page loading...')
  next()
}, (req, res) => {
  res.send('Hi Hello Dev')
})

// middleware chain example
const one = (req, res, next) => {
  console.log('one')
  next()
}
const two = (req, res, next) => {
  console.log('two')
  next()
}
const three = (req, res, next) => {
  console.log('three')
  next()
}
const four = (req, res) => {
  console.log('four')
  res.send('Finished!')
}

app.get(/^\/chain(.html)?$/, [one, two, three ,four])

// 404 fallback (MUST be last)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
 