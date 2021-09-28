import { createTheme } from "@material-ui/core/styles";

export default createTheme({
    typography: {
        fontFamily: "Lato"
    },
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
            hover: "#112033",
        },
        success: {
            main: "#50e3c2"
        },
        error: {
            main: "#ff6666"
        },
        text: {
            primary: "#d7dee8",
            disabled: "#d7dee8",
            secondary: "#acbccf"
        }
    },
    overrides: {
        MuiButton: {
            root: {
              textTransform: "unset"
            },
            contained: {
                "&.Mui-disabled": {
                    backgroundColor: "#1a5ab6"
                }
            }
        },
        //@ts-ignore
        MuiToggleButton: {
            root: {
                textTransform: "unset"
            },
        },
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
            body1: {
                lineHeight: "unset"
            },
            h6: {
                fontSize: 26,
                fontFamily: "Lato"
            },
            h5: {
                fontSize: 22,
                lineHeight: "34px"
            },
            h4: {
                fontSize: 28
            }
        }
    }
});