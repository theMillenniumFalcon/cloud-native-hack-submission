import React from 'react'
import styled from 'styled-components'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarIcon1>
                <Icon1Inner>
                    <HomeIcon/>
                </Icon1Inner>
            </SidebarIcon1>
            <SidebarIcon2>
                <Icon1Inner>
                    <ExitToAppIcon/>
                </Icon1Inner>
            </SidebarIcon2>
        </SidebarContainer>
    )
}

const SidebarContainer = styled.div`
width: 72px;
height: 100vh;
background-color: rgb(13, 17, 19);
box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.25);
`;

const SidebarIcon1 = styled.div`
width: 44px;
height: 44px;
margin: 14px;
background: linear-gradient(
    150.64deg,
    rgba(0, 0, 0, 0.1) 12.73%,
    rgba(0, 0, 0, 0) 89.32%
  ),
  #ffffff;
border-radius: 9999px;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.33);
`;

const Icon1Inner = styled.div`
height: 100%;
display: flex;
align-items: center;
justify-content: center;
`;

const SidebarIcon2 = styled.div`
width: 44px;
height: 44px;
margin: 14px;
background: linear-gradient(
    150.64deg,
    rgba(0, 0, 0, 0.1) 12.73%,
    rgba(0, 0, 0, 0) 89.32%
  ),
  #ffffff;
border-radius: 9999px;
box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.33);
`;

export default Sidebar
