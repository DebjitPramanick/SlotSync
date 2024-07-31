import { Box, Button, Flex } from "~/components/atoms";
import * as Styles from "./index.styled";

const SlotDetailsCard = ({ slot }) => {
  return (
    <Styles.Root>
      <Flex alignItems="flex-start">
        <Styles.MeetingIconDesktopDisplay>
          <Styles.MeetingIcon />
        </Styles.MeetingIconDesktopDisplay>
        <Styles.AppointmentDetailsContainer flex="1">
          <Flex flex="1">
            <Styles.MeetingIconMobileDisplay>
              <Styles.MeetingIcon />
            </Styles.MeetingIconMobileDisplay>
            <Styles.AppointmentNameContainer>
              <Styles.AppointmentName>
                30 Minutes Appointment
              </Styles.AppointmentName>
              <Styles.AppointmentDescription mt="8px">
                Appointment with{" "}
                <span style={{ fontWeight: 600 }}>Debjit Pramanick</span>
              </Styles.AppointmentDescription>
            </Styles.AppointmentNameContainer>
          </Flex>
          <Styles.Divider mt="16px" />
          <Styles.FooterContainer>
            <Styles.TagsContainer>
              <Styles.Tag>30 Mins</Styles.Tag>
              <Styles.Tag>
                Scheduled On:{" "}
                <span style={{ fontWeight: 600 }}>2nd July, 2024</span>
              </Styles.Tag>
            </Styles.TagsContainer>
            <Flex>
              <Button text="Cancel" size="small" flex="1" outlined />
              <Button text="Mark as Done" size="small" ml="12px" flex="1" />
            </Flex>
          </Styles.FooterContainer>
        </Styles.AppointmentDetailsContainer>
      </Flex>
    </Styles.Root>
  );
};

export default SlotDetailsCard;
