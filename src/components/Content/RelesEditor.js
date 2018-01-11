import React from 'react';
import { Form, Icon,Modal, Input, Button, InputNumber,Select,Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import {
  withRouter,
  routerRedux,
  Link
} from 'dva/router';
import style_pagination from '../pagination.css';
import Editor from '../../editor/index';
import styles from './Content_Opinion_Show.css';
import RelationModal from '../Setting/RelationUser';
import {options,uploadUrl,formatDate} from "../../services/common"

import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const formItemLayout = {
      labelCol: {
        xs: { span: 1 },
        sm: { span: 1 },
        xl: { span: 2 },
        xxl:{span:1}
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
        xl: { span: 22 },
        xxl:{span:23}
      },
    };
const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 1,
        },
      },
    };

let artSorce =2;
let timeDis =true;
let sec=0;
let titleNum=0;
var n =5000;
var x = 5000;
let autoSaveInterval  = null;


function RelesEditor({
  dispatch,
  location,
  imgUrl,
  ColumnList,
  UserById,
  setting,
  firstC,
  secondC,
  saveId,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
    getFieldValue
  },
}){
  let merId =localStorage.getItem("userId");
  
  const options = ColumnList;
  //console.log("setting",location)
  /*if(location.pathname!="/content/release_article"){
    alert(1)
    window.clearInterval(autoSaveInterval)
    console.log(autoSaveInterval)
  }*/
  const {RelationVisible} =setting
  function handleSubmit (){
      validateFields((errors) => {
        if (errors) {
          return;
        }else{
          const data = {...getFieldsValue()};
         // console.log(formatDate(new Date(data.time)))
          if(imgUrl == ""){
            message.error('请上传封面图')
            return true
          }
          var tagsName ="";
          if(data.tag4==undefined&&data.tag5==undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3
          }else if(data.tag4!=undefined&&data.tag5==undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3+','+data.tag4
          }else if(data.tag4!=undefined&&data.tag5!=undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3+','+data.tag4+','+data.tag5
          }
         dispatch({
              type:'content/publishArticle',
              payload:{
                articleId:saveId,
                articleTitle:data.articleTitle,
                articleText:data.text.txt.html(),
                tagnames:tagsName,
                description:(data.artic==undefined||data.artic=="")?data.text.txt.text().substring(0,100):data.artic,
                image:imgUrl,
                type:parseInt(data.type),
                columnId:parseInt(data.column[0]),
                secondColumn:parseInt(data.column[1]),
                displayStatus:parseInt(data.radioT),
                displayOrder:parseInt(data.sort),
                articleSource:data.articleSource,
                articleLink:data.articleLink,
                commentSet:data.commentSet == "true"?true:false,
                publishSet:data.radioG == "true"?true:false,
                createUser:UserById.kgUserId,
                sysUser:merId,
                bonusStatus:parseInt(data.bonusStatus),
                textnum:data.text.txt.text().split('&nbsp;').join('').length,
                publishTime:data.time!=undefined?formatDate(new Date(data.time)):null,
                publishStatus:1,
                browseNum:data.browseNum,
                thumbupNum:data.thumbupNum,
                collectNum:data.collectNum,
              }
          })
        }
      })
  }
  function publishStatus (){
          validateFields(['articleTitle'],(errors) => {
              if(errors){
                return
              }
           const data = {...getFieldsValue()};
           var tagsName ="";
          if(data.tag1==undefined){
             tagsName ="";
          }else if(data.tag1==!undefined&&data.tag2==undefined){
            tagsName =data.tag1;
          }else if(data.tag1==!undefined&&data.tag2!==undefined&&data.tag3==undefined){
           tagsName =data.tag1+','+data.tag2
          }
          else if(data.tag4==undefined&&data.tag5==undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3
          }else if(data.tag4!=undefined&&data.tag5==undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3+','+data.tag4
          }else if(data.tag4!=undefined&&data.tag5!=undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3+','+data.tag4+','+data.tag5
          }
          //console.log(data)
          if(data.text!=undefined){
            dispatch({
              type:'content/publishArticle',
              payload:{
                articleId:saveId,
                articleTitle:data.articleTitle,
                articleText:data.text.txt.html(),
                tagnames:tagsName,
                description:(data.artic==undefined||data.artic=="")?data.text.txt.text().substring(0,100):data.artic,
                image:imgUrl,
                type:parseInt(data.type),
                columnId:data.column!=undefined?parseInt(data.column[0]):null,
                secondColumn:data.column!=undefined?parseInt(data.column[1]):null,
                displayStatus:parseInt(data.radioT),
                displayOrder:parseInt(data.sort),
                articleSource:data.articleSource,
                articleLink:data.articleLink,
                commentSet:data.commentSet!=undefined?(data.commentSet == "true"?true:false):null,
                publishSet:data.radioG!=undefined?(data.radioG == "true"?true:false):null,
                createUser:UserById.kgUserId,
                sysUser:merId,
                bonusStatus:parseInt(data.bonusStatus),
                publishStatus:0,
                textnum:data.text.txt.text().split('&nbsp;').join('').length,
                browseNum:data.browseNum,
                thumbupNum:data.thumbupNum,
                collectNum:data.collectNum,

              }
          })
          }else{
            dispatch({
              type:'content/publishArticle',
              payload:{
                articleId:saveId,
                articleTitle:data.articleTitle,
                articleText:"",
                tagnames:tagsName,
                description:data.artic,
                image:imgUrl,
                type:parseInt(data.type),
                columnId:data.column!=undefined?parseInt(data.column[0]):null,
                secondColumn:data.column!=undefined?parseInt(data.column[1]):null,
                displayStatus:parseInt(data.radioT),
                displayOrder:parseInt(data.sort),
                articleSource:data.articleSource,
                articleLink:data.articleLink,
                commentSet:data.commentSet!=undefined?(data.commentSet == "true"?true:false):null,
                publishSet:data.radioG!=undefined?(data.radioG == "true"?true:false):null,
                createUser:UserById.kgUserId,
                sysUser:merId,
                bonusStatus:parseInt(data.bonusStatus),
                publishStatus:0,
                textnum:0,
                browseNum:data.browseNum,
                thumbupNum:data.thumbupNum,
                collectNum:data.collectNum,
              }
          })
          }
          
          })
          
      
  }

  
  function showModal(){
      dispatch({
            type:'content/showBgModal'
      })
  }
  function edtiorContent (editor){
        //console.log(editor.txt.html());
        /*var html  = editor.txt.html()
        var value  = editor.txt.text();*/
        /*localStorage.setItem("text", text);
        localStorage.setItem("html", html);*/
        var arr = [];
        arr.push(editor.txt.html(),editor.txt.text())
        //console.log(editor.txt.text())
        var lg = editor.txt.text();
        let CX = lg.split('&nbsp;')
        lg = CX.join('');
        var l =lg.length
        x = n-l
        return arr
    }
  function handleChange(imgUrl){
    console.log(imgUrl)
    return imgUrl
  }

  function handleProvinceChange(value){
    //console.log(value)
    sec=parseInt(value)
    secondCity=parseInt(value)
  }
  function showUser(){
    dispatch({
        type:"setting/showRelationModal"
      })
  }
  function typeChange (e){
    //console.log(e.target.value)
    artSorce=parseInt(e.target.value)
  }
  const RelationModalProps ={
    visible:RelationVisible,
    deskUserId:setting.deskUserId,
    onCancel(){
      dispatch({
        type:"setting/hideRelationModal"
      })
    },
    onOk(record,deskUserId){
      //console.log(record,values)
     Modal.confirm({
        title:"确认关联前台用户吗？",
        okText : '确定',
        onOk() {
            //console.log(values,record)
              dispatch({
                type:"setting/setKgUser",
                payload:{
                  userId:merId,
                  kgUserId:deskUserId
                }
                  })
          },
          onCancel() {
                console.log('Cancel');
          },  
      })
      
    },
    handleBlur(e){
     if(e.target.value.length == 11){
        dispatch({
          type:"setting/getUserId",
          payload:{
            userMobile:e.target.value
          }
        })
      }
    }
  }

  function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
  }
  function disabledDate(current) {
  // Can not select days before today and today
  console.log(current)
  //console.log(moment())
  return current && current <= moment()
  }

  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  function onChange(rule, value, callback) {
    //console.log(value)
    
    if(value ==undefined){
      callback()
    }else{
       var arr = [];
        arr.push(value.txt.html(),value.txt.text())
        let CX = arr[1].split('&nbsp;')
        
        var lg = CX.join('');
        if(lg.length==0){
          callback('请输入正文')
        }else if (lg.length>5000){
          callback('请输入1-5000个字符')
        }else{
          callback()
        }
    }
   
    
    /*let n = 0;
        for(var i in this.tag){
            if (this.tag[i].value == '') {
              // callback(new Error('请输入密码'));
              n +=1
            }else if(this.tag[i].value.length > 5 || this.tag[i].value.length < 2){
              callback(new Error('每个tag：2-5个汉字'));
            }
        }
        if(n > 2){
          callback(new Error('至少输入3个tag'));
        }else{
          callback()
        }*/

  }


  function handleTime(e){
    console.log("e",e.target.value)
    if(e.target.value=="true"){
      timeDis=false
    }else{
      timeDis=true
    }
  }
  function edtiorContentText(t){

  }
 function previewPage(){
   
            const data = {...getFieldsValue()};
            console.log(data)
            if(data.text==undefined){
              localStorage.setItem("previewTitle", data.articleTitle);
              localStorage.setItem("previewText", "");
              localStorage.setItem("previewartic", "");
              localStorage.setItem("previewdec", "");
            }else{
              localStorage.setItem("previewTitle", data.articleTitle);
              localStorage.setItem("previewText", data.text.txt.html());
              localStorage.setItem("previewartic", data.artic);
              localStorage.setItem("previewdec", data.text.txt.text().substring(0,30));
            }
           
      
       
       window.open('/#/preview')
  }
  //console.log(secondC[sec])
  var Item =['1','2','3','4','5']
  function tagValue1(rule, value, callback){
    console.log(value)
    var arr=[];
      const data = {...getFieldsValue(['tag2','tag3','tag4','tag5'])}
      arr.push(data.tag2,data.tag3,data.tag4,data.tag5)
      if(value==undefined||value==""){
        callback()
      }else{
        for(var i in arr){
        if(value==arr[i]){
          //console.log(value,arr[i])
           callback("标签不能重复")
        }
      }
       callback()
      }
  }
  function tagValue2(rule, value, callback){
    console.log(value)
    var arr=[];
      const data = {...getFieldsValue(['tag1','tag3','tag4','tag5'])}
      arr.push(data.tag1,data.tag3,data.tag4,data.tag5)
      if(value==undefined||value==""){
        callback()
      }else{
        for(var i in arr){
        if(value==arr[i]){
          //console.log(value,arr[i])
           callback("标签不能重复")
        }
      }
       callback()
      }
  }
  function tagValue3(rule, value, callback){
    console.log(value)
    var arr=[];
      const data = {...getFieldsValue(['tag1','tag2','tag4','tag5'])}
      arr.push(data.tag1,data.tag2,data.tag4,data.tag5)
      if(value==undefined||value==""){
        callback()
      }else{
        for(var i in arr){
        if(value==arr[i]){
          //console.log(value,arr[i])
           callback("标签不能重复")
        }
      }
       callback()
      }
  }
  function tagValue4(rule, value, callback){
   
    var arr=[];
      const data = {...getFieldsValue(['tag1','tag3','tag2','tag5'])}
      arr.push(data.tag1,data.tag2,data.tag3,data.tag5)
      if(value==undefined||value==""){
        callback()
      }else{
        for(var i in arr){
        if(value==arr[i]){
          //console.log(value,arr[i])
           callback("标签不能重复")
        }
      }
       callback()
      }
      
     
  }
  function tagValue5(rule, value, callback){
    console.log(value)
    var arr=[];
      const data = {...getFieldsValue(['tag1','tag3','tag4','tag2'])}
      arr.push(data.tag1,data.tag2,data.tag4,data.tag3,)
      if(value==undefined||value==""){
        callback()
      }else{
        for(var i in arr){
        if(value==arr[i]){
          //console.log(value,arr[i])
           callback("标签不能重复")
        }
      }
       callback()
      }
  }
  function onChangeTag(rule, value, callback){
    const data = {...getFieldsValue(['tag2'])}
    if(data.tag2==undefined||data.tag2==""){
      callback("请至少输入三个标签")
    }else{
      callback()
    }
    //console.log(data)
    //console.log(getFieldValue())
    //console.log(this.form.getFieldValue('password'))
    /*if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }*/
    
  }
  /*function handleNumberChange(e){
     const number = parseInt(e.target.value || 0, 10);
     console.log(number)
      if (isNaN(number)) {
        return;
      }
  }*/
  function handleNumberChange(e){
    const { value } = e.target;
   
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        console.log(value)
        return 
    }
  }
  // var time1 = setInterval(publish(),60000)
  //var time2 =setInterval(publish(),10000)
  function handleFocus(){
    if(saveId!=undefined&&saveId!=0){
      return
    }else{
      aoSave()
    }
      
     // time1()
  }
  function publish (list){
        
        dispatch({
          type:"content/publishSave",
          payload:{
            list:list,
            autoSaveInterval:autoSaveInterval,
            aoSave:aoSave
          }
        })
  }
  if(saveId!=undefined&&saveId!=0){
    //console.log(autoSaveInterval)
    window.clearInterval(autoSaveInterval);
    //console.log(autoSaveInterval)
      autoSaveInterval = window.setInterval(function() {
       
            aoSave();
            }, 10000);
  }
  function aoSave(id){
    //console.log(id)
    window.clearInterval(autoSaveInterval);
    const data = {...getFieldsValue()};
    if(data.articleTitle==""||data.articleTitle==undefined){
      return
    }
    var tagsName ="";
          if(data.tag1==undefined){
             tagsName ="";
          }else if(data.tag1==!undefined&&data.tag2==undefined){
            tagsName =data.tag1;
          }else if(data.tag1==!undefined&&data.tag2!==undefined&&data.tag3==undefined){
           tagsName =data.tag1+','+data.tag2
          }
          else if(data.tag4==undefined&&data.tag5==undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3
          }else if(data.tag4!=undefined&&data.tag5==undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3+','+data.tag4
          }else if(data.tag4!=undefined&&data.tag5!=undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3+','+data.tag4+','+data.tag5
          }
    let list ={
      "articleTitle":data.articleTitle,
      "articleText":data.text!=undefined?data.text.txt.html():'',
      "articleId":(saveId!=undefined||saveId!="")?saveId:"",
      "tagnames":tagsName,
      description:data.artic,
      image:imgUrl,
      type:parseInt(data.type),
      columnId:data.column!=undefined?parseInt(data.column[0]):null,
      secondColumn:data.column!=undefined?parseInt(data.column[1]):null,
      displayStatus:parseInt(data.radioT),
      displayOrder:parseInt(data.sort),
      articleSource:data.articleSource,
      articleLink:data.articleLink,
      commentSet:data.commentSet!=undefined?(data.commentSet == "true"?true:false):null,
      publishSet:data.radioG!=undefined?(data.radioG == "true"?true:false):null,
      createUser:UserById.kgUserId!=undefined?UserById.kgUserId:null,
      sysUser:merId,
      bonusStatus:parseInt(data.bonusStatus),
      publishStatus:0,
      textnum:data.text!=undefined?data.text.txt.text().split('&nbsp;').join('').length:'',
      browseNum:data.browseNum,
      thumbupNum:data.thumbupNum,
      collectNum:data.collectNum,

    }
    publish(list,autoSaveInterval)
  }
  function checkout(){
       //clearInterval(time1)
       window.clearInterval(autoSaveInterval);
       console.log(autoSaveInterval)
       autoSaveInterval = window.setInterval(function() {
       
            aoSave();
            }, 60000);

  }
  function titleValue(e){
    //console.log((e.target.value).length);

    titleNum = (e.target.value).length
    // /console.log(titleValue)
  }
  return(
      <Form onSubmit={handleSubmit}>
            <FormItem label="文章标题" {...formItemLayout}>
                    {getFieldDecorator('articleTitle', {
                      rules: [{
                          type: 'string', 
                          message: '文章标题1-64个字符,支持中英文及特殊符号，空格，不区分大小写',
                          min:1,
                          max:64,

                        }, {
                          required: true, message: '请输入标题!',
                        }
                        ],
                    })(
                      <Input  type="text" placeholder="输入标题" style={{width:'50%'}} onChange={titleValue} suffix={<span>{titleNum}/64</span>} onBlur={handleFocus}/>
                    )}
                    {(saveId!=undefined&&saveId!=0)?<span  className={styles.zidong}>自动保存中<Icon type="clock-circle-o"/></span>:null
                    }
                    
              </FormItem>
              <FormItem >
                  {getFieldDecorator('text', {
                      rules: [
                      { required: true, message: '请输入正文!' },
                      { type:"object",min:1,max:5000,message:'请输入1-5000个字符'},
                      { validator:onChange}
                      ],
                      trigger:'edtiorContent'
                    })(
                         <Editor edtiorContent={edtiorContent} edtiorContentText={edtiorContentText} style={{textAlign:'left'}} checkout={checkout}/>
                    )}
                  <span>限制字数{x}/5000</span>
              </FormItem>
              <Row  key='2'>
              <Col span={4} >
                  <FormItem label="Tag标签 " labelCol={{ span: 6 }}
                      wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('tag1', {
                        
                        rules: [
                          {
                            required: true, 
                            message: '请输入标签!',

                           },{
                            min:2,
                            max:5,
                            pattern:/^[\u4e00-\u9fa5]{2,5}$/,
                            message: '请输入2-5个汉字!',
                        },{
                          validator:tagValue1
                        }],
                      })(
                        <Input style={{width:'90%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag2', {
                       
                         rules: [
                          {
                            required: true, 
                            message: '请输入标签!',
                           },{
                            min:2,
                            max:5,
                            pattern:/^[\u4e00-\u9fa5]{2,5}$/,
                            message: '请输入2-5个汉字!',
                        },{
                          validator:tagValue2
                        }],
                      })(
                        <Input style={{width:'100%'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag3', {
                        
                         rules: [
                          {
                            required: true,
                            
                            message: '请输入标签!',
                           },{
                            min:2,
                            max:5,
                            pattern:/^[\u4e00-\u9fa5]{2,5}$/,
                            message: '请输入2-5个汉字!',
                        },{
                          validator:tagValue3
                        }],
                      })(
                        <Input style={{width:'100%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag4', {
                        
                        rules: [{ required: false, min:2,
                            max:5,
                            pattern:/^[\u4e00-\u9fa5]{2,5}$/,
                            message: '请输入2-5个汉字!', },{
                              validator:tagValue4
                            }],
                      })(
                        <Input style={{width:'100%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={6} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag5', {
                        
                        rules: [{ required: false, min:2,
                            max:5,
                            pattern:/^[\u4e00-\u9fa5]{2,5}$/,
                            message: '请输入2-5个汉字!',},{
                              validator:tagValue5
                            }],
                      })(
                        <Input style={{width:'30%',marginRight:'20px'}}/>
                      )}
                      <span className={styles.pre}> 至少3个tag，每个tag：2-5个汉字</span>
                  </FormItem>
              </Col>
              
           </Row> 
             
              <FormItem label="摘要" {...formItemLayout}>
                    {getFieldDecorator('artic', {
                     
                      rules: [{ required: false,min:10,max:100,message: '摘要10-100字,支持中英文,数字，符号，不区分大小写!' }],
                    })(
                      <TextArea style={{minHeight:"200px",width:"80%"}} placeholder="选填，若未填写会默认抓取正文前100字"></TextArea>
                    )}
              </FormItem>
              <FormItem
                    {...formItemLayout}
                    label="封面图"
                    extra=""
                  >
                   {getFieldDecorator('image',{
                    rules: [{ required: false, message: '请选择图片!' },
                    {type:"string",}
                    ],
                    valuePropName: 'src',
                   })(
                    <div >
                    {imgUrl==""?<div className={styles.bgImg} onClick ={showModal}> <Icon type="plus"/></div>:<img onClick ={showModal} src={uploadUrl+imgUrl} className={styles.bgImg} />}
                    
                    </div>
                    )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="类别"
                    >
                      {getFieldDecorator('type',{
                        initialValue:'2',
                        rules: [{ required: true, message: '请选择类别!' },
                       ],
                      })(
                        <RadioGroup onChange={typeChange}>
                          <Radio value="1">原创</Radio>
                          <Radio value="2">转载</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
              {artSorce ==2?<FormItem
                      {...formItemLayout}
                      label="文章来源"
                    >
                      {getFieldDecorator('articleSource',{
                        initialValue:"",
                        rules: [{required: true, message: '请填写转载文章来源!' },
                         {min:1,max:500,message:"不超过500字符"}
                       ],
                      })(
                        <Input style={{width:"60%"}}/>
                      )}
              
              </FormItem>:null}
              {artSorce ==2?<FormItem
                      {...formItemLayout}
                      label="原文链接"
                    >
                      {getFieldDecorator('articleLink',{
                        initialValue:"",
                        rules: [{ required: true, message: '请填写转载文章来源链接地址!', },
                        {min:1,max:500,message:"不超过500字符"}
                       ],
                      })(
                        <Input style={{width:"60%"}}/>
                      )}
              </FormItem>:null}
              <FormItem
                      {...formItemLayout}
                      label="选择栏目"
                     
                    >
                    {getFieldDecorator('column', {
                        rules: [
                          { required: true, message: '请选择文章栏目!' },
                        ],
                      })(
                      <Cascader options={options}  placeholder="请选择文章栏目" style={{width:"20%"}}/>
                       )}
                  
                      
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="显示设置"
                      colon={true}
                    >
                      {getFieldDecorator('radioT',{
                        initialValue:'1',
                        rules: [
                          { required: true,message:'请选择显示位置' },
                        ],
                      })(
                        <RadioGroup>
                          <Radio value="1">正常显示</Radio>
                          <Radio value="2">首页置顶</Radio>
                          <Radio value="3">首页推荐</Radio>
                          <Radio value="4">前台隐藏</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="排序"
                    >
                      {getFieldDecorator('sort',{
                        initialValue:'',
                        rules: [
                          { required: false,message:'请输入0以上的正整数',pattern:/^[0-9]\d*$/},
                        ],
                      })(
                        <Input style={{width:'10%'}}/>
                          
                      )}
                      <span style={{marginLeft:20}} className={styles.pre}>越小越靠前</span>
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="浏览量"
                    >
                      {getFieldDecorator('browseNum',{
                        initialValue:0,
                        rules: [{ required: false, message: '请输入浏览量!', },
                        
                       ],
                      })(
                        <InputNumber style={{width:"20%"}} min={0}
                          max={5000000}/>
                      )}
                      <span className={styles.pre}>输入限制:0-500万</span>
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="点赞量"
                    >
                      {getFieldDecorator('thumbupNum',{
                        initialValue:0,
                        rules: [{ required: false, message: '请输入点赞量!', },
                        
                       ],
                      })(
                        <InputNumber style={{width:"20%"}} min={0}
                         max={500000}/>
                      )}
                      <span className={styles.pre}>输入限制:0-50万</span>
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="收藏量"
                    >
                      {getFieldDecorator('collectNum',{
                        initialValue:0,
                        rules: [{ required: false, message: '请输入收藏量!', },
                        
                       ],
                      })(
                        <InputNumber style={{width:"20%"}} min={0}
                         max={500000}/>
                      )}
                      <span className={styles.pre}>输入限制:0-50万</span>
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="评论设置"
                    >
                      {getFieldDecorator('commentSet',{
                         initialValue:'true',
                         rules: [{ required: true, }],
                      })(
                        <RadioGroup >
                          <Radio value="true">开启</Radio>
                          <Radio value="false">不开启</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="定时发布"
                    >
                      {getFieldDecorator('radioG',{
                         initialValue:'false',
                         rules: [{ required: true, }],
                      })(
                        <RadioGroup onChange={handleTime}>
                          <Radio value="true">开启定时发布</Radio>
                          <Radio value="false">不开启</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
              {timeDis==false&& <FormItem
                      {...formItemLayout}
                      label=" " colon ={false}
                      extra ="定时范围：从当前时间点开始至未来7天内，按自然日计算"
                    >
                      {getFieldDecorator('time',{
                         rules: [
                          { required: true,message:"请选择时间",},
                        ],
                      })(
                         <DatePicker
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={disabledDate}
                            /*disabledTime={disabledDateTime}*/
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            locale={options}
                            size="large"
                            /*disabled={timeDis}*/
                          />
                      )}
              </FormItem>}
             
              <FormItem
                      {...formItemLayout}
                       label="发布人"
                       extra='注：若该文章为用户发布，则此处不可更改'
                    >
                      {getFieldDecorator('createUser',{
                        initialValue:(UserById.kgUserName!=null&&UserById.kgUserName!="")?UserById.kgUserName:'',
                        rules: [
                          { required: true,message:'请关联前台用户作为发布人显示' },
                        ],
                      })(
                        <Input style={{width:'20%',marginRight:20+'px'}} disabled={true}/>

                      )}
                      {(UserById.kgUserId ==null||UserById.kgUserId=="")?<a style={{marginRight:40+'px'}} onClick={showUser} >关联前台用户</a>:null}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="文章打赏"
                      extra="提示：若您想设置阅读奖励规则，可用已关联的前台账号进入前台个人中心-我的专栏页面进行操作。"
                    >
                      {getFieldDecorator('bonusStatus',{
                        initialValue:'1',
                        rules: [
                          { required: true,message:'请选择' },
                        ],
                      })(
                        <RadioGroup>
                          <Radio value='1'>开启</Radio>
                          <br />
                          <Radio value='0'>不开启</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" onClick={handleSubmit}>发布</Button>
                <Button type="primary" style={{marginLeft:30}} onClick={publishStatus}>存草稿</Button>
                <Button type="primary" style={{marginLeft:30}} onClick={()=>previewPage()}>预览</Button>
                <RelationModal {...RelationModalProps} />
              </FormItem>
              
              
      </Form>
    )
}

export default Form.create()(RelesEditor);