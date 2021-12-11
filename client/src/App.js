import React, { useState } from 'react'
import styled from 'styled-components'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { Channels, ChannelMain, Auth } from './components'

const cookies = new Cookies()

const ApiKey = '4hjn887t4ape'
const authToken = cookies.get("token")

const client = StreamChat.getInstance(ApiKey)

if(authToken) {
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

function App() {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  if (!authToken) return <Auth/>

  return ( 
    <AppContainer>
      <Chat client={client} theme="team light">
        <Channels
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelMain
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
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
