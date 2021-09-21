import React from 'react';
import DrHeader from '../../../layouts/doctor/DrHeader';
import imgAvatar from './../../../assets/user.png';

function About(props) {
    return (
        <React.Fragment>
            <div>
                <DrHeader />
            </div>
            <div className="container emp-profile">
                <form method="">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={imgAvatar} alt="avatar" />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>Kaka Ricardo</h5>
                                <h6>Doctor</h6>
                                <p className="profile-rating mt-3 mb-5">RANKING: <span>8/10</span></p>

                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#">Active</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" role="tab">Link</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"></input>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href="#" target="_dung">Facebook</a><br/>
                                <a href="#" target="_dung">Youtube</a><br/>
                                <a href="#" target="_dung">Insta</a><br/>
                                <a href="#" target="_dung">Twitter</a><br/>
                                <a href="#" target="_dung">Google++</a><br/>
                                <a href="#" target="_dung">Github</a><br/>
                            </div>
                        </div>

                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTab">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>1001</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>User Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Ricardo Kaka</p>
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>1001</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </React.Fragment>
    );
}

export default About;