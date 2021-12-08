import { Helmet } from 'react-helmet';
import {
	Box,
	Container,
	Typography
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function NotFound () {
	const history = useHistory();
	return(
		<>
			<Helmet>
				<title>Doctor247</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					justifyContent: 'center'
				}}
			>
				<Container maxWidth="md">
					<Typography
						align="center"
						color="textPrimary"
						variant="h1"
					>
						404: Trang web bạn đang tìm không có ở đây
					</Typography>
					<Typography
						align="center"
						color="textPrimary"
						variant="subtitle2"
					>
						Bạn đã đi nhầm sang trang không có trong web Doctor247. Bạn có thể nhập lại đường link
						hay quay trở về trang cũ.
					</Typography>
					<Box sx={{ textAlign: 'center', marginBottom: 20 }}>
						<img
							alt="notfound"
							src="/notfound.jpg"
							style={{
								marginTop: 50,
								display: 'inline-block',
								maxWidth: '100%',
								width: 560
							}}
						/>
					</Box>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={()=>history.push("/home")}
						style={{marginBottom: 15}}
					>
						Về trang chủ
					</Button>
				</Container>
			</Box>
		</>
	)
};

