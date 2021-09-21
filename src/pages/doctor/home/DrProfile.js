import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import DrHeader from '../../../layouts/doctor/DrHeader';

class DrProfile extends Component {
    render() {
        return (
            <div>
                <div>
                    <DrHeader />
                </div>
                <div>
                    <form className="Profile" noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Read Only"
                                defaultValue="Hello World"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                id="standard-number"
                                label="Number"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="standard-helperText"
                                label="Helper text"
                                defaultValue="Default Value"
                                helperText="Some important text"
                            />
                        </div>
                        
                    </form>
                </div>

            </div>
        );
    }
}

export default DrProfile;