import React from "react";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

interface AppHeaderProps {
    title: string;
}

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: "rgba(11, 25, 42, 0.65)",
        padding: "10px 26px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100
    }
}));

const AppHeader = ({ title }: AppHeaderProps) => {
    const styles = useStyles();
    return <div className={styles.header}>
        <Typography color="textPrimary" variant="h5">{title}</Typography>
    </div>
}

export default AppHeader;