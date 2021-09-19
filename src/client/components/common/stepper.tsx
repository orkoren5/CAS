import React, { FC } from "react";
import Step from "@material-ui/core/Step/Step";
import MuiStepper, { StepperProps as MuiStepperProps } from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import { makeStyles } from "@material-ui/core/styles";
import cx from "classNames";
import {StepConnector} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    stepperRoot: {
        backgroundColor: "#072041",
        padding: "12px 20px",
        marginLeft: "-8px",
        gap: 12
    },
    alternativeLabel: {
        flex: "none"
    },
    label: {
        marginTop: "3px !important",
        fontSize: "11px"
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
        borderTopStyle: "dashed"
    },
    circle: {
        backgroundColor: "#2A486F",
        width: "24px",
        height: "24px",
        border: "1px solid",
        borderRadius: "24px",
        lineHeight: "20px",
        paddingLeft: "27%",
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
        return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd">
                <g fill="#56A500">
                    <path d="M12 0c6.6 0 12 5.4 12 12s-5.4 12-12 12S0 18.6 0 12 5.4 0 12 0zm0 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm6.718 6.732c.195.195.195.512 0 .707l-7.779 7.779c-.173.173-.443.192-.638.057l-.069-.057-4.95-4.95c-.195-.195-.195-.512 0-.707.196-.196.512-.196.708 0l4.596 4.596 7.424-7.425c.196-.195.512-.195.708 0z" transform="translate(-700 -234) translate(646 174) translate(0 48) translate(4) translate(50 12)"/>
                </g>
            </g>
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
        connector={<StepConnector classes={{lineHorizontal: classes.stepConnector}}/>}
        classes={{ root: classes.stepperRoot }}
        activeStep={props.activeStep}
        alternativeLabel
    >
        {props.steps.map(({label}, index) => (
            <Step classes={{ alternativeLabel: classes.alternativeLabel }} key={label}>
                <StepLabel StepIconComponent={StepIcon} classes={{ label: classes.label, root: classes.labelRoot, completed: classes.completed}}>{label}</StepLabel>
            </Step>
        ))}
    </MuiStepper>
};

export default Stepper;