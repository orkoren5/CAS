import { createTheme } from "@material-ui/core/styles";

const colorMain = "#0A68EB";

export default createTheme({
    typography: {
        fontFamily: "Lato",
        h6: {
            fontSize: 26
        },
        h5: {
            fontSize: 22
        },
        h4: {
            fontSize: 28
        }
    },
    props: {
        MuiTypography: {
            variantMapping: {
                body2: "span",
                body1: "span"
            }
        }
    },
    palette: {
        // palette values for dark mode
        type: "dark",
        background: {
            paper: "#0E305C",
        },
        primary: {
            main: colorMain
        },
        action: {
            hover: "#3086ff",
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
            outlined: {
                border: "1px solid #5e7a9b"
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
                textTransform: "unset",
                color: colorMain,
                border: "1px solid " + colorMain,
                borderRadius: 0,
                "&.Mui-selected": {
                    backgroundColor: colorMain,
                    color: "white",
                    "&:hover": {
                        backgroundColor: colorMain
                    }
                }
            },
            sizeSmall: {
                padding: "3px 7px"
            }
        },
        MuiIconButton: {
            root: {
                "& svg": {
                    transition: "color 0.1s"
                },
                "&:hover": {
                    backgroundColor: "unset",
                    "& svg": {
                        color: "#104996"
                    }
                }
            }
        },
        MuiDialog: {
            paperWidthMd: {
                maxWidth: 870
            },
            paperWidthSm: {
                maxWidth: 486
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
                borderBottom: 0,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden"
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
                fontFamily: "Lato"
            },
            h5: {
                lineHeight: "34px"
            }
        },
        MuiTooltip: {
            tooltip: {
                backgroundColor: "#0f111b",
                padding: "14px 20px"
            },
            arrow: {
                color: "#0f111b"
            }
        },
        MuiSwitch: {
            thumb: {
                height: 13,
                width: 13
            },
            switchBase: {
                top: 3,
                "&.Mui-checked": {
                    transform: "translateX(23px)"
                }
            }
        },
        MuiInputAdornment: {
            positionEnd: {
                marginRight: 8
            }
        },
        MuiCalendarPicker: {
            root: {
                backgroundColor: "#072041"
            }
        },
        MuiPickerDay: {
            root: {
                color: "white"
            }
        }
    }
});