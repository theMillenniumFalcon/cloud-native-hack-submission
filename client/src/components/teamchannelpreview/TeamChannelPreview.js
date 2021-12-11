import React from 'react'
import styled from 'styled-components'
import { Avatar, useChatContext } from 'stream-chat-react'

const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext()

    const ChannelPreview = () => (
        <ChannelPreviewItem>
            # { channel?.data?.name || channel?.data?.id }
        </ChannelPreviewItem>
    )

    // eslint-disable-next-line no-lone-blocks
    {/*
        [{}, {}] --> not ann array of objects

        rather in this way:
        {
            '123': {}
            '343': {}
            '090': {}
            '323': {}
            '473': {}
            '324': {}
        }
    */}

    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID)

        return (
            <PreviewItem>
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.name}
                    size={24}
                />
                <p>{members[0]?.user?.fullName}</p>
            </PreviewItem>
        )
    }

    return (
        <>
            {
                channel?.id === activeChannel?.id ? (
                    <TeamChannelPreviewContainerSelected 
                        onClick={() => {
                            setIsCreating(false)
                            setIsEditing(false)
                            setActiveChannel(channel)
                        }}>
                        {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
                    </TeamChannelPreviewContainerSelected>
                ) : (
                    <TeamChannelPreviewContainer 
                        onClick={() => {
                            setIsCreating(false)
                            setIsEditing(false)
                            setActiveChannel(channel)
                        }}>
                        {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
                    </TeamChannelPreviewContainer>
                )
            }
        </>
    )
}

const TeamChannelPreviewContainerSelected = styled.div`
height: auto;
display: flex;
align-items: center;
background: rgba(0, 0, 0, 0.2);
border-top-right-radius: 8px;
border-bottom-right-radius: 8px;
font-weight: bold;
margin-right: 16px;
cursor: pointer;
z-index: 2;
`;

const TeamChannelPreviewContainer = styled.div`
height: 37px;
display: flex;
align-items: center;
`;

const ChannelPreviewItem = styled.div`
display: flex;
align-items: center;
font-family: Helvetica Neue, sans-serif;
font-size: 14px;
color: #ffffff;
padding: 0px 20px;
height: 100%;
width: 100%;
text-overflow: ellipsis;
word-break: break-all;
cursor: pointer;
`;

const PreviewItem = styled.div`
display: flex;
align-items: center;
font-family: Helvetica Neue, sans-serif;
font-size: 14px;
color: #ffffff;
padding: 0px 20px;
height: 100%;
width: 100%;
text-overflow: ellipsis;
word-break: break-all;
`;

export default TeamChannelPreview
