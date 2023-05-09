import { Header } from 'antd/es/layout/layout';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../style/constants';
import { useAuth } from '../utils/hooks/useAuth';
import { Button } from 'antd';
import { EAppRoutes } from '../page/Router';

const Container = styled(Header) <{ height: number }>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ height }) => height};
  background-color: "#001529";
  padding: 0;
  z-index: 10;
`;


const BaseWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  /* max-width: ${theme.maxWidth}; */
  margin: auto;
  padding: 0px 16px;
`;


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.img`
  object-fit: cover;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  margin-right: 16px;
  background: #ffffff;
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 18px;
  text-transform: uppercase;
  color: #ffffff;
`;


const Name = styled.span`
  font-size: 14px;
  color: #ffffff;
  margin-right: 8px;
`;

export default function AppHeader() {
    const navigate = useNavigate();
    const { isAuthorized, user, logout } = useAuth();
    return (
        <Container style={{ height: 60 }} height={60}>

            <BaseWrapper>
                <Wrapper>
                    <Text>MY COURSE</Text>
                </Wrapper>
                <Wrapper>
                    {!isAuthorized && (
                        <Button type="primary" onClick={() => navigate(EAppRoutes.AUTH)}>
                            Войти
                        </Button>
                    )}

                    {isAuthorized && (
                        <>
                            <Name>{user?.login}</Name>
                            <Avatar
                                src={"https://i.pravatar.cc/300"}
                                alt="avatar"
                                onClick={() => navigate(EAppRoutes.PROFILE)}
                            />
                            <Button
                                type="dashed"
                                onClick={() => {
                                    logout();
                                    // navigate(EAppRoutes.HOME);
                                }}
                            >
                                Выйти
                            </Button>
                        </>
                    )}
                </Wrapper>
            </BaseWrapper>
        </Container>
    )
}
