import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import {
	withRouter,
	browserHistory,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import Content_Opinion from '../components/Content/Content_Opinion';

function ContentOpinion({dispatch,content,router}) {

	const {FeedbackList,Listtotal} = content;
	const Content_OpinionProps ={
		data:FeedbackList,
		total:Listtotal,
		confirm(record){
			dispatch({
				type:'content/deleteFeedback',
				payload:{
					feedbackId:record.id
				}
			})
		},
		handlsearch(values){
			console.log(values)
			if(values.time!=undefined){
				dispatch({
					type:"content/getFeedbackList",
					payload:{
						content:values.content,
						startDate:new Date(values.time[0]).toLocaleDateString().split('/').join('-'),
						endDate:new Date(values.time[1]).toLocaleDateString().split('/').join('-'),
						status:values.status =="true"?true:false
					}
				})
			}else{
				dispatch({
					type:"content/getFeedbackList",
					payload:{
						content:values.content,
						status:values.status =="true"?true:false,
					}
				})
			}
        },
        delFeeks(list){
        	var Ids ="";
        	for (var i in list){
        		Ids +=list[i].id+","
        	}
        	dispatch({
        		type:"content/deleteFeedback",
        		payload:{
        			feedbackId:Ids
        		}
        	})
        },
        onEditor(record){
        	localStorage.setItem('kg_opinionEditor',JSON.stringify(record));
        	router.push('/content/content_opinion/'+record.id)
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