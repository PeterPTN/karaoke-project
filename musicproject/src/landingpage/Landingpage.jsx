import { useState, useEffect, useRef } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import ShowTracks from '../ShowTracks';
import Nav from '../Nav';
import Dashboard from '../Dashboard';
import Player from '../Player';
import useAuth from '../useAuth';
import { gsap } from 'gsap';
import { FiRefreshCcw } from 'react-icons/fi'

import {
    LandingWrapper,
    ModalWrapper,
    LandingContent,
    SearchResultsContainer,
    NavVideoLyrics,
    SearchPlaylist,
    ToggleContainer,
    Lyrics, Welcome, Modal
} from './Landingpage.styled';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
    clientId: "082094db82d3435cb9f12e8151b5051a"
})

//Get portion of string after "?" inside URL - returns an object - .get(code) param 

const Landingpage = ({ code }) => {
    const [themeColor, setThemeColor] = useState(1);
    const [modalView, setModalView] = useState("none");
    const [search, setSearch] = useState("b");
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

    const karaoke1 = useRef();
    const karaoke2 = useRef();
    const karaoke3 = useRef();

    function handleChange(event) {
        setSearch(event.target.value)
    }

    function handleClick(e) {
        e.target.innerHTML === "Playlist" ? setToggle("Search") : setToggle("Playlist");
    }

    function toggleModal() {
        setModalView(val => val == "none" ? "block" : "none");
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

    useEffect(() => {
        gsap.to(karaoke1.current, { opacity: 1, delay: 0, duration: 1.05 });
        gsap.to(karaoke2.current, { opacity: 1, delay: .4, duration: 1.05 });
        gsap.to(karaoke3.current, { opacity: 1, delay: .8, duration: 1.05 });
    }, [])

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
        <>
            <ModalWrapper style={{ display: modalView }} />
            <Modal style={{ display: modalView }}>
                <button onClick={toggleModal}>X</button>
                <h1>Welcome!</h1>
                <h2>E-Ōke is a karaoke web app that uses your Spotify Premium Account to search and save songs. Playing them displays lyrics -- most of the time. &#128517;</h2>
                <h2>Use the searchbar to find your favourite tracks. You can save these songs to your playlist by clicking on them. Once you've toggled over to playlist, simply click the track you want to play!</h2>
                <h3>Contact <a href="mailto:peter.p.t.nguyen@gmail.com">Peter</a> and include your e-mail used for Spotify Premium to request authorisation for full functionality.</h3>
                <button onClick={toggleModal}>Okay</button>
            </Modal>

            <LandingWrapper>
                <LandingContent>
                    <NavVideoLyrics themeColor={themeColor}>
                        <Nav showSearch={showSearch} setShowSearch={setShowSearch} />
                        <div>
                            {lyrics.length > 0
                                ?
                                <Lyrics>
                                    {lyrics}
                                </Lyrics>
                                :
                                <Welcome>
                                    <div>
                                        <h1 ref={karaoke1} style={{ opacity: "0" }} >Karaoke</h1>
                                        <h1 ref={karaoke2} style={{ opacity: "0" }} >&#127881; カラオケ &#127908;</h1>
                                        <h1 ref={karaoke3} style={{ opacity: "0" }} >E-Ōkesutora</h1>
                                    </div>

                                    <button onClick={toggleModal}>Get Started</button>
                                </Welcome>
                            }
                            <p>&#169; 2022 <a href="https://pptn-portfolio.netlify.app" target="_blank" rel="noopener noreferrer">Peter Nguyen</a></p>
                        </div>
                    </NavVideoLyrics>

                    <SearchPlaylist
                        toggle
                        style={{
                            display: showSearch ? "" : "none",
                            marginTop: toggle !== "Search" ? "7.3rem" : "3.9rem"
                        }}>
                        <ToggleContainer>
                            <div>
                                <button
                                    style={{
                                        background: toggle == "Playlist" ? "var(--purple)" : "white",
                                        color: toggle === "Playlist" ? "white" : "var(--black)",

                                    }}
                                    onClick={handleClick}>Search
                                </button>

                                <button
                                    style={{
                                        background: toggle == "Playlist" ? "white" : "var(--purple)",
                                        color: toggle === "Playlist" ? "var(--black)" : "white"
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
        </>
    )
}

export default Landingpage