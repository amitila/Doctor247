import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import './../../../App.css';
import { useDispatch } from "react-redux";
import { updateId, updateName } from '../../../../store/userSlice';
import APIService from '../../../../utils/APIService';
import Cookies from 'universal-cookie';
// import Alert from '@mui/material/Alert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
		width: '100%'
	},
	button: {
		'&:hover': {
            fontWeight: 'bold',
        },
		marginBottom: '10px',
	},
	text: {
		color: 'blue',
	},
	tag: {
		textAlign: 'center',
		'&:hover': {
			fontWeight: 'bold',
            backgroundColor: '#e9ecef',
			border: '2px solid blue',
			borderRadius: 35,
        },
	}
}));

export default function HomeScreen() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [state, setState] = useState({
		email: '',
		role: '',
		id: '',
		name: ''
	});
	const [count, setCount] = useState(3);
	const handleChangeImagesNext = () => {
		if(count + 1 > 5) {
			return setCount(3);
		}
		else {
			return setCount(count + 1);
		}
	}

	const handleChangeImagesPrev = () => {
		if(count - 1 < 3) {
			return setCount(5);
		}
		else {
			return setCount(count - 1);;
		}
	}
	// <Link to="/signin">Log out</Link>
	const cookies = new Cookies();
	const [token, setToken] = React.useState(cookies.get("token"));

	// const [status, setStatus] = React.useState(false);
	useEffect(() => {
		if(token) {
			APIService.checkToken(token, (success, json) => {
				if(success && json.result){
					setToken(json.result.token);
					setState({
						email: json.result.email,
						role: json.result.role,
						id: json.result.id,
						name: json.result.customer.lastName
					});
					dispatch(updateId(json.result.id));
					dispatch(updateName(json.result.customer.lastName));
				} else {
					// setStatus(true);
					alert('Phiên đã hết hạn, Bạn vui lòng đăng nhập lại!')
				}
			}) 
		}
	}, [dispatch, token]);

	useEffect(() => {
		setTimeout(() => {
			handleChangeImagesNext()
        }, 5000)
	})

	return (
		<>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
				<meta http-equiv="X-UA-Compatible" content="ie=edge" />
				{/* <title>HTML5 Website with Bootstrap | Responsive Website Design</title> */}
				{/* <link rel="shortcut icon" to="img/favicon.ico" /> */}
				{/* Bootstrap 4.5 CSS */}
				<link rel="stylesheet" to="css/bootstrap.min.css" />
				{/* Style CSS */}
				<link rel="stylesheet" to="css/style.css" />
				{/* Google Fonts */}
				<link to="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&display=swap" rel="stylesheet" />
			</head>
			<body>
				{/* {
					status ? <Alert severity="error">Phiên đã hết hạn, bạn vui lòng đăng nhập lại!</Alert> : ''
				} */}
				{/* Navigation */}
				{/* <nav className="navbar bg-dark navbar-dark navbar-expand-lg">
					<div className="container">Ami</div>
				</nav> */}

				{/* Image Carousel */}
				<div id="carousel" className="carousel slide" data-ride="carouse" data-interval="5000" style={{marginTop: -75}}>
					{/* Carousel Content */}
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img src={`img/carousel/${count}.jpg`} alt="" className="w-100" />
								{/* <div className="carousel-caption">
								<div className="container">
									<div className="row justify-content-center">
										<div className="col-8 bg-custom d-none d-md-block py-3 px-0">
											<h1>Doctor247</h1>
											<div className="border-top border-primary w-50 mx-auto my-3"></div>
											<h3 className="pb-3">
												This is wonderful selection for every family
											</h3>
											<a to="" className="btn btn-danger btn-lg mr-2">View demo</a>
											<a to="" className="btn btn-primary btn-lg mr-2">Start now</a>
										</div>
									</div>
								</div>
							</div>  */}
						</div>
					</div>
					
					{/* Previous & Next Buttons */}
					
					<a href="#carousel" className="carousel-control-prev" role="button" data-slide="prev" style={{backgroundColor: 'transparent'}}>
						<ArrowBackIosNewIcon color='primary' onClick={handleChangeImagesPrev} />
					</a>

					<a href="#carousel" className="carousel-control-next" role="button" data-slide="next" style={{backgroundColor: 'transparent'}}>
						<ArrowForwardIosIcon color='primary' onClick={handleChangeImagesNext} />
					</a>
					
					{/* End Previous & Next Buttons */}
				</div>
				{/* End Image Carousel */}
				{/* <Link to={{ pathname: "https://twitter.com/Turkcell" }} target="_blank">Log out</Link> */}
				{/* Main Page Heading  */}
				<div className="col-12 text-center mt-5">
					<h1 className="text-dark pt-4"><b>Dịch vụ</b></h1>
					<div className="border-top border-primary w-50 mx-auto my-3"></div>
					<p className="lead">Dành cho bạn và người thân của bạn</p>
				</div>

				{/* Three Column Section */}
				<div className="container">
					<div className="row my-5">
						<div className="col-md-4 my-4">
							<div className={classes.tag}>
								<img src="img/doctor.jpg" alt="" className="w-100" />
								<h4 className="my-4" style={{textAlign: 'center'}}><b>Xem danh sách bác sĩ</b></h4>
								<p className={classes.text}>Đây là danh sách các bác sĩ</p>
								<Link to="/doctorlist" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Xem chi tiết</Link>
							</div>
						</div>

						<div className="col-md-4 my-4">
							<div className={classes.tag}>
								<img src="img/appointment.jpg" alt="" className="w-100" />
								<h4 className="my-4" style={{textAlign: 'center'}}><b>Đặt / Xem lịch khám</b></h4>
								<p className={classes.text}>Đây là trang đặt và xem lịch khám</p>
								{
									state.id ? <Link to="/appointment" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Xem chi tiết</Link>
										: <Link to="/signin" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Đăng nhập</Link>
								}
								
							</div>
						</div>

						<div className="col-md-4 my-4">
							<div className={classes.tag}>
								<img src="img/family.jpg" alt="" className="w-100" />
								<h4 className="my-4" style={{textAlign: 'center'}}><b>Tạo hồ sơ gia đình</b></h4>
								<p className={classes.text}>Tạo hồ sơ cho bạn và gia đình để được đăng ký lịch khám</p>
								{
									state.id ? <Link to="/profile" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Xem chi tiết</Link> 
										: <Link to="/signin" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Đăng nhập</Link>
								}
							</div>
						</div>

						<div className="col-md-4 my-4">
							<div className={classes.tag}>
								<img src="img/medical_record.jpg" alt="" className="w-100" />
								<h4 className="my-4" style={{textAlign: 'center'}}><b>Xem bệnh án đã khám</b></h4>
								<p className={classes.text}>Xem bệnh án khi đã được bác sĩ đã khám</p>
								{
									state.id ? <Link to="/medicalrecord" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Xem chi tiết</Link> 
										: <Link to="/signin" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Đăng nhập</Link>
								}
							</div>
						</div>

						<div className="col-md-4 my-4">
							<div className={classes.tag}>
								<img src="img/question.jpg" alt="" className="w-100" />
								<h4 className="my-4" style={{textAlign: 'center'}}><b>Hỏi đáp cùng bác sĩ</b></h4>
								<p className={classes.text}>Hỏi bác sĩ về vấn đề bạn đang cần và sau đó bác sĩ sẽ trả lời</p>
								<Link to="/question" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Xem chi tiết</Link>
							</div>
						</div>

						<div className="col-md-4 my-4">
							<div className={classes.tag}>
								<img src="img/phonebook.jpg" alt="" className="w-100" />
								<h4 className="my-4" style={{textAlign: 'center'}}><b>Danh bạ khẩn cấp</b></h4>
								<p className={classes.text}>Đây là danh bạ gồm các số điện thoại của các bệnh viện và phòng khám</p>
								<Link to="/phonebook" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Xem chi tiết</Link>
							</div>
						</div>

						<div className="col-md-4 my-4">
							<div className={classes.tag}>
								<img src="img/videocall.jpg" alt="" className="w-100" />
								<h4 className="my-4" style={{textAlign: 'center'}}><b>Tư vấn từ xa</b></h4>
								<p className={classes.text}>Tư vấn từ xa qua videocall mặt đối mặt</p>
								{
									state.id ? <Link to="/doctorlist/all/videocall-to-doctor" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Xem chi tiết</Link>
										: <Link to="/signin" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Đăng nhập</Link>
								}
							</div>
						</div>

						<div className="col-md-4 my-4">
							<div className={classes.tag}>
								<img src="img/chat.jpg" alt="" className="w-100" />
								<h4 className="my-4" style={{textAlign: 'center'}}><b>Trò chuyện trực tuyến</b></h4>
								<p className={classes.text}>Trò chuyện với bác sĩ qua tin nhắn</p>
								{
									state.id ? <Link to="/doctorlist/all/chat-to-doctor" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Xem chi tiết</Link>
										: <Link to="/signin" className={classNames("btn btn-outline-dark btn-md", classes.button)}>Đăng nhập</Link>
								}
							</div>
						</div>

						<div className="col-md-4 my-4">
							<div className={classes.tag}>
								<img src="img/onlinepay.jpg" alt="" className="w-100" />
								<h4 className="my-4" style={{textAlign: 'center'}}><b>Thanh toán trực tuyến</b></h4>
								<p className={classes.text}>Thanh toán qua cổng thanh toán trực tuyến nhanh gọn lẹ</p>
								<Link 
									// to={{ pathname: "http://192.168.1.4:8888/order/create_payment_url" }} 
									to="#"
									className={classNames("btn btn-outline-dark btn-md", classes.button)}
									// target="_blank"
								>
										Xem chi tiết
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="border-top border-primary w-50 mx-auto my-3"></div>
				<img src={`img/carousel/covid.jpg`} alt="" className="w-100" />

				{/* Start Fixed Background IMG */}
				<div className="fixed-background">
					<div className="fixed-wrap">
						<div className="fixed"></div>
					</div>
				</div>

				{/* Start Two Column Section */}
				<div className="container my-5">
					<div className="row py-4">
						<div className="col-lg-4 mb-4 my-lg-auto" style={{textAlign: 'center'}}>
							<h1 className="text-dark font-weight-bold mb-3" style={{textAlign: 'center'}}>
								<b>Trang Facebook của Doctor247</b>
							</h1>
							<p className="mb-4">Đây là trang chủ mạng xã hội của Doctor247, bạn có thể like và chia sẻ cho mọi người cùng biết đến Doctor247</p>
							<Link 
								to={{ pathname: "https://www.facebook.com/doctor247DHT/" }} 
								className={classNames("btn btn-outline-dark btn-md", classes.button)} 
								target="_blank"
							>
								Vào trang Facebook
							</Link>
						</div>

						<div className="col-lg-2"></div>

						<div className="col-lg-6">
							<div className="w-100" >
								<div
									className="fb-page"
									data-href="https://www.facebook.com/doctor247DHT"
									data-tabs="timeline"
									data-width="500"
									data-height="350"
									data-small-header="true"
									data-adapt-container-width="true"
									data-hide-cover="false"
									data-show-facepile="true"
								>
									<blockquote
									cite="https://www.facebook.com/doctor247DHT"
									className="fb-xfbml-parse-ignore"
									>
									<a href="https://www.facebook.com/doctor247DHT">Doctor247</a>
									</blockquote>
								</div>
							</div>
							{/* <img src="img/code.jpg" alt="" className="w-100" /> */}
						</div>
					</div>
				</div>

				{/* Start Two Column Section To Introduce Mobile*/}
				<div className="container my-5">
					<div className="row py-4">
						<div className="col-lg-3" style={{textAlign: 'center'}}>
							<h1 className="text-dark font-weight-bold mb-3" style={{textAlign: 'center'}}>
								<b>Doctor247 - Mobile</b>
							</h1>
							<p className="mb-4">Đây là ứng dụng Doctor247 chạy trên các thiết bị di động, phù hợp với với các hệ điều hành Android, IOS</p>
							<p className="mb-4">Doctor247 - mong muốn mang lại trải nghiệm tuyệt vời nhất cho bạn và gia đình của bạn</p>
							<Link 
								to={{ pathname: "https://expo.dev/@amilila/Doctor247Mobile" }} 
								className={classNames("btn btn-outline-dark btn-md", classes.button)} 
								target="_blank"
							>
								Tải xuống ứng dụng mobile
							</Link>
						</div>

						<div className="col-lg-1"></div>

						<div className="col-lg-4">
							<div className="w-100" >
								<img src="img/mobile-hello.jpg" alt="mobile-hello" className="w-100" />
							</div>
						</div>

						<div className="col-lg-4">
							<div className="w-100" >
								<img src="img/mobile-home.jpg" alt="mobile-home" className="w-100" />
							</div>
						</div>
					</div>
				</div>
				
				{/* Start Jumbotron */}
				<div className="jumbotron py-5 mb-0" style={{backgroundColor: '#e9ecef'}}>
					<div className="container">
						<div className="row">
							<div className="col-md-7 col-lg-8 col-xl-9 my-auto">
								<h4>Xin hãy liên lạc tới tổng đài của chúng tôi nếu bạn cần hỗ trợ</h4>
							</div>
							<div className="col-md-5 col-lg-4 col-xl-3 pt-4 pt-md-0">
								<Link to="#" className="btn btn-primary btn-lg"><b>1900 1722</b></Link>
							</div>
						</div>
					</div>
				</div>

				<div className="container my-5"></div>

				{/* jQuery */}
				<script src="js/jquery-3.5.1.min.js"></script>
				{/* Bootstrap 4.5 JS */}
				<script src="js/bootstrap.min.js"></script>
				{/* Popper JS */}
				<script src="js/popper.min.js"></script>
				{/* Font Awesome */}
				<script src="js/all.min.js"></script>

			</body>
		</>
	);
}