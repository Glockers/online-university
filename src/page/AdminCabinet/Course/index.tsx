import React from 'react'
import { PageLayout } from '../../../layouts';
import styled from 'styled-components';
import CourseTable from './CourseTable';
import { AddForm } from './Form';

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

export default function CoursePage() {
    return (
        <Container>
            <Title>Управление курсами</Title>
            <AddForm />
            <CourseTable />
        </Container >
    )
}
