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
import { Form, Row, Col, Input, Button,Badge,Divider,Icon,Table,Pagination,Modal,DatePicker,Popconfirm, message,Select} from 'antd';
import style_search from '../search.css';
import style_pagination from '../pagination.css';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_common from '../common.css';
import styles from './LoginForm.css';
import {options} from "../../services/common";
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
	userData,
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
		  fixed: 'left',
		  render: text => <span>{text}</span>,
		}, {
		  title: '用户名',
		  dataIndex: 'userName',
		  key: 'userName',
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
		  dataIndex: 'userLevelDisplay',
		  key: 'userLevelDisplay',
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
		            {text==0 && <Badge status="processing" text="审核中" />}
		            {text==1 && <Badge status="success" text="通过" />}
		            {(text==2||text==3)&& <Badge status="error" text="未通过" />}
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
		  title: '排序',
		  dataIndex: 'userOrder',
		  key: 'userOrder',
		  render: text => <span>{text}</span>,
		},{
		  title: '操作',
		  key: 'action',
		  fixed: 'right',
		  render: (text, record) => (
		    <span>
		      	<a onClick={()=>userData(record)}>查看</a>
		      	<Divider type="vertical" />
         		{(record.auditStatus == 0 && record.applyRole!=1)? <a onClick={()=>Examine(record.userId)}>审核</a>:
         	    <a className={styles.audit}>审核</a>}
         	     <Divider type="vertical" />
				{record.lockStatus == 2 ?<Popconfirm title="是否确认解锁?" onConfirm={()=>confirm(record)}  okText="确认" cancelText="取消">
			    <a>解锁</a>
			    </Popconfirm>:
				<a onClick={()=>LockModal(record)}>锁定</a>}
				<Divider type="vertical" />
				{record.userRole==1?<a className={styles.audit}>推荐设置</a>:<a  onClick={()=>openModal(record)}>推荐设置</a>}
		    </span>
		  ),
	}];
	function onChange (pageNumber){
		console.log()
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
			      fixed:true,
			      onChange: this.onSelectChange,
			    };
			    const hasSelected = selectedRowKeys.length > 0;
			    return (
			      <div>
			        <Table columns={columns} dataSource={userlist} pagination = {false} rowSelection={rowSelection} loading={loading} rowKey={record => record.userId} 
			        scroll={{ x:1900 }} 
			        />
	      	 <div className="table-operations" >
		          <Button type="primary" size='large' disabled={!hasSelected} onClick={()=>ExamineModal(selectedRows)}>批量审核</Button>
		          <Button type="primary" size='large'style={{marginLeft:20,marginTop:20}} disabled={!hasSelected} onClick={()=>LocksModal(selectedRows)}>批量锁定</Button>
		          <Button type="primary" size='large'style={{marginLeft:20,marginTop:20}} disabled={!hasSelected} onClick={()=>deblocking(selectedRows)}>批量解锁</Button>
	      	      <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage}onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={25}/>
			  </div>         
			      </div>
			    );
			  }
			}



	return (
		<div className = {style_common.contentDiv}>
	      
	      <div className={style_search.search_result}>
	      	<p>当前共有用户：{total}</p>
	      	<TableList />
	      </div>
	    </div>
	);
};

UserAdmin.propTypes = {};

export default Form.create()(UserAdmin);
