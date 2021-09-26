import React from 'react'
import SignIn from './SignIn'
//import APIService from '../../utils/APIService.js';
//import Button from "@material-ui/core/Button";

export default function Index() {
    // const email = 'ami@gmail.com';
    // const password = '1234';
    // const onSignIn = () => {
    //     console.log("clicked");
    //     APIService.signIn(email, password, (success, json) => {
    //         if(success && json.result){
    //             alert(json.result.token);
    //             console.log(json.result.token);
    //         }
    //     }) 
    // }
    return (
        <div>
            <SignIn />
            {/* <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={onSignIn}
            >
                Đăng nhập
            </Button> */}
        </div>
    )
}
