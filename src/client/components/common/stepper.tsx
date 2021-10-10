import React, {FC} from "react";
import Step from "@material-ui/core/Step/Step";
import MuiStepper, {StepperProps as MuiStepperProps} from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import {makeStyles} from "@material-ui/core/styles";
import cx from "classNames";
import StepConnector from "@material-ui/core/StepConnector";

const useStyles = makeStyles((theme) => ({
    stepperRoot: {
        backgroundColor: "#072041",
        padding: "12px 20px",
        marginLeft: "-8px",
        gap: 90
    },
    alternativeLabel: {
        flex: "none"
    },
    label: {
        marginTop: "3px !important",
        fontSize: 16
    },
    labelRoot: {
        color: "#072041"
    },
    active: {
        color: "#072041",
        backgroundColor: "#ACBCCF",
    },
    completed: {
        color: "rgba(255, 255, 255, 0.7)"
    },
    stepConnector: {
        borderTopStyle: "dashed",
        borderWidth: "2px",
    },
    connectorLabel: {
        top: 24,
        left: "calc(-50% + 45px + -90px)",
        right: "calc(50% + 35px)"
    },
    circle: {
        backgroundColor: "#2A486F",
        width: "48px",
        height: "48px",
        border: "1px solid",
        borderRadius: "48px",
        lineHeight: "44px",
        fontSize: 24,
        paddingLeft: "34%",
        boxSizing: "border-box",
        "&--active": {
            color: "#072041",
            backgroundColor: "#ACBCCF",
        }
    }
}));

const StepIcon = (props: { active: boolean, completed: boolean, icon: React.ReactElement }) => {
    const { active, completed, icon } = props;
    const styles = useStyles();

    if (completed) {
        return <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 0 24 24" width="48px" fill="#2a486f">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    }
    else {
        return <div className={cx(styles.circle, { [styles.circle + "--active"]: props.active }, { [styles.circle + "--completed"]: props.completed })}>
            {icon}
        </div>
    }
};

interface StepeprProps extends Omit<MuiStepperProps, "children"> {
    steps: Array<{ label: string }>
}

const Stepper: FC<StepeprProps> = (props: StepeprProps) => {
    const classes = useStyles();

    return <MuiStepper
        {...props}
        connector={<StepConnector classes={{lineHorizontal: classes.stepConnector, alternativeLabel: classes.connectorLabel}}/>}
        classes={{ root: classes.stepperRoot }}
        activeStep={props.activeStep}
        alternativeLabel
    >
        {props.steps.map(({label}, index) => (
            <Step classes={{ alternativeLabel: classes.alternativeLabel }} key={label}>
                <StepLabel
                    StepIconComponent={StepIcon}
                    classes={{ label: classes.label, root: classes.labelRoot, completed: classes.completed}}
                >
                    {label}
                </StepLabel>
            </Step>
        ))}
    </MuiStepper>
};

export default Stepper;