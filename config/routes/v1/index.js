const mongoose = require('mongoose')
const router = require('express').Router();
const user = require('../../../app/controllers/signup')
const admin = require('../../../app/controllers/admin')
 router.post('/signup',user.signup)
 router.post('/login',user.login)
 router.post('/postDetail',admin.postDetails)
 router.get('/getpostAll',admin.getpostAll)
 router.get('/getpostDetail',admin.getpostDetails)
 router.get('/getposts',admin.getposts)
 router.post('/addtoList',user.addtoLists)
 router.get('/myList',user.myLists)
 router.post('/deletefromList',user.deleteFromLists)
module.exports = router