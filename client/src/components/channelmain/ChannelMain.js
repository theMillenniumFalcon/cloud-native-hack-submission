import React from 'react'
import styled from 'styled-components'
import { Channel, MessageTeam } from 'stream-chat-react'
import CreateChannel from '../createchannel/CreateChannel'
import EditChannel from '../editchannel/EditChannel'
import ChannelInner from '../channelinner/ChannnelInner'

const ChannelMain = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {

    if(isCreating) {
        return (
            <ChannelContainer>
                <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
            </ChannelContainer>
        )
    }

    if(isEditing) {
        return (
            <ChannelContainer>
                <EditChannel setIsEditing={setIsEditing}/>
            </ChannelContainer>
        )
    }

    const EmptyState = () => {
        <ChannelEmptyContainer>
            <FirstEmpty>This is the beginning of your chat history.</FirstEmpty>
            <SecondEmpty>Send messages, attachments, links, emojis, and more!</SecondEmpty>
        </ChannelEmptyContainer>
    }

    return (
        <ChannelContainer>
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </ChannelContainer>
    )
}

const ChannelContainer = styled.div`
height: 100%;
width: 100%;
`;

const ChannelEmptyContainer = styled.div`
display: flex;
height: 100%;
flex-direction: column;
justify-content: flex-end;
margin-left: 20px;
margin-right: 20px;
padding-bottom: 20px;
`;

const FirstEmpty = styled.div`
font-weight: bold;
font-size: 18px;
line-height: 120%;
color: #2c2c30;
margin-bottom: 10px;
`;

const SecondEmpty = styled.div`
font-size: 14px;
line-height: 120%;
margin: 0;
color: #858688;
`;

export default ChannelMain
