import {
  message
} from 'antd';
import {
  hashHistory,
} from 'react-router';
//获取年份
export  function formatDate(now)   {
              var   now= new Date(now)
              var   year=now.getFullYear(); 
              var   month=now.getMonth()+1;     
              var   date=now.getDate();     
              var   hour=now.getHours();     
              var   minute=now.getMinutes();     
              var   second=now.getSeconds();     
              return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;
}


//转换时间
export function timeFormat(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
 
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
 
  return [year, month, day].join('-');
}

//token失效
export function tokenLogOut(data) {
    if(data.code ==10004){
        message.error(data.message);
        hashHistory.push('/');

    }else{
      message.error(data.message);
    }

}

export function GetRequest(url) {   
   // /var url = location.search; //获取url中"?"符后的字串   
   var theRequest = new Object();   
   if (url.indexOf("?") != -1) {   
      var str = url.substr(1);   
      var strs = str.split("&");   
      for(var i = 0; i < strs.length; i ++) {   
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
      }   
   }   
   return theRequest; 

}

let ImgUrl = "http://120.78.186.139:8088/kgapi/image/upload";

let uploadUrl = "https://kgcom.oss-cn-shenzhen.aliyuncs.com/";
export {
  ImgUrl,
  uploadUrl
}