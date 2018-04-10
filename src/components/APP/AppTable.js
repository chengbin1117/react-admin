import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider,Form,Modal,Input,Radio,Popconfirm } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const statusMap = ['default', 'processing', 'success', 'error'];

function StandardTable({data,loading,total,handleModalVisible,deleteItem,handelchande,onShowSizeChange,pageSize,pageNumber,fixSort}){
  const columns = [
      {
        title: '版本号',
        dataIndex: 'sortOrder',
      },
      {
        title: '更新提示语',
        dataIndex: 'categoryName',
      },
      {
        title: '强制更新',
        dataIndex: 'userName',
        align: 'left',
      },
      {
        title: '下载地址',
        dataIndex: 'createdText',
      },
      {
        title: '操作系统',
        dataIndex: 'count',
      },
      {
        title: '更新时间',
		dataIndex: 'date',
		render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        render: (text,record) => (
          <span>
            <a onClick={() => handleModalVisible(record)}>查看</a>
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
			sortOrder:'v0.1.0',
		    categoryName:"这是一段描述"
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
