import styled from "styled-components";
import { Box, Flex, Text } from "~/components/atoms";
import colors from "~/styles/colors";
import MeetingIconComponent from "~/assets/icons/meeting.svg?react";
import { mediaQueryMobile } from "~/styles/mixins";

export const Root = styled(Box)`
  padding: 24px;
  background-color: ${colors.BG_SURFACE};
  border: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
  border-radius: 8px;

  & + & {
    margin-top: 16px;
  }
`;

export const MeetingIconDesktopDisplay = styled(Box)`
  display: block;

  ${mediaQueryMobile} {
    display: none;
  }
`;

export const MeetingIconMobileDisplay = styled(Box)`
  display: none;

  ${mediaQueryMobile} {
    display: block;
  }
`;

export const MeetingIcon = styled(Box).attrs({ as: MeetingIconComponent })`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  color: ${colors.ICON_ACCENT_WEAK};
`;

export const AppointmentDetailsContainer = styled(Box)`
  margin-left: 16px;

  ${mediaQueryMobile} {
    margin-left: 0px;
  }
`;

export const AppointmentNameContainer = styled(Box)`
  margin-left: 0px;

  ${mediaQueryMobile} {
    margin-left: 16px;
  }
`;

export const AppointmentName = styled(Text)`
  font-size: 22px;
  font-weight: 600;

  ${mediaQueryMobile} {
    font-size: 18px;
  }
`;

export const AppointmentDescription = styled(Text)`
  font-size: 16px;
  color: ${colors.TEXT_NEUTRAL_WEAK};

  ${mediaQueryMobile} {
    font-size: 14px;
  }
`;

export const Divider = styled(Box)`
  height: 1px;
  background-color: ${colors.BG_NEUTRAL_WEAK};
  width: 100%;
`;

export const FooterContainer = styled(Flex)`
  justify-content: space-between;
  margin-top: 8px;

  ${mediaQueryMobile} {
    margin-top: 16px;
    flex-direction: column;
  }
`;

export const TagsContainer = styled(Flex)`
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  ${mediaQueryMobile} {
    margin-bottom: 16px;
  }
`;

export const Tag = styled(Text)<{ bg: string }>`
  width: fit-content;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ bg }) => (bg ? bg : colors.BG_NEUTRAL_WEAK)};
  color: ${colors.TEXT_NEUTRAL_NORMAL};
  white-space: nowrap;
`;
