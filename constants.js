//=========================CONFIG READING============
//===================================================
var xlsx = require("xlsx");
const lineReader = require('line-reader');
lineReader.eachLine('./config.txt', function(line) {
    var lineitem=line.split('=');
    // console.log(lineitem[0]+"--------------"+lineitem[1]);
    var tag=lineitem[0].trim();

    if(tag=='GALLAGHER_KEY')
    {
        var value=lineitem[1].trim();
      
        exports.GALLAGHER_KEY = value;
       
        
       
    }else if(tag=='GALLAGHER_HOST')
    {
        var value=lineitem[1].trim();
      
        exports.GALLAGHER_HOST =value;
        
        
       
    }
    else if(tag=='FR_HOST')
    {
        var value=lineitem[1].trim();
      
        exports.FR_HOST =value;
        
        
       
    }
    else if(tag=='FR_KEY')
    {
        var value=lineitem[1].trim();
      
        exports.FR_KEY =value;
        
        
       
    }
    else if(tag=='FR_SECRET_KEY')
    {
        var value=lineitem[1].trim();
      
        exports.FR_SECRET_KEY =value;
        
        
       
    }
    else if(tag=='FR_LOCAL_IP')
    {
        var value=lineitem[1].trim();
      
        exports.FR_LOCAL_IP =value;
        
        
       
    }
    else if(tag=='FR_LOCAL_IP')
    {
        var value=lineitem[1].trim();
      
        exports.FR_LOCAL_IP =value;
        
        
       
    }
    else if(tag=='FR_PORT')
    {
        var value=lineitem[1].trim();
      
        exports.FR_PORT =value;
        
        
       
    }
    else if(tag=='FR_PROTOCOL')
    {
        var value=lineitem[1].trim();
      
        exports.FR_PROTOCOL =value;
        
        
       
    }
    else if(tag=='LIFT_HOST')
    {
        var value=lineitem[1].trim();
      
        exports.LIFT_HOST =value;
        
        
       
    }
    else if(tag=='LOGIN_LIFT_USER')
    {
        var value=lineitem[1].trim();
      
        exports.LOGIN_LIFT_USER =value;
        
        
       
    }
    else if(tag=='LOGIN_LIFT_PASSWORD')
    {
        var value=lineitem[1].trim();
      
        exports.LOGIN_LIFT_PASSWORD =value;
        
        
       
    }
    else if(tag=='ADD_CARDHOLDER_EVENTS')
    {
        var value=lineitem[1].trim();
      
        exports.ADD_CARDHOLDER_EVENTS =value;
        
        
       
    }
    else if(tag=='ADD_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS')
    {
        var value=lineitem[1].trim();
      
        exports.ADD_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS =value;
        
        
       
    } 
    else if(tag=='FR_ACTIVE')
    {
        var value=lineitem[1].trim();
      
        exports.FR_ACTIVE =value;
        
        
       
    }   
    else if(tag=='SL_ACTIVE')
    {
        var value=lineitem[1].trim();
      
        exports.SL_ACTIVE =value;
        
        
       
    }  
    else if(tag=='DELETE_CARDHOLDER_EVENTS')
    {
        var value=lineitem[1].trim();
      
        exports.DELETE_CARDHOLDER_EVENTS =value;
        
        
       
    } 
    else if(tag=='DELETE_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS')
    {
        var value=lineitem[1].trim();
      
        exports.DELETE_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS =value;
         
       
    }
    else if(tag=='UPDATE_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS')
    {
        var value=lineitem[1].trim();
      
        exports.UPDATE_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS =value;
         
       
    } 
       else if(tag=='UPDATE_CARDHOLDER_EVENTS')
    {
        var value=lineitem[1].trim();
      
        exports.UPDATE_CARDHOLDER_EVENTS =value;
         
       
    }  
    else if(tag=='MODIFIED_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS')
    {
        var value=lineitem[1].trim();
      
        exports.MODIFIED_CARDHOLDER_EVENTS_CHECKING_PER_SECONDS =value;
         
       
    } 
       else if(tag=='MODIFIED_CARDHOLDER_EVENTS')
    {
        var value=lineitem[1].trim();
      
        exports.MODIFIED_CARDHOLDER_EVENTS =value;
         
       
    } 
    else if(tag=='FR_CARD_TYPE')
    {
        var value=lineitem[1].trim();
      
        exports.FR_CARD_TYPE =value;
         
       
    } 
  
 
});

