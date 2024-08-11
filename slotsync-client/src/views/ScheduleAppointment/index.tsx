import * as Styles from "./index.styled";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Button, Flex } from "~/components/atoms";
import ClockIcon from "~/assets/icons/clock.svg?react";
import UserIcon from "~/assets/icons/user.svg?react";
import { Header } from "~/components/molecules";
import { useImmer } from "use-immer";
import { useRequestStates } from "~/hooks";
import { appointmentApi } from "~/api";
import { useEffect } from "react";
import moment from "moment";
import Loader from "~/components/molecules/Loader";
import { useNavigate, useParams } from "react-router-dom";

export const ScheduleAppointmentView = () => {
  const navigate = useNavigate();
  const { participantId } = useParams();

  const [fetchSlotsRequestState, fetchSlotRequestHandlers] = useRequestStates();
  const [bookAppointmentRequestState, bookAppointmentRequestHandlers] =
    useRequestStates();

  const [pageState, setPageState] = useImmer({
    appointmentName: "30 Minute - Appointment",
    selectedDate: null,
    selectedSlot: null,
  });

  const getSlots = async () => {
    fetchSlotRequestHandlers.pending();
    const selectedDate = pageState.selectedDate
      ? moment(pageState.selectedDate).format("DD-MM-YYYY")
      : moment(new Date()).format("DD-MM-YYYY");
    try {
      const response = await appointmentApi.fetchSlots({
        date: selectedDate,
      });
      fetchSlotRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchSlotRequestHandlers.rejected(error);
    }
  };

  const handleBookAppointment = async () => {
    bookAppointmentRequestHandlers.pending();
    const payload = {
      name: pageState.appointmentName,
      participantId: participantId,
      scheduledOn: moment(pageState.selectedDate).toDate(),
      slot: pageState.selectedSlot,
    };
    try {
      const response = await appointmentApi.bookAppointment({
        payload,
      });
      bookAppointmentRequestHandlers.fulfilled(response);
    } catch (error) {
      bookAppointmentRequestHandlers.rejected(error);
    }
  };

  const handleSelectDate = (date) => {
    setPageState((draft) => {
      draft.selectedDate = date;
      draft.selectedSlot = null;
    });
  };

  const handleSelectSlot = (slot) => {
    setPageState((draft) => {
      draft.selectedSlot = slot;
    });
  };

  const handleUnselectSlot = () => {
    setPageState((draft) => {
      draft.selectedSlot = null;
    });
  };

  const handleChangeAppointmentName = (e) => {
    setPageState((draft) => {
      draft.appointmentName = e.target.value;
    });
  };

  const redirectToDashboard = () => {
    navigate("/");
  };

  useEffect(() => {
    getSlots();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState.selectedDate]);

  let slotsNode;
  let slotsLoadingNode;

  if (fetchSlotsRequestState.pending) {
    slotsLoadingNode = <Loader />;
  }
  if (fetchSlotsRequestState.fulfilled) {
    slotsNode = (
      <>
        {fetchSlotsRequestState.data.map((slot) => {
          const isSelected = slot.sequence === pageState.selectedSlot?.sequence;
          const startTime = moment(slot.startTime).format("hh:mm a");
          const endTime = moment(slot.endTime).format("hh:mm a");
          return (
            <Styles.SlotContainer>
              <Styles.Slot
                key={slot.id}
                selected={isSelected}
                onClick={() => handleSelectSlot(slot)}
              >
                {startTime} - {endTime}
              </Styles.Slot>
              {isSelected ? (
                <Flex mt="8px">
                  <Button
                    text="Cancel"
                    outlined
                    flex="1"
                    onClick={handleUnselectSlot}
                  />
                  <Button
                    text="Book"
                    flex="1"
                    ml="8px"
                    onClick={handleBookAppointment}
                    loading={bookAppointmentRequestState.pending}
                    disabled={bookAppointmentRequestState.pending}
                  />
                </Flex>
              ) : null}
            </Styles.SlotContainer>
          );
        })}
      </>
    );
  }

  return (
    <Styles.Root>
      <Header />
      <Styles.Container>
        <Flex>
          <Button text="Go Back" onClick={redirectToDashboard} />
          <Box ml="24px">
            <Styles.PageTitle>Book an Appointment</Styles.PageTitle>
            <Styles.PageDescription mt="8px">
              Book an appointment by selecting available slot
            </Styles.PageDescription>
          </Box>
        </Flex>
        <Styles.ScheduleSlotContainer mt="32px">
          <Styles.LeftSection>
            <Box>
              <Styles.InputLabel>Appointment Name</Styles.InputLabel>
              <Styles.AppointmentNameInput
                mt="12px"
                placeholder="Enter name"
                value={pageState.appointmentName}
                onChange={handleChangeAppointmentName}
              />
            </Box>
            <Flex mt="24px" alignItems="center">
              <Styles.IconWrapper>
                <ClockIcon />
              </Styles.IconWrapper>
              <Styles.MetaData ml="8px">Debjit Pramanick</Styles.MetaData>
            </Flex>
            <Flex mt="16px" alignItems="center">
              <Styles.IconWrapper>
                <UserIcon />
              </Styles.IconWrapper>
              <Styles.MetaData ml="8px">30 Min</Styles.MetaData>
            </Flex>
          </Styles.LeftSection>
          <Styles.MidSection>
            <Styles.CalendarContainer>
              <Calendar
                onChange={handleSelectDate}
                value={pageState.selectedDate}
              />
            </Styles.CalendarContainer>
          </Styles.MidSection>
          <Styles.RightSection>
            <Styles.SlotsContainer>
              <Flex justifyContent="center">{slotsLoadingNode}</Flex>
              {slotsNode}
            </Styles.SlotsContainer>
          </Styles.RightSection>
        </Styles.ScheduleSlotContainer>
      </Styles.Container>
    </Styles.Root>
  );
};
