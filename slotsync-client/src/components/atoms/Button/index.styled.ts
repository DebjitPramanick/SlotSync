import styled from "styled-components";
import UnstyledButton from "./UnstyledButton";
import colors from "~/styles/colors";
import Box from "../Box";

export const Root = styled(UnstyledButton)<{
  fontSize: number;
  outlined?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => `${height}px`};
  width: auto;
  text-align: center;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  color: ${colors.TEXT_INVERTED};
  color: ${({ outlined }) =>
    outlined ? colors.TEXT_ACCENT_NORMAL : colors.TEXT_INVERTED};
  background-color: ${({ outlined }) =>
    outlined ? colors.BG_SURFACE : colors.BG_ACCENT_NORMAL};
  border: 1px solid ${colors.BORDER_ACCENT_STRONG};
  white-space: nowrap;

  &:hover {
    background-color: ${colors.BG_ACCENT_WEAK};
    color: ${colors.TEXT_INVERTED};
  }

  &:disabled {
    background-color: ${colors.BG_ACCENT_WEAKER};
    border-color: ${colors.BORDER_ACCENT_WEAK};
    cursor: not-allowed;
  }
`;

export const IconWrapper = styled(Box)`
  width: 24px;
  height: 24px;

  > svg {
    width: 100%;
    height: 100%;
    color: #fff;
  }
`;
