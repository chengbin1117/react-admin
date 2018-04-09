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
import WrappedAdvancedSearchForm from '../components/AdvancedSearchForm.js';
import LayoutContainer from '../components/Layout';
import WritingAwardTable from '../components/User/WritingAwardTable';
import { timeFormat, GetRequest } from '../services/common';
import FrozenModal from '../components/User/FrozenArticleModal';
import Additional from '../components/User/Additional';
import './font.less';
import styles from './Record.css'
import { Form, Row, Col, Input, Button, DatePicker, Icon, Table,Cascader, Pagination, Modal, Radio, Select, message } from 'antd';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
//console.log(merId)
function UserAdmin({ location, dispatch, award, content, }) {
	const {loading, totalNumber,loging,SysUsersList,totalPrice,AdditionalVisible,currentPage,ArticleBonusList,currentItem,FrozenVisible} = award;
	const {ColumnList} = content;
	//console.log(loading)
	let merId = localStorage.getItem("userId");
	let token = localStorage.getItem("Kgtoken");
	if (!token) {
		dispatch(routerRedux.push('/'))
	}
	const options =ColumnList;
	function getFields(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='文章ID'>
						{getFieldDecorator('articleId', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "文章ID只能输入数字" }
							]
						})(
							<Input placeholder="请输入文章Id" />
							)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='标题'>
						{getFieldDecorator('title')(
							<Input type="text" placeholder="请输入标题" />
						)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='发布人'>
						{getFieldDecorator('publisher', {
							rules: [
								{ required: false, }
							]
						})(
							<Input type="text" placeholder="请输入发布人" />
							)}
					</FormItem>
				</Col>
				<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='所属栏目'>
			            {getFieldDecorator('columnId')(
			              <Cascader options={options}  placeholder="请选择文章栏目" />
			            )}
			          </FormItem>
			    </Col>
				<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='发布时间'>
			            {getFieldDecorator('publishDate')(
							<RangePicker />
			            )}
			          </FormItem>
			    </Col>
				<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='审核时间'>
			            {getFieldDecorator('auditDate')(
							<RangePicker />
			            )}
			          </FormItem>
			    </Col>			
				<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='奖励状态'>
			            {getFieldDecorator('bonusStatus')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="0">冻结</Option>
								<Option value="1">已发放</Option>
								<Option value="2">未发放</Option>
			                </Select>
			            )}
			          </FormItem>
			    </Col>
				<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='额外奖励人'>
			            {getFieldDecorator('adminId')(
							<Select placeholder="请选择" allowClear={true}>
								{SysUsersList&&SysUsersList.map((item,index)=>{
									return(
										<Option value={item.id+""} key={index}>{item.username}</Option>
									)
								})}
								
			                </Select>
			            )}
			          </FormItem>
			    </Col>
				<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='有无额外奖励'>
			            {getFieldDecorator('addBonusStatus')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="0">无</Option>
								<Option value="1">有</Option>
			                </Select>
			            )}
			          </FormItem>
			    </Col>
				<Col span={8} style = {{display:'block'}}>
			          <FormItem {...formItemLayout} label='文章标识'>
			            {getFieldDecorator('articleMark')(
							<Select placeholder="请选择" allowClear={true}>
								<Option value="0">无</Option>
								<Option value="1">优质文章</Option>
			                </Select>
			            )}
			          </FormItem>
			    </Col>
			</div>
		);
		return children;
	}

	function getFieldsFirst(getFieldDecorator, formItemLayout) {
		const children = [];
		children.push(
			<div key="0">
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='文章ID'>
						{getFieldDecorator('articleId', {
							rules: [
								{ required: false, pattern: /^[0-9]*$/, message: "文章ID只能输入数字" }
							]
						})(
							<Input placeholder="请输入文章Id" />
							)}
					</FormItem>
				</Col>
				<Col span={8} style={{ display: 'block' }}>
					<FormItem {...formItemLayout} label='标题'>
						{getFieldDecorator('title')(
							<Input type="text" placeholder="请输入标题" />
						)}
					</FormItem>
				</Col>
			</div>
		);
		return children;
	}
	//搜索
	function handlsearch(data) {
		var columnId = data.columnId;
		if(columnId== undefined){
			columnId = null;
		}else{
			if(columnId[1]!=undefined){
				columnId = columnId[1]
			}else{
				columnId = columnId[0]
			}
		}
		if(data.title !=undefined&&data.publisher!=undefined){
			var title =Base64.encode(data.title);
			var publisher =Base64.encode(data.publisher);
			if(data.publishDate!=undefined&&data.auditDate!=undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+
				'&articleId='+data.articleId+'&title='+title+'&adminId='+data.adminId+'&columnId='+columnId+
				'&publishStartDate='+timeFormat(new Date(data.publishDate[0]))+'&publishEndDate='+timeFormat(new Date(data.publishDate[1]))+'&auditStartDate='+timeFormat(new Date(data.auditDate[0]))+
				'&auditEndDate='+timeFormat(new Date(data.auditDate[1]))+'&bonusStatus='+data.bonusStatus+'&publisher='+publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else if(data.publishDate!=undefined&&data.auditDate==undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+
				'&articleId='+data.articleId+'&title='+title+'&adminId='+data.adminId+'&columnId='+columnId+
				'&publishStartDate='+timeFormat(new Date(data.publishDate[0]))+'&publishEndDate='+timeFormat(new Date(data.publishDate[1]))+'&bonusStatus='+data.bonusStatus+'&publisher='+publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else if(data.publishDate==undefined&&data.auditDate!=undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+'&columnId='+columnId+
				'&articleId='+data.articleId+'&title='+title+'&adminId='+data.adminId+'&auditStartDate='+timeFormat(new Date(data.auditDate[0]))+
				'&auditEndDate='+timeFormat(new Date(data.auditDate[1]))+'&bonusStatus='+data.bonusStatus+'&publisher='+publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else{
				dispatch(routerRedux.push('/user/writingAward?page=1'+'&columnId='+columnId+
				'&articleId='+data.articleId+'&title='+title+'&adminId='+data.adminId+'&bonusStatus='+data.bonusStatus+'&publisher='+publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
		    }	
		}else if(data.title !=undefined&&data.publisher==undefined){
			var title =Base64.encode(data.title);
			if(data.publishDate!=undefined&&data.auditDate!=undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+
				'&articleId='+data.articleId+'&title='+title+'&adminId='+data.adminId+'&columnId='+columnId+
				'&publishStartDate='+timeFormat(new Date(data.publishDate[0]))+'&publishEndDate='+timeFormat(new Date(data.publishDate[1]))+'&auditStartDate='+timeFormat(new Date(data.auditDate[0]))+
				'&auditEndDate='+timeFormat(new Date(data.auditDate[1]))+'&bonusStatus='+data.bonusStatus+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else if(data.publishDate!=undefined&&data.auditDate==undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+
				'&articleId='+data.articleId+'&title='+title+'&adminId='+data.adminId+'&columnId='+columnId+
				'&publishStartDate='+timeFormat(new Date(data.publishDate[0]))+'&publishEndDate='+timeFormat(new Date(data.publishDate[1]))+'&bonusStatus='+data.bonusStatus+'&publisher='+publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else if(data.publishDate==undefined&&data.auditDate!=undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+'&columnId='+columnId+
				'&articleId='+data.articleId+'&title='+title+'&adminId='+data.adminId+'&auditStartDate='+timeFormat(new Date(data.auditDate[0]))+
				'&auditEndDate='+timeFormat(new Date(data.auditDate[1]))+'&bonusStatus='+data.bonusStatus+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else{
				dispatch(routerRedux.push('/user/writingAward?page=1'+'&columnId='+columnId+
				'&articleId='+data.articleId+'&title='+title+'&adminId='+data.adminId+'&bonusStatus='+data.bonusStatus+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}	
		}else if(data.title ==undefined&&data.publisher!=undefined){
			var publisher =Base64.encode(data.publisher);
			if(data.publishDate!=undefined&&data.auditDate!=undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+
				'&articleId='+data.articleId+'&adminId='+data.adminId+'&columnId='+columnId+
				'&publishStartDate='+timeFormat(new Date(data.publishDate[0]))+'&publishEndDate='+timeFormat(new Date(data.publishDate[1]))+'&auditStartDate='+timeFormat(new Date(data.auditDate[0]))+
				'&auditEndDate='+timeFormat(new Date(data.auditDate[1]))+'&bonusStatus='+data.bonusStatus+'&publisher='+publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else if(data.publishDate!=undefined&&data.auditDate==undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+
				'&articleId='+data.articleId+'&adminId='+data.adminId+'&columnId='+columnId+
				'&publishStartDate='+timeFormat(new Date(data.publishDate[0]))+'&publishEndDate='+timeFormat(new Date(data.publishDate[1]))+'&bonusStatus='+data.bonusStatus+'&publisher='+publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else if(data.publishDate==undefined&&data.auditDate!=undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+'&columnId='+columnId+
				'&articleId='+data.articleId+'&adminId='+data.adminId+'&auditStartDate='+timeFormat(new Date(data.auditDate[0]))+
				'&auditEndDate='+timeFormat(new Date(data.auditDate[1]))+'&bonusStatus='+data.bonusStatus+'&publisher='+publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else{
				dispatch(routerRedux.push('/user/writingAward?page=1'+'&columnId='+columnId+
				'&articleId='+data.articleId+'&adminId='+data.adminId+'&bonusStatus='+data.bonusStatus+'&publisher='+publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}	
		}else{
			if(data.publishDate!=undefined&&data.auditDate!=undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+
				'&articleId='+data.articleId+'&adminId='+data.adminId+'&columnId='+columnId+
				'&publishStartDate='+timeFormat(new Date(data.publishDate[0]))+'&publishEndDate='+timeFormat(new Date(data.publishDate[1]))+'&auditStartDate='+timeFormat(new Date(data.auditDate[0]))+
				'&auditEndDate='+timeFormat(new Date(data.auditDate[1]))+'&bonusStatus='+data.bonusStatus+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else if(data.publishDate!=undefined&&data.auditDate==undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+
				'&articleId='+data.articleId+'&adminId='+data.adminId+'&columnId='+columnId+
				'&publishStartDate='+timeFormat(new Date(data.publishDate[0]))+'&publishEndDate='+timeFormat(new Date(data.publishDate[1]))+'&bonusStatus='+data.bonusStatus+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else if(data.publishDate==undefined&&data.auditDate!=undefined){
				dispatch(routerRedux.push('/user/writingAward?page=1'+'&columnId='+columnId+
				'&articleId='+data.articleId+'&adminId='+data.adminId+'&auditStartDate='+timeFormat(new Date(data.auditDate[0]))+
				'&auditEndDate='+timeFormat(new Date(data.auditDate[1]))+'&bonusStatus='+data.bonusStatus+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
				))
			}else{
				dispatch(routerRedux.push('/user/writingAward?page=1'+'&columnId='+columnId+
				'&articleId='+data.articleId+'&adminId='+data.adminId+'&bonusStatus='+data.bonusStatus+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
                ))
			}
		}
		
	}

	//奖励列表
	const InviteNewTableProps = {
		data:ArticleBonusList,
		loading:loading,
		total:totalNumber,
		currentPage:currentPage,
		totalPrice:totalPrice,
		handelchande(page){
			const data = GetRequest(location.search);
			if(data.title=="undefined"||data.title==undefined){
				if(data.publisher=="undefined"||data.publisher==undefined){
					dispatch(routerRedux.push('/user/writingAward?page='+ page + '&articleId='+data.articleId+'&adminId='+data.adminId+'&columnId='+data.columnId+
					'&publishStartDate='+data.publishStastDate+'&publishEndDate='+data.publishEndDate+'&auditStartDate='+data.auditStartDate+
					'&auditEndDate='+data.auditEndDate+'&bonusStatus='+data.bonusStatus+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
					))
			    }else{
					dispatch(routerRedux.push('/user/writingAward?page='+ page + '&articleId='+data.articleId+'&adminId='+data.adminId+'&columnId='+data.columnId+
					'&publishStartDate='+data.publishStastDate+'&publishEndDate='+data.publishEndDate+'&auditStartDate='+data.auditStartDate+
					'&auditEndDate='+data.auditEndDate+'&bonusStatus='+data.bonusStatus+'&publisher='+data.publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
					))	
				}
		    }else{
				if(data.publisher=="undefined"||data.publisher==undefined){
					dispatch(routerRedux.push('/user/writingAward?page='+ page + '&articleId='+data.articleId+'&title='+data.title+'&adminId='+data.adminId+'&columnId='+data.columnId+
					'&publishStartDate='+data.publishStastDate+'&publishEndDate='+data.publishEndDate+'&auditStartDate='+data.auditStartDate+
					'&auditEndDate='+data.auditEndDate+'&bonusStatus='+data.bonusStatus+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
					))
				}else{
					dispatch(routerRedux.push('/user/writingAward?page='+ page + '&articleId='+data.articleId+'&title='+data.title+'&adminId='+data.adminId+'&columnId='+data.columnId+
					'&publishStartDate='+data.publishStastDate+'&publishEndDate='+data.publishEndDate+'&auditStartDate='+data.auditStartDate+
					'&auditEndDate='+data.auditEndDate+'&bonusStatus='+data.bonusStatus+'&publisher='+data.publisher+'&addBonusStatus='+data.addBonusStatus+'&articleMark='+data.articleMark
					))
				}
			}
		},
		getUserData(record){
			dispatch(routerRedux.push('/user/user_data?userId='+record.userId))

		},
		getAdditionalModal(record){
			dispatch({
				type:"award/showAdditionalModal",
				payload:{
					currentItem:record
				}
			})
		},
		MarkArticle(record){
			dispatch({
				type:"award/markHighQualityArticles",
				payload:{
					articleId:record.articleId,
					articleMark:1,
					adminId:merId,
					search:location.search
				}
			})
		},
		canelMarkArticle(record){
			dispatch({
				type:"award/markHighQualityArticles",
				payload:{
					articleId:record.articleId,
					articleMark:2,
					adminId:merId,
					search:location.search
				}
			})
		},
		getFrozenData(record){
			dispatch({
				type:"award/showFrozenModal",
				payload:{
					currentItem:record
				}
			})
		},
		Thaw(record){
			//解冻
			dispatch({
				type:"award/freezePublishBonus",
				payload:{
					adminId:merId,
					articleId:record.articleId,
					publishStatus:2,
					search:location.search
				}
			})
		}
	}
	//奖励说明
	function RweInfo(){
		Modal.info({
			title:"奖励说明",
			width:"600",
			content: (
		      <div>
		        <h2>规则：</h2>
		        <h4>1.奖励兑换</h4>
		        <p>有效邀请数>=10即可领取1TV</p>
		        <p>有效邀请数>=30即可领取5TV</p>
		        <p>有效邀请数>=50即可领取15TV</p>
		        <p>有效邀请数>=80即可领取30TV</p>
		        <p>2.领取奖励后，将扣除相应的邀请数值，如：成功邀请12人，选择领取奖励将获得10人对应的1TV
                奖励并扣除10人成功邀请数，剩余2人。</p>
		        <p>3.什么是有效邀请：好友通过您的邀请链接或者邀请码注册并登录，算为一次有效邀请。</p>
		        <p>4.成功邀请的新用户将自动成为您的徒弟。</p>
		        <p>5.邀请好友仅对于邀请新用户，老用户无效。</p>
		        <p>6.邀请真实用户才会增加有效次数。</p>
		        <p>7.活动最终解释权归千氪财经所有。</p>
		      </div>
		    ),
		})
	}
	//冻结
	const FrozenModalProps = {
		visible:FrozenVisible,
		item:currentItem,
		confirmLoading:loging,
		onCancel(){
			dispatch({
				type:"award/hideFrozenModal",
				payload:{
					currentItem:{}
				}
			})
		},
		onOk(data){
			console.log(data)
			dispatch({
				type:"award/freezePublishBonus",
				payload:{
					adminId:merId,
					articleId:data.articleId,
					publishStatus:0,
					freezeReason:data.bonusFreezeReason,
					search:location.search
				}	
			})
		}
	}
	//额外奖励弹窗
	const AdditionalProps = {
		visible:AdditionalVisible,
		currentItem:currentItem,
		loging:loging,
		onCancel(){
			dispatch({
				type:"award/hideAdditionalModal",
				payload:{
					currentItem:{}
				}
			})
		},
		onOk(data){
			console.log(data)
			var num = data.values.tmie.number;
			if(data.values.tmie.currency == 'TV'||data.values.tmie.currency == '0'){
				if(num>5){
					message.warn('最高奖励5TV');
				}else{
					dispatch({
						type:"award/addedBonus",
						payload:{
							adminId:merId,
							articleId:data.articleId,
							bonusType:0,
							bonus:num,
							bonusReason:data.values.bonusReason,
							search:location.search
						}	
					})
				}
			}else{
				if(num>500){
					message.warn('最高奖励500TXB');
				}else{
					dispatch({
						type:"award/addedBonus",
						payload:{
							adminId:merId,
							articleId:data.articleId,
							bonusType:1,
							bonus:num,
							bonusReason:data.values.bonusReason,
							search:location.search
						}	
					})
				}
			}
			
		}
	}
	return (
		<div>
			<div className = {styles.changeAward}>
					<Link  to = '/user/platformReward?page=1'>邀新奖励</Link>
					<Link  to = '/user/realnameAward?page=1'>实名认证奖励</Link>
					<Link  to = '/user/columnAward?page=1'>成为专栏作家奖励</Link>
					<Link  className = {styles.activeAward} to = '/user/writingAward?page=1'>发文奖励</Link>
					{/* <Link  to = '/user/platformReward?page=1'>平台阅读奖励</Link>
					<Link  to = '/user/platformReward?page=1'>分享奖励</Link> */}
					<Button  className = {styles.activeBtn} onClick={RweInfo} size="large" icon="question-circle-o">奖励说明</Button>
				</div>
			<WrappedAdvancedSearchForm getFields={getFields} getFieldsFirst={getFieldsFirst} handlsearch={handlsearch} />
			<WritingAwardTable {...InviteNewTableProps}/>
			<FrozenModal {...FrozenModalProps}/>
			<Additional {...AdditionalProps}/>
		</div>

	);
}

UserAdmin.propTypes = {

};

function mapStateToProps({
	award,content
}) {
	return {
		award,content
	};
}
export default connect(mapStateToProps)(withRouter(UserAdmin));