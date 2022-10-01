import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { BsCircle } from 'react-icons/bs';
import styled from 'styled-components';

const PlayerContainer = styled.div`
    position: relative;
    z-index: 110;
    height: 10rem;
    background-color: var(--black);

    .circle {
        position: absolute;
        bottom: 6rem;
        font-size: 3rem;
        width: 3.5rem;
        right: .4rem;
        left: 0;
        margin: auto;
        transition: all .25s;
        opacity: 1;
        visibility: visible;
    }

    ._ContentRSWP  {
        margin-top: .75rem;
    }
    
    @media screen and (max-width: 1300px) {
        ._ContentRSWP  {
            margin-top: .5rem;

            svg {
                font-size: 2rem;
            }
        }
    }
`

export default function ({ accessToken, toggle,
    playlist, playFromList,
    isPlaying, setIsPlaying,
    playAt, setPlayAt,
    lyricsDetails, setLyricsDetails,
    setDisplayRefresh,
    list, setList
}) {
    //console.log(accessToken);
    //console.log(trackUri);

    const [visi, setVisi] = useState({
        opacity: "0",
        color: "black"
    });

    useEffect(() => {
        // Display refresh icon
        if (list.length !== playlist.length) {
            setDisplayRefresh("block")
        }
    }, [playlist])

    useEffect(() => {
        // Refresh list
        if (list.length !== playlist.length) {
            setList(playlist);
            setDisplayRefresh("none")
        }
    }, [toggle])

    // Refresh playlist AND select at index/position - Only works if isPlaying
    // isPlaying is set to true by offset/playAt
    useEffect(() => {
        if (!isNaN(playFromList) && isPlaying) {
            if (list.length !== playlist.length) {
                setList(playlist);
            }
            setPlayAt(playFromList);
        }

        // Display signifier circle 
        else if (!isNaN(playFromList) && !isPlaying) {
            setVisi({
                opacity: "1",
                color: "red",
                zIndex: "2500"
            })
            setTimeout(() => setVisi({
                opacity: "0",
                zIndex: "-130"
            }), 600)
        }
        // Render when index is given, or when playing is off/on
    }, [playFromList, isPlaying])

    //console.log(tracks);
    //console.log(list)
    //console.log(play)
    //console.log("offset", playAt)
    //console.log(isPlaying)
    //console.log("list", list)
    //console.log("playlist", playlist)
    //console.log(lyricsDetails)
    //console.log(testList);

    if (!accessToken) return
    return (
        <PlayerContainer>
            <SpotifyPlayer
                styles={{
                    bgColor: "#1a1919",
                    sliderTrackColor: "#ddd",
                    sliderColor: "var(--purple)",
                    color: "#424242 ",
                    sliderHandleColor: "var(--purple)",
                    trackNameColor: '#fff',
                }}
                token={accessToken}
                callback={(state) => {

                    //console.log(state);
                    // Update list if un-updated and not playing
                    if (state.isPlaying == true) {
                        setIsPlaying(true);
                    }

                    if (state.isPlaying == false) {
                        setIsPlaying(false);
                    }

                    // Set lyrics
                    if (state.track.name !== lyricsDetails.track) {
                        if (state.track.artists[0].name !== lyricsDetails.artist) {
                            //console.log("Change artist")
                            setLyricsDetails({
                                artist: state.track.artists[0].name,
                                track: state.track.name
                            })
                        }
                        else {
                            //console.log("Change track")
                            setLyricsDetails({
                                artist: lyricsDetails.artist,
                                track: state.track.name,
                            })
                        }
                    }
                }}

                uris={list ? list : []}
                offset={playAt >= 0 ? playAt : undefined}
                play={isPlaying}
                initialVolume={0}
            />

            <BsCircle className="circle" style={visi} />
        </PlayerContainer>
    )
}