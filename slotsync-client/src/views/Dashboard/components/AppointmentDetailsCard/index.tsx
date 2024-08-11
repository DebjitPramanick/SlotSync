import { Button, Flex } from "~/components/atoms";
import * as Styles from "./index.styled";
import moment from "moment";

const AppointmentDetailsCard = ({ appointment }) => {
  const { slot, scheduledOn } = appointment;
  const appointmentStartTime = moment(slot.startTime).format("hh:mm a");
  const appointmentScheduledOn = moment(scheduledOn).format("Do MMMM, YYYY");

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
                {appointment.name}
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
              <Styles.Tag>{slot.durationInMinutes} Mins</Styles.Tag>
              <Styles.Tag>
                Scheduled On:{" "}
                <span style={{ fontWeight: 600 }}>
                  {appointmentScheduledOn}
                </span>{" "}
                at{" "}
                <span style={{ fontWeight: 600 }}>{appointmentStartTime}</span>
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

export default AppointmentDetailsCard;
