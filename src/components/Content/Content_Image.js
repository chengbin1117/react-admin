import React from 'react';
import { Form, Row, Col, Badge,Input, Button,Table,Pagination,Popconfirm,Select,Cascader,Divider} from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';

import style_pagination from '../pagination.css';
const FormItem = Form.Item;
const Option = Select.Option;
import {uploadUrl,residences} from "../../services/common"
let X = 0; //出事选中父选择器的
function Content_Image({data,total,currentPage,showModal,confirm,handlsearch,loading,editorItem,setStatus,changepage}) {
	//console.log('loading',loading)
	const columns = [{
	  title: '类型',
	  dataIndex: 'imageType',
	  key: 'imageType',
	  render:(text,record)=> (
	  	    <span>
	  	        {record.imageType === 1 && '资讯'}
	  	        {record.imageType === 2 && '广告'}
	  	        {record.imageType === 3 && '其他'}
	  	    </span>
	  	)
	}, {
	  title: '图片链接',
	  dataIndex: 'imageDetail',
	  key: 'imageDetail',
	}, {
	  title: '图片',
	  dataIndex: 'imageAddress',
	  key: 'imageAddress',
	  render:(text,record)=> (
	  	    <span><img src ={record.imageAddress!=""?uploadUrl+record.imageAddress:''}  style={{width:'50px',height:"50px"}}/></span>
	  	)
	},{
	  title: '发布人',
	  dataIndex: 'user',
	  key: 'user',
	},{
	  title: '发布时间',
	  dataIndex: 'createDate',
	  key: 'createDate',
	},{
	  title: '显示状态',
	  dataIndex: 'imageStatus',
	  key: 'imageStatus',
	  render:(text,record)=> (
	  	    <span>{record.imageStatus ==true?<Badge status="success" text="显示" />:<Badge status="default" text="隐藏" />}</span>
	  	)
	},{
	  title: '显示位置',
	  dataIndex: 'imagePos',
	  key: 'imagePos',
	  render:(text,record) => (
	  	<span>
	  		{record.imagePos == 11 && "首页banner"}
	  		{record.imagePos == 12 && "首页banner下方小幅图片"}
	  		{record.imagePos == 13 && "首页资讯列表横幅"}
	  		{record.imagePos == 14 && "首页右侧top排行上方宽幅图片"}
	  		{record.imagePos == 15 && "首页右侧热门作者下方小横幅"}
				{record.imagePos == 16 && "首页行情条下方横幅图片"}
	  		{record.imagePos == 21 && "栏目页右侧top排行上方宽幅图片"}
	  		{record.imagePos == 22 && "tag列表右侧top排行上方宽幅图片"}
	  		{record.imagePos == 31 && "频道页banner"}
	  		{record.imagePos == 32 && "频道页banner下方小幅图片"}
	  		{record.imagePos == 33 && "频道页资讯列表横幅"}
	  		{record.imagePos == 34 && "频道页右侧热门资讯上方宽幅图片"}
	  		{record.imagePos == 35 && "频道页右侧热门作者上方小横幅"}
	  		{record.imagePos == 41 && "资讯详情页顶部通栏"}
	  		{record.imagePos == 42 && "资讯详情页正文声明下方横幅"}
	  		{record.imagePos == 43 && "资讯详情页右侧top排行上方宽幅图片"}
	  	</span>
	  )
	},{
	  title: '排序',
	  dataIndex: 'imageOrder',
	  key: 'imageOrder',
	},{
	  title: '操作',
	  dataIndex: '3address',
	  key: '3address',
	  render: (text, record) => (
	    <span>
	      <a className = "action_font" onClick={()=>editorItem(record)}>编辑</a>
	      <Divider type="vertical" />
	      <Popconfirm title="确定删除吗？" onConfirm={()=>confirm(record)}  okText="是" cancelText="否">
		    <a href="#" className = "action_font">删除</a>
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
	//const hasSelected = data.length > 0
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
			    const { selectedRowKeys,selectedRows} = this.state;
			    const rowSelection = {
			      selectedRowKeys,
			      onChange: this.onSelectChange,
			    };
			    const hasSelected = selectedRowKeys.length > 0;
			    return (
			      	<div style={{paddingBottom:50}}>
					      
					      <p >当前共有图片：{total}</p>
					      <Table style ={{marginTop:20}} bordered columns={columns} rowSelection={rowSelection} dataSource={data} pagination = {false} rowKey={record => record.imageId+''} loading={loading}/>
					      <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage}onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={25}/>    
					    </div>
			    );
			  }
			}
	return (
			<TableList />
		)
}

Content_Image.propTypes = {
};
export default Content_Image;


{/*<Button type="primary" size = 'large' disabled={!hasSelected} onClick={()=>setStatus(selectedRows)}>批量设置显示状态</Button>*/}