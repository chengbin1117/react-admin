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
import LayoutContainer from '../components/Layout';
import Content_Opinion from '../components/Content/Content_Opinion';
import { Modal,message,Row,Col} from 'antd';
import {timeFormat,uploadUrl,GetRequest} from '../services/common';
function ContentOpinion({dispatch,content,router,location}) {
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {FeedbackList,totalNumber,currentPage,loading} = content;
	const Content_OpinionProps ={
		data:FeedbackList,
		total:totalNumber,
		currentPage:currentPage,
		loading:loading,
		confirm(record){
			dispatch({
				type:'content/deleteFeedback',
				payload:{
					feedbackId:record.id,
					search:location.search
				}
			})
		},
		handlsearch(values){
			//console.log(values)
			if(values.time!=undefined){

				if(values.status==undefined){
					// dispatch({
					// type:"content/getFeedbackList",
					// 	payload:{
					// 		content:values.content,
					// 		startDate:timeFormat(values.time[0]),
					// 		endDate:timeFormat(values.time[1]),
					// 	}
				    // })
				dispatch(routerRedux.push('/content/content_opinion?page=1'+
				'&content='+values.content+'&startDate='+timeFormat(values.time[0])+
				'&endDate='+timeFormat(values.time[1])
			    ))
				}else{

				// 	dispatch({
				// 	type:"content/getFeedbackList",
				// 	payload:{
				// 		content:values.content,
				// 		startDate:timeFormat(values.time[0]),
				// 		endDate:timeFormat(values.time[1]),
				// 		status:values.status =="true"?true:false
				// 	}
				// })
				dispatch(routerRedux.push('/content/content_opinion?page=1'+
				'&content='+values.content+'&startDate='+timeFormat(values.time[0])+
				'&endDate='+timeFormat(values.time[1])+'&status='+values.status
			    ))
				}
				
			}else{
				if(values.status==undefined){
				// 	dispatch({
				// 	type:"content/getFeedbackList",
				// 	payload:{
				// 		content:values.content,
						
				// 	}
				// })
				dispatch(routerRedux.push('/content/content_opinion?page=1'+
				'&content='+values.content
			    ))
				}else{
				// 	dispatch({
				// 	type:"content/getFeedbackList",
				// 	payload:{
				// 		content:values.content,
				// 		status:values.status =="true"?true:false,
				// 	}
				// })
				dispatch(routerRedux.push('/content/content_opinion?page=1'+
				'&content='+values.content+'&status='+values.status
			    ))
				}

				
			}
        },
        delFeeks(list){
        	var Ids =[];
        	for (var i in list){
        		Ids.push(list[i].id)
        	}
        	var FeeksIds = Ids.join(',')
        	//console.log(FeeksIds)
        	Modal.confirm({
        		"title":"是否批量删除",
        		onOk(){
        			dispatch({
		        		type:"content/deleteFeedback",
		        		payload:{
		        			feedbackId:FeeksIds,
		        			search:location.search
		        		}
		        	})
        		}
        	})
        	
        },
        onEditor(record){
        	localStorage.setItem('kg_opinionEditor',JSON.stringify(record));
        	dispatch(routerRedux.push('/content/opinion?id='+record.id))
        },
        changepage(page){
			const search =GetRequest(location.search);
			dispatch(routerRedux.push('/content/content_opinion?page='+page+
			'&content='+search.content+'&status='+search.status+'&startDate='+search.startDate+
			'&endDate='+search.endDate
		))
        }
	}

	return (
			<div >
				<Content_Opinion {...Content_OpinionProps}/>
			</div>

	);
}

ContentOpinion.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentOpinion));