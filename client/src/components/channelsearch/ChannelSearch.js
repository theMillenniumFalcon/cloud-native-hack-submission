import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useChatContext } from 'stream-chat-react'
import SearchIcon from '@material-ui/icons/Search';
import ResultsDropdown from '../resultsdropdown/ResultsDropdown';

const ChannelSearch = () => {
    const {client, setActiveChannel} = useChatContext()
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [teamChannels, setTeamChannels] = useState([])
    const [directChannels, setDirectChannels] = useState([])

    useEffect(() => {
        if(!query) {
            setTeamChannels([])
            setDirectChannels([])
        }
    }, [query])

    const getChannels = async (text) => {
        try {
            const channelResponse = client.queryChannels({
                type: 'team', 
                name: { $autocomplete: text }, 
                members: { $in: [client.userID]}
            })
            const userResponse = client.queryUsers({
                id: { $ne: client.userID },
                name: { $autocomplete: text }
            })

            const [channels, { users }] = await Promise.all([channelResponse, userResponse])

            if(channels.length) setTeamChannels(channels)
            if(users.length) setDirectChannels(users)
        } catch (error) {
            setQuery('')
        }
    }

    const onSearch = (e) => {
        e.preventDefault()

        setLoading(true)
        setQuery(e.target.value)
        getChannels(e.target.value)
    }

    const setChannel = (channel) => {
        setQuery('')
        setActiveChannel(channel)
    }

    return (
        <ChannelSearchContainer>
            <SearchInputWrapper>
                <ChannelSearchIcon>
                    <SearchIcon/>
                </ChannelSearchIcon>
                <ChannelSearchText>
                    <input placeholder="Search" type="text" value={query} onChange={onSearch} />
                </ChannelSearchText>
            </SearchInputWrapper>
            { query && (
                <ResultsDropdown 
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                />
            )}
        </ChannelSearchContainer>
    )
}

const ChannelSearchContainer = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
padding-top: 16px;
border-top: 1px solid #00000033;
`;

const SearchInputWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 40px;
background: rgba(255, 255, 255, 0.2);
border-radius: 8px;
margin-bottom: 8px;
border: 1px solid transparent;
width: 95%;
`;

const ChannelSearchIcon = styled.div`
width: 32px;
display: flex;
justify-content: center;
`;

const ChannelSearchText = styled.div`
background: none;
border: none;
color: #fff;
font-size: 16px;
outline: none;
input {
    outline: 0;
}
`;

export default ChannelSearch
