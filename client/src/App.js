import React from 'react'
import styled from 'styled-components'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelList, Channel } from './components'

const ApiKey = '4hjn887t4ape'

const client = StreamChat.getInstance(ApiKey)

function App() {
  return (
    <AppContainer>
      <Chat client={client} theme="team light">
        <ChannelList/>
        <Channel/>
      </Chat>
    </AppContainer>
  );
}

const AppContainer = styled.div`
display: flex;
flex: 1;
height: 100vh;
`;

export default App;
