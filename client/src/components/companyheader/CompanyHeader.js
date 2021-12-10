import React from 'react'
import styled from 'styled-components'

const CompanyHeader = () => {
    return (
        <CompanyHeaderContainer>
            <HeaderText>Hangout place</HeaderText>
        </CompanyHeaderContainer>
    )
}

const CompanyHeaderContainer = styled.div`
padding-left: 16px;
height: 62px;
`;

const HeaderText = styled.div`
font-size: 18px;
line-height: 28px;
color: #ffffff;
`;

export default CompanyHeader
