import React from 'react'
import FormAddTask from './Form'
import styled from 'styled-components';
import { PageLayout } from '../../../layouts';
import { TaskTable } from './TaskTable';
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
function ManageTask() {
    return (
        <Container>
            <Title>Управление задачами</Title>
            <FormAddTask />
            <TaskTable />
        </Container>
    )
}

export default ManageTask