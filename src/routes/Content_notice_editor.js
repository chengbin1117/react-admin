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
import { Modal, message, Row, Col, Tabs, Icon, Button, Form, Input, Cascader, Select } from 'antd';
import NoticeEditor from '../components/Notice/NoticeEditor';
import { formatDate, tokenLogOut, GetRequest } from '../services/common';
import BonsModal from '../components/Content/BonsModal';
import styles from "./Common.css";
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
function ContentArticle({ location, dispatch, router, content }) {
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	//console.log("location",location)
	if (!token) {
		dispatch(routerRedux.push('/'))
	}

	//父子组件传值
	const NoticeAddProps = {
		dispatch:dispatch
	}
	return (
		<div >
			<NoticeEditor {...NoticeAddProps}/>
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