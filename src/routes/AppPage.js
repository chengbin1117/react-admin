import React, {
	Component,
	PropTypes
} from 'react';
import {connect} from 'dva';
import {
	withRouter,
	routerRedux,
	Link
} from 'dva/router';
import { Form ,Button, Upload, Icon,Input} from 'antd';
import Layout from '../components/Layout';
import styles from './IndexPage.css';
import AppTable from '../components/APP/AppTable';
import AddModal from '../components/APP/AddModal';
function AppPage({ location, dispatch, app }) {
	
	const {addModal} = app;
	//新建版本
	function AddModalBox(){
		dispatch({
			type:"app/showModal",
		})
	}
	const AddModalProps = {
		visible:addModal,
		onOk(){

		},
		onCancel(){
			dispatch({
				type:"app/hideModal"
			})
		}
	}
	//APP版本管理列表
	const AppTableProps ={
		
	}
	return (
		<div>
			<div className = { styles.tableListOperator }>
				<Button 
				style={{marginBottom:20}}
				type = "primary"
				icon="plus"
				onClick={()=>AddModalBox()}
				size = "large" >
				新建版本
				</Button>    
            </div>
			<AppTable {...AppTableProps}/>
			<AddModal {...AddModalProps}/>
		</div>

	);
}

AppPage.propTypes = {

};

function mapStateToProps({
	app
}) {
	return {
		app
	};
}



export default connect(mapStateToProps)(withRouter(AppPage));