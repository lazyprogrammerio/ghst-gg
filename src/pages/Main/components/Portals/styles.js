import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    portalsColumn: {
        marginBottom: 30,
        [theme.breakpoints.up('md')]: {
            marginBottom: 0
        }
    },
    portalsDescr: {
        fontSize: 24
    },
    portalsImage: {
        cursor: 'pointer',
        width: 150,
        height: 150
    },
    explorerLink: {
        display: 'inline-block',
        color: theme.palette.primary.main,
        textDecoration: 'none',
        position: 'relative',
        '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            bottom: 0,
            left: '50%',
            opacity: .3,
            transform: 'translateX(-50%)',
            transition: 'all .3s ease-in-out',
            width: 0,
            height: 1,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.main
        },
        '&:hover::after': {
            opacity: 1,
            width: '100%'
        }
    },
    highlight: {
        color: theme.palette.primary.main
    }
}));