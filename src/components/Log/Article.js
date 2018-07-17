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
  Divider,
  Badge,
  Button,
  Card
} from 'antd';
import style_pagination from '../pagination.css'
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
  onPreview,
  batchAudit
}) {

  //console.log("total",total)
  const columns = [{
    title: '文章ID',
    dataIndex: 'articleId',
    key: 'articleId',
  }, {
    title: '标题',
    dataIndex: 'articleTitle',
    key: 'articleTitle',
  }, {
    title: '发布人',
    dataIndex: 'createUser',
    key: 'createUser',
  }, {title: '发布时间',
    dataIndex: 'createDate',
    key: 'createDate',
  }, {title: '审核状态',
    dataIndex: 'publishStatusDisplay',
    render:(text,record)=>{
      return(
        <span> <Badge status="processing" text="审核中" /></span>
      )
    },
  }, {title: '操作',
    dataIndex: 'action',
    key: 'action',
    render: (text, record, i) => {
			return (
				<div>
              <a data-key={i} onClick={() => onEditItem(record)}>编辑</a>
            </div>
			)
		}
  },];

  class App extends React.Component {
		state = {
			selectedRowKeys: [], // Check here to configure the default column

		};
		onSelectChange = (selectedRowKeys, selectedRows) => {
			// console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
			this.setState({
				selectedRowKeys: selectedRowKeys,
				selectedRows: selectedRows
			});
		}
		render() {
			const { selectedRowKeys, selectedRows } = this.state;
			const rowSelection = {
				selectedRowKeys,
				onChange: this.onSelectChange,
			};
			const hasSelected = selectedRowKeys.length > 0;
			return (
				<Card title={<span><span>待审核文章</span><Button type="primary" disabled = {!hasSelected} style={{marginLeft:30}} onClick={()=>batchAudit(selectedRowKeys)}>批量审核</Button></span>}
				hoverable={true}
				extra={<Link to="/content/content_article?page=1">查看全部文章</Link>} style={{ marginTop: "100px" }}>
          
					<Table  rowSelection={rowSelection} rowKey={record => record.articleId}  columns={columns}  dataSource={data} pagination={false} loading={loading}/>
				</Card>
			);
		}
	}
  return (
    <div>
      <App />
    </div>
  )
}

ArticleList.propTypes = {
  onPageChange: PropTypes.func,
  loading: PropTypes.any,
};

export default ArticleList;