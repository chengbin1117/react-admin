import pathToRegexp from 'path-to-regexp';
import {
  getArticleList,setDisplayStatus,articleservice,auditArticle,getColumnList,deleteArticle,publishArticle,getArticleById,siteimagelist,addImage,deleteImage,
  getFeedbackList,deleteFeedback,setStatus,replay,ImageSetStatus,getCommentList,commentSet,deleteComment,setcommentStatus,auditComment,addColumn,deleteColumn,
  sendEmail,getSysUserById,getBonus
} from '../services/content';
import {
  message
} from 'antd';
import { routerRedux } from 'dva/router';
import {formatDate,tokenLogOut,GetRequest} from '../services/common'
export default {

  namespace: 'content',

  state: {
    logged: false,
    ArticleList:[],//文章列表
    ArticleListNumber:0, //文章总数
    loading:false,
    selectList:{},
    ColumnList:[],
    BgVisible:false,
    cruImage:'',
    ImageList:[],//图片列表
    currentItem:{},
    type:'creat',
    FeedbackList:[], //意见反馈表
    Listtotal:0,
    currentPage:1,
    CommentList:[],
    CList:[],
    type:'create',
    editorList:{},
    imgUrl:'',
    UserById:{},
    getBonuslist:[]
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
        history.listen(location => {
        let match = pathToRegexp('/content/content_article').exec(location.pathname);
        if(match){
          const search =GetRequest(location.search);
          dispatch({
            type:'getArticleList',
            payload:{
              currentPage:search.page,
              pageSize:25,

            }
          })
          dispatch({
            type:'getColumnList',
            payload:{
              
            }
          })
        }
        match = pathToRegexp('/content/release_article').exec(location.pathname);
        if(match){
         const search =GetRequest(location.search);
            dispatch({
              type:'getColumnList',
              payload:{
                
              }
            })
            dispatch({
              type:'getSysUserById',
              payload:{
                userId:search.userId
              }
            })
        }
        match = pathToRegexp('/content/editor_article').exec(location.pathname);
        if(match){
         const search =GetRequest(location.search);
         // console.log("search",search.articleId)
            dispatch({
              type:'getArticleById',
              payload:{
                articleId:search.articleId
              }
            });
            dispatch({
              type:'getColumnList',
              payload:{
                
              }
            })
        }
        match =pathToRegexp('/content/content_image').exec(location.pathname);
        if(match){
          const search =GetRequest(location.search);
          console.log("tupian",search)
          dispatch({
              type:'siteimagelist',
              payload:{
                  currentPage:parseInt(search.page),
                  pageSize:25,
              }
            })
        }
        match =pathToRegexp('/content/content_opinion').exec(location.pathname);
        if(match){
          dispatch({
              type:'getFeedbackList',
              payload:{
                
              }
            })
        }
        match =pathToRegexp('/content/content_opinion/:id').exec(location.pathname);
        if(match){
          
           dispatch({
              type:'setStatus',
              payload:{
                feedbackId:parseInt(match[1])
              }
            })
          
        }
        match =pathToRegexp('/content/content_comment').exec(location.pathname);
        if(match){

          const search =GetRequest(location.search);
         
          dispatch({
              type:'getCommentList',
              payload:{
                currentPage:parseInt(search.page),
                pageSize:25,
              }
            })
        }
        match =pathToRegexp('/content/content_column').exec(location.pathname);
         const search =GetRequest(location.search);
        if(match){
          dispatch({
              type:'getColumnList',
              payload:{
                currentPage:search.page,
                pageSize:25,
              }
            })
        }
        match = pathToRegexp('/index').exec(location.pathname);
          if(match){
            const search =GetRequest(location.search);
            dispatch({
                  type: 'getArticleList',
                  payload: {
                      publishStatus:2,
                  }
                });
            dispatch({
              type:'getColumnList',
              payload:{
                
              }
            })
          }
      })
    },
  },

  effects: { 

    *getArticleList({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
    
      const { data } = yield call(getArticleList, payload);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody.data;
         var arr= [];
         var clounm = "clounm";
            for(var i in res){
                if(res[i].secondColumnName==null){
                  res[i][clounm]=res[i].columnName;
                }else{
                  res[i][clounm]=res[i].columnName+'-'+res[i].secondColumnName;
                }
                
               
            }
         
            yield put({
              type: 'getArticleListSuccess',
              payload:{
                ArticleList:res,
                ArticleListNumber:data.responseBody.totalNumber,
                currentPage:data.responseBody.currentPage,
                loading:false,
              }
            }); 
      } else {
        yield put({
          type: 'hideLoading',
        });
        //message.error(data.message);
        //tokenLogOut(data)
        if(data.code ==10004){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *setDisplayStatus({ payload }, {call , put}) {
      const {articleId,displayStatus,updateUser,query} =payload;
      let params ={
        articleId:articleId,
        displayStatus:displayStatus,
        updateUser:updateUser
      }
      const { data } = yield call(setDisplayStatus, params);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
            message.success('设置成功')
            yield put({
              type: 'getArticleList',
              payload:{
                 currentPage:query.page,
                 pageSize:25,
              }
            }); 
            yield put({
              type: 'hideShowModal',
              payload:{
                
              }
            });
      } else {
        if(data.code ==10004){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
        
      }
    },
    *articleservice({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      yield put({
        type: 'hideLoading',
      });
      const { data } = yield call(setDisplayStatus, payload);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         console.log(res)
            yield put({
              type: 'getArticleList',
              payload:{
                currentPage:1,
                pageSIze:20,
              }
            });
      } else {
         yield put({
            type: 'hideLoading',
         });
       if(data.code ==10004){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *auditArticle({ payload }, {call , put}) {
      
      let params ={
        articleId:payload.articleId,
        auditUser:payload.auditUser,
        refuseReason:payload.refuseReason,
        columnId:payload.columnId,
        secondColumn:payload.secondColumn,
        auditStatus:payload.auditStatus

      }

      const { data } = yield call(auditArticle, params);
      //console.log("11",data)
      
      if (data && data.code == 10000) {
         message.success('审核成功')
            yield put({
              type: 'hideArticeModal',
              payload:{
                
              }
            });
            yield put({
              type:'hideModal'
            })
            if(payload.Status == 2){
              yield put({
                type: 'getArticleList',
                payload:{
                  publishStatus:2,
                }
              });
            }else{
              const search =GetRequest(payload.search);
              yield put({
              type: 'getArticleList',
              payload:{
                currentPage:search.page,
                pageSize:25,
              }
            });
            }
            
      } else {
         yield put({
            type: 'hideLoading',
         });
        if(data.code ==10004){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *publishArticle({ payload }, {call , put}) {

      const { data } = yield call(publishArticle, payload);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         if(payload.publishStatus!=undefined){
            message.success('存草稿成功')
         }else{
           message.success('发布成功')
           window.location.reload()
         }
         
         /*console.log(res)
            yield put({
              type: 'getArticleList',
              payload:{
                currentPage:1,
                pageSIze:20,
              }
            });*/
      } else {
         yield put({
            type: 'hideLoading',
         });
        if(data.code ==10004){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *getColumnList({ payload }, {call , put}) {     
      const { data } = yield call(getColumnList, payload);
      //console.log("栏目",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         var arr=[];
         let params ={};
         let chid ={};
         let c= [];
         for (var i in res) {
            res[i].createDate =formatDate(res[i].createDate);
            for (var k in res[i].children){
              res[i].children[k].createDate =formatDate(res[i].children[k].createDate);
            }
            params={
              'value': res[i].id,
              'label': res[i].name,
               children:res[i].children.map((j)=>
                     chid ={
                      'value':j.id,
                      'label':j.name,
                    }
                )
            }
            arr.push(params)
         }
            yield put({
              type: 'getColumnListSuccess',
              payload:{
                ColumnList:arr,
                CList:res,
                loading:false,
              }
            });
      } else {
         yield put({
            type: 'hideLoading',
         });
        if(data.code ==10004){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *deleteArticle({ payload }, {call , put}) {
      const{articleId,search}=payload;
      let params ={
        articleId:articleId
      }
      const { data } = yield call(deleteArticle, params);
      //console.log("栏目",data)
      if (data && data.code == 10000) {
        message.success('删除成功')
         var res = data.responseBody;
            yield put({
              type: 'getArticleList',
              payload:{
                currentPage:search.page,
                pageSize:25,
              }
            });
      } else {
         
        if(data.code ==10004){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *getArticleById({ payload }, {call , put}) {
    
      const { data } = yield call(getArticleById, payload);
      //console.log("栏目",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         var tags = "tags";
         res[tags]=res.articleTags!=null?res.articleTags.split(","):'';
            yield put({
              type: 'getArticleListSuccess',
              payload:{
                editorList:res,
                loading:false,
              }
            });
            if(res.sysUser==null||res.sysUser!=""){
               yield put({
                type: 'getBonus',
                payload:{
                  articleId:res.articleId,
                }
              });
            } 
      } else {
        if(data.code ==10004){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *siteimagelist({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(siteimagelist, payload);
      //console.log("图片",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
            for (var i in res.data){
              res.data[i].createDate = formatDate(res.data[i].createDate)
            }
            yield put({
              type: 'siteimagelistSuccess',
              payload:{
                ImageList:res.data,
                loading:false,
                currentPage:res.currentPage,
                totalNumber:res.totalNumber
              }
            }); 
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
        yield put({
          type: 'hideLoading',
        });
      }
    },
    *addImage({ payload }, {call , put}) {
    
      const { data } = yield call(addImage, payload);
     
      if (data && data.code == 10000) {
        if(payload.imageId !=undefined){
          message.success('图片编辑成功');
        }else{
          message.success('图片添加成功');
        }
          
        yield put({
              type: 'siteimagelist',
              payload:{
                
              }
            }); 
            yield put({
              type: 'hideAddImgModal',
              
            });
            yield put({
              type: 'hideEditorImageModal',
              
            });  
      
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *deleteImage({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(deleteImage, payload);
      console.log("图片",data)
      if (data && data.code == 10000) {
          message.success('图片删除成功');
            yield put({
              type: 'siteimagelist',
              payload:{
                
              }
            }); 
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *ImageSetStatus({ payload }, {call , put}) {
     
      const { data } = yield call(ImageSetStatus, payload);
      if (data && data.code == 10000) {
            message.success('设置成功')
            /*yield put({
              type: 'siteimagelist',
              payload:{
                
              }
            }); */
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *getFeedbackList({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(getFeedbackList, payload);
      //console.log("图片",data)
      if (data && data.code == 10000) {
            var res = data.responseBody.data;
             for (var i in res){
              res[i].createDate = formatDate(res[i].createDate)        
            }
            yield put({
              type: 'getFeedbackListSuccess',
              payload:{
                FeedbackList:res,
                Listtotal:data.responseBody.totalNumber,
              }
            }); 
      } else {
       if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *deleteFeedback({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(deleteFeedback, payload);
      //console.log("图片",data)
      if (data && data.code == 10000) {
            message.success('删除成功'); 
            yield put({
              type: 'getFeedbackList',
              payload:{

              }
            }); 
      } else {
       if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *setStatus({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(setStatus, payload);
      //console.log("图片",data)
      if (data && data.code == 10000) {
            
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *replay({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(replay, payload);
      //console.log("图片",data)
      if (data && data.code == 10000) {
           message.success('保存成功'); 
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *getCommentList({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(getCommentList, payload);
      if (data && data.code == 10000) {
           var res = data.responseBody;
           for (var i in res.data){
              res.data[i].createDate=formatDate(res.data[i].createDate);
           }
           yield put({
              type: 'getCommentListSuccess',
              payload:{
                CommentList:res.data,
                loading:false,
                currentPage:res.currentPage,
                totalNumber:res.totalNumber,
              }

           })
      } else {
        
          yield put({
            type: 'hideLoading',
          });
          if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *commentSet({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(commentSet, payload);
          
      if (data && data.code == 10000) {
            message.success('设置成功')
            yield put({
              type: 'hideCommentSet',
           })
      
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *deleteComment({ payload }, {call , put}) {
      const {commentId} =payload;
      let params ={
        commentId:commentId
      }
      
      const { data } = yield call(deleteComment, params);
          
      if (data && data.code == 10000) {
           message.success('删除成功')
          const search = GetRequest(payload.search)
    
           yield put({
              type: 'getCommentList',
              payload:{
                currentPage:search.page,
                pageSize:25,
              }

           })
      } else {
       if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *setcommentStatus({ payload }, {call , put}) {
      const {commentIds,displayStatus,query} =payload;
      let params ={
        commentIds:commentIds,
        displayStatus:displayStatus
      }
      const { data } = yield call(setcommentStatus, params);
          
      if (data && data.code == 10000) {
          message.success('设置成功')
         
           yield put({
              type: 'getCommentList',
              payload:{
                currentPage:query.page,
                pageSize:25
              }
           })
           yield put({
              type: 'hideSetModal',
              
           })
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *auditComment({ payload }, {call , put}) {
      
      const {commentId,status,query} =payload;
      const { data } = yield call(auditComment, payload);
          
      if (data && data.code == 10000) {
        message.success('审核成功')
          // var res = data.responseBody.data;
           yield put({
              type: 'hideExamineModal',
              payload:{
              
              }

           })
            yield put({
              type: 'getCommentList',
              payload:{
              
              }

           })
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *addColumn({ payload }, {call , put}) {
      
      const { data } = yield call(addColumn, payload);
          
      if (data && data.code == 10000) {
        if(payload.columnId!=undefined){
          message.success('修改成功')
        }else{
          message.success('添加成功')
        }
        
          // var res = data.responseBody.data;
           yield put({
              type: 'hideColumnAddModal',
              payload:{
              
              }

           })
            yield put({
              type: 'hideColumnChildModal',
              payload:{
              
              }

           })
            yield put({
              type: 'hideColumnEditorModal',
              payload:{
              
              }

           })
           
            yield put({
              type: 'getColumnList',
              payload:{
              
              }

           })
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *deleteColumn({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(deleteColumn, payload);
          
      if (data && data.code == 10000) {
        message.success('刪除成功')
            yield put({
              type: 'getColumnList',
              payload:{
              
              }

           })
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *sendEmail({ payload }, {call , put}) {
 
      const { data } = yield call(sendEmail, payload);
          
      if (data && data.code == 10000) {
        message.success('发送成功')
            yield put({
              type: 'hideOpinionModal',
              payload:{
              
              }

           })
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *getSysUserById({ payload }, {call , put}) {
 
      const { data } = yield call(getSysUserById, payload);
          //console.log(data)
      if (data && data.code == 10000) {
            var res = data.responseBody;
            yield put({
              type: 'getSysUserByIdSuccess',
              payload:{
                  UserById:res
              }

           })
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *getBonus({ payload }, {call , put}) {
 
      const { data } = yield call(getBonus, payload);
          //console.log(data)
      if (data && data.code == 10000) {
            var res = data.responseBody;
          console.log("res",res)
            yield put({
              type: 'getBonusSuccess',
              payload:{
                  getBonusList:res
              }

           })
      } else {
        if(data.code ==10004){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
  },
  reducers: {  
    showLoading(state, action) { 
      
      return {...state,
        ...action.payload,
        loading: true
      };
    },
    hideLoading(state, action) {  
      return {...state,
        ...action.payload,
        loading: false
      };
    },
    showModal(state, action) {
      return {...state,
         ...action.payload,
        AuditVisible: true
      };
    },
    hideModal(state, action) {
      return {...state,
         ...action.payload,
        AuditVisible: false
      };
    },
    showBgModal(state, action) {
      return {...state,
         ...action.payload,
        BgVisible: true
      };
    },
    hideBgModal(state, action) {
      return {...state,
        ...action.payload,
        BgVisible: false
      };
    },
    setShowModal(state, action) {
      return {...state,
        ...action.payload,
        setshow: true
      };
    },
    hideShowModal(state, action) {
      return {...state,
        ...action.payload,
        setshow: false
      };
    },
    showArticeModal(state, action) {
      return {...state,
        ...action.payload,
        articeVisible: true
      };
    },
    showfpModal(state, action) {
      return {...state,
        ...action.payload,
        FtVisible: true
      };
    },
    hidefpModal(state, action) {
      return {...state,
        ...action.payload,
        FtVisible: false
      };
    },
    hideArticeModal(state, action) {
      return {...state,
        ...action.payload,
        articeVisible: false
      };
    },
    getArticleListSuccess(state, action) {    
      return {...state,
        ...action.payload
      };
    },
    setDisplayStatusSuccess(state, action) {    
      return {...state,
        ...action.payload
      };
    },
    getColumnListSuccess(state, action) {    
      return {...state,
        ...action.payload
      };
    },
    siteimagelistSuccess(state, action) {    
      return {...state,
        ...action.payload
      };
    },
    showAddImgModal(state, action) {
      return {...state,
        ...action.payload,
        addImageVisible: true
      };
    },
    hideAddImgModal(state, action) {
      return {...state,
        ...action.payload,
        addImageVisible: false
      };
    },
    getFeedbackListSuccess(state, action) {
      return {...state,
        ...action.payload,
      };
    },
    getCommentListSuccess(state, action) {
      return {...state,
        ...action.payload,
      };
    },
    showCommentSet(state, action) {
      return {...state,
        ...action.payload,
        CommentSetVisible: true
      };
    },
    hideCommentSet(state, action) {
      return {...state,
        ...action.payload,
        CommentSetVisible: false
      };
    },
    showSetModal(state, action) {
      return {...state,
        ...action.payload,
        showSetVisible: true
      };
    },
    hideSetModal(state, action) {
      return {...state,
        ...action.payload,
        showSetVisible: false
      };
    },
    showExamineModal(state, action) {
      return {...state,
        ...action.payload,
        ExamineVisible: true
      };
    },
    hideExamineModal(state, action) {
      return {...state,
        ...action.payload,
        ExamineVisible: false
      };
    },
    showColumnAddModal(state, action) {
      return {...state,
        ...action.payload,
        ColumnAddVisbile: true
      };
    },
    hideColumnAddModal(state, action) {
      return {...state,
        ...action.payload,
        ColumnAddVisbile: false
      };
    },
    showOpinionModal(state, action) {
      return {...state,
        ...action.payload,
        OpinionVisible: true
      };
    },
    hideOpinionModal(state, action) {
      return {...state,
        ...action.payload,
        OpinionVisible: false
      };
    },
    getSysUserByIdSuccess(state, action) {
      return {...state,
        ...action.payload,
      };
    },
    showEditorImageModal(state, action) {
      return {...state,
        ...action.payload,
        EditorImageVisible: true
      };
    },
    hideEditorImageModal(state, action) {
      return {...state,
        ...action.payload,
        EditorImageVisible: false
      };
    },
    getBonusSuccess(state, action) {
      return {...state,
        ...action.payload,
      };
    },
    showImageModal(state, action) {
      return {...state,
        ...action.payload,
        ImgShowVisible: true
      };
    },
    hideImageModal(state, action) {
      return {...state,
        ...action.payload,
        ImgShowVisible: false
      };
    },
    showColumnEditorModal(state, action) {
      
      return {...state,
        ...action.payload,
        columnEditor: true
      };
    },
    hideColumnEditorModal(state, action) {
      return {...state,
        ...action.payload,
        columnEditor: false
      };
    },
    showColumnChildModal(state, action) {
      
      return {...state,
        ...action.payload,
        childCloum: true
      };
    },
    hideColumnChildModal(state, action) {
      
      return {...state,
        ...action.payload,
        childCloum: false
      };
    },
  },

}