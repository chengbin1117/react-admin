import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import createG2 from 'g2-react';
import { Stat } from 'g2';
import Layout from '../components/Layout';
import { Table, Pagination, Card } from 'antd';
import ArticleList from '../components/Log/Article';
import VideoTable from '../components/Index/VideoTable';
import AuditingModal from '../components/Log/AuditingModal';
import ExamineModal from '../components/User/ExamineModal';
import styles from './IndexPage.css';
import { timeFormat, GetRequest } from '../services/common';
import style_pagination from '../components/pagination.css';
function IndexPage({ location, dispatch, user, router, content }) {
	const { AuditVisible, userlist, ExmianVisible, selectList, loading, totalNumber } = user;
	//const {ArticleList}=content
	//console.log(content.ArticleList);
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}

	const ExamineModalProps = {
		visible: ExmianVisible,
		selectList,
		onCancel() {
			dispatch({
				type: "user/hideExmianModal"
			})
		},
		onOk(data, id) {
			if (data.radio == "1") {
				dispatch({
					type: 'user/auditUser',
					payload: {
						userId: id,
						auditStatus: parseInt(data.radio),
						auditUserId: merId,
						audit: 0,
						search: location.search
					}
				})
			} else {
				dispatch({
					type: 'user/auditUser',
					payload: {
						userId: id,
						auditStatus: parseInt(data.radio),
						auditUserId: merId,
						refuseReason: data.text,
						audit: 0,
						search: location.search
					}
				})
			}

		}
	}

	function onshowModal(record) {
		dispatch({
			type: "user/showExmianModal",
			payload: {
				selectList: record.userId
			}
		})
	}
	function toDatg(record) {
		dispatch(routerRedux.push('/user/user_data?userId=' + record.userId))
	}
	const columns = [{
		title: '用户ID',
		dataIndex: 'userId',
		key: 'userId',
		width: 120,
	}, {
		title: '用户名',
		dataIndex: 'userName',
		key: 'userName',
		width: 120,
	}, {
		title: '邮箱',
		dataIndex: 'userEmail',
		key: 'userEmail',
		width: 120,
	}, {
		title: '手机号',
		dataIndex: 'userMobile',
		key: 'userMobile',
		width: 120,
	}, {
		title: '注册时间',
		dataIndex: 'createDate',
		key: 'createDate',
		width: 120,
	}, {
		title: '角色',
		dataIndex: 'userRoleDisplay',
		key: 'userRoleDisplay',
		width: 120,
	}, {
		title: '提交申请时间',
		dataIndex: 'applyColumnTime',
		key: 'applyColumnTime',
		width: 120,
	}, {
		title: '审核状态',
		dataIndex: 'auditStatusDisplay',
		key: 'auditStatusDisplay',
		width: 120,
	}, {
		title: '操作',
		dataIndex: 'action',
		key: 'action',
		width: 120,
		render: (text, record, i) => {
			return (
				<div>
					<a onClick={() => toDatg(record)} style={{ marginRight: 10 + "px" }}>查看</a>
				</div>
			)
		}
	},];
	/*const pagination = {
		total: totalNumber,
		showSizeChanger: true,
		pageSize: 25,
	 
		onShowSizeChange: (current, pageSize) => {
			console.log('Current: ', current, '; PageSize: ', pageSize);
		},
		onChange: (current) => {
			console.log('Current: ', current);
		},
	};*/


	const AuditingModalProps = {
		visible: content.AuditVisible,
		selectList: content.selectList,
		ColumnList: content.ColumnList,
		typeNews:content.typeNews,
		dispatch:dispatch,
		pubStatus:content.pubStatus,
		confirmLoading: content.confirmLoading,
		onCancel: function () {
			dispatch({
				type: 'content/hideModal',

			});
			dispatch({
				type:'content/publishStatusChange',
				payload:{
					pubStatus: '1'
				}
			})
		},
		onOk(data, selectList){
			if(data.radio == 3) {
				dispatch({
					type:'content/batchRevie',
					payload:{
						articleIds:selectList.join(','),
						ifPlatformPublishAward:parseInt(data.isarward),
						auditUser:localStorage.getItem('userId'),
						publicStatus:parseInt(data.radio),
						refuseReason:data.reasons
					}
				})
			}else {
				dispatch({
					type:'content/batchRevie',
					payload:{
						articleIds:selectList.join(','),
						ifPlatformPublishAward:parseInt(data.isarward),
						auditUser:localStorage.getItem('userId'),
						publicStatus:parseInt(data.radio),
						columnId: data.columnarticle[0],
						secondColumn: data.columnarticle[1]
					}
				})
			}


		}
	}

	const ArticleListProps = {
		data: content.ArticleList,
		loading: content.loading,
		total: content.ArticleListNumber,
		onEditItem: function (record) {
			dispatch({
				type: "content/getArticleDetile",
				payload: {
					articleId: record.articleId,
				}
			})
			//dispatch(routerRedux.push('/index/editor?articleId='+record.articleId))
			// dispatch({
			// 	type: 'content/showModal',
			// 	payload: {
			// 		selectList: record
			// 	}
			// });
		},
		onPreview(record) {
			console.log(record)
			window.open('/#/articlePreview?articleId=' + record.articleId)
			//dispatch(routerRedux.push('/articlePreview?articleId='+record.articleId))
		},
		batchAudit(Ids) {
			dispatch({
				type:'content/showModal',
				payload: {
					selectList:Ids,
					typeNews:'article'
				}
			})
		}

	}

	//待审核的视频
	const VideoTableProps = {
		data: content.VideoList,
		loading: content.loading,
		total: content.VideoListNumber,
		onEditItem: function (record) {
			const search = GetRequest(location.search);
			dispatch(routerRedux.push('/content/EditorVideo?articleId=' + record.articleId
			))
		
		},
		onPreview(record) {
			console.log(record)
			window.open('/#/articlePreview?articleId=' + record.articleId)
			//dispatch(routerRedux.push('/articlePreview?articleId='+record.articleId))
		},
		batchAudit(Ids) {
			console.log(Ids)
			dispatch({
				type:'content/showModal',
				payload: {
					selectList:Ids,
					typeNews:'video'
				}
			})
		}

	}
	function onChange(page) {
		console.log(page)
	}
	return (
		<div>
			<Card title="待审核的专栏用户" extra={<Link to={{
				pathname: "/user/user_admin",
				query: { page: 1 }
			}} className={styles.allUser}>查看全部用户</Link>}
				hoverable={true}
			>
				<Table bordered rowKey={record => record.userId} columns={columns} pagination={false} dataSource={userlist} loading={loading} />
				<ExamineModal {...ExamineModalProps} />
			</Card>
			<VideoTable {...VideoTableProps} />
		    <AuditingModal {...AuditingModalProps} />
			<ArticleList {...ArticleListProps} />
			<AuditingModal {...AuditingModalProps} />
		</div>

	);
}

IndexPage.propTypes = {

};

function mapStateToProps({
	user, content
}) {
	return {
		user, content
	};
}



export default connect(mapStateToProps)(withRouter(IndexPage));