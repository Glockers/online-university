import React, { ReactElement } from 'react'
import UsersTable from './UsersTable'
import styled from 'styled-components';
import { PageLayout } from '../../../layouts';

const Container = styled(PageLayout)`
  display: block;
  width: 100%;
  min-width: 320px;
  padding: 32px;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 32px;
    margin-bottom: 32px;
`

function UsersPage(): ReactElement {
    return (
        <Container>
            <Title>Управление пользователями</Title>
            <UsersTable />
        </Container>
    )
}

export default UsersPage