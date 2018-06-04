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
import { message, Modal, Cascader, Form, Input, Select, Row, Col, Button } from 'antd';
import AdvertTable from '../components/Advert/AdvertTable';
import { GetRequest, residences } from '../services/common';
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import styles from './Record.css'
const FormItem = Form.Item;
const Option = Select.Option;
function ContentImage({ dispatch, advert, location }) {
	let userId = localStorage.getItem('userId');
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	const {ImageList} =advert

	function getFieldsFirst(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem
						{...formItemLayout}
						label="显示位置"
					>
						{getFieldDecorator('residence', {

							rules: [{ type: 'array', required: false, message: '请选择!' }],
						})(
							<Cascader options={residences} placeholder="请选择" />
						)}
					</FormItem>
				</Col>
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='类型'>
						{getFieldDecorator('type', {

						})(
							<Select placeholder="请选择">

								<Option value="1">资讯</Option>
								<Option value="2">广告</Option>
								<Option value="3">其他</Option>
							</Select>
						)}
					</FormItem>
				</Col>

			</div>
		);
		return children;
	}
	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem
						{...formItemLayout}
						label="显示位置"
					>
						{getFieldDecorator('residence', {

							rules: [{ type: 'array', required: false, message: '请选择!' }],
						})(
							<Cascader options={residences} placeholder="请选择" />
						)}
					</FormItem>
				</Col>
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='类型'>
						{getFieldDecorator('type', {

						})(
							<Select placeholder="请选择">

								<Option value="1">资讯</Option>
								<Option value="2">广告</Option>
								<Option value="3">其他</Option>
							</Select>
						)}
					</FormItem>
				</Col>
				<Col md={8} sm={24} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='显示状态'>
						{getFieldDecorator('showStatus', {

						})(
							<Select placeholder="请选择">

								<Option value="1">显示</Option>
								<Option value="0">隐藏</Option>
							</Select>
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}

	function handlsearch(values) {
		if (values.residence != undefined) {

			dispatch(routerRedux.push('/content/content_image?page=1' + "&imageType=" + values.type +
				"&imageStatus=" + values.showStatus + "&navigatorPos=" + values.residence[0] + "&imagePos=" + values.residence[1]

			))

		} else {
			dispatch(routerRedux.push('/content/content_image?page=1' + "&imageType=" + values.type +
				"&imageStatus=" + values.showStatus

			))
		}
	}
	//添加图片
	function showModal() {
		dispatch(routerRedux.push('/advert/advert_add'))
	}

	//广告列表父子组件之间的传值
	const AdvertTableProps = {
		data:ImageList,
		editorItem(record){
			dispatch(routerRedux.push('/advert/advert_editor'))
		},
		deleteItem(record){
			dispatch({
				type:'advert/deleteImage',
				payload:{
					imageId:record.imageId,
					search:location.search,
					imageType:2
				}
			})
		}
	}
	return (
		<div >
			<div className={styles.changeAward}>
				<Link className={styles.activeAward} to='/advert/list?page=1'>广告</Link>
				<Link to='/advert/other_imgs?page=1'>其他图片</Link>

			</div>
			<Button type="primary" size='large' onClick={showModal} style={{ marginBottom: 20, marginTop: 20 }} icon="plus">添加广告</Button>
			<WrappedAdvancedSearchForm style={{ margin: 0 }} getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<AdvertTable {...AdvertTableProps} />
		</div>

	);
}

ContentImage.propTypes = {

};

function mapStateToProps({
	advert
}) {
	return {
		advert
	};
}



export default connect(mapStateToProps)(withRouter(ContentImage));