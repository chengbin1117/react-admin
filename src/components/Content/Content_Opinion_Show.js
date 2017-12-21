import React from 'react';
import {
  withRouter,
  browserHistory,
  Link
} from 'dva/router';
import {
  connect
} from 'dva';
import {Input, Button,Form} from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';
import style_opinion_show from './Content_Opinion_Show.css';
import Content_Opinion_Show_Modal  from './Content_Opinion_Show_Modal';
const FormItem = Form.Item;
const { TextArea } = Input;

function Content_Opinion_Show({dispatch,router,content}){
  let data =JSON.parse(localStorage.getItem("kg_opinionEditor"));
  console.log(data)
  const {OpinionVisible} =content
 
  const Content_Opinion_Show_ModalProps ={
    visible:OpinionVisible,
    mail:data.email,
    onCancel(){
        dispatch({
          type:"content/hideOpinionModal"
        })
    },
    onOk(email,data){
      console.log(data)
      dispatch({
        type:"content/sendEmail",
        payload:{
          email:email,
          content:data.content,
          title:data.title
        }
      })
    }
  }

  function showModal(){
    dispatch({
      type:"content/showOpinionModal"
    })
  }
  class Content extends React.Component{
      constructor(){
        super();
        this.state = {
          visible:false,
          value:''
        };
       
      
      }
      render(){ 
        const formItemLayout = {
          labelCol: { span: 2 },
          wrapperCol: { span: 17 },
        };
        const {value} = this.state;
      return (
        <div className = "opinion_show">
          <h1>查看反馈内容</h1>   
          <Form>
              <FormItem {...formItemLayout}  label = "反馈内容" className="collection-create-form_last-form-item">
                    <span>{data.content}</span>
              </FormItem>
              <FormItem {...formItemLayout}  label = "反馈人邮箱" className="collection-create-form_last-form-item">
                    <span>{data.email}</span>
                <a onClick = {showModal} style = {{marginLeft:10}}>回邮件给此用户</a>
              </FormItem>
              <FormItem {...formItemLayout}  label = "反馈人手机号" className="collection-create-form_last-form-item">
                <span>{data.phone}</span>
              </FormItem>
              <FormItem {...formItemLayout}  label = "提交时间" className="collection-create-form_last-form-item">
                <span>{data.createDate}</span>
              </FormItem>
              <FormItem {...formItemLayout}  label = "来源页面地址" className="collection-create-form_last-form-item">
            <span>{data.fromUrl==null?"无":data.fromUrl}</span>
              </FormItem>
              <FormItem {...formItemLayout}  label = "处理记录" className="collection-create-form_last-form-item">
                  <Input.TextArea  onChange={this.changeInput}/>
              </FormItem>
            </Form>
          <Button type="primary" size = 'large' onClick={()=>onFeekOk(data.id,value)}>保存</Button>
          <Content_Opinion_Show_Modal 
            {...Content_Opinion_Show_ModalProps}
          />
        </div>
      );
    };
      }

  return(
      <Content />
    )
}


Content_Opinion_Show.propTypes = {
};
function mapStateToProps({
  content
}) {
  return {
    content
  };
}

export default connect(mapStateToProps)(withRouter(Content_Opinion_Show));