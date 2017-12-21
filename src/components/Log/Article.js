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
  Pagination
} from 'antd';

/*import styles from './purchaseList.css'*/


function ArticleList({
  loading,
  total,
  current,
  onPageChange,
  onEditItem,
  onSetItem,
  onToggleItem,
  data,
}) {

  console.log("total",total)
  const columns = [{
    title: '文章ID',
    dataIndex: 'articleId',
    key: 'articleId',
    width: 100,
  }, {
    title: '标题',
    dataIndex: 'articleTitle',
    key: 'articleTitle',
    width: 120,
  }, {
    title: '发布人',
    dataIndex: 'createUser',
    key: 'createUser',
    width: 120,
  }, {title: '发布时间',
    dataIndex: 'createDate',
    key: 'createDate',
    width: 120,
  }, {title: '审核状态',
    dataIndex: 'publishStatusDisplay',
    key: 'publishStatusDisplay',
    width: 120,
  }, {title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (text, record, i) => {
			return (
				<div>
              <a data-key={i} onClick={() => onEditItem(record)} style = {{marginRight:10}}>审核</a>
              
            </div>
			)
		}
  },];
  const pagination = {
    total: total,
    showSizeChanger: true,
    pageSize: 25,
    pageSizeOptions: ['25', '35', '45', '55'],
    onShowSizeChange: (current, pageSize) => {
      console.log('Current: ', current, '; PageSize: ', pageSize);
    },
    onChange: (current) => {
      console.log('Current: ', current);
    },
  };

  return (
    <Table bordered rowKey={record => record.articleId}  columns={columns}  dataSource={data} pagination={pagination} loading={loading}/>
  )
}

ArticleList.propTypes = {
  onPageChange: PropTypes.func,
  loading: PropTypes.any,
};

export default ArticleList;