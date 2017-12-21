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
import { message} from 'antd';
import LayoutContainer from '../components/Layout';
import Content_Image from '../components/Content/Content_Image';
import Content_ImageAdd_Modal from '../components/Content/Content_ImageAdd_Modal'

function ContentImage({dispatch,content}) {
	let  userId = localStorage.getItem('userId')
	const {ImageList,addImageVisible,loading,currentItem,type,currentPage,totalNumber} = content;
	
	const content_imageProps ={
		data:ImageList,
		loading,
		total:totalNumber,
		currentPage,
		showModal(){
			dispatch({
				type:'content/showAddImgModal',
				payload:{
					type:"creat"
				}
			})
		},
		confirm(record) {
			dispatch({
				type:"content/deleteImage",
				payload:{
					imageId:record.imageId
				}
			})
		},
		handlsearch(values){
			console.log(values)
			if(values.residence!=undefined){
				dispatch({
					type:"content/siteimagelist",
					payload:{
						image_type:parseInt(values.type),
						image_status:parseInt(values.showStatus),
						navigator_pos:parseInt(values.residence[0]),
						image_pos:parseInt(values.residence[1])
					}
			   })
			}else{
				dispatch({
					type:"content/siteimagelist",
					payload:{
						image_type:parseInt(values.type),
						image_status:parseInt(values.showStatus),
					}
			   })
			}
			
		},
		editorItem(record){
			dispatch({
				type:"content/showAddImgModal",
				payload:{
					currentItem:record,
					type:"update"
				}
			})
		},
		setStatus(selectlist){
			//console.log(selectlist)
			var Ids = "";
			for(var i in selectlist){

				Ids += selectlist[i].imageId+','
			}
			
			dispatch({
				type:'content/ImageSetStatus',
				payload:{
					ids:Ids,
					updateUser:parseInt(userId),
				}
			})
		}

	}


	const Content_ImageAdd_ModalProps ={
		visible:addImageVisible,
		currentItem,
		type:type,
		onCancel(){
			dispatch({
				type:'content/hideAddImgModal'
			})
		},

		onCheckOk(value,text){
			console.log(value)
			if(value.type == "1"){
				if(text= ""){
					message.warn('请输入文章ID')
				}else{

					dispatch({
						type:"content/addImage",
						payload:{
							imageType:parseInt(value.type),
							imageDetail:text,
							navigatorPos:parseInt(value.residence[0]),
							imagePos:parseInt(value.residence[1]),
							imageStatus:parseInt(value.showStatus),
							createUser:userId,
							image_order:parseInt(value.sort),
							imageAddress:'www.baidu.com'
						}
					})
				}
			}else{
				if(text= ""){
					message.warn('请输入链接')
				}else{
					dispatch({
						type:"content/addImage",
						payload:{
							imageAddress:value.imageAddress,
							imageType:parseInt(value.type),
							imageDetail:text,
							navigatorPos:parseInt(value.residence[0]),
							imagePos:parseInt(value.residence[1]),
							imageStatus:parseInt(value.showStatus),
							createUser:userId,
							imageAddress:'www.baidu.com'
						}
					})
				}

			}
		}

	}
	return (
			<LayoutContainer >
				<Content_Image {...content_imageProps}/>
				<Content_ImageAdd_Modal {...Content_ImageAdd_ModalProps}/>
			</LayoutContainer>

	);
}

ContentImage.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentImage));