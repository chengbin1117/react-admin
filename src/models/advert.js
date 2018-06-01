import pathToRegexp from 'path-to-regexp';
import { siteimagelist, addImage, deleteImage,ImageSetStatus } from '../services/advert';
import { formatDate, tokenLogOut, GetRequest } from '../services/common'
import {
	message
} from 'antd';
import { routerRedux } from 'dva/router';
export default {

	namespace: 'advert',

	state: {
		loading: false,
		deskUserId: '',
		currentPage: 1,
		totalNumber: 0,
		checkInfoList: [],//检索的用户表
		uploading:false,
		imageUrl:'',  //上传图片地址
		keWordArr:[], //选择的行业关键词
		selectValue:'1',//图片类型
		ImageList:[],//图片列表
		confirmLoading:false,
		currentItem:{}
	},

	subscriptions: {
		setup({
			dispatch,
			history
		}) {
			history.listen(location => {
				let match = pathToRegexp('/finance/userAward').exec(location.pathname);
				
				
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'getUserBonusList',
						payload: {
							currentPage: search.page,
							pageSize:25,
							extraBonusId: search.extraBonusId != 'undefined' ? search.extraBonusId : null,
							startTvBonus: search.startTvBonus != 'undefined' ? search.startTvBonus : null,
							endTvBonus: search.endTvBonus != 'undefined' ? search.endTvBonus : null,
							startKgBonus: search.startKgBonus != "undefined" ? search.startKgBonus : null,
							endKgBonus: search.endKgBonus != 'undefined' ? search.endKgBonus : null,
							adminName: (search.adminName == undefined||search.adminName=="undefined") ? null : Base64.decode(search.adminName),
							startTime: search.startTime != 'undefined' ? search.startTime : null,
							endTime: search.endTime != 'undefined' ? search.endTime : null,
							numStart: search.numStart != 'undefined' ? search.numStart : null,
							numEnd: search.numEnd != 'undefined' ? search.numEnd : null,
						}
					});
					
				}
				match = pathToRegexp('/advert/advert_add').exec(location.pathname);
				if(match){
					dispatch({
						type:'selectWords',
						payload:{
							keWordArr:[],
						}
					})
				}
				match = pathToRegexp('/advert/other_imgs').exec(location.pathname);
				if (match) {
					const search = GetRequest(location.search);
					dispatch({
						type: 'siteimagelist',
						payload: {
							currentPage: parseInt(search.page),
							imageType: search.imageType != "undefined" ? parseInt(search.imageType) : null,
							imageStatus: search.imageStatus != "undefined" ? parseInt(search.imageStatus) : null,
							navigatorPos: search.navigatorPos != "undefined" ? parseInt(search.navigatorPos) : null,
							imagePos: search.imagePos != "undefined" ? parseInt(search.imagePos) : null,
							pageSize: 25,
						}
					})
					dispatch({
						type: 'ImgtypeChange',
						payload: {
							selectValue:'1'
						}
					})
					dispatch({
						type: 'imgurlChange',
						payload: {
							imageUrl:'',
							uploading:false,
						}
					})
				}
			})
		},
	},

	effects: {
		*getUserBonusList({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(getUserBonusList, payload);
			// console.log(data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				
				yield put({
					type: 'publishArticleBonusSuccess',
					payload: {
						UserBonusList: res.data,
						loading: false,
						totalNumber: res.totalNumber,
						currentPage: res.currentPage,
					}
				})
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
				yield put({
					type: 'hideLoading',
				});
			}
		},
		*selectWords({ payload }, { call, put }) {
			yield put({
				type: 'selectWordsSuccess',
				payload:{
					keWordArr:payload.keWordArr
				}
			});
		},
		*imgurlChange({ payload }, { call, put }) {
			yield put({
				type: 'imgurlSuccess',
				payload:{
					uploading:payload.uploading,
					imageUrl:payload.imageUrl
				}
			});
		},
		*uploading({ payload }, { call, put }) {
			yield put({
				type: 'uploadingSuccess',
				payload:{
					uploading:payload.uploading
				}
			});
		},
		*ImgtypeChange({ payload }, { call, put }) {
			yield put({
				type: 'ImgtypeChangeSuccess',
				payload:{
					selectValue:payload.selectValue
				}
			});
		},
		*siteimagelist({ payload }, { call, put }) {
			yield put({
				type: 'showLoading',
			});
			const { data } = yield call(siteimagelist, payload);
			//console.log("图片",data)
			if (data && data.code == 10000) {
				var res = data.responseBody;
				for (var i in res.data) {
					res.data[i].createDate = formatDate(res.data[i].createDate)
				}
				yield put({
					type: 'siteimagelistSuccess',
					payload: {
						ImageList: res.data,
						loading: false,
						currentPage: res.currentPage,
						totalNumber: res.totalNumber
					}
				});
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
				yield put({
					type: 'hideLoading',
				});
			}
		},
		*addImage({ payload }, { call, put }) {
			// console.log(payload)
			let params = {};
			if (payload.imageId != undefined) {
				params = {
					imageType: payload.imageType,
					imageDetail: payload.imageDetail,
					navigatorPos: payload.navigatorPos,
					imagePos: payload.imagePos,
					imageStatus: payload.imageStatus,
					createUser: payload.createUser,
					imageOrder: payload.imageOrder,
					imageAddress: payload.imageAddress,
					imageId: payload.imageId
				}

			} else {
				params = {
					imageType: payload.imageType,
					imageDetail: payload.imageDetail,
					navigatorPos: payload.navigatorPos,
					imagePos: payload.imagePos,
					imageStatus: payload.imageStatus,
					createUser: payload.createUser,
					imageOrder: payload.imageOrder,
					imageAddress: payload.imageAddress,
				}
			}
			yield put({
				type:'showSubmitLoading'
			})
			const { data } = yield call(addImage, params);

			if (data && data.code == 10000) {
				if (payload.imageId != undefined) {
					message.success('图片编辑成功');
				} else {
					message.success('图片添加成功');
				}
				yield put({
					type:'hideSubmitLoading'
				})
				yield put({
					type:'hideModal'
				})
				yield put({
					type:'hideEditorModal'
				})
				
				const search = GetRequest(payload.search)
				yield put({
					type: 'siteimagelist',
					payload: {
						pageSize: 25,
						currentPage: parseInt(search.page),
						imageType: search.imageType != "undefined" ? parseInt(search.imageType) : null,
						imageStatus: search.imageStatus != "undefined" ? parseInt(search.imageStatus) : null,
						navigatorPos: search.navigatorPos != "undefined" ? parseInt(search.navigatorPos) : null,
						imagePos: search.imagePos != "undefined" ? parseInt(search.imagePos) : null,
					}
				});
			} else {
				yield put({
					type:'hideSubmitLoading'
				})
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*deleteImage({ payload }, { call, put }) {
			let params = {
				imageId:payload.imageId
			}
			const { data } = yield call(deleteImage, params);
			//console.log("图片",data)
			if (data && data.code == 10000) {
				message.success('图片删除成功');
				const search = GetRequest(payload.search);
				yield put({
					type: 'siteimagelist',
					payload: {
						pageSize: 25,
						currentPage: parseInt(search.page),
						imageType: search.imageType != "undefined" ? parseInt(search.imageType) : null,
						imageStatus: search.imageStatus != "undefined" ? parseInt(search.imageStatus) : null,
						navigatorPos: search.navigatorPos != "undefined" ? parseInt(search.navigatorPos) : null,
						imagePos: search.imagePos != "undefined" ? parseInt(search.imagePos) : null,
					}
				});
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},
		*ImageSetStatus({ payload }, { call, put }) {

			const { data } = yield call(ImageSetStatus, payload);
			if (data && data.code == 10000) {
				message.success('设置成功')
				yield put({
					type: "hideImageModal"
				})
				yield put({
					type: 'siteimagelist',
					payload: {

					}
				});
			} else {
				if (data.code == 10004 || data.code == 10011) {
					message.error(data.message, 2);
					yield put(routerRedux.push('/'));
				} else {
					message.error(data.message, 2);
				}
			}
		},



	},
	reducers: {
		showLoading(state, action) {
			return {...state,loading: true};
		},
		hideLoading(state, action) {
			return {...state,loading: false};
		},
		showCofiomLoding(state, action) {
			return {...state,loging: true};
		},
		hideCofiomLoding(state, action) {
			return {...state,loging: false};
		},
		showSubmitLoading(state, action) {
			return {...state,confirmLoading: true};
		},
		hideSubmitLoading(state, action) {
			return {...state,confirmLoading: false};
		},
		showModal(state, action) {
			return {...state,ImgVisible: true,imageUrl:'',selectValue:'1'};
		},
		hideModal(state, action) {
			return {...state,ImgVisible: false};
		},
		showEditorModal(state, action) {
			let imageAddress = action.payload.currentItem.imageAddress;
			let imageType = action.payload.currentItem.imageType;
			return {...state,ImgEditorVisible: true,imageUrl:imageAddress,selectValue:imageType,...action.payload};
		},
		hideEditorModal(state, action) {
			return {...state,ImgEditorVisible: false,...action.payload};
		},
		selectWordsSuccess(state, action) {
			return {...state,...action.payload};
		},
		imgurlSuccess(state, action) {
			return {...state,...action.payload};
		},
		uploadingSuccess(state, action) {
			return {...state,...action.payload};
		},
		siteimagelistSuccess(state, action) {
			return {...state,...action.payload};
		},
		ImgtypeChangeSuccess(state, action) {
			return {...state,...action.payload};
		},
	},

}