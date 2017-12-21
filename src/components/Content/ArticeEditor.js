import React from 'react';
import { Form, Icon, Input, Button, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';
import Editor from '../../editor/index';
import WrappedEditorForm from './EditorForm';
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const ArticleEditor = ({dispatch,ColumnList,handlsearch,editorText,cruImage,ArticleList}) => {
	//let logoimg = require("image!../../assets/images/lx4.png");
  let merId =localStorage.getItem("userId");
  let html = '';
  let text = '';
  //console.log(ArticleList)
  let tags =[];
  let articleText = "";
  if(ArticleList!=undefined){
    tags=ArticleList.tags;
    articleText= String(ArticleList.articleText);
  }

  const options = ColumnList;

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
	function onChange(value) {
      console.log(value);
    }
  const config = {
      rules: [{ type: 'object', required: false, message: 'Please select time!' }],
  };

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
  function getFields(getFieldDecorator,formItemLayout){
    const children = [];
    console.log(ArticleList);
    let articleText =ArticleList.articleText;
    if(articleText ==undefined){
      return false;
    }
    
      children.push(
        <div key="0">
          <Row span={24} key='0'>
            <Col>
              <FormItem label="文章标题" {...formItemLayout}>
                    {getFieldDecorator('articleTitle', {
                      initialValue:ArticleList!=undefined?ArticleList.articleTitle:"",
                      rules: [{ required: true, message: '摘要10-100字,支持中英文!' }],
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
                      rules: [{ required: false, message: '请输入正文!' }],
                    })(
                         <Editor edtiorContent={edtiorContent} articleText={articleText}/>
                    )}
                  
                </FormItem>
            </Col>
           </Row>
           <Row  key='2'>
              <Col span={4} style={{marginLeft:'65px'}}>
                  <FormItem label="Tag标签 " labelCol={{ span: 6 }}
                      wrapperCol={{ span: 14 }}>
                      {getFieldDecorator('tag1', {
                        initialValue:tags!=undefined?tags[0]:'',
                        rules: [{ required: true, message: '请至少输入3个标签!' }],
                      })(
                        <Input style={{width:'90%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag2', {
                        initialValue:tags!=undefined?tags[1]:'',
                        rules: [{ required: true, message: '请至少输入3个标签!' }],
                      })(
                        <Input style={{width:'100%'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag3', {
                        initialValue:tags!=undefined?tags[2]:'',
                        rules: [{ required: true, message: '请至少输入3个标签!' }],
                      })(
                        <Input style={{width:'100%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag4', {
                        initialValue:tags!=undefined?tags[3]:'',
                        rules: [{ required: false, message: '请至少输入3个标签!' }],
                      })(
                        <Input style={{width:'100%',marginRight:'20px'}}/>
                      )}
                      
                  </FormItem>
              </Col>
              <Col span={2} style={{marginRight:'55px'}}>
                  <FormItem  >
                      {getFieldDecorator('tag5', {
                        initialValue:tags!=undefined?tags[4]:'',
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
                      initialValue:ArticleList!=undefined?ArticleList.articleDescription:"",
                      rules: [{ required: false, message: '摘要10-100字,支持中英文!' }],
                    })(
                      <TextArea ></TextArea>
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

                    <div onClick ={showModal}> <img src={cruImage== ''?"":cruImage} style={{width:300+'px',height:200+'px'}}/></div>
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
                        initialValue:ArticleList!=undefined?String(ArticleList.articleType):'1',
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
                        initialValue:ArticleList!=undefined?String(ArticleList.displayStatus):'1',
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
                        initialValue:ArticleList!=undefined?String(ArticleList.displayOrder):'',
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
                        initialValue:ArticleList!=undefined?(ArticleList.commentSet ==true?'true':"false"):'true',
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
                         initialValue:ArticleList!=undefined?(ArticleList.publishSet ==true?'true':"false"):'false',
                      })(
                        <RadioGroup >
                          <Radio value="true">开启定时发布</Radio>
                          <Radio value="false">不开启</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
              </Col>
           </Row>      
           <Row span={24} key='11'>
              <Col>
                   <FormItem
                      {...formItemLayout}
                       label="发布人"
                    >
                      {getFieldDecorator('createUser',{
                        initialValue:ArticleList!=undefined?ArticleList.createUser:'',
                        rules: [
                          { required: true,message:'请关联前台用户作为发布人显示' },
                        ],
                      })(
                        <Input style={{width:'20%'}}/>
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

ArticleEditor.propTypes = {
};

export default ArticleEditor;
