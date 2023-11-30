import { createTheme } from '@mui/material/styles';


export const storeTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: 8.5,
                    textTransform: 'none',
                    '&.MuiButton-contained': {
                        '&:hover': {
                            opacity: '.8'
                        },
                    },
                    '&.MuiButton-outlined': {
                        '&:hover': {
                            opacity: '.8'
                        },
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontSize: '1.7rem',
                },
            },
        },
    },
    typography: {
        h1: {
            fontSize: '2rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'capitalize',
        },
        h2: {
            fontWeight: 600
        },
        fontFamily: ['Roboto', 'sans-serif', 'Plus Jakarta Sans']
    },
    palette: {
        neutral: {
            main: 'rgb(192,192,192)',
        },
        mainBlack: {
            main: 'rgb(0,0,0)'
        },
        white: {
            main: '#ffffff'
        },
        darks: {
            one: '#101010',
            two: '#1f1f1f',
            three: 'rgb(40,40,40)'
        },
        brights: {
            one: '#ffffff',
            two: '#eeeeee4d'
        },

        yellow: { main: '#f0ce16' }
    }
});