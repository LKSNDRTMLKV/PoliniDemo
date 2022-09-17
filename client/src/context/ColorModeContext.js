import { createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Storage from "../constants/storage";
import localStorageHelper from "../helpers/localStorageHelper";

export const ColorModeContext = createContext({
    toggleColorMode: () => { },
    mode: "dark" || "light",
});

export const ColorModeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(
        localStorageHelper.exists(Storage.AUTH_THEME) ?
            localStorageHelper.getItem(Storage.AUTH_THEME) : "dark");


    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode(prevMode => prevMode === "light" ? "dark" : "light");
        },
        mode,

    }),
        [mode]);

    useEffect(() => {
        localStorageHelper.saveItem(Storage.AUTH_THEME, mode);
    }, [mode]);

    const toggledColorSuccess = mode === 'light' ? "#0288d1" : "#5cbc63";
    const toggledColorSecondary = mode === 'light' ? "#fff" : "#6e2aa4";
    const toggledColorPrimarySecondary = mode === 'light' ? "#0288d1" : "#6e2aa4";

    const theme = useMemo(
        () =>
            createTheme({



                palette: {
                    mode,

                    primary: {
                        main: "#e3f2fd",
                        contrastText: "#fff",
                    },
                    success: {
                        main: "#5cbc63",
                    },
                    secondary: {
                        main: "#6e2aa4",
                    },
                    info: {
                        main: "#0288d1",
                    },
                    error: {
                        main: "#f44336"
                    },
                    background: {
                        light: "#fff",
                        dark: "#35363a",
                    },
                    defalt: {
                        light: "#fff",
                        dark: "#35363a",
                    },
                    toggledSuccess: {
                        main: toggledColorSuccess,
                    },
                    toggledSecondary: {
                        main: toggledColorSecondary,
                    },
                    toggledPrimarySecondary: {
                        main:toggledColorPrimarySecondary
                    }
                },
                typography: {
                    h3: {
                        color: toggledColorSuccess,
                        fontWeight: 600,
                    },
                    h4: {
                        color: toggledColorSuccess,
                        fontWeight: 600,
                    },
                    h5: {
                        color: toggledColorSuccess,
                        fontWeight: 600,
                    },
                    h6: {
                        color: toggledColorSuccess,
                        fontWeight: 600,
                    },
                    body1: {
                        color: toggledColorSuccess,
                        fontWeight: 600,
                        // backgroundColor:mode === "light" ? "#fff" : "#35363a"
                    },
                    p: {
                        color: toggledColorSuccess,
                        fontWeight: 600,
                    },

                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                fontWeight: 600,
                            },

                        },
                    },
                    MuiUseMediaQuery: {
                        defaultProps: {
                            noSsr: true,
                        },
                    },
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                borderRadius: 0,
                            }
                        }
                    },
                    MuiRating: {
                        styleOverrides: {
                            root: {
                                color: toggledColorSuccess
                            }
                        }
                    },
                    MuiCardContent: {
                        styleOverrides: {
                            root: {
                                padding: "10px",
                            },
                            "&:last-child": {
                                padding: "10px"
                            }
                        }
                    },
                    MuiTextField : {
                        styleOverrides: {
                            root: {
                                    '& .MuiInputBase-input': {
                                        color:toggledColorSuccess,
                                        
                                    },
                                    'input:-webkit-autofill': {
                                        WebKitBoxShadow: "none",
                                        WebkitTextFillColor:`${toggledColorSuccess}`,
                                        caretColor:`${toggledColorSuccess}`
                                    },

                                    '& .MuiInputLabel-root ': {
                                        '&.Mui-focused':{
                                            color:`${toggledColorSuccess}!important`
                                        }
                                    },
                                    

                                   '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        border:"1px solid",
                                        color: toggledColorSuccess,
                                    borderColor: toggledColorPrimarySecondary,
                                    
                                    },
                                    '&:hover fieldset': {
                                     borderColor: toggledColorPrimarySecondary,
                                      },
                                    '&.Mui-focused fieldset': {
                                      borderColor: toggledColorPrimarySecondary,
                                    },
                                }
                            }
                        }
                    },
                    MuiSelect: {
                        styleOverrides :{
                            root: {
                                inputLabel: {

                                },
                                '& .MuiInputBase-input': {
                                    color:`${toggledColorSuccess}!important`,
                                },
                                '& .MuiSvgIcon-root': {
                                    color:toggledColorPrimarySecondary
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    
                                        border:"1px solid",
                                        color: `${toggledColorSuccess}!important`,
                                    borderColor: `${toggledColorPrimarySecondary}!important`,
                                    
                                    
                                    '&:hover fieldset': {
                                     borderColor: toggledColorPrimarySecondary,
                                      },

                                      
                                    '&:focus ': {
                                        color:`${toggledColorSuccess}`
                                    },

                                    },
                                    '& .Mui-focused fieldset': {
                                        color: `${toggledColorSuccess}!important`,
                                      borderColor: toggledColorPrimarySecondary,
                                    },

                            
                                
                            }
                        }
                    },

                    MuiFormControl:{
                        styleOverrides:{
                            root:{
                                '& .MuiInputLabel-root':{
                                   
                                        color:`${toggledColorSuccess}!important`,
                                    
                                    
                                }
                            }
                        }
                    },
                    

                    // MuiSvgIcon: {
                    //     styleOverrides:{
                    //         root:{
                               
                    //                 color:`${toggledColorPrimarySecondary}`
                                
                    //         }
                    //     }
                    // },
                   

                    MuiCssBaseline: {
                        styleOverrides: {
                            ":root":{
                                     "*::-webkit-scrollbar": {
                                        width: "12px"
                                    },
                                    "*::-webkit-scrollbar-track": {
                                        background: mode === "light" ? "#cbe6f7" : "#27242a"
                                      },
                                    "*::-webkit-scrollbar-thumb": {
                                        backgroundImage: mode === "light" ?
                                        "linear-gradient(#0288d1, #9cd1ee)" :
                                        "linear-gradient(#6e2aa4, #5cbc63)",
                                        borderRadius:"25px",
                                    }

                            }

                              
                        }

                    }



                    // MuiBox: {
                    //     styleOverrides: {
                    //         root: {
                    //             filter: mode === "dark" && ("brightness(50%)")
                    //         }
                    //     }
                    // }

                    // MuiAccordion: {
                    //     styleOverrides:{
                    //         root:{
                    //             backgroundColor:"#282424",
                    //             backgroundImage:'none',
                    //             boxShadow:'none'
                    //         }
                    //     }
                    // }

                },


            }),
        [mode],
    );

    



    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
                <Paper sx={ { minHeight: "100vh", pt: 12, display: "flex", flexFlow: "column wrap", }}>
                    {children}
                </Paper>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );


};

export const useColorMode = () => useContext(ColorModeContext);
