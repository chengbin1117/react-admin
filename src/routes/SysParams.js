import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'dva';
import styles from './AboutUs.css'
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import LayoutContainer from '../components/Layout';
import { Form ,Button, Upload, Icon,Input,Select,Col,Modal,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import {formatDate,tokenLogOut,GetRequest} from '../services/common'
function AccountRule({location,dispatch,setting,router,}) {
	let  userId = localStorage.getItem('userId');
	let token =localStorage.getItem("Kgtoken");
	if(!token) {
		dispatch(routerRedux.push('/'))
	}


	return (
			<div>
				
			</div>

	);
}

AccountRule.propTypes = {

};

function mapStateToProps({
	setting
}) {
	return {
		setting
	};
}



export default connect(mapStateToProps)(withRouter(AccountRule));