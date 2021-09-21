import React from "react";
import "./noScenarios.scss";
import Typography from "@material-ui/core/Typography";
import {styled} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

interface NoScenariosProps {
    onAddScenarioClick: () => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: 21
}));

const NoScenarios = (props: NoScenariosProps) => {
    return <div className="no-scenarios">
        <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter color-interpolation-filters="auto" id="a">
                    <feColorMatrix in="SourceGraphic" values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"/>
                </filter>
                <path id="b" d="M0 0h200v200H0z"/>
            </defs>
            <g transform="translate(-229)" filter="url(#a)" fill="none" fill-rule="evenodd" opacity=".5">
                <g transform="translate(229 .533)">
                    <mask id="c" fill="#fff">
                        <use href="#b"/>
                    </mask>
                    <path d="M.26 114.77c0 28.719 23.28 52 52 52 28.718 0 52-23.281 52-52s-23.281-52-52-52-52 23.281-52 52zm12 0c0-22.091 17.908-40 40-40 22.091 0 40 17.909 40 40s-17.909 40-40 40c-22.092 0-40-17.909-40-40z" fill="#3A4A54" mask="url(#c)"/>
                    <path d="M42.1 95.26a16.65 16.65 0 0 1 10.1-2.9c4.34 0 7.9 1 10.59 3.1a10.21 10.21 0 0 1 4.35 8.21 9.33 9.33 0 0 1-1.61 5.33 21.91 21.91 0 0 1-5.22 5 22.25 22.25 0 0 0-2.65 2.17 2.73 2.73 0 0 0-.53 1 10 10 0 0 0-.29 2.75 2.52 2.52 0 0 1-2.53 2.45h-4.55a2.52 2.52 0 0 1-2.53-2.41v-1.28a12 12 0 0 1 1-5.08 11.84 11.84 0 0 1 2.35-3.28 38.11 38.11 0 0 1 3.7-3 11.8 11.8 0 0 0 2.62-2.28c.211-.29.32-.642.31-1A2.63 2.63 0 0 0 56 101.8a6.3 6.3 0 0 0-7.16-.13 5.52 5.52 0 0 0-1.74 3.46 2.57 2.57 0 0 1-2.74 2l-4.87-.49a2.51 2.51 0 0 1-2.26-2.84 12.41 12.41 0 0 1 4.87-8.54zm15 36.91a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" fill="#3A4A54" mask="url(#c)"/>
                    <path d="M153.65 67.8 124.1 89.24c-2.13 1.55-3.86.65-3.86-2V42.73c0-2.63 1.73-3.51 3.86-2l29.55 21.47a3.26 3.26 0 0 1 0 5.6z" stroke="#3A4A54" fill="#3A4A54" mask="url(#c)"/>
                    <path d="M189.12 0H80.35c-5.855.016-10.598 4.755-10.62 10.61v46.75a59.83 59.83 0 0 1 12 5.16V12h106v106h-75.56a60.06 60.06 0 0 1-1.87 12h78.82c5.853-.016 10.593-4.757 10.61-10.61V10.61C199.714 4.757 194.973.017 189.12 0zM26 10.61A10.64 10.64 0 0 1 36 0H10.61C4.76.022.022 4.76 0 10.61V85.3a60.19 60.19 0 0 1 12-15V12h14v-1.39zM60.73 10.61A10.63 10.63 0 0 1 70.71 0H45.6C39.751.022 35.016 4.761 35 10.61v46.7A59.36 59.36 0 0 1 47 55V12h13.73v-1.39zM137.14 180.68l-33.8-34.43a60.22 60.22 0 0 1-16.45 17.5l33.29 33.91a8 8 0 0 0 11.31 0l5.66-5.66a8 8 0 0 0-.01-11.32z" fill="#3A4A54" mask="url(#c)"/>
                </g>
            </g>
        </svg>

        <Typography  variant="h3" color="textPrimary">There are no scenarios yet</Typography>
        <StyledButton variant="contained" color="primary" onClick={props.onAddScenarioClick}>Add new scenario</StyledButton>
    </div>
}

export default NoScenarios;