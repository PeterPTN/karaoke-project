import styled from "styled-components"

const SearchContainer = styled.form`
    position: fixed;
    width: 400px;
    padding: .5rem 1rem 1.1rem;
    background-color:var(--grey);
    display: flex;
    justify-content: center;
    align-items: center;
    top: 3.9rem;
    right: 0;
    gap: .5rem;

    input {
        outline: none;
        font-size: 1.1rem;
        padding: .35rem .75rem;
        width: 75%;
        border-radius: 1rem;
        border: none;
    }

    @media screen and (max-width: 1080px) {
        width: 100%;
        z-index: 500;
    }
`

export default function Dashboard({ handleChange, search, }) {
    return (
        <>
            <SearchContainer>
                <input
                    onChange={(event) => handleChange(event)}
                    value={search}
                    type="search"
                    placeholder="Artists and/or songs"
                />
            </SearchContainer>
        </>
    )
}