// var wb=xlsx.readFile('./zones_groups.xlsx');
// var ws=wb.Sheets['Sheet1'];
// var data=xlsx.utils.sheet_to_json(ws);
// var k=0;
// var newData=data.map(function(record){
//    // console.log(data[k]['Deices']);
//    // console.log(data[k]['Zones']);
//     if(data[k]['Deices']=='FR')
//     {
//          exports.FR_USER_ORG =data[k]['Groups'];
//         console.log(data[k]['Groups']);
//     }
//     if(data[k]['Deices']=='SL')
//     {
      
//          exports.SL_USER_ZONES =data[k]['Groups'];
//          exports.SL_USER_AUTO_ZONES =data[k]['Zones'];
//     }

//     k++;
// })

// var wb=xlsx.readFile('./zones_groups.xlsx');
// var ws=wb.Sheets['Sheet1'];
// var data=xlsx.utils.sheet_to_json(ws);


// var k=0;
// var newData=data.map(function(record){
//    // console.log(data[k]['Deices']);
//    // console.log(data[k]['Zones']);
//     if(data[k]['Deices']=='FR')
//     {
//          exports.FR_USER_ORG =data[k]['Groups'];
//         console.log(data[k]['Groups']);
//     }
//     if(data[k]['Deices']=='SL')
//     {
      
//          exports.SL_USER_ZONES =data[k]['Groups'];
//          exports.SL_USER_AUTO_ZONES =data[k]['Zones'];
//     }

//     k++;
// });
var gg_groups=[];
var fr_groups=[];
var sl_groups=[];
var sl_levels=[]; 
var wb=xlsx.readFile('./zones_groups.xlsx');
var ws=wb.Sheets['Sheet1'];
var data=xlsx.utils.sheet_to_json(ws);
var k=0;
var newData=data.map(function(record){

    gg_groups.push(data[k]['GG Groups']);
    fr_groups.push(data[k]['FR Groups']);
    sl_groups.push(data[k]['SL Groups']);
    sl_levels.push(data[k]['SL Levels']);
            //==========================
    k++;
    
});
exports.GG_GROUPS=JSON.stringify(gg_groups);
exports.FR_GROUPS=fr_groups;
exports.SL_GROUPS=sl_groups;
exports.SL_LEVELS=sl_levels;
var encodecards=[];
var csnnumber=[];
var frnumber=[];
var slnumber=[]; 
var wb=xlsx.readFile('./access_cards.xlsx');
var ws=wb.Sheets['Sheet1'];
var data=xlsx.utils.sheet_to_json(ws);
var k=0;
var newData=data.map(function(record){

 csnnumber.push(data[k]['CSN Number']);
     encodecards.push(data[k]['Encoded Number']);
            //=============FR NUMBER====
            const number = parseInt(data[k]['CSN Number']);
            const result = number.toString(2);
            var lastChar = result.slice(-23)+'10001000';
            var digit = parseInt(lastChar, 2);
           // console.log(digit);
            frnumber.push(digit);
            //==========================
            //=============SL NUMBER====
            const numx = parseInt(data[k]['CSN Number']);
            const res = numx.toString(2);
            var lastCh = res.slice(-32);
            var dig = parseInt(lastCh, 2);
            var hexString = '27'+(dig.toString(16)+'00000020').toUpperCase();
            slnumber.push(hexString);
            //==========================
    k++;
    
});

exports.ENCODED_NUMBERS=encodecards;
exports.CSN_NUMBERS=csnnumber;
exports.FR_NUMBERS=frnumber;
exports.SL_NUMBERS=slnumber;


