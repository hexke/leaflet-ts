import { FC } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
max-width: 1140px;
margin: auto;  
`;

const Container: FC<{ children: string | JSX.Element | JSX.Element[] }> = ({ children }) => {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    );
}

export default Container;