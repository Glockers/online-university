import React, { ReactElement, useEffect } from 'react'
import styled from 'styled-components';
import { PageLayout } from '../../../layouts';
import TableFactory from '../../../components/Table/table';



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

function PaymentManagmentPage(): ReactElement {
    useEffect(() => {

        return () => {
            console.log("Я покинул страницу")
        }
    }, [])

    return <Container>
        <Title>Управление оплаченными курсами</Title>

    </Container>;
}

export default PaymentManagmentPage
