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
const RealName = ({
	loading,
	data,
	openModal,
	ExamineModal,
	deblocking,
	LockModal,
	userlist,
	handlsearch,
	Examine,
	conOk,
	showIdCard,
	router,
	total,
	changepage,
	currentPage,
	
}) => {
	console.log('loading',loading)

	const columns = [{
		  title: '用户ID',
		  dataIndex: 'userId',
		  key: 'userId',
		  render: text => <span>{text}</span>,
		}, {
		  title: '昵称',
		  dataIndex: 'nickname',
		  key: 'nickname',
		  render: text => <span>{text}</span>,
		}, {
		  title: '邮箱',
		  dataIndex: 'emailemail',
		  key: 'email',
		}, {
		  title: '手机号',
		  dataIndex: 'mobile',
		  key: 'mobile',
		}, {
		  title: '身份证',
		  dataIndex: 'IdCard',
		  key: 'IdCard',
		  render: (text, record) => (
		    <div>
		    	<p onClick={()=>showIdCard(record)}><img src={'http://kgcom.oss-cn-shenzhen.aliyuncs.com/'+record.idcardFront}/></p>
         	
		    </div>
		    )
		}, {
		  title: '认证信息',
		  dataIndex: 'info',
		  key: 'info',
		  render: (text, record) => (
		    <div>
		    	<p>{record.realname}</p>
         		<p>{record.idcardNo}</p>
		    </div>
		  ),
		}, {
		  title: '所属地区',
		  dataIndex: 'address',
		  key: 'address',
		}, {
		  title: '提交时间',
		  dataIndex: 'createDate',
		  key: 'createDate',
		}, {
		  title: '审核状态',
		  dataIndex: 'statusDisplay',
		  key: 'statusDisplay',
		}, {
		  title: '审核人',
		  dataIndex: 'auditUser',
		  key: 'auditUser',
		}, {
		  title: '审核时间',
		  dataIndex: 'auditDate',
		  key: 'auditDate',
		},{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		    <a style={{marginRight:10+"px"}} onClick={()=>Examine(record)}>{record.status==1?"取消通过":"审核"}</a>
         	
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
		            {getFieldDecorator('userId')(
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
		            {getFieldDecorator('mobile')(
		              <Input type="phone" placeholder="请输入手机号" />
		            )}
		          </FormItem>
		        </Col>
		         <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='认证时间'>
		            {getFieldDecorator('time')(
		              <RangePicker />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='审核状态'>
		            {getFieldDecorator('status')(
		              <Select   placeholder="请选择">
					      <Option value="2">审核中</Option>
					      <Option value="1">已通过</Option>
					      <Option value="0" >不通过</Option>
					      
					    </Select>
		            )}
		          </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}
	

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
			        <Table bordered columns={columns} dataSource={data} pagination = {false} rowSelection={rowSelection} loading={loading} rowKey={record => record.userId} />
	      	      <div className="table-operations">
		          <Button type="primary" size='large' disabled={!hasSelected} onClick={()=>ExamineModal(selectedRows)}>批量审核</Button>
	
		           </div>
	      	 <Pagination className = {style_pagination.pagination} showQuickJumper   current={1}onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={20}/>
			          
			      </div>
			    );
			  }
			}



	return (
		<div className = {style_common.contentDiv}>
	      <WrappedAdvancedSearchForm getFields = {getFields} handlsearch={handlsearch}/>
	      <div className={style_search.search_result}>
	      	<TableList />
	      </div>
	    </div>
	);
};

RealName.propTypes = {};

export default Form.create()(RealName);
