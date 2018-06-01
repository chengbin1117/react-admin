import React from 'react';
import { Form, Row, Col, Input, Button, Table,Pagination,Badge,message, Popconfirm, Divider,InputNumber} from 'antd';
import style_pagination from '../pagination.css';
import { routerRedux, Link } from 'dva/router';

function StandardTable({data,loading,total,editorItem,deleteItem,handelchande,onShowSizeChange,pageSize,pageNumber,fixSort}){
	const columns = [
		{
		  title: '广告主名称',
		  dataIndex: 'sortOrder',
		},
		{
		  title: '广告名称',
		  dataIndex: 'categoryName',
		},
		{
		  title: '广告样式',
		  dataIndex: 'userName',
		  align: 'left',
		},
		{
		  title: '图片',
		  dataIndex: 'createdText',
		},
		{
		  title: '显示端口',
		  dataIndex: 'count',
		},
		{
			title: '发布人',
			dataIndex: 'tuisong',
		},
		{
			title: '发布时间',
			dataIndex: 'from',
		},
		{
			title: '显示状态',
			dataIndex: 'createUser',
		},
		{
			title: '显示位置',
			dataIndex: 'time',
		},
		{
			title: '排序',
			dataIndex: 'status',
		},
		{
		  title: '操作',
		  render: (text,record) => (
			<span>
			  <a onClick={() => editorItem(record)}>编辑</a>
			  <Divider type="vertical" />
			  <Popconfirm 
			   placement="topRight" 
			   title="是否删除" 
			   onConfirm={() => deleteItem(record)} 
			   okText="确定" 
			   cancelText="取消">
				 <a  disabled={record.isCanDelete==0?true:false}>删除</a>
			  </Popconfirm>
			 
			</span>
		  ),
		},
	  ];
		
		const list = [
			{
				sortOrder:'1',
				categoryName:'新闻新闻新闻新闻新闻新闻新闻新闻...',
				userName:'人工添加'
			}
		]
	  const paginationProps = {
		showSizeChanger: false,
		showQuickJumper: true,
		total:total,
		onChange:handelchande,
		onShowSizeChange:onShowSizeChange,
		pageSize:pageSize,
		current:pageNumber
	  };
	return(
	  <div>
		 <Table
			rowKey={record => record.id}
			loading={loading}
			dataSource={list}
			columns={columns}
			pagination={paginationProps}
		  />
		  
	  </div>
	  )
  }
  export default StandardTable;
  