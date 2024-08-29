import * as Styles from "./index.styled";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Button, Flex } from "~/components/atoms";
import ChevronLeft from "~/assets/icons/chevron-left.svg?react";
import ClockIcon from "~/assets/icons/clock.svg?react";
import UserIcon from "~/assets/icons/user.svg?react";
import { Header } from "~/components/molecules";
import { useImmer } from "use-immer";
import { useRequestStates } from "~/hooks";
import { appointmentApi, userApi } from "~/api";
import { useEffect } from "react";
import moment from "moment";
import Loader from "~/components/molecules/Loader";
import { useNavigate } from "react-router-dom";
import UserSearchBox from "./components/UserSearchBox";
import { APPOINTMENT_BOOKING_VIEWS } from "./constants";
import colors from "~/styles/colors";

const DATE_FORMAT = "YYYY-MM-DD";

export const ScheduleAppointmentView = () => {
  const navigate = useNavigate();

  const [fetchSlotsRequestState, fetchSlotRequestHandlers] = useRequestStates();
  const [
    fetchParticipantsByQueryRequestState,
    fetchParticipantsByQueryRequestHandlers,
  ] = useRequestStates();
  const [bookAppointmentRequestState, bookAppointmentRequestHandlers] =
    useRequestStates();

  const [pageState, setPageState] = useImmer({
    userQuery: "",
    selectedParticipant: null,
    appointmentName: "30 Minute - Appointment",
    selectedDate: moment(),
    selectedSlot: null,
    currentView: APPOINTMENT_BOOKING_VIEWS.SCHEDULE,
  });

  const getSlots = async () => {
    if (!pageState.selectedParticipant) {
      return;
    }
    fetchSlotRequestHandlers.pending();
    const selectedDate = moment(pageState.selectedDate).format(DATE_FORMAT);
    try {
      const response = await appointmentApi.fetchSlots({
        userId: pageState.selectedParticipant.id,
        date: selectedDate,
      });
      fetchSlotRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchSlotRequestHandlers.rejected(error);
    }
  };

  const getParticipantsByQuery = async () => {
    fetchParticipantsByQueryRequestHandlers.pending();
    try {
      const response = await userApi.searchUsers(pageState.userQuery);
      fetchParticipantsByQueryRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchParticipantsByQueryRequestHandlers.rejected(error);
    }
  };

  const handleBookAppointment = async () => {
    bookAppointmentRequestHandlers.pending();
    const payload = {
      name: pageState.appointmentName,
      participantId: pageState.selectedParticipant.id,
      scheduledOn: moment(pageState.selectedDate).format(DATE_FORMAT),
      slot: pageState.selectedSlot,
    };
    try {
      const response = await appointmentApi.bookAppointment({
        payload,
      });
      bookAppointmentRequestHandlers.fulfilled(response);
      setPageState((draft) => {
        draft.currentView = APPOINTMENT_BOOKING_VIEWS.SUCCESS;
      });
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

  const handleChangeUserQuery = (e) => {
    setPageState((draft) => {
      draft.userQuery = e.target.value;
      draft.selectedParticipant = null;
    });
  };

  const handleSelectParticipant = (participant) => {
    setPageState((draft) => {
      draft.selectedParticipant = participant;
      draft.userQuery = participant.name;
    });
  };

  const redirectToDashboard = () => {
    navigate("/");
  };

  useEffect(() => {
    getSlots();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState.selectedDate, pageState.selectedParticipant]);

  useEffect(() => {
    let timeoutId;

    if (pageState.userQuery) {
      timeoutId = setTimeout(() => {
        getParticipantsByQuery();
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState.userQuery]);

  let slotsNode;
  let slotsLoadingNode;
  let nodeToRender;

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

  if (pageState.currentView === APPOINTMENT_BOOKING_VIEWS.SCHEDULE) {
    nodeToRender = (
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
              <UserIcon />
            </Styles.IconWrapper>
            <UserSearchBox
              userQuery={pageState.userQuery}
              selectedParticipant={pageState.selectedParticipant}
              fetchParticipantsByQueryRequestState={
                fetchParticipantsByQueryRequestState
              }
              onChangeQuery={handleChangeUserQuery}
              onSelectParticipant={handleSelectParticipant}
              ml="8px"
              flex="1"
            />
          </Flex>
          <Flex mt="16px" alignItems="center">
            <Styles.IconWrapper>
              <ClockIcon />
            </Styles.IconWrapper>
            <Styles.MetaData ml="8px">30 Min</Styles.MetaData>
          </Flex>
        </Styles.LeftSection>
        <Styles.MidSection>
          <Styles.CalendarContainer>
            <Calendar
              onChange={handleSelectDate}
              value={pageState.selectedDate}
              minDate={new Date()}
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
    );
  } else if (pageState.currentView === APPOINTMENT_BOOKING_VIEWS.SUCCESS) {
    nodeToRender = (
      <Styles.SuccessViewContainer>
        <Box>
          <Styles.SuccessText>
            <span style={{ color: colors.TEXT_POSITIVE_NORMAL }}>
              Successfully
            </span>{" "}
            Booked!
          </Styles.SuccessText>
          <Styles.AppointmentInfo mt="16px">
            Booked an appointment with{" "}
            <span
              style={{ color: colors.TEXT_NEUTRAL_NORMAL, fontWeight: 600 }}
            >
              {bookAppointmentRequestState.data.participant.name}
            </span>{" "}
            <br />
            on{" "}
            <span
              style={{ color: colors.TEXT_NEUTRAL_NORMAL, fontWeight: 600 }}
            >
              {moment(pageState.selectedDate).format("Do MMMM, YYYY")}
            </span>{" "}
            at{" "}
            <span
              style={{ color: colors.TEXT_NEUTRAL_NORMAL, fontWeight: 600 }}
            >
              {moment(pageState.selectedSlot.startTime).format("hh:mm a")}
            </span>
          </Styles.AppointmentInfo>
        </Box>
        <Button
          text="See Appointments"
          mt="20px"
          onClick={redirectToDashboard}
        />
      </Styles.SuccessViewContainer>
    );
  }

  return (
    <Styles.Root>
      <Header />
      <Styles.Container>
        <Flex>
          <Button icon={<ChevronLeft />} onClick={redirectToDashboard} />
          <Box ml="24px">
            <Styles.PageTitle>Book an Appointment</Styles.PageTitle>
            <Styles.PageDescription mt="8px">
              Book an appointment by selecting available slot
            </Styles.PageDescription>
          </Box>
        </Flex>
        {nodeToRender}
      </Styles.Container>
    </Styles.Root>
  );
};
