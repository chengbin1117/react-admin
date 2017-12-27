import React, {
  Component,
  PropTypes
} from 'react';
import { Modal, Button,Input } from 'antd';
import Uploader from './upload';
import E from 'wangeditor';
const { TextArea } = Input;
import {uploadUrl,ImgUrl} from "../services/common"
//编辑器

   class Editor extends Component {
      constructor(props, context) {
          super(props, context);
          this.state = {
            editorContent: ""
          }
      }
      componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        editor.customConfig.uploadImgServer = ImgUrl;//配置服务器上传地址
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgHooks = {

            customInsert: function (insertImg, result, editor) {
                var url = uploadUrl + result.data[0].filePath;
                insertImg(url)
            }
          
        }
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中

        editor.customConfig.onchange = html => {
          this.setState({
            editorContent: html
          })
         this.props.edtiorContent(editor.txt.html())
        }
        //console.log("编辑器内容",this.props.articleText)
        let articleText = localStorage.getItem("articleText");
        editor.create();
        editor.txt.html(articleText);
      }
      
      render() {
        return (
         
            <div ref="editorElem" style={{display:"block"}} >
            </div>
        );
      }
    }


export default Editor;
