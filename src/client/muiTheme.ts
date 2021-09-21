import { createTheme } from "@material-ui/core/styles";

export default createTheme({
    palette: {
        // palette values for dark mode
        type: "dark",
        background: {
            paper: "#0E305C"
        },
        primary: {
            main: "#0A68EB"
        },
        action: {
            hover: "#112033"
        },
        text: {
            primary: "#d7dee8",
            disabled: "#d7dee8",
            secondary: "#acbccf"
        }
        // divider: deepOrange[700],
        // background: {
        //     default: deepOrange[900],
        //     paper: deepOrange[900],
        // },
        // text: {
        //     primary: '#fff',
        //     secondary: grey[500],
        // },
    },
    overrides: {
        MuiDialog: {
            paperWidthMd: {
                maxWidth: 870
            }
        },
        MuiDialogTitle: {
            root: {
                padding: "5px 20px"
            }
        },
        MuiFormLabel: {
            root: {
                color: "#d7dee8",
                "&.Mui-focused": {
                    color: "white"
                }
            },
        },
        MuiInput: {
            underline: {
                "&:before.Mui-focused": {
                    borderBottom: "2px solid white"
                }
            }
        },
        MuiTableCell: {
            head: {
                lineHeight: "24px",
                backgroundColor: "#072041"
            },
            stickyHeader: {
                backgroundColor: "#072041"
            },
            root: {
                fontSize: "14px",
                lineHeight: "30px",
                borderBottom: 0
            }
        },
        MuiStepLabel: {
            label: {
                "&.MuiStepLabel-completed": {
                    color: "#2a486f"
                }
            }
        },
        MuiTypography: {
            h6: {
                fontSize: 26
            }
        }
    }
});