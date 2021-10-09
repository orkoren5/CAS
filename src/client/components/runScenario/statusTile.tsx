import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
// import UploadIcon from "../../assets/icons/cloud-upload.svg";
import Typography from "@material-ui/core/Typography";
import dateformat from "dateformat";

const useStyles = makeStyles((theme) => ({
    tile: {
        display: "flex",
        flexDirection: "column",
        height: 130,
        flexGrow: 1,
        backgroundColor: "#0e305c",
        padding: "30px 0 0 85px",
        position: "relative",
        overflow: "hidden"
    },
    title: {
        fontSize: 18
    },
    value: {
        color: "#fafbfb",
        "&.running": {
            color: theme.palette.success.main
        },
        "&.stopped": {
            color: theme.palette.error.main
        }
    },
    subtitle: {
        fontSize: 14
    },
    icon: {
        position: "absolute",
        right: "calc(100% - 80px)",
        top: 15
    }
}));

interface StatusTileProps {
    title: string;
    value: string | Date;
    subtitle: string;
    status: "running" | "stopped" | "regular"
    icon: React.ReactElement;
}

const StatusTile = (props: StatusTileProps) => {
    const styles = useStyles();
    const [displayValue, setDisplayValue] = useState<string>("");

    useEffect(() => {
        if (props.value instanceof Date) {
            const interval = setInterval(() => {
                const diff = Date.now() - (props.value as Date).getTime();
                setDisplayValue(dateformat(diff, "hh:mm:ss", false, false));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [props.value]);

    return (
        <div className={styles.tile}>
            <div className={styles.icon}>{props.icon}</div>
            <Typography variant="subtitle1" color="textPrimary" classes={{ root: styles.title }}>{props.title}</Typography>
            <Typography variant="h4" classes={{ root: styles.value + " " + props.status }}>{typeof props.value == "string" ? props.value : displayValue}</Typography>
            <Typography variant="subtitle1" color="textPrimary" classes={{ root: styles.subtitle }}>{props.subtitle}</Typography>
        </div>
    )
}

export default StatusTile;