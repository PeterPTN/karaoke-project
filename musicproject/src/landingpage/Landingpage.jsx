import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

import ShowTracks from '../ShowTracks';
import Nav from '../Nav';
import Dashboard from '../Dashboard';
import Player from '../Player';
import useAuth from '../useAuth';

import { FiRefreshCcw } from 'react-icons/fi'

import {
    LandingWrapper,
    LandingContent,
    SearchResultsContainer,
    NavVideoLyrics,
    SearchPlaylist,
    ToggleContainer,
    Lyrics
} from './Landingpage.styled';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
    clientId: "082094db82d3435cb9f12e8151b5051a"
})

//Get portion of string after "?" inside URL - returns an object - .get(code) param 

const Landingpage = ({ code }) => {
    const [themeColor, setThemeColor] = useState(1);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSearch, setShowSearch] = useState(true);
    const [toggle, setToggle] = useState("Playlist");
    const [playlist, setPlaylist] = useState([]);
    const [list, setList] = useState([])
    const [playlistDesc, setPlaylistDesc] = useState([]);
    const [playFromList, setPlayFromList] = useState(undefined);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playAt, setPlayAt] = useState(undefined);
    const [lyrics, setLyrics] = useState("");
    const [displayRefresh, setDisplayRefresh] = useState("none");
    const [lyricsDetails, setLyricsDetails] = useState({
        track: "",
        artist: "",
    });

    function handleChange(event) {
        setSearch(event.target.value)
    }

    function handleClick(e) {
        e.target.innerHTML === "Playlist" ? setToggle("Search") : setToggle("Playlist");
    }

    //console.log("Code", code);
    const { accessToken } = useAuth(code);
    //console.log("Access", accessToken)

    // Set access token
    useEffect(() => {
        if (!accessToken) {
            return
        }
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    // Fetch Spotify Data 
    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return
        let cancel = false;

        // Search Spotify Api
        spotifyApi.searchTracks(search)
            .then((res) => {

                // SEARCH DATA
                //console.log(res)

                // Cancelling async search if dependencies change, re-render etc 
                if (cancel) return

                // Set Search Results
                setSearchResults(res.body.tracks.items.map((track) => {
                    //Find single smallest image from an array - hence reduce
                    const smallestAlbumImage = track.album.images
                        .reduce((image, currentImg) => {
                            if (currentImg.height < image.height) return currentImg
                            return image
                            //Populate first value with starting point
                        }, track.album.images[0])

                    return ({
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    })
                }))
            })

        return () => cancel = true;
    }, [search, accessToken])

    // Lyrics
    useEffect(() => {
        if (isNaN(playFromList)) return

        axios.get("https://e-oke.adaptable.app/lyrics", {
            params: {
                track: lyricsDetails.track,
                artist: lyricsDetails.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })

        // ThemeColor
        setThemeColor((val) => {
            return val === 1 ? 2 : val === 2 ? 3 : 1;
        })

    }, [lyricsDetails])

    //console.log(playlist);
    //console.log(playFromList)
    //console.log(playlistDesc)
    //console.log(lyrics)
    //console.log(playlist);
    //console.log(playlistDesc)
    //console.log(playingTrack)
    //console.log(playFromList);
    //console.log(lyricsDetails)
    //console.log("SL", songLength);
    //console.log(songProgress);

    return (
        <LandingWrapper>
            <LandingContent>
                <NavVideoLyrics>
                    <Nav showSearch={showSearch} setShowSearch={setShowSearch} />

                    <div>
                        <Lyrics>{lyrics}</Lyrics>
                        <p>&#169; 2022 <a href="https://pptn-web-dev.netlify.app/" target="_blank" rel="noopener noreferrer">Peter Nguyen</a></p>
                    </div>
                </NavVideoLyrics>


                <SearchPlaylist
                    toggle
                    style={{
                        display: showSearch ? "" : "none",
                        marginTop: toggle !== "Search" ? "7.5rem" : "3.9rem"
                    }}>
                    <ToggleContainer>
                        <div>
                            <button
                                style={{
                                    backgroundColor: toggle == "Playlist" ? "white" : "black",
                                    color: toggle === "Playlist" ? "black" : "white"
                                }}
                                onClick={handleClick}>Search
                            </button>

                            <button
                                style={{
                                    backgroundColor: toggle == "Playlist" ? "black" : "white",
                                    color: toggle === "Playlist" ? "white" : "black"
                                }}
                                onClick={handleClick}>Playlist
                            </button>

                            <FiRefreshCcw style={{ display: displayRefresh }} />
                        </div>
                    </ToggleContainer>

                    {toggle !== "Search"
                        ?
                        <>
                            <Dashboard
                                code={code}
                                toggle={toggle}
                                handleChange={handleChange}
                                handleClick={handleClick}
                            />

                            <SearchResultsContainer>
                                {searchResults.map((track) => {

                                    //console.log(track)
                                    // RENAME TRACKRESULTS
                                    return <ShowTracks
                                        track={track}
                                        key={track.uri}
                                        playlist={playlist}
                                        setPlaylist={setPlaylist}
                                        playlistDesc={playlistDesc}
                                        setPlaylistDesc={setPlaylistDesc}
                                        results
                                    />
                                })}
                            </SearchResultsContainer>
                        </>
                        :
                        <>
                            <SearchResultsContainer>
                                {playlistDesc.length > 0
                                    ? playlistDesc.map((track, index) => {
                                        return <ShowTracks
                                            index={index}
                                            key={track.title + index}
                                            track={track}
                                            toggle={toggle}
                                            setIsPlaying={setIsPlaying}
                                            playlistDesc={playlistDesc}
                                            setPlaylistDesc={setPlaylistDesc}
                                            playlist={playlist}
                                            setPlaylist={setPlaylist}
                                            setPlayFromList={setPlayFromList}
                                            results={false}
                                        />
                                    })
                                    : <h1>Nothing saved!</h1>
                                }
                            </SearchResultsContainer>
                        </>
                    }

                </SearchPlaylist>

            </LandingContent>

            <Player
                setDisplayRefresh={setDisplayRefresh}
                setIsPlaying={setIsPlaying}
                isPlaying={isPlaying}
                accessToken={accessToken}
                playlist={playlist}
                playFromList={playFromList}
                toggle={toggle}
                playAt={playAt}
                setPlayAt={setPlayAt}
                lyricsDetails={lyricsDetails}
                setLyricsDetails={setLyricsDetails}
                setList={setList}
                list={list}
            />
        </LandingWrapper >
    )
}

export default Landingpage