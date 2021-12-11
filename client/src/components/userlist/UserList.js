import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Avatar, useChatContext } from 'stream-chat-react'
import { InviteIcon } from '../../InviteIcon'

const ListContainer = ({ children }) => {
    return (
        <UserListContainer>
            <UserListHeader>
                <p>User</p>
                <p>Invite</p>
            </UserListHeader>
            {children}
        </UserListContainer>
    )
}

const UserItem = ({ user, setSelectedUsers }) => {
    const [selected, setSelected] = useState(false)

    const handleSelect = () => {
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }

        setSelected((prevSelected) => !prevSelected)
    }

    return (
        <UserItemWrapper onClick={handleSelect}>
            <UserItemNameWrapper>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <UserItemName>{user.fullName || user.id}</UserItemName>
            </UserItemNameWrapper>
            {selected ? <InviteIcon/> : <InviteIconEmpty/>}
        </UserItemWrapper>
    )
}

const UserList = ({ setSelectedUsers }) => {
    const { client } = useChatContext()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [listEmpty, setListEmpty] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getUsers = async () => {
            if(loading) return
            setLoading(true)

            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 } 
                )
                if(response.users.length) {
                    setUsers(response.users)
                } else {
                    setListEmpty(true)
                }
            } catch(error) {
                setError(true)
            }
            setLoading(false)
        }

        if(client) getUsers()
    }, [])

    if (error) {
        return (
            <ListContainer>
                <UserListMessage>
                    Error loading, please refresh and try again.
                </UserListMessage>
            </ListContainer>
        )
    }

    if(listEmpty) {
        return (
            <ListContainer>
                <UserListMessage>
                    No users found.
                </UserListMessage>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ? (
                <UserListMessage>
                    Loading users...
                </UserListMessage>
            ) : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                ))
            )}
        </ListContainer>
    )
}

const UserListContainer = styled.div`
display: flex;
flex-direction: column;
height: 100%;
`;

const UserListHeader = styled.div`
display: flex;
align-items: center;
margin: 0px 20px;
justify-content: space-between;
p {
    font-size: 14px;
    line-height: 17px;
    color: #858688;
    margin-top: 16px;
}
`;

const UserItemWrapper = styled.div`
display: flex;
align-items: center;
margin: 0px 20px;
justify-content: space-between;
&:hover {
    background: #f7f6f8;
    cursor: pointer;
}
`;

const UserItemNameWrapper = styled.div`
display: flex;
align-items: center;
flex: 2;
text-align: left;
`;

const UserListMessage = styled.div`
font-size: 16px;
color: #2c2c30;
margin: 20px;
`;

const InviteIconEmpty = styled.div`
height: 28px;
width: 28px;
background: #f7f6f8;
border: 1px solid #dedddf;
border-radius: 14px;
box-sizing: border-box;
margin-left: 2px;
`;

const UserItemName = styled.div`
font-weight: 500;
`;

export default UserList
