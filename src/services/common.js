import {
  message
} from 'antd';
import {
  withRouter,
  routerRedux,
  BrowserRouter,
  Link,
} from 'dva/router';

import dva from 'dva';
import md5 from 'js-md5';
let Base64 = require('js-base64').Base64;
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory()

function p(s) {
        return s < 10 ? '0' + s: s;
    }
//获取年份

export  function formatDate(now)   {
      var   now= new Date(now)
      var   year=now.getFullYear(); 
      var   month=now.getMonth()+1;     
      var   date=now.getDate();     
      var   hour=now.getHours();     
      var   minute=now.getMinutes();     
      var   second=now.getSeconds();     
      return   year+"-"+p(month)+"-"+p(date)+"   "+p(hour)+":"+p(minute)+":"+p(second);
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
export function tokenLogOut(data,dispatch) {
    if(data.code ==10004){
         message.error(data.message,5);
         dispatch(routerRedux.push("/#/user/user_admin"))
        //history.go('/#/')
        

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

export function Base64Url(params){
    var data = Base64.encode(JSON.stringify(params));
    return data
}

export function SignUrl (data){
    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('Kgtoken')
    var sign = md5(data+userId+'_'+token)
    return sign
}

let options ={
  "lang": {
    "placeholder": "选择时间",
    "rangePlaceholder": [
      "开始日期",
      "结束日期"
    ],
    "today": "今天",
    "now": "当前时间",
    "backToToday": "Back to today",
    "ok": "确定",
    "clear": "Clear",
    "month": "Month",
    "year": "Year",
    "timeSelect": "选择时间",
    "dateSelect": "选择日期",
    "monthSelect": "Choose a month",
    "yearSelect": "Choose a year",
    "decadeSelect": "Choose a decade",
    "yearFormat": "YYYY",
    "dateFormat": "M/D/YYYY",
    "dayFormat": "D",
    "dateTimeFormat": "M/D/YYYY HH:mm:ss",
    "monthFormat": "MMMM",
    "monthBeforeYear": true,
    "previousMonth": "Previous month (PageUp)",
    "nextMonth": "Next month (PageDown)",
    "previousYear": "Last year (Control + left)",
    "nextYear": "Next year (Control + right)",
    "previousDecade": "Last decade",
    "nextDecade": "Next decade",
    "previousCentury": "Last century",
    "nextCentury": "Next century"
  },
  "timePickerLocale": {
    "placeholder": "选择时间"
  }
}


let ImgUrl = "http://120.78.186.139:8088/kgapi/image/upload"; //开发
//let ImgUrl = "http://172.16.0.15/image/upload"; //测试
let uploadUrl = "https://kgcom.oss-cn-shenzhen.aliyuncs.com/";//开发
//let uploadUrl = "https://kgtest01.oss-cn-beijing.aliyuncs.com"; //测试


//服务器
//let urlprefix = "http://172.16.1.108:8081/kgapi";
let urlprefix = "http://120.78.186.139:8088/kgapi";//开发
//let urlprefix = "http://172.16.0.15"; //测试
export {
  ImgUrl,
  uploadUrl,
  options,
  urlprefix
}