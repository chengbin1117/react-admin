import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	Link,
	browserHistory
} from 'dva/router';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,DatePicker,Popconfirm, message,Select} from 'antd';
import style_search from '../search.css';
import style_pagination from '../pagination.css';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_common from '../common.css';
import styles from './LoginForm.css';
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const UserAdmin = ({
	loading,
	onSubmit,
	openModal,
	ExamineModal,
	deblocking,
	LockModal,
	userlist,
	handlsearch,
	Examine,
	conOk,
	LocksModal,
	router,
	total,
	changepage,
	currentPage,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
	},
	forget
}) => {
	//console.log(userlist)

	function confirm(e) {
       //console.log(e);
       conOk(e)
  }

	const columns = [{
		  title: '用户ID',
		  dataIndex: 'userId',
		  key: 'userId',
		  render: text => <span>{text}</span>,
		}, {
		  title: '用户名',
		  dataIndex: 'name',
		  key: 'name',
		  render: text => <span>{text}</span>,
		}, {
		  title: '邮箱',
		  dataIndex: 'userEmail',
		  key: 'userEmail',
		}, {
		  title: '手机号',
		  dataIndex: 'userMobile',
		  key: 'userMobile',
		}, {
		  title: '注册时间',
		  dataIndex: 'createDate',
		  key: 'createDate',
		}, {
		  title: '角色',
		  dataIndex: 'userRoleDisplay',
		  key: 'userRoleDisplay',
		}, {
		  title: '级别',
		  dataIndex: 'userLevel',
		  key: 'userLevel',
		}, {
		  title: '最后活动时间',
		  dataIndex: 'lastActiveTime',
		  key: 'lastActiveTime',
		}, {
		  title: '发文量',
		  dataIndex: 'articleNum',
		  key: 'articleNum',
		}, {
		  title: '评论量',
		  dataIndex: 'commentNum',
		  key: 'commentNum',
		}, {
		  title: '收藏量',
		  dataIndex: 'collectNum',
		  key: 'collectNum',
		}, {
		  title: '分享量',
		  dataIndex: 'shareNum',
		  key: 'shareNum',
		}, {
		  title: '审核状态',
		  dataIndex: 'auditStatus',
		  key: 'auditStatus',
		  render: (text,record) => {
		  	//console.log(text,record)
		  	return(
		  		<span>
		  {text==0 && "审核中"}
		  {text==1 && "通过"}
		  {text==2 && "未通过"}
		  </span>
		  		)
		  }
		}, {
		  title: '审核人',
		  dataIndex: 'auditor',
		  key: 'auditor',
		}, {
		  title: '审核时间',
		  dataIndex: 'auditDate',
		  key: 'auditDate',
		},{
		  title: '锁定状态',
		  dataIndex: 'lockStatusDisplay',
		  key: 'lockStatusDisplay',
		},{
		  title: '是否推荐',
		  dataIndex: 'hotUser',
		  key: 'hotUser',
		  render: text => <span>{text==true?"是":'否'}</span>,
		},{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		      	<Link to={{ 
             pathname:"/user/user_data", 
             query:{userId: record.userId} 
         }}  style={{marginRight:10+"px"}}>查看</Link>
         		{record.auditStatus != 1 ? <a style={{marginRight:10+"px"}} onClick={()=>Examine(record.userId)}>审核</a>:
         	<a style={{marginRight:10+"px"}} className={styles.audit}>审核</a>}
			{record.lockStatus == 2 ?<Popconfirm title="是否确认解锁?" onConfirm={()=>confirm(record)}  okText="确认" cancelText="取消">
    <a style={{marginRight:10+"px"}} >解锁</a>
  </Popconfirm>
				:
		 <a style={{marginRight:10+"px"}} onClick={()=>LockModal(record)}>锁定</a>}
		      	
		      	<a style={{marginRight:10+"px"}} onClick={()=>openModal(record)}>推荐设置</a>
		    </span>
		  ),
	}];
	function onChange (pageNumber){
		console.log()
	}
	
	function getFields(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div key="0">
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='用户ID'>
		            {getFieldDecorator('Id')(
		              <Input placeholder="请输入用户Id" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='邮箱'>
		            {getFieldDecorator('email')(
		              <Input type="email"placeholder="请输入邮箱" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='手机号'>
		            {getFieldDecorator('phone')(
		              <Input type="phone" placeholder="请输入手机号" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='用户角色'>
		            {getFieldDecorator('role')(
		              <Select placeholder="请选择">
		              	    <Option value="1">普通用户</Option>
		              	    <Option value="2">个人</Option>
		              	    <Option value="3">媒体</Option>
		              	    <Option value="4">企业</Option>
		              	    <Option value="5">组织</Option>
		              </Select>
		            )}
		          </FormItem>
		        </Col>
		         <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='注册时间'>
		            {getFieldDecorator('time')(
		              <RangePicker />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='审核状态'>
		            {getFieldDecorator('auditStatus')(
		              <Select placeholder="请选择">
		              	    <Option value="0">审核中</Option>
		              	    <Option value="1">通过</Option>
		              	    <Option value="2">不通过</Option>
		              </Select>
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='锁定状态'>
		            {getFieldDecorator('lockStatus')(
		               <Select placeholder="请选择">
		              	    <Option value="1">未锁定</Option>
		              	    <Option value="2">已锁定</Option>
		              	   
		              </Select>
		            )}
		          </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}
	const hasSelected = userlist.length > 0


	class TableList extends React.Component {
			  state = {
			    selectedRows: [], 
			    selectedRowKeys:[],
			  };
			  onSelectChange = (selectedRowKeys,selectedRows) => {
			    console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			    this.setState({ 
			    	selectedRowKeys:selectedRowKeys,
			    	selectedRows:selectedRows
			    	 });
			  }
			   onShowSizeChange =(page) =>{
			      	console.log(page)
			      	changepage(page)
			      }
			   onChange = (page)=>{
			      	changepage(page)
			      }
			  render() {
			    const {selectedRowKeys,selectedRows} = this.state;
			    const rowSelection = {
			      selectedRowKeys,
			      onChange: this.onSelectChange,
			    };
			    const hasSelected = selectedRowKeys.length > 0;
			    return (
			      <div>
			        <Table bordered columns={columns} dataSource={userlist} pagination = {false} rowSelection={rowSelection} loading={loading} rowKey={record => record.userId} />
	      	 <div className="table-operations">
		          <Button type="primary" size='large' disabled={!hasSelected} onClick={()=>ExamineModal(selectedRows)}>批量审核</Button>
		          <Button type="primary" size='large' disabled={!hasSelected} onClick={()=>LocksModal(selectedRows)}>批量锁定</Button>
		          <Button type="primary" size='large' disabled={!hasSelected} onClick={()=>deblocking(selectedRows)}>批量解锁</Button>
		     </div>
	      	<Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage} onShowSizeChange={this.onShowSizeChange} total={total} onChange={this.onChange} pageSize={20}/>
			          
			      </div>
			    );
			  }
			}



	return (
		<div className = {style_common.contentDiv}>
	      <WrappedAdvancedSearchForm getFields = {getFields} handlsearch={handlsearch}/>
	      <div className={style_search.search_result}>
	      	<p>当前共有用户：{total}</p>
	      	<TableList />
	      </div>
	    </div>
	);
};

UserAdmin.propTypes = {};

export default Form.create()(UserAdmin);
