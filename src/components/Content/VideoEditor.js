import React, {
  Component,
  PropTypes
} from 'react';
import {

  routerRedux,

} from 'dva/router';
import { Form, Icon, Input, Button,Badge, Checkbox, Select, Tag, Row, Col, Upload, InputNumber, Radio, Cascader, DatePicker, TimePicker, message, Modal } from 'antd';
import WrappedAdvancedSearchForm from '../AdvancedSearchForm.js';
import style_pagination from '../pagination.css';
import styles from './Content_Opinion_Show.css';
import Editor from '../../editor/index';
import $ from 'jquery';
import { uploadUrl, ImgUrl, formatDate,videoUrl,uploadVideoUrl } from "../../services/common"
import UploadVideo from '../Upload_Video.js';
import RelationModal from '../Setting/RelationUser';
import imgx from '../../assets/images/article1.jpg';
import imgy from '../../assets/images/article2.jpg';
import imgz from '../../assets/images/article3.jpg';
import moment from 'moment'
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
let artSorce = 0;
let timeDis = true;
let dis =false;
let sec = 0;
let titleNum = 0;
var n = 5000;
var x = 5000;
let isVideo = 0;
let icoType = "upload";
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 18 },
};
const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 1,
    },
  },
};

//编辑器
var value = '1';
function ArticleEditor({
  dispatch,
  imgUrl,
  ArticleList,
  ColumnList,
  UserById,
  setting,
  uploadImg,
  getBonusList,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
  },
}) {
  let merId = localStorage.getItem("userId");
  const imgArr = [imgx, imgy, imgz];  //默认背景图；

  const options = ColumnList;
 // console.log("setting",ArticleList)
  const { RelationVisible, getRelUserList } = setting;
  let AllTotal = 0;

  function handleSubmit() {
    validateFields((errors, fieldsValue) => {
      if (errors) {
        return;
      } else {
        const data = { ...getFieldsValue() };
        console.log(data);
        
        var tagsName = "";
        if (data.tag4 == undefined && data.tag5 == undefined) {
          tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3
        } else if (data.tag4 != undefined && data.tag5 == undefined) {
          tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4
        } else if (data.tag4 != undefined && data.tag5 != undefined) {
          tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4 + ',' + data.tag5
        }
        if (data.publishStatus == undefined) {
          data.publishStatus = ArticleList.publishStatus
        }
        let editArticle = 0;
        const title = data.articleTitle;
        if (title != ArticleList.articleTitle) {
          editArticle = 1
        } else {
          editArticle = 0
        }
        let videoAddress = "";
        let videoFilename = "";
        if(data.upload == "1"){
            videoAddress=videoUrl+data.videoURL[0].url;
            videoFilename= data.videoURL[0].name;
        }else{
             if(data.videoUrl.indexOf('src') != '-1') {
              data.videoUrl = data.videoUrl.replace(new RegExp("'","gm"),'"');
              data.videoUrl = 'https://'+data.videoUrl.match(/:\/\/(\S*)"/)[1];
             }else if(data.videoUrl.indexOf('http') != '-1' && data.videoUrl.indexOf('src') == '-1'){
              data.videoUrl = 'https://'+data.videoUrl.match(/:\/\/(\S*)/)[1];
             }

            videoAddress=data.videoUrl;
            videoFilename= null;
        }
        if (ArticleList.sysUser == null) {
          if (data.publishStatus == "1") {
            dispatch({
              type: 'content/publishVideo',
              payload: {
                articleId: ArticleList.articleId,
                articleTitle: data.articleTitle,
                tagnames: tagsName,
                articleText:"视频文件",
                description:data.artic,
                image: imgUrl == '' ? data.image : imgUrl,
                type: parseInt(data.type),
                columnId: parseInt(data.column[0]),
                secondColumn: parseInt(data.column[1]),
                displayStatus: parseInt(data.radioT),
                displayOrder: parseInt(data.sort),
                commentSet: data.commentSet == "true" ? true : false,
                publishSet:0,
                createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
                bonusStatus: parseInt(data.bonusStatus),
                articleSource: data.articleSource,
                articleLink: data.articleLink,
                sysUser:merId,
                publishStatus: parseInt(data.publishStatus),
                browseNum: data.browseNum,
                thumbupNum: data.thumbupNum,
                collectNum: data.collectNum,
                editArticle: editArticle,
                publishKind:2,
                videoUrl:videoAddress,
                videoFilename:videoFilename,
                textnum:0,
              }
            })
          } else {
            dispatch({
              type: 'content/publishVideo',
              payload: {
                articleId: ArticleList.articleId,
                articleTitle: data.articleTitle,
                articleText:"视频文件",
                tagnames: tagsName,
                description: data.artic,
                image: imgUrl == '' ? data.image : imgUrl,
                type: parseInt(data.type),
                columnId: parseInt(data.column[0]),
                secondColumn: parseInt(data.column[1]),
                displayStatus: parseInt(data.radioT),
                displayOrder: parseInt(data.sort),
                commentSet: data.commentSet == "true" ? true : false,
                publishSet:0,
                createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
                bonusStatus: parseInt(data.bonusStatus),
                articleSource: data.articleSource,
                articleLink: data.articleLink,
                publishStatus: parseInt(data.publishStatus),
                refuseReason: data.refuseReason,
                browseNum: data.browseNum,
                thumbupNum: data.thumbupNum,
                collectNum: data.collectNum,
                editArticle: editArticle,
                publishKind:2,
                videoUrl:videoAddress,
                videoFilename:videoFilename,
                 textnum:0,
              }
            })
          }

        } else {
          if (data.publishStatus == "1") {
            dispatch({
              type: 'content/publishVideo',
              payload: {
                articleId: ArticleList.articleId,
                articleTitle: data.articleTitle,
                tagnames: tagsName,
                articleText:"视频文件",
                description: data.artic,
                image: imgUrl == '' ? data.image : imgUrl,
                type: parseInt(data.type),
                columnId: parseInt(data.column[0]),
                secondColumn: parseInt(data.column[1]),
                displayStatus: parseInt(data.radioT),
                displayOrder: parseInt(data.sort),
                commentSet: data.commentSet == "true" ? true : false,
                publishSet:0,
                createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
                bonusStatus: parseInt(data.bonusStatus),
                articleSource: data.articleSource,
                articleLink: data.articleLink,
                sysUser: merId,
                publishStatus: parseInt(data.publishStatus),
                publishTime: data.time != undefined ? formatDate(new Date(data.time)) : null,
                browseNum: data.browseNum,
                thumbupNum: data.thumbupNum,
                collectNum: data.collectNum,
                editArticle: editArticle,
                publishKind:2,
                videoUrl:videoAddress,
                videoFilename:videoFilename,
                 textnum:0,
              }
            })
          } else {
            dispatch({
              type: 'content/publishVideo',
              payload: {
                articleId: ArticleList.articleId,
                articleTitle: data.articleTitle,
                articleText:"视频文件",
                tagnames: tagsName,
                description:data.artic,
                image: imgUrl == '' ? data.image : imgUrl,
                type: parseInt(data.type),
                columnId: parseInt(data.column[0]),
                secondColumn: parseInt(data.column[1]),
                displayStatus: parseInt(data.radioT),
                displayOrder: parseInt(data.sort),
                commentSet: data.commentSet == "true" ? true : false,
                publishSet:0,
                createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
                sysUser: merId,
                bonusStatus: parseInt(data.bonusStatus),
                articleSource: data.articleSource,
                articleLink: data.articleLink,
                publishStatus: parseInt(data.publishStatus),
                publishTime: data.time != undefined ? formatDate(new Date(data.time)) : null,
                refuseReason: data.refuseReason,
                browseNum: data.browseNum,
                thumbupNum: data.thumbupNum,
                collectNum: data.collectNum,
                editArticle: editArticle,
                publishKind:2,
                videoUrl:videoAddress,
                videoFilename:videoFilename,
                textnum:0,
              }
            })
          }
        }


      }
    })
  }
  // if (imgUrl != "") {
  //   articleList.articleImage = imgUrl
  // }

  function pubsubmit() {
    validateFields((errors) => {
      if (errors) {
        return;
      } else {
        const data = { ...getFieldsValue() };
        //console.log(data.text);
        

        var tagsName = "";
        if (data.tag4 == undefined && data.tag5 == undefined) {
          tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3
        } else if (data.tag4 != undefined && data.tag5 == undefined) {
          tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4
        } else if (data.tag4 != undefined && data.tag5 != undefined) {
          tagsName = data.tag1 + ',' + data.tag2 + ',' + data.tag3 + ',' + data.tag4 + ',' + data.tag5
        }
        console.log(imgUrl, data.image)
        if (imgUrl == "" && data.image == "") {
          message.error('请上传封面图')
          return
        }
        /*if(data.publishStatus==undefined){
          data.publishStatus=ArticleList.publishStatus
        }*/
        let videoAddress = "";
        let videoFilename = "";
        if(data.upload == "1"){
            videoAddress=videoUrl+data.videoURL[0].url;
            videoFilename= data.videoURL[0].name;
        }else{
            videoAddress=data.videoUrl;
            videoFilename= null;
        }
        let editArticle = 0;
        const title = data.articleTitle;
        if (title != ArticleList.articleTitle) {
          editArticle = 1
        } else {
          editArticle = 0
        }
        dispatch({
          type: 'content/publishVideo',
          payload: {
            articleId: ArticleList.articleId,
            articleTitle: data.articleTitle,
            tagnames: tagsName,
            articleText:"视频文件",
            description:data.artic,
            image: imgUrl == '' ? data.image : imgUrl,
            type: parseInt(data.type),
            columnId: parseInt(data.column[0]),
            secondColumn: parseInt(data.column[1]),
            displayStatus: parseInt(data.radioT),
            displayOrder: parseInt(data.sort),
            commentSet: data.commentSet == "true" ? true : false,
            publishSet: parseInt(data.radioG),
            createUser: ArticleList.createUser == null ? data.createUser : ArticleList.createUser,
            sysUser: merId,
            bonusStatus: parseInt(data.bonusStatus),
            articleSource: data.articleSource,
            articleLink: data.articleLink,
            publishStatus: 1,
            browseNum: data.browseNum,
            thumbupNum: data.thumbupNum,
            collectNum: data.collectNum,
            editArticle: editArticle,
            publishKind:2,
            videoUrl:videoAddress,
            videoFilename:videoFilename,
            textnum:0,
          }
        })
      }
    })
  }
  function typeChange(e) {
    //console.log(e.target.value)
    ArticleList.articleType = parseInt(e.target.value)
  }
  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current <= moment()
  }
  function disabledDateTime() {
    return {
      disabledHours: () => range(0, 24).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  function goBack() {
    //dispatch(routerRedux.push("/content/content_article?page=1"))
  }
  function showModal() {
    dispatch({
      type: 'content/showBgModal'
    })
  }
  function handleTime(e) {
    //console.log(e.target.value)
    if (e.target.value == "0") {
      ArticleList.publishSet = 0;
    } else {
      ArticleList.publishSet = 1;
    }

  }
  function handleChange(imgUrl) {
    //console.log(imgUrl)
    return imgUrl
  }

  function StatusonChange(e) {
    //console.log(e.target.value)
    value = e.target.value;

  }
  function showUser() {
    dispatch({
      type: "setting/showRelationModal"
    })

  }
  const RelationModalProps = {
    visible: RelationVisible,
    deskUserId: setting.deskUserId,
    onCancel() {
      dispatch({
        type: "setting/hideRelationModal"
      })
    },
    onOk(record, deskUserId) {
      //console.log(record,values)
      Modal.confirm({
        title: "确认关联前台用户吗？",
        okText: '确定',
        onOk() {
          //console.log(values,record)
          dispatch({
            type: "setting/setKgUser",
            payload: {
              userId: merId,
              kgUserId: deskUserId
            }
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      })

    },
    handleBlur(e) {
      if (e.target.value.length == 11) {
        dispatch({
          type: "setting/getUserId",
          payload: {
            userMobile: e.target.value
          }
        })
      }
    }
  }
  function ImgHandle(src) {
    //console.log("src",src)
  }
  function handlevaild(rule, value, callback) {
    var dd = value.replace(/<\/?.+?>/g, "");
    var dds = dd.replace(/ /g, "");//dds为得到后的内容
    //console.log(dds)
    let CX = dds.split('&nbsp;')
    var lg = CX.join('');
    //console.log(lg.length)
    if (lg.length == 0) {
      callback("请输入正文")
    }/*else if(lg.length>5000){
        callback("正文内容不能超过5000个字符")
      }*/else {
      callback()
    }
  }
  function checkout() {

  }
  function handleVideoChange(info){

  }
  function beforeUpload(file) {
   var isTrue = false;
    if (file.type == 'video/mp4') {
      isTrue = true
    } else {
      message.error('视频仅支持mp4格式')
      isTrue = false
      return false
    }
    const is200M = file.size / 1024 / 1024 < 200;
    //console.log('is200M', is200M)
    if (!is200M) {
       message.error('视频大小不超过200M');
    }
    return isTrue && is200M
  }
  //移除视频
  function onRemove(file){
    console.log(onRemove)
    var BTN = document.getElementById("BTN");
    BTN.innerText = '上传视频'
    message.success('删除成功')
    //return false
  }
  const props = {
      action: uploadVideoUrl,
      onChange: handleVideoChange,
      multiple: true,
      name:"file",
      accept:'.mp4',
      beforeUpload:beforeUpload,
      onRemove:onRemove  
    };
  //选择本地视频或视频链接
  function fixVideo(e){
   // console.log(e)
    ArticleList.videoType = parseInt(e.target.value)
  }
  function tagValue1(rule, value, callback) {
    //console.log(value)
    var arr = [];
    var len = 0;
    const data = { ...getFieldsValue(['tag2', 'tag3', 'tag4', 'tag5']) }
    arr.push(data.tag2, data.tag3, data.tag4, data.tag5)
    if (value == undefined || value == "") {
      callback()
    } else {
      for (var i = 0; i < value.length; i++) {
        var a = value.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
          len += 2;
        }
        else {
          len += 1;
        }
      }
      if ((len > 16 || len < 2) && value != "") {
        callback("请输入2-16个字符！")
      }
      for (var i in arr) {
        if (value == arr[i]) {
          //console.log(value,arr[i])
          callback("标签不能重复")
        }
      }
      callback()
    }
  }
  function tagValue2(rule, value, callback) {
    //console.log(value)
    var arr = [];
    var len = 0;

    const data = { ...getFieldsValue(['tag1', 'tag3', 'tag4', 'tag5']) }
    arr.push(data.tag1, data.tag3, data.tag4, data.tag5)
    if (value == undefined || value == "") {
      callback()
    } else {
      for (var i = 0; i < value.length; i++) {
        var a = value.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
          len += 2;
        }
        else {
          len += 1;
        }
      }
      if ((len > 16 || len < 2) && value != "") {
        callback("请输入2-16个字符！")
      }
      for (var i in arr) {
        if (value == arr[i]) {
          callback("标签不能重复")
        }
      }
      callback()
    }
  }
  function tagValue3(rule, value, callback) {
    //console.log(value)
    var arr = [];
    var len = 0;
    const data = { ...getFieldsValue(['tag1', 'tag2', 'tag4', 'tag5']) }
    arr.push(data.tag1, data.tag3, data.tag4, data.tag5)
    if (value == undefined || value == "") {
      callback()
    } else {
      for (var i = 0; i < value.length; i++) {
        var a = value.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
          len += 2;
        }
        else {
          len += 1;
        }
      }
      if ((len > 16 || len < 2) && value != "") {
        callback("请输入2-16个字符！")
      }
      for (var i in arr) {
        if (value == arr[i]) {
          //console.log(value,arr[i])
          callback("标签不能重复")
        }
      }
      callback()
    }
  }
  function tagValue4(rule, value, callback) {
    //console.log(value)
    var arr = [];
    var len = 0;

    const data = { ...getFieldsValue(['tag1', 'tag3', 'tag2', 'tag5']) }
    arr.push(data.tag1, data.tag2, data.tag3, data.tag5)
    if (value == undefined || value == "") {
      callback()
    } else {
      for (var i = 0; i < value.length; i++) {
        var a = value.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
          len += 2;
        }
        else {
          len += 1;
        }
      }
      if ((len > 16 || len < 2) && value != "") {
        callback("请输入2-16个字符！")
      }
      for (var i in arr) {
        if (value == arr[i]) {
          //console.log(value,arr[i])
          callback("标签不能重复")
        }
      }
      callback()
    }
  }
  function tagValue5(rule, value, callback) {
    //console.log(value)
    var arr = [];
    var len = 0;

    const data = { ...getFieldsValue(['tag1', 'tag3', 'tag4', 'tag2']) }
    arr.push(data.tag1, data.tag2, data.tag4, data.tag5)
    if (value == undefined || value == "") {
      callback()
    } else {
      for (var i = 0; i < value.length; i++) {
        var a = value.charAt(i);
        if (a.match(/[^\x00-\xff]/ig) != null) {
          len += 2;
        }
        else {
          len += 1;
        }
      }
      if ((len > 16 || len < 2) && value != "") {
        callback("请输入2-16个字符！")
      }
      for (var i in arr) {
        if (value == arr[i]) {
          //console.log(value,arr[i])
          callback("标签不能重复")
        }
      }
      callback()
    }
  }

  function normFile(info){
    console.log('Upload event:',info);
    let fileList = info.fileList; 
    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);
    icoType = "loading";
    dis =true;
    if(info.file.status=="done"){
      if(info.file.response.errorCode==10000){
        fileList = fileList.map((file) => {
            if (file.response) {
              // Component will show file.url as link
              file.url = file.response.data[0].filePath
            }
             var BTN = document.getElementById("BTN");
             BTN.innerText = '重新上传';
             icoType = "upload";
             dis = false;
            return file;
          });
      }
    }else if(info.file.status == undefined){
      return false
    }
    return fileList;
  }
  
  //验证视频链接是否为MP4格式;

  function videoUrlChange(rule, value, callback){
    console.log(value)
    var reg= RegExp(/src/);
    if(!reg.exec(value)){
      callback('请输入有效的视频链接')

    }
    callback();
  }
  //验证视频
  function fileVideo(fileList){
      //console.log(fileList)
      return fileList
  }
  //跳转预览页
  function previewPage(){
    const data = { ...getFieldsValue() };
    let videoAddress = "";
        let videoFilename = "";
        if(data.upload == "1"){
            videoAddress=videoUrl+data.videoURL[0].url;
            videoFilename= data.videoURL[0].name;
        }else{
             if(data.videoUrl.indexOf('src') != '-1') {
              data.videoUrl = data.videoUrl.replace(new RegExp("'","gm"),'"');
              data.videoUrl = 'https://'+data.videoUrl.match(/:\/\/(\S*)"/)[1];
             }else if(data.videoUrl.indexOf('http') != '-1' && data.videoUrl.indexOf('src') == '-1'){
              data.videoUrl = 'https://'+data.videoUrl.match(/:\/\/(\S*)/)[1];
             }

            videoAddress=data.videoUrl;
            videoFilename= null;
    }
    localStorage.setItem('videoFilename',videoFilename);
    localStorage.setItem('videoUrl',videoAddress);
    window.open('/#/previewVideo?articleId='+ArticleList.articleId)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormItem label="标题" {...formItemLayout}>
        {getFieldDecorator('articleTitle', {
          initialValue: ArticleList.articleTitle,
          rules: [{
            type: 'string',
            message: '标题1-64个字符,支持中英文及特殊符号，空格，不区分大小写',
            min: 1,
            max: 64,

          }, {
            required: true, message: '请输入标题!',
          }
          ],
        })(
          <Input type="text" placeholder="输入标题" style={{ width: '60%' }} />
          )}
        <span style={{ color: "#aaa", marginLeft: 20 }}>1-64个字符</span>
      </FormItem>
      <FormItem
          {...formItemLayout}
          label="视频"
        >
          {getFieldDecorator('upload', {
            initialValue:ArticleList.videoType+"",
            rules:[{
              required:true,'message':"请选择"
            }]
          })(
            <RadioGroup onChange={fixVideo}>
              <Radio value="1">本地上传</Radio>
              <Radio value="2">视频链接</Radio>
            </RadioGroup>
          )}
      </FormItem>
      {ArticleList&&ArticleList.videoType==2?
          <FormItem
          {...formItemLayout}
          label="&emsp;"
          colon ={false}
        >
          {getFieldDecorator('videoUrl', {
            initialValue:(ArticleList.videoFilename==null||ArticleList.videoFilename=="")?ArticleList.videoUrl:"",
            rules:[{
              required:true,'message':"请输入视频链接",

            }]
          })(
            <Input 
            placeholder="视频链接地址"
            style={{width:"60%"}}
            />
          )}
      </FormItem>:null}
      {ArticleList&&ArticleList.videoType==1?
      <FormItem
          {...formItemLayout}
          label="&emsp;"
          colon ={false}
        >
          {getFieldDecorator('videoURL', {
            initialValue:ArticleList.videoList,
            valuePropName: 'fileList',
            getValueFromEvent:normFile,
            rules:[{
              required:true,'message':"请上传视频",
              type:"array"
            }]
          })(
              <Upload {...props}  listType="text" style={{width:'50%'}}>
                <Button type="primary" size="large" id="BTN">
                  <Icon type={icoType} />重新上传
                </Button>
              </Upload>
          )}
          <span>限200m以内mp4格式视频</span>
      </FormItem>:null  }
      
      <Row key='2' type="flex" justify="start" >
        <Col style={{ marginLeft: '26px' }} >
          <span className={styles.tagLabel}><span style={{ color: '#f5222d' }}>*</span>TAG标签：</span>
        </Col>
        <Col style={{ marginRight: '15px' }}>
          <FormItem extra="至少输入3个tag">
            {getFieldDecorator('tag1', {
              initialValue: ArticleList.tags != undefined ? ArticleList.tags[0] : '',
              rules: [
                {
                  required: true,
                  message: '请输入标签!',
                }, {
                  validator: tagValue1
                }],
            })(
              <Input style={{ width: '140px', marginRight: '50px' }} />
              )}

          </FormItem>
        </Col>
        <Col style={{ marginRight: '55px' }}>
          <FormItem  >
            {getFieldDecorator('tag2', {
              initialValue: ArticleList.tags != undefined ? ArticleList.tags[1] : '',
              rules: [
                {
                  required: true,
                  message: '请输入标签!',
                }, {
                  validator: tagValue2
                }],
            })(
              <Input style={{ width: '140px', }} />
              )}

          </FormItem>
        </Col>
        <Col style={{ marginRight: '55px' }}>
          <FormItem>
            {getFieldDecorator('tag3', {
              initialValue: ArticleList.tags != undefined ? ArticleList.tags[2] : '',
              rules: [
                {
                  required: true,
                  message: '请输入标签!',
                }, {
                  validator: tagValue3
                }],
            })(
              <Input style={{ width: '140px', }} />
              )}

          </FormItem>
        </Col>
        <Col style={{ marginRight: '55px' }}>
          <FormItem>
            {getFieldDecorator('tag4', {
              initialValue: ArticleList.tags != undefined ? ArticleList.tags[3] : '',
              rules: [{ required: false }, {
                validator: tagValue4
              }],
            })(
              <Input style={{ width: '140px', }} />
              )}

          </FormItem>
        </Col>
        <Col style={{ marginRight: '55px' }}>
          <FormItem  >
            {getFieldDecorator('tag5', {
              initialValue: ArticleList.tags != undefined ? ArticleList.tags[4] : '',
              rules: [{ required: false }, {
                validator: tagValue5
              }],
            })(
              <Input style={{ width: '140px', }} />
              )}

          </FormItem>
        </Col>
      </Row>

      <FormItem label="摘要" {...formItemLayout}>
        {getFieldDecorator('artic', {
          initialValue: ArticleList.articleDescription,
          rules: [{ required: true, min: 10, max: 100, message: '摘要10-100字,支持中英文,数字，符号，不区分大小写!' }],
        })(
          <TextArea style={{ minHeight: "100px" }}></TextArea>
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label={<span><span style={{ color: '#f5222d' }}>*</span>封面图</span>}
        extra="找不到合适的图片？您可以用以下任一张图作为封面图"
      >
        {getFieldDecorator('image', {
          initialValue: ArticleList.articleImage,
          rules: [{ required: false, message: '请选择图片!' },
          { type: "string", }

          ],

        })(
          <div>
            {ArticleList.articleImage == "" ? <div className={styles.bgImg} onClick={showModal}> <Icon type="plus" /></div> :
              <img onClick={showModal} src={imgUrl == "" ? uploadUrl + ArticleList.articleImage : uploadUrl + imgUrl} className={styles.bgImg} onChange={ImgHandle} />
            }
          </div>
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="&emsp;"
        colon={false}
      >
        <div>
          {imgArr.map((item, index) =>
            <img key={index} onClick={() => uploadImg(item)} src={item} className={styles.Imgx} />
          )}

        </div>
      </FormItem>
      {ArticleList && ArticleList.articleType == null ? <FormItem
        {...formItemLayout}
        label="类别"
      >
        {getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择类别!' },
          ],
        })(
          <RadioGroup onChange={typeChange}>
            <Radio value="1">原创</Radio>
            <Radio value="2">转载</Radio>
          </RadioGroup>
          )}
      </FormItem> :
        <FormItem
          {...formItemLayout}
          label="类别"
        >
          {getFieldDecorator('type', {
            initialValue: ArticleList.articleType + '',
            rules: [{ required: true, message: '请选择类别!' },
            ],
          })(
            <RadioGroup onChange={typeChange}>
              <Radio value="1">原创</Radio>
              <Radio value="2">转载</Radio>
            </RadioGroup>
            )}
        </FormItem>
      }

      {ArticleList && ArticleList.articleType == 2 ? <FormItem
        {...formItemLayout}
        label="文章来源"
      >
        {getFieldDecorator('articleSource', {
          initialValue: ArticleList.articleSource,
          rules: [{ required: true, message: '请填写转载文章来源!' },
          ],
        })(
          <Input style={{ width: "60%" }} />
          )}

      </FormItem> : null}
      {ArticleList && ArticleList.articleType == 2 ? <FormItem
        {...formItemLayout}
        label="原文链接"
      >
        {getFieldDecorator('articleLink', {
          initialValue: ArticleList.articleLink,
          rules: [{ required: true, message: '请填写转载文章来源链接地址!' },
          ],
        })(
          <Input style={{ width: "60%" }} />
          )}
      </FormItem> : null}

      <FormItem
        {...formItemLayout}
        label="选择栏目"

      >
        {getFieldDecorator('column', {
          initialValue:[360],
          rules: [
            { required: true, message: '请选择文章栏目!' },
            { type: 'array' }
          ],
        })(
          <Cascader options={options} disabled placeholder="请选择文章栏目" style={{ width: '20%' }} />
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="显示设置"
      >
        {getFieldDecorator('radioT', {
          initialValue: ArticleList.displayStatus + '',
          rules: [
            { required: true, message: '请选择显示位置' },
          ],
        })(
          <RadioGroup>
            <Radio value="1">正常显示</Radio>
            <Radio value="2">首页置顶</Radio>
            <Radio value="3">首页推荐</Radio>
            <Radio value="4">前台隐藏</Radio>
          </RadioGroup>
          )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="排序"
      >
        {getFieldDecorator('sort', {
          initialValue: ArticleList.displayOrder,
          rules: [
            { required: false, },
          ],
        })(
          <Input style={{ width: '10%' }} />

          )}
        <span style={{ marginLeft: 20 }} className={styles.pre}>越小越靠前</span>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="浏览量"
      >
        {getFieldDecorator('browseNum', {
          initialValue: ArticleList.browseNum || 0,
          rules: [{ required: false, message: '请输入浏览量!', },

          ],
        })(
          <InputNumber style={{ width: "20%" }} min={0}
            max={5000000} />
          )}
        <span className={styles.pre}>输入限制:0-500万</span>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="点赞量"
      >
        {getFieldDecorator('thumbupNum', {
          initialValue: ArticleList.thumbupNum || 0,
          rules: [{ required: false, message: '请输入点赞量!', },

          ],
        })(
          <InputNumber style={{ width: "20%" }} min={0}
            max={500000} />
          )}
        <span className={styles.pre}>输入限制:0-50万</span>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="收藏量"
      >
        {getFieldDecorator('collectNum', {
          initialValue: ArticleList.collectNum || 0,
          rules: [{ required: false, message: '请输入收藏量!', },

          ],
        })(
          <InputNumber style={{ width: "20%" }} min={0}
            max={500000} />
          )}
        <span className={styles.pre}>输入限制:0-50万</span>
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="评论设置"
      >
        {getFieldDecorator('commentSet', {
          initialValue: ArticleList.commentSet == true ? "true" : 'false',
        })(
          <RadioGroup >
            <Radio value="true">开启评论</Radio>
            <Radio value="false">关闭评论</Radio>
          </RadioGroup>
          )}
      </FormItem>
      {(ArticleList.sysUser != null && ArticleList.createUser != null) && <FormItem
        {...formItemLayout}
        label="发布人"
        extra='注：若该文章为用户发布，则此处不可更改'
      >
        {getFieldDecorator('createUser', {
          initialValue: ArticleList.username,
          rules: [
            { required: true, message: "请选择关联账户", },
          ],
        })(
          <Input style={{ width: '20%', marginRight: 20 + 'px' }} disabled={true} />
          )}
      </FormItem>}
      {(ArticleList.sysUser == null && ArticleList.createUser != null) && <FormItem
        {...formItemLayout}
        label="发布人"
        extra='注：若该文章为用户发布，则此处不可更改,如没有关联的账户,请进入系统账号管理关联'
      >
        {getFieldDecorator('createUser', {
          initialValue: ArticleList.username,
          rules: [
            { required: true, message: "请选择关联账户", },
          ],
        })(
          <Input style={{ width: '20%', marginRight: 20 + 'px' }} disabled={true} />
          )}
      </FormItem>}
      {(ArticleList.sysUser != null && ArticleList.createUser == null) && <FormItem
        {...formItemLayout}
        label="发布人"
        extra='注：若该文章为用户发布，则此处不可更改,如没有关联的账户,请进入系统账号管理关联'
      >
        {getFieldDecorator('createUser', {
          rules: [
            { required: true, message: "请选择关联账户", },
          ],
        })(
          <Select placeholder="请选择前台账号" style={{ width: "20%" }} disabled={ArticleList.publishStatus == 0 ? false : true}>
            {getRelUserList && getRelUserList.map((item, index) =>
              <Option value={item.kgUserId + ""} key={index}>{item.kgUsername}</Option>
            )}
          </Select>
          )}
      </FormItem>}

      <FormItem
        {...formItemLayout}
        label="视频打赏"
        extra="提示：若您想设置视频奖励规则，可用已关联的前台账号进入前台个人中心-我的专栏页面进行操作。"
      >
        {getFieldDecorator('bonusStatus', {
          initialValue: ArticleList.bonusStatus != null ? ArticleList.bonusStatus + '' : '',
          rules: [
            { required: true, message: '请选择' },
          ],
        })(
          <RadioGroup>
            <Radio value='1'>开启</Radio>
            <br />
            <Radio value='0'>不开启</Radio>
          </RadioGroup>
          )}
      </FormItem>
      {ArticleList.sysUser == null ? (getBonusList != undefined && getBonusList.length != 0) ? <FormItem label="浏览奖励" {...formItemLayout}>
        {getBonusList.map((item, index) => {

          AllTotal += parseFloat(item.total)
          return (
            <Row key={index}>
              <Col span="5">
                {item.name}
              </Col>
              <Col span="5">
                {item.kind == 2 && <span>总奖励钛值{(item.value).toFixed(3)}</span>}
                {item.kind == 1 && <span>奖励钛值{item.value}个/人</span>}

              </Col>
              <Col span="9">
                最大奖励{item.max}人,{item.kind == 1 && <span>合计发放:{(item.total).toFixed(3)}钛值</span>}
              </Col>
              <Col span="5">
                {item.status == 0 && <Badge status="Default" text="未生效" />}
                {item.status == 1 && <Badge status="success" text="已生效" />}
                {item.status == 2 && <Badge status="processing" text="暂停中" />}
                {item.status == 3 && <Badge status="warning" text="已终止" />}
                {item.status == 4 && <Badge status="warning" text="已结束" />}
              </Col>
            </Row>
          )
        })}
        <Row className={styles.alltotal}>
          <Col>
            总计发放：{AllTotal && AllTotal.toFixed(3)}个
                      </Col>
        </Row>
      </FormItem> : <FormItem {...formItemLayout} label="阅读奖励">该文章暂无设置阅读奖励</FormItem> : null}
      {(ArticleList.sysUser == null && ArticleList.publishStatus == 2) ? <FormItem
        {...formItemLayout}
        label="审核处理"
      >
        {getFieldDecorator('publishStatus', {
          initialValue: (ArticleList.publishStatus != undefined && ArticleList.publishStatus == 0) ? ArticleList.publishStatus + "" : '1',
          rules: [
            { required: true, message: '请选择' },
          ],
        })(
          <RadioGroup onChange={StatusonChange}>
            <Radio value="1">通过</Radio>
            <Radio value="3">不通过</Radio>

          </RadioGroup>
          )}
      </FormItem> : null}
      {(ArticleList.sysUser == null && ArticleList.publishStatus == 2) ? <FormItem {...formItemLayout} label="&nbsp;" colon={false}>
        {getFieldDecorator('refuseReason', {
          initialValue: ArticleList.refuseReason != undefined ? ArticleList.refuseReason : '',
          rules: [{
            required: false, message: '请输入!',
          }],
        })(
          <TextArea style={{ width: "100%", minHeight: "100px" }} placeholder="不通过原因(选填)" disabled={value == 3 ? false : true
          } />
          )}
      </FormItem> : null}

      <FormItem {...formItemLayout} label="&nbsp;" colon={false}>
        <Button type="primary" onClick={handleSubmit} size="large" style={{ paddingLeft: 20, paddingRight: 20 }} disabled={dis}>保存</Button>
        {(ArticleList && ArticleList.publishStatus == 0) &&
          <Button type="primary" onClick={pubsubmit} size="large" style={{ paddingLeft: 20, paddingRight: 20, marginLeft: 30 }}>发布</Button>
        }
        <Button type="primary" onClick={handleSubmit} size="large" style={{ paddingLeft: 20, paddingRight: 20,marginLeft:30,backgroundColor:'orange' }} className={styles.preview}disabled={dis} onClick={previewPage}>预览视频</Button>
        <RelationModal {...RelationModalProps} />
      </FormItem>


    </Form>
  )
}

export default Form.create()(ArticleEditor);

{/*<FormItem
                      {...formItemLayout}
                       label="发布人"
                       extra='注：若该文章为用户发布，则此处不可更改'
                    >
                      {getFieldDecorator('createUser',{
                        initialValue:(UserById.kgUserId!=null&&UserById.kgUserId!="")?UserById.kgUserId:'',
                        rules: [
                          { required: true,message:'请关联前台用户作为发布人显示' },
                        ],
                      })(
                        <Input style={{width:'20%'}} disabled={(UserById.kgUserId!=null&&UserById.kgUserId!="")?true:false}/>

                      )}
                      {(UserById.kgUserId!=null&&UserById.kgUserId!="")?<a style={{maginLeft:30+'px'}} onClick={showUser} >关联前台用户</a>:null}
              </FormItem>
*/}