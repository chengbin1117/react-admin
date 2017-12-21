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
import Content_Column from '../components/Content/Content_Column';
import Content_ColumnAdd_Modal from '../components/Content/Content_ColumnAdd_Modal';
import { message } from 'antd';
function ContentColumn({dispatch,content,router}){

	const {ColumnAddVisbile,CList,current,type,loading} =content;
	
	const Content_ColumnProps ={
		data:CList,
		loading,
		addColumn(){
			dispatch({
				type:"content/showColumnAddModal",
				payload:{
					type:'create'
				}
			})
		},
		editor(record){
			dispatch({
				type:"content/showColumnAddModal",
				payload:{
					type:'update',
					current:record
				}
			})
		},
		addChildColumn(record){
			console.log(1)
			dispatch({
				type:"content/showColumnAddModal",
				payload:{
					type:'addchild',
					current:record
				}
			})
		},
		confirm(record){
			console.log(record)
			if(record.articleCount ==0){
				dispatch({
					type:"content/deleteColumn",
					payload:{
						columnId:record.id
					}
			    })
			}else{
				message.error('有文章不能刪除！')
				
			}
			
		},
		handleChange(record,text){
			console.log(record,text)
			dispatch({
				type:"content/addColumn",
				payload:{
					columnId:parseInt(record.id),
					navigatorDisplay:parseInt(text),
					parentId:parseInt(record.parentId),
				}
			})
		},
		fixName(record,e){
				
			//console.log(record,e.target.value)
			dispatch({
				type:"content/addColumn",
				payload:{
					columnId:parseInt(record.id),
					name:e.target.value,
					parentId:parseInt(record.parentId),
				}
			})
		},
		fix(record,e){
			  // /console.log(record,e)
			  dispatch({
				type:"content/addColumn",
				payload:{
					columnId:parseInt(record.id),
					name:e.target.value,
					parentId:parseInt(record.parentId),
				}
			})
		}
	}

	const Content_ColumnAdd_ModalProps ={
		visible:ColumnAddVisbile,
		type,
		item:current,
		onCancel(){
			dispatch({
				type:"content/hideColumnAddModal"
			})
		},
		onOk(data){
			console.log(data)

			if(data.id!=undefined){
				dispatch({
				type:"content/addColumn",
				payload:{
					columnId:parseInt(data.id),
					parentId:parseInt(data.parentId),
					name:data.name,
					navigatorDisplay:parseInt(data.navigatorDisplay),
					displayStatus:data.displayStatus=="public"?true:false,
					order:parseInt(data.order),
					displayMode:data.displayMode =="public"?1:2,
					title:data.title,
					keyword:data.keyword,
					description:data.description
				}
			})
			}else{
				dispatch({
				type:"content/addColumn",
				payload:{
					parentId:parseInt(data.parentId),
					name:data.name,
					navigatorDisplay:parseInt(data.navigatorDisplay),
					displayStatus:data.displayStatus=="public"?true:false,
					order:parseInt(data.order),
					displayMode:data.displayMode =="public"?1:2,
					title:data.title,
					keyword:data.keyword,
					description:data.description
				}
			})
			}
			/**/
		}

	}
	return (
			<LayoutContainer >
				<Content_Column {...Content_ColumnProps}/>
				<Content_ColumnAdd_Modal {...Content_ColumnAdd_ModalProps}/>
			</LayoutContainer>

	);
}

ContentColumn.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentColumn));