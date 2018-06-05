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
import styles from './Content_Opinion_Show.css';
import Cropper from 'react-cropperjs';
import 'cropperjs/dist/cropper.css';
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

const FtModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	selectList,
	fatherType,
	showfpModal,
	oncroup,
	activeImg,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {


	function handleOk(value,text) {
			
			//console.log(value,text)
			onOk(value,text,selectList);
		
	}

	function Cancel() {
		onCancel()
		setFieldsValue({
			father: "0",
			name: ''
		});
	}
	const modalOpts = {
		title: "裁剪图片",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		width:1000,
		footer:null,
	};
	
	//let logoimg = require("image!../../assets/images/lx4.png");
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
			src:"",
			imgWidth:0,
			imgHeight:0,
			flag:false,
            }
    },
    handleChange: function(event) {
        this.setState({ //this represents react component instance
            text: event.target.value
        });
    },
	crop(){
	    // image in dataUrl
	   // console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
	   /* this.refs.cropper.getData((data)=>{
	    		this.setState({
			      src:data
			    })
	    })*/
	    /*this.setState({
	      src:this.refs.cropper.getData().toDataURL()
		})*/
		const that = this;
		console.log(this)
	    var pevImg = this.refs.cropper.getCroppedCanvas();
		var reImg = pevImg.toDataURL('image/jpeg', 1.0);
		var img = new Image();
		img.src = reImg
		img.onload = function (argument) {
			//console.log(that)
			console.log(this.width, this.height)
			that.setState({
				imgWidth: this.width,
				imgHeight:this.height
			})
			if(this.width<750){
				that.setState({
					flag:true
				})
			}else if(this.height<422){
				that.setState({
					flag:true
				})
			}else{
				that.setState({
					flag:false
				})
			}
		}
	    this.setState({
	      src:reImg
	    })
	},
    render: function() {
    	//console.log(this.state.src)
        return (
        	<div>
            <Row>
            <Col span={14} className={styles.cropprBox}>
				<Cropper
					ref='cropper'
					src={activeImg}
					  style={{height:'100%',width:'100%'}}
					// Cropper.js options
					aspectRatio={16 / 9}
					initialAspectRatio= {16 / 9}
					guides={true}
					autoCrop={true}
					crop={this.crop}
					canMove ={false}
					info={true}
					viewMode={1}
					zoomable={false}
					minCropBoxWidth={365}
					minCropBoxHeight = {205}
					center={false}
					autoCropWidth={365}
					autoCropHeight={205}
					autoCropArea={0.7}
					/>
				<Button type="primary" size="large" onClick={()=>oncroup(this.state.src)}>重新上传</Button>
			</Col>
	        <Col span={10}>
	        	  <div className={styles.crpprtBox}>
				  	  {this.state.flag==false?<div className={this.state.src!= "" ?styles.crpprt:''}>
		              	<img src={this.state.src} className={styles.actieImg}/>
		              </div>:<div className={this.state.src!= "" ?styles.crpprt:''}>
					  当前尺寸过小，无法以大图样式展示(建议最小尺寸为750*395，优质文章将优先以大图形式在APP展示)
		              </div>}
		              
	              </div>
				  <div className={styles.name}>大图封面：16:9</div>
				  <div className={styles.crpprtBox2}>
				     
		              <div className={this.state.src!= "" ?styles.crpprt:''}>
					  	<div className={styles.parentsBox}>
					    <img  src={this.state.src}   alt="" className={styles.childBox} />
						</div>
		              </div>
	              </div>
				  <div className={styles.name}>小图封面：3:2</div>
	        </Col>
	              
            </Row>

            <div className={styles.upBtn}>
					<Button size="large" onClick={onCancel}>取消</Button><Button type="primary" size="large" style={{marginLeft:20+'px'}}onClick={()=>oncroup(this.state.src,this.state.flag)}>确定</Button>
				  </div>
            </div>
        );
    }
    });
	
	return (
			
		<Modal {...modalOpts} >
			<ImgBox />
			
		</Modal>
	);
};

FtModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(FtModal);