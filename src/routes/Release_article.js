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
import {dataURLtoBlob,ImgUrl} from '../services/common'



//var imgUrl = "";
function Release_article({dispatch,router,content,setting}) {
	//let logoimg = require("image!../assets/images/lx4.png");
  let merId =localStorage.getItem("userId");
  
  var text = '';
  var html = '';
  let src = ""
  const {BgVisible,FtVisible,activeImg,ColumnList,cruImage,UserById,imgUrl,firstC,secondC} =content;
  //console.log(ColumnList)
  const options = ColumnList;

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
    handlsearch(values){
       
        //var ImgSrc = localStorage.getItem("img");
        var Html = localStorage.getItem("html");
        var Text = localStorage.getItem("text");
        //console.log(Html)
       
        
        if(Text == '') {
          message.warn('请输入正文')
          return false
        }
       // console.log(values)
        
    },
    editorText(h,t){
        text  = t;
        html  = h;
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