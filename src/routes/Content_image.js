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
import { message,Modal } from 'antd';
import LayoutContainer from '../components/Layout';
import Content_Image from '../components/Content/Content_Image';
import Content_ImageAdd_Modal from '../components/Content/Content_ImageAdd_Modal';
import Content_ImageEditor_Modal from '../components/Content/Content_ImageEditor_Modal';


function ContentImage({dispatch,content}) {
	let  userId = localStorage.getItem('userId')
	const {ImageList,addImageVisible,loading,currentItem,type,currentPage,totalNumber,EditorImageVisible} = content;
	
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
				type:"content/showEditorImageModal",
				payload:{
					currentItem:record,
				}
			})
		},
		setStatus(selectlist){
			//console.log(selectlist)
			var Ids = "";
			for(var i in selectlist){
				if(selectlist[i].imageStatus==false){
					Ids += selectlist[i].imageId+','
				}
				
			}

			Modal.confirm({
				title:"是否批量设置成显示状态",
				onOk(){
					if(Ids==""){
				message.warn('全部都为显示状态')
					}else{
						dispatch({
							type:'content/ImageSetStatus',
							payload:{
								ids:Ids,
								updateUser:parseInt(userId),
							}
						})
					}
				}
			})
			
		},
		changepage(page){
				dispatch(routerRedux.push('/content/content_image?page='+page))
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
			console.log(value,text)
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
							imageAddress:value.imageAddress
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
							iimage_order:parseInt(value.sort),
						}
					})
				}

			}
		}

	}
	const Content_ImageEditor_ModalProps ={
		visible:EditorImageVisible,
		item:currentItem,
		onCancel(){
			dispatch({
				type:'content/hideEditorImageModal'
			})
		},

		onCheckOk(value,text,id){
			console.log(value,text,id)
			if(value.type == "1"){
				if(text= ""){
					message.warn('请输入文章ID')
				}else{

					dispatch({
						type:"content/addImage",
						payload:{
							imageId:id,
							imageType:parseInt(value.type),
							imageDetail:text,
							navigatorPos:parseInt(value.residence[0]),
							imagePos:parseInt(value.residence[1]),
							imageStatus:parseInt(value.showStatus),
							createUser:userId,
							image_order:parseInt(value.sort),
							imageAddress:value.imageAddress
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
							imageId:id,
							imageAddress:value.imageAddress,
							imageType:parseInt(value.type),
							imageDetail:text,
							navigatorPos:parseInt(value.residence[0]),
							imagePos:parseInt(value.residence[1]),
							imageStatus:parseInt(value.showStatus),
							createUser:userId,
							iimage_order:parseInt(value.sort),
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
				<Content_ImageEditor_Modal {...Content_ImageEditor_ModalProps}/>
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