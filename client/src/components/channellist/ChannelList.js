import React from 'react'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import CompanyHeader from '../companyheader/CompanyHeader'
import Sidebar from '../sidebar/Sidebar'

// import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'

const ChannelList = () => {
    return (
        <>
            <Sidebar/>
            <ChannelListWrapper>
                <CompanyHeader/>
            </ChannelListWrapper>
        </>
    )
}

const ChannelListWrapper = styled.div`
width: 15%;
background-color: rgb(33, 42, 46);
display: flex;
justify-content: center;
`;

export default ChannelList
