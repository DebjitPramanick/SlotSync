import styled from "styled-components";
import { Box, Input, Text } from "~/components/atoms";
import colors from "~/styles/colors";

export const Root = styled(Box)`
  position: relative;
`;

export const UserSearchInput = styled(Input)`
  height: 40px;
  padding: 0;
  font-size: 16px;
  border: 0;
  outline: 0;
`;

export const ResultsList = styled(Box).attrs({ as: "ul" })`
  width: 100%;
  border: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
  border-radius: 4px;
  background-color: ${colors.BG_SURFACE};
  list-style-type: none;
  position: absolute;
`;

export const ResultsItem = styled(Box).attrs({ as: "li" })`
  padding: 8px;
  border-bottom: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.BG_ACCENT_WEAKEST};
    transition: 0.3s background-color ease-in-out;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const NoResultMessage = styled(Text)`
  color: ${colors.TEXT_NEUTRAL_WEAK};
  font-style: italic;
  padding: 8px;
`;
