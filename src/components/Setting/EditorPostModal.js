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
	Checkbox
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
const EditorPostModal = ({
	visible,
	item = {},
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

//console.log("selectlist",item)
const FormItem = Form.Item;
	function handleOk() {
		validateFields((errors,values) => {
		

			if (errors) {

				return;
			}

			
			onOk(values,item.postId);
		});
	}

	function Cancel() {
		onCancel()
		
	}
	function checked(checked){
		console.log("checked",checked)
		return checked
	}
	function afterClose(){
      resetFields()
    }
	const modalOpts = {
		title: "编辑岗位",
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

    	var arr =[];
    	let params ={};
    	let chid ={};
    	for (var i in list) {
 
            params={
              'key': list[i].id,
              'title': list[i].name,
               children:list[i].children.map((j)=>
                     chid ={
                      'key':j.id,
                      'title':j.name,
                    }
                )
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
			        	initialValue:item.name,
			            rules: [{ required: true, message: '请填写岗位名称!' }],
			        })(<Input />)}
			    </FormItem>
			    <FormItem>
			        {getFieldDecorator('rules', {
			        	initialValue:item.authIds!=undefined?item.authIds.split(','):[],
			    		rules: [{ required: true, message: '请填写选择权限!' },
			    		{ type: 'array', message: '请填写选择权限!' }],
			    		trigger:'checked',
			        })(<RuleList plainOptions = {TreeItem(TreeList)} defavalue={checked(item.authIds!=undefined?item.authIds.split(','):[])} checked={checked}/>)}
			    	
			     </FormItem>
			    
			</Form>
			
		</Modal>
	);
};

EditorPostModal.propTypes = {
	visible: PropTypes.any,
	form: PropTypes.object,
	item: PropTypes.object,
	onOk: PropTypes.func,
	onCancel: PropTypes.func,
};

export default Form.create()(EditorPostModal);