import 'babel-polyfill';
import './index.css';
import dva from 'dva';
// 1. Initialize
const app = dva();

// 2. Plugins
app.use({
	onError: (err, dispatch) => {
		console.log("errrrr: ", err);
		
	},
});
//app.use(createLoading())
// 3. Model

app.model(require('./models/user'));
app.model(require('./models/setting'));
app.model(require('./models/content'));
app.model(require('./models/data_center'));
app.model(require('./models/finance'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');