import styled, { css } from "styled-components";
import { Box, Flex, Input, Text } from "~/components/atoms";
import { PageContainer } from "~/components/layout";
import colors from "~/styles/colors";
import { mediaQueryMobile, mediaQueryMobileOrTablet } from "~/styles/mixins";

export const Root = styled(Box)`
  background-color: ${colors.BG_NEUTRAL_WEAKEST};
`;

export const Container = styled(PageContainer)`
  min-height: calc(100vh - 56px);
  padding-top: 32px;

  ${mediaQueryMobileOrTablet} {
    min-height: calc(100vh - 48px);
  }
`;

export const PageHeaderContainer = styled(Flex)`
  ${mediaQueryMobile} {
    flex-direction: column;
  }
`;

export const PageTitle = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.TEXT_NEUTRAL_STRONG};
`;

export const PageDescription = styled(Text)`
  font-size: 16px;
  color: ${colors.TEXT_NEUTRAL_WEAK};
`;

export const ScheduleSlotContainer = styled(Flex)`
  background-color: ${colors.BG_SURFACE};
  border: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
  border-radius: 8px;

  ${mediaQueryMobileOrTablet} {
    flex-direction: column;
  }
`;

export const LeftSection = styled(Box)`
  flex: 1;
  padding: 16px;
  border-right: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
`;

export const MidSection = styled(Box)`
  flex: 1;
  max-width: 400px;
  padding: 16px;
`;

export const RightSection = styled(Box)`
  flex: 1;
  max-width: 300px;
  border-left: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
  padding: 16px;
`;

export const IconWrapper = styled(Box)`
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  > svg {
    width: 100%;
    height: 100%;
    color: ${colors.ICON_NEUTRAL_WEAK};
  }
`;

export const MetaData = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.TEXT_NEUTRAL_WEAK};
`;

export const InputLabel = styled(Text).attrs({ as: "label" })`
  font-size: 14px;
  color: ${colors.TEXT_NEUTRAL_WEAK};
`;

export const AppointmentNameInput = styled(Input)`
  font-size: 24px;
  padding: 0px 8px;
  color: ${colors.TEXT_NEUTRAL_NORMAL};
  background-color: ${colors.BG_NEUTRAL_WEAKEST};
  border: 0;
  outline: 0;
  border-radius: 4px;
`;

export const SlotsContainer = styled(Box)``;

export const CalendarContainer = styled(Flex)`
  width: 100%;
  justify-content: center;

  .react-calendar {
    /* width: 100% !important; */
    border: 0;
  }

  .calender-body {
    background-color: #e7f3f8 !important;
  }

  .react-calendar__tile {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin: 4px 0;
  }

  .react-calendar__tile--active {
    background-color: #fbbc13 !important;
  }

  .today {
    border: 2px solid #1f1b13 !important;
  }

  .react-calendar_month-viewdays_day {
    margin: 12px !important;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  .react-calendar__tile--active:enabled:hover {
    background-color: #fbbc13 !important;
  }

  .react-calendar__month-view__days__day--weekend {
    color: #1f1b13 !important;
  }

  .react-calendar__tile--now {
    background-color: ${colors.BG_ACCENT_NORMAL} !important;
    color: ${colors.TEXT_INVERTED} !important;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${colors.TEXT_NEUTRAL_WEAK} !important;
  }
`;

export const SlotContainer = styled(Box)`
  & + & {
    margin-top: 12px;
  }
`;

export const Slot = styled(Text)<{ selected?: boolean }>`
  width: 100%;
  padding: 8px 12px;
  background-color: ${colors.BG_SURFACE};
  font-size: 16px;
  font-weight: 600;
  color: ${colors.TEXT_ACCENT_STRONG};
  text-align: center;
  border-radius: 8px;
  border: 1px solid ${colors.BORDER_ACCENT_WEAK};
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  & + & {
    margin-top: 12px;
  }

  &:hover {
    background-color: ${colors.BG_ACCENT_WEAK};
    color: ${colors.TEXT_INVERTED};
  }

  ${({ selected }) =>
    selected
      ? css`
          background-color: ${colors.BG_ACCENT_NORMAL};
          color: ${colors.TEXT_INVERTED};
        `
      : null}
`;
