import React, {ChangeEvent, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {makeStyles} from "@material-ui/core/styles";
// import UploadIcon from "../../assets/icons/cloud-upload.svg";
import cx from "classNames";

const useStyles = makeStyles((theme) => ({
    dropzone: {
        width: "100%",
        border: "1px dashed #8293AA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: 10,
        fontSize: 16,
        "&.active": {
            borderColor: "#0A68EB"
        }
    },
    a: {
        color: "#0A68EB"
    }
}));

interface DropzoneProps {
    onFilesLoaded: (files: File[]) => void;
}

const Dropzone = (props: DropzoneProps) => {
    const styles = useStyles();

    const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop: props.onFilesLoaded });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            //@ts-ignore
            props.onFilesLoaded(e.target.files);
        }
    }

    return (
        <div className={cx(styles.dropzone, {active: isDragActive})} {...getRootProps()}>
            <input {...getInputProps()} onChange={handleFileChange}/>
            <svg width="49" height="49" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter color-interpolation-filters="auto" id="a">
                        <feColorMatrix in="SourceGraphic" values="0 0 0 0 0.843137 0 0 0 0 0.870588 0 0 0 0 0.909804 0 0 0 1.000000 0"/>
                    </filter>
                </defs>
                <g transform="translate(-68.24 .478)" filter="url(#a)" fill="none" fill-rule="evenodd">
                    <path d="m92.5 20 .034.001.052.003-.085-.003a1.007 1.007 0 0 1 .425.094l.04.02a.812.812 0 0 1 .067.038l.023.016c.023.015.046.031.068.049l.036.031a.615.615 0 0 1 .049.044l6 6c.39.392.39 1.024 0 1.416a1.004 1.004 0 0 1-1.416 0L93.5 23.415v19.586a1 1 0 0 1-2 0V23.415l-4.291 4.294c-.392.39-1.024.39-1.416 0a1.003 1.003 0 0 1 0-1.416l6-6 .053-.048.032-.027-.085.075c.045-.045.094-.085.145-.12l.035-.022a.749.749 0 0 1 .065-.037l.034-.017a.82.82 0 0 1 .166-.061 1.019 1.019 0 0 1 .263-.035zm0-16c5.308 0 10.226 2.99 12.706 7.666a10.453 10.453 0 0 1 7.06 2.944 10.483 10.483 0 0 1 3.234 7.608c0 9.216-5.996 9.775-9.48 9.775L101.5 32a1 1 0 0 1 0-2h4.392c2.287.057 7.608-.339 7.608-7.783 0-2.346-.93-4.538-2.622-6.166a8.468 8.468 0 0 0-6.25-2.382c-.488-.018-.77-.212-.942-.572C101.644 8.788 97.252 6 92.5 6c-6.538 0-11.966 5.116-12.352 11.648-.018.29-.16.558-.392.736-.23.178-.528.24-.812.184a6.162 6.162 0 0 0-5.166 1.252 6.14 6.14 0 0 0-2.278 4.788c0 1.806 1.37 5.393 6.638 5.393H83.5a1 1 0 0 1 0 2h-5.347c-5.047 0-8.654-2.34-8.654-7.393 0-2.472 1.1-4.784 3.018-6.342a8.178 8.178 0 0 1 5.736-1.81C79.204 9.39 85.266 4 92.5 4z" fill="#F2F8FB"/>
                </g>
            </svg>
            <span>Drag and drop here</span>
            <span>or</span>
            <span>browse</span>
        </div>
    )
}

export default Dropzone;