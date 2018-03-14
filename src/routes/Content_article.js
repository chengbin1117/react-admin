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
import { Modal,message,Row,Col} from 'antd';
import LayoutContainer from '../components/Layout';
import Content_Article from '../components/Content/Content_Article';
import SetModal from '../components/Content/SetShow';
import ArticleModal from '../components/Content/AricleMoadl';
import {formatDate,tokenLogOut,GetRequest,options} from '../services/common';
import BonsModal from '../components/Content/BonsModal';
import  styles from "./Common.css"
function ContentArticle({location,dispatch,router,content}) {
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	//console.log("location",location)
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {ArticleStat,artice,currentArtice,BonsVisible,ArticleList,getBonusList,setshow,articeVisible,selectList,ArticleListNumber,currentPage,ColumnList,loading}=content;
	
	const Content_ArticleProps ={
		dispatch,
		loading,
		ArticleList,
		ColumnList,
		getBonusList,
		total:ArticleListNumber,
		currentPage:currentPage,
		confirm(record){
			
			dispatch({
				type:"content/deleteArticle",
				payload:{
					articleId:record.articleId,
					dispatch,
				}
			})
		},
		setShowModal(record){
			//console.log(record)
			dispatch({
				type:'content/setShowModal',
				payload:{
					selectList:record.articleId
				}
				
			})
		},
		article(selectList) {
			dispatch({
				type:'content/showArticeModal',
				payload:{
					selectList:selectList
				}
				
			})
		},
		onShowMOdal(selectList){
			//console.log(selectList)
			var Ids =""
				for(var i in selectList){
							Ids +=selectList[i].articleId+","
			}
			console.log(Ids)
			dispatch({
				type:'content/setShowModal',
				payload:{
					selectList:Ids
				}
				
			})

		},
		handlsearch:function(values){
				console.log(values)
                	/*dispatch({
				       type: 'content/getArticleList',
				       payload:{
				       	articleId:values.Id,
				       	articleTitle:values.title,
				       	articleTag:values.tags,
				       	publishStatus:parseInt(values.status),
				       	displayStatus:parseInt(values.displayStatus),
				      	columnId:values.cloumn!=undefined?parseInt(values.cloumn[0]):'',
				      	secondColumn:values.cloumn!=undefined?parseInt(values.cloumn[1]):'',
				       }
		            });*/
		            if(values.title!=undefined){
		            	var title =Base64.encode(values.title)
		            	dispatch(routerRedux.push('/content/content_article?page=1'+"&articleId="+values.Id+"&articleTitle="+title+
						"&articleTag="+values.tags+"&publishStatus="+values.status+"&displayStatus="+values.displayStatus+
						"&columnId="+(values.cloumn!=undefined?parseInt(values.cloumn[0]):null)+"&secondColumn="+(values.cloumn!=undefined?parseInt(values.cloumn[1]):null)
						))	
		            }else{
		            	dispatch(routerRedux.push('/content/content_article?page=1'+"&articleId="+values.Id+
						"&articleTag="+values.tags+"&publishStatus="+values.status+"&displayStatus="+values.displayStatus+
						"&columnId="+(values.cloumn!=undefined?parseInt(values.cloumn[0]):null)+"&secondColumn="+(values.cloumn!=undefined?parseInt(values.cloumn[1]):null)
						))
		            }
		            
		},
		editorItem(record){
			//dispatch(routerRedux.push('/content/editor_article?articleId='+record.articleId))
			//window.open('/#/content/editor_article?articleId='+record.articleId);
			dispatch({
				type:"content/getArticleById",
				payload:{
					articleId:record.articleId,
					search:location.search
				}
			})
		},
		changepage(page){
			 const search =GetRequest(location.search);
			 console.log(search)
			 if(search.articleTitle=="undefined"||search.articleTitle==undefined){
			 	dispatch(routerRedux.push('/content/content_article?page='+page+
			 	"&articleId="+search.articleId+"&articleTag="+search.articleTag+"&publishStatus="+search.publishStatus+
				"&displayStatus="+search.displayStatus+"&columnId="+search.columnId+"&displayStatus="+search.displayStatus+"&secondColumn="+search.secondColumn
			 	))
			 }else{
			 	dispatch(routerRedux.push('/content/content_article?page='+page+
			 	"&articleId="+search.articleId
				+"&articleTitle="+search.articleTitle+"&articleTag="+search.articleTag+"&publishStatus="+search.publishStatus+
				"&displayStatus="+search.displayStatus+"&columnId="+search.columnId+"&secondColumn="+search.secondColumn
			 	))
			 }
			 
		          
		},
		delArticle(record){
			/*console.log(location)*/

			dispatch({
				type:'content/showBonsModal',
				payload:{
					currentArtice:record
				}
			})


			dispatch({
				type:'content/getBonus',
				payload:{
					articleId:record.articleId,
					record:record
				}
			})
			dispatch({
				type:'content/getArticleStat',
				payload:{
					articleId:record.articleId,
				}
			})
		},
		fixSort(data,e){
			//console.log(location);
			dispatch({
				type:"content/setDisplayOrder",
				payload:{
					articleId:data.articleId,
					displayOrder:parseInt(e.target.value),
					search:location.search
				}
			})
		}
	}
	const SetModalProps = {
		visible:setshow,
		selectList,
		onCancel(){
			dispatch({
				type:'content/hideShowModal',
				
			})
		},
		onOk(selectList,status){
			
			dispatch({
				type:'content/setDisplayStatus',
				payload:{
					articleId:selectList,
					displayStatus:status.radio,
					updateUser:merId,
					search:location.search
				}
			})
		}

	}
	const ArticleModalProps ={
		visible:articeVisible,
		selectList,
		ColumnList,
		onCancel(){
			dispatch({
				type:'content/hideArticeModal',
				
			})
		},
		onOk(data,selectList){
			if(data.column==undefined){
				dispatch({
				type:"content/auditArticle",
				payload:{
					articleId:selectList.articleId,
					auditUser:merId,
					refuseReason:data.text,
				    auditStatus:parseInt(data.radio),
				    search:location.search
				}
			   })
			}else{
				dispatch({
				type:"content/auditArticle",
				payload:{
					articleId:selectList.articleId,
					auditUser:merId,
					refuseReason:data.text,
					columnId:data.column[0],
					secondColumn:data.column[1],
					auditStatus:parseInt(data.radio),
					search:location.search
				}
			   })
			}
				
			
			
		}
	}
	const BonsMoadlProps ={
		visible:BonsVisible,
		currentArtice,
		artice:getBonusList,
		ArticleStat,
		onCancel(){
			dispatch({
				type:"content/hideBonsModal"
			})
		}
	}
	return (
			<div >
				<Content_Article {...Content_ArticleProps}/>
				<SetModal {...SetModalProps}/>
				<ArticleModal {...ArticleModalProps}/>
				<BonsModal {...BonsMoadlProps} />
			</div>

	);
}

ContentArticle.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ContentArticle));