import pathToRegexp from 'path-to-regexp';
import {
 getBaseinfoList,deleteBaseinfo,getSysUserList,sysuserSetStatus,resetPassword,getPostList,
 getPost,getAuthTree,postSetStatus,addSysUser,setKgUser,addBaseinfo,addPost,setInfoStatus,
 getUserId,getRelUser,unsetKgUser

} from '../services/app';
import {formatDate,tokenLogOut,GetRequest} from '../services/common'
import {
  message
} from 'antd';
import { routerRedux } from 'dva/router';
export default {

  namespace: 'app',

  state: {
   BaseInfoList:[],
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {
      history.listen(location => {
        let match = pathToRegexp('/app/editon').exec(location.pathname);
        if (match) {
          dispatch({
            type: 'getBaseinfoList',
            payload: {
              
            }
          });
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
	}
   
  },
reducers: {
    showLoading(state, action) {
      return {...state,loading: true};
    },
    hideLoading(state, action) {
		return {...state,loading: true};
	},
	showModal(state, action) {
		return {...state,addModal: true};
	},
	hideModal(state, action) {
		return {...state,addModal: false};
	},
  }
}