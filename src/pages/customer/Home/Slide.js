import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
	{
		label: 'Danh sách đội ngũ y bác sĩ',
		imgPath:
			'https://live.staticflickr.com/1882/43597217744_80c71ba4d9_b.jpg',
	},
	{
		label: 'Đặt lịch hẹn khám bệnh trực tuyến',
		imgPath:
			'https://dost.danang.gov.vn/documents/11328/196701/Tien+ich+hen+gio.jpg/baf946f3-0d4b-43a1-9cc9-3bb444870a99?t=1509354547436',
	},
	{
		label: 'Thiết lập hồ sơ gia đình',
		imgPath:
			'https://bissbrand.com/wp-content/uploads/2021/07/profile-ca-nhan.png',
	},
	{
		label: 'Xem hồ sơ bệnh án trực tuyến',
		imgPath:
			'https://thumb.ex-cdn.com/EXP/media.giadinhmoi.vn/resize/485x272/files/news/2020/01/21/-165609.jpg',
	},
	{
		label: 'Hỏi đáp với bác sĩ miễn phí',
		imgPath:
			'https://uploads-ssl.webflow.com/5dad2717508f0437a40232f3/5f4095fbf4c975b40e560ea3_TU-VAN-C-HIEN.gif',
	},
];

export default function Slide() {
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const maxSteps = images.length;

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStepChange = (step) => {
		setActiveStep(step);
	};

	return (
		<Box sx={{ maxWidth: 400, flexGrow: 1 }}>
			<Paper
				square
				elevation={0}
				sx={{
					display: 'flex',
					alignItems: 'center',
					height: 50,
					pl: 2,
					bgcolor: 'background.default',
				}}
			>
				<Typography>{images[activeStep].label}</Typography>
			</Paper>
			<AutoPlaySwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
			>
				{images.map((step, index) => (
					<div key={step.label}>
						{Math.abs(activeStep - index) <= 2 ? (
							<Box
								component="img"
								sx={{
									height: 255,
									display: 'block',
									maxWidth: 400,
									overflow: 'hidden',
									width: '100%',
								}}
								src={step.imgPath}
								alt={step.label}
							/>
						) : null}
					</div>
				))}
			</AutoPlaySwipeableViews>
			<MobileStepper
				steps={maxSteps}
				position="static"
				activeStep={activeStep}
				nextButton={
					<Button
						size="small"
						onClick={handleNext}
						disabled={activeStep === maxSteps - 1}
					>
						Next
						{theme.direction === 'rtl' ? (
							<KeyboardArrowLeft />
						) : (
							<KeyboardArrowRight />
						)}
					</Button>
				}
				backButton={
					<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
						{theme.direction === 'rtl' ? (
							<KeyboardArrowRight />
						) : (
							<KeyboardArrowLeft />
						)}
						Back
					</Button>
				}
			/>
		</Box>
	);
}
