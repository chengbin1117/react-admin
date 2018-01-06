import pathToRegexp from 'path-to-regexp';
import {
  getAccountRecharge,getAccountWIthdraw,auditAccountWithdraw,getAccount,
  getAccountDiposit,getBusinessType
} from '../services/finance';
import {formatDate,GetRequest} from '../services/common'
import {
  message
} from 'antd';
import {
  routerRedux,
} from 'dva/router';
export default {

  namespace: 'finance',

  state: {
    logged: false,
    RechargeList:[],
    loading:false,
    currentPage:1,
    totalNumber:0,
    WIthdrawList:[],
    AccountList:[],
    AccountDiposit:[],
    selectList:{},
    BusinessType:[]
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
        history.listen(location => {
        let match = pathToRegexp('/finance/recharge').exec(location.pathname);
        
            
            if (match) {
                const search =GetRequest(location.search);
                dispatch({
                  type: 'getAccountRecharge',
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
            match = pathToRegexp('/finance/withdrawals').exec(location.pathname);
            if (match) {
                const search =GetRequest(location.search);
                dispatch({
                  type: 'getAccountWIthdraw',
                  payload: {
                    currentPage:search.page,
                    email:search.email!="undefined"?search.email:null,
                    mobile:search.mobile!="undefined"?search.mobile:null,
                    status:search.status!="undefined"?parseInt(search.status):null,
                    startDate:search.startDate!="undefined"?search.startDate:null,
                    endDate:search.endDate!="undefined"?search.endDate:null,
                    pageSize:25,
                  }
                });
               
            }
            match = pathToRegexp('/finance/record').exec(location.pathname);

            if (match) {
              const search =GetRequest(location.search);
              console.log(search)
                dispatch({
                  type: 'getAccount',
                  payload: {
                    currentPage:search.page,
                    flowId:search.flowId!="undefined"?search.flowId:null,
                    businessTypeId:search.businessTypeId!="undefined"?parseInt(search.businessTypeId):null,
                    email:search.email!="undefined"?search.email:null,
                    mobile:search.mobile!="undefined"?search.mobile:null,
                    startDate:search.startDate!="undefined"?search.startDate:null,
                    endDate:search.endDate!="undefined"?search.endDate:null,
                    minAmount:search.minAmount!="undefined"?parseInt(search.minAmount):null,
                    maxAmount:search.maxAmount!="undefined"?parseInt(search.maxAmount):null,
                    pageSize:25,
                  }
                });
                dispatch({
                  type:'getBusinessType',
                  payload:{

                  }
                })
            }
            match = pathToRegexp('/finance/bond').exec(location.pathname);
            if (match) {
                const search =GetRequest(location.search);
                dispatch({
                  type: 'getAccountDiposit',
                  payload: {
                    currentPage:search.page,
                    userId:search.userId!="undefined"?search.userId:null,
                    mobile:search.mobile!="undefined"?search.mobile:null,
                    startDate:search.startDate!="undefined"?search.startDate:null,
                    endDate:search.endDate!="undefined"?search.endDate:null,
                    pageSize:25,
                  }
                });
            }
            
      })
    },
  },

  effects: { 
    *getAccountRecharge({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      
      const { data } = yield call(getAccountRecharge, payload);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         //console.log(res)
            for (var i in res.data){
            
              res.data[i].rechargeTime = formatDate(res.data[i].rechargeTime)
              res.data[i].accountTime = formatDate(res.data[i].accountTime)
            }
            yield put({
              type: 'getAccountRechargeSuccess',
              payload:{
                RechargeList:res.data,
                loading:false,
                currentPage:res.currentPage,
                totalNumber:res.totalNumber,
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
    *getAccountWIthdraw({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      
      const { data } = yield call(getAccountWIthdraw, payload);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
             for (var i in res.data){
            
              res.data[i].withdrawTime = formatDate(res.data[i].withdrawTime)
              if(res.data[i].accountTime!=null){
                res.data[i].accountTime = formatDate(res.data[i].accountTime)
              }
              
            }
            yield put({
              type: 'getAccountWIthdrawSuccess',
              payload:{
                WIthdrawList:res.data,
                loading:false,
                currentPage:res.currentPage,
                totalNumber:res.totalNumber,
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
    *getAccount({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(getAccount, payload);
    
      if (data && data.code == 10000) {
         var res = data.responseBody;
            for (var i in res.data){
            
              res.data[i].flowDate = formatDate(res.data[i].flowDate)
            }
            yield put({
              type: 'getAccountSuccess',
              payload:{
                AccountList:res.data,
                loading:false,
                currentPage:res.currentPage,
                totalNumber:res.totalNumber,
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
    *getAccountDiposit({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const { data } = yield call(getAccountDiposit, payload);
     
      if (data && data.code == 10000) {
         var res = data.responseBody;
          for (var i in res.data){
            
              res.data[i].accountTime = formatDate(res.data[i].accountTime)
            }
            yield put({
              type: 'getAccountDipositSuccess',
              payload:{
                AccountDiposit:res.data,
                loading:false,
                currentPage:res.currentPage,
                totalNumber:res.totalNumber,
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
    *auditAccountWithdraw({ payload }, {call , put}) {
     
      const { data } = yield call(auditAccountWithdraw, payload);
    
      if (data && data.code == 10000) {
        message.success('审核成功')
          yield put({
            type: 'getAccountWIthdraw',
            payload:{

            }
          });
          yield put({
            type: 'hideModal',
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
    *getBusinessType({ payload }, {call , put}) {
     
      const { data } = yield call(getBusinessType, payload);
      console.log(data)
      if (data && data.code == 10000) {
          var res = data.responseBody;
          yield put({
            type: 'getBusinessTypeSuccess',
            payload:{
                BusinessType:res
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
  },
  reducers: {
    showLoading(state, action) {
      return {...state,loading:true,...action.payload};
    },
    hideLoading(state, action) {
      return {...state,loading:false,...action.payload};
    },
    getAccountRechargeSuccess(state, action) {
      return {...state,...action.payload};
    },
    getAccountWIthdrawSuccess(state, action) {
      return {...state,...action.payload};
    },
    getAccountSuccess(state, action) {
      return {...state,...action.payload};
    },
    getAccountDipositSuccess(state, action) {
      return {...state,...action.payload};
    },
    showModal(state, action) {
      return {...state,ExamineVisible:true,...action.payload};
    },
    hideModal(state, action) {
      return {...state,ExamineVisible:false,...action.payload};
    },
    getBusinessTypeSuccess(state, action) {
      return {...state,...action.payload};
    },
  },

}