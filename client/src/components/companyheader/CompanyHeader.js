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
display: flex;
justify-content: center;
align-items: center;
height: 60px;
`;

const HeaderText = styled.div`
font-size: 18px;
font-weight: bold;
line-height: 28px;
color: rgb(33, 42, 46);
`;

export default CompanyHeader
