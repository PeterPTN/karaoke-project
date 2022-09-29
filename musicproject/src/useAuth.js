import { useEffect, useState } from 'react';
import axios from 'axios';

//Contains refreshToken, accessToken and expiresIn from authorisation
const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    // Calling server to retrieve tokens
    useEffect(() => {
      
        // Result is within data object - Axios transform data to JSON automatically.
        // Promise based
        axios.post("https://e-oke.adaptable.app/login", { code })
            .then(({ data }) => {
                //First arg specifies state, which, when accessed triggers popstate event, this can be accessed similarly like an event listener
                setAccessToken(data.accessToken)
                setRefreshToken(data.refreshToken)
                setExpiresIn(data.expiresIn)
                window.history.pushState({}, null, "/")
                //console.log(data)
            })
            //If it messes up push to Landing page again
            .catch(() => window.location = "/");

        return () => { }
    }, [code]);

    //Call server to refresh tokens if refresh and expire token (dependency array)
    useEffect(() => {
        if (!refreshToken || !expiresIn) {
            return;
        }

        // Create interval that calls server to provide new tokens
        const interval = setInterval(() => {
            //Post refreshToken: refreshToken to body
            axios.post("https://e-oke.adaptable.app/refresh", { refreshToken })
                .then(({ data }) => {
                    //First arg specifies state, which, when accessed triggers popstate event, this can be accessed similarly like an event listener
                    setAccessToken(data.accessToken)
                    setExpiresIn(data.expiresIn)
                })
                .catch(() => window.location = "/");
            //convert to milliseconds
        }, (expiresIn - 60) * 1000)

        return () => { clearInterval(interval) }
    }, [refreshToken, expiresIn])


    // Access token provides all of the Spotify APIs
    return { accessToken }
}

export default useAuth

/* 
Token lasts 3600 seconds, 60 minutes or 1 hour
*/