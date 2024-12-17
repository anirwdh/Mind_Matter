import React from "react";

import { GoogleOAuthProvider } from '@react-oauth/google';

import Card from '@mui/material/Card';

import GoogleAuth from "./GoogleAuth";
import LogoColoured from '../../assets/images/LogoColoured.png';
import '../../styles/Auth.scss';

const AuthContainer = () => {
    return (
        <>
            <div className="googleAuthContainer">
                <Card className="whiteBox authCard">
                    <img src={LogoColoured} alt="logo" width="150px" className="logo" />

                    <GoogleOAuthProvider clientId="761787113995-pb1ffbad1vme03bf23ekiuu3ptk71vh4.apps.googleusercontent.com">
                        <GoogleAuth />
                    </GoogleOAuthProvider>
                </Card>
            </div>
            <section className="section-bubble-top"></section>
            <section className="section-bubble-bottom"></section>
        </>
    );
}

export default AuthContainer;