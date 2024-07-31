import styled from "styled-components";
import { Box, Text } from "~/components/atoms";
import { PageContainer } from "~/components/layout";
import colors from "~/styles/colors";
import { mediaQueryMobileOrTablet } from "~/styles/mixins";

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

export const PageTitle = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.TEXT_NEUTRAL_STRONG};
`;

export const PageDescription = styled(Text)`
  font-size: 16px;
  color: ${colors.TEXT_NEUTRAL_WEAK};
`;

export const SlotsContainer = styled(Box)`
  margin-top: 24px;
`;
