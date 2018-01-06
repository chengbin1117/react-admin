import React from 'react';
import { Button, Modal, Form, Input, Radio,Select,Row,Col,Cascader,message} from 'antd';
import Upload_Image from '../Upload_Image';
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

const Content_ImageAdd_Modal = ({
  visible,
  item = {},
  type,
  onCheckOk,
  onCancel,
  selectList,
  fatherType,
  showfpModal,
  currentItem,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}) => {

  console.log(type,currentItem)
  function handleOk(value,text) {
    
      onCheckOk(value,text);
    
    
  }

  function Cancel() {
    onCancel()
    setFieldsValue({
      father: "0",
      name: ''
    });
  }
  const modalOpts = {
    title: "添加图片",
    visible,
    onOk: handleOk,
    onCancel: Cancel,
    maskClosable: false,
    footer:null
  };
  function onChange(value) {
  console.log(value);
}
 const residences = [{
      value: '1',
      label: '首页',
      children: [{
            "value":'11',
            "label":"首页banner"
         },{
            "value":'12',
            "label":"首页banner下方小幅图片"
         },{
            "value":'13',
            "label":"首页资讯列表横幅"
         },{
            "value":'14',
            "label":"首页右侧top排行上方宽幅图片"
         },{
            "value":'15',
            "label":"首页右侧热门作者下方小横幅"
         }
        ],
    }, {
      value: '2',
      label: '栏目列表',
      children: [{
          "value":'21',
          "label":"栏目页右侧top排行上方宽幅图片"
        },{

          "value":"22",
          "label":"tag列表右侧top排行上方宽幅图片"
        }]
    },{
      value: '3',
      label: '频道页',
      children: [{
            "value":'31',
            "label":"频道页banner",
           },{
            "value":'32',
            "label":"频道页banner下方小幅图片",
           },{"value":'33',
            "label":"频道页资讯列表横幅",
           },{"value":'34',
            "label":"频道页右侧热门资讯上方宽幅图片",
           },{"value":'35',
            "label":"频道页右侧热门作者上方小横幅",
      }],
    },{
      value: '4',
      label: '资讯详情',
      children: [{
          "value":'41',
          "label":"资讯详情页顶部通栏",
         },
         {
          "value":'42',
          "label":"资讯详情页正文声明下方横幅",
         },
         {
          "value":'43',
          "label":"资讯详情页右侧top排行上方宽幅图片",
         },]
    }];
   
  class DynamicRule extends React.Component {
    state = {
      checkNick: false,
      text:'',
      value:"1",
      imageDetail:'',
      Imgvalue:"",
    };
    check = (text) => {
      this.props.form.validateFields(
        (err,value) => {
          console.log(err)
          if (!err) {
            
            handleOk(value)

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
              initialValue: "",
              rules: [
                  { required: true, message: '请上传图片' },
                  {type:"string"}
              ],
              trigger:'checkimg'
            })(
              <Upload_Image checkimg={this.checkimg}/>
            )}
          </FormItem>
          <FormItem {...formItemLayout_radio} label="类型" >
              {getFieldDecorator('imgtype', {
                initialValue: '1',
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
                initialValue: '',
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
                initialValue: '',
                 rules: [
                { required: true, message: "请输入链接地址" },
                { type:"string",}
                ],
              })(
              <Input placeholder="请输入链接地址" addonBefore="Http://"

                />
          )}
          </FormItem>}
          
         
          <FormItem
                    {...formItemLayout_radio}
                    label="显示位置"
                  >
                    {getFieldDecorator('residence', {
                      rules: [{ type: 'array', required: true, message: '请选择!' }],
                    
                    })(
                      <Cascader options={residences}placeholder="请选择" />
                    )}
          </FormItem>
          <FormItem {...formItemLayout_radio} label="显示状态" className="collection-create-form_last-form-item">
            {getFieldDecorator('showStatus', {
              initialValue: "1",
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
              initialValue: '',
              rules:[{
                 required: false,message:'请输入0以上的正整数',pattern:/^[0-9]\d*$/
              }]
            })(
              <Input />
            )}
          </FormItem>
          <FormItem  style={{marginLeft:120+'px'}} className="collection-create-form_last-form-item">
              <Button type="primary" size="large" onClick={()=>this.check(this.state.Imgvalue)} style={{paddingLeft:20+"px",paddingRight:20+"px"}}> 保存</Button>
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


export default Form.create()(Content_ImageAdd_Modal);



 //<FormItem {...formItemLayout_radio} label="类型" >
    //        {getFieldDecorator('type', {
    //          initialValue: '1',
    //           rules: [
     //         { required: true, message: '请选择类型' },
     //         ],
      //      })(

       //       <RadioGroup onChange={this.hanlechange} >
        //        <Radio value="1">资讯</Radio> <Input onChange={this.inputVaule} value={value=='1'?Imgvalue:''} placeholder="请输入文章Id" disabled={this.state.value!='1'?true:false} id="error"/>
       //         <Radio value="2">广告</Radio><Input onChange={this.inputVaule} value={value=='2'?Imgvalue:""} placeholder="请输入链接地址" disabled={this.state.value!='2'?true:false}/>
         //       <Radio value="3">其他</Radio><Input onChange={this.inputVaule} value={value=='3'?Imgvalue:""} placeholder="请输入链接地址"  disabled={this.state.value!='3'?true:false}/>
         //     </RadioGroup>
         //   )}
//</FormItem>

