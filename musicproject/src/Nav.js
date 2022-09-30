import { useState } from 'react';
import styled from 'styled-components'
import { MdArrowForwardIos } from 'react-icons/md'
import Pic from './logos/Spotify_Icon_CMYK_Green.png'

const Navigation = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2.5em;
    padding: .2em 2rem;
    font-family: var(--title);

    .spotify {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        background-color: var(--black);
        padding: .8rem .8rem;

        img {
            margin: 0;
            width: 2.5rem;
            height: 2.5rem;
        }
    }

    a {
        color: #eee;
        text-shadow: -1px 0px 1rem var(--white);
        margin-left: 3rem;
    }

    // Show/Hide Toggle
    svg {
        cursor: pointer;
        right: 1rem;
        color: white;
        background-color: var(--grey);
        border-radius: 2rem;
        transition: all 0.2s;
        z-index: 600;
    }

    svg:hover {
        color: whitesmoke;
    }

    @media screen and (max-width: 1300px) {
        position: absolute;
        width: 100%;
        padding: .25rem 2rem;
    }

    @media screen and (max-width: 400px) {
        padding: .25rem;
    }
`

export default function Nav({ showSearch, setShowSearch }) {
    const [rotation, setRotation] = useState("0")

    function handleClick() {
        rotation === "0" ? setRotation("180deg") : setRotation("0");
    }

    return (
        <Navigation>
            <div className='spotify'><img src={Pic} alt="Spotify Logo"/></div>
            <a href="/">E-Ōke</a>
            <MdArrowForwardIos
                onClick={() => { setShowSearch(!showSearch); handleClick() }}
                style={{ transform: `rotate(${rotation})` }} />
        </Navigation>
    )
}