import React from 'react';
import { Form, Row, Col, Input, Button,Table,Pagination,Popconfirm,Select,Cascader } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
const Option = Select.Option;
import {message} from 'antd';
const Content_Article = ({dispatch,currentPage,delArticle,router,total,ArticleList,confirm,setShowModal,article,onShowMOdal,handlsearch,editorItem,changepage,loading,ColumnList,getBonusList}) => {
	const options = ColumnList;
	let userId =localStorage.getItem("userId");
	//console.log("loading",loading)
	function release() {
		dispatch(routerRedux.push('/content/release_article?userId='+userId))
		
	}
	const columns = [{
	  title: 'ID',
	  dataIndex: 'articleId',
	  key: 'articleId',
	}, {
	  title: '标题',
	  dataIndex: 'articleTitle',
	  key: 'articleTitle',
	}, {
	  title: '所属栏目',
	  dataIndex: 'clounm',
	  key: 'clounm',
	},{
	  title: '发布人',
	  dataIndex: 'createUser',
	  key: 'createUser',
	},{
	  title: '发布时间',
	  dataIndex: 'createDate',
	  key: 'createDate',
	},{
	  title: '更新人',
	  dataIndex: 'updateUser',
	  key: 'updateUser',
	},{
	  title: '更新时间',
	  dataIndex: 'updateDate',
	  key: 'updateDate',
	},{
	  title: '状态',
	  dataIndex: 'publishStatusDisplay',
	  key: 'publishStatusDisplay',
	},{
	  title: '审核人',
	  dataIndex: 'auditor',
	  key: 'auditor',
	},{
	  title: '审核时间',
	  dataIndex: 'auditDate',
	  key: 'auditDate',
	},{
	  title: '显示状态',
	  dataIndex: 'displayStatusDisplay',
	  key: 'displayStatusDisplay',
	},{
	  title: '访问量',
	  dataIndex: 'bowseNum',
	  key: 'bowseNum',
	},{
	  title: '奖励规则状态',
	  dataIndex: 'bonusStatus',
	  key: 'bonusStatus',
	  render:(text,record)=>(
	  	<span>{record.sysUser==null?<span>
	  		{record.bonusStatus ==0&&'未生效'}{record.bonusStatus ==1&&'已生效'}
	  	</span>:<span>——</span>}</span>
	  	)
	},{
	  title: '排序',
	  dataIndex: 'displayOrder',
	  key: 'displayOrder',
	},{
	  title: '操作',
	  dataIndex: 'addrss',
	  key: 'addrss',
	  render: (text, record) => (
	    <span>
	      <a onClick={()=>editorItem(record)} className = "action_font" >编辑</a>
	      <a onClick={()=>article(record)} className = "action_font" style={{marginLeft:10}} disabled={record.publishStatus==2?false:true}>审核</a>
	      <a onClick={()=>setShowModal(record)} style={{marginLeft:10}} className = "action_font">显示设置</a>
	      <a onClick={()=>delArticle(record,getBonusList)} style={{marginLeft:10}} className = "action_font">查看阅读奖励</a>
	    </span>
	  )
	}];
	const hasSelected = ArticleList.length > 0;
	function getFields(getFieldDecorator,formItemLayout){
			const children = [];
	    	children.push(
		    	<div key="0">
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='文章ID'>
			            {getFieldDecorator('Id')(
			              <Input placeholder="请输入" />
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='标题'>
			            {getFieldDecorator('title')(
			              <Input placeholder="请输入" />
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='标签'>
			            {getFieldDecorator('tags')(
			              <Input placeholder="请输入" />
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='所属栏目'>
			            {getFieldDecorator('cloumn')(
			              <Cascader options={options}  placeholder="请选择文章栏目" />
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='状态' hasFeedback>
			            {getFieldDecorator('status')(
			              <Select placeholder="请选择">
			              	<Option value="0">草稿</Option>
			              	<Option value="1">通过</Option>
			              	<Option value="2">审核中</Option>
			              	<Option value="3">不通过</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='显示状态' hasFeedback>
			            {getFieldDecorator('displayStatus')(
			              <Select placeholder="请选择" >
			              	<Option value="1">正常显示</Option>
			              	<Option value="2">首页置顶</Option>
			              	<Option value="3">首页推荐</Option>
			              	<Option value="4">前台隐藏</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
		        </div>
	      	);
	    return children;
	}
	function onChange (pageNumber){
		console.log()
	}
	class App extends React.Component {
		  state = {
		    selectedRowKeys: [], // Check here to configure the default column
		 
		  };
		 
		  onSelectChange = (selectedRowKeys,selectedRows) => {
			   // console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
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
		    const { selectedRowKeys,selectedRows } = this.state;
		    const rowSelection = {
			      selectedRowKeys,
			      onChange: this.onSelectChange,
			};
		    const hasSelected = selectedRowKeys.length > 0;
		    return (
		    	<div>
		             <Table bordered rowSelection={rowSelection} columns={columns} dataSource={ArticleList} pagination = {false}  rowKey={record => record.articleId} loading={loading} locale={{emptyText:"暂无数据"}}/>
                     <Button type="primary" onClick={()=>onShowMOdal(selectedRows)} disabled={!hasSelected} size = 'large'>批量设置显示状态</Button>
                     <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage}onShowSizeChange={this.onShowSizeChange}total={total} onChange={this.onChange} pageSize={20}/>
		        </div>
		    );
		  }
		}
  return (
    <div>
      <Button type="primary" size = 'large' onClick={release}>发布文章</Button>
      <WrappedAdvancedSearchForm getFields = {getFields} handlsearch={handlsearch}/>
      <p>当前共有文章：{total}</p>
      	<App />
      	
        
    </div>
  );
};

Content_Article.propTypes = {
};

export default Content_Article;