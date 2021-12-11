import React, { useState } from 'react'
import styled from 'styled-components'
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

export const GiphyContext = React.createContext({})

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false)
  const { sendMessage } = useChannelActionContext()
  
  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    }
    
    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` }
    }
    
    if (sendMessage) {
      sendMessage(updatedMessage)
      setGiphyState(false)
    }
  }

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
    const { channel, watcher_count } = useChannelStateContext()
    const { client } = useChatContext()
  
    const MessagingHeader = () => {
      const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID)
      const additionalMembers = members.length - 3
  
      if(channel.type === 'messaging') {
        return (
          <ChannelNameWrapper>
            {members.map(({ user }, i) => (
              <ChannelNameMulti key={i}>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <ChannelNameMultiUser>{user.fullName || user.id}</ChannelNameMultiUser>
              </ChannelNameMulti>
            ))}
  
            {additionalMembers > 0 && <ChannelNameMultiUser>and {additionalMembers} more</ChannelNameMultiUser>}
          </ChannelNameWrapper>
        )
      }
  
      return (
        <TeamChannelWrapper>
          <TeamChannelName># {channel.data.name}</TeamChannelName>
          <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}>
            <InfoOutlinedIcon />
          </span>
        </TeamChannelWrapper>
      );
    };
  
    const getWatcherText = (watchers) => {
      if (!watchers) return 'No users online';
      if (watchers === 1) return '1 user online';
      return `${watchers} users online`;
    }
  
    return (
      <TeamChannelContainer>
        <MessagingHeader />
        <ChannelRight>
          <ChannelRightText>{getWatcherText(watcher_count)}</ChannelRightText>
        </ChannelRight>
      </TeamChannelContainer>
    );
  }

  const ChannelNameWrapper = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  overflow-x: auto;
  max-width: 500px;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  `;

  const ChannelNameMulti = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  `;

  const ChannelNameMultiUser = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  font-weight: 500;
  font-size: 14px;
  `;

  const TeamChannelWrapper = styled.div`
  display: flex;
  align-items: center;
  `;

  const TeamChannelName = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #2c2c30;
  margin-right: 8px;
  `;

  const TeamChannelContainer = styled.div`
  position: relative;
  height: 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #ffffff;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  border-top-right-radius: 16px;
  z-index: 1;
  `;

  const ChannelRight = styled.div`
  flex: 0.55;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  `;

  const ChannelRightText = styled.div`
  font-size: 14px;
  color: #858688;
  `;

  export default ChannelInner