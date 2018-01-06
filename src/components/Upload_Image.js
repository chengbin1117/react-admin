import React from 'react';
import { Upload, Icon, message } from 'antd';
import styles from "./search.css";
import {uploadUrl,ImgUrl} from "../services/common"

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
    } else {
      message.error('图片仅支持jpg、png、jpeg')
      isTrue = false
      return false
    }
  const is2M = file.size / 1024 / 1024 < 2;
  console.log('is2M', is2M)
  if (!is2M) {
    message.error('图片大小不超过2M');
  }
  return isTrue && is2M
}   
    var url = ImgUrl;
    var token = localStorage.getItem("Kgtoken");
    var userId = localStorage.getItem("userId");
    const headers ={
      "token":userId+"_"+token
    }
export default class Upload_Image extends React.Component {
  state = {
    loading: false,
    imageUrl:this.props.editorImg!=undefined?this.props.editorImg:''
  };

  handleChange = (info) => {
 
    if (info.file.status === 'done') {
      console.log(info.fileList[0])
      // Get this url from response in real world.
     // getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl,loading:false }));
      var img_url = info.fileList[0].response;
      this.setState({
        imageUrl:img_url.data[0].filePath,
        loading:false
      })
      this.props.checkimg(img_url.data[0].filePath)
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    const uploadButton = (
      <div className={styles.NoImg}>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        
      </div>
    );
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
            <img src={uploadUrl+imageUrl} alt="" className="avatar" className={styles.NoImg}/> :
            uploadButton
        }
      </Upload>
    );
  }
}