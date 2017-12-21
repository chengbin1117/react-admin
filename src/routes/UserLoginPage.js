import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import stytes from './UserLoginPage.css';
import { withRouter,browserHistory} from 'dva/router';
import LoginForm from '../components/User/LoginForm';
function LoginPage({location, dispatch, user, router}) {
	// if (user && user.logged ) {
	// 	// router.push('/merchant');
	// 	dispatch({
	// 		type:"user/redirect",
	// 		router: router,			
	// 	})
	// }	
	const loginProps = {
		onSubmit: function(data) {
			//console.log("login:", data);
			dispatch({
				type: 'user/login',
				payload: {
					...data, dispatch
				},
			})
		},
		router,
		forget: function() {
			dispatch({
				type:'user/forgetBox',
				
			})
		}
	};

 
	return (
	
		<LoginForm {...loginProps}/>	
	);
}

LoginPage.propTypes = {
	
};

function mapStateToProps({user}) {
	return { user };
}



export default connect(mapStateToProps)(withRouter(LoginPage));
