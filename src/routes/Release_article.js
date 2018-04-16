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
import axios from 'axios';
import LayoutContainer from '../components/Layout';
import styles from './Common.css';
import BgModal from '../components/Content/BgModal';
import FtModal from '../components/Content/FtModal';
import Editor from '../editor/index';
import RelesEditor from '../components/Content/RelesEditor';
import { Form, Icon, Input, Button, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';
import {dataURLtoBlob,ImgUrl,getBase64} from '../services/common'



//var imgUrl = "";
function Release_article({location,dispatch,router,content,setting}) {
	//let logoimg = require("image!../assets/images/lx4.png");
  let merId =localStorage.getItem("userId");
  
  var text = '';
  var html = '';
  let src = ""
  const {artSorce,BgVisible,FtVisible,saveId,activeImg,ColumnList,cruImage,UserById,imgUrl,firstC,secondC,SensitiveWords,titleWords} =content;
  //console.log(ColumnList)
  const options = ColumnList;
  //const {getRelUserList} =setting;
  const ArticleEditorProps = {
    ColumnList,
    firstC,
    secondC,
    dispatch,
    router,
    imgUrl,
    cruImage,
    UserById,
    setting,
    saveId,
    location,
    artSorce,
    SensitiveWords,
    titleWords,
    handlsearch(values){
       
    },
    editorText(h,t){
        text  = t;
        html  = h;
    },
    uploadImg(img){
      //console.log(e.target.src)
      //var img = e.target.src;
      getBase64(img)
            .then(function(base64){
              //console.log(base64);//处理成功打印在控制台
              var s = dataURLtoBlob(base64)
              let formData = new FormData();
                    formData.append('name', 'file');
                    formData.append('file', s);
                    let config = {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                    }
              axios.post(ImgUrl, formData, config).then(res=>{
                       res =res.data; 
                      
                        if (res.errorCode == 10000) {
                            console.log(res) 
                           //imgUrl =res.data[0].filePath;
                            dispatch({
                              type:'content/hidefpModal',
                              payload:{
                                imgUrl:res.data[0].filePath
                              }
                            })    
                        }
                    })
            },function(err){
                  console.log(err);//打印异常信息
            });      
    }
  }
  const BgModalProps ={
  	visible:BgVisible,
  	onCancel(){
  		dispatch({
  		    type:'content/hideBgModal'
  	    })
  
  	},
  	showfpModal(activeImg){
      //console.log(activeImg)
      if(activeImg==""){
        message.warning("请选择图片")
      }else{
        dispatch({
          type:'content/hideBgModal',
          payload:{
            activeImg:activeImg
          }
        })
        dispatch({
          type:'content/showfpModal',
          payload:{
            
          }
        })
      }
  		/**/
  	},
    previewPage(){
      console.log(1)
     
    }
  }
  const FtModalProps ={
  	visible:FtVisible,
  	activeImg:activeImg,
  	onCancel(){
  		 dispatch({
  		    type:'content/hidefpModal',
  		    payload:{
  		    	
  		    }
  	    })
      
  	},
  	oncroup(src){
      var s = dataURLtoBlob(src)
      //console.log(s)
      let formData = new FormData();
            formData.append('name', 'file');
            formData.append('file', s);
            let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }
      axios.post(ImgUrl, formData, config).then(res=>{
               res =res.data; 
              
                if (res.errorCode == 10000) {
                    console.log(res) 
                   //imgUrl =res.data[0].filePath;
                    dispatch({
                      type:'content/hidefpModal',
                      payload:{
                        imgUrl:res.data[0].filePath
                      }
                    })    
                }
            })
  	}
  }
  
	return (
			<div>
				<Row span={24} >
					<Col>
						<RelesEditor {...ArticleEditorProps}/>
            <BgModal {...BgModalProps}/>
            <FtModal {...FtModalProps} />
					</Col>
				</Row>
			</div>

	);
}

Release_article.propTypes = {

};

function mapStateToProps({
	content,setting
}) {
	return {
		content,setting
	};
}



export default connect(mapStateToProps)(withRouter(Release_article));