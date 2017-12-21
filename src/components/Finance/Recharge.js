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

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const Recharge = ({
	loading,
	data,
	total,
	router,
	changepage,
	currentPage,
	handlsearch,
	Examine,
}) => {
  	console.log("loading",loading)
	const columns = [{
		  title: '充值流水号',
		  dataIndex: 'flowId',
		  key: 'flowId',
		  render: text => <span>{text}</span>,
		}, {
		  title: '用户ID',
		  dataIndex: 'userId',
		  key: 'userId',
		  render: text => <span>{text}</span>,
		}, {
		  title: '邮箱',
		  dataIndex: 'email',
		  key: 'email',
		}, {
		  title: '手机号',
		  dataIndex: 'mobile',
		  key: 'mobile',
		}, {
		  title: '充值数(TV)',
		  dataIndex: 'amount',
		  key: 'amount',
		}, {
		  title: '充值时间',
		  dataIndex: 'rechargeTime',
		  key: 'rechargeTime',
		}, {
		  title: '到账时间',
		  dataIndex: 'accountTime',
		  key: 'accountTime',
		}, {
		  title: '备注信息',
		  dataIndex: 'remark',
		  key: 'remark',
		}, {
		  title: '状态',
		  dataIndex: 'statusDisplay',
		  key: 'statusDisplay',
		}, {
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		    <a style={{marginRight:10+"px"}} onClick={()=>Examine(record)}>详情</a>
         	
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
		              <Input type="mobile" placeholder="请输入手机号" />
		            )}
		          </FormItem>
		        </Col>
		         <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='充值时间'>
		            {getFieldDecorator('time')(
		              <RangePicker />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='充值状态'>
		            {getFieldDecorator('status')(
		              <Select  placeholder="请选择">
					      <Option value="0">充值中</Option>
					      <Option value="1">充值成功</Option>
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
			  onShowSizeChange =(page) =>{
			      
			      	changepage(page)
			      }
			   onChange = (page)=>{
			      	changepage(page)
			      }
			  render() {
			   
			    return (
			      <div>
			        <Table bordered columns={columns} dataSource={data} pagination = {false} loading={loading} rowKey={record => record.flowId} />
	      	        <Pagination className = {style_pagination.pagination} showQuickJumper   current={1} onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={20}/>
			          
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

Recharge.propTypes = {};

export default Form.create()(Recharge);
