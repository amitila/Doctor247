import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ChatIcon from '@mui/icons-material/Chat';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import { useSelector } from "react-redux";
import { selectName } from '../../store/userSlice';
import ShareBoard from './ShareBoard';

export default function BasicSpeedDial() {
	var name = '';
	name = useSelector(selectName);
	// console.log(name)
	const actions = name === '' ? [
			{ icon: <LibraryBooksIcon style={{color: 'blue'}}/>, name: 'Danh bạ', link: '/phonebook' },
			{ icon: <ContactSupportIcon style={{color: 'blue'}} />, name: 'Hỏi đáp', link: '/question' },
			{ icon: <ShareBoard style={{color: 'blue'}} />, name: 'Chia sẻ ứng dụng', link: '' },
		]
		:
	  	[
			{ icon: <LibraryBooksIcon style={{color: 'blue'}}/>, name: 'Danh bạ', link: '/phonebook' },
			{ icon: <PersonAddIcon style={{color: 'blue'}}/>, name: 'Thêm người thân', link: '/profile' },
			{ icon: <EventAvailableIcon style={{color: 'blue'}} />, name: 'Đặt lịch khám', link: '/appointment' },
			{ icon: <ContactSupportIcon style={{color: 'blue'}} />, name: 'Hỏi đáp', link: '/question' },
			{ icon: <ChatIcon style={{color: 'orange'}} />, name: 'Chat', link: '/doctorlist/all/chat-to-doctor' },
			{ icon: <FeaturedVideoIcon style={{color: 'orange'}} />, name: 'Videocall', link: '/doctorlist/all/videocall-to-doctor' },
			{ icon: <ShareBoard style={{color: 'blue'}} />, name: 'Chia sẻ ứng dụng', link: '' },
		];
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
					onClick={()=>
						action.link ? window.open(action.link, '_blank') : ''
					}
				/>
			))}
		</SpeedDial>
	);
}
