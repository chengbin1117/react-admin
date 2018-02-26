import pathToRegexp from 'path-to-regexp';
import { routerRedux,hashHistory } from 'dva/router';
import {
  login,getUserList,getUserInfo,auditUser,setHotUser,lockUser,siteinfoservice,getRoleList,roleSetStatus,getRoleProfile,loginSet,
  userInfoSet,getSysMenu,getUserCert,auditUserCert,getSiteInfo,logOut
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
    SiteInfo:{}
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
                    userId:search.userId!="undefined"?search.userId:null,
                    userEmail:search.userEmail!="undefined"?search.userEmail:null,
                    userMobile:search.userMobile!="undefined"?search.userMobile:null,
                    userRole:search.userRole!="undefined"?parseInt(search.userRole):null,
                    auditStatus:search.auditStatus!="undefined"?parseInt(search.auditStatus):null,
                    lockStatus:search.lockStatus!="undefined"?parseInt(search.lockStatus):null,
                    createDateStart:search.createDateStart!="undefined"?search.createDateStart:null,
                    createDateEnd:search.createDateStart!="undefined"?search.createDateEnd:null,
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
                    userId:search.userId!="undefined"?search.userId:null,
                    email:search.email!="undefined"?search.email:null,
                    mobile:search.mobile!="undefined"?search.mobile:null,
                    status:search.status!="undefined"?parseInt(search.status):null,
                    startDate:search.startDate!="undefined"?search.startDate:null,
                    endDate:search.endDate!="undefined"?search.endDate:null,
                    pageSize:25,
                  }
                });
          }
          match = pathToRegexp('/user/user_data').exec(location.pathname);
          if(match){
            const search =GetRequest(location.search);
            dispatch({
                  type: 'getUserInfo',
                  payload: {
                      userId:search.userId,
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
           match = pathToRegexp('/user/user_info').exec(location.pathname);
          if(match){
            
            dispatch({
                  type: 'getSiteInfo',
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
          /* dispatch({
                  type: 'getSysMenu',
                  payload: {
                      userId:parseInt(search.userId),
                  }
                });*/
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
          localStorage.setItem("nav", JSON.stringify(data.responseBody.menuList));
          localStorage.setItem("Kgtoken", data.responseBody.token.token);
          localStorage.setItem("userId", data.responseBody.token.userId);
          localStorage.setItem("realname", data.responseBody.realname);
          
          //localStorage.setItem("userId", data.responseBody.userId);
          
            /*yield put({
                  type:"getSysMenu",
                  payload:{
                    userId:parseInt(data.responseBody.userId),
                  }
              })*/
          
          dispatch(routerRedux.push('/index?userId='+data.responseBody.token.userId));
          window.location.reload();
          
        
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
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *auditUser({ payload }, {call , put}) {
      const {userId,auditStatus,auditUserId,audit,refuseReason,user_data} =payload;
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
            message.success('审核成功')
            if(user_data!=undefined){
              yield put(routerRedux.push('/user/user_admin?page=1'));
            }
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
       if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
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
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
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
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
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
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
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
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
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
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
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
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *loginSet({ payload }, {call , put}) {
        console.log(payload)
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
       if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *userInfoSet({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
       });

      const { data } = yield call(userInfoSet, payload);

      if (data && data.code == 10000) {
        message.success('设置成功')
          //var res = data.responseBody;
          yield put({
              type: 'getSiteInfo',
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
    *getSysMenu({ payload }, {call , put}) {
      const { data } = yield call(getSysMenu, payload);

      if (data && data.code == 10000) {
           localStorage.setItem("nav", JSON.stringify(data.responseBody));
          // window.location.reload()

      } else {
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
           yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
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
                res.data[i][address] =res.data[i].province==null?"——":res.data[i].province+(res.data[i].city=null?"":('-'+res.data[i].city))
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
        if(data.code ==10004||data.code ==10011){
           message.error(data.message,2);
          yield put(routerRedux.push('/'));
        }else{
          message.error(data.message,2);
        }
      }
    },
    *getSiteInfo({ payload }, {call , put}) {
       yield put({
        type: 'showLoading',
       });

      const { data } = yield call(getSiteInfo, payload);
      console.log(data)
      if (data && data.code == 10000) {
          var res = data.responseBody;
        yield put({
          type:"getSiteInfoSuccess",
          payload:{
            SiteInfo:res
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
    *logOut({ payload }, {call , put}) {
        const { data } = yield call(logOut, payload);
      
      if (data && data.code == 10000) {
         message.success('退出成功')
         localStorage.clear()
        yield put(routerRedux.push('/'))
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
    getSiteInfoSuccess(state, action) {    
      return {...state,
        ...action.payload
      };
    },
  },

}