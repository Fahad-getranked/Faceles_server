'use strict'
const express= require("express");
const axios = require('axios');
var dateFormat = require('dateformat');
const path=require("path");
var constants=require("../constants.js");
var qs = require('qs');
const fs=require("fs");
var jpeg = require('jpeg-js');
const https=require("https");
var fr_mod = require('../modules/fr_module');
var gr_mod = require('../modules/gallagher_module');
var lift_mod = require('../modules/lift_module');
var cron_mod = require('../modules/cron_module');

var apiKey;
var extagent;
var extagent;
var url;
var access_group=0;
var card_type=0;
var objs=[];
const isAuthorized = (req, res, next) => {
	let authorization = true;
	if (authorization ) {
		console.log("authorization token found.")
		next();
	}
	else {
		console.log("authorization token not found.")
		next ("error")
	}	
}

const agent = new https.Agent({
    rejectUnauthorized: false
})

apiKey =constants.GALLAGHER_KEY;
extkey=apiKey;
extagent=agent
const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')


async function downloadImage (url,id) { 
    try{
    var mainf=path.join(__dirname,id+'.jpg');
    // const url = 'https://127.0.0.1:8904/api/cardholders/389618/personal_data/6550'
    // const path = Path.resolve('images/6550.jpg')
    const writer = Fs.createWriteStream(mainf)
  
    const response = await Axios({
      url,
      method: 'GET',
      httpsAgent: extagent,
      responseType: 'stream',
      rejectUnauthorized: false,
      headers: {
        'Authorization': apiKey,
        'Content-Type':'image/jpeg'
    }
    })
  
    response.data.pipe(writer)
  
    return new Promise((resolve, reject) => {
        try{
      writer.on('finish', resolve)
      writer.on('error', reject)
      resolve('OK');
        }catch(error)
        {
            resolve('Cancel');
        }
    })
}catch(error)
{
    console.log(error);
}
  }
  

