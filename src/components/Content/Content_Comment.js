import React from 'react';
import { Form, Row, Col, Input, Button,Table,Pagination,Popconfirm,Select,DatePicker} from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';

const Option = Select.Option;
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
function Content_Comment({data,opinionSetModal,changepage,showSet,confirm,showSets,audit,handlsearch,currentPage,loading,total}){
	console.log("loading",loading)
	const columns = [{
		  title: '评论内容',
		  dataIndex: 'content',
		  key: 'content',
		}, {
		  title: '评论人',
		  dataIndex: 'user',
		  key: 'user',
		}, {
		  title: '评论时间',
		  dataIndex: 'createDate',
		  key: 'createDate',
		},{
		  title: '状态',
		  dataIndex: 'statusDisplay',
		  key: 'statusDisplay',
		},{
		  title: '显示状态',
		  dataIndex: 'displayStatusDisplay',
		  key: 'displayStatusDisplay',
		},{
		  title: '操作',
		  dataIndex: '3address',
		  key: '3address',
		  render: (text, record) => (
		    <span>
		    	{record.status == 1? <span className = "action_font" style={{color:'#e5e5e5'}}>审核</span>:
		    	<a className = "action_font" onClick={()=>audit(record)}>审核</a>
		    }
		      
		      <a  className = "action_font" onClick={()=>showSet(record)}>显示设置</a>
		      <Popconfirm title="确定删除吗？" onConfirm={()=>confirm(record)}  okText="是" cancelText="否">
			    <a href="#" className = "action_font">删除</a>
			  </Popconfirm>
		    </span>
		  )
	}];
	function getFields(getFieldDecorator,formItemLayout){
			const children = [];
	    	children.push(
		    	<div key="0">
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='评论内容'>
			            {getFieldDecorator('content')(
			              <Input placeholder="请输入评论内容" />
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='评论时间'>
			            {getFieldDecorator('time')(
			               <RangePicker />
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='状态'>
			            {getFieldDecorator('status')(
			              <Select placeholder="请选择">
			              	<Option value="0" >待审核</Option>
			              	<Option value="1">已审核</Option>
			              	<Option value="2">审核拒绝</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
			        <Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='显示状态'>
			            {getFieldDecorator('displayStatus')(
			              <Select placeholder="请选择">
			              	<Option value="1" >显示</Option>
			              	<Option value="2">隐藏</Option>
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
		constructor(){
	        super();
	        this.state = {
			    collapsed: false,
			    selectedRowKeys: [], // Check here to configure the default column
			    visible:false,
			    showVisible:false,
	        };
	       
		}
		opinionSetModal(){
			this.setState({
				visible:true
			})
		}
		showOpinionSetModal(){
			this.setState({
				showVisible:true
			})
		}
		handleCancel(){
			this.setState({
				visible:false,
				showVisible:false
			})
		}
		handleCreate(){
			this.setState({
				visible:true,
				showVisible:true
			})
		}
		onShowSizeChange =(page) =>{
			      	console.log(page)
			      	changepage(page)
	    }
	    onChange = (page)=>{
			      	changepage(page)
			      }
		onSelectChange = (selectedRowKeys,selectedRows) => {
			   // console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			    this.setState({ 
			    	selectedRowKeys:selectedRowKeys,
			    	selectedRows:selectedRows
			    	 });
	      }
		render(){
		
		

	
		const { selectedRowKeys,selectedRows } = this.state;
		    const rowSelection = {
			      selectedRowKeys,
			      onChange: this.onSelectChange,
			};
		  const hasSelected = selectedRowKeys.length > 0;
		  return (
		    <div>
		      <WrappedAdvancedSearchForm  style = {{margin:0}} getFields = {getFields} handlsearch={handlsearch}/>
		      <div>
		      	<p style = {{float:"left",margin:10}}>当前共有评论：{total}</p>
		      	<Button type="primary" size = 'large' style = {{float:'right'}} onClick = {opinionSetModal}>评论审核设置</Button>
		      </div>
		      <Table style = {{marginTop:90}} bordered columns={columns} rowSelection={rowSelection} dataSource={data} pagination = {false} loading={loading} rowKey={record => record.commentId}/>
		      <Pagination className = {style_pagination.pagination} showQuickJumper   current={currentPage} onShowSizeChange={this.onShowSizeChange} total={total} onChange={this.onChange} pageSize={20}/>
		      <Button type="primary" size = 'large' disabled={!hasSelected} onClick={()=>showSets(selectedRows)}>批量设置显示状态</Button>
		     
		    </div>
		  );
		};
	}
	return(

		<Content />
		)
}



Content_Comment.propTypes = {
};

export default Content_Comment;