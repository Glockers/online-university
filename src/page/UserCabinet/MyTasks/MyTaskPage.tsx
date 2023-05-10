import { ReactElement } from "react";
import { PageLayout } from "../../../layouts";
import styled from "styled-components";
import Task from "./Task";


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

export const MyTaskPage = (): ReactElement => {
    return (
        <Container>
            <Title>Мои задачи</Title>
            <Task />
        </Container>
    )
}