import React, {
  Component,
  PropTypes
} from 'react';
import { Modal, Button,Input } from 'antd';
import Uploader from './upload';
import E from 'wangeditor';
const { TextArea } = Input;
import {uploadUrl,ImgUrl} from "../services/common";
import styles from '../components/common.css';
//编辑器

   class Editor extends Component {
      constructor(props, context) {
          super(props, context);
          this.state = {
            editorContent: "",
            num:5000,
          }
      }
      componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        editor.customConfig.uploadImgServer = ImgUrl;//配置服务器上传地址
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
        editor.customConfig.uploadImgHooks = {

            customInsert: function (insertImg, result, editor) {
                var url = uploadUrl + result.data[0].filePath;
                insertImg(url)
            }
            
          
        }
         editor.customConfig.zIndex = 10;
         //editor.customConfig.height = 1000
         editor.customConfig.colors = [
        '#000000',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b',
        '#ffffff'
         ]
        editor.customConfig.menus = [
              'head',
              'bold',
              'italic',
              'strikeThrough',
              'underline',
              'justify',
              'foreColor',
              'image',
              'undo',
              'redo',
        ];
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中

        editor.customConfig.onchange = html => {
          this.setState({
            editorContent: html
          })
         this.props.edtiorContent(editor)
         this.props.edtiorContentText(html)
        }
        //console.log("编辑器内容",this.props.articleText)
        let articleText = localStorage.getItem("articleText");
       
        editor.create();
        editor.txt.html(articleText);
      }
      
      render() {
        return (
           
            <div ref="editorElem" style={{display:"block",width:"100%",}} className={styles.editorBox}>
            </div>
            
        );
      }
    }


export default Editor;
