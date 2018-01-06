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
import { Modal,message} from 'antd';
import LayoutContainer from '../components/Layout';
import Content_Comment from '../components/Content/Content_Comment';
import Content_CommentSet_Modal from '../components/Content/Content_CommentSet_Modal';
import Content_CommentSetShow_Modal from '../components/Content/Content_CommentSetShow_Modal';
import ExamineModal from '../components/Content/ExamineModal';
import {timeFormat,GetRequest} from '../services/common';

function ContentComment({location,dispatch,router,content}) {
    
    const {CommentList,CommentSetVisible,showSetVisible,selectList,ExamineVisible,loading,totalNumber,currentPage} = content;

	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}

	const Content_CommentProps ={
		data:CommentList,
		loading,
		currentPage,
		total:totalNumber,
		opinionSetModal(){
			dispatch({
				type:"content/showCommentSet"
			})
		},
		showSet(record){
			dispatch({
				type:"content/showSetModal",
				payload:{
					selectList:record.commentId
				}
			})
		},
		confirm(record){
			dispatch({
				type:"content/deleteComment",
				payload:{
					commentId:record.commentId,
					search:location.search
				}
			})
		},
		showSets(selectList){
			console.log(selectList)
			var Ids =""
				for(var i in selectList){
				    Ids +=selectList[i].commentId+","
			}

			dispatch({
				type:"content/showSetModal",
				payload:{
					selectList:Ids
				}
			})
		},
		audit(record){
			dispatch({
				type:"content/showExamineModal",
				payload:{
					selectList:record.commentId
				}

			})
		},
		handlsearch(values){
			if(values.time!=undefined){
				
				dispatch(routerRedux.push('/content/content_comment?page=1'+
					"&content="+values.content+"&status="+values.status+"&startDate="+timeFormat(values.time[0])+
					"&endDate="+timeFormat(values.time[1])+"&displayStatus="+values.displayStatus
					))
			}else{
				dispatch(routerRedux.push('/content/content_comment?page=1'+
					"&content="+values.content+"&status="+values.status+"&displayStatus="+values.displayStatus
				))
				
				
			}
		},
		changepage(page){
			const search =GetRequest(location.search);
			dispatch(routerRedux.push('/content/content_comment?page='+page+
				"&content="+search.content+"&status="+search.status+"&startDate="+search.startDate+
					"&endDate="+search.endDate+"&displayStatus="+search.displayStatus
				))
		}
	}

	//评论设置
	const Content_CommentSet_ModalProps ={
		visible:CommentSetVisible,
		onCancel(){
			dispatch({
				type:"content/hideCommentSet"
			})
		},
		onOk(values){
			//console.log(values)
			dispatch({
				type:"content/commentSet",
				payload:{
					commentSet:values.set == "public"?true:false,
				}
			})
		}

	}

	//显示设置
	const Content_CommentSetShow_ModalProps ={
		visible:showSetVisible,
		selectList,
		onOk(values,selectList){
			console.log(selectList)
			dispatch({
				type:"content/setcommentStatus",
				payload:{
					commentIds:String(selectList),
					displayStatus:values.set =="public"?true:false,
					search:location.search,
				}
			})
		},
		onCancel(){
			dispatch({
				type:"content/hideSetModal"
			})
		},

	}

	//审核
	const ExamineModalProps = {
		visible:ExamineVisible,
		selectList,
		onCancel(){
			dispatch({
				type:"content/hideExamineModal",
			})
		},
		onOk(data,record){
			console.log(record)
			if(data.radio =="1"){
				dispatch({
					type:'content/auditComment',
					payload:{
						commentId:record,
						status:parseInt(data.radio),
						search:location.search
					}
				})
			}else{

				dispatch({
					type:'content/auditComment',
					payload:{
						commentId:record,
						status:parseInt(data.radio),
						refuseReason:data.text,
						search:location.search
					}
				})
				
			
		    }
	    }
	}
	return (
			<div >
				<Content_Comment {...Content_CommentProps}/>
				<Content_CommentSet_Modal {...Content_CommentSet_ModalProps}/>
				<Content_CommentSetShow_Modal {...Content_CommentSetShow_ModalProps} />
				<ExamineModal {...ExamineModalProps}/>
			</div>

	);
}

ContentComment.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentComment));