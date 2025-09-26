const express = require('express')
const router =  express.Router()
const path = require('path')


// index.html (handles "/" and "/index.html")
router.get(/^\/$|\/index(.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, '..','views', 'index.html'))
})

// new-page.html
router.get(/^\/new-page(.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, '..','views', 'new-page.html'))
})

// redirect old-page → new-page
router.get(/^\/old-page(.html)?$/, (req, res) => {
  res.redirect(301, '/new-page.html')
})

module.exports = router