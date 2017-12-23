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
const BondList = ({
	loading,
	handlsearch,
	Examine,
	data,
	total,
	changepage,
	currentPage,
}) => {
	

	const columns = [{
		  title: '流水号',
		  dataIndex: 'flowId',
		  key: 'flowId',
		  render: text => <span>{text}</span>,
		}, {
		  title: '用户ID',
		  dataIndex: 'userId',
		  key: 'userId',
		}, {
		  title: '手机号',
		  dataIndex: 'mobile',
		  key: 'mobile',
		}, {
		  title: '应缴纳保证金数额',
		  dataIndex: 'depositAmount',
		  key: 'depositAmount',
		}, {
		  title: '实际缴纳数额',
		  dataIndex: 'accountAmount',
		  key: 'accountAmount',
		}, {
		  title: '到账时间',
		  dataIndex: 'accountTime',
		  key: 'accountTime',
		}, {
		  title: '备注信息',
		  dataIndex: 'remark',
		  key: 'remark',
		},{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		    <a style={{marginRight:10+"px"}} onClick={()=>Examine(record)}>详情</a>
         	
		    </span>
		  ),
	}];
	
	function getFields(getFieldDecorator,formItemLayout){
		const children = [];
	    children.push(
	    	<div key="0">
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='用户ID'>
		            {getFieldDecorator('userId')(
		              <Input type="text"placeholder="请输入id" />
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
		          <FormItem {...formItemLayout} label='缴纳时间'>
		            {getFieldDecorator('time')(
		              <RangePicker />
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
			    loading: false,
			  };
			 
			   onShowSizeChange =(page) =>{
			      	console.log(page)
			      	changepage(page)
			      }
			   onChange = (page)=>{
			      	changepage(page)
			      }
			  render() {
			   
		
			    return (
			      <div>
			        <Table bordered columns={columns}locale={{emptyText:"暂无数据"}}  dataSource={data} pagination = {false} loading={loading} rowKey={record => record.userId} />
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

BondList.propTypes = {};

export default Form.create()(BondList);
