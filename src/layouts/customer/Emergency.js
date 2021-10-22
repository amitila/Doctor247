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
import { styled as STYLED } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

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

const StyledBadge = STYLED(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
	  backgroundColor: 'red',
	  color: 'red',
	  boxShadow: `0 0 0 2px ${theme.palette.error.light}`,
	  '&::after': {
		position: 'absolute',
		top: -32,
		left: -32,
		width: '550%',
		height: '550%',
		borderRadius: '100%',
		animation: 'ripple 1.5s infinite ease-in-out',
		border: '10px solid currentColor',
		content: '""',
	  },
	},
	'@keyframes ripple': {
	  '0%': {
		transform: 'scale(.8)',
		opacity: 1,
	  },
	  '100%': {
		transform: 'scale(2.4)',
		opacity: 0,
	  },
	},
  }));

export default function Emergency() {
	return (
		<SpeedDial
			ariaLabel="SpeedDial basic example"
			FabProps={{ size: "large", style: { backgroundColor: "#ff9100" } }}
			sx={{ position: 'fixed', bottom: 16, right: 16 }}
			icon={<NoSsr>
				<MuiThemeProvider theme={customTheme}>
					<ThemeProvider theme={customTheme}>
						<StyledBadge
							overlap="circular"
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							variant="dot"
							onClick={()=>alert("Gọi khẩn cấp")}
						>
							<StyledAvatar>
								<CallIcon />
							</StyledAvatar>
						</StyledBadge>
					</ThemeProvider>
				</MuiThemeProvider>
			</NoSsr>}
		>

		</SpeedDial>
	);
}
