import React, { useState } from 'react'
import styled from 'styled-components'
import { useChatContext } from 'stream-chat-react'

import { CloseCreateChannel } from '../../CloseCreateChannel'
import UserList from '../userlist/UserList'

const ChannelNameInput = ({ channelName= '', setChannelName }) => {

    const handleChange = (e) => {
        e.preventDefault()
        setChannelName(e.target.value)
    }

    return (
        <ChannelNameWrapper>
            <p>Name:</p>
            <input value={channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </ChannelNameWrapper>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const [channelName, setChannelName] = useState('')
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])

    return (
        <CreateChannelContainer>
            <CreateChannelHeader>
                <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </CreateChannelHeader>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
            <UserList setSelectedUsers={setSelectedUsers}/>
        </CreateChannelContainer>
    )
}

const CreateChannelContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`;

const CreateChannelHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
height: 62px;
box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
padding-right: 20px;
p {
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #2c2c30;
    margin-left: 20px;
}
`;

const ChannelNameWrapper = styled.div`
display: flex;
flex-direction: column;
height: 169px;
padding-left: 20px;
box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
p {
    font-family: Helvetica Neue, sans-serif;
    font-size: 16px;
    line-height: 120%;
    color: #2c2c30;
    margin-top: 30px;
}
input {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);
    height: 50px;
    width: 540px;
    background: #f7f6f8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 8px;
    padding-left: 16px;
    outline: 0;
}
`;

export default CreateChannel
