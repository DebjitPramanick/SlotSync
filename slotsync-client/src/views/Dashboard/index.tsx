import { Header, PageLoader } from "~/components/molecules";
import * as Styles from "./index.styled";
import AppointmentDetailsCard from "./components/AppointmentDetailsCard";
import { useRequestStates } from "~/hooks";
import { appointmentApi } from "~/api";
import { useCallback, useEffect, useMemo } from "react";
import { Box, Button } from "~/components/atoms";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useImmer } from "use-immer";
import { APPOINTMENTS_FILTER } from "./constants";
import { APPOINTMENT_STATUSES } from "~/constants";
import moment from "moment";
import { useAppContext } from "~/contexts";

const DashboardView = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [fetchAppointmentsRequestState, fetchAppointmentsRequestHandlers] =
    useRequestStates();
  const [updateAppointmentsRequestState, updateAppointmentsRequestHandlers] =
    useRequestStates();
  const [pageState, setPageState] = useImmer({
    selectedFilter: APPOINTMENTS_FILTER.ALL,
  });

  const getAppointments = async () => {
    fetchAppointmentsRequestHandlers.pending();
    try {
      const response = await appointmentApi.fetchAppointments();
      fetchAppointmentsRequestHandlers.fulfilled(response);
    } catch (error) {
      fetchAppointmentsRequestHandlers.rejected(error);
    }
  };

  const updateAppointment = async ({ appointmentId, updatedData }) => {
    updateAppointmentsRequestHandlers.pending();
    try {
      const response = await appointmentApi.updateAppointment({
        appointmentId,
        payload: updatedData,
      });
      updateAppointmentsRequestHandlers.fulfilled(response);
    } catch (error) {
      updateAppointmentsRequestHandlers.rejected(error);
    }
  };

  const redirectToAppointmentBookingPage = () => {
    navigate("/book-appointment");
  };

  const handleChangeFilter = (selected) => {
    setPageState((draft) => {
      draft.selectedFilter = selected.value;
    });
  };

  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterOptions = (() => {
    const filterKeys = Object.keys(APPOINTMENTS_FILTER);
    const options = filterKeys.map((_key) => ({
      label: APPOINTMENTS_FILTER[_key],
      value: APPOINTMENTS_FILTER[_key],
    }));
    return options;
  })();

  const filteredAppointments = useCallback(() => {
    const appointments = fetchAppointmentsRequestState.data ?? [];
    if (pageState.selectedFilter === APPOINTMENTS_FILTER.ALL) {
      return appointments;
    } else if (pageState.selectedFilter === APPOINTMENTS_FILTER.CANCELED) {
      return appointments.filter(
        (appointment) => appointment.status === APPOINTMENT_STATUSES.CANCELED
      );
    } else if (pageState.selectedFilter === APPOINTMENTS_FILTER.FINISHED) {
      return appointments.filter(
        (appointment) => appointment.status === APPOINTMENT_STATUSES.FINISHED
      );
    } else if (pageState.selectedFilter === APPOINTMENTS_FILTER.PAST) {
      return appointments.filter((appointment) =>
        moment(appointment.scheduledOn).isBefore(moment())
      );
    } else if (pageState.selectedFilter === APPOINTMENTS_FILTER.UPCOMING) {
      return appointments.filter((appointment) =>
        moment(appointment.scheduledOn).isAfter(moment())
      );
    } else if (
      pageState.selectedFilter === APPOINTMENTS_FILTER.SCHEDULED_BY_ME
    ) {
      return appointments.filter(
        (appointment) => appointment.createdBy.id === user.id
      );
    } else if (
      pageState.selectedFilter === APPOINTMENTS_FILTER.SCHEDULED_BY_OTHERS
    ) {
      return appointments.filter(
        (appointment) => appointment.createdBy.id !== user.id
      );
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState.selectedFilter, fetchAppointmentsRequestState.data])();

  if (fetchAppointmentsRequestState.pending) {
    return <PageLoader />;
  }

  return (
    <Styles.Root>
      <Header />
      <Styles.Container>
        <Styles.PageHeaderContainer>
          <Box>
            <Styles.PageTitle>Your Appointments</Styles.PageTitle>
            <Styles.PageDescription mt="8px">
              Your booked appointments
            </Styles.PageDescription>
          </Box>
          <Button
            text="Book Appointment"
            onClick={redirectToAppointmentBookingPage}
          />
        </Styles.PageHeaderContainer>
        <Box mt="24px" maxWidth="200px" ml="auto">
          <Select
            options={filterOptions}
            placeholder="Filter Appointments"
            onChange={handleChangeFilter}
            defaultValue={{
              label: APPOINTMENTS_FILTER.ALL,
              value: APPOINTMENTS_FILTER.ALL,
            }}
          />
        </Box>
        <Styles.AppointmentsContainer>
          {filteredAppointments.map((appointment) => (
            <AppointmentDetailsCard
              key={appointment}
              appointment={appointment}
              updateAppointmentsRequestState={updateAppointmentsRequestState}
              onUpdateAppointment={updateAppointment}
            />
          ))}
        </Styles.AppointmentsContainer>
      </Styles.Container>
    </Styles.Root>
  );
};

export default DashboardView;
