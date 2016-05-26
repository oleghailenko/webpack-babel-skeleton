import './style/style.css';
import './style/style.less';
import './style/style.scss'

import 'babel-polyfill';

import './app';

if(module.hot) {
    module.hot.accept();
}
