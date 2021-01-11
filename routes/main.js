const express= require("express");
const axios = require('axios');

let router=express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));
const https=require("https");
var cron_mod = require('../modules/cron_module');
var constants=require("../constants.js");
// add_user();
// update_group_user();
update_basic_user();
delete_user();

// function add_user(){
	
// 	var intervaly = setInterval(function() 
// 	{
	
// 	var add_user_events=cron_mod.check_gallagher_add_cardholder_events();
// 	  }, constants.ADD_CARDHOLDER_EVENTS);
// }
// function update_group_user(){

// 	var intervaly = setInterval(function() 
// 	{ 
	
// 	var update_user_events=cron_mod.check_gallagher_update_cardholder_events();
// 	  }, constants.UPDATE_CARDHOLDER_EVENTS);
	
// }
function update_basic_user(){

	var intervaly = setInterval(function() 
	{ 
	
	var mod_user_events=cron_mod.check_gallagher_modified_cardholder_events();
	  }, constants.MODIFIED_CARDHOLDER_EVENTS);
	
}
function delete_user(){

	var intervaly = setInterval(function() 
	{ 
	
	var delete_user_events=cron_mod.check_gallagher_delete_cardholder_events();
	  }, constants.DELETE_CARDHOLDER_EVENTS);
	
}










module.exports=router;