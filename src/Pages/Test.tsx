import React from "react"
import styled from "styled-components";
import Background from "../Icons/BackgroundBasic.png";

const Wrapper = styled.div`
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    background-image: url(${Background});
    background-size: cover;
    background-position: center;

`

const Test = () => {
    return (
        <Wrapper>

        </Wrapper>
    )
}

export default Test;