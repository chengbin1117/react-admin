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
import axios from 'axios';
import LayoutContainer from '../components/Layout';
import styles from './Common.css';
import BgModal from '../components/Content/BgModal';
import FtModal from '../components/Content/FtModal';
import Editor from '../editor/index';
import RelesEditor from '../components/Content/RelesEditor';
import { Form, Icon, Input, Button, Checkbox,Tag,Row,Col,Upload,Radio,Cascader,DatePicker, TimePicker, message  } from 'antd';


var imgUrl = ""

function dataURLtoBlob(dataurl) {  //将base64格式图片转换为文件形式
                        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                        while(n--){
                            u8arr[n] = bstr.charCodeAt(n);
                        }
                        return new Blob([u8arr], {type:mime});
}
function Release_article({dispatch,router,content,setting}) {
	//let logoimg = require("image!../assets/images/lx4.png");
  let merId =localStorage.getItem("userId");

  var text = '';
  var html = '';
  let src = ""
  const {BgVisible,FtVisible,activeImg,ColumnList,cruImage,imgUrl,UserById} =content;
  //console.log(ColumnList)
  const options = ColumnList;

  const ArticleEditorProps = {
    ColumnList,
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
       onsole.log(imgUrl)
        
        if(Text == '') {
          message.warn('请输入正文')
          return false
        }
       // console.log(values)
         dispatch({
            type:'content/publishArticle',
            payload:{
              articleTitle:values.articleTitle,
              articleText:Html,
              articleTag:values.tag1+','+values.tag2+','+values.tag3+','+values.tag4+','+values.tag5,
              description:values.artic,
              image:'https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=9101b1d4728da9775a228e79d138937c/1c950a7b02087bf4d140250ef3d3572c10dfcfad.jpg',
              type:parseInt(values.type),
              columnId:parseInt(values.column[0]),
              displayStatus:parseInt(values.radioT),
              displayOrder:parseInt(values.sort),
              commentSet:values.radioS == "true"?true:false,
              publishSet:values.radioG == "true"?true:false,
              createUser:parseInt(values.createUser),
              sysUser:parseInt(merId),
              publishTime:new Date(values.time[0]).toLocaleDateString().split('/').join('-'),
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
      axios.post('http://120.78.186.139:8088/kgapi/image/upload', formData, config).then(res=>{
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