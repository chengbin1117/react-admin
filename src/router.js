import React, {
  PropTypes
} from 'react';
/*import {
  Router,
  Route,
  IndexRoute,
  Link,
} from 'dva/router';*/
import './routes/font.less';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
// /import { Router, Route, Switch,IndexRoute} from 'dva/router';
import { Router, Route, Link, Switch, HashHistory } from 'react-router-dom';
import LayoutContainer from './components/Layout';
import UserRouter from './routes/UserLoginPage';
import Login from './routes/Login';
import IndexPage from './routes/IndexPage';

//用户
import User from './routes/User';
import UserAdmin from './routes/User_admin';
import UserData from './routes/User_data';
import UserRole from './routes/User_role';
import UserInfo from './routes/User_info';
import UserLogin from './routes/User_login';
import realName from './routes/User_realname';
import RewardDetails from './routes/RewardDetails';
import InviteRecord from './routes/InviteRecord';
import Master from './routes/Master';
import PlatformReward from './routes/PlatformReward'; //邀新奖励
import RealNameAward from './routes/RealNameAward'; //实名认证奖励
import ColumnAward from './routes/ColumnAward'; //成为专栏作家奖励
import WritingAward from './routes/WritingAward'; //发文奖励
import ReadingReward from './routes/ReadingReward'; //阅读奖励
import ShareReward from './routes/ShareReward'; //分享奖励

//日志
import Log from './routes/Log';
import LogAdmin from './routes/Log_admin';
import LogUser from './routes/Log_user';

//内容
import ContentRouter from './routes/Content';
import ContentArticle from './routes/Content_article';
import ContentVideo from './routes/Content_video';
import Editor_Video from './routes/Editor_Video';
import ContentColumnContainer from './routes/Content_column_container';
import ContentColumn from './routes/Content_column';
import ContentComment from './routes/Content_comment';
import ContentImage from './routes/Content_image';
import ContentOpinionContainer from './routes/Content_opinion_container';
import ContentOpinion from './routes/Content_opinion';
import ContentOpinionShow from './routes/Content_opinion_show';
import Content_Column_Editor from './routes/Content_Column_Editor';
import Release_article from './routes/Release_article';
import Editor_Article from './routes/Editor_Article';
import ArticlePreview from './routes/ArticlePreview';
import Preview from './routes/Preview';
import PreviewVideo from './routes/PreviewVideo';

//Seo
import Seo from './routes/Seo';
import SeoHot from './routes/Seo_hot';
import SeoLink from './routes/Seo_link';
import SeoTdk from './routes/Seo_tdk';
import SeoTopSearch from './routes/Seo_topSearch';

//基础设置
import Setting from './routes/Setting';
import About from './routes/AboutUs';
import BaseInfo from './routes/BaseInfo';
import AccountRule from './routes/AccountRule';
import AddInfo from './routes/AddInfo';
import EditorInfo from './routes/AddInfoEdior';
//数据中心
import Data from './routes/Data';
import DataColumn from './routes/data_column';
import DataUser from './routes/data_user';

//财务管理
import Finance from './routes/Finance';
import FinanceRecharge from './routes/Finance_recharge';
import Withdrawals from './routes/Withdrawals.js';
import Record from './routes/Record';
import RecordTxb from './routes/RecordTxb';
import Bond from './routes/Bond';

//APP版本管理
import AppPage from './routes/AppPage';

function requireAuth(nextState, replace, callback) {
  let token = localStorage.getItem('Kgtoken');
  console.log(token)
  if (!token)
    replace({
      pathname: '/'
    })
  localStorage.clear();
  callback();
}

// import Theme from './routes/theme';



function RouterConfig({ history }) {

  //console.log(history)

  return (
    <LocaleProvider locale={zhCN}>
    <Router history={history}>
    <Switch>
      <Route path="/" exact  component={UserRouter} />
      <Route path="/login" exact  component={UserRouter} />
      <Route path="/preview" exact  component={ArticlePreview} />
      <Route path="/articlePreview" exact  component={Preview} />
      <Route path="/previewVideo" exact  component={PreviewVideo} />
      <LayoutContainer location={history.location}>
          <Route path="/index" exact component={IndexPage} onEnter={requireAuth}/>
          <Route path="/user/user_admin" exact component={UserAdmin} onEnter={requireAuth}/>
          <Route path="/user/user_role" exact component={UserRole} />
          <Route path="/user/user_data" exact component={UserData}/>
          <Route path="/user/reward" exact component={RewardDetails}/>
          <Route path="/user/invite" exact component={InviteRecord}/>
          <Route path="/user/master" exact component={Master}/>
          <Route path="/user/platformReward" exact component={PlatformReward}/>
          <Route path="/user/realnameAward" exact component={RealNameAward}/>
          <Route path="/user/columnAward" exact component={ColumnAward}/>
          <Route path="/user/writingAward" exact component={WritingAward}/>
          <Route path="/user/shareReward" exact component={ShareReward}/>
          <Route path="/user/user_login" exact component={UserLogin} />
          <Route path="/user/user_info" exact component={UserInfo} />
          <Route path="/user/realName" exact component={realName} />
          <Route path="/setting/about" strict component={About}/>
          <Route path="/setting/base" strict component={BaseInfo}/>
          <Route path="/setting/account" strict component={AccountRule}/>
          <Route path="/setting/addinfo" strict component={AddInfo}/>
          <Route path="/setting/addinfoEditor" strict  component={EditorInfo}/>
          <Route path="/data/data_column" strict  component={DataColumn}/>
          <Route path="/data/data_user" strict  component={DataUser}/>
          <Route path="/log/log_admin" strict  component={LogAdmin}/>
          <Route path="/log/log_user" strict  component={LogUser} />
          <Route path="/seo/tdk" component={SeoTdk}/>
          <Route path="/seo/hot" component={SeoHot} />
          <Route path="/seo/link" component={SeoLink} />
          <Route path="/seo/top_search" component={SeoTopSearch} />
          <Route path="/content/content_column" strict component={ContentColumn} />
          <Route path = '/content/content/content_column/:id'  component={Content_Column_Editor}/>
          <Route path="/content/content_article" exact component={ContentArticle}/>
          <Route path="/content/videoList" exact component={ContentVideo}/>
          <Route path="/content/content_image" strict component={ContentImage}/>
          <Route path="/content/content_comment" strict component={ContentComment}/>
          <Route path="/content/release_article" strict component={Release_article}/>
          <Route path="/content/EditorVideo" strict component={Editor_Video}/>
          <Route path="/content/editor_article" strict component={Editor_Article}/>
          <Route path="/content/content_opinion"  component={ContentOpinion} />
          <Route path ='/content/opinion'  component={ContentOpinionShow}/>
          <Route path="/finance/recharge" strict component={FinanceRecharge}/>
          <Route path="/finance/withdrawals"   strict component={Withdrawals} />
          <Route path="/finance/record" strict component={Record} />
          <Route path="/finance/recordTxb" strict component={RecordTxb} />
          <Route path="/finance/bond" strict component={Bond} />
          <Route path="/app/editon" strict component={AppPage} />
      </LayoutContainer>
      </Switch>
    </Router>
    </LocaleProvider>
  );
}

export default RouterConfig;
/*export default function({
  history
}) {

  return (
    <Router history={history}>
    <Route path="/" component={Login} >
     { <Route path="/" component={Login} >
      			<IndexRoute component={UserRouter} onEnter={requireAuth}/>
      		  <Route path="/login" component={UserRouter} onEnter={requireAuth}/>
      </Route>
      <Route path="/index" component={IndexPage} />
      <Route path="user" component={User}>
        <IndexRoute component={UserAdmin}/>
        <Route path="user_admin" component={UserAdmin}/>
        <Route path="user_data" component={UserData}/>
        <Route path="user_role" component={UserRole} />
        <Route path="user_login" component={UserLogin} />
        <Route path="user_info" component={UserInfo} />
        <Route path="realName" component={realName} />
      </Route>
      <Route path="setting" component={Setting}>
        <IndexRoute component={About}/>
        <Route path="about" component={About}/>
        <Route path="base" component={BaseInfo}/>
        <Route path="account" component={AccountRule}/>
        <Route path="addinfo" component={AddInfo}/>
        <Route path="addinfoEditor" component={EditorInfo}/>
      </Route>
      <Route path="data" component={Data}>
        <IndexRoute component={DataColumn}/>
        <Route path="data_column" component={DataColumn}/>
        <Route path="data_user" component={DataUser}/>
      </Route>
      <Route path="log" component={Log}>
        <IndexRoute component={Log}/>
        <Route path="log_admin" component={LogAdmin}/>
        <Route path="log_user" component={LogUser} />
      </Route>
      <Route path="seo" component={Seo}>
        <IndexRoute component={SeoTdk}/>
        <Route path="tdk" component={SeoTdk}/>
        <Route path="hot" component={SeoHot} />
        <Route path="link" component={SeoLink} />
        <Route path="top_search" component={SeoTopSearch} />
      </Route>
      <Route path="content" component={ContentRouter}>
        <IndexRoute component={ContentRouter}/>
        <Route path="content_column" component={ContentColumnContainer}>
            <IndexRoute component={ContentColumn}/>
            <Route path = '/content/content_column/:id' component={Content_Column_Editor}/>
        </Route>
        <Route path="content_article" component={ContentArticle}/>
        <Route path="content_image" component={ContentImage}/>
        <Route path="content_comment" component={ContentComment}/>
        <Route path="release_article" component={Release_article}/>
        <Route path="editor_article" component={Editor_Article}/>
        <Route path="content_opinion" component={ContentOpinionContainer}>
            <IndexRoute component={ContentOpinion}/>
            <Route path = '/content/content_opinion/:id' component={ContentOpinionShow}/>
        </Route>
      </Route>
       <Route path="finance" component={Finance}>
        <IndexRoute component={FinanceRecharge}/>
        <Route path="recharge" component={FinanceRecharge}/>
        <Route path="withdrawals" component={Withdrawals} />
        <Route path="record" component={Record} />
        <Route path="bond" component={Bond} />
      </Route>}
    </Router>
  );
};*/




