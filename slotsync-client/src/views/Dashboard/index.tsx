import { Header, PageLoader } from "~/components/molecules";
import * as Styles from "./index.styled";
import AppointmentDetailsCard from "./components/AppointmentDetailsCard";
import { useRequestStates } from "~/hooks";
import { appointmentApi } from "~/api";
import { useEffect } from "react";
import { Box, Button } from "~/components/atoms";
import { useNavigate } from "react-router-dom";

const DashboardView = () => {
  const navigate = useNavigate();
  const [fetchAppointmentsRequestState, fetchAppointmentsRequestHandlers] =
    useRequestStates();
  const [updateAppointmentsRequestState, updateAppointmentsRequestHandlers] =
    useRequestStates();

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

  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <Styles.SlotsContainer>
          {fetchAppointmentsRequestState.data?.map((appointment) => (
            <AppointmentDetailsCard
              key={appointment}
              appointment={appointment}
              updateAppointmentsRequestState={updateAppointmentsRequestState}
              onUpdateAppointment={updateAppointment}
            />
          ))}
        </Styles.SlotsContainer>
      </Styles.Container>
    </Styles.Root>
  );
};

export default DashboardView;
