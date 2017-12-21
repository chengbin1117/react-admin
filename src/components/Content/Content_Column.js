import React from 'react';
import {Link} from 'react-router'
import { Form, Row, Col, Input, Button,Table,Pagination,Popconfirm,Select} from 'antd';

const Option = Select.Option;
function Content_Column({addColumn,data,confirm,editor,addChildColumn,loading,handleChange,fixName,fix}){
	console.log(loading)

	
	class Content extends React.Component{
	  constructor(){
	        super();
	        this.state = {
	        };   
	  }
	  render(){
		const columns = [{
		  title: '栏目名称',
		  dataIndex: 'name',
		  key: 'name',
		  render(text,record){
		  	return(
		  		<Input defaultValue={text} onPressEnter={(text)=>fixName(record,text)}style={{width:100}} onBlur={(text)=>fix(record,text)}/>
		  		)
		  }
		}, {
		  title: '排序',
		  dataIndex: '1name',
		  key: '1name',
		}, {
		  title: '栏目级别',
		  dataIndex: 'columnLevel',
		  key: 'columnLevel',
		  render(text,record){
		  	return(
		  		<span>{record.columnLevel ==1&&"一级栏目"}
		  			  {record.columnLevel ==2&&"二级栏目"}
		  		</span>
		  		)
		  }
		}, {
		  title: '添加人',
		  dataIndex: 'user',
		  key: 'user',
		},{
		  title: '添加时间',
		  dataIndex: 'createDate',
		  key: 'createDate',
		},{
		  title: '导航栏显示',
		  dataIndex: 'navigatorDisplay',
		  key: 'navigatorDisplay',
		  render(text,record) {
		  	return(
		  			<Select style={{width:150}} defaultValue={String(record.navigatorDisplay)} onChange={(text)=>handleChange(record,text)}>
	                  <Option value="2" >顶部导航</Option>
	                  <Option value="3" >首页主导航</Option>
	                  <Option value="1" >都显示</Option>
	                  <Option value="0" >都不显示</Option>
	                </Select>
		  		)
		  }
		}, {
		  title: '包含文章数',
		  dataIndex: 'articleCount',
		  key: 'articleCount',
		}, {
		  title: '操作',
		  dataIndex: 'address',
		  key: 'address',
		  render(text, record){
		  	return(
		  		<span>
		  		  <a className = "action_font" onClick = {()=>editor(record)}>编辑</a>
		  		  {record.columnLevel ==2?null:<a className = "action_font" onClick = {()=>addChildColumn(record)}>添加子栏目</a>}
			      
			      <Popconfirm title="确定删除吗？" onConfirm={()=>confirm(record)}  okText="是" cancelText="否">
				  <a  className = "action_font">删除</a>
				  </Popconfirm>
			    </span>
		  	)
		  }
		}];
	  return (
	    <div>
	      <Button type="primary" size = 'large' onClick = {()=>addColumn()}>添加一级栏目</Button>
	      <p>同级栏目排序越小越靠前</p>
	      <Table bordered columns={columns} dataSource={data} pagination = {false} rowKey={record => record.id} indentSize={100} loading={loading}/>
	      
	    </div>
	  );
		};
	}

	return(
			<Content />
		)
}



Content_Column.propTypes = {
};

export default Content_Column;