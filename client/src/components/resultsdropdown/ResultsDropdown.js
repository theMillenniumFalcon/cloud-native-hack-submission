import React from 'react';
import styled from 'styled-components'
import { Avatar, useChatContext } from 'stream-chat-react';

const channelByUser = async ({ client, setActiveChannel, channel, setChannel }) => {
  const filters = {
    type: 'messaging',
    member_count: 2,
    members: { $eq: [client.user.id, client.userID] },
  };

  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) return setActiveChannel(existingChannel);

  const newChannel = client.channel('messaging', { members: [channel.id, client.userID] });
  
  setChannel(newChannel)

  return setActiveChannel(newChannel);
};

const SearchResult = ({ channel, focusedId, type, setChannel, setToggleContainer }) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === 'channel') {
    return (
        <>
            {(focusedId === channel.id) ? (
            <ChannelResultFocused onClick={() => {
                setChannel(channel)
                if(setToggleContainer) {
                  setToggleContainer((prevState) => !prevState)   
                }
              }}>
                  <ResultHashtag></ResultHashtag>
                  <ChannelResultText>
                      <p>{channel.data.name}</p>
                  </ChannelResultText>
            </ChannelResultFocused>
            ) : (
            <ChannelResult onClick={() => {
                setChannel(channel)
                if(setToggleContainer) {
                  setToggleContainer((prevState) => !prevState)   
                }
              }}>
                    <ResultHashtag></ResultHashtag>
                    <ChannelResultText>
                        <p>{channel.data.name}</p>
                    </ChannelResultText>
            </ChannelResult>
        )}
        </>
    );
  }

  return (
    <>
        {(focusedId === channel.id) ? (
            <ChannelResultFocused onClick={async () => {
                channelByUser({ client, setActiveChannel, channel, setChannel })
                if(setToggleContainer) {
                    setToggleContainer((prevState) => !prevState)   
                }
              }}>
                    <ChannelResultUser>
                        <Avatar image={channel.image || undefined} name={channel.name} size={24} />
                        <ChannelResultText>
                            <p>{channel.data.name}</p>
                        </ChannelResultText>
                    </ChannelResultUser>
            </ChannelResultFocused>
            ) : (
            <ChannelResult onClick={async () => {
                channelByUser({ client, setActiveChannel, channel, setChannel })
                if(setToggleContainer) {
                    setToggleContainer((prevState) => !prevState)   
                }
              }}>
                    <ChannelResultUser>
                        <Avatar image={channel.image || undefined} name={channel.name} size={24} />
                        <ChannelResultText>
                            <p>{channel.data.name}</p>
                        </ChannelResultText>
                    </ChannelResultUser>
            </ChannelResult>
        )}
    </>
  );
};

const ResultsDropdown = ({ teamChannels, directChannels, focusedId, loading, setChannel, setToggleContainer }) => {

  return (
    <ChannelSearchResults>
      <ChannelSearchResultsHeader>Channels</ChannelSearchResultsHeader>
      {loading && !teamChannels.length && (
        <ChannelSearchResultsHeader>
          <i>Loading...</i>
        </ChannelSearchResultsHeader>
      )}
      {!loading && !teamChannels.length ? (
        <ChannelSearchResultsHeader>
          <i>No channels found</i>
        </ChannelSearchResultsHeader>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='channel'
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
      <ChannelSearchResultsHeader>Users</ChannelSearchResultsHeader>
      {loading && !directChannels.length && (
        <ChannelSearchResultsHeader>
          <i>Loading...</i>
        </ChannelSearchResultsHeader>
      )}
      {!loading && !directChannels.length ? (
        <ChannelSearchResultsHeader>
          <i>No direct messages found</i>
        </ChannelSearchResultsHeader>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type='user'
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
    </ChannelSearchResults>
  )
}

const ChannelResultFocused = styled.div`
width: 100%;
height: 48px;
display: flex;
align-items: center;
background: #005fff1a;
`;

const ChannelResult = styled.div`
width: 100%;
height: 48px;
display: flex;
align-items: center;
&:hover {
    background: #005fff1a;
    cursor: pointer;
}
`;

const ResultHashtag = styled.div`
height: 24px;
width: 28px;
background: #005fff;
border-radius: 24px;
margin: 12px;
display: flex;
align-items: center;
justify-content: center;
font-weight: bold;
font-size: 14px;
line-height: 120%;
color: #ffffff;
`;

const ChannelResultText = styled.div`
p {
    width: 100%;
    font-family: Helvetica Neue, sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;
    color: #2c2c30;
}
`;

const ChannelResultUser = styled.div`
display: flex;
align-items: center;
margin-left: 12px;
`;

const ChannelSearchResults = styled.div`
position: absolute;
height: fit-content;
width: 300px;
background: #fff;
border: 1px solid #e9e9ea;
box-sizing: border-box;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
border-radius: 8px;
z-index: 10;
left: 230px;
top: 16px;
`;

const ChannelSearchResultsHeader = styled.div`
width: fit-content;
display: flex;
align-items: center;
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 120%;
color: #858688;
margin-left: 12px;
i {
    font-weight: normal;
    margin-left: 12px;
}
`;

export default ResultsDropdown