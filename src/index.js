import { Message } from './components';
import dva from 'dva';
import createLoading from 'dva-loading';
import Console from './utils/console';
import Debug from './services/debug';
import './index.scss';
import { history } from './history';
import { hookAllExternal } from './utils/openExternalLink';

// 1. Initialize
const app = dva({
  history,
  onError(e) {
    Message.error(e.message, 3);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/setting').default);
app.model(require('./models/act').default);
app.model(require('./models/root').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

// 6. Other
window.debug = false;

if (window.location.toString().indexOf('?HOST_PORT=ws://') !== -1) {
  window.websocket = true;
  window.wsURL = window.location.href;
}

hookAllExternal();

if ($isDev) {
  Debug();
} else {
  Console();
}
