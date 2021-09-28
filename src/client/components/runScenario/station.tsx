import React from "react";
import {makeStyles} from "@material-ui/core/styles";
// import UploadIcon from "../../assets/icons/cloud-upload.svg";
import Typography from "@material-ui/core/Typography";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Switch from "@material-ui/core/Switch";
import {SystemMode} from "../../../common/types/Run";

const useStyles = makeStyles((theme) => ({
    tile: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#112033",
        padding: 20,
        gap: 10
    },
    title: {
        fontSize: 18
    },
    value: {
        color: "#fafbfb",
        "&.running": {
            color: theme.palette.success.main
        }
    },
    subtitle: {
        fontSize: 14
    },
    icon: {
        position: "absolute",
        right: "calc(100% - 80px)",
        top: 15
    },
    statusCircle: {
        width: 20,
        height: 20,
        borderRadius: 20,
        fontSize: 12,
        fontFamily: "Lato-Black",
        color: "#0c1624",
        fontWeight: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&.ok": {
            backgroundColor: theme.palette.success.main
        },
        "&.faulty": {
            backgroundColor: theme.palette.error.main
        }
    },
    accordionSummary: {
        justifyContent: "space-between"
    },
    accordionDetails: {
        justifyContent: "space-between"
    },
    toggleButton: {
        color: theme.palette.primary.main,
        border: "1px solid " + theme.palette.primary.main,
        borderRadius: 0,
        "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
            "&:hover": {
                backgroundColor: theme.palette.primary.main
            }
        }
    },
    statusBar: {
        display: "flex",
        gap: 6
    },
    statusSwitches: {
        display: "flex",
        flexDirection: "column"
    },
    switchBar: {
        display: "flex",
        alignItems: "center",
    },
    switchIndex: {
        marginRight: 10
    },
    switchBase: {
        color: theme.palette.success.main,
        "&.Mui-checked": {
            color: theme.palette.error.main,
        }
    },
    switchTrack: {
        backgroundColor: "black"
    }
}));

interface StationProps {
    title: string;
    systemMode: SystemMode;
    btsStatuses: boolean[];
    paStatus: boolean[];
    scanner: boolean;
    onChangeBTSStatus: (ok: boolean, index: number) => void;
    onChangePAStatus: (ok: boolean, index: number) => void;
    onChangeScannerStatus: (ok: boolean) => void;
    onChangeMode: (systemMode: SystemMode) => void;
}

const SwitchBar = ({ checked, title, onCheck } : { checked: boolean, title: string, onCheck: (check: boolean) => void }) => {
    const styles = useStyles();

    return <div className={styles.switchBar}>
        <Typography className={styles.switchIndex} variant="body2">{title}</Typography>
        <Typography variant="body2">OK</Typography>
        <Switch
            classes={{ switchBase: styles.switchBase, track: styles.switchTrack }}
            onChange={(e) => onCheck(e.target.checked)}
            checked={checked}
            color="default"
        />
        <Typography variant="body2">Faulty</Typography>
    </div>
}

const Station = (props: StationProps) => {
    const styles = useStyles();

    return (
        <div>
            <div className={styles.tile}>
                <Typography variant="subtitle1" color="textPrimary" classes={{ root: styles.title }}>{props.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary" classes={{ root: styles.subtitle }}>System Mode</Typography>
                <ToggleButtonGroup size="small" exclusive color="primary" value={props.systemMode} onChange={(event, value) => props.onChangeMode(value)}>
                    <ToggleButton classes={{ root: styles.toggleButton }} value={SystemMode.Scanning}>Scanning</ToggleButton>
                    <ToggleButton classes={{ root: styles.toggleButton }} value={SystemMode.Manipulation}>Manipulation</ToggleButton>
                    <ToggleButton classes={{ root: styles.toggleButton }} value={SystemMode.StandBy}>StandBy</ToggleButton>
                    <ToggleButton classes={{ root: styles.toggleButton }} value={SystemMode.Diagnostic}>Diagnostic</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div>
                <Accordion>
                    <AccordionSummary
                        classes={{ content: styles.accordionSummary }}
                        expandIcon={<ExpandMore/>}
                    >
                       <div className={styles.statusBar}>
                           <Typography variant="body2">BTS Status</Typography>
                           <div className={styles.statusCircle + " ok"}>{props.btsStatuses.filter(s => s).length}</div>
                           <div className={styles.statusCircle + " faulty"}>{props.btsStatuses.filter(s => !s).length}</div>
                       </div>
                        <div className={styles.statusBar}>
                            <Typography variant="body2">PA Status</Typography>
                            <div className={styles.statusCircle + " ok"}>{props.paStatus.filter(s => s).length}</div>
                            <div className={styles.statusCircle + " faulty"}>{props.paStatus.filter(s => !s).length}</div>
                        </div>
                        <div className={styles.statusBar}>
                            <Typography variant="body2">Scanner</Typography>
                            <div className={styles.statusCircle + (props.scanner ? " ok" : " faulty")}/>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails classes={{ root: styles.accordionDetails }}>
                        <div className={styles.statusSwitches}>
                            { props.btsStatuses.map((status, index) => (
                                <SwitchBar key={index} onCheck={(checked) => props.onChangeBTSStatus(!checked, index)} checked={!status} title={(index + 1).toString()}/>
                            ))}
                        </div>
                        <div className={styles.statusSwitches}>
                            { props.paStatus.map((status, index) => (
                                <SwitchBar key={index} onCheck={(checked) => props.onChangePAStatus(!checked, index)} checked={!status} title={(index + 1).toString()}/>
                            ))}
                        </div>
                        <div className={styles.statusSwitches}>
                            <SwitchBar onCheck={(checked) => props.onChangeScannerStatus(!checked)} checked={!props.scanner} title=""/>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    )
}

export default Station;