import React from 'react'
import styled from 'styled-components'
import {AddChannel} from '../../AddChannel'

const TeamChannelList = ({ children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    if (error) {
        return type === 'team' ? (
            <TeamChannelListContainer>
                <ListMessage>
                    Connection error, please wait a moment and try again...
                </ListMessage>
            </TeamChannelListContainer>
        ) : null
    }

    if (loading) {
        return (
            <TeamChannelListContainer>
                <ListLoadingMessage>
                    {type === 'team' ? 'Channels' : 'Message'} loading...
                </ListLoadingMessage>
            </TeamChannelListContainer>
        )
    }

    return (
        <TeamChannelListContainer>
            <ListHeader>
                <ListTitle>
                {type === 'team' ? 'Channels' : 'Direct Messages'}
                </ListTitle>
                <AddChannel
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    type={type === 'team' ? 'team' : 'messaging'}
                />
            </ListHeader>
            {children}
        </TeamChannelListContainer>
    )
}

const TeamChannelListContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`;

const ListMessage = styled.div`
color: #ffffff;
padding: 0 16px;
font-size: 15px;
`;

const ListLoadingMessage = styled.div`
color: #ffffff;
padding: 0 16px;
height: 115px;
`;

const ListHeader = styled.div`
padding: 0 16px;
display: flex;
justify-content: space-between;
align-items: center;
`;

const ListTitle = styled.div`
font-size: 13px;
font-weight: 600;
line-height: 16px;
height: 16px;
color: rgb(33, 42, 46, 0.8);
margin-bottom: 10px;
`;

export default TeamChannelList
