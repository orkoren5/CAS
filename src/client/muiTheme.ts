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
        MuiDialogTitle: {
            root: {
                padding: "5px 20px"
            }
        },
        MuiFormLabel: {
            root: {
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
                lineHeight: "12px",
                backgroundColor: "#072041"
            },
            stickyHeader: {
                backgroundColor: "#072041"
            },
            root: {
                fontSize: "12px",
                lineHeight: "12px",
                borderBottom: 0
            }
        }
    }
});