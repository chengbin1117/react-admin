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
import { message,Modal,Cascader,Form,Input,Select,Row, Col,Button } from 'antd';
import LayoutContainer from '../components/Layout';
import Content_Image from '../components/Content/Content_Image';
import Content_ImageAdd_Modal from '../components/Content/Content_ImageAdd_Modal';
import Content_ImageEditor_Modal from '../components/Content/Content_ImageEditor_Modal';
import ImgShowModal from '../components/Content/ImgShowModal';
import {GetRequest,residences} from '../services/common';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
const FormItem = Form.Item;
const Option = Select.Option;
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
		confirm(record) {
			dispatch({
				type:"content/deleteImage",
				payload:{
					imageId:record.imageId,
					search:location.search
				}
			})
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
							imageAddress:value.imageAddress,
							search:location.search
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
						search:location.search
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
			//console.log(value,text,id)
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
							imageAddress:value.imageAddress,
							search:location.search
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
							search:location.search
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

	function getFieldsFirst(getFieldDecorator,formItemLayout){
			const children = [];
	    	children.push(
		    	<div key="0">
			        <Col md={8} sm={24} style = {{display:'block'}}>
				           <FormItem
					          {...formItemLayout}
					          label="显示位置"
					        >
					          {getFieldDecorator('residence', {
					          
					            rules: [{ type: 'array', required: false, message: '请选择!' }],
					          })(
					            <Cascader options={residences}placeholder="请选择" />
					          )}
					        </FormItem>
				        </Col>
			            <Col md={8} sm={24} style = {{display:'block'}}>
			            <FormItem {...formItemLayout} label='类型'>
			            {getFieldDecorator('type',{
			            	
			            	})(
			              <Select placeholder="请选择">
			               
			              	<Option value="1">资讯</Option>
			              	<Option value="2">广告</Option>
			              	<Option value="3">其他</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
			     
		        </div>
	      	);
	   		return children;
	}
	function getFields(getFieldDecorator,formItemLayout){
			const children = [];
	    	children.push(
		    	<div key="0">
			        <Col md={8} sm={24} style = {{display:'block'}}>
				           <FormItem
					          {...formItemLayout}
					          label="显示位置"
					        >
					          {getFieldDecorator('residence', {
					          
					            rules: [{ type: 'array', required: false, message: '请选择!' }],
					          })(
					            <Cascader options={residences}placeholder="请选择" />
					          )}
					        </FormItem>
				        </Col>
			            <Col md={8} sm={24} style = {{display:'block'}}>
			            <FormItem {...formItemLayout} label='类型'>
			            {getFieldDecorator('type',{
			            	
			            	})(
			              <Select placeholder="请选择">
			               
			              	<Option value="1">资讯</Option>
			              	<Option value="2">广告</Option>
			              	<Option value="3">其他</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
			        <Col md={8} sm={24} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='显示状态'>
			            {getFieldDecorator('showStatus',{
			            	
			            	})(
			               <Select placeholder="请选择">
			               
			              	<Option value="1">显示</Option>
			              	<Option value="0">隐藏</Option>
			              </Select>
			            )}
			          </FormItem>
			        </Col>
		        </div>
	      	);
	   		return children;
	}

	function handlsearch(values){
			if(values.residence!=undefined){
			
			dispatch(routerRedux.push('/content/content_image?page=1'+"&imageType="+values.type+
				"&imageStatus="+values.showStatus+"&navigatorPos="+values.residence[0]+"&imagePos="+values.residence[1]

				))

			}else{
				dispatch(routerRedux.push('/content/content_image?page=1'+"&imageType="+values.type+
				"&imageStatus="+values.showStatus

				))
			}
    }
    //添加图片
    function showModal(){
			dispatch({
				type:'content/showAddImgModal',
				payload:{
					type:"creat"
				}
			})
    }
	return (
			<div >
				<Button type="primary" size = 'large' onClick={showModal} style = {{marginBottom:20}}>添加图片</Button>
			    <WrappedAdvancedSearchForm  style = {{margin:0}} getFields = {getFields} getFieldsFirst = {getFieldsFirst} handlsearch ={handlsearch}/>
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