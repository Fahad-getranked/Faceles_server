const express= require("express");
const axios = require('axios');
var constants=require("../constants.js");

const https=require("https");
var apiKey;
var extagent;
var extagent;
var url;
var access_group=0;
var card_type=0;
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
extagent=agent

exports. add_lift_user = function (personal_info,lift_groups,cards)
{
  
    return new Promise((resolve) => {
        try {
            var obj={
                'username':constants.LOGIN_LIFT_USER,
                'password':constants.LOGIN_LIFT_PASSWORD
            }
        axios({
            method: 'POST', 
            httpsAgent: extagent,
            url: constants.LIFT_HOST+'/schindler/v1/api/login',
            headers: { 
                'Content-Type': 'application/json'
              },
            data :obj,
        
            })
        .then(response=>{
         if (response.status == 200) {
          if(response.data!='')
           {
            // resolve(response.data[0]['token']);
            try {
                var data = JSON.stringify({"gateway_id":"","jdata":{"command":"addUser_setZoneAccess","device_id":"","parameter":{"personID":""+personal_info['personID']+"","familyName":""+personal_info['lastname']+"","firstName":""+personal_info['firstname']+"","company":"","enterprise":"","department":"","profileName":"default","badgeNo1":""+cards['card_number']+"","badgeNo2":"","badgeNo3":"","entryDate":""+cards['valid_from']+"","exitDate":""+cards['valid_to']+"","autoZone":"specific,"+lift_groups['levels']+"","accessZonesAlways":""+lift_groups['groups']+""}}});
            axios({
                method: 'POST', 
                httpsAgent: extagent,
                url: constants.LIFT_HOST+'/schindler/v1/api/command',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer '+response.data[0]['token']
                  },
                data :data,
            
                })
            .then(response=>{
                console.log(response.data);
             if (response.status == 200) {
                if(response.data!='')
               {
                   if(response.data.data['status']=='success')
                   {
                    var myarray=[];
                    myarray.push({"SL":{"person_id":personal_info['personID'],"message":"success"}});
                    resolve(myarray);
                   }else{
                    var myarray=[];
                    myarray.push({"SL":{"person_id":0,"message":"gateway offline"}});
                    resolve(myarray);
                   }
               
               }else{
                var myarray=[];
                myarray.push({"SL":{"person_id":0,"message":"Invalid Request"}});
                resolve(myarray);
               }
                  
                  
    
                }else{
                    var myarray=[];
                    myarray.push({"SL":{"person_id":0,"message":"Invalid Request"}});
                    resolve(myarray);
                }
    
            });
        }catch(error)
        {
            var myarray=[];
            myarray.push({"SL":{"person_id":0,"message":"Invalid Request"}});
            resolve(myarray);
        }
           }else{
            var myarray=[];
            myarray.push({"SL":{"person_id":0,"message":"Invalid Request"}});
            resolve(myarray);
           }
         
              

            }else{
                var myarray=[];
                myarray.push({"SL":{"person_id":0,"message":"Invalid Request"}});
                resolve(myarray);
            }

        });
    }catch(error)
    {
        var myarray=[];
        myarray.push({"SL":{"person_id":0,"message":"Invalid Request"}});
        resolve(myarray);
    }
  
    });
}
exports. update_lift_user = function (firstname,lastname,pname,gallagher_id,cards,level,lift_groups)
{
 
    return new Promise((resolve) => {
        try {
            var obj={
                'username':constants.LOGIN_LIFT_USER,
                'password':constants.LOGIN_LIFT_PASSWORD
            }
        axios({
            method: 'POST', 
            httpsAgent: extagent,
            url: constants.LIFT_HOST+'/schindler/v1/api/login',
            headers: { 
                'Content-Type': 'application/json'
              },
            data :obj,
        
            })
        .then(response=>{
         if (response.status == 200) {
          if(response.data!='')
           {
            // resolve(response.data[0]['token']);
            try {
                var data = JSON.stringify({"gateway_id":"","jdata":{"command":"addUser_setZoneAccess","device_id":"","parameter":{"personID":""+gallagher_id+"","familyName":""+lastname+"","firstName":""+firstname+"","company":"","enterprise":"","department":"","profileName":"default","badgeNo1":""+cards['card_number']+"","badgeNo2":"","badgeNo3":"","entryDate":""+cards['valid_from']+"","exitDate":""+cards['valid_to']+"","autoZone":"specific,"+level+"","accessZonesAlways":""+lift_groups+""}}});
            axios({
                method: 'POST', 
                httpsAgent: extagent,
                url: constants.LIFT_HOST+'/schindler/v1/api/command',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer '+response.data[0]['token']
                  },
                data :data,
            
                })
            .then(response=>{
               
             if (response.status == 200) {
                if(response.data!='')
               {
                  
                   if(response.data.data['status']=='success')
                   {
                   
                    resolve(true);
                   }else{
                    resolve(false);
                   }
               
               }else{
                resolve(false); 
               }
                  
                  
    
                }else{
                    resolve(false);
                }
    
            });
        }catch(error)
        {
            resolve(false);
        }
           }else{
            resolve(false);
           }
         
              

            }else{
                resolve(false);
            }

        });
    }catch(error)
    {
        resolve(error);
    }
  
    });
          
    
}
exports. delete_lift_user = function (lift_id)
{
  
    return new Promise((resolve) => {
        try {
            var obj={
                'username':constants.LOGIN_LIFT_USER,
                'password':constants.LOGIN_LIFT_PASSWORD
            }
        axios({
            method: 'POST', 
            httpsAgent: extagent,
            url: constants.LIFT_HOST+'/schindler/v1/api/login',
            headers: { 
                'Content-Type': 'application/json'
              },
            data :obj,
        
            })
        .then(response=>{
         if (response.status == 200) {
          if(response.data!='')
           {
            // resolve(response.data[0]['token']);
            try {
                var data = JSON.stringify({"gateway_id":"","jdata":{"command":"deleteUser","device_id":"","parameter":{"personID":""+lift_id+""}}});
            axios({
                method: 'POST', 
                httpsAgent: extagent,
                url: constants.LIFT_HOST+'/schindler/v1/api/command',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': 'Bearer '+response.data[0]['token']
                  },
                data :data,
            
                })
            .then(response=>{
                if(response.data.data['status']=='success')  {
                resolve(true); 
    
                }else{
                    resolve(false); 
                }
    
            });
        }catch(error)
        {
            resolve(false); 
        }
           }else{
            resolve(false); 
           }
         
              

            }else{
                resolve(false); 
            }

        });
    }catch(error)
    {
        resolve(error);
    }
  
    });
          
    
}

