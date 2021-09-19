import React, {ChangeEvent, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {makeStyles} from "@material-ui/core/styles";
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
        fontSize: "12px",
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
            props.onFilesLoaded(e.target.files);
        }
    }

    return (
        <div className={cx(styles.dropzone, {active: isDragActive})} {...getRootProps()}>
            <input {...getInputProps()} onChange={handleFileChange}/>
            <span>Drag and drop here</span>
            <span>or</span>
            <span className={styles.a}>browse</span>
        </div>
    )
}

export default Dropzone;