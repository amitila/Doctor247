import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShareIcon from '@mui/icons-material/Share';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const actions = [
	{ icon: <LibraryBooksIcon style={{color: 'blue'}}/>, name: 'Danh bạ', link: '/phonebook' },
	{ icon: <PersonAddIcon style={{color: 'blue'}}/>, name: 'Thêm người thân', link: '/phonebook' },
	{ icon: <EventAvailableIcon style={{color: 'blue'}} />, name: 'Đặt lịch khám', link: '/phonebook' },
	{ icon: <ContactSupportIcon style={{color: 'blue'}} />, name: 'Hỏi đáp', link: '' },
	{ icon: <ShareIcon style={{color: 'blue'}} />, name: 'Chia sẻ ứng dụng', link: '/phonebook' },
];

export default function BasicSpeedDial() {
	
	return (
		<SpeedDial
			ariaLabel="SpeedDial basic example"
			sx={{ position: 'fixed', bottom: 80, right: 16 }}
			icon={<SpeedDialIcon />}
		>
			{actions.map((action) => (
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
					tooltipTitle={action.name}
					onClick={()=>alert(action.name)}
				/>
			))}
		</SpeedDial>
	);
}
