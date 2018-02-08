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
import {options} from "../../services/common"

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const InputGroup = Input.Group;
const Transaction = ({
	loading,
	handlsearch,
	Examine,
	router,
	total,
	data,
	changepage,
	currentPage,
	BusinessType,
}) => {
	// console.log(currentPage)
	const columns = [{
		  title: '流水号',
		  dataIndex: 'flowId',
		  key: 'flowId',
		  render: text => <span>{text}</span>,
		}, {
		  title: '类型',
		  dataIndex: 'businessTypeName',
		  key: 'businessTypeName',
		  render: text => <span>{text}</span>,
		}, {
		  title: '钛值数额',
		  dataIndex: 'amount',
		  key: 'amount',
		}, {
		  title: '实际数额',
		  dataIndex: 'accountAmount',
		  key: 'accountAmount',
		}, {
		  title: '创建时间',
		  dataIndex: 'flowDate',
		  key: 'flowDate',
		}, {
		  title: '交易人手机号',
		  dataIndex: 'mobile',
		  key: 'mobile',
		}, {
		  title: '交易人邮箱',
		  dataIndex: 'email',
		  key: 'email',
		  render:(text,record)=> (
		  	<span>{record.email==null?"——":record.email}</span>
		  	)
		}, {
		  title: '状态',
		  dataIndex: 'status',
		  key: 'status',
		}, {
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
		          <FormItem {...formItemLayout} label='流水号'>
		            {getFieldDecorator('flowId',{
		            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"手机号只能输入数字"}
			            	]
		            })(
		              <Input placeholder="请输入流水号" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='类型'>
		            {getFieldDecorator('businessTypeId')(
		               <Select  placeholder="请选择">
		               		{BusinessType!=undefined?BusinessType.map((item,index)=>
		               			<Option  key={index} value={item.id+''}>{item.name}</Option>
		               			)
		               			
		               			:null}
					    </Select>
		            )}
		          </FormItem>
		        </Col>
		         <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='交易时间'>
		            {getFieldDecorator('time')(
		              <RangePicker locale={options}/>
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <Col span={12} style={{paddingLeft:68+"px"}}>
		          	<FormItem {...formItemLayout} label='钛值'>
		            {getFieldDecorator('minAmount')(
		              		<Input style={{ textAlign: 'center' }} placeholder="最小值" />
		              	
		            )}
		          </FormItem>
		          </Col>
		          <Col span={2} style={{ textAlign: 'center',lineHeight:30+"px"}}>
		          	<span >~</span>
		          </Col>
		          <Col span={10}>
		          		<FormItem {...formItemLayout}>
				            {getFieldDecorator('maxAmount')(
				              	<Input style={{ textAlign: 'center'}} placeholder="最大值" />
				            )}
				          </FormItem>
		         </Col>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='手机号'>
		            {getFieldDecorator('mobile',{
		            	rules:[
			            	  {required:false,pattern:/^[0-9]*$/,message:"手机号只能输入数字"}
			            	]
		            })(
		              <Input placeholder="手机号" />
		            )}
		          </FormItem>
		        </Col>
		        <Col span={8} style = {{display:'block'}}>
		          <FormItem {...formItemLayout} label='邮箱'>
		            {getFieldDecorator('email')(
		              <Input type="email" placeholder="邮箱" />
		            )}
		          </FormItem>
		        </Col>
	        </div>
	      );
	    return children;
	}
	
	class TableList extends React.Component {
			  
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
			        <Table bordered size="default" columns={columns} locale={{emptyText:"暂无数据"}} dataSource={data} pagination = {false}  loading={loading} rowKey={record => record.flowId} />
	      	  
	      	        <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage} onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={25}/>
			          
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

Transaction.propTypes = {};

export default Form.create()(Transaction);
