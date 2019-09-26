const express=require('express');
const router =express.Router();
const GetirController= require('../controllers/getir');

//gelen url ve requeste göre controller çağıran router

router.post('/',GetirController.getir_post);

module.exports=router;