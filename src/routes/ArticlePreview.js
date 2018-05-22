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
import Useradmin from '../components/User/UserAdmin';
import ExamineModal from '../components/User/ExamineModal';
import SetHotuser from '../components/User/SetHotuser';
import LockModal from '../components/User/LockModal';
import {timeFormat} from '../services/common';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination,Modal,Radio,Select,message,Alert,Tag} from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
import styles from './Common.css';
import logo from '../assets/images/logo.png'
//console.log(merId)
function ArticlePreview({location,dispatch,content,router,}) {
	
	var previewTitle =localStorage.getItem("previewTitle");
	var previewText =localStorage.getItem("previewText");
	var previewartic =localStorage.getItem("previewartic");
	var previewdec =localStorage.getItem("previewdec");
	var previewLink =localStorage.getItem("previewLink");
	var previewSource =localStorage.getItem("previewSource");
	var previewType =localStorage.getItem("previewType");
	var previewTag =localStorage.getItem("previewTag");
	if(previewTag!=""){
		previewTag = previewTag.split(',');
	}else{
		previewTag=null
	}
	
	console.log(previewTag)
	//var H = document.body.clientHeight + 'px'
	//console.log(previewTitle,previewartic)
	return (
			<div style={{minHeight:"100%"}}>
				<div className={styles.topBox}>
			    <div className={styles.topNav}>
			     	<div className={styles.grid_content} >
				        <ul className = {styles.topNav_r}>
				          <li className = {styles.fl}>用户须知</li>
				          <li className = {styles.fl}><a>登录/注册</a></li>
				          <li className = {styles.fl}><a>欢迎您，xxx</a></li>
				          <li className = {styles.fl}>app下载</li>
				        </ul>
			        </div>
			    </div>
			    <div className = {styles.nav}>
			      	<div className={styles.continaer} >
			      	    <img className = {styles.nav_logo} src = {logo} />
			      	    <span className = {styles.nav_logo_title}>千氪</span>
			      	    <div >
			              <ul  className={styles.el_menu_demo} >
			                <li>
			                    <a  target = "_blank">首页</a>
			                </li>
			                <li>
			                    <a  target = "_blank">区块链</a>
			                </li>
			                <li>
			                    <a  target = "_blank">频道页</a>
			                </li>
			                <li>
			                    <a  target = "_blank">栏目页</a>
			                </li>
			                <li>
			                    <a  target = "_blank">本站</a>
			                </li>
			                <li>
			                    <a  target = "_blank">理财</a>
			                </li>

			            </ul>
			            <Icon type="search" className = {styles.search}/>
			          </div>
			        </div>
                </div>
                </div>
                 <div className = {styles.previewMask}>
                 <Alert message="这是预览页面，不支持任何操作" type="warning"  className={styles.text}/>
                 </div>
              	<div className={styles.container} style={{minHeight:850}}>
              	
              	<div className={styles.container_left}>
	                <p className={styles.title}>{previewTitle=='undefined'?"":previewTitle}</p>
	              	<div className={styles.abstract}>
	              	    {(previewartic=='undefined'||previewartic=="")?previewdec:previewartic}
	              	</div>
	                <div className={styles.article} dangerouslySetInnerHTML={{__html: previewText}}></div>
					{previewType=="2"?<div className={styles.articleSource}>
					<span>本文来源：{previewSource}</span>
					<a target = "_blank" href={previewLink} className={styles.articlwe}>阅读原文</a>
					</div>:null}
					{(previewTag!=null)?previewTag.map((t,index)=>{
		            	return(
		            		 <Tag color="blue" key={index} className={styles.tags}>{t}</Tag>
		            		)
		            }):null}
	          </div>
              	</div>
              <div className={styles.footer}>
			      <div className = {styles.about}>
			          <a >专栏申请协议</a>
			          <a>关于我们</a>
			          <a>加入我们</a>
			          <a>联系我们</a>
			          <a>版权声明</a>
			          <a>用户注册协议</a>
			      </div>
			      <div className = {styles.info}>
			        <span>川ICP备17030508号-1 川公网安备33010602002085号</span>
			        <span>举报电话：028-23232323</span>
			        <span>举报邮箱：34343@kg.com</span>
			      </div>
			  </div>
			</div>

	);
}

ArticlePreview.propTypes = {

};

function mapStateToProps({
	content
}) {
	return {
		content
	};
}



export default connect(mapStateToProps)(withRouter(ArticlePreview));