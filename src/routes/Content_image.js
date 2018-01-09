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
import ImgShowModal from '../components/Content/ImgShowModal';
import {GetRequest} from '../services/common'

function ContentImage({dispatch,content,location}) {
	let  userId = localStorage.getItem('userId');
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {selectList,ImageList,ImgShowVisible,addImageVisible,loading,currentItem,type,currentPage,totalNumber,EditorImageVisible} = content;
	
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
				/*dispatch({
					type:"content/siteimagelist",
					payload:{
						imageType:parseInt(values.type),
						imageStatus:parseInt(values.showStatus),
						navigatorPos:parseInt(values.residence[0]),
						imagePos:parseInt(values.residence[1]),
						pageSize:25,

					}
			   })*/
			dispatch(routerRedux.push('/content/content_image?page=1'+"&imageType="+values.type+
				"&imageStatus="+values.showStatus+"&navigatorPos="+values.residence[0]+"&imagePos="+values.residence[1]

				))

			}else{
				/*dispatch({
					type:"content/siteimagelist",
					payload:{
						imageType:parseInt(values.type),
						imageStatus:parseInt(values.showStatus),
						pageSize:25,
					}
			   })*/
				dispatch(routerRedux.push('/content/content_image?page=1'+"&imageType="+values.type+
				"&imageStatus="+values.showStatus

				))
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
					Ids += selectlist[i].imageId+','
			}
			dispatch({
				type:"content/showImageModal",
				payload:{
					selectList:Ids
				}
			})

			/*Modal.confirm({
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
								imageStatus:true
							}
						})
					}
				}
			})*/
			
		},
		changepage(page){
			const search =GetRequest(location.search);
		    dispatch(routerRedux.push('/content/content_image?page='+page+
		    	"&imageType="+search.imageType+"&imageStatus="+search.imageStatus+"&navigatorPos="+search.navigatorPos+
		    	"&imagePos="+search.imagePos
		    	))
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

		onCheckOk(value){
			//console.log(value.type)
			if(value.imgtype == "1"){
					dispatch({
						type:"content/addImage",
						payload:{
							imageType:parseInt(value.imgtype),
							imageDetail:value.imageDetail,
							navigatorPos:parseInt(value.residence[0]),
							imagePos:parseInt(value.residence[1]),
							imageStatus:parseInt(value.showStatus),
							createUser:userId,
							imageOrder:parseInt(value.sort),
							imageAddress:value.imageAddress
						}
					})
			}else{
				dispatch({
					type:"content/addImage",
					payload:{
						imageAddress:value.imageAddress,
						imageType:parseInt(value.imgtype),
						imageDetail:value.imageDetail,
						navigatorPos:parseInt(value.residence[0]),
						imagePos:parseInt(value.residence[1]),
						imageStatus:parseInt(value.showStatus),
						createUser:userId,
						imageOrder:parseInt(value.sort),
					}
				})
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
					dispatch({
						type:"content/addImage",
						payload:{
							imageId:id,
							imageType:parseInt(value.type),
							imageDetail:value.imageDetail,
							navigatorPos:parseInt(value.residence[0]),
							imagePos:parseInt(value.residence[1]),
							imageStatus:parseInt(value.showStatus),
							createUser:userId,
							imageOrder:parseInt(value.sort),
							imageAddress:value.imageAddress
						}
					})
			}else{
			    dispatch({
						type:"content/addImage",
						payload:{
							imageId:id,
							imageAddress:value.imageAddress,
							imageType:parseInt(value.type),
							imageDetail:value.imageDetail,
							navigatorPos:parseInt(value.residence[0]),
							imagePos:parseInt(value.residence[1]),
							imageStatus:parseInt(value.showStatus),
							createUser:userId,
							imageOrder:parseInt(value.sort),
						}
					})
			}
		}
	}
	const ImgShowModalProps ={
		visible:ImgShowVisible,
		selectList,
		onCancel(){
			dispatch({
				type:"content/hideImageModal",
			})
		},
		onOk(ids,data){
			dispatch({
				type:'content/ImageSetStatus',
				payload:{
					ids:ids,
					updateUser:parseInt(userId),
					imageStatus:data.radio=="1"?true:false
				}
			})
		}
	}
	return (
			<div >
				<Content_Image {...content_imageProps}/>
				<Content_ImageAdd_Modal {...Content_ImageAdd_ModalProps}/>
				<Content_ImageEditor_Modal {...Content_ImageEditor_ModalProps}/>
				<ImgShowModal {...ImgShowModalProps}/>
			</div>

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