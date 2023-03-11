import React from "react";
import { Grid } from '@mui/material';
import styled from "styled-components";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MessageIcon from '@mui/icons-material/Message';
import { mobileVersionWidth } from '../../utils';
import { Messages } from "../../pages/Messages";
const HeaderContainer = styled.div`
    
    border-bottom: 2px solid #ededed;
    padding-bottom: 20px;
    margin-bottom: 20px;
    .header-action-items {
        color: ${({ theme }) => theme.textColor};

        @media screen and (max-width: ${mobileVersionWidth}px) {
            justify-content: space-around;
        }
    }
`;
const MessageCounter = styled.span`
        background-color: red;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        justify-content: center;
        padding: 10px;
        display: flex;
        align-items: center;
        color: #fff;
        position: absolute;
        right: 16px;
        top: -7px;
`
const DateContainer = styled.div`
    font-size: 24px;
    color: ${({ theme }) => theme.textColor};
    font-weight: 400;
`
const Greeting = styled.div`
    font-size: 36px;
    color: ${({ theme }) => theme.textColor};
    font-weight: 700;
    text-transform: uppercase;
`
const ProfileName = styled.section`
`;
const ProfileRole = styled.section`
`;
export const Header = (props: any) => {
    
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today  = new Date();
    const [openMessages, setOpenMessages] = React.useState(false);
    const handleOpenMessages = () => {
        setOpenMessages(true);
      };
    
    const closeMessages = () => {
        setOpenMessages(false);
    };
    const greetingText = React.useMemo(() => {
        const hrs = new Date().getHours();

        let greet;
        if (hrs < 12)
        greet = 'Good Morning';
        else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
        else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
        return greet;
    }, []);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
      <HeaderContainer>
        <Grid justifyContent="space-between" container spacing={4}>
            <Grid item sm={12} md={6}>
                <DateContainer>{today.toLocaleDateString("en-US", options)}</DateContainer>
                <Greeting>{greetingText}</Greeting>
            </Grid>
            <Grid className='header-action-items' alignItems="center" style={{display: "flex"}} lg={4} item xs={12} md={6}>
                <Grid textAlign="right" style={{paddingRight: 10}} item>
                    <ProfileName>Tsvetan Mitev</ProfileName>
                    <ProfileRole>Manager</ProfileRole>
                </Grid>
                <Grid item justifyContent="center" display="flex" position="relative">
                    <MessageIcon onClick={handleOpenMessages} fontSize="large"  />
                    <MessageCounter>2</MessageCounter>
                </Grid>
                <Grid alignItems="center" style={{display: "flex"}}  item ><LocationOnIcon  fontSize="large"  /> Chateauguay</Grid>
                <Grid alignItems="center" item >
                </Grid>
            </Grid>
        </Grid>
        <Messages
        open={openMessages}
        onClose={closeMessages}
        />
      </HeaderContainer>
    );
};
