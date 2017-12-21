import React, {
  Component,
  PropTypes
} from 'react';
import {
  Link
} from 'dva/router';
import {
  Table,
  Icon,
  Switch,
  Pagination,
  Popconfirm 
} from 'antd';

/*import styles from './purchaseList.css'*/


function UserList({
  loading,
  total,
  current,
  data,
  onSetItem,
  setStatus,
  reseatPaw,
  onEditItem,
  setKgUser
}) {

  const columns = [{
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    width: 100,
  }, {
    title: '手机号',
    dataIndex: 'mobile',
    key: 'mobile',
    width: 120,
  }, {
    title: '岗位',
    dataIndex: 'postName',
    key: 'postName',
    width: 120,
  }, {title: '添加时间',
    dataIndex: 'createDate',
    key: 'createDate',
    width: 120,
  }, {title: '关联前台账号',
    dataIndex: 'kgUsername',
    key: 'kgUsername',
    width: 120,
  }, {title: '账号状态',
    dataIndex: 'statusDisplay',
    key: 'statusDisplay',
    width: 120,
  }, {title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (text, record, i) => {
			return (
				<div>
              <a data-key={i}  style = {{marginRight:10}} onClick={() => onEditItem(record)}>编辑</a>
              <a data-key={i}  style = {{marginRight:10}} onClick={() => setStatus(record)}>{record.status ==0?"启用":'禁用'}</a>
              <a data-key={i}  style = {{marginRight:10}} onClick={() => reseatPaw(record)}>重置密码</a>
              <a data-key={i}  style = {{marginRight:10}} onClick={() => setKgUser(record)}>关联前台账号</a>
        </div>
			)
		}
  },];
  const pagination = {
    total: 10,
    showSizeChanger: true,
    pageSize: 15,
    pageSizeOptions: ['15', '30', '45', '60'],
    onShowSizeChange: (current, pageSize) => {
      console.log('Current: ', current, '; PageSize: ', pageSize);
    },
    onChange: (current) => {
      console.log('Current: ', current);
    },
  };

  return (
    <Table bordered rowKey={record => record.id+''} columns={columns}  dataSource={data} pagination={false} />
  )
}

UserList.propTypes = {
  onPageChange: PropTypes.func,
  loading: PropTypes.any,
};

export default UserList;