function base64_encode(file,id) {
// read binary data
var mainf=path.join(__dirname,file+'.jpg');
var bitmap = fs.readFileSync(mainf);
var rawImageData=Buffer.from(bitmap,'binary').toString('base64');
return rawImageData;
}
               
                
//============================INTERFACE LESS INTEGRATION================================
exports. check_gallagher_add_cardholder_events=function()
{
   try{
    var dbDate = new Date().toLocaleString();
    var seconds = constants.ADD_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS;
    var parsedDate = new Date(Date.parse(dbDate))
    var newDate = new Date(parsedDate.getTime() - (1000 * seconds))  
    newDate=newDate.toISOString();
   
    var obj = [];
	return new Promise((resolve) => {
        axios({
            method: 'get',
            httpsAgent: extagent,
            url:  constants.GALLAGHER_HOST + '/api/events?type=533&after='+newDate,
            headers: {
                'Authorization': apiKey,
                'Content-Type' : 'application/json'
              }
          })
        .then(function (response) {
            try{
            var events=response.data.events;
          
    events.forEach(function(element) {
        console.log("RUNING");
        cron_mod.add_cardholder_details(element.cardholder.id);

    });
    resolve(obj);
}catch(error) {
    //console.log(error)

}
             }).catch(error =>  {
        	//console.log(error)
        
        });
  
    });
}catch(error)
{
    console.log("ERROR");
}
}
exports. check_gallagher_delete_cardholder_events=function()
{
    try{
    var dbDate = new Date().toLocaleString();
    var seconds = constants.DELETE_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS;
    var parsedDate = new Date(Date.parse(dbDate))
    var newDate = new Date(parsedDate.getTime() - (1000 * seconds))  
    newDate=newDate.toISOString();
   
    var obj = [];
	return new Promise((resolve) => {
        try{
        axios({
            method: 'get',
            httpsAgent: extagent,
            url:  constants.GALLAGHER_HOST + '/api/events?type=15004&after='+newDate,
            headers: {
                'Authorization': apiKey,
                'Content-Type' : 'application/json'
              }
          })
        .then(function (response) {
            try{
            var events=response.data.events;
           
    events.forEach(function(element) {
	
         if(element.cardholder.id)
         {
            //==============================FR==============================  
  if(constants.FR_ACTIVE==1){ 
      console.log("Dewd");
      var checkids=cron_mod.get_post_code(element.cardholder.id);
      checkids.then(codes=>{
        if(codes)
        {
            console.log("FR USER="+codes)           
    var face_id= fr_mod.delete_fr_user (codes);
    face_id.then(facerep=>{
      if(facerep)
      {
          console.log("DELETED FR USER="+codes)
      }
     
     });
    }else{
        console.log("NO FR USer ID EXISTS");         
    }
       
}); 
    }
    //=================================SL===============================
    if(constants.SL_ACTIVE==1){ 
    var lift_id= lift_mod.delete_lift_user (element.cardholder.id);
    lift_id.then(facerep=>{
        if(facerep)
        {
            console.log("DELETED SL USER="+element.cardholder.id)
        }
     
     });
    
    }
    
    //==================================================================
         }
       
     
    
    });
   
}catch(error){
  //  console.log(error)
}
             }).catch(error =>  {
        //	console.log(error)
        
        });
    }catch(error){

    }
    });
}catch(error)
{

}
}
exports. check_gallagher_update_cardholder_events=function()
{
   try{
    var dbDate = new Date().toLocaleString();
    var seconds = constants.UPDATE_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS;
    var parsedDate = new Date(Date.parse(dbDate))
    var newDate = new Date(parsedDate.getTime() - (1000 * seconds))  
    newDate=newDate.toISOString();
   
    var obj = [];
	return new Promise((resolve) => {
        axios({
            method: 'get',
            httpsAgent: extagent,
            url:  constants.GALLAGHER_HOST + '/api/events?type=540&after='+newDate,
            headers: {
                'Authorization': apiKey,
                'Content-Type' : 'application/json'
              }
          })
        .then(function (response) {
            try{
            var events=response.data.events;
          
    events.forEach(function(element) {
        console.log("RUNING");
        cron_mod.add_cardholder_details(element.cardholder.id);

    });
    resolve(obj);
}catch(error) {
    //console.log(error)

}
             }).catch(error =>  {
        	//console.log(error)
        
        });
  
    });
}catch(error)
{
    console.log("ERROR");
}
}
exports. check_gallagher_modified_cardholder_events=function()
{
   try{
    var dbDate = new Date().toLocaleString();
    var seconds = constants.MODIFIED_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS;
    var parsedDate = new Date(Date.parse(dbDate))
    var newDate = new Date(parsedDate.getTime() - (1000 * seconds))  
    newDate=newDate.toISOString();
   
    var obj = [];
	return new Promise((resolve) => {
        axios({
            method: 'get',
            httpsAgent: extagent,
            url:  constants.GALLAGHER_HOST + '/api/events?type=15005&after='+newDate,
            headers: {
                'Authorization': apiKey,
                'Content-Type' : 'application/json'
              }
          })
        .then(function (response) {
            try{
            var events=response.data.events;
          
    events.forEach(function(element) {
        console.log("RUNING");
        cron_mod.add_cardholder_details(element.cardholder.id);

    });
    resolve(obj);
}catch(error) {
    //console.log(error)

}
             }).catch(error =>  {
        	//console.log(error)
        
        });
  
    });
}catch(error)
{
    console.log("ERROR");
}
}
//===========================HELPER FUNCTIONS===========
exports.update_gallagher_pdf = function(card_holder_id,frid)
	{
   
    
		return new Promise((resolve) => {
			try {
                if(frid!=0 && frid!='')
                {
				let obj = {
					"authorised": true,
                    "description":frid				  
				}; 	
		var url=constants.GALLAGHER_HOST+'/api/cardholders/'+card_holder_id;
	
		
		axios({
			method: 'PATCH', 
			 httpsAgent: extagent,
			url: url,
			data : obj,
			headers: {
				  'Authorization': apiKey,
				  'Content-Type' : 'application/json'
				}
			})
		.then(function (response){
		
			resolve(true);	
		}).catch(error =>  {
			resolve(false);
			});
        }else{
            resolve(false); 
        }
		}catch(error)
		{
			resolve(false);
		}
        });
    
	}
 exports.add_cardholder_details=function(cardholder_id)
    {
        try{
        axios({
            method: 'get',
            httpsAgent: extagent,
            url:  constants.GALLAGHER_HOST + '/api/cardholders/'+cardholder_id,
            headers: {
                'Authorization': apiKey,
                'Content-Type' : 'application/json'
              }
          })
        .then(function (cardholderlist) {
          try{
            if(cardholderlist.status==200)
            {
             if(cardholderlist.data!=""){ 
                 try{  
    var phone="";
    var email="";
    var photo="";
    
    if(cardholderlist.data.personalDataDefinitions){
           
             
                for(var t=0;t<cardholderlist.data.personalDataDefinitions.length;t++)
                 {
                         if(cardholderlist.data.personalDataDefinitions[t]["@Email"])
                         {
                            email= cardholderlist.data.personalDataDefinitions[t]["@Email"]["value"];
                         }
                         if(cardholderlist.data.personalDataDefinitions[t]["@Phone"])
                         {
                            phone= cardholderlist.data.personalDataDefinitions[t]["@Phone"]["value"];
                         }
                         if(cardholderlist.data.personalDataDefinitions[t]["@Photo"])
                         {
                            photo= cardholderlist.data.personalDataDefinitions[t]["@Photo"].value.href;
                         }
                         
                 }
             
                }
            
            
              
              
                   if(cardholderlist.data.cards){
                   
                    for(var i=0;i<cardholderlist.data.cards.length;i++)
                    {
                        var status=cardholderlist.data.cards[i].status.value;
                        var sy=cardholderlist.data.cards[i].type.href;
                        var card_type=sy.match(/([^\/]*)\/*$/)[1];
                if(cardholderlist.data.cards[i].credentialClass!="mobile" && status=='Active' && cardholderlist.data.cards[i].number!='' && card_type==constants.FR_CARD_TYPE)
                  {
                            var vfrom = new Date(cardholderlist.data.cards[i].from);
                            var valid_from=dateFormat(vfrom.toString(), "yyyy-mm-dd HH:MM:ss");  
                            var vto = new Date(cardholderlist.data.cards[i].until);
                            var valid_to=dateFormat(vto.toString(), "yyyy-mm-dd HH:MM:ss");
                            var mynumber=cardholderlist.data.cards[i].number;
                           
                            //===========================PDFS=================================
                            var myphoto="";
                            if(photo!=""){
                            var phot= downloadImage(photo,cardholderlist.data.id);
                            var intervaly = setInterval(function() 
                            {
                            phot.then(te=>{ 
                                
                                if(te=='OK'){
                                    clearInterval(intervaly);
                                    var intervaX = setInterval(function() 
                                    {
                                    myphoto=base64_encode(cardholderlist.data.id);
                                
                                   
                             if(myphoto)
                             {
                           clearInterval(intervaX); 
                            //=============ADDDING CARDS=======================================
 
                            var div=cardholderlist.data.division.href;
                            var division=div.match(/([^\/]*)\/*$/)[1];
                           var personal_info={
                                'personID':cardholderlist.data.id,    
                                'firstname':cardholderlist.data.firstName,
                                'lastname':cardholderlist.data.lastName,
                                'division':division,
                                'phone':phone,
                                'email':email,
                                'photo':myphoto,
                                'postcode':cardholderlist.data.description, 
                                            }  
                            //=================SETTING CARDS======================//
                            var frcardnumber="";
                            var slnumber="";
                            var numbers = constants.ENCODED_NUMBERS;
                            var ay = numbers.indexOf(mynumber);
                            if(ay>=0)
                            {
                            frcardnumber=constants.FR_NUMBERS[ay];
                            slnumber=constants.SL_NUMBERS[ay];
                            }
                            var fr_card_array={
                            'card_number':frcardnumber,
                            'valid_from':valid_from,
                            'valid_to':valid_to,
                            }
                            var sl_card_array={
                            'card_number':slnumber,
                            'valid_from':valid_from,
                            'valid_to':valid_to,
                            }
    //====================GROUP SETTINGS=========================
                        var sl_groups="";
                        var fr_groups="";
                        var sl_levels="";
                        for(var k=0;k<cardholderlist.data.accessGroups.length;k++)
                        {
                            var grp=cardholderlist.data.accessGroups[k].accessGroup.href;
                            var group_id=grp.match(/([^\/]*)\/*$/)[1];
                            var gg_groups = constants.GG_GROUPS;
                            var az = gg_groups.indexOf(group_id); 
                            if(az>0)
                            {
                                sl_groups=constants.SL_GROUPS[az]; 
                                sl_levels=constants.SL_LEVELS[az]; 
                                fr_groups=constants.FR_GROUPS[az];
                            }
                        }

                        var slgroup={
                            'levels':sl_levels,
                            'groups':sl_groups
                            }
                            console.log(slgroup);
    //==========================================================
                           
           
        
                            //==============================FR==============================  
                            if(cardholderlist.data.description!=undefined && cardholderlist.data.description!='')
                            {
                                if(constants.FR_ACTIVE==1){                
                                    var face_id= fr_mod.add_update_fr_card(personal_info['firstname'],personal_info['lastname'],cardholderlist.data.description,fr_card_array);
                                    face_id.then(facerep=>{
                                       if(facerep){
                                        console.log("USER_FR Updated");
                                        
                                        var mainf=path.join(__dirname,personal_info['personID']+'.jpg');
                                        try{
                                            fs.unlinkSync(mainf);
                                            }catch(error){}
                                       }else{
                                        console.log("USER_FR Not  Updated");  
                                       }
                                        });

                                    }
                                    //=================================SL===============================
                                    if(constants.SL_ACTIVE==1){ 
                                    var lift_id= lift_mod.update_lift_user(personal_info['firstname'],personal_info['lastname'],'',personal_info['personID'],sl_card_array,slgroup['levels'],slgroup['groups']);
                                    lift_id.then(lferep=>{
                                        if(lferep){
                                         console.log("USER_SL Updated");
                                        }else{
                                         console.log("USER_SL Not  Updated");  
                                        }
                                         });
                                    }       
                            }else{
                            if(constants.FR_ACTIVE==1){                
                            var face_id= fr_mod.add_fr_user (personal_info,fr_card_array,fr_groups);
                            face_id.then(facerep=>{
                            var gg = facerep[0]['FR']['person_id'];
                            console.log("USER_FR="+gg);
                            cron_mod.update_gallagher_pdf(personal_info['personID'],gg);
                            var mainf=path.join(__dirname,personal_info['personID']+'.jpg');
                            try{
                            fs.unlinkSync(mainf);
                            }catch(error){}
                            });
                            }
                            //=================================SL===============================
                            if(constants.SL_ACTIVE==1){ 
                            var lift_id= lift_mod.add_lift_user (personal_info,slgroup,sl_card_array);
                            lift_id.then(facerep=>{
                            var gg = facerep[0]['SL']['person_id'];
                            console.log("USER_SL="+gg);
    
                            });
    
                            }
                        }
                        }
    
                    }, 2000);
                    //==================================================================
                                    }
                    
                    });
                    
                    }, 2000);
                    //===================================================//
    
                }//PDF Photo available or not
    else{
        console.log("Not Added Cardholder Image; Please remove face card and add again after adding image");
    }
    
    
    
                        }//check cards is face card or not
                        
                    }//end of for loop
                }//end of cards section
             
    
    
    
    }catch(error)
    {
        console.log("PDFs Not Added ! Please remove Face card before");
    }
                }
    
    
            
    
                                       }
    
                                    }catch(error)
                                    {
    
                                    }
    
        }).catch(error =>  {
            //console.log(error)
        
        });
    }catch(error)
    {
    
    }
    }
exports.get_post_code=function(cardholder_id)
{
    try{
        return new Promise((resolve) => {
    axios({
        method: 'get',
        httpsAgent: extagent,
        url:  constants.GALLAGHER_HOST + '/api/cardholders/'+cardholder_id,
        headers: {
            'Authorization': apiKey,
            'Content-Type' : 'application/json'
          }
      })
    .then(function (cardholderlist) {
      try{
        if(cardholderlist.status==200)
        {
         if(cardholderlist.data!=""){ 
             try{  
var postcode="";
if(cardholderlist.data.description){    
    postcode= cardholderlist.data.description;   
resolve(postcode);
            }else{
                resolve(false);  
            }
    
}catch(error)
{
    resolve(false);
}
            }
                                   }

                                }catch(error)
                                {
                                    resolve(false);
                                }

    }).catch(error =>  {
        resolve(false);
    
    });
});
}catch(error)
{
    resolve(false);
}
}
//=======================================================

