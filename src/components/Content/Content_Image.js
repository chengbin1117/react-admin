import React from 'react';
import { Form, Row, Col, Badge,Input, Button,Table,Pagination,Popconfirm,Select,Cascader} from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';

import style_pagination from '../pagination.css';
const FormItem = Form.Item;
const Option = Select.Option;
import {uploadUrl} from "../../services/common"
let X = 0; //出事选中父选择器的
function Content_Image({data,total,currentPage,showModal,confirm,handlsearch,loading,editorItem,setStatus,changepage}) {
	console.log('loading',loading)
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
	  dataIndex: 'createUser',
	  key: 'createUser',
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
	      <Popconfirm title="确定删除吗？" onConfirm={()=>confirm(record)}  okText="是" cancelText="否">
		    <a href="#" className = "action_font" style={{marginLeft:10}}>删除</a>
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
	const residences = [{
		  value: '1',
		  label: '首页',
		  children: [{
		        "value":'11',
		        "label":"首页banner"
		     },{
		        "value":'12',
		        "label":"首页banner下方小幅图片"
		     },{
		        "value":'13',
		        "label":"首页资讯列表横幅"
		     },{
		        "value":'14',
		        "label":"首页右侧top排行上方宽幅图片"
		     },{
		        "value":'15',
		        "label":"首页右侧热门作者下方小横幅"
		     }
		    ],
		}, {
		  value: '2',
		  label: '栏目列表',
		  children: [{
			    "value":'21',
			    "label":"栏目页右侧top排行上方宽幅图片"
			  },{

			    "value":"22",
			    "label":"tag列表右侧top排行上方宽幅图片"
			  }]
		},{
		  value: '3',
		  label: '频道页',
		  children: [{
			      "value":'31',
			      "label":"频道页banner",
			     },{
			      "value":'32',
			      "label":"频道页banner下方小幅图片",
			     },{"value":'33',
			      "label":"频道页资讯列表横幅",
			     },{"value":'34',
			      "label":"频道页右侧热门资讯上方宽幅图片",
			     },{"value":'35',
			      "label":"频道页右侧热门作者上方小横幅",
		  }],
		},{
		  value: '4',
		  label: '资讯详情',
		  children: [{
		      "value":'41',
		      "label":"资讯详情页顶部通栏",
		     },
		     {
		      "value":'42',
		      "label":"资讯详情页正文声明下方横幅",
		     },
		     {
		      "value":'43',
		      "label":"资讯详情页右侧top排行上方宽幅图片",
		     },]
		}];
	 

    function handlechange(){
      
    }
    class DynamicRule extends React.Component {
    	state = {
    		
    	}

    	render(){
    		const {getFieldDecorator,formItemLayout} =this.props;
    
    		return(
    				<div>
	    				<Col span={8} style = {{display:'block'}}>
				           <FormItem
					          {...formItemLayout}
					          label="显示位置"
					        >
					          {getFieldDecorator('residence', {
					          
					            rules: [{ type: 'array', required: false, message: '请选择!' }],
					          })(
					            <Cascader options={residences}placeholder="请选择" />
					          )}
					        </FormItem>
				        </Col>
			            <Col span={8} style = {{display:'block'}}>
			            <FormItem {...formItemLayout} label='类型'>
			            {getFieldDecorator('type',{
			            	
			            	})(
			              <Select placeholder="请选择">
			               
			              	<Option value="1">资讯</Option>
			              	<Option value="2">广告</Option>
			              	<Option value="3">其他</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='显示状态'>
			            {getFieldDecorator('showStatus',{
			            	
			            	})(
			               <Select placeholder="请选择">
			               
			              	<Option value="1">显示</Option>
			              	<Option value="0">隐藏</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
			        </div>
    			)
    	}
    }
    
	function getFields(getFieldDecorator,formItemLayout){
			const children = [];
	    	children.push(
		    	<div key="0">
			        <DynamicRule getFieldDecorator={getFieldDecorator} formItemLayout={formItemLayout}/>
		        </div>
	      	);
	   		return children;
	}

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
			      	<div>
					      <Button type="primary" size = 'large' onClick={showModal} style = {{marginBottom:20}}>添加图片</Button>
					      <WrappedAdvancedSearchForm  style = {{margin:0}} getFields = {getFields} handlsearch ={handlsearch}/>
					      <p >当前共有图片：{total}</p>
					      <Table style ={{marginTop:20}} bordered columns={columns} rowSelection={rowSelection} dataSource={data} pagination = {false} rowKey={record => record.imageId+''} loading={loading} locale={{emptyText:"暂无数据"}}/>
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