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
import stytes from './UserLoginPage.css';
import { Form, Row, Col, Input, Button, Icon,message,Radio} from 'antd';
import {uploadUrl} from '../services/common'
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

function UserAdmin({location,dispatch,user,router,}) {
	let merId =localStorage.getItem("userId");
	let token =localStorage.getItem("Kgtoken");
	//console.log(location)
	if(!token) {
		dispatch(routerRedux.push('/'))
	}
	const {userInfo}=user;
	 const formItemLayout = {
      labelCol: {
        xs: { span: 1 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 1 },
        sm: { span: 3 },
      },
    };
    //console.log((userInfo.profile.otherPic).split(","))
	class DynamicRule extends React.Component {
	  state = {
	    checkNick: false,
	    text:''
	  };
	  submit = (e) => {
	    this.props.form.validateFields(
	      (err,values) => {
	        if (!err) {
	          console.info(values);
	          if(values.radio =='1'){
	          	dispatch({
						type:'user/auditUser',
						payload:{
							userId:userInfo.userId,
							auditStatus:parseInt(values.radio),
							auditUserId:merId,
							user_data:1,
						}
				})
	          }
		      if(values.radio =='3'){
	          	dispatch({
						type:'user/auditUser',
						payload:{
							userId:userInfo.userId,
							auditStatus:parseInt(values.radio),
							auditUserId:merId,
							refuseReason:values.text,
							user_data:1,
						}
				})
	          }   
	        }
	      },
	    );
	  }
	  handleChange = (e) => {
	    this.setState({
	      text: e.target.value
	    })
	  }
	  onChange = (e) => {
	    console.log('radio checked', e.target.value);
	    this.setState({
	      value: e.target.value,
	    });
	  }
	  render() {
	    const { getFieldDecorator } = this.props.form;
	    return (
	      <Form>
			    <FormItem label="审核处理" >
		          {getFieldDecorator('radio',{
		          	
		          })(
		            <RadioGroup onChange={this.onChange} value={this.state.value}>
		                <Radio  value={1}>通过</Radio>
		                <br />
				        <Radio  value={3}>
				          不通过
				          
				        </Radio>
		            </RadioGroup>
		          )}
		        </FormItem>
		        <FormItem label="">
				  	{getFieldDecorator('text', {
				  			
				  		})(
				  		    <TextArea style={{ width: "60%",minHeight:"100px"  }} disabled={this.state.value==3?false:true} placeholder="不通过原因(选填)"></TextArea>
				  		)}
				</FormItem>
		        <FormItem>
		          <Button type="primary" onClick={this.submit} size="large">保存</Button>
		        </FormItem>
			</Form>
	    );
	  }
	}
	const WrappedDynamicRule = Form.create()(DynamicRule);
	
	return (
			<div>
				<h2 >基础信息</h2>
					<table className={stytes.table}>
						<tbody>
						<tr>
						    <td>用户ID</td><td>{userInfo.userId!=null?userInfo.userId:"——"}</td>
						    <td>邮箱</td><td>{userInfo.profile&&userInfo.profile.email!=null?userInfo.profile.email:"——"}</td>
						</tr>
						<tr>
						    <td>手机号</td><td>{userInfo.userMobile?userInfo.userMobile:"——"}</td>
						    <td>用户角色</td><td>{userInfo.userRole?userInfo.userRoleDisplay:"——"}</td>
						</tr>
						<tr>
						    <td>用户级别</td><td>{userInfo.userLevelDisplay?userInfo.userLevelDisplay:"——"}</td>
						    <td>注册时间</td><td>{userInfo.createDate!=null?userInfo.createDate:"——"}</td>
						</tr>
						<tr>
						    <td>提交专栏申请时间</td><td>{userInfo.applyColumnTime!=null?userInfo.applyColumnTime:"——"}</td>
						    <td>审核状态</td><td>{userInfo.auditStatusDisplay!=null?userInfo.auditStatusDisplay:"——"}</td>
						</tr>
						<tr>
						    <td>审核人</td><td>{userInfo.auditor!=null?userInfo.auditor:"——"}</td>
						    <td>审核时间</td><td>{userInfo.auditDate!=null?userInfo.auditDate:"——"}</td>
						</tr>
						<tr>
						    <td>锁定状态</td><td>{userInfo.lockStatusDisplay!=null?userInfo.lockStatusDisplay:"——"}</td>
						    <td></td><td>——</td>
						</tr>
						</tbody>
					</table>
				<h2 className={stytes.title}>活跃数据</h2>
				    <table className={stytes.table}>
				    <tbody>
						<tr><td>评论数</td><td>{userInfo.commentNum!=null?userInfo.commentNum:"——"}</td>
						<td>浏览数</td><td>{userInfo.bowseNum!=null?userInfo.bowseNum:"——"}</td></tr>
						<tr><td>收藏数</td><td>{userInfo.collectNum!=null?userInfo.collectNum:"——"}</td>
						<td>发文数</td><td>{userInfo.articleNum!=null?userInfo.articleNum:"——"}</td></tr>
						<tr><td>分享数</td><td>{userInfo.shareNum!=null?userInfo.shareNum:"——"}</td>
						</tr>
					</tbody>	
					</table>
				<h2 className={stytes.title}>其他信息</h2>
				<div>
					<p className={stytes.dataBox}><span className={stytes.span1}>专栏名称</span>
					    <span className={stytes.span2}>
					    {(userInfo.profile&&userInfo.profile.columnName!=null)?userInfo.profile.columnName:"——"}
					    </span>
						</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>专栏介绍</span>
						<span className={stytes.span2}>{(userInfo.profile&&userInfo.profile.columnIntro!=null)?userInfo.profile.columnIntro:"——"}</span>
						</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>所在地区</span><span className={stytes.span2}>{(userInfo.profile&&userInfo.profile.columnProvince)!=null?userInfo.profile.columnProvince+userInfo.profile.columnCounty:"——"}</span></p>
						{userInfo.userRole==1&&null}
						{userInfo.userRole==2&&<div>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员真实姓名</span><span className={stytes.span2}>{(userInfo.profile&&userInfo.profile.realName!=null&&userInfo.profile.realName!="")?userInfo.profile.realName:"——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份证号</span><span className={stytes.span2}>{(userInfo.profile&&userInfo.profile.idcard!=null&&userInfo.profile.idcard!="")?userInfo.profile.idcard:"——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份件扫描</span>
						<span className={stytes.span2}>
						    {(userInfo.profile&&userInfo.profile.idcardBack!=null)?<img style={{width:100,height:100}} src={uploadUrl+userInfo.profile.idcardBack}/>:<span className={stytes.idcardBack}>暂无上传身份正面</span>}
						    {(userInfo.profile&&userInfo.profile.idcardFront!=null)?<img style={{width:100,height:100}} src={uploadUrl+userInfo.profile.idcardFront}/>:"——"}
						<br />
						{(userInfo.profile&&(userInfo.profile.idcardPic!=null||userInfo.profile.idcardPic!=""))?<img style={{width:100,height:100}} src={uploadUrl+userInfo.profile.idcardPic}/>:"——"}
						</span>
						</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>相关网站链接</span><span className={stytes.span2}>{(userInfo.profile&&(userInfo.profile.siteLink!=""))?userInfo.profile.siteLink:"——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>其他资质</span><span className={stytes.span2}>{(userInfo.profile&&userInfo.profile.otherPic!=null&&JSON.parse(userInfo.profile.otherPic).length!=0)?<img style={{width:100,height:100}} src={uploadUrl+((JSON.parse(userInfo.profile.otherPic))[0])}/>:"——"}</span></p>
						
							</div>
						}
						{(userInfo.userRole==3||userInfo.userRole==5)?<div>
							<p className={stytes.dataBox}><span className={stytes.span1}>组织名称</span><span className={stytes.span2}>
						        {(userInfo.profile&&userInfo.profile.companyName!=null)?userInfo.profile.companyName:"——"}
						        </span>
						    </p>
						<p className={stytes.dataBox}><span className={stytes.span1}>组织机构代码证/营业执照</span><span className={stytes.span2}>
						{(userInfo.profile&&userInfo.profile.licensePic!=null)?
							<img src={uploadUrl+userInfo.profile.licensePic} style={{width:100,height:100}}/>
							:"——"}
							</span>
							</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员真实姓名</span><span className={stytes.span2}>{(userInfo.profile&&userInfo.profile.realName!=null&&userInfo.profile.realName!="")?userInfo.profile.realName:"——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份证号</span><span className={stytes.span2}>{(userInfo.profile&&userInfo.profile.idcard!=null&&userInfo.profile.idcard!="")?userInfo.profile.idcard:"——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份件扫描</span>
						<span className={stytes.span2}>
						{(userInfo.profile&&userInfo.profile.idcardPic!=null&&userInfo.profile.idcardPic!="")?<img style={{width:100,height:100}} src={uploadUrl+userInfo.profile.idcardPic}/>:"——"}
						</span>
						</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>相关网站链接</span><span className={stytes.span2}>{(userInfo.profile&&(userInfo.profile.siteLink!=""))?userInfo.profile.siteLink:"——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>其他资质</span><span className={stytes.span2}>{(userInfo.profile&&userInfo.profile.otherPic!=null&&JSON.parse(userInfo.profile.otherPic).length!=0)?<img style={{width:100,height:100}} src={uploadUrl+((JSON.parse(userInfo.profile.otherPic))[0])}/>:"——"}</span></p>
						
							</div>:null
						}
						{userInfo.userRole==4&&<div>
								<p className={stytes.dataBox}><span className={stytes.span1}>企业名称
						            </span><span className={stytes.span2}>
						           {(userInfo.profile&&userInfo.profile.companyName!=null)?userInfo.profile.companyName:"——"}
						            </span>
						        </p>
								<p className={stytes.dataBox}><span className={stytes.span1}>企业机构代码证/营业执照</span><span className={stytes.span2}>
								{(userInfo.profile&&userInfo.profile.licensePic!=null)?
									<img src={uploadUrl+userInfo.profile.licensePic} style={{width:100,height:100}}/>
									:"——"}
									</span>
								</p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员真实姓名</span><span className={stytes.span2}>{(userInfo.profile&&userInfo.profile.realName!=null&&userInfo.profile.realName!="")?userInfo.profile.realName:"——"}</span></p>
						<p className={stytes.dataBox}><span className={stytes.span1}>管理员身份证号</span><span className={stytes.span2}>{(userInfo.profile&&userInfo.profile.idcard!=null&&userInfo.profile.idcard!="")?userInfo.profile.idcard:"——"}</span></p>
						<div className={stytes.dataBox}>
						<span className={stytes.span1}>管理员身份件扫描</span>
						<span className={stytes.span2}>
						    {(userInfo.profile&&userInfo.profile.idcardBack!=null)?<img style={{width:100,height:100}} src={uploadUrl+userInfo.profile.idcardBack}/>:<span className={stytes.idcardBack}>暂无上传身份正面</span>}
						    {(userInfo.profile&&userInfo.profile.idcardFront!=null)?<img style={{width:100,height:100}} src={uploadUrl+userInfo.profile.idcardFront}/>:<span className={stytes.idcardBack}>暂无上传身份反面</span>}
						    
						      {(userInfo.profile&&userInfo.profile.idcardPic!=null&&userInfo.profile.idcardPic!="")?<img style={{width:100,height:100}} src={uploadUrl+userInfo.profile.idcardPic}/>:<span className={stytes.idcardBack}>暂无上传手持身份正面</span>}
						</span>
						</div>
						<p className={stytes.dataBox}><span className={stytes.span1}>相关网站链接</span><span className={stytes.span2}>{(userInfo.profile&&(userInfo.profile.siteLink!=""))?userInfo.profile.siteLink:"——"}</span></p>
						<p className={stytes.dataBox}>
						<span className={stytes.span1}>其他资质</span>
						<span className={stytes.span2}>
						{(userInfo.profile&&userInfo.profile.otherPic!=null&&JSON.parse(userInfo.profile.otherPic).length!=0)?<span>{JSON.parse(userInfo.profile.otherPic).map((item,index)=>{
							return(
								<img src={uploadUrl+item} style={{width:100,height:100,marginLeft:20}} />
								)
						})}</span>:""}
						</span></p>
						</div>
							
					      }
						{(userInfo.auditStatus == 0 && userInfo.applyRole!=1)?<WrappedDynamicRule />:null}
					</div>
			</div>

	);
}

UserAdmin.propTypes = {

};

function mapStateToProps({
	user
}) {
	return {
		user
	};
}



export default connect(mapStateToProps)(withRouter(UserAdmin));

