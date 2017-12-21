import pathToRegexp from 'path-to-regexp';
import { routerRedux,hashHistory } from 'dva/router';
import {
  login,getUserList,getUserInfo,auditUser,setHotUser,lockUser,siteinfoservice,getRoleList,roleSetStatus,getRoleProfile,loginSet,
  userInfoSet,getSysMenu,getUserCert,auditUserCert
} from '../services/user';
import {formatDate,GetRequest} from '../services/common'
import {
  message
} from 'antd';

export default {

  namespace: 'user',

  state: {
    logged: false,
    loginStatus: 1, //1为登录框；2为忘记密码，3为修改密码
    userlist:[],//用户列表
    userInfo:{},//用户信息
    selectList:[],
    loading:false,
    userRoleList:[], //用户角色列表
    RoleProfile:[], //角色资料
    currentItem:{},
    totalNumber:0,
    currentPage:1,
    UserCertList:[],
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
        history.listen(location => {
        let match = pathToRegexp('/user/user_admin').exec(location.pathname);
        let userId =localStorage.getItem("userId");
            if (match) {
              const search =GetRequest(location.search);
                dispatch({
                  type: 'getUserList',
                  payload: {
                    currentPage:parseInt(search.page),
                    pageSize:25,
                  }
                });
            }
            match = pathToRegexp('/user/realName').exec(location.pathname);
          if(match){
            const search =GetRequest(location.search);
            dispatch({
                  type: 'getUserCert',
                  payload: {
                    currentPage:search.page,
                    pageSize:25,
                  }
                });
          }
          match = pathToRegexp('/user/user_data').exec(location.pathname);
          if(match){
            const query =location.query
            dispatch({
                  type: 'getUserInfo',
                  payload: {
                      userId:query.userId,
                  }
                });
          }
          match = pathToRegexp('/user/user_role').exec(location.pathname);
          if(match){
            const query =location.query
            dispatch({
                  type: 'getRoleList',
                  payload: {
                      
                  }
                });
          }
          match = pathToRegexp('/index').exec(location.pathname);
          if(match){
            const search =GetRequest(location.search);
           ///console.log(location.search)
            dispatch({
                  type: 'getUserList',
                  payload: {
                      auditStatus:0
                  }
                });
            dispatch({
                  type: 'getSysMenu',
                  payload: {
                      userId:parseInt(search.userId),
                  }
                });
          }
        
      })
    },
  },

  effects: { * login({
      payload
    }, {
      call,
      put
    }) {
      // yield put({ type: 'showLogging'});

      const {
        username,
        password,
        dispatch
      } = payload;
        //router.push('/index');
      let  params ={
        username:payload.username,
        password:payload.password
      }
      const {
        data
      } = yield call(login, params);
      console.log(data)
      if (data && data.code == 10000) {
        localStorage.setItem("Kgtoken", data.responseBody.token);
        localStorage.setItem("userId", data.responseBody.userId);
       // console.log(hashHistory)
       dispatch(routerRedux.push('/index?userId='+data.responseBody.userId));
      
        window.location.reload()
        
      } else {
        message.error(data.message);
      }
    },
    *getUserList({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
     
      const { data } = yield call(getUserList, payload);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         //console.log(res)
            yield put({
              type: 'getUserListSuccess',
              payload:{
                userlist:res.data,
                loading:false,
                totalNumber:res.totalNumber,
                currentPage:res.currentPage
              }
            }); 
      } else {
        message.error(data.message);
        yield put({
          type: 'hideLoading',
        });
      }
    },
    *getUserInfo({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
      });

      const { data } = yield call(getUserInfo, payload);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         //console.log(res)
            yield put({
              type: 'getUserInfoSuccess',
              payload:{
                userInfo:res,
                
              }
            }); 
      } else {
        message.error(data.message);
      }
    },
    *auditUser({ payload }, {call , put}) {
      const {userId,auditStatus,auditUserId,audit,refuseReason} =payload;
      let params ={}
      if(auditStatus  ==1){
        params ={
          userId:userId,
        auditStatus:auditStatus,
        auditUserId:auditUserId
        }
        
      }else{
        params={
          userId:userId,
          auditStatus:auditStatus,
          auditUserId:auditUserId,
          refuseReason:refuseReason
        }
        
      }

      const { data } = yield call(auditUser, params);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
            message.success('设置成功')
            if(audit == 0){
              yield put({
              type: 'getUserList',
              payload:{
                auditStatus:0
              }
            }); 
            }else{
              yield put({
              type: 'getUserList',
              payload:{
               
              }
            }); 
            }
            
            yield put({
              type: 'hideExmianModal',
              payload:{
               
              }
            }); 
      } else {
        message.error(data.message);
      }
    },
    *setHotUser({ payload }, {call , put}) {
      /* yield put({
        type: 'showLoading',
      });*/

      const { data } = yield call(setHotUser, payload);
     // console.log("11",data)
      if (data && data.code == 10000) {
          message.success('设置成功')
         //console.log(res)
            yield put({
              type: 'getUserList',
              payload:{
                
              }
            }); 
             yield put({
              type: 'hideHotModal',
              payload:{
                
              }
            });
      } else {
        message.error(data.message);
        yield put({
              type: 'hideHotModal',
              payload:{
                
              }
            });
      }
    },
    *lockUser({ payload }, {call , put}) {
      const { data } = yield call(lockUser, payload);
       // console.log("11",data)
      if (data && data.code == 10000) {
          message.success('设置成功')
         //console.log(res)
            yield put({
              type: 'getUserList',
              payload:{
                
              }
            }); 
            yield put({
              type: 'hideLockModal',
              payload:{
                
              }
            }); 
      } else {
        message.error(data.message);
      }
    },
    *siteinfoservice({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
      });

      const { data } = yield call(siteinfoservice, payload);
       // console.log("11",data)
      if (data && data.code == 10000) {
          message.success('设置成功')
         
      } else {
        message.error(data.message);
      }
    },
    *getRoleList({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
      });

      const { data } = yield call(getRoleList, payload);
       // console.log("11",data)
      if (data && data.code == 10000) {
          var res = data.responseBody;
            yield put({
              type: 'getRoleListSuccess',
              payload:{
                userRoleList:res,
                
              }
            }); 
         
      } else {
        message.error(data.message);
      }
    },
    *roleSetStatus({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
       });

      const { data } = yield call(roleSetStatus, payload);
       // console.log("11",data)
      if (data && data.code == 10000) {
          message.success("设置成功")
          yield put({
              type: 'getRoleList',
              payload:{
                
              }
          }); 
      } else {
        message.error(data.message);
      }
    },
    *getRoleProfile({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
       });

      const { data } = yield call(getRoleProfile, payload);
       
      if (data && data.code == 10000) {
          var res = data.responseBody;
          yield put({
              type: 'getRoleProfileSuccess',
              payload:{
                RoleProfile:res
              }
          }); 
      } else {
        message.error(data.message);
      }
    },
    *loginSet({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
       });

      const { data } = yield call(loginSet, payload);
       console.log("11",data)
      if (data && data.code == 10000) {
        message.success('设置成功')
          /*var res = data.responseBody;
          yield put({
              type: 'getRoleProfileSuccess',
              payload:{
                RoleProfile:res
              }
          }); */
      } else {
        message.error(data.message);
      }
    },
    *userInfoSet({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
       });

      const { data } = yield call(userInfoSet, payload);

      if (data && data.code == 10000) {
        message.success('设置成功')
          /*var res = data.responseBody;
          yield put({
              type: 'getRoleProfileSuccess',
              payload:{
                RoleProfile:res
              }
          }); */
      } else {
        message.error(data.message);
      }
    },
    *getSysMenu({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
       });

      const { data } = yield call(getSysMenu, payload);

      if (data && data.code == 10000) {
          //console.log("菜单",data)
           localStorage.setItem("nav", JSON.stringify(data.responseBody));
          /*var res = data.responseBody;
          yield put({
              type: 'getRoleProfileSuccess',
              payload:{
                RoleProfile:res
              }
          }); */
      } else {
        message.error(data.message);
      }
    },
    *getUserCert({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
       });

      const { data } = yield call(getUserCert, payload);

      if (data && data.code == 10000) {
          //console.log("菜单",data)
          
          var res = data.responseBody;
          var address ="address";
          var info ="info";
          var IdCard = "IdCard";
            for (var i in res.data){
                res.data[i].createDate =formatDate(res.data[i].createDate)
                res.data[i].auditDate =formatDate(res.data[i].auditDate)
                res.data[i][address] =res.data[i].province+'-'+res.data[i].city
                res.data[i][info] ={
                  'realname':res.data[i].realname,
                  'idcardNo':res.data[i].idcardNo,
                }
               
            }

          yield put({
              type: 'getUserCertSuccess',
              payload:{
                UserCertList:res.data,
                loading:false,
                totalNumber:res.totalNumber,
                currentPage:res.currentPage
              }
          });
      } else {
        message.error(data.message);
        yield put({
        type: 'hideLoading',
       });
      }
    },
    *auditUserCert({ payload }, {call , put}) {
      /* yield put({
        type: 'showLoading',
       });*/

      const { data } = yield call(auditUserCert, payload);

      if (data && data.code == 10000) {
          //var res = data.responseBody;
          message.success('设置成功')
          yield put({
              type: 'getUserCert',
              payload:{
                
              }
          });
           yield put({
              type: 'hideRealNameModal',
              payload:{
                
              }
          }); 
           yield put({
              type: 'hideRealsModal',
              payload:{
                
              }
          });  
      } else {
        message.error(data.message);
      }
    },
  },
  reducers: {
    // showLogging(state) {
    //   return { ...state, logged: false };
    // },    
    loginSuccess(state, action) {
      // const newUser = action.payload;      
      return {...state,
        ...action.payload,
        logged: true
      };
    },
    showLoading(state, action) {
      // const newUser = action.payload;      
      return {...state,
        ...action.payload,
        loading: true
      };
    },
    hideLoading(state, action) {
      // const newUser = action.payload;      
      return {...state,
        ...action.payload,
        loading: false
      };
    },
    getUserListSuccess(state, action) {
      // const newUser = action.payload;      
      return {...state,
        ...action.payload
      };
    },
    getUserInfoSuccess(state, action) {    
      return {...state,
        ...action.payload
      };
    },
    showUserModal(state, action) {
      return {...state,
        ...action.payload,
        UserVisible: true
      };
    },
    hideUserModal(state, action) {
      return {...state,
        UserVisible: false
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
        AuditVisible: false
      };
    },
    showHotModal(state, action) {
      return {...state,
        HotVisible: true,
        ...action.payload
      };
    },
    hideHotModal(state, action) {
      return {...state,
        HotVisible: false,
        ...action.payload
      };
    },
    showExmianModal(state, action) {
      return {...state,
        ExmianVisible: true,
        ...action.payload
      };
    },
    hideExmianModal(state, action) {
      return {...state,
        ExmianVisible: false
      };
    },
    showRealNameModal(state, action) {
      return {...state,
       RealNameVisible: true,
       ...action.payload
      };
    },
    hideRealNameModal(state, action) {
      return {...state,
        RealNameVisible: false,
        ...action.payload
      };
    },
    showRealsModal(state, action) {
      return {...state,
       RealsVisible: true,
       ...action.payload
      };
    },
    hideRealsModal(state, action) {
      return {...state,
       RealsVisible: false,
       ...action.payload
      };
    },
    showLockModal(state, action) {
      return {...state,
        LockVisible: true,
        ...action.payload
      };
    },
    hideLockModal(state, action) {
      return {...state,
        LockVisible: false,
        ...action.payload
      };
    },
    getRoleListSuccess(state, action) {
      return {...state,
        LockVisible: false,
        ...action.payload
      };
    },
    getRoleProfileSuccess(state, action) {
      return {...state,
        LockVisible: false,
        ...action.payload
      };
    },
    getUserCertSuccess(state, action) {
      return {...state,
        LockVisible: false,
        ...action.payload
      };
    },
  },

}