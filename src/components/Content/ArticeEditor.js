import React, {
  Component,
  PropTypes
} from 'react';
import {

  routerRedux,

} from 'dva/router';
import { Form, Icon, Input, Button,Badge, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';
import styles from './Content_Opinion_Show.css';
import Editor from '../../editor/index';
import {options,uploadUrl,ImgUrl} from "../../services/common"
import E from 'wangeditor';
import WrappedEditorForm from './EditorForm';
import RelationModal from '../Setting/RelationUser';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

var n =0;
const formItemLayout = {
        labelCol: {
        xs: { span: 1 },
        sm: { span: 1 },
        xl: { span: 1 },
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

//编辑器
 var value ='1'; 
function ArticleEditor({
  dispatch,
  imgUrl,
  ArticleList,
  ColumnList,
  UserById,
  setting,
  getBonusList,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}){
  let merId =localStorage.getItem("userId");
  let articleList =JSON.parse(localStorage.getItem("articleList"));

  const options = ColumnList;
  //console.log("setting",ArticleList)
  const {RelationVisible} =setting;
  let AllTotal =0;
  
  function handleSubmit (){
      validateFields((errors) => {
        if (errors) {
          return;
        }else{
          const data = {...getFieldsValue()};
          //console.log(data.text);
          var dd=(data.text).replace(/<\/?.+?>/g,"");
          var dds=dd.replace(/ /g,"");//dds为得到后的内容
          //console.log(dds.lengthgvfdg)
          var tagsName =""
          if(data.tag4==undefined&&data.tag5==undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3
          }else if(data.tag4!=undefined&&data.tag5==undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3+','+data.tag4
          }else if(data.tag4!=undefined&&data.tag5!=undefined){
            tagsName =data.tag1+','+data.tag2+','+data.tag3+','+data.tag4+','+data.tag5
          }
          if(data.publishStatus==undefined){
            data.publishStatus=ArticleList.publishStatus
          }
          if(ArticleList.sysUser==null){
            if(data.publishStatus =="1"){
              dispatch({
                type:'content/publishArticle',
                payload:{
                  articleId:ArticleList.articleId,
                  articleTitle:data.articleTitle,
                  articleText:data.text,
                  tagnames:tagsName,
                  description:(data.artic==undefined||data.artic=="")?data.text.txt.text().substring(0,30):data.artic,
                  image:imgUrl==''?data.image:imgUrl,
                  type:parseInt(data.type),
                  columnId:parseInt(data.column[0]),
                  secondColumn:parseInt(data.column[1]),
                  displayStatus:parseInt(data.radioT),
                  displayOrder:parseInt(data.sort),
                  commentSet:data.radioG == "true"?true:false,
                  publishSet:data.radioS == "true"?true:false,
                  createUser:ArticleList.createUser,
                  bonusStatus:parseInt(data.bonusStatus),
                  articleSource:data.articleSource,
                  articleLink:data.articleLink,
                  publishStatus:parseInt(data.publishStatus),
                  article_textnum:dds.length
                }
            })
          }else{
              dispatch({
                type:'content/publishArticle',
                payload:{
                  articleId:ArticleList.articleId,
                  articleTitle:data.articleTitle,
                  articleText:data.text,
                  tagnames:tagsName,
                  description:data.artic,
                  image:imgUrl==''?data.image:imgUrl,
                  type:parseInt(data.type),
                  columnId:parseInt(data.column[0]),
                  secondColumn:parseInt(data.column[1]),
                  displayStatus:parseInt(data.radioT),
                  displayOrder:parseInt(data.sort),
                  commentSet:data.radioG == "true"?true:false,
                  publishSet:data.radioS == "true"?true:false,
                  createUser:ArticleList.createUser,
                  bonusStatus:parseInt(data.bonusStatus),
                  articleSource:data.articleSource,
                  articleLink:data.articleLink,
                  publishStatus:parseInt(data.publishStatus),
                  refuseReason:data.refuseReason,
                  article_textnum:dds.length
                }
          })
          }

          }else{
            if(data.publishStatus =="1"){
              dispatch({
                type:'content/publishArticle',
                payload:{
                  articleId:ArticleList.articleId,
                  articleTitle:data.articleTitle,
                  articleText:data.text,
                  tagnames:tagsName,
                  description:data.artic,
                  image:imgUrl==''?data.image:imgUrl,
                  type:parseInt(data.type),
                  columnId:parseInt(data.column[0]),
                  secondColumn:parseInt(data.column[1]),
                  displayStatus:parseInt(data.radioT),
                  displayOrder:parseInt(data.sort),
                  commentSet:data.radioG == "true"?true:false,
                  publishSet:data.radioS == "true"?true:false,
                  createUser:ArticleList.createUser,
                  bonusStatus:parseInt(data.bonusStatus),
                  articleSource:data.articleSource,
                  articleLink:data.articleLink,
                  sysUser:merId,
                  publishStatus:parseInt(data.publishStatus),
                  article_textnum:dds.length
                }
            })
          }else{
              dispatch({
                type:'content/publishArticle',
                payload:{
                  articleId:ArticleList.articleId,
                  articleTitle:data.articleTitle,
                  articleText:data.text,
                  tagnames:tagsName,
                  description:data.artic,
                  image:imgUrl==''?data.image:imgUrl,
                  type:parseInt(data.type),
                  columnId:parseInt(data.column[0]),
                  secondColumn:parseInt(data.column[1]),
                  displayStatus:parseInt(data.radioT),
                  displayOrder:parseInt(data.sort),
                  commentSet:data.radioG == "true"?true:false,
                  publishSet:data.radioS == "true"?true:false,
                  createUser:ArticleList.createUser,
                  sysUser:merId,
                  bonusStatus:parseInt(data.bonusStatus),
                  articleSource:data.articleSource,
                  articleLink:data.articleLink,
                  publishStatus:parseInt(data.publishStatus),
                  refuseReason:data.refuseReason,
                  article_textnum:dds.length
                }
          })
          }
          }
          
          
        }
      })
  }
  

  function typeChange (e){
    console.log(e.target.value)
    ArticleList.articleType =parseInt(e.target.value)
  }

  function goBack() {
    //dispatch(routerRedux.push("/content/content_article?page=1"))
  }
  function showModal(){
      dispatch({
            type:'content/showBgModal'
      })
  }
  function edtiorContent (html){
        //console.log(editor.txt.html());
        /*
        var value  = editor.txt.text();*/
        /*localStorage.setItem("text", text);
        localStorage.setItem("html", html);*/
       /* var arr = [];
        arr.push(editor.txt.html(),editor.txt.text())*/
        //console.log(arr.length)
        //console.log(arr)
        //console.log(editor)
       
        return html
    }
  function edtiorContentText(html){
      
      return html
  }
  function handleChange(imgUrl){
    console.log(imgUrl)
    return imgUrl
  }

function StatusonChange(e) {
    //console.log(e.target.value)
    value =e.target.value;
    
  }
  function showUser(){
    dispatch({
        type:"setting/showRelationModal"
      })

  }
  const RelationModalProps ={
    visible:RelationVisible,
    onCancel(){
      dispatch({
        type:"setting/hideRelationModal"
      })
    },
    onOk(record,values){
      console.log(record,values)
      Modal.confirm({
        title:"确认关联前台用户吗？",
        okText : '确',
          onOk() {
              dispatch({
                type:"setting/setKgUser",
                payload:{
                  userId:record.id,
                  kgUserId:values.kgUserId
                }
                  })
          },
          onCancel() {
                console.log('Cancel');
          },  
      })
      
    },
    handleBlur(e){
      console.log(e.target.value)
      dispatch({
        type:"setting/getUserId",
        payload:{
          userMobile:e.target.value
        }
      })
    }
  }

   function ImgHandle(src){
    console.log("src",src)
   }
   function handlevaild(rule, value, callback){
      
      var dd=value.replace(/<\/?.+?>/g,"");
      var dds=dd.replace(/ /g,"");//dds为得到后的内容
      //console.log(dds)
      if(dds.length==0){
        callback("请输入正文")
      }else if(dds.length>5000){
        callback("正文内容不能超过5000个字符")
      }else{
        callback()
      }
      
   }

  return(
      <Form onSubmit={handleSubmit}>
            <FormItem label="文章标题" {...formItemLayout}>
                    {getFieldDecorator('articleTitle', {
                      initialValue:ArticleList.articleTitle,
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
                    <span style={{color:"#aaa",marginLeft:20}}>1-64个字符,支持中英文及特殊符号，空格，不区分大小写</span>
              </FormItem>
              <FormItem >
                  {getFieldDecorator('text', {
                      initialValue:ArticleList.articleText,
                      rules: [
                      { required: true, message: '请输入正文!' },
                      {validator:handlevaild}
                      ],
                      trigger:'edtiorContentText'
                    })(
                         <Editor edtiorContent={edtiorContent} edtiorContentText={edtiorContentText}/>
                    )}
                  
              </FormItem>
              <Row  key='2'>
              <Col span={4} style={{marginLeft:'0px'}}>
                  <FormItem label="Tag标签 " labelCol={{ span: 6 }}
                      wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('tag1', {
                        initialValue:ArticleList.tags!=undefined?ArticleList.tags[0]:'',
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
                         initialValue:ArticleList.tags!=undefined?ArticleList.tags[1]:'',
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
                        initialValue:ArticleList.tags!=undefined?ArticleList.tags[2]:'',
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
                        initialValue:ArticleList.tags!=undefined?ArticleList.tags[3]:'',
                        rules: [{ required: false, min:2,
                            max:5,
                            message: '请输入2-5个字符!', }],
                      })(
                        <Input style={{width:'100%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={6} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag5', {
                        initialValue:ArticleList.tags!=undefined?ArticleList.tags[4]:'',
                        rules: [{ required: false, min:2,
                            max:5,
                            message: '请输入2-5个字符!',}],
                      })(
                        <Input style={{width:'30%',marginRight:'20px'}}/>
                      )}
                      <span style={{color:"#ddd"}}> 至少3个tag，每个tag：2-5个汉字</span>
                  </FormItem>
              </Col>
           </Row> 
             
              <FormItem label="摘要" {...formItemLayout}>
                    {getFieldDecorator('artic', {
                      initialValue:ArticleList.articleDescription,
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
                    initialValue:ArticleList.articleImage,
                    rules: [{ required: false, message: '请选择图片!' },
                    {type:"string",}
                    
                    ],

                   })(
                    <div>
                        {articleList.articleImage==""?<div className={styles.bgImg} onClick ={showModal}> <Icon type="plus"/></div>:
                        <img onClick ={showModal} src={imgUrl==""?uploadUrl+ArticleList.articleImage:uploadUrl+imgUrl} className={styles.bgImg} onChange={ImgHandle}/>
                      }
                    </div>
                    )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="类别"
                    >
                      {getFieldDecorator('type',{
                        initialValue:ArticleList.articleType+'',
                        rules: [{ required: true, message: '请选择类别!' },
                       ],
                      })(
                        <RadioGroup onChange={typeChange}>
                          <Radio value="1">原创</Radio>
                          <Radio value="2">转载</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
              {ArticleList&&ArticleList.articleType ==2?<FormItem
                      {...formItemLayout}
                      label="文章来源"
                    >
                      {getFieldDecorator('articleSource',{
                        initialValue:ArticleList.articleSource,
                        rules: [{required: true, message: '请填写转载文章来源!' },
                       ],
                      })(
                        <Input />
                      )}
              
              </FormItem>:null}
              {ArticleList&&ArticleList.articleType ==2?<FormItem
                      {...formItemLayout}
                      label="原文链接"
                    >
                      {getFieldDecorator('articleLink',{
                        initialValue:ArticleList.articleLink,
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
                      {getFieldDecorator('column', {
                        initialValue:ArticleList.columnId!=null?[ArticleList.columnId,ArticleList.secondColumn]:[],
                        rules: [
                          { required: true, message: '请选择文章栏目!' },
                          {type: 'array'}
                        ],
                      })(
                        <Cascader options={options}  placeholder="请选择文章栏目" style={{width:'20%'}}/>
                      )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="显示设置"
                    >
                      {getFieldDecorator('radioT',{
                        initialValue:ArticleList.displayStatus+'',
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
                        initialValue:ArticleList.displayOrder,
                        rules: [
                          { required: false, },
                        ],
                      })(
                        <Input style={{width:'10%'}}/>
                          
                      )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="评论设置"
                    >
                      {getFieldDecorator('radioG',{
                         initialValue:ArticleList.commentSet==true?"true":'false',
                      })(
                        <RadioGroup >
                          <Radio value="true">开启评论</Radio>
                          <Radio value="false">关闭评论</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                       label="发布人"
                       extra='注：若该文章为用户发布，则此处不可更改'
                    >
                      {getFieldDecorator('createUser',{
                        initialValue:ArticleList.createUser,
                        rules: [
                          { required: true,message:'请关联前台用户作为发布人显示' },
                        ],
                      })(
                        <Input style={{width:'20%'}} disabled={true}/>

                      )}
                      
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="文章打赏"
                      extra="提示：若您想设置阅读奖励规则，可用已关联的前台账号进入前台个人中心-我的专栏页面进行操作。"
                    >
                      {getFieldDecorator('bonusStatus',{
                        initialValue:ArticleList.bonusStatus!=null?ArticleList.bonusStatus+'':'',
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
              {ArticleList.sysUser ==null?(getBonusList!=undefined&&getBonusList.length!=0)?<FormItem label="阅读奖励" {...formItemLayout}>
                  {getBonusList.map((item,index)=>{

                      AllTotal += parseInt(item.total)
                    return(
                        <Row key={index}>
                        <Col span="5">
                          {item.name}
                        </Col>
                         <Col span="5">
                          奖励钛值{item.value}个/人
                        </Col>
                        <Col span="5">
                          最大奖励{item.max}人,合计发放:{item.total}人
                        </Col>
                        <Col span="5">
                          {item.status==0&&<Badge status="Default" text="未生效"/>}
                          {item.status==1&&<Badge status="success" text="已生效"/>}
                          {item.status==2&&<Badge status="processing" text="暂停中"/>}
                          {item.status==3&&<Badge status="warning" text="已终止"/>}
                          {item.status==4&&<Badge status="warning" text="已结束"/>}
                        </Col>
                     </Row>
                      )
                  })}
                  <Row className={styles.alltotal}>
                      <Col>
                          总计发放：{AllTotal}个
                      </Col>
                     </Row>   
              </FormItem>:<FormItem {...formItemLayout} label="阅读奖励">该文章暂无设置阅读奖励</FormItem>:null}
              {(ArticleList.sysUser ==null&&ArticleList.publishStatus==2)?<FormItem
                      {...formItemLayout}
                      label="审核处理"
                    >
                      {getFieldDecorator('publishStatus',{
                         initialValue:(ArticleList.publishStatus!=undefined&&ArticleList.publishStatus==0)?ArticleList.publishStatus+"":'1',
                          rules: [
                          { required: true,message:'请选择' },
                        ],
                      })(
                        <RadioGroup onChange={StatusonChange}>
                          <Radio value="1">通过</Radio>
                          <Radio value="3">不通过</Radio>

                        </RadioGroup>
                      )}
              </FormItem>:null}
              {(ArticleList.sysUser ==null&&ArticleList.publishStatus==2)? <FormItem {...formItemLayout} label="&nbsp;" colon={false}>
              {getFieldDecorator('refuseReason',{
                initialValue:ArticleList.refuseReason!=undefined?ArticleList.refuseReason:'',
                 rules: [{
                    required: false, message: '请输入!',
                  }], 
              })(
              <TextArea  style={{ width: "100%", minHeight: "100px" }} placeholder="不通过原因(选填)" disabled={value==3?false:true
              }/> 
              )}
              </FormItem>:null}
             
              <FormItem {...formItemLayout} label="&nbsp;" colon={false}>
                <Button type="primary" onClick={handleSubmit} size="large" style={{paddingLeft:20,paddingRight:20}}>保存</Button>
                
                <RelationModal {...RelationModalProps} />
              </FormItem>
              
              
      </Form>
    )
}

export default Form.create()(ArticleEditor);

{/*<FormItem
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
                      {(UserById.kgUserId!=null&&UserById.kgUserId!="")?<a style={{maginLeft:30+'px'}} onClick={showUser} >关联前台用户</a>:null}
              </FormItem>
*/}