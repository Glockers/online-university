import React, { ReactElement, useEffect } from 'react'
import styled from 'styled-components';
import { PageLayout } from '../../../layouts';
import TableFactory from '../../../components/Table/table';
import { PaymentTable } from './PaymentTable';



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


    }, [])

    return <Container>
        <Title>Управление оплаченными курсами</Title>
        <PaymentTable />
    </Container>;
}

export default PaymentManagmentPage
