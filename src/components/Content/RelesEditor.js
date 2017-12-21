import React from 'react';
import { Form, Icon,Modal, Input, Button, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';
import Editor from '../../editor/index';
import styles from './Content_Opinion_Show.css';
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
/*const RelesEditor = ({dispatch,ColumnList,handlsearch,editorText,cruImage,ArticleList,imgUrl}) => {
	let logoimg = require("image!../../assets/images/lx4.png");
  let merId =localStorage.getItem("userId");
  let html = '';
  let text = '';
  function disabledDate(current) {
  // Can not select days before today and today
  console.log( current.valueOf())
  //var to7days =;

  return current && (Date.now() + 7 * 24 * 3600 * 1000) < current.valueOf() < (Date.now()-86400000);
}
  
	
	function onChange(value) {
      console.log(value);
    }
  const config = {
      rules: [{ type: 'object', required: false, message: 'Please select time!' }],
  };
  let flag = true;
  function hanlechange (e){
    console.log(e.target.value)
    if(e.target.value =='true'){
        flag =false
    }else{
        flag =true
    }
  }
  function showModal(){
          dispatch({
            type:'content/showBgModal'
          })

        }
   function edtiorContent (editor){
        //console.log(editor.txt.html());
        html  = editor.txt.html()
        text  = editor.txt.text();
        localStorage.setItem("text", text);
        localStorage.setItem("html", html);
    }

    function checkPassword (rule, value, callback) {
      
    }
  function getFields(getFieldDecorator,formItemLayout){
    const children = [];

      children.push(
        <div key="0">
          <Row span={24} key='0'>
            <Col>
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
                      <Input  type="text" placeholder="输入标题" style={{width:'40%'}}/>
                    )}
              </FormItem>
            </Col>
          </Row>      
          <Row span={24} key='1'>
            <Col>
                <FormItem >
                  {getFieldDecorator('text', {
                      rules: [
                      { required: true, message: '请输入正文!' },
                      ],
                    })(
                         <Editor edtiorContent={edtiorContent} />
                    )}
                  
                </FormItem>
            </Col>
           </Row>
           <Row  key='2'>
              <Col span={4} style={{marginLeft:'65px'}}>
                  <FormItem label="Tag标签 " labelCol={{ span: 6 }}
                      wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('tag1', {
                        
                        rules: [
                        { required: true, 
                          message: '请至少输入3个标签!',
                          min:2,
                          max:5
                           },{
                          validator:checkPassword,
                        }],
                      })(
                        <Input style={{width:'90%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag2', {
                       
                        rules: [{ required: true, message: '请至少输入3个标签!' }],
                      })(
                        <Input style={{width:'100%'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag3', {
                        
                        rules: [{ required: true, message: '请至少输入3个标签!' }],
                      })(
                        <Input style={{width:'100%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag4', {
                        
                        rules: [{ required: false, message: '请至少输入3个标签!' }],
                      })(
                        <Input style={{width:'100%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag5', {
                        
                        rules: [{ required: false, message: '请至少输入3个标签!' }],
                      })(
                        <Input style={{width:'100%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
           </Row> 
           <Row span={24} key='3'>
              <Col>
                  <FormItem label="摘要" {...formItemLayout}>
                    {getFieldDecorator('artic', {
                     
                      rules: [{ required: false, message: '摘要10-100字,支持中英文!' }],
                    })(
                      <TextArea style={{minHeight:"100px"}}></TextArea>
                    )}
                  </FormItem>
              </Col>
           </Row>
           <Row span={24} key='4'>
              <Col>
                  <FormItem
                    {...formItemLayout}
                    label="封面图"
                    extra=""
                  >
                   {getFieldDecorator('image',{
                    rules: [{ required: false, message: '请选择图片!' }],
                   })(

                    <div><img src={imgUrl== ''?"":'http://kgcom.oss-cn-shenzhen.aliyuncs.com/'+imgUrl} style={{width:300+'px',height:200+'px'}} onClick ={showModal}/></div>
                    )}
                    
                  </FormItem>
              </Col>
           </Row>
           <Row span={24} key='5'>
              <Col>
                  <FormItem
                      {...formItemLayout}
                      label="类别"
                    >
                      {getFieldDecorator('type',{
                        initialValue:'1',
                      })(
                        <RadioGroup>
                          <Radio value="1">原创</Radio>
                          <Radio value="2">转载</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
              </Col>
           </Row>     
           <Row span={24} key='6'>
              <Col>
                  <FormItem
                      {...formItemLayout}
                      label="选择栏目"
                     
                    >
                      {getFieldDecorator('column', {
                        rules: [
                          { required: true, message: '请选择文章栏目!' },
                        ],
                      })(
                        <Cascader options={options}  placeholder="请选择文章栏目" style={{width:'20%'}}/>
                      )}
                    </FormItem>
              </Col>
           </Row>     
           <Row span={24} key='7'>
              <Col>
                  <FormItem
                      {...formItemLayout}
                      label="显示设置"
                    >
                      {getFieldDecorator('radioT',{
                        initialValue:'1',
                        rules: [
                          { required: true,message:'请选择' },
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
              </Col>
           </Row>     
           <Row span={24} key='8'>
              <Col>
                 <FormItem
                      {...formItemLayout}
                      label="排序"
                    >
                      {getFieldDecorator('sort',{
                        initialValue:'',
                        rules: [
                          { required: false, },
                        ],
                      })(
                        <Input style={{width:'10%'}}/>
                          
                      )}
                    </FormItem>
              </Col>
           </Row>     
           <Row span={24} key='9'>
              <Col>
                   <FormItem
                      {...formItemLayout}
                      label="评论设置"
                    >
                      {getFieldDecorator('radioS',{
                        initialValue:'true',
                        rules: [
                          { required: true,message:'请选择' },
                        ],
                      })(
                        <RadioGroup>
                          <Radio value='true'>开启评论</Radio>
                          <Radio value='false'>关闭评论</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
              </Col>
           </Row>
           <Row span={24} key='10'>
              <Col>
                   <FormItem
                      {...formItemLayout}
                      label="定时发布"
                    >
                      {getFieldDecorator('radioG',{
                         initialValue:'false',
                      })(
                        <RadioGroup onChange={hanlechange}>
                          <Radio value="true">开启定时发布</Radio>
                          <Radio value="false">不开启</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
              </Col>
           </Row>
           <Row span={24} key='13'>
              <Col>
                   <FormItem
                      {...formItemLayout}
                      label=" " colon ={false}
                      extra ="定时范围：从当前时间点开始至未来7天内，按自然日计算"
                    >
                      {getFieldDecorator('time',{
                         
                      })(
                        <DatePicker disabled={flag} disabledDate={disabledDate}/>
                      )}
                    </FormItem>
              </Col>
           </Row>        
           <Row span={24} key='11'>
              <Col>
                   <FormItem
                      {...formItemLayout}
                       label="发布人"
                       extra='注：若该文章为用户发布，则此处不可更改'
                    >
                      {getFieldDecorator('createUser',{
                        initialValue:'',
                        rules: [
                          { required: true,message:'请关联前台用户作为发布人显示' },
                        ],
                      })(
                        <Input style={{width:'20%'}}/>
                      )}
                    </FormItem>
              </Col>
           </Row>      
           <Row span={24} key='12'>
              <Col>
                   <FormItem
                      {...formItemLayout}
                      label="文章打赏"
                      extra="提示：若您想设置阅读奖励规则，可用已关联的前台账号进入前台个人中心-我的专栏页面进行操作。"
                    >
                      {getFieldDecorator('bonusStatus',{
                        initialValue:'true',
                        rules: [
                          { required: true,message:'请选择' },
                        ],
                      })(
                        <RadioGroup>
                          <Radio value='true'>开启</Radio>
                          <br />
                          <Radio value='false'>不开启</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
              </Col>
           </Row>             
          </div>
        );
      return children;
  }

  return (
    <div>
      <WrappedEditorForm getFields={getFields} handlsearch={handlsearch}/>
      
        
    </div>
  );
};

RelesEditor.propTypes = {
};

export default RelesEditor;*/



function RelesEditor({
  dispatch,
  imgUrl,
  ColumnList,
  UserById,
  setting,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}){
  let merId =localStorage.getItem("userId");
  const options = ColumnList;
  //console.log("setting",setting)
  const {RelationVisible} =setting
  function handleSubmit (){
      validateFields((errors) => {
        if (errors) {
          return;
        }else{
          const data = {...getFieldsValue()};
          console.log(data)
          dispatch({
              type:'content/publishArticle',
              payload:{
                articleTitle:data.articleTitle,
                articleText:data.text,
                articleTag:data.tag1+','+data.tag2+','+data.tag3+','+data.tag4+','+data.tag5,
                description:data.artic,
                image:imgUrl,
                type:parseInt(data.type),
                columnId:parseInt(data.column[0]),
                displayStatus:parseInt(data.radioT),
                displayOrder:parseInt(data.sort),
                commentSet:data.radioS == "true"?true:false,
                publishSet:data.radioG == "true"?true:false,
                createUser:parseInt(data.createUser),
                sysUser:parseInt(merId),
                bonusStatus:data.bonusStatus
              }
          })
        }
      })
  }
  function publishStatus (){
    validateFields((errors) => {
        if (errors) {
          return;
        }else{
          const data = {...getFieldsValue()};
          console.log(data)
          dispatch({
              type:'content/publishArticle',
              payload:{
                articleTitle:data.articleTitle,
                articleText:data.text,
                articleTag:data.tag1+','+data.tag2+','+data.tag3+','+data.tag4+','+data.tag5,
                description:data.artic,
                image:imgUrl,
                type:parseInt(data.type),
                columnId:parseInt(data.column[0]),
                displayStatus:parseInt(data.radioT),
                displayOrder:parseInt(data.sort),
                commentSet:data.radioS == "true"?true:false,
                publishSet:data.radioG == "true"?true:false,
                createUser:parseInt(data.createUser),
                sysUser:parseInt(merId),
                bonusStatus:data.bonusStatus,
                publishStatus:0
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
  function edtiorContent (value){
        //console.log(editor.txt.html());
        /*var html  = editor.txt.html()
        var value  = editor.txt.text();*/
        /*localStorage.setItem("text", text);
        localStorage.setItem("html", html);*/
        console.log(typeof(value))
        return String(value)
    }
  function handleChange(imgUrl){
    console.log(imgUrl)
    return imgUrl
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
        okText : '确定',
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
                      {type:'string',min:1,max:5000,message:'请输入1-5000个字符'}
                      ],
                      trigger:'edtiorContent'
                    })(
                         <Editor edtiorContent={edtiorContent} />
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
                    {type:"string",trigger:'hanlele'}
                    ],
                   })(
                    <img onClick ={showModal} src={'http://kgcom.oss-cn-shenzhen.aliyuncs.com/'+imgUrl} className={styles.bgImg} hanlele={handleChange}/>
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
                        <RadioGroup>
                          <Radio value="1">原创</Radio>
                          <Radio value="2">转载</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="选择栏目"
                     
                    >
                      {getFieldDecorator('column', {
                        rules: [
                          { required: true, message: '请选择文章栏目!' },
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
                          { required: false, },
                        ],
                      })(
                        <Input style={{width:'10%'}}/>
                          
                      )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="定时发布"
                    >
                      {getFieldDecorator('radioG',{
                         initialValue:'false',
                      })(
                        <RadioGroup >
                          <Radio value="true">开启定时发布</Radio>
                          <Radio value="false">不开启</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label=" " colon ={false}
                      extra ="定时范围：从当前时间点开始至未来7天内，按自然日计算"
                    >
                      {getFieldDecorator('time',{
                         
                      })(
                        <DatePicker /*disabled={flag}*/ /*disabledDate={disabledDate}*//>
                      )}
              </FormItem>
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
                      {(UserById.kgUserId!=null&&UserById.kgUserId!="")?<a style={{maginLeft:30+'px'}} onClick={showUser} >关联前台用户</a>:null}
              </FormItem>
              <FormItem
                      {...formItemLayout}
                      label="文章打赏"
                      extra="提示：若您想设置阅读奖励规则，可用已关联的前台账号进入前台个人中心-我的专栏页面进行操作。"
                    >
                      {getFieldDecorator('bonusStatus',{
                        initialValue:'true',
                        rules: [
                          { required: true,message:'请选择' },
                        ],
                      })(
                        <RadioGroup>
                          <Radio value='true'>开启</Radio>
                          <br />
                          <Radio value='false'>不开启</Radio>
                        </RadioGroup>
                      )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">发布</Button>
                <Button type="primary" style={{marginLeft:30}} onClick={publishStatus}>存草稿</Button>
                <Button type="primary" style={{marginLeft:30}}>预览</Button>
                <RelationModal {...RelationModalProps} />
              </FormItem>
              
              
      </Form>
    )
}
/*export default Form.create()(RelesEditor);*/
export default Form.create()(RelesEditor);