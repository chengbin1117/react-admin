import React from 'react';
import { Upload, Icon, message } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
   var isTrue = false;
    if (file.type === 'image/jpeg') {
      isTrue = true
    } else if (file.type === 'image/png') {
      isTrue = true
    } else if (file.type === 'image/gif') {
      isTrue = true
    } else {
      message.error('图片格式不对')
      isTrue = false
    }
  const is2M = file.size / 1024 / 1024 < 2;
  console.log('is2M', is2M)
  if (!is2M) {
    message.error('图片太大');
  }
  return isTrue && is2M
}   
    var url = "http://120.78.186.139:8088/kgapi/admin/siteimage/upload"
    var token = localStorage.getItem("Kgtoken");
    var userId = localStorage.getItem("userId");
    const headers ={
      "token":userId+"_"+token
    }
export default class Upload_Image extends React.Component {
  state = {};

  handleChange = (info) => {
    console.log(info)
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    
    return (
      <Upload
        className="avatar-uploader"
        name="file"
        showUploadList={false}
        action= {url}
        headers ={headers}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
}