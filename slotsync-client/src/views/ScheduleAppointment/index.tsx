import * as Styles from "./index.styled";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Box, Button, Flex } from "~/components/atoms";
import ClockIcon from "~/assets/icons/clock.svg?react";
import UserIcon from "~/assets/icons/user.svg?react";
import { Header } from "~/components/molecules";
import { useImmer } from "use-immer";

const DUMMY_SLOTS = [
  // TODO: Remove later
  {
    id: 1,
    label: "10:30 AM - 11:00 AM",
    value: "10:30 AM - 11:00 AM",
  },
  {
    id: 2,
    label: "12:30 AM - 1:00 PM",
    value: "12:30 AM - 1:00 PM",
  },
];

export const ScheduleAppointmentView = () => {
  const [pageState, setPageState] = useImmer({
    appointmentName: "30 Minute - Appointment",
    selectedDate: null,
    selectedSlot: null,
  });

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

  const handleBookSlot = () => {};

  return (
    <Styles.Root>
      <Header />
      <Styles.Container>
        <Styles.PageTitle>Book an Appointment</Styles.PageTitle>
        <Styles.PageDescription mt="8px">
          Book an appointment by selecting available slot
        </Styles.PageDescription>
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
              {DUMMY_SLOTS.map((slot) => {
                const isSelected = slot.value === pageState.selectedSlot?.value;
                return (
                  <Styles.SlotContainer>
                    <Styles.Slot
                      key={slot.id}
                      selected={isSelected}
                      onClick={() => handleSelectSlot(slot)}
                    >
                      {slot.label}
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
                          onClick={handleBookSlot}
                        />
                      </Flex>
                    ) : null}
                  </Styles.SlotContainer>
                );
              })}
            </Styles.SlotsContainer>
          </Styles.RightSection>
        </Styles.ScheduleSlotContainer>
      </Styles.Container>
    </Styles.Root>
  );
};
