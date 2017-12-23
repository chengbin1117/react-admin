import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import stytes from './UserLoginPage.css';
import { Form, Row, Col, Input, Button, Icon,message,Radio} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

function UserAdmin({location,dispatch,user,router,}) {
	let merId =localStorage.getItem("userId");
	const {userInfo}=user;
	 const formItemLayout = {
      labelCol: {
        xs: { span: 1 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 1 },
        sm: { span: 3 },
      },
    };
	class DynamicRule extends React.Component {
	  state = {
	    checkNick: false,
	    text:''
	  };
	  submit = (e) => {
	    this.props.form.validateFields(
	      (err,values) => {
	        if (!err) {
	          console.info(values);
	          if(values.radio =='3'){
	          	dispatch({
						type:'user/auditUser',
						payload:{
							userId:userInfo.userId,
							auditStatus:userInfo.auditStatus,
							auditUserId:merId,
							
						}
				})
	          }
		      if(values.radio =='4'){
	          	dispatch({
						type:'user/auditUser',
						payload:{
							userId:userInfo.userId,
							auditStatus:userInfo.auditStatus,
							auditUserId:merId,
							refuseReason:this.state.text,
						}
				})
	          }   
	        }
	      },
	    );
	  }
	  handleChange = (e) => {
	    this.setState({
	      text: e.target.value
	    })
	  }
	  onChange = (e) => {
	    console.log('radio checked', e.target.value);
	    this.setState({
	      value: e.target.value,
	    });
	  }
	  render() {
	    const { getFieldDecorator } = this.props.form;
	    return (
	      <Form>
			<FormItem 
		          label="审核处理"
		          
		        >
		          {getFieldDecorator('radio')(
		            <RadioGroup onChange={this.onChange} value={this.state.value}>
		                <Radio  value={3}>通过</Radio>
		                <br />
				        <Radio  value={4}>
				          不通过
				          {this.state.value === 4 ? <TextArea style={{ width: 500, marginLeft: 10 }} onChange={this.handleChange}/> : null}
				        </Radio>
		            </RadioGroup>
		          )}
		        </FormItem>
		        <FormItem
		          
		        >
		          <Button type="primary" onClick={this.submit} size="large">保存</Button>
		        </FormItem>
			</Form>
	    );
	  }
	}
	const WrappedDynamicRule = Form.create()(DynamicRule);
	
	return (
			<div>
				<h2 >基础信息</h2>
					<table className={stytes.table}>
						<tr><td>用户ID</td><td>{userInfo.userId}</td><td>邮箱</td><td>{userInfo.userEmail}</td></tr>
						<tr><td>手机号</td><td>{userInfo.userMobile}</td><td>用户角色</td><td>{userInfo.userRole}</td></tr>
						<tr><td>用户级别</td><td>{userInfo.userLevelDisplay}</td><td>注册时间</td><td>{userInfo.createDate}</td></tr>
						<tr><td>提交专栏申请时间</td><td>{userInfo.applyColumnTime}</td><td>审核状态</td><td>{userInfo.auditStatusDisplay}</td></tr>
						<tr><td>审核人</td><td>{userInfo.auditor}</td><td>审核时间</td><td>{userInfo.auditDate}</td></tr>
						<tr><td>锁定状态</td><td>{userInfo.lockStatusDisplay}</td><td></td><td></td></tr>
					</table>
				<h2 className={stytes.title}>活跃数据</h2>
				    <table className={stytes.table}>
						<tr><td>评论数</td><td>{userInfo.commentNum}</td><td>浏览数</td><td>{userInfo.bowseNum}</td></tr>
						<tr><td>收藏数</td><td>{userInfo.collectNum}</td><td>发文数</td><td>{userInfo.articleNum}</td></tr>
						<tr><td>分享数</td><td>{userInfo.shareNum}</td><td></td><td></td></tr>
						
					</table>
				<h2 className={stytes.title}>其他信息</h2>
				<div>
					<p className={stytes.dataBox}><span className={stytes.span1}>专栏名称</span><span className={stytes.span2}>{userInfo.columnName}</span></p>
					<p className={stytes.dataBox}><span className={stytes.span1}>专栏介绍</span><span className={stytes.span2}>{userInfo.columnIntro}</span></p>
					<p className={stytes.dataBox}><span className={stytes.span1}>所在地区</span><span className={stytes.span2}>{userInfo.columnProvince}</span></p>
					<p className={stytes.dataBox}><span className={stytes.span1}>组织名称</span><span className={stytes.span2}>{userInfo.licensePic}</span></p>
					<p className={stytes.dataBox}><span className={stytes.span1}>组织机构代码</span><span className={stytes.span2}>{userInfo.licensePic}</span></p>
					<p className={stytes.dataBox}><span className={stytes.span1}>管理员真实姓名</span><span className={stytes.span2}>{userInfo.realName}</span></p>
					<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份证号</span><span className={stytes.span2}>{userInfo.idcard}</span></p>
					<p className={stytes.dataBox} ><span className={stytes.span1}>管理员身份证扫描件</span><span className={stytes.span2}>{userInfo.idcardPic}</span></p>
					<p className={stytes.dataBox}><span className={stytes.span1}>相关网站链接</span><span className={stytes.span2}>{userInfo.siteLink}</span></p>
					<p className={stytes.dataBox}><span className={stytes.span1}>其他资质</span><span className={stytes.span2}>{userInfo.otherPic}</span></p>
					<WrappedDynamicRule />
				</div>
			</div>

	);
}

UserAdmin.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(UserAdmin));