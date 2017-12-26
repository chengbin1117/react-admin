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
import Content_Opinion_Show from '../components/Content/Content_Opinion_Show';



function ContentOpinionShow({dispatch,content}) {
	const {FeedbackList} = content;
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const Content_Opinion_ShowProps ={
		data:FeedbackList,
		onFeekOk(id,text){
			dispatch({
				type:'content/replay',
				payload:{
					feedbackId:id,
					replayInfo:text,
				}
			})
		}
	}
	
	return (
			<div >
				<Content_Opinion_Show {...Content_Opinion_ShowProps}/>
			</div>

	);
}

ContentOpinionShow.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentOpinionShow));