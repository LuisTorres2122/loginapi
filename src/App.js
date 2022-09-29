/*App.js*/

import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import './App.css'

function App() {
    const [ profile, setProfile ] = useState([]);
    const clientId = '633992431623-12cn6omusc688v89jhp714bj785i230k.apps.googleusercontent.com';
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile(null);
    };

    return (
        <div className='contenedor'>
            <h2>Login</h2>
            <br />
            <br />
            {profile ? (
                <div className='datos'>
                     <div className='datos-datos'>
                    <h3>Usuario Logeado</h3>
                    <p>Nombre: {profile.name}</p>
                    <p>Correo Electronico: {profile.email}</p>
                
                    <p>realizado por:</p>
                    <p>Luis Josué Torres Bautista</p>
                    <p>0901-19-15851</p>
                    </div>
                    <br />
                    <br />
                   
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Iniciar sesión con Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div>
    );
}
export default App;