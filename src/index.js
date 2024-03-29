import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SpeedDial from './layouts/customer/SpeedDial';
import Emergency from './layouts/customer/Emergency';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./store/index";

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<SpeedDial />
		</React.StrictMode>
	</Provider>,
	document.getElementById('speed_dial')
);

ReactDOM.render(
	<Emergency />,
	document.getElementById('emergency')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
