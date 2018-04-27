import React from 'react';
import { Button, Modal, Form, Input, Radio,Select,Row,Col,Cascader} from 'antd';
import Upload_Image from '../Upload_Image';
import {residences} from '../../services/common';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayout_radio = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const Content_ImageEditor_Modal = ({
  visible,
   item= {},
  onCheckOk,
  onCancel,
  confirmLoading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
    resetFields
  },
}) => {

   // console.log(item)
  function handleOk(value,text,id) {
    
      onCheckOk(value,text,id);
    
    
  }

  function Cancel() {
    onCancel()
   
  }
  function afterClose(){
      resetFields()
  }
  const modalOpts = {
    title:"编辑图片",
    visible,
    onOk: handleOk,
    onCancel: Cancel,
    maskClosable: false,
    footer:null,
    afterClose:afterClose,
    destroyOnClose:true,
  };
  function onChange(value) {
  console.log(value);
}

  class DynamicRule extends React.Component {
    state = {
      checkNick: false,
      text:'',
      value:item.imageType+'',
      imageDetail:'',
      Imgvalue:item.imageDetail,
    };
    check = (text) => {
      this.props.form.validateFields(
        (err,value) => {
          if (!err) {
            
            handleOk(value,this.state.Imgvalue,item.imageId)

          }
        },
      );
    }
    inputVaule= (e) => {
        console.log(e.target.value)
        this.setState({
        Imgvalue: e.target.value,
      });
    }
    hanlechange= (e) => {
      this.setState({
        value: e.target.value,
      });
    }
    checkimg=(check)=>{
      //console.log(check)
        return check
    }
    handeleSelectChange =(value)=>{
        this.setState({
        value:value,
      });
    }
    render() {
      const { getFieldDecorator } = this.props.form;
      const {value,text,Imgvalue}=this.state;
      return (
        <Form>
          <FormItem {...formItemLayout_radio} label="添加图片">
            {getFieldDecorator('imageAddress', {
              initialValue:item.imageAddress,
              rules: [
                  { required: true, message: '请上传图片' },
                  {type:"string"}
              ],
              trigger:'checkimg'
            })(
              <Upload_Image checkimg={this.checkimg} editorImg={item.imageAddress}/>
            )}
          </FormItem>
          <FormItem {...formItemLayout_radio} label="类型" className="collection-create-form_last-form-item">
            {getFieldDecorator('type', {
              initialValue: item.imageType+'',
               rules: [
              { required: true, message: '请选择类型' },
              ],
            })(
              <Select onChange={this.handeleSelectChange}>
                    <Option value="1">资讯</Option>
                    <Option value="2">广告</Option>
                    <Option value="3">其他</Option>
              </Select>
            )}
          </FormItem>
          {this.state.value=="1"?<FormItem {...formItemLayout_radio} label="文章ID" >
              {getFieldDecorator('imageDetail', {
                initialValue: item.imageDetail||"",
                 rules: [
                { required: true, message: "请输入文章ID" },
                { type:"string",min:1,message:"文章ID必须为数字",pattern:/^[0-9]*$/ }
                ],
              })(
               <Input placeholder= "请输入文章ID"
                />
          )}
          </FormItem>:<FormItem {...formItemLayout_radio} label="链接地址">
              {getFieldDecorator('imageDetail', {
                initialValue: item.imageDetail||"",
                 rules: [
                { required: true, message: "请输入链接地址" },
                { type:"string",}
                ],
              })(
              <Input placeholder="请输入链接地址" 

                />
          )}
          </FormItem>}
          <FormItem
                    {...formItemLayout_radio}
                    label="显示位置"
                  >
                    {getFieldDecorator('residence', {
                      initialValue:[item.navigatorPos+'',item.imagePos+""],
                      rules: [{ type: 'array', required: true, message: '请选择!' }],
                    })(
                      <Cascader options={residences}placeholder="请选择" />
                    )}
                  </FormItem>
          <FormItem {...formItemLayout_radio} label="显示状态" className="collection-create-form_last-form-item">
            {getFieldDecorator('showStatus', {
              initialValue: item.imageStatus==true?"1":"0",
               rules: [
              { required: true, message: '请选择显示状态' },
              ],
            })(
              <Radio.Group>
                <Radio value="1">显示</Radio>
                <Radio value="0">隐藏</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem {...formItemLayout_radio} label="排序" className="collection-create-form_last-form-item">
            {getFieldDecorator('sort', {
              initialValue: item.imageOrder,
              rules:[{
                 required: false,message:'请输入0以上的正整数',pattern:/^[0-9]\d*$/
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem  style={{marginLeft:120+'px'}} className="collection-create-form_last-form-item">
              <Button  type="default" size="large" onClick={()=>Cancel()} style={{paddingLeft:20+"px",paddingRight:20+"px",marginLeft:10}}> 取消</Button>
              <Button type="primary" size="large" onClick={()=>this.check(this.state.Imgvalue)} style={{paddingLeft:20+"px",paddingRight:20+"px",marginLeft:30}} loading={confirmLoading}> 保存</Button>
          </FormItem>
        </Form>
      );
    }
  }
  const WrappedDynamicRule = Form.create()(DynamicRule);
  return (
      
    <Modal {...modalOpts} width='30%'>
      <WrappedDynamicRule />
    </Modal>
  );
};


export default Form.create()(Content_ImageEditor_Modal);


