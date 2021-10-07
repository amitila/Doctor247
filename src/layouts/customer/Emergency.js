import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@mui/material/NoSsr';
import {
	createTheme,
	ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { pink, red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import SpeedDial from '@mui/material/SpeedDial';
import CallIcon from '@mui/icons-material/Call';

const customTheme = createTheme({
	palette: {
		primary: pink,
		secondary: red,
	},
});

const StyledAvatar = styled(Avatar)`
	${({ theme }) => `
		cursor: pointer;
		background-color: ${theme.palette.primary.main};
		transition: ${theme.transitions.create(['background-color', 'transform'], {
			duration: theme.transitions.duration.standard,
		})};
		&:hover {
			background-color: ${theme.palette.secondary.main};
			transform: scale(1.6);
		}
	`}
`;

export default function Emergency() {
	return (
		<SpeedDial
			ariaLabel="SpeedDial basic example"
			FabProps={{ size: "large", style: { backgroundColor: "#ff9100" } }}
			sx={{ position: 'fixed', bottom: 16, right: 16 }}
			icon={<NoSsr>
				<MuiThemeProvider theme={customTheme}>
					<ThemeProvider theme={customTheme}>
						<StyledAvatar>
							<CallIcon />
						</StyledAvatar>
					</ThemeProvider>
				</MuiThemeProvider>
			</NoSsr>}
		>

		</SpeedDial>

	);
}
