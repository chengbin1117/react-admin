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
import styles from './Common.css';
import BgModal from '../components/Content/BgModal';
import FtModal from '../components/Content/FtModal';ArticleEditor
import Editor from '../editor/index';
import ArticleEditor from '../components/Content/ArticeEditor';
import { Form, Icon, Input, Button, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';

function Editor_article({dispatch,router,content,setting}) {
	//let logoimg = require("image!../assets/images/lx4.png");
  let merId =localStorage.getItem("userId");

  var text = '';
  var html = '';
  let src = ""
  const {ArticleList,BgVisible,FtVisible,activeImg,ColumnList,cruImage,editorList} =content;
  //console.log(ArticleList)
  const options = ColumnList;

  const ArticleEditorProps = {
    ColumnList,
    dispatch,
    ArticleList:editorList,
    router,
    cruImage,
    setting,
    handlsearch(values){
       
        var ImgSrc = localStorage.getItem("img");
        var Html = localStorage.getItem("html");
        var Text = localStorage.getItem("text");
        //console.log(Html)
       // console.log(ImgSrc)
        if(ImgSrc= ''){
          message.warn('请上传图像')
          return false
        }
        if(Text == '') {
          message.warn('请输入正文')
          return false
        }
        dispatch({
          type:'content/publishArticle',
          payload:{
            articleId:ArticleList[0].articleId,
            articleTitle:values.articleTitle,
            articleText:Html,
            articleTag:values.tag1+','+values.tag2+','+values.tag3+','+values.tag4+','+values.tag5,
            description:values.artic,
            image:String(ImgSrc),
            type:parseInt(values.type),
            columnId:parseInt(values.column[0]),
            displayStatus:parseInt(values.radioT),
            displayOrder:parseInt(values.sort),
            commentSet:values.radioS == "true"?true:false,
            publishSet:values.radioG == "true"?true:false,
            createUser:parseInt(values.createUser),
            sysUser:parseInt(merId),
          }
        })
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
  		//console.log(src)
      dispatch({
          type:'content/hidefpModal',
          payload:{
            cruImage:src
          }
      })
      var binary = atob(src.split(',')[1]);  
      var array = [];  
      for(var i = 0; i < binary.length; i++) {  
        array.push(binary.charCodeAt(i));  
      }  
      let a =  new Blob([new Uint8Array(array)], {type:'image/png' });  
      console.log(a)
      localStorage.setItem("img", src);
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