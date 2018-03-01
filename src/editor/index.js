import React, {
  Component,
  PropTypes
} from 'react';
import { Modal, Button,Input,message} from 'antd';
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
        const editor = new E(elem);
        editor.customConfig.uploadImgServer = ImgUrl;//配置服务器上传地址
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024;
        editor.customConfig.pasteFilterStyle = false; //手动关闭掉粘贴样式的过滤
        editor.customConfig.customAlert = function (info) {
            // info 是需要提示的内容
            message.error(info)
        }
        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
              if(files[0].type == "image/gif"){
                    return {
                      prevent : true,
                      msg:'只能上传jpg、png、jpeg格式的图片'
                    }
              }
            },

            customInsert: function (insertImg, result, editor) {
                var url = uploadUrl + result.data[0].filePath;
                insertImg(url)
            }
            
          
        }
        editor.customConfig.linkImgCheck = function (src) {
            console.log(src) // 图片的链接

            return true // 返回 true 表示校验成功
            // return '验证失败' // 返回字符串，即校验失败的提示信息
        }
         editor.customConfig.zIndex = 10;
         //editor.customConfig.height = 1000
         editor.customConfig.colors = [
          '#000000',
          '#f00',
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
              'backColor',
              'quote',  // 引用
              'emoticon',  // 表情
              'link',  // 插入链接
              'table',  // 表格
              'image',
              'video',  // 插入视频
              'undo',
              'redo',
        ];
      //    editor.config.familys = [
      //       '宋体', '黑体', '楷体', '微软雅黑',
      //       'Arial', 'Verdana', 'Georgia'
      //   ];
      //   editor.config.fontsizes = {
      //   // 格式：'value': 'title'
      //     1: '10px',
      //     2: '13px',
      //     3: '16px',
      //     4: '19px',
      //     5: '22px',
      //     6: '25px',
      //     7: '28px'
      // };
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
       /* editor.customConfig.onfocus = function (html) {
        // html 即编辑器中的内容
        console.log('onfocus', html)
        }*/
        editor.customConfig.onchange = html => {
          html =  html.replace(/<style(([\s\S])*?)<\/style>/g, '')
          this.setState({
            editorContent: html
          })
          //console.log("编辑器内容",html)
          //console.log("编辑器文本",text)
         this.props.edtiorContent(editor)
         this.props.checkout(editor)
         this.props.edtiorContentText(html)
        }
        
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
