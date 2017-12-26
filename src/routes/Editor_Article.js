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
import styles from './Common.css';
import BgModal from '../components/Content/BgModal';
import FtModal from '../components/Content/FtModal';ArticleEditor
import {dataURLtoBlob,ImgUrl} from '../services/common'
import ArticleEditor from '../components/Content/ArticeEditor';
import { Form, Icon, Input, Button, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';
import axios from 'axios';
function Editor_article({dispatch,router,content,setting}) {
	//let logoimg = require("image!../assets/images/lx4.png");
  let merId =localStorage.getItem("userId");
  let token =localStorage.getItem("Kgtoken");
  if(!token) {
    dispatch(routerRedux.push('/'))
  }

  var html = '';
  let src = "";
  
  const {ArticleList,BgVisible,FtVisible,activeImg,ColumnList,cruImage,editorList,getBonusList,imgUrl} =content;

  const options = ColumnList;
console.log("imgUrl",imgUrl)
  const ArticleEditorProps = {
    ColumnList,
    dispatch,
    ArticleList:editorList,
    router,
    cruImage,
    setting,
    getBonusList,
    imgUrl,
    handlsearch(values){
       
    
      
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
						<ArticleEditor {...ArticleEditorProps}/>
            <BgModal {...BgModalProps}/>
            <FtModal {...FtModalProps} />
					</Col>
				</Row>
			</div>

	);
}

Editor_article.propTypes = {

};

function mapStateToProps({
	content,setting
}) {
	return {
		content,setting
	};
}



export default connect(mapStateToProps)(withRouter(Editor_article));