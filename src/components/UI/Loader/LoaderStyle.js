import styled, {keyframes} from "styled-components";


const animloader = keyframes`
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0;
    }
`

export const LoadWrapper = styled.div`
    width: 48px;
    height: 48px;
    display: inline-block;
    position: relative;

    &::after, &::before {
        content: "";
        box-sizing: border-box;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: #ce3df3;
        position: absolute;
        left: 0;
        top: 0;
        animation: ${animloader} 2s linear infinite;
    }

    &::after {
        animation-delay: 0s;
    }
`