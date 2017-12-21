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
const AddPostModal = ({
	visible,
	item = {},
	type,
	onOk,
	onCancel,
	TreeList,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue,
		setFieldsValue,
	},
}) => {

console.log("selectlist",item)
const FormItem = Form.Item;
	function handleOk() {
		validateFields((errors,values) => {
			if (errors) {
				return;
			}

			//console.log(list)
			onOk(list,values,item.postId);
		});
	}

	function Cancel() {
		onCancel()
		
	}
	function checked(checked){
		console.log(checked)
		list = checked.join(",");
	}
	const modalOpts = {
		title: type =="create"?'添加岗位':"编辑岗位",
		visible,
		onOk: handleOk,
		onCancel: Cancel,
		maskClosable: false,
		width:'800px'

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
			        	initialValue:item!={}?item.name:'',
			            rules: [{ required: true, message: '请填写岗位名称!' }],
			        })(<Input />)}
			    </FormItem>
			    <FormItem>
			    	<RuleList plainOptions = {TreeItem(TreeList)} defavalue={item!={}?item.authIds:[]} checked={checked}/>
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