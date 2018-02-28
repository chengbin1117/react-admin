import React, { PureComponent } from 'react';
import {
	connect
} from 'dva';

import { Form, Row, Col, Input, Button,Badge,Divider,Icon,Table,Pagination,Modal,DatePicker,Popconfirm, message,Select} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
function StandardTable({data,loading,pageSize,changepage,pageNumber,total,editorItem,deleteItem,setShow,onShowModal,autidShow}){

  const columns = [
      {
        title: '用户ID',
        dataIndex: 'id',
      },
      {
        title: '昵称',
        dataIndex: 'description',
      },
      {
        title: '手机号',
        dataIndex: 'categoryName',
        align: 'left',
      },{
        title: '角色',
        dataIndex: 'dsa',
        align: 'left',
      },{
        title: '级别',
        dataIndex: 'df',
        align: 'left',
      },{
        title: '注册时间',
        dataIndex: 'updatedAt',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },{
        title: '最后活动时间',
        dataIndex: 'updated',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
        <span>
            <a onClick={()=>userData(record)}>查看详细信息</a>
        </span>
      ),
      },
    ];
    const list=[{
      "no":1,
      "description":"这是一段描述",
      "callNo":"杨XX"
    }]
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      
    };

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
        onShowSizeChange =(page,pageSize) =>{
          //console.log(page)
          changepage(page,pageSize)
        }
        onChange = (page,pageSize)=>{
          changepage(page,pageSize)
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
            <Table columns={columns} dataSource={list} rowKey={record => record.id} loading={loading} pagination = {paginationProps}/>
          </div>
        );
      }
    }
  return (
    <div>  
        <App />
    </div>
  );
};

export default StandardTable;