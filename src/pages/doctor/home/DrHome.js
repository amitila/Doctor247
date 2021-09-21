import React, { Component } from 'react';
import './../../../App.css';
import './../home/DrHome.css';
import DrHeader from '../../../layouts/doctor/DrHeader';
import DrBody from '../../../pages/doctor/home/DrBody';
import DrProfile from './../home/DrProfile';

class DrHome extends Component {

    render() {
        return (
            <div>
                <div>
                    <DrHeader />
                </div>
                <div>
                    <DrBody/>
                </div>
            </div>
            
        );
    }
}

export default DrHome;
