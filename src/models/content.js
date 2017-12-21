import pathToRegexp from 'path-to-regexp';
import {
  getArticleList,setDisplayStatus,articleservice,auditArticle,getColumnList,deleteArticle,publishArticle,getArticleById,siteimagelist,addImage,deleteImage,
  getFeedbackList,deleteFeedback,setStatus,replay,ImageSetStatus,getCommentList,commentSet,deleteComment,setcommentStatus,auditComment,addColumn,deleteColumn,
  sendEmail,getSysUserById
} from '../services/content';
import {
  message
} from 'antd';
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
    UserById:{}
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
              pageSIze:20,
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
          dispatch({
              type:'siteimagelist',
              payload:{
                
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
                      pageSize:25,
                  }
                });
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
        tokenLogOut(data)
        
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
        tokenLogOut(data)
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
       tokenLogOut(data)
      }
    },
    *auditArticle({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      yield put({
        type: 'hideLoading',
      });
      const { data } = yield call(auditArticle, payload);
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
        tokenLogOut(data)
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
        tokenLogOut(data)
      }
    },
    *getColumnList({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
     
      const { data } = yield call(getColumnList, payload);
      //console.log("栏目",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         var arr=[];
         let params ={};
         let chid ={};
         let c= [];
         for (var i in res) {
            

           /* for(var j in res[i].children){
                chid ={
                  'value': res[i].children[j].id,
                  'label': res[i].children[j].name,
                }
                c.push(chid)
            }*/
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
        tokenLogOut(data)
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
                pageSIze:25,
              }
            });
      } else {
         
        message.error(data.message);
      }
    },
    *getArticleById({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      yield put({
        type: 'hideLoading',
      });
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
      } else {
        tokenLogOut(data)
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
        tokenLogOut(data)
      }
    },
    *addImage({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(addImage, payload);
      console.log("图片",data)
      if (data && data.code == 10000) {
          message.success('图片添加成功');
            yield put({
              type: 'siteimagelist',
              payload:{
                
              }
            }); 
            yield put({
              type: 'hideAddImgModal',
              
            }); 
      } else {
        tokenLogOut(data)
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
        tokenLogOut(data)
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
        tokenLogOut(data)
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
        tokenLogOut(data)
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
        tokenLogOut(data)
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
        tokenLogOut(data)
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
        tokenLogOut(data)
      }
    },
    *getCommentList({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(getCommentList, payload);
      if (data && data.code == 10000) {
           var res = data.responseBody;
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
          tokenLogOut(data)
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
        tokenLogOut(data)
      }
    },
    *deleteComment({ payload }, {call , put}) {
      const {commentId,query} =payload;
      let params ={
        commentId:commentId
      }
      const { data } = yield call(deleteComment, params);
          
      if (data && data.code == 10000) {
           message.success('删除成功')
          // var res = data.responseBody.data;
           yield put({
              type: 'getCommentList',
              payload:{
                currentPage:query.page,
                pageSize:25,
              }

           })
      } else {
       tokenLogOut(data)
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
        tokenLogOut(data)
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
        tokenLogOut(data)
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
              type: 'getColumnList',
              payload:{
              
              }

           })
      } else {
        tokenLogOut(data)
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
        tokenLogOut(data)
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
        tokenLogOut(data)
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
        tokenLogOut(data)
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
  },

}