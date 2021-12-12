import React from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import styled from 'styled-components'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ChannelSearch from '../channelsearch/ChannelSearch'
import TeamChannelList from '../teamchannellist/TeamChannelList'
import TeamChannelPreview from '../teamchannelpreview/TeamChannelPreview'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Sidebar = ({ logout }) => {
    return (
        <SidebarContainer>
            <SidebarIcon1>
                <Icon1Inner>
                    <HomeIcon/>
                </Icon1Inner>
            </SidebarIcon1>
            <SidebarIcon2>
                <Icon1Inner>
                    <ExitToAppIcon onClick={logout}/>
                </Icon1Inner>
            </SidebarIcon2>
        </SidebarContainer>
    )
}

const CompanyHeader = () => {
    return (
        <CompanyHeaderContainer>
            <HeaderText>Hangout</HeaderText>
        </CompanyHeaderContainer>
    )
}

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
}

const ChannelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    const { client } = useChatContext()

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');
  
        window.location.reload()
    }

    const filters = { members: { $in: [client.userID] } }

    return (
        <>
            <Sidebar logout={logout}/>
            <ChannelListWrapper>
                <CompanyHeader/>
                <ChannelSearch/>
                <ChannelList 
                    filter={filters} 
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList {...listProps} 
                            type="team" 
                            isCreating={isCreating}
                            setIsCreating={setIsCreating} 
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            type="team"
                            {...previewProps} 
                            setIsCreating={setIsCreating} 
                            setIsEditing={setIsEditing}  
                        />
                    )}
                />
                <ChannelList 
                    filter={filters} 
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList {...listProps}
                            type="messaging"  
                            isCreating={isCreating}
                            setIsCreating={setIsCreating} 
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            type="team" 
                            {...previewProps} 
                            setIsCreating={setIsCreating} 
                            setIsEditing={setIsEditing} 
                        />
                    )}
                />
            </ChannelListWrapper>
        </>
    )
}

const ChannelListWrapper = styled.div`
width: 20%;
background-color: #E32636;
display: flex;
flex-direction: column;
`;

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

const CompanyHeaderContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 60px;
`;

const HeaderText = styled.div`
font-size: 18px;
font-weight: bold;
line-height: 28px;
color: rgb(33, 42, 46);
`;

export default ChannelListContainer
