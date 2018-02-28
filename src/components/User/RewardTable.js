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
        title: '奖励类型',
        dataIndex: 'no',
      },
      {
        title: '奖励说明',
        dataIndex: 'description',
      },
      {
        title: '状态',
        dataIndex: 'categoryName',
        align: 'left',
      },{
        title: '时间',
        dataIndex: 'updatedAt',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '数量',
        dataIndex: 'createdText',
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