import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import styles from './AboutUs.css'
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';

import { Button,Modal} from 'antd';

import ArticleList from '../components/Setting/ArticleList';
const confirm = Modal.confirm;


let userId =localStorage.getItem("userId");
function AboutUs({dispatch,router,setting}) {
	const {BaseInfoList} =setting
	
	const ArticleListProps = {
		BaseInfoList,
		onEditItem:function(record){
			localStorage.setItem('kg_aboutEditor',JSON.stringify(record));
			router.push('setting/addinfoEditor?id='+record.id)
		},
		handleDel(record){
			dispatch({
				type:'setting/deleteBaseinfo',
				payload:{
					id:record.id,
				}
			})
		},
		handeShow(record){
				confirm({
				    title: record.infoStatus ==true?'是否设置成隐藏?':'是否设置成显示?',
				    onOk() {
				      dispatch({
				      	type:'setting/setInfoStatus',
				      	payload:{
				      		id:parseInt(record.id),
				      		updateUser:parseInt(userId),
				      	}
				      })
				    },
				    onCancel() {
				      console.log('Cancel');
				    },
				  });
				}
	}
	function addInfo (){
		
		router.push('setting/addinfo')
	}
	return (
			<LayoutContainer className={styles.Indexbox}>
				<div className={styles.addbtn}><Button type="primary" size="large" onClick={()=>addInfo()}>添加信息</Button></div>				
				<ArticleList {...ArticleListProps}/>
				
			</LayoutContainer>

	);
}

AboutUs.propTypes = {

};

function mapStateToProps({
	setting
}) {
	return {
		setting
	};
}



export default connect(mapStateToProps)(withRouter(AboutUs));