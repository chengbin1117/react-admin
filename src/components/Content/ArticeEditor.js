import React, {
  Component,
  PropTypes
} from 'react';
import {

  routerRedux,

} from 'dva/router';
import { Form, Icon, Input, Button, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';
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

//编辑器
 var value ='1'  
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
  const options = ColumnList;
  console.log("setting",ArticleList)
  const {RelationVisible} =setting;
  let AllTotal =0;
 /* if(ArticleList.publishStatus!=undefined&&ArticleList.publishStatus==3){
    value="3"
  }*/
  /*class Editor extends Component {
      constructor(props, context) {
          super(props, context);
          this.state = {
            editorContent: '',
          }
      }
      componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        editor.customConfig.uploadImgServer = ImgUrl;//配置服务器上传地址
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                
                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                var url = uploadUrl + result.data[0].filePath;
                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                insertImg(url)

                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
          
        }
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
          this.setState({
            editorContent: html
          })
         this.props.edtiorContent(editor.txt.html())
        }
        //console.log("编辑器内容",this.props.articleText)
        
        editor.create();
        editor.txt.html(this.props.articleText!=undefined?this.props.articleText:'')
      }
      
      render() {
        return (
      
            <div  ref="editorElem" contentEditable="true">
            </div>
        );
      }
    }*/
  function handleSubmit (){
      validateFields((errors) => {
        if (errors) {
          return;
        }else{
          const data = {...getFieldsValue()};
          console.log(data)
          if(data.publishStatus =="1"){
              dispatch({
              type:'content/publishArticle',
              payload:{
                articleId:ArticleList.articleId,
                articleTitle:data.articleTitle,
                articleText:data.text,
                articleTag:data.tag1+','+data.tag2+','+data.tag3+','+data.tag4+','+data.tag5,
                description:data.artic,
                image:imgUrl==''?data.image:imgUrl,
                type:parseInt(data.type),
                columnId:parseInt(data.column[0]),
                secondColumn:parseInt(data.column[1]),
                displayStatus:parseInt(data.radioT),
                displayOrder:parseInt(data.sort),
                commentSet:data.radioS == "true"?true:false,
                publishSet:data.radioG == "true"?true:false,
                createUser:ArticleList.createUser,
                sysUser:parseInt(merId),
                bonusStatus:parseInt(data.bonusStatus),
                articleSource:data.articleSource,
                articleLink:data.articleLink,
                publishStatus:parseInt(data.publishStatus),
              }
          })
          }else{
              dispatch({
                type:'content/publishArticle',
                payload:{
                  articleId:ArticleList.articleId,
                  articleTitle:data.articleTitle,
                  articleText:data.text,
                  articleTag:data.tag1+','+data.tag2+','+data.tag3+','+data.tag4+','+data.tag5,
                  description:data.artic,
                  image:imgUrl==''?data.image:imgUrl,
                  type:parseInt(data.type),
                  columnId:parseInt(data.column[0]),
                  secondColumn:parseInt(data.column[1]),
                  displayStatus:parseInt(data.radioT),
                  displayOrder:parseInt(data.sort),
                  commentSet:data.radioS == "true"?true:false,
                  publishSet:data.radioG == "true"?true:false,
                  createUser:ArticleList.createUser,
                  sysUser:parseInt(merId),
                  bonusStatus:parseInt(data.bonusStatus),
                  articleSource:data.articleSource,
                  articleLink:data.articleLink,
                  publishStatus:parseInt(data.publishStatus),
                  refuseReason:data.refuseReason
                }
          })
          }

          
        }
      })
  }
  

  function goBack() {
    //dispatch(routerRedux.push("/content/content_article?page=1"))
  }
  function showModal(){
      dispatch({
            type:'content/showBgModal'
      })
  }
  function edtiorContent (value){
        
        console.log(value)
        return String(value)
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
  function onChange(rule, value, callback) {
    console.log(rule)
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
   function ImgHandle(src){
    console.log("src",src)
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
              </FormItem>
              <FormItem >
                  {getFieldDecorator('text', {
                      initialValue:ArticleList.articleText,
                      rules: [
                      { required: true, message: '请输入正文!' },
                      {type:'string',min:1,max:5000,message:'请输入1-5000个字符'}
                      ],
                      trigger:'edtiorContent'
                    })(
                         <Editor articleText={ArticleList.articleText} edtiorContent={edtiorContent} />
                    )}
                  
              </FormItem>
              <Row  key='2'>
              <Col span={4} style={{marginLeft:'65px'}}>
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
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag5', {
                        initialValue:ArticleList.tags!=undefined?ArticleList.tags[4]:'',
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
                    <img onClick ={showModal} src={imgUrl==""?uploadUrl+ArticleList.articleImage:uploadUrl+imgUrl} className={styles.bgImg} onChange={ImgHandle}/>
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
                        <RadioGroup>
                          <Radio value="1">原创</Radio>
                          <Radio value="2">转载</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
               <FormItem
                      {...formItemLayout}
                      label="文章来源"
                    >
                      {getFieldDecorator('articleSource',{
                        initialValue:ArticleList.articleSource,
                        rules: [{required: ArticleList.articleType==1?false:true, message: '请填写转载文章来源!' },
                       ],
                      })(
                        <Input />
                      )}
              </FormItem>
               <FormItem
                      {...formItemLayout}
                      label="原文链接"
                    >
                      {getFieldDecorator('articleLink',{
                        initialValue:ArticleList.articleLink,
                        rules: [{ required: ArticleList.articleType==1?false:true, message: '请填写转载文章来源链接地址!' },
                       ],
                      })(
                        <Input />
                      )}
              </FormItem>
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
                         initialValue:ArticleList.publishSet==true?"true":'false',
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
                        initialValue:ArticleList.username,
                        rules: [
                          { required: true,message:'请关联前台用户作为发布人显示' },
                        ],
                      })(
                        <Input style={{width:'20%'}} disabled={ArticleList.sysUser ==null?true:false}/>

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

                      AllTotal += parseInt(item.total)*parseInt(item.value)
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
                     </Row>
                      )
                  })}
                  <Row className={styles.alltotal}>
                      <Col>
                          总计发放：{AllTotal}个
                      </Col>
                     </Row>   
              </FormItem>:<FormItem {...formItemLayout} label="阅读奖励">该文章暂无设置阅读奖励</FormItem>:null}
              {ArticleList.sysUser ==null?<FormItem
                      {...formItemLayout}
                      label="审核处理"
                    >
                      {getFieldDecorator('publishStatus',{
                         initialValue:ArticleList.publishStatus!=undefined?ArticleList.publishStatus+"":'',
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
              
              <FormItem {...formItemLayout} label="&nbsp;" colon={false}>
              {getFieldDecorator('refuseReason',{
                initialValue:ArticleList.refuseReason!=undefined?ArticleList.refuseReason:'',
                 rules: [{
                    required: false, message: '请输入!',
                  }], 
              })(
              <TextArea  style={{ width: "100%", minHeight: "100px" }} placeholder="不通过原因(选填)" disabled={value==3?false:true
              }/> 
              )}
              </FormItem>
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