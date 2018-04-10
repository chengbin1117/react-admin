import React from 'react';
import { Form, Row, Col, Input, Button, Icon,Checkbox,Tree} from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const TreeNode = Tree.TreeNode; 
import styles from '../common.css'    

  /*var RuleList =Form.create() (React.createClass({
    getInitialState() {
        return ({
            checkAll : this.props.checkAll,
            checkedChilds:[]
        });
    },
    onChangeAll(e) {
        var checked = e.target.checked;
        var value = e.target.value;
        var choosePermisson = this.props.choosePermisson;
        var defaultValue = this.props.defaultValue;
        var childs = this.props.childs;
        var checkedChilds = this.state.checkedChilds;
        var arr = [];
        this.setState({
            checkAll:checked
        });
        if(checked){
            choosePermisson.push(value);
            for(var i in childs){
                checkedChilds.push(childs[i].value)
            }
            this.props.form.setFieldsValue({
                child: checkedChilds,
            });
            console.log('childs',childs)
            console.log('全选',checkedChilds)
        }else{
            for(var i in choosePermisson){
                if(choosePermisson[i] == value){
                    choosePermisson.splice(i,1)
                }
            }
            this.props.form.setFieldsValue({
                child: [],
            });
        }
    },
    onChangeChild(checkedValue) {
        var form = this.props.form
        var checkedChilds = this.state.checkedChilds;
        var choosePermisson = this.props.choosePermisson;
        var childs = this.props.childs;
        if(checkedValue.length == 0){
            this.setState({
                checkAll:false
            })
        }else{
            this.setState({
                checkAll:true
            })
        }
        var arr = [];
        var checkedArr = this.props.checkedArr;
        for(var i in checkedValue){
            for(var j in childs){
                if(childs[j].value == checkedValue[i]){
                    arr.push(checkedValue[i])
                }
            }
        }
        var str = arr.join(',');
        console.log('str',str)
        checkedArr.push(str)
        if(arr.length == 0){
            this.setState({
                checkAll:false
            })
        }else{
            this.setState({
                checkAll:true
            })
        }
        console.log('checkedArr',checkedArr);
        console.log('arr',arr)
        console.log('checkedValue',checkedValue)
    },
    render() {
        var item = this.props.item;
        const {
            form,
            checkAll
            } = this.props;
        const {
            getFieldDecorator
            } = form;
        return (
            <Form>
                <FormItem>
                    {getFieldDecorator('parent')(
                        <Checkbox onChange = {this.onChangeAll} checked = {this.state.checkAll} >全选</Checkbox>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('child', {
                        initialValue:this.props.defaultValue
                    })(
                        <CheckboxGroup options={this.props.childs}  onChange = {this.onChangeChild}  />
                    )}
                </FormItem>
            </Form>
        );
    }
}));
*/



/*class RuleList extends React.Component {
  state = {
    expandedKeys: this.props.defavalue!=undefined?this.props.defavalue:[],
    autoExpandParent: true,
    checkedKeys: this.props.defavalue!=undefined?this.props.defavalue:[],
    selectedKeys: [],
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys,e) => {
    console.log(checkedKeys)
    this.setState({ checkedKeys })
    this.props.checked(checkedKeys)
   /* console.log(this.state.checkedKeys)
    var checkList = e.checkedNodes;
    var expandedKeys =e.node.props.root.props.expandedKeys;
    var checkUrl = [];
   console.log(checkList)
    for (var i in checkList){
      if(checkList[i].props.dataRef==undefined){
        //console.log(1)
        console.log("checkUrl",checkUrl)
        //console.log(checkedKeys.checked)
         checkUrl.push(checkList[i].key)
          //checkedKeys.push(expandedKeys.join(','))
          this.setState({ 
            checkedKeys:checkUrl
          });
          console.log(this.state.checkedKeys)
      }else{
        console.log(2)
      }
    }*/
    //var checkList =[];
    /*if(e.halfCheckedKeys.length==0){
      
      checkList = checkedKeys;
      //console.log('onCheck1', checkedKeys);
    }else{
      this.setState({ checkedKeys });
      checkList = checkedKeys;
     // checkList.push(e.halfCheckedKeys.join())
      //console.log('onCheck2', checkedKeys);
      
    }
     
   // console.log(checkList)
    //this.props.checked(checkedKeys,e.halfCheckedKeys)
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });

  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item} selectable>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  render() {
    /*console.log("props",this.props.defavalue)*/
   /* return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
        checkStrictly={true}
        multiple={true}
      >
        {this.renderTreeNodes(this.props.plainOptions)}
      </Tree>
    );
  }
}*/






   const defaultCheckedList = [];
    const chList =[]; //选中的条数
    class RuleList extends React.Component {
    state = {
      checkedList: this.defaultV(this.props.defValue),
      indeterminate: true,
      checkAll: false,
      arrs:[],
      childCheck:false,
    };
    componentDidMount(){
      if(this.props.defValue!=undefined){
        var defout = [...(this.props.defValue).split(",")];
        for(var i in defout){
          var CX =$("input[name=parentBox"+defout[i]+"]")
          //console.log(CX)
          CX[0].checked=true;
        if(CX[1]!=undefined){
            CX[1].checked=true;
          }
          
       }
      }
	}
    defaultV(value){
           // console.log("value",value);
            if(value!=undefined){
                var de = value.split(',')
                    for (var i in de){
                        de[i] =parseInt(de[i])
                    }
                return de
            }else{
                return value
            }
            
            
    }
    render() {
      // console.log(this.props.item)
      return (
        <div className={styles.checkAll}>
            <input
              type="checkbox"
              onChange={this.onCheckAllChange}
              checked  ={this.state.checkAll}
              name={"parentBox"+this.props.item.value}
              value={this.props.item.value}
              className="regularCheckbox"
             /
            >
            {this.props.item.label}    
          <br />
          <div style={{ borderBottom: '1px solid #E9E9E9',paddingBottom:20 }}>
          {this.props.child.map((x,index)=>
            <span key={x.value}>
              <input  type="checkbox"  className="regularCheckbox" value={x.value} name={"parentBox"+x.value} onChange={this.onChange}/>{x.label}
            </span>
            )}
          
           </div>
        </div>
      );
    }
    onChange = (e) => {
     // console.log(e.target.checked)
      let arrs= this.state.arrs
      if(e.target.checked){
        arrs.push(e.target.value)
        
      }else{
        for(var i in arrs){
          if(e.target.value == arrs[i]){
            arrs.splice(i,1)
          }
        }
      }
	  var CX = $("input[name^='parentBox']")  
      console.log(CX)
      this.setState({
        childCheck:e.target.checked,
        checkAll: (this.state.arrs.length)>0?true:false,
      });
    /*  var arr =this.state.arrs;
      checkedList&&checkedList.map(item=>{
            arr.push(item)
      })
      this.setState({
        arrs:arr
      })*/
      //console.log(this.props.item)
      /*console.log(checkedList)
       for(var i in checkedList){
            for(var j in this.props.item.children){
                if(this.props.item.children[j].value == checkedList[i]){
                    
                    if(this.props.item.value==checkedList[i]){
                      break
                    }else{
                      checkedList.push(this.props.item.value);
                      break
                    }
                }
            }
        }
      this.props.checked(checkedList,this.props.item)*/
      
    }
    onCheckAllChange = (e) => {
     //console.log(e.target.value)
      var arr=[];
      var params =[];
      if(!e.target.checked){
        var CX =$("input[name=parentBox"+e.target.value+"]").nextAll()[1].children
       // console.log(CX)
        for(var i in CX){
           CX[i].childNodes[0].checked=false
        }
      }
      this.setState({
        checkedList: e.target.checked ==true? arr : [],
        childCheck: e.target.checked,
        checkAll: e.target.checked,
      });
      
    }
  }
 

export default RuleList;