import styled from "styled-components";
import '../App.css';

export const LandingWrapper = styled.div`
    height: 92.5%;
    width: 100vw;
    background-color: var(--black);

    @media screen and (max-width: 1680px) {
        height: 90.5%;
    }

    @media screen and (max-width: 1300px) {
        height: 92%;
    }
`

export const ModalWrapper = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: black;
    opacity: .75;
    z-index: 1000;
`

export const Modal = styled.div`
    background-color: white;
    position: absolute;
    height: 375px;
    top: 5rem;
    width: 800px;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 1100;
    padding: 1rem 3rem;
    text-align: center;
    font-size: 1rem;
    border: 2px solid grey;
    outline: 2px solid white;
    border-radius: .25rem;

    h1 {
        margin-top: .5em;
        margin-bottom: .5em;
        font-weight: 400;
    }

    h2, h3 {
        padding: 0 3rem;
        font-size: 1em;
        line-height: 1.35;
        font-weight: 500;
    }

    h2 {
        margin-bottom: 1.5rem;
    }

    h3 {
        font-weight: 600;
        padding: 0 7rem;
    }

    button {
        font-size: 1rem;
        border: none;
        cursor: pointer;
    }

    button:first-child {
        padding: .25em .5em;
        position: absolute;
        top: 0;
        right: 0;
        margin: .25em;
        background-color: transparent;
        font-size: 1.5em;
    }

    button:last-child {
        position: absolute;
        background: var(--purple);
        color: white; 
        right: 0; 
        left: 0;
        width: 3.5em;
        margin: auto; 
        bottom: 1rem;
        padding: .5em;
    }

    a {
        color: var(--purple);
        text-decoration: underline;
    }

    @media screen and (max-width: 1300px) {
        width: 300px;
        font-size: .8rem;
    }
`

export const LandingContent = styled.div`
    height: 100%;
    display: flex;
    align-items: stretch;
`

// Nav/Video Container
export const NavVideoLyrics = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: ${props => {
        return props.themeColor === 1
            ? "linear-gradient(-45deg, #319DA0, #C689C6, #DF7861)"
            : props.themeColor == "2"
                ? "linear-gradient(45deg, #FFC18E, #876445, #AC7088)"
                : "linear-gradient(-90deg, #F96666, #3FA796, #0E49B5)"
    }};
    background-size: 300% 300%;
    animation: change infinite 60s linear;
    

    @keyframes change {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
        overflow-y: scroll;

        // Copyright
        p:last-child {
            align-self: flex-start;
            margin-left: .5rem;
            margin-top: auto;
            bottom: 8%;
            color: white;
            position: absolute;
            z-index: 600;

            a {
                color: white;
            }

            a:hover {
                text-decoration: underline;
                opacity: 1;
            }
        }

        @media screen and (max-width: 1680px) {
            p:last-child {
             visibility: hidden;
            }
        }
    }

    @media screen and (max-width: 1300px) {
        position: absolute;
        overflow-y: hidden;
        width: 100%;

        p:last-child {
            visibility: hidden;
        }
    }

`

export const Lyrics = styled.p`
    line-height: 1.5;
    white-space: pre;
    font-size: 1.5em;
    top: 0%;
    width: 100%;
    text-align: center;
    color: #eee;
    text-shadow: 1px 1px .5rem grey;

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    @media screen and (max-width: 1300px) {
        margin-top: 5rem;
        overflow-x: hidden;
        font-size: calc(.8rem + 1vw);
        padding: 0 1rem;
    }

    @media screen and (max-width: 650px) {
        white-space: pre-wrap;
       
    }

    &::first-line {
        color: white;
    }
`

export const Welcome = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2rem;
    font-size: 1rem;

    div:nth-child(1) {
        margin-top: 2rem;
        font-family: var(--title);
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 3.5em;
        letter-spacing: 5px;
        color: white;
        text-shadow: 0 0 .5rem var(--purple);
    }

    button {
        border: none;
        padding: .5rem 1.25rem;
        font-size: 1.35rem;
        cursor: pointer;
        box-shadow: 0 0 1rem var(--purple);
        border-radius: 1rem;
        background-color: var(--purple);
        color: white;
    }

    @media screen and (min-width: 1930px) {
        font-size: 1.25rem;
        margin-top: 5rem;
    }

    @media screen and (max-width: 1300px) {
        font-size: .7rem;

        div:nth-child(1) {
            margin-top: 10rem;
        }
    }

    @media screen and (max-width: 725px) {
        font-size: .45rem;
    }

    @media screen and (max-width: 425px) {
        font-size: .3rem;
        line-height: 2;

        button {
            font-size: .9rem;
        }
    }
`

// Search/Playlist Container
export const SearchPlaylist = styled.div`
    padding-top: .25rem;
    background-color: var(--playlistSearch);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    flex-shrink: 0;
    width: 400px;
    
    @media screen and (max-width: 1300px) {
        width: 100%;
        z-index: 500;
    }
`

export const ToggleContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    background-color: var(--playlistSearch);
    align-items: center;
    justify-content: center;
    padding: .75rem 0;
    width: 400px;
    outline: none;
    // Hack way to fill gap between search and toggle containers
    border: 1px solid var(--black);

    div {
        background-color: white;
        border-radius: 2rem;
        position: relative;

        // Toggle button
        button {
            font-size: 1.3rem;
            cursor: pointer;
            position: relative;
            transition: all .15s;
            padding: .4rem .8rem;
            border-radius: 1rem;
            border: none;
            

        button:hover {
            color: var(--cream)   
            }   
        }

        // Refresh Icon
        svg {
            font-size: 1.35rem;
            animation: 3s linear spin infinite;
            position: absolute;
            right: -1.75rem;
            bottom: .5rem;
            display: none;
            color: #eee;
        }

        @keyframes spin {
            0% {
                transform: rotate(360deg)
            }
        }
    }

    @media screen and (max-width: 1300px) {
        width: 100%;
        z-index: 500;
    }
`

export const SearchResultsContainer = styled.div`
    h1 {
    padding: .5rem;
    text-align: center;
    color: #eee;
    font-size: 1rem;
}
`