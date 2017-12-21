import pathToRegexp from 'path-to-regexp';
import {
  getDataStatChart,getDay,getColumnUserList,getNormalUserList
} from '../services/data';
import {
  message
} from 'antd';

export default {

  namespace: 'center',

  state: {
    logged: false,
    ChartColumn:[],
    ColumnUserList:[],
    UserList:[],
    size:'3',
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
        history.listen(location => {
        let match = pathToRegexp('/data/data_column').exec(location.pathname);
            if (match) {
                dispatch({
                  type: 'getDataStatChart',
                  payload: {
                    startDate:getDay(-2),
                    endDate:getDay(0),
                    type:2,
                    size:'3'
                  }
                });
                dispatch({
                  type:"getColumnUserList",
                  payload:{
                    startDate:getDay(-2),
                    endDate:getDay(0),
                  }
                })
            }
          match = pathToRegexp('/data/data_user').exec(location.pathname);
          if(match){
          
            dispatch({
                  type: 'getDataStatChart',
                  payload: {
                    startDate:getDay(-2),
                    endDate:getDay(0),
                    type:1,
                    size:'3'
                  }
            });
            dispatch({
                  type:"getNormalUserList",
                  payload:{
                    startDate:getDay(-2),
                    endDate:getDay(0),
                  }
            })
          }
          
      })
    },
  },

  effects: { 
    *getDataStatChart({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      const {size} =payload;
      let params ={
        startDate:payload.startDate,
        endDate:payload.endDate,
        type:payload.type,
      }
      const { data } = yield call(getDataStatChart, params);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         //console.log(res)
            yield put({
              type: 'getDataStatChartSuccess',
              payload:{
                ChartColumn:res,
                loading:false,
                size:size
              }
            }); 
      } else {
        message.error(data.message);
      }
    },
    *getColumnUserList({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      yield put({
        type: 'hideLoading',
      });
      const { data } = yield call(getColumnUserList, payload);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         //console.log(res)
            yield put({
              type: 'getColumnUserListSuccess',
              payload:{
                ColumnUserList:res,
                loading:false,
              }
            }); 
      } else {
        message.error(data.message);
      }
    },
    *getNormalUserList({ payload }, {call , put}) {
      yield put({
        type: 'showLoading',
      });
      yield put({
        type: 'hideLoading',
      });
      const { data } = yield call(getNormalUserList, payload);
      //console.log("11",data)
      if (data && data.code == 10000) {
         var res = data.responseBody;
         //console.log(res)
            yield put({
              type: 'getNormalUserListSuccess',
              payload:{
                UserList:res,
                loading:false,
              }
            }); 
      } else {
        message.error(data.message);
      }
    },
    
  },
  reducers: {
    getDataStatChartSuccess(state, action) {
      return {...state,...action.payload};
    },
    getColumnUserListSuccess(state, action) {
      return {...state,...action.payload};
    },
    getNormalUserListSuccess(state, action) {
      return {...state,...action.payload};
    },
  },

}