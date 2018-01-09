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
import style_pagination from '../pagination.css';
/*import styles from './purchaseList.css'*/


function UserList({
  loading,
  total,
  currentPage,
  data,
  onSetItem,
  setStatus,
  reseatPaw,
  onEditItem,
  setKgUser,
  capage,
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

  return (
    <div style={{paddingBottom:50}}>
    <Table bordered rowKey={record => record.id+''} columns={columns}  dataSource={data} pagination={false} loading={loading} locale={{emptyText:"暂无数据"}}/>
    <Pagination className = {style_pagination.pagination} showQuickJumper  current={currentPage} onShowSizeChange={capage} total={total} onChange={capage} pageSize={25} />
    </div>
  )
}

UserList.propTypes = {
  onPageChange: PropTypes.func,
  loading: PropTypes.any,
};

export default UserList;