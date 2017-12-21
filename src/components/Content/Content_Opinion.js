import React from 'react';
import {Link} from 'react-router'
import { Form, Row, Col, Input, Button,Table,Pagination,Popconfirm,DatePicker, TimePicker,Select} from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';

const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
function Content_Opinion({data,total,confirm,handlsearch,delFeeks,onEditor}) {

	const columns = [{
	  title: 'ID',
	  dataIndex: 'id',
	  key: 'id',
	}, {
	  title: '反馈内容',
	  dataIndex: 'content',
	  key: 'content',
	}, {
	  title: '邮箱',
	  dataIndex: 'email',
	  key: 'email',
	},{
	  title: '手机号',
	  dataIndex: 'phone',
	  key: 'phone',
	},{
	  title: '提交时间',
	  dataIndex: 'createDate',
	  key: 'createDate',
	},{
	  title: '阅读状态',
	  dataIndex: 'statusDisplay',
	  key: 'statusDisplay',
	},{
	  title: '操作',
	  dataIndex: '3address',
	  key: '3address',
	  render: (text, record) => (
	    <span>
	    <a onClick={()=>onEditor(record)} className = "action_font">查看</a>
	      <Popconfirm title="确定删除吗？" onConfirm={()=>confirm(record)}  okText="是" cancelText="否">
		    <a className = "action_font">删除</a>
		  </Popconfirm>
	    </span>
	  )
	}];

	const rowSelection = {
	  onChange: (selectedRowKeys, selectedRows) => {
	    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	  },
	  onSelect: (record, selected, selectedRows) => {
	    console.log(record, selected, selectedRows);
	  },
	  onSelectAll: (selected, selectedRows, changeRows) => {
	    console.log(selected, selectedRows, changeRows);
	  },
	};

	function getFields(getFieldDecorator,formItemLayout){
			const children = [];
	    	children.push(
		    	<div key= "0">
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='反馈内容'>
			            {getFieldDecorator('content')(
			              <Input placeholder="请输入反馈内容" />
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem
				          {...formItemLayout}
				          label="评论时间"
				        >
				          {getFieldDecorator('time')(
				            <RangePicker />
				          )}
				        </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='阅读状态'>
			            {getFieldDecorator('status')(
			              <Select
				              placeholder="请选择"
				              onChange={this.handleSelectChange}
				            >
				              <Option value="true">已读</Option>
				              <Option value="false">未读</Option>
				            </Select>
			            )}
			          </FormItem>
			        </Col>
		        </div>
	      	);
	    return children;
	}
	function onChange(){

	}
	class Content extends React.Component{
		state = {
		    selectedRows: [], 
		    selectedRowKeys:[],
		    loading: false,
	    }
	    onSelectChange = (selectedRowKeys,selectedRows) => {
			    console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			    this.setState({ 
			    	selectedRowKeys:selectedRowKeys,
			    	selectedRows:selectedRows
			    	 });
	    }
		render(){
			const { loading, selectedRowKeys,selectedRows} = this.state;
			const rowSelection = {
			      selectedRowKeys,
			      onChange: this.onSelectChange,
			    };
			const hasSelected = selectedRowKeys.length > 0;
			return (
			    <div>
			      <WrappedAdvancedSearchForm  style = {{margin:0}} getFields = {getFields} handlsearch={handlsearch}/>
			      <div>
			      	<p >当前共有反馈数：{total}</p>
			      </div>
			      <Table style ={{marginTop:20}} bordered columns={columns} rowKey={record => record.id+''} rowSelection={rowSelection} dataSource={data} pagination = {false} />
			      <Pagination className = {style_pagination.pagination} showQuickJumper showSizeChanger  total={500} onChange={onChange} />
			      <Button type="primary" size = 'large' disabled={!hasSelected} onClick={()=>delFeeks(selectedRows)}>删除</Button>
			    </div>
			  );
			};
	}


   return (
   		 <Content />
   	)


}



Content_Opinion.propTypes = {
};

export default Content_Opinion;