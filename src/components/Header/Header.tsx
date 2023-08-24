import React, {useState} from 'react';
import s from './header.module.scss'
import {
    AppBar,
    Avatar,
    Container,
    Divider,
    Hidden,
    IconButton, List, ListItem,
    SwipeableDrawer,
    Toolbar,
    useMediaQuery
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {CardType} from "../../type/types";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {ChevronRight} from "@mui/icons-material";

type HeaderPropsType = {
    cart: CardType[]
    totalCost?: number
}

const useStyles = makeStyles(() => ({
    avatar: {
        marginRight: 'auto',
        color: 'white',
        backgroundColor: 'black !important',
        borderRadius: '0 !important',
        height: 30,
        border: '2px solid white',
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent'
    },
    linkHor: {
        color: "white",
        textDecoration: 'none',
        fontSize: 'calc(12px + 10 * (100vw / 1440))'
    },
    linkBox: {
        display: 'flex',
        gap: '15px',
        marginRight: 'auto',
        alignSelf: 'center',
        justifySelf: 'center'
    },
    burgerBox: {
        marginRight: '5%',
    },
    menuOpen: {

    }
}))

const Header = (props: HeaderPropsType) => {
    const [open, setOpen] = useState<boolean>(false)

    const styles = useStyles()

    const hiddenLink = useMediaQuery<any>('(max-width: 768px)')
    const hiddenIcon = useMediaQuery<any>('(min-width: 768.1px)')

    return (
        <AppBar position={'sticky'} color={'primary'}>
            <Container maxWidth={'xl'}>
                <Toolbar disableGutters>
                    <Avatar className={styles.avatar}>A</Avatar>

                    {hiddenLink ? null : <div className={styles.linkBox}>
                        <Link className={styles.linkHor} to={'/'}>Главная</Link>
                        <Link className={styles.linkHor} to={'/product'}>Товары</Link>
                        <Link className={styles.linkHor} to={'/checkout'}>Оформить заказ</Link>
                        <Link className={styles.linkHor} to={'/about'}>О нас</Link>
                    </div>}
                    {hiddenIcon ? null : <div className={styles.burgerBox}>
                        <IconButton color={'inherit'} size={'large'}>
                            <MenuIcon onClick={() => setOpen(true)}/>
                        </IconButton>
                    </div>}

                    <span>Amount: <span>{props.cart.length}</span></span>
                    <Link to={'/shoppingCart'}>
                        <IconButton color="default" aria-label="add to shopping cart">
                            <AddShoppingCartIcon/>
                        </IconButton>
                    </Link>
                    <span>Total: <span
                        className={s.info}>{props.totalCost ? props.totalCost : 0} $</span></span>
                </Toolbar>
            </Container>
            <SwipeableDrawer
                className={styles.menuOpen}
                onOpen={() => {setOpen(true)}}
                onClose={() => {setOpen(false)}}
                open={open}
                anchor={'right'}
            >
                <div>
                    <IconButton>
                        <ChevronRight onClick={() => setOpen(false)}/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem>
                        <Link to={'/'}>Главная</Link>
                    </ListItem>
                    <ListItem>
                        <Link to={'/product'}>Товары</Link>
                    </ListItem>
                    <ListItem>
                        <Link to={'/checkout'}>Оформить заказ</Link>
                    </ListItem>
                    <ListItem>
                        <Link to={'/about'}>О нас</Link>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </AppBar>
    );
};

export default Header;