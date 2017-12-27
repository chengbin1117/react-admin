import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Radio,
	message,
	Button,
	Tabs,
	Steps,
	Col,
	Row
} from 'antd';
import styles from './Content_Opinion_Show.css'
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const Option = Select.Option;
const Step = Steps.Step;
const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

const BonsModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	currentArtice,
	artice,
	ArticleStat,
	showfpModal,
	
}) => {
	let total =0;
	//console.log(ArticleStat)
	function handleOk(value,text) {
			
			//console.log(value,text)
			//onOk(value,text,selectList);
		
	}

	function Cancel() {
		onCancel()
		
	}
	const modalOpts = {
		title: (<div>{currentArtice.articleTitle}
				<span className={styles.bons}>
					{currentArtice.sysUser==null?<span>阅读奖励:{currentArtice.bonusStatus==1?<span style={{color:"#02c874"}}>已生效</span>:<span style={{color:"#f00"}}>未生效</span>}</span>:null}
				</span>
			</div>),
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		footer:null
	};
	
	
	var ImgBox = React.createClass({
    propTypes: {//定义传入props中的属性各种类型
        initialValue: React.PropTypes.string
    },
    defaultProps: { //组件默认的props对象
        initialValue: ''
    },
    // 设置 initial state
    getInitialState: function() {//组件相关的状态对象
        return {
            }
    },
    render: function() {
    	
        return (
               <div className={styles.bonsList}>
               {artice!=""?<div>
               		<Row className={styles.bonsTitle}>
				    	<Col  span={4}>
				           创建时间
				    	</Col>
				    	<Col  span={13}>
				    		规则内容
				    	</Col>
				    	<Col  span={7}>
				    		总计发放
				    	</Col>
				    </Row>
				    <Row className={styles.bonsContent}>
				    	<Col  span={4}>
				    			{currentArtice.createDate}
				    	</Col>
				    	<Col  span={13}>
				    		{artice&&artice.map((item,index)=>{
				    			total += item.total
				    			return(
				    				<Row key={index}>
				    					<Col span={8}>
				    						{item.name}
				    					</Col>
				    					<Col span={8}>
				    						奖励钛值{item.value}/人
				    					</Col>
				    					<Col span={8}>
				    						最大奖励人数{item.max}人
				    					</Col>
				    				</Row>
				    				)
				    		}

				    			)}
				    	</Col>
				    	<Col  span={7}>
				    		{total}钛值
				    	</Col>
				    </Row>
				    <Row className={styles.bonsFooter}>
				    	<Col  span={24}>
				    		截止目前,已有{ArticleStat!=null?ArticleStat.bonusNum:0}个用户获得了他的奖励,剩余奖励数{(ArticleStat!=null&&ArticleStat.bonusTotal)-(ArticleStat!=null&&ArticleStat.bonusValue)}
				    	</Col>
				    </Row>
               </div>:<div>该文章暂未设置阅读奖励</div>}
				    
		    </div>
        );
    }
    });
	
	return (
			
		<Modal {...modalOpts} width='50%'>
			<ImgBox />
		</Modal>
	);
};

BonsModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(BonsModal);