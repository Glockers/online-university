import { ReactElement } from "react";
import styled from "styled-components";
import { PageLayout } from "../../../layouts";

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
export const MyCoursePage = (): ReactElement => {

    return (
        <Container>
            <Title> История оплаченных курсов</Title>
        </Container>
    )
}