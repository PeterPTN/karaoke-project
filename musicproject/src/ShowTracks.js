import React from 'react'
import styled from 'styled-components'
import { TiTick } from 'react-icons/ti'
import { ImCross } from 'react-icons/im'
import { useState } from 'react'

const ShowTracksContainer = styled.div`
    display: flex;
    flex: 1;

    h2, h3, h4, img {
        cursor: pointer;
        color: white;
    }

    div:nth-child(1) {
        display: flex;
        flex: 1;
        margin: 0 0 .45rem .45rem;

        img {
            object-fit: cover;
            height: 5.5rem;
            
        }

        div { 
            flex-direction: column;
            padding: .5rem 0 0 .25rem;

            h2 {
                font-size: 1.1rem;
                text-transform: capitalize;
                margin-bottom: .25rem;
                color: #eee;
            }

            h3 {
                text-transform: capitalize;
                font-size: 1rem;
                font-weight: lighter;
                color: #bbb;
            }
        }
    }

    .cross {
        align-self: flex-start;
        font-weight: lighter;
        font-size: 1.65rem;
        right: .25rem;
        top: .25rem;
        padding: 0 .35rem;
        color: #aaa;
        cursor: pointer;
        opacity: .25;
    }

    .cross:hover {
        color: red;
        opacity: 1;
    }

    svg {
        transition: all 0.05s;
    }     
`

// Tick or Cross
const Feedback = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 9.5%;

        svg {
             font-size: 2rem;
         }
`

export default function ShowResults({
    track,
    playlist, setPlaylist,
    playlistDesc, setPlaylistDesc,
    setPlayFromList,
    results, index,

}) {

    const [tickVisi, setTickVisi] = useState("0");
    const [crossVisi, setCrossVisi] = useState("0");

    function handleSearchClick() {
        if (playlist.indexOf(track.uri) === -1) {
            setPlaylist([...playlist, track.uri])
            setPlaylistDesc([...playlistDesc, track])
            setTickVisi("1");
            setTimeout(() => setTickVisi("0"), 600);
        } else {
            setCrossVisi("1");
            setTimeout(() => setCrossVisi("0"), 600);
        }
    }

    function handlePlaylistPlay() {
        setPlayFromList(index)
    }

    // Remove from Playlist
    function handlePlaylistClick() {
        // Visual items
        setPlaylistDesc(playlistDesc.filter((track, i) => {
            if (i !== index) return track;
        }))
        // Actual playlist
        setPlaylist(playlist.filter((track, ind) => {
            if (ind !== index) return track;
        }))
        // Force play previous track from removed track
        setPlayFromList(index - 1);
    }

    //console.log(playlist);
    //console.log(track);
    return (
        <ShowTracksContainer>
            {results
                ?
                <>
                    <div >
                        <img src={track.albumUrl} onClick={handleSearchClick} alt={track.title + " artwork"}/>

                        <div onClick={handleSearchClick}>
                            <h2>{track.title}</h2>
                            <h3>{track.artist}</h3>
                        </div>
                    </div>

                    <Feedback>
                        {tickVisi == 1 && crossVisi == 0 && <TiTick style={{ opacity: tickVisi, color: "green" }} />}
                        {crossVisi == 1 && tickVisi == 0 && <ImCross style={{ opacity: crossVisi, color: "red", fontSize: "1rem", margin: ".6rem" }} />}
                    </Feedback>
                </>
                :
                <>
                    <div>
                        <img src={track.albumUrl} onClick={handlePlaylistPlay} alt={track.title + " artwork"}/>

                        <div onClick={handlePlaylistPlay}>
                            <h2>{track.title}</h2>
                            <h3>{track.artist}</h3>
                        </div>
                    </div >

                    <ImCross className="cross" onClick={handlePlaylistClick}/>
                </>
            }

        </ShowTracksContainer>
    )
}