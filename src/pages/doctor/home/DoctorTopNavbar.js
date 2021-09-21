import { Link } from '@material-ui/core';
import React, {useState, useEffect, useRef} from 'react';
import './../../doctor/home/Doctor.css';

function DoctorTopNavbar(props) {
    const [appName, setUserInfo] = useState("Doctor 247");

    const [displayShowHamburger, setIsShowHamburger] = useState('none');

    const menuRef = useRef();
    const onButtonClick = () => {
        menuRef.current.focus();
    };

    useEffect( () =>{
    }, []);

    return (
        <React.Fragment>
            <script src="https://kit.fontawesome.com/8d6784f1e8.js" crossorigin="anonymous"></script>
            <div className="top_navbar">
                <div className="hamburger" onClick={props.onClick}>
                    <div className="hamburger__inner">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>
                </div>

                <div className="menu">
                    <div className="logo">
                        {appName}
                    </div>
                    <div className="right_menu">
                        <ul>
                            <li>
                                <i className="fas fa-user" onClick={() => {(displayShowHamburger=='none')? setIsShowHamburger('block') : setIsShowHamburger('none')}}></i>
                                <div className="profile_dd" style={{display:displayShowHamburger}}>
                                    <div className="dd_item">Profile</div>
                                    <div className="dd_item">Change Password</div>
                                    <Link href="/login"><div className="dd_item">Log out</div></Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DoctorTopNavbar;