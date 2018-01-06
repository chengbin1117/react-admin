import React from 'react';
import { Form, Icon,Modal, Input, Button, Select,Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';
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
        xs: { span: 2 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
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

let artSorce =1;
let timeDis =true;
let sec=0;
function RelesEditor({
  dispatch,
  imgUrl,
  ColumnList,
  UserById,
  setting,
  firstC,
  secondC,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}){
  let merId =localStorage.getItem("userId");
  const options = ColumnList;
  console.log("setting",imgUrl)
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
                articleTitle:data.articleTitle,
                articleText:data.text.txt.html(),
                tagnames:tagsName,
                description:(data.artic==undefined||data.artic=="")?data.text.txt.text().substring(0,30):data.artic,
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
                createUser:parseInt(data.createUser),
                sysUser:parseInt(merId),
                bonusStatus:parseInt(data.bonusStatus),
                article_textnum:data.text.txt.text().length,
                publishTime:data.time!=undefined?formatDate(new Date(data.time)):null,
              }
          })
        }
      })
  }
  function publishStatus (){
          validateFields('articleTitle',(errors) => {
              if(errors){
                return
              }
          })
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
          console.log(data)
          if(data.text!=undefined){
            dispatch({
              type:'content/publishArticle',
              payload:{
                articleTitle:data.articleTitle,
                articleText:data.text.txt.html(),
                tagnames:tagsName,
                description:(data.artic==undefined||data.artic=="")?data.text.txt.text().substring(0,30):data.artic,
                image:imgUrl,
                type:parseInt(data.type),
                columnId:data.column[0]!=undefined?parseInt(data.column[0]):null,
                secondColumn:data.column[1]!=undefined?parseInt(data.column[1]):null,
                displayStatus:parseInt(data.radioT),
                displayOrder:parseInt(data.sort),
                articleSource:data.articleSource,
                articleLink:data.articleLink,
                commentSet:data.commentSet!=undefined?(data.commentSet == "true"?true:false):null,
                publishSet:data.radioG!=undefined?(data.radioG == "true"?true:false):null,
                createUser:parseInt(data.createUser),
                sysUser:parseInt(merId),
                bonusStatus:parseInt(data.bonusStatus),
                publishStatus:0,
                article_textnum:data.text.txt.text().length
              }
          })
          }else{
            dispatch({
              type:'content/publishArticle',
              payload:{
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
                createUser:parseInt(data.createUser),
                sysUser:parseInt(merId),
                bonusStatus:parseInt(data.bonusStatus),
                publishStatus:0,
                article_textnum:0
              }
          })
          }
          
      
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
                  kgUserId:parseInt(deskUserId)
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
  return current && current.valueOf() <= Date.now();
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
        
        if(arr[1].length==0){
          callback('请输入正文')
        }else if (arr[1].length>5000){
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
  console.log(secondC[sec])
  var Item =['1','2','3','4','5']
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
                      <Input  type="text" placeholder="输入标题" style={{width:'60%'}}/>
                    )}
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
                         <Editor edtiorContent={edtiorContent} edtiorContentText={edtiorContentText}/>
                    )}
                  
              </FormItem>
              <Row  key='2'>
              <Col span={4} style={{marginLeft:'65px'}}>
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
                            message: '请输入2-5个字符!',
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
                            message: '请输入2-5个字符!',
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
                            message: '请输入2-5个字符!',
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
                            message: '请输入2-5个字符!', }],
                      })(
                        <Input style={{width:'100%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag5', {
                        
                        rules: [{ required: false, min:2,
                            max:5,
                            message: '请输入2-5个字符!',}],
                      })(
                        <Input style={{width:'100%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
           </Row> 
             
              <FormItem label="摘要" {...formItemLayout}>
                    {getFieldDecorator('artic', {
                     
                      rules: [{ required: false,min:10,max:100,message: '摘要10-100字,支持中英文,数字，符号，不区分大小写!' }],
                    })(
                      <TextArea style={{minHeight:"100px"}}></TextArea>
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
                        initialValue:'1',
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
                       ],
                      })(
                        <Input />
                      )}
              
              </FormItem>:null}
              {artSorce ==2?<FormItem
                      {...formItemLayout}
                      label="原文链接"
                    >
                      {getFieldDecorator('articleLink',{
                        initialValue:"",
                        rules: [{ required: true, message: '请填写转载文章来源链接地址!' },
                       ],
                      })(
                        <Input />
                      )}
              </FormItem>:null}
              <FormItem
                      {...formItemLayout}
                      label="选择栏目"
                     
                    >
                     <Row >
                      <Col span={6}>
                        {getFieldDecorator('column', {
                        rules: [
                          { required: true, message: '请选择文章栏目!' },
                        ],
                      })(
                      <Cascader options={options}  placeholder="请选择文章栏目" />
                        /*<Select placeholder="请选择" onChange={handleProvinceChange}>
                          {firstC&&firstC.map((item,index)=>{
                            return(
                                <Option value={item.value+""} key={index}>{item.label}</Option>
                              )
                          })}
                        </Select>*/
                      )}
                      </Col>
                      {/*<Col span={6}>
                         {getFieldDecorator('secondColumn', {

                          rules: [
                            { required: false, message: '请选择文章栏目!' },
                          ],
                        })(
                          <Select placeholder="请选择">
                            {(secondC&&secondC[sec]!=undefined)&&secondC[sec].map((item,index)=>{
                            return(
                                <Option value={item.value+""} key={index}>{item.label}</Option>
                              )
                          })}
                          
                          </Select>
                          )}
                      </Col>*/}
                    </Row>
                      
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="显示设置"
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
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="评论设置"
                    >
                      {getFieldDecorator('commentSet',{
                         initialValue:'false',
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
                            disabledTime={disabledDateTime}
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            locale ={options}
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
                        initialValue:(UserById.kgUserId!=null&&UserById.kgUserId!="")?UserById.kgUserId:'',
                        rules: [
                          { required: true,message:'请关联前台用户作为发布人显示' },
                        ],
                      })(
                        <Input style={{width:'20%'}} disabled={(UserById.kgUserId!=null&&UserById.kgUserId!="")?true:false}/>

                      )}
                      {(UserById.kgUserId ==null||UserById.kgUserId=="")?<a style={{maginLeft:30+'px'}} onClick={showUser} >关联前台用户</a>:null}
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