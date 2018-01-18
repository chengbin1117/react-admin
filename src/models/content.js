import pathToRegexp from 'path-to-regexp';
import {
  getArticleList,setDisplayStatus,articleservice,auditArticle,getColumnList,deleteArticle,publishArticle,getArticleById,siteimagelist,addImage,deleteImage,
  getFeedbackList,deleteFeedback,setStatus,replay,ImageSetStatus,getCommentList,commentSet,deleteComment,setcommentStatus,auditComment,addColumn,deleteColumn,
  sendEmail,getSysUserById,getBonus,getArticleStat,setDisplayOrder
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
    getBonusList:[],
    artice:[],
    currentArtice:{},
    ArticleStat:{},
    secondC:{},
    firstC:[],
    saveId:0,
    preList:{}
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
              articleId:search.articleId!='undefined'?search.articleId:null,
              articleTitle:search.articleTitle!='undefined'?search.articleTitle:null,
              articleTag:search.articleTag!='undefined'?search.articleTag:null,
              publishStatus:search.publishStatus!='undefined'?parseInt(search.publishStatus):null,
              displayStatus:search.displayStatus!='undefined'?parseInt(search.displayStatus):null,
              columnId:search.columnId!='null'?parseInt(search.columnId):null,
              secondColumn:search.secondColumn!='null'?parseInt(search.secondColumn):null,
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
          let merId =localStorage.getItem("userId"); 
         // console.log("search",search.articleId)
            dispatch({
              type:'getBonus',
              payload:{
                articleId:search.articleId
              }
            });
            dispatch({
              type:'getSysUserById',
              payload:{
                userId:merId
              }
            })
            dispatch({
              type:'getColumnList',
              payload:{
                
              }
            })
        }
        match = pathToRegexp('/articlePreview').exec(location.pathname);
        if(match){
         const search =GetRequest(location.search);
          //let merId =localStorage.getItem("userId"); 
         // console.log("search",search.articleId)
            dispatch({
              type:'getArById',
              payload:{
                articleId:search.articleId
              }
            });
           
        }
        match =pathToRegexp('/content/content_image').exec(location.pathname);
        if(match){
          const search =GetRequest(location.search);
          
          dispatch({
              type:'siteimagelist',
              payload:{
                  currentPage:parseInt(search.page),
                  imageType:search.imageType!="undefined"?parseInt(search.imageType):null,
                  imageStatus:search.imageStatus!="undefined"?parseInt(search.imageStatus):null,
                  navigatorPos:search.navigatorPos!="undefined"?parseInt(search.navigatorPos):null,
                  imagePos:search.imagePos!="undefined"?parseInt(search.imagePos):null,
                  pageSize:25,
              }
            })
        }
        match =pathToRegexp('/content/content_opinion').exec(location.pathname);
        if(match){
          const search =GetRequest(location.search);
          dispatch({
              type:'getFeedbackList',
              payload:{
                  currentPage:parseInt(search.page),
                  content:search.content!='undefined'?search.content:null,
                  status:(search.status!="undefined"&&search.status!=undefined)?(search.status=="true"?true:false):null,
                  startDate:search.startDate!="undefined"?search.startDate:null,
                  endDate:search.endDate!="undefined"?search.endDate:null,
                  pageSize:25,
              }
            })
        }
        match =pathToRegexp('/content/opinion').exec(location.pathname);
         
        if(match){
          const search =GetRequest(location.search);
           dispatch({
              type:'setStatus',
              payload:{
                feedbackId:search.id
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
                content:search.content!="undefined"?search.content:null,
                status:search.status!="undefined"?search.status:null,
                startDate:search.startDate!="undefined"?search.startDate:null,
                endDate:search.endDate!="undefined"?search.endDate:null,
                displayStatus:(search.displayStatus!="undefined"&&search.displayStatus!=undefined)?(search.displayStatus=="1"?true:false):null,
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
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *setDisplayOrder({ payload }, {call , put}) {
      const {articleId,displayOrder} =payload;
      console.log(payload.search)
      let prams ={
        articleId:articleId,
        displayOrder:displayOrder
      }
      const { data } = yield call(setDisplayOrder, prams);
      //console.log("11",data)
      if (data && data.code == 10000) {
        const search =GetRequest(payload.search);
            yield put({
              type: 'getArticleList',
              payload:{
                currentPage:search.page,
                articleId:search.articleId!='undefined'?search.articleId:null,
                articleTitle:search.articleTitle!='undefined'?search.articleTitle:null,
                articleTag:search.articleTag!='undefined'?search.articleTag:null,
                publishStatus:search.publishStatus!='undefined'?parseInt(search.publishStatus):null,
                displayStatus:search.displayStatus!='undefined'?parseInt(search.displayStatus):null,
                columnId:search.columnId!='null'?parseInt(search.columnId):null,
                secondColumn:search.secondColumn!='null'?parseInt(search.secondColumn):null,
                pageSize:25,
              }
            }); 
      } else {
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *setDisplayStatus({ payload }, {call , put}) {
      const {articleId,displayStatus,updateUser,search} =payload;
      let params ={
        articleId:articleId,
        displayStatus:displayStatus,
        updateUser:updateUser
      }
      const { data } = yield call(setDisplayStatus, params);
      //console.log("11",data)

      if (data && data.code == 10000) {
         var res = data.responseBody;
         const sea =GetRequest(search)
            message.success('设置成功')
            yield put({
              type: 'getArticleList',
              payload:{
                 currentPage:sea.page,
                 articleId:sea.articleId!='undefined'?sea.articleId:null,
                 articleTitle:sea.articleTitle!='undefined'?sea.articleTitle:null,
                 articleTag:sea.articleTag!='undefined'?sea.articleTag:null,
                 publishStatus:sea.publishStatus!='undefined'?parseInt(sea.publishStatus):null,
                 displayStatus:sea.displayStatus!='undefined'?parseInt(sea.displayStatus):null,
                 columnId:sea.columnId!='null'?parseInt(sea.columnId):null,
                 secondColumn:sea.secondColumn!='null'?parseInt(sea.secondColumn):null,
                 pageSize:25,
              }
            }); 
            yield put({
              type: 'hideShowModal',
              payload:{
                
              }
            });
      } else {
        if(data.code ==10004||data.code ==10011){
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
       if(data.code ==10004||data.code ==10011){
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
                articleId:search.articleId!='undefined'?search.articleId:null,
                articleTitle:search.articleTitle!='undefined'?search.articleTitle:null,
                articleTag:search.articleTag!='undefined'?search.articleTag:null,
                publishStatus:search.publishStatus!='undefined'?parseInt(search.publishStatus):null,
                displayStatus:search.displayStatus!='undefined'?parseInt(search.displayStatus):null,
                columnId:search.columnId!='null'?parseInt(search.columnId):null,
                secondColumn:search.secondColumn!='null'?parseInt(search.secondColumn):null,
                pageSize:25,
              }
            });
            }
            
      } else {
         yield put({
            type: 'hideLoading',
         });
        if(data.code ==10004||data.code ==10011){
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
         
            message.success('成功')
           yield put(routerRedux.push('/content/content_article?page=1'));
           
         
         
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
        if(data.code ==10004||data.code ==10011){
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
         let firstCloumn =[];
         let first ={};
         let second={};
         let childColumn = {};
         let c= [];
         let m ={}
         for (var i in res) {
            res[i].createDate =formatDate(res[i].createDate);
            for (var k in res[i].children){
              res[i].children[k].createDate =formatDate(res[i].children[k].createDate);
              res[i].children[k]['partantNavigator']=res[i].navigatorDisplay;
              res[i].children[k]['partentDisplayMode']=res[i].displayMode;
              res[i].children[k]['partentId']=res[i].id;
              res[i].children[k]['partentName']=res[i].name;
              second ={
                'value': res[i].children[k].id,
                'label': res[i].children[k].name,
              }
              //c.push(second)
             
            }
            childColumn[res[i].id]=res[i].children.map((j)=>
                     m={
                      'value':j.id,
                      'label':j.name,
                    }
                    )

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

            first ={
              'value': res[i].id,
              'label': res[i].name,
            }
            firstCloumn.push(first)
            

            arr.push(params)
         }
         //console.log(firstCloumn,childColumn)
            yield put({
              type: 'getColumnListSuccess',
              payload:{
                ColumnList:arr,
                firstC:firstCloumn,
                secondC:childColumn,
                CList:res,
                loading:false,
              }
            });
      } else {
         yield put({
            type: 'hideLoading',
         });
        if(data.code ==10004||data.code ==10011){
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
         
        if(data.code ==10004||data.code ==10011){
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
         res[tags]=res.tagnames!=null?res.tagnames.split(","):'';
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
            /*window.location.reload()*/
            localStorage.setItem("articleList", JSON.stringify(res));
            localStorage.setItem("articleText", res.articleText);
            yield put(routerRedux.push('/content/editor_article?articleId='+payload.articleId))

      } else {
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *getArById({ payload }, {call , put}) {
    
      const { data } = yield call(getArticleById, payload);
      //console.log("栏目",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         var tags = "tags";
         res[tags]=res.tagnames!=null?res.tagnames.split(","):'';
            yield put({
              type: 'getPreSuccess',
              payload:{
                preList:res,
                loading:false,
              }
            });

      } else {
        if(data.code ==10004||data.code ==10011){
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
        if(data.code ==10004||data.code ==10011){
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
     // console.log(payload)
      const {imageType,imageDetail,navigatorPos,imagePos,imageStatus,createUser,imageOrder,imageAddress,imageId}=payload;
      let params={};
      if(imageId!=undefined){
        params={
          imageType:imageType,
          imageDetail:imageDetail,
          navigatorPos:navigatorPos,
          imagePos:imagePos,
          imageStatus:imageStatus,
          createUser:createUser,
          imageOrder:imageOrder,
          imageAddress:imageAddress,
          imageId:imageId
        }
        
      }else{
        params={
          imageType:imageType,
          imageDetail:imageDetail,
          navigatorPos:navigatorPos,
          imagePos:imagePos,
          imageStatus:imageStatus,
          createUser:createUser,
          imageOrder:imageOrder,
          imageAddress:imageAddress,
        }
      }

      const { data } = yield call(addImage, params);
     
      if (data && data.code == 10000) {
        if(payload.imageId !=undefined){
          message.success('图片编辑成功');
        }else{
          message.success('图片添加成功');
        }
        const search =GetRequest(payload.search);  
        yield put({
              type: 'siteimagelist',
              payload:{
                pageSize:25,
                currentPage:parseInt(search.page),
                imageType:search.imageType!="undefined"?parseInt(search.imageType):null,
                imageStatus:search.imageStatus!="undefined"?parseInt(search.imageStatus):null,
                navigatorPos:search.navigatorPos!="undefined"?parseInt(search.navigatorPos):null,
                imagePos:search.imagePos!="undefined"?parseInt(search.imagePos):null,
              }
            }); 
            yield put({
              type: 'hideAddImgModal',
              
            });
            yield put({
              type: 'hideEditorImageModal',
              
            });  
      
      } else {
        if(data.code ==10004||data.code ==10011){
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
      //console.log("图片",data)
      if (data && data.code == 10000) {
          message.success('图片删除成功');
           const search =GetRequest(payload.search);
            yield put({
              type: 'siteimagelist',
              payload:{
                pageSize:25,
                currentPage:parseInt(search.page),
                imageType:search.imageType!="undefined"?parseInt(search.imageType):null,
                imageStatus:search.imageStatus!="undefined"?parseInt(search.imageStatus):null,
                navigatorPos:search.navigatorPos!="undefined"?parseInt(search.navigatorPos):null,
                imagePos:search.imagePos!="undefined"?parseInt(search.imagePos):null,  
              }
            }); 
      } else {
        if(data.code ==10004||data.code ==10011){
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
            yield put({
              type:"hideImageModal"
            }) 
            yield put({
              type: 'siteimagelist',
              payload:{
                
              }
            }); 
      } else {
        if(data.code ==10004||data.code ==10011){
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
                totalNumber:data.responseBody.totalNumber,
                currentPage:res.currentPage,
                loading:false,

              }
            }); 
      } else {
       if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *deleteFeedback({ payload }, {call , put}) {
      const {feedbackId,search} =payload;
      let params ={
        feedbackId:feedbackId
      }
      
      const { data } = yield call(deleteFeedback, params);
      //console.log("图片",data)
      if (data && data.code == 10000) {
           const sea = GetRequest(search)
            message.success('删除成功'); 
            yield put({
              type: 'getFeedbackList',
              payload:{
                currentPage:sea.page,
                pageSize:25
              }
            }); 
      } else {
       if(data.code ==10004||data.code ==10011){
          
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *setStatus({ payload }, {call , put}) {
      
      const { data } = yield call(setStatus, payload);
      //console.log("图片",data)
      if (data && data.code == 10000) {
            
      } else {
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *replay({ payload }, {call , put}) {
     
      const { data } = yield call(replay, payload);
      //console.log("图片",data)
      if (data && data.code == 10000) {
           message.success('保存成功'); 
           yield put(routerRedux.push('/content/content_opinion?page=1'))
      } else {
        if(data.code ==10004||data.code ==10011){
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
          if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *commentSet({ payload }, {call , put}) {
      
      const { data } = yield call(commentSet, payload);
          
      if (data && data.code == 10000) {
            message.success('设置成功')
            yield put({
              type: 'hideCommentSet',
           })
      
      } else {
        if(data.code ==10004||data.code ==10011){
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
                content:search.content!="undefined"?search.content:null,
                status:search.status!="undefined"?search.status:null,
                startDate:search.startDate!="undefined"?search.startDate:null,
                endDate:search.endDate!="undefined"?search.endDate:null,
                displayStatus:(search.displayStatus!="undefined"&&search.displayStatus!=undefined)?(search.displayStatus=="1"?true:false):null,
                pageSize:25,
              }

           })
      } else {
       if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
           yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *setcommentStatus({ payload }, {call , put}) {
      const {commentIds,displayStatus} =payload;
      let params ={
        commentIds:commentIds,
        displayStatus:displayStatus
      }
      const { data } = yield call(setcommentStatus, params);
          
      if (data && data.code == 10000) {
        const search = GetRequest(payload.search)
          message.success('设置成功')
         
           yield put({
              type: 'getCommentList',
              payload:{
                currentPage:search.page,
                content:search.content!="undefined"?search.content:null,
                status:search.status!="undefined"?search.status:null,
                startDate:search.startDate!="undefined"?search.startDate:null,
                endDate:search.endDate!="undefined"?search.endDate:null,
                displayStatus:(search.displayStatus!="undefined"&&search.displayStatus!=undefined)?(search.displayStatus=="1"?true:false):null,
                pageSize:25
              }
           })
           yield put({
              type: 'hideSetModal',
              
           })
      } else {
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *auditComment({ payload }, {call , put}) {
      
      const {commentId,status,refuseReason} =payload;

      let params ={};
      if(status == 1){
         params ={
          commentId:commentId,
          status:status,

        }
      }else{
        params ={
          commentId:commentId,
          status:status,
          refuseReason:refuseReason
        }
      }
      
      const { data } = yield call(auditComment, params);
          
      if (data && data.code == 10000) {
        const search = GetRequest(payload.search)
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
                currentPage:search.page,
                content:search.content!="undefined"?search.content:null,
                status:search.status!="undefined"?search.status:null,
                startDate:search.startDate!="undefined"?search.startDate:null,
                endDate:search.endDate!="undefined"?search.endDate:null,
                displayStatus:(search.displayStatus!="undefined"&&search.displayStatus!=undefined)?(search.displayStatus=="1"?true:false):null,
                pageSize:25
              }

           })
      } else {
        if(data.code ==10004||data.code ==10011){
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
          //yield put(routerRedux.push('/content/content_column?page=1'))
          //window.location.reload()
      } else {
        if(data.code ==10004||data.code ==10011){
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
        if(data.code ==10004||data.code ==10011){
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
        if(data.code ==10004||data.code ==10011){
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
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *publishSave({ payload }, {call , put}) {
      const {list,aoSave,autoSaveInterval}=payload;
      window.clearInterval(autoSaveInterval);
      let params= {};
      if(list.articleId ==""){
         params={
          articleTitle:list.articleTitle,
          articleText:list.articleText,
          publishStatus:0,
          tagnames:list.tagnames,
          description:list.description,
          image:list.image,
          type:list.type,
          columnId:list.columnId,
          secondColumn:list.columnId,
          displayStatus:list.displayStatus,
          displayOrder:list.displayOrder,
          articleSource:list.articleSource,
          articleLink:list.articleLink,
          commentSet:list.commentSet,
          publishSet:list.publishSet,
          createUser:list.createUser,
          sysUser:list.sysUser,
          bonusStatus:list.bonusStatus,
          textnum:list.textnum,
          browseNum:list.browseNum,
          thumbupNum:list.thumbupNum,
          collectNum:list.collectNum

        }
      }else{
        params={
          articleTitle:list.articleTitle,
          articleText:list.articleText,
          publishStatus:0,
          articleId:list.articleId,
          tagnames:list.tagnames,
          description:list.description,
          image:list.image,
          type:list.type,
          columnId:list.columnId,
          secondColumn:list.columnId,
          displayStatus:list.displayStatus,
          displayOrder:list.displayOrder,
          articleSource:list.articleSource,
          articleLink:list.articleLink,
          commentSet:list.commentSet,
          publishSet:list.publishSet,
          createUser:list.createUser,
          sysUser:list.sysUser,
          bonusStatus:list.bonusStatus,
          textnum:list.textnum,
          browseNum:list.browseNum,
          thumbupNum:list.thumbupNum,
          collectNum:list.collectNum

        }
      }
   
      const { data } = yield call(publishArticle, params);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var id = data.responseBody;
         list.articleId = id;
         
         yield put({
             type:"saveSuccess",
             payload:{
              saveId:id
             }
         })
         window.clearInterval(autoSaveInterval);
        /* payload.autoSaveInterval = window.setInterval(function() {
                
               // aoSave(list.articleId)
              }, 10000);*/

         
         
      } else {
         
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,3);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,3);
        }
      }
    },
    *getBonus({ payload }, {call , put}) {
      let params ={
        articleId:payload.articleId
      }
      const { data } = yield call(getBonus, params);
          //console.log(data)
      if (data && data.code == 10000) {
            var res = data.responseBody;
            yield put({
              type: 'getBonusSuccess',
              payload:{
                  getBonusList:res
              }
            })
            /*yield put({
              type:"showBonsModal",
              payload:{
                artice:res,
                currentArtice:payload.record
              }
            })*/
      } else {
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *getArticleStat({ payload }, {call , put}) {
      let params ={
        articleId:payload.articleId
      }
      const { data } = yield call(getArticleStat, params);
          //console.log(data)
      if (data && data.code == 10000) {
            var res = data.responseBody;
            yield put({
              type: 'getArticleStatSuccess',
              payload:{
                  ArticleStat:res
              }
            })
            
      } else {
        if(data.code ==10004||data.code ==10011){
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
        ...action.payload,
        imgUrl:"",
        saveId:0
      };
    },
    setDisplayStatusSuccess(state, action) {    
      return {...state,
        ...action.payload,
        saveId:0
      };
    },
    getColumnListSuccess(state, action) {    
      return {...state,
        ...action.payload,
        saveId:0
      };
    },
    saveSuccess(state, action) {    
      return {...state,
        ...action.payload,
      };
    },
    siteimagelistSuccess(state, action) {    
      return {...state,
        ...action.payload,
        saveId:0
      };
    },
    showAddImgModal(state, action) {
      return {...state,
        ...action.payload,
        addImageVisible: true,
        saveId:0
      };
    },
    hideAddImgModal(state, action) {
      return {...state,
        ...action.payload,
        addImageVisible: false,
        saveId:0
      };
    },
    getFeedbackListSuccess(state, action) {
      return {...state,
        ...action.payload,
        saveId:0
      };
    },
    getCommentListSuccess(state, action) {
      return {...state,
        ...action.payload,
        saveId:0
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
        saveId:0
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
        columnEditor: true,
        saveId:0
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
    showBonsModal(state, action) {
      return {...state,
        ...action.payload,
        BonsVisible: true
      };
    },
    hideBonsModal(state, action) {
      return {...state,
        ...action.payload,
        BonsVisible: false
      };
    },
    getArticleStatSuccess(state, action) {
      return {...state,
        ...action.payload,
        saveId:0
      };
    },
    getPreSuccess(state, action) {
      return {...state,
        ...action.payload,
      };
    },
  },

}