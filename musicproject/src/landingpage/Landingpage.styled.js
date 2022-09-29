import styled from "styled-components";
import '../App.css';

export const LandingWrapper = styled.div`
    height: 94.4%;
    width: 100vw;
    background-color: var(--lightgrey);
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
    background-color: #eee;
    background: linear-gradient(-45deg, #FCF8E8, #76549A, #DF7861, #94B49F);
    background-size: 300% 300%;
    animation: change infinite 20s linear;

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
            bottom: 3.5rem;
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
    }

    @media screen and (max-width: 1080px) {
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
    z-index: 100;
    text-align: center;
    overflow-y: scroll;
    color: #eee;
    text-shadow: 1px 1px 1rem black;

    ::-webkit-scrollbar-thumb {
            background: var(--grey);
        }

        ::-webkit-scrollbar-track {
            background: #eee;
        }

    @media screen and (max-width: 1080px) {
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

export const VideoLyrics = styled.div`

`

// Search/Playlist Container
export const SearchPlaylist = styled.div`
    padding-top: .25rem;
    background-color: var(--grey);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    flex-shrink: 0;
    width: 400px;
    
    @media screen and (max-width: 1080px) {
        width: 100%;
        z-index: 500;
    }
`

export const ToggleContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    background-color: var(--grey);
    align-items: center;
    justify-content: center;
    padding: .75rem 0;
    width: 400px;


    div {
        background-color: black;
        border-radius: 2rem;
        position: relative;

        // Toggle button
        button {
        font-size: 1.4rem;
        cursor: pointer;
        position: relative;
        transition: all .15s;
        padding: .4rem .8rem;
        border-radius: 2rem;
        border: none;

        button:hover {
            color: var(--cream)   
            }   
        }

        // Refresh Icon
        svg {
            font-size: 1.5rem;
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

    @media screen and (max-width: 1080px) {
        width: 100%;
        z-index: 500;
    }
`

export const SearchResultsContainer = styled.div`
    h1 {
    padding: .5rem;
    text-align: center;
    color: white;
}
`







