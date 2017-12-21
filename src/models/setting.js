import pathToRegexp from 'path-to-regexp';
import {
 getBaseinfoList,deleteBaseinfo,getSysUserList,sysuserSetStatus,resetPassword,getPostList,
 getPost,getAuthTree,postSetStatus,addSysUser,setKgUser,addBaseinfo,addPost,setInfoStatus,
 getUserId

} from '../services/setting';
import {
  message
} from 'antd';
export default {

  namespace: 'setting',

  state: {
   BaseInfoList:[],
   SysUserList:[],
   PostList:[],
   getPost:[],
   TreeList:[],
   type:'create',
   currentItem:{},
   arr:[],
   item:{},
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        let match = pathToRegexp('/setting/about').exec(location.pathname);
       
        if (match) {
          dispatch({
            type: 'getBaseinfoList',
            payload: {
              
            }
          });
        }
        match = pathToRegexp('/setting/account').exec(location.pathname);
        if(match){
          dispatch({
            type: 'getSysUserList',
            payload: {
              
            }
          })
          dispatch({
            type: 'getPostList',
            payload: {
             
            }
          })
           dispatch({
            type: 'getPost',
            payload: {
             
            }
          })
           dispatch({
            type: 'getAuthTree',
            payload: {
             
            }
          })
        }
        match = pathToRegexp('/setting/addinfo').exec(location.pathname);
       
        if(match){
             const search =GetRequest(location.search);
            if(query!=undefined){
              dispatch({
                type:'getBaseinfoList',
                payload:{
                  id:search.id
                }
              })
            }
            
        }
      })
    },
  },

  effects: { 
        *getBaseinfoList({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
         
          const { data } = yield call(getBaseinfoList, payload);
         
          if (data && data.code == 10000) {
             var res = data.responseBody;
             yield put({
                type:'getBaseinfoListSuccess',
                payload:{
                    BaseInfoList:res,
                    loading:false
                }
             })
          } else {
            message.error(data.message);
             yield put({
            type: 'hideLoading',
          });
          }
        },
        *deleteBaseinfo({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
          yield put({
            type: 'hideLoading',
          });
          const { data } = yield call(deleteBaseinfo, payload);
          
          if (data && data.code == 10000) {
             var res = data.responseBody;
             yield put({
                type:'getBaseinfoList',
                payload:{
                    
                }
             })
          } else {
            message.error(data.message);
          }
        },
        *getSysUserList({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
          yield put({
            type: 'hideLoading',
          });
          const { data } = yield call(getSysUserList, payload);
            
          if (data && data.code == 10000) {
             var res = data.responseBody.data;
             yield put({
                type:'getSysUserListSuccess',
                payload:{
                    SysUserList:res
                }
             })
          } else {
            message.error(data.message);
          }
        },
        *sysuserSetStatus({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
          yield put({
            type: 'hideLoading',
          });
          const { data } = yield call(sysuserSetStatus, payload);
            console.log(data)
          if (data && data.code == 10000) {
             message.success('设置成功')
             yield put({
                type:'getSysUserList',
                payload:{
                    
                }
             })
          } else {
            message.error(data.message);
          }
        },
        *resetPassword({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
  
          const { data } = yield call(resetPassword, payload);
            console.log(data)
          if (data && data.code == 10000) {
             message.success('重置成功')
             /*yield put({
                type:'getSysUserListSuccess',
                payload:{
                    SysUserList:res
                }
             })*/
          } else {
            message.error(data.message);
          }
        },
        *getPostList({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
  
          const { data } = yield call(getPostList, payload);
            
          if (data && data.code == 10000) {
              var res = data.responseBody;
             yield put({
                type:'getPostListSuccess',
                payload:{
                    PostList:res
                }
             })
          } else {
            message.error(data.message);
          }
        },
        *getPost({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
  
          const { data } = yield call(getPost, payload);
            
          if (data && data.code == 10000) {
              var res = data.responseBody;
             yield put({
                type:'getPostSuccess',
                payload:{
                    getPost:res
                }
             })
          } else {
            message.error(data.message);
          }
        },
        *getAuthTree({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
  
          const { data } = yield call(getAuthTree, payload);
            //console.log(data)
          if (data && data.code == 10000) {
              var res = data.responseBody;
             
              yield put({
                type:'getAuthTreeSuccess',
                payload:{
                    TreeList:res
                }
             })
          } else {
            message.error(data.message);
          }
        },
        *postSetStatus({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
  
          const { data } = yield call(postSetStatus, payload);
            console.log(data)
          if (data && data.code == 10000) {
            message.success('设置成功')
              //var res = data.responseBody;
            yield put({
                type:'getPost',
                payload:{
                    
                }
             })
          } else {
            message.error(data.message);
          }
        },
        *addSysUser({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
  
          const { data } = yield call(addSysUser, payload);
            console.log(data)
          if (data && data.code == 10000) {
            message.success('添加成功')
              //var res = data.responseBody;
               yield put({
                type:'hideListModal',
                payload:{
                    
                }
             })
               yield put({
                type:'getSysUserList',
                payload:{
                  
                }
               })
          } else {
            message.error(data.message);
          }
        },
        *setKgUser({ payload }, {call , put}) {
          yield put({
            type: 'showLoading',
          });
  
          const { data } = yield call(setKgUser, payload);
            console.log(data)
          if (data && data.code == 10000) {
            message.success('关联成功')
               yield put({
                type:'hideRelationModal',
                payload:{
                    
                }
             })
               yield put({
                type:'getSysUserList',
                payload:{
                  
                }
               })
          } else {
            message.error(data.message);
          }
        },
       *addBaseinfo({ payload }, {call , put}) {
          
          const {router,infoDetail,infoOrder,infoType,createUser,infoName,infoStatus,status} =payload;
          let params ={
            infoDetail:infoDetail,
            infoOrder:infoOrder,
            infoType:infoType,
            createUser:createUser,
            infoName:infoName,
            infoStatus:infoStatus
          }
          const { data } = yield call(addBaseinfo, params);
            
          if (data && data.code == 10000) {
            if(status == "editor"){
              message.success('编辑成功')
            }else{
              message.success('添加成功')
            }
              
              router.push('/setting/about') 
          } else {
            message.error(data.message);
          }
        },
        *addPost({ payload }, {call , put}) {
        
          const {name,authIds,userId,postId,router} =payload;

          let params ={

          }
          if(postId!=undefined){
            params={
              name:name,
              authIds:authIds,
              userId:userId,
              postId:postId,
            }
          }else{
            params={
              name:name,
              authIds:authIds,
              userId:userId,
            }
          }
          const { data } = yield call(addPost, params);
            console.log(data)
          if (data && data.code == 10000) {
              if(postId!=undefined){
                message.success('编辑成功')
              }else{
                message.success('添加成功')
              }
              router.push('/setting/account')
               yield put({
                type:'hidePostModal'
               })
          
          } else {
            message.error(data.message);
          }
        },
        *setInfoStatus({ payload }, {call , put}) {
          const { data } = yield call(setInfoStatus, payload);
          if (data && data.code == 10000) {
              message.success('设置成功')
               yield put({
                type:'hidePostModal'
               })
               yield put({
                type:'getBaseinfoList'
               })
               
          } else {
            message.error(data.message);
          }
        },
        *getUserId({ payload }, {call , put}) {
          const { data } = yield call(getUserId, payload);
          console.log("data",data)
          if (data && data.code == 10000) {
             
               yield put({
                type:'getBaseinfoList'
               })
               
          } else {
            message.error(data.message);
          }
        },
   
  },
  reducers: {
    showLoading(state, action) {

      return {...state,
        loading: true,
      };
    },
    hideLoading(state, action) {

      return {...state,
        loading: false,
      };
    },
    showListModal(state, action) {
      console.log('showList', action.payload)
      return {...state,
        ...action.payload,
        listVisible: true,
        currentItem: action.payload.currentItem
      };
    },
    hideListModal(state, action) {
      return {...state,
        listVisible: false
      };
    },
    showMangeModal(state, action) {
      return {...state,
        ManageVisible: true
      };
    },
    hideMangeModal(state, action) {
      return {...state,
        ManageVisible: false
      };
    },
    showPostModal(state, action) {
      return {...state,
        ...action.payload,
        PostVisible: true
      };
    },
    hidePostModal(state, action) {
      return {...state,
        ...action.payload,
        PostVisible: false,
      };
    },
    getBaseinfoListSuccess(state, action) {
      return {...state,
        ...action.payload
      };
    },
    getSysUserListSuccess(state, action) {
      return {...state,
        ...action.payload
      };
    },
    getPostListSuccess(state, action) {
      return {...state,
        ...action.payload
      };
    },
    getPostSuccess(state, action) {
      return {...state,
        ...action.payload
      };
    },
    getAuthTreeSuccess(state, action) {
      return {...state,
        ...action.payload
      };
    },
    showRelationModal(state, action) {
      return {...state,
        RelationVisible: true,
        ...action.payload
      };
    },
    hideRelationModal(state, action) {
      return {...state,
        RelationVisible: false,
        ...action.payload
      };
    },
  },

}