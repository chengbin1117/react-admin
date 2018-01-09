import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import styles from './Layout.css';
import style from './common.css';

import {
	withRouter,Link,hashHistory,NavLink
} from 'dva/router';

import {
	connect
} from 'dva';
import SideBar from './SideBar.js'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
let selectItem = '';
// const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
let menuItems = []
let nav = JSON.parse(localStorage.getItem("nav"))
let userId  = localStorage.getItem("userId");
let realname = localStorage.getItem("realname")
//console.log("nav",nav)
let first = "";
let second = "";
let third = "";
//console.log("hashHistory",history)
//let location=history.location
//let path = location.pathname
/*console.log(window)*/
/*function hasPermission(permission) {
  const resourceList = session.get(resourceSessionKey) // 获取登录用户的所有权限
  resourceList || redirectLoginPage()
  if (!resourceList || !resourceList.length || (permission && resourceList.indexOf(permission) === -1)) {
    // 无权限访问跳转到无权限页面
    return false
  }
  return true
}
// 递归生成菜单
  const getMenus = menuTreeN => {
    return menuTreeN.map(item => {
      if (item.children) {
        return (
          hasPermission(item.permission) && <Menu.SubMenu
            key={item.id}
            title={<span>{item.icon && <Icon type={item.icon} />}{item.name}</span>}
          >
            {getMenus(item.children)}
          </Menu.SubMenu>
        )
      }
      return (
        hasPermission(item.permission) && <Menu.Item key={item.id}>
          <Link to={item.url}>
            {item.icon && <Icon type={item.icon} />}
            {item.name}
          </Link>
        </Menu.Item>
      )
    })
  }
  menuItems = getMenus(nav)*/


   

  

/*class LayoutContainer extends React.Component {
  constructor(){
        super();
        this.state = {
		    collapsed: false,
		    defaultOpenKeys:['sub1','sub2','sub3','sub4','sub5','sub6']
        };
        this.onOpenChange = this.onOpenChange.bind(this);
        this.onClick = this.onClick.bind(this);
  }
  onCollapse = (collapsed) => {
    console.log('collapsed',collapsed);
    // this.setState({ collapsed });
  }
  onClick(item){
  	// hashHistory.push('/index')
  	//console.log('item',item)
  	//console.log('keyPath',item.keyPath[1])
  	this.setState({
  		defaultOpenKeys:item.keyPath[1]
  	})
  }
  onOpenChange(val){
/*  	this.setState({
  		defaultOpenKeys:val
  	})*/
  	//console.log('val',val)
  //}
  /*render() {
  	//let logoimg = require("image!../assets/images/code.png");
   
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
			collapsible = {true}
			onCollapse = {this.onCollapse}
			defaultCollapsed = {false}
			reverseArrow = {true}
        >
          <div className={styles.logo}>
            <Link to = {'/index?userId='+userId}><Icon type="home" /></Link>
          </div>
          <Menu 
	          theme="dark"  
	          mode="inline" 
	          onClick = {this.onClick} 
	          inlineCollapsed = {false}
	          onOpenChange = {this.onOpenChange}
	          defaultOpenKeys = {this.state.defaultOpenKeys}
          >
            {nav&&nav.map((item,index)=>
                   <SubMenu key={index} title={<span><Icon type="user1" /><span>{item.menuName}</span></span>}>
                    {item.children.map((c,inde)=>
                        <Menu.Item key={c.menuId}><Link activeClassName = {style.activeColor} to = {"/"+c.menuLink+'?page=1'}>{c.menuName}</Link></Menu.Item>
                      )}
                  </SubMenu>
                )
                
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
          		<div className = {styles.header_right}>
          			<span>CB</span>
          			<Link to="/" className={styles.logOut}>退出</Link>
          		</div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{first}</Breadcrumb.Item>
              <Breadcrumb.Item>{second}</Breadcrumb.Item>
              <Breadcrumb.Item>{third}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            KG ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}*/

function logout(){
  localStorage.clear();
}

class LayoutContainer extends React.Component {
  rootSubmenuKeys:['sub0','sub1','sub2','sub3','sub4','sub5','sub6','sub7']
  state = {
    collapsed: false,
    openKeys: ['sub0'],
    current:'1'
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  onOpenChange =(openKeys) => {
    //console.log(openKeys)
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    //console.log(latestOpenKey)
    this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    /*if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }*/
  }
  handleClick=(e)=>{
   // console.log('click ', e);
    this.setState({
      current: e.key,
      openKeys:[e.keyPath[1]]
    });
  }
  render() {
   // console.log('openKeys',this.props.location)
    const path =this.props.location.pathname;
    if(path =="/index"){
          first ="首页";
          second = "";
      }else if(path =="/user/user_admin"){
          first= "首页";
          second= "用户管理";
          third=""
      }else if(path =="/user/user_role"){
          first= "首页";
          second= "用户角色管理";
          third=""
      }else if(path =="/user/user_login"){
          first= "首页";
          second= "用户登陆管理";
          third=""
      }else if(path =="/user/user_info"){
          first= "首页";
          second= "用户默认信息设置";
          third=""
      }else if(path =="/user/realName"){
          first= "首页";
          second= "实名认证管理";
          third=""
      }else if(path =="/user/user_data"){
          first= "首页";
          second= "用户管理";
          third="查看用户信息"
      }else if(path =="/content/content_column"){
          first= "首页";
          second= "栏目管理";
          third=""
      }else if(path =="/content/content_article"){
          first= "首页";
          second= "文章管理";
          third=""
      }else if(path =="/content/content_comment"){
          first= "首页";
          second= "评论管理";
          third=""
      }else if(path =="/content/release_article"){
          first= "首页";
          second= "文章管理",
          third= "发布文章"
      }else if(path =="/content/editor_article"){
          first= "首页";
          second= "文章管理",
          third= "编辑文章"
      }else if(path =="/content/content_opinion"){
          first= "首页";
          second= "意见反馈";
          third=""
      }else if(path =="/content/opinion"){
          first= "首页";
          second= "意见反馈";
          third="反馈内容"
      }else if(path =="/content/content_image"){
          first= "首页";
          second= "图片管理";
          third=""
      }else if(path =="/setting/about"){
          first= "首页";
          second= "关于我们";
          third=""
      }else if(path =="/setting/base"){
          first= "首页";
          second= "网站基本信息"
      }else if(path =="/setting/account"){
          first= "首页";
          second= "系统账号管理";
          third=""
      }else if(path =="/finance/recharge"){
          first= "首页";
          second= "充值管理";
          third=""
      }else if(path =="/finance/withdrawals"){
          first= "首页";
          second= "提现管理";
          third=""
      }else if(path =="/finance/record"){
          first= "首页";
          second= "交易记录";
          third=""
      }else if(path =="/finance/bond"){
          first= "首页";
          second= "保证金记录";
          third=""
      }

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
        <Menu 
          theme="dark" 
          onClick={this.handleClick} 
          inlineCollapsed ={false}
          mode="inline" 
          openKeys={this.state.openKeys} 
          onOpenChange={this.onOpenChange}
          
          >
          <Menu.Item key="-1">
          <Link to={"/index?userId="+userId}>
            <Icon type="home" />
            <span>主页</span>
          </Link>
        </Menu.Item>
          {nav&&nav.map((item,index)=>
                   <SubMenu key={"sub"+index} title={<span><Icon type={item.menuIcon} /><span>{item.menuName}</span></span>}>
                    {item.children.map((c,inde)=>
                        <Menu.Item key={c.menuId+''} >
                        <Link   to = {"/"+c.menuLink+'?page=1'}>{c.menuName}</Link>
                        </Menu.Item>
                      )}
                  </SubMenu>
                )
                
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
             />
              <div className = {styles.header_right}>
                <span className={styles.rename}>欢迎您，<span style={{color:"#FFA500"}}>{realname&&realname}</span></span>
                <Link to="/login" className={styles.logOut} onClick={logout}>退出</Link>
              </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>{first}</Breadcrumb.Item>
              <Breadcrumb.Item>{second}</Breadcrumb.Item>
              <Breadcrumb.Item>{third}</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            KG ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps({
	user
}) {
	return {
		user
	};
}

export default connect(mapStateToProps)(withRouter(LayoutContainer));
{/*		<div className={styles.container} style = {{height:containerHeight}}>
			<SideBar />
			<div className = {styles.right_content}>
				<div className={styles.nav}  style = {{height:navHeight}}>
					<span><img  style = {{height:navHeight}}/></span>
					<span className={styles.pullRight} style = {{lineHeight:navHeight + 'px',display:'none'}}><span className={styles.pullText}>{scmAddress}</span>,欢迎您!</span>
					<span onClick={handleClick} className={styles.out}  style = {{lineHeight:navHeight + 'px'}}><span className={styles.outpull}><Icon type='arrow-right' /></span></span>
				</div>
				<div className={styles.content} style = {{height:contentHeight}}>
				    {props.children}
				</div>
			</div>
		</div>*/}

   {/*  <SubMenu key="sub3"  style ={{display:"none"}} title={<span><Icon type="user3" /><span>seo中心</span></span>}>
              <Menu.Item key="7"><Link activeClassName = {style.activeColor} to = '/seo/tdk'>首页TDK</Link></Menu.Item>
              <Menu.Item key="8"><Link activeClassName = {style.activeColor} to = '/seo/hot'>热门关键词</Link></Menu.Item>
              <Menu.Item key="9"><Link activeClassName = {style.activeColor} to = '/seo/link'>友情链接</Link></Menu.Item>
              <Menu.Item key="556"><Link activeClassName = {style.activeColor} to = '/seo/top_search'>热搜词管理</Link></Menu.Item>
            </SubMenu>*/}

            {/* <SubMenu key="sub5" style ={{display:"none"}} title={<span><Icon type="user4" /><span>日志管理</span></span>}>
              <Menu.Item key="14"><Link activeClassName = {style.activeColor} to = '/log/log_user'>用户日志</Link></Menu.Item>
              <Menu.Item key="15"><Link activeClassName = {style.activeColor} to = '/log/log_admin'>管理员日志</Link></Menu.Item>
            </SubMenu>*/}

  