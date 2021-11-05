import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, Grid } from '@material-ui/core';
import MainPhone from './MainPhone';
import MainEmail from './MainEmail';
import MainChangePassword from './MainChangePassword';
import MainForgotPassword from './MainForgotPassword';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function BasicTabs() {
	const [value, setValue] = React.useState(0);
	const mark = true;

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Container maxWidth="lg">
			<Grid container spacing={5}>
				<Box sx={{ width: '100%', marginTop: 5 }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
							<Tab label="Thêm số điện thoại" {...a11yProps(0)} />
							<Tab label="Thêm địa chỉ mail" {...a11yProps(1)} />
							<Tab label="Đổi mật khẩu" {...a11yProps(2)} />
							<Tab label="Quên mật khẩu" {...a11yProps(3)} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<Grid item xs={12}>
							<Grid item>
								<MainPhone mark={mark} />
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid item>

							</Grid>
						</Grid>
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Grid item xs={12}>
							<Grid item>
								<MainEmail mark={mark} />
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid item>

							</Grid>
						</Grid>
					</TabPanel>
					<TabPanel value={value} index={2}>
						<Grid item xs={12}>
							<Grid item>
								<MainChangePassword mark={mark} />
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid item>

							</Grid>
						</Grid>
					</TabPanel>
					<TabPanel value={value} index={3}>
						<Grid item xs={12}>
							<Grid item>
								<MainForgotPassword mark={mark} />
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<Grid item>

							</Grid>
						</Grid>
					</TabPanel>
				</Box>
			</Grid>
		</Container>
	);
}



