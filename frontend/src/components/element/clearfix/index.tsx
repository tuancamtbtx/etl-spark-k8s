// Clearfix.tsx
import React from 'react';
import styled from 'styled-components';

interface DivProps {
  height: number;
  width: number;
}

const Div = styled.div<DivProps>`
  display: block;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;

interface ClearfixProps {
  width?: number;
  height?: number;
}

const Clearfix: React.FC<ClearfixProps> = ({ width = 0, height = 16 }) => {
  return (
    <Div
      className="clearfix"
      width={width}
      height={height}
    />
  );
};

export default Clearfix;