import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import styles from './AboutUs.css'
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';

import { Form, Row, Col, Input, Button, Icon,Select,Radio,message} from 'antd';

import ArticleList from '../components/Setting/ArticleList';

import Editor from '../editor/index.js';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function AddinfoEditor({dispatch,setting,router}) {
	let userId =localStorage.getItem("userId");
	let data =JSON.parse(localStorage.getItem("kg_aboutEditor"));
	console.log(data)
	let txt='txt';
	data[txt] =data.name+','+data.type;
	console.log(data)
	 const formItemLayout = {
	      labelCol: { span: 2 },
	      wrapperCol: { span: 4},
	    };
	class FormInfo extends React.Component {
		state={
			html:'',
			text:"",
		}
	  handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	        console.log('Received values of form: ', values);
	        console.log(this.state.html)
	        var h = this.state.html;
	        var t = this.state.text;
	        var v = values.info;
	        var type = v.split(',');
	        if(t == ""){
	        	message.warn('请输入正文')
	        }else{
	        	dispatch({
	        		type:'setting/addBaseinfo',
	        		payload:{
	        			infoDetail:h+'',
	        			infoOrder:parseInt(values.infoOrder),
	        			infoType:type[1]+'',
	        			createUser:parseInt(userId),
	        			infoName:type[0]+'',
	        			infoStatus:values.setshow == "a"?true:false,
	        			router,
	        			status:"editor"
	        		}
	        	})
	        }

	      }
	    });
	  }
	  normFile = (e) => {
	    console.log('Upload event:', e);
	    if (Array.isArray(e)) {
	      return e;
	    }
	    return e && e.fileList;
	  }
	  edtiorContent=(editor) =>{
	  //	console.log(editor)
	  	var html  = editor.txt.html()
        var text  = editor.txt.text();
        this.setState({
        	html:html,
        	text:text
        })
	  }
	  render() {
	    const { getFieldDecorator } = this.props.form;
	   
	    return (
	      <Form >
	
	        <FormItem
	         {...formItemLayout}
	          label="选择信息类别"
	          className={styles.infotype}
	        >
	          {getFieldDecorator('info',{
	          	initialValue: data.txt,
	          	rules: [
					{required: true, message: '请选择'},
				],
	          })(
	            <Select size="large"  placeholder="请选择" disabled>
	              <Option value="关于我们,about">关于我们(about)</Option>
	              <Option value="加入我们,add">加入我们(add)</Option>
	              <Option value="联系我们,contact">联系我们(contact)</Option>
	              <Option value="版权声明,copy">版权声明(copy)</Option>
	              <Option value="用户注册协议,concert">用户注册协议(concert)</Option>
	              <Option value="专栏申请协议,agreement">专栏申请协议(agreement)</Option>
	            </Select>
	          )}
	        </FormItem>
	        <FormItem>
	         	<Editor ref="editor" edtiorContent={this.edtiorContent} articleText={data.infoDetail}/>
	        </FormItem>
			<FormItem
	         {...formItemLayout}
	          label="显示状态"
	        >
	          {getFieldDecorator('setshow',{
	          	initialValue: data.infoStatus==true?"a":"b",
	          	rules: [
					{required: true, message: '请选择'},
				],
	          })(
	            <RadioGroup>
	              <Radio value="a">显示</Radio>
	              <Radio value="b">隐藏</Radio>
	            </RadioGroup>
	          )}
	        </FormItem>
	        <FormItem
	         {...formItemLayout}
	          label="排序"

	        >
	          {getFieldDecorator('infoOrder',{
	          	initialValue: data.infoOrder,
	          	rules: [
					{required: false, message: '请输入'},
				],
	          })(
	            	<Input />
	          )}
	          <span className={styles.txt}>同一显示位置，排序越小越靠前</span>
	        </FormItem>
	        <FormItem
	           style={{marginLeft:"100px"}}
	        >
	          <Button type="primary" onClick={this.handleSubmit}>保存</Button>
	        </FormItem>
	      </Form>
	    );
	  }
	}

const WrappedDemo = Form.create()(FormInfo);
	return (
			<div className={styles.Indexbox}>
					
				<WrappedDemo />
				
			</div>

	);
}

AddinfoEditor.propTypes = {

};

function mapStateToProps({
	setting
}) {
	return {
		setting
	};
}



export default connect(mapStateToProps)(withRouter(AddinfoEditor));