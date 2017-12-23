import React, {
  Component,
  PropTypes
} from 'react';
import { Modal, Button,Input } from 'antd';
import Uploader from './upload';
import E from 'wangeditor';
const { TextArea } = Input;
//编辑器
   class Editor extends Component {
      constructor(props, context) {
          super(props, context);
          this.state = {
            editorContent: '',
          }
      }
      componentDidMount() {
        const elem = this.refs.editorElem
        const editor = new E(elem)
        editor.customConfig.uploadImgServer = 'http://120.78.186.139:8088/kg_imgsvr/upload';//配置服务器上传地址
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                
                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },
            timeout: function (xhr, editor) {
                // 图片上传超时时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            },

            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                var url = "https://kgcom.oss-cn-shenzhen.aliyuncs.com/" + result.data[0].filePath;
                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                insertImg(url)

                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
          
        }
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
          this.setState({
            editorContent: html
          })
         this.props.edtiorContent(editor.txt.html())
        }
        console.log("编辑器内容",this.props.articleText)
        
        editor.create();
        editor.txt.html(this.props.articleText!=undefined?this.props.articleText:'')
      }
      
      render() {
        return (
          <div >
            <div  ref="editorElem" style={{textAlign: 'left',zIndex:100}}>
            </div>
            
          </div>
        );
      }
    }


export default Editor;
