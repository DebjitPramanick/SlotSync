import { Button, Flex } from "~/components/atoms";
import * as Styles from "./index.styled";
import moment from "moment";
import { APPOINTMENT_STATUSES } from "~/constants";

const AppointmentDetailsCard = ({
  appointment,
  updateAppointmentsRequestState,
  onUpdateAppointment,
}) => {
  const { slot, scheduledOn } = appointment;
  const appointmentStartTime = moment(slot.startTime).format("hh:mm a");
  const appointmentScheduledOn = moment(scheduledOn).format("Do MMMM, YYYY");

  const handleMarkAsCompleteBtnClick = () => {
    const updatedAppointment = {
      status: APPOINTMENT_STATUSES.COMPLETED,
    };
    onUpdateAppointment({
      appointmentId: appointment.id,
      updatedData: updatedAppointment,
    });
  };

  const handleCancelAppointmentBtnClick = () => {
    const updatedAppointment = {
      status: APPOINTMENT_STATUSES.CANCELED,
    };
    onUpdateAppointment({
      appointmentId: appointment.id,
      updatedData: updatedAppointment,
    });
  };

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
              <Button
                text="Cancel"
                size="small"
                flex="1"
                outlined
                onClick={handleCancelAppointmentBtnClick}
              />
              <Button
                text="Mark as Done"
                size="small"
                ml="12px"
                flex="1"
                onClick={handleMarkAsCompleteBtnClick}
              />
            </Flex>
          </Styles.FooterContainer>
        </Styles.AppointmentDetailsContainer>
      </Flex>
    </Styles.Root>
  );
};

export default AppointmentDetailsCard;
