import React from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import ChannelSearch from '../channelsearch/ChannelSearch'
import CompanyHeader from '../companyheader/CompanyHeader'
import Sidebar from '../sidebar/Sidebar'
import TeamChannelList from '../teamchannellist/TeamChannelList'

// import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'

const Channels = () => {
    return (
        <>
            <Sidebar/>
            <ChannelListWrapper>
                <CompanyHeader/>
                <ChannelSearch/>
                <ChannelList 
                    filter={{}} 
                    channelRenderFilterFn={() => {}}
                    List={(listProps) => (
                        <TeamChannelList {...listProps} type="team" />
                    )}
                />
            </ChannelListWrapper>
        </>
    )
}

const ChannelListWrapper = styled.div`
width: 15%;
background-color: rgb(33, 42, 46);
display: flex;
flex-direction: column;
`;

export default Channels
