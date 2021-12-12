import React, { useState } from 'react'
import styled from 'styled-components'
import { useChatContext } from 'stream-chat-react'
import UserList from '../userlist/UserList'
import { CloseCreateChannel } from '../../CloseCreateChannel'

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

const EditChannel = ({ setIsEditing }) => {
    const { channel } = useChatContext()
    const [channelName, setChannelName] = useState(channel?.data?.name)
    const [selectedUsers, setSelectedUsers] = useState([])

    const updateChannel = async (e) => {
        e.preventDefault()

        const nameChanged = channelName !== (channel.data.name || channel.data.id)

        if(nameChanged) {
            await channel.update({ name: channelName}, { text: `Channel name changed to ${channelName}` })
        }

        if(setSelectedUsers.length) {
            await channel.addMembers(selectedUsers)
        }

        setChannelName(null)
        setSelectedUsers(false)
        setSelectedUsers([])
    }

    return (
        <EditChannelContainer>
            <EditChannelHeader>
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing}/>
            </EditChannelHeader>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
            <UserList setSelectedUsers={setSelectedUsers}/>
            <EditChannelButton onClick={updateChannel}>
                <p>Save Changes</p>
            </EditChannelButton>
        </EditChannelContainer>
    )
}

const EditChannelContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`;

const EditChannelHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
height: 62px;
box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
padding-right: 20px;
p {
    font-family: Helvetica Neue, sans-serif;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #2c2c30;
    margin-left: 20px;
}
svg {
    cursor: pointer;
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

const EditChannelButton = styled.div`
height: 82px;
background: #f7f6f8;
display: flex;
align-items: center;
justify-content: flex-end;
border-bottom-right-radius: 16px;
p {
    background: #005fff;
    font-weight: bold;
    font-size: 18px;
    padding: 10px 20px;
    color: #ffffff;
    margin-right: 30px;
    border-radius: 8px;
    cursor: pointer;
}
`;


export default EditChannel
