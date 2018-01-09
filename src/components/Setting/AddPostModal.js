import React, {
	PropTypes
} from 'react';
import {
	Form,
	Select,
	Input,
	Modal,
	Button,
	Table,
	Tabs,
	
} from 'antd';

const Option = Select.Option;
const TabPane = Tabs.TabPane;
import RuleList from './Rule';
const formItemLayout = {
	labelCol: {
		span: 6,
	},
	wrapperCol: {
		span: 14,
	},
};

    let list =[]
const AddPostModal = ({
	visible,
	type,
	onOk,
	onCancel,
	TreeList,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
		resetFields
	},
}) => {

const FormItem = Form.Item;
	function handleOk() {
		validateFields((errors,values) => {
			if (errors) {
				return;
			}

			//const data = {...getFieldsValue()}
			//console.log(values)
			onOk(values,list);
		});
	}

	function Cancel() {
		onCancel()
		
	}
	function checked(checked){
		
		return checked
		
	}
	function afterClose(){
      resetFields()
    }
	const modalOpts = {
		title: '添加岗位',
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		width:'800px',
		okText:"确定",
		cancelText:"取消",
		afterClose:afterClose

	};

	 const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };


    
  

    function TreeItem(list) {
    	//sconsole.log("list",list)
    	var arr =[];
    	let params ={};
    	let chid ={};
    	for (var i in list) {
 
            params={
              'value': list[i].id,
              'label': list[i].name,
               children:list[i].children.map((j)=>
                     chid ={
                      'value':j.id,
                      'label':j.name,
                    }
                )
            }
            arr.push(params)
        }  
        return arr
    }
    function getChild(list){
    	var arr =[];
    	let params ={};
    	let chid ={};
    	for (var i in list) {
 
            params={
              'value': list[i].id,
              'label': list[i].name,
               
            }
            arr.push(params)
        }  
        return arr
    }
	return (

		<Modal {...modalOpts}>
			<Form>
				<FormItem label="岗位名称" {...formItemLayout}>
			        {getFieldDecorator('name', {
			        	initialValue:'',
			            rules: [{ required: true, message: '请填写岗位名称!' }],
			        })(<Input />)}

			    </FormItem>
			    <FormItem>
			    	{getFieldDecorator('rules', {
			    		rules: [{ required: false, message: '请填写选择权限!' },
			    		{ type: 'array', message: '请填写选择权限!' },

			    		],
			    		trigger:checked
			    		
			        })(<div>{TreeList&&TreeItem(TreeList).map((item,index)=>
			        	<RuleList key={index} item = {item} child={item.children}  checked={checked}/>
			        	)}</div>)}
			     </FormItem>
			    
			</Form>
			
		</Modal>
	);
};

AddPostModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(AddPostModal);