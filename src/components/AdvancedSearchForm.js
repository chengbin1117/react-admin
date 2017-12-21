import React from 'react';
import { Form, Row, Col, Input, Button, Icon,Table,Pagination} from 'antd';
import style_search from './search.css';
import style_pagination from './pagination.css';
const FormItem = Form.Item;

 class AdvancedSearchForm extends React.Component {
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);

      this.props.handlsearch(values)
    });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  getFields() {
    // const count = this.state.expand ? 10 : 6;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return this.props.getFields(getFieldDecorator,formItemLayout);
  }
  submit(){
  	this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }
  render() {
    return (
       <div className = {style_search.search}>
	      <Form
	        className="ant-advanced-search-form"
	        onSubmit={this.handleSearch}
	      >
	        <Row gutter={40}>{this.getFields()}</Row>
	        <Row>
	          <Col span={24} style={{ textAlign: 'right' }}>
	            <Button type="primary" htmlType="submit">搜索</Button>
	            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>重置</Button>
	          </Col>
	        </Row>
	      </Form>
      </div>
    );
  }
}
const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);

export default WrappedAdvancedSearchForm;