import { Layout } from "antd";
import { ComponentProps, ReactElement } from "react";
import styled from "styled-components";


type TProps = ComponentProps<typeof Layout>;

const Container = styled(Layout) <{ headerheight: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - ${({ headerheight }) => `${headerheight}px`});
  overflow-x: hidden;
  background-color: transparent;
`;

export const PageLayout = ({ children, ...props }: TProps): ReactElement => {
    return (
        <Container {...props} headerheight={60}>
            {children}
        </Container>
    );
};
