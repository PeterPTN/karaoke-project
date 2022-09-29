import { useEffect } from 'react';
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=082094db82d3435cb9f12e8151b5051a&response_type=code&redirect_uri=https://e-oke.adaptable.app/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login() {
    useEffect(() => {
        window.location=AUTH_URL;
    }, [])
}
