import { Header, PageLoader } from "~/components/molecules";
import * as Styles from "./index.styled";
import SlotDetailsCard from "./components/SlotDetailsCard";
import { useRequestStates } from "~/hooks";
import { appointmentApi } from "~/api";
import { useEffect } from "react";

const DashboardView = () => {
  const [fetchAppointmentsRequestState, fetchAppointmentsRequestHandlers] =
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
        <Styles.PageTitle>Your Appointments</Styles.PageTitle>
        <Styles.PageDescription mt="8px">
          Your booked appointments
        </Styles.PageDescription>
        <Styles.SlotsContainer>
          {fetchAppointmentsRequestState.data?.map((slot) => (
            <SlotDetailsCard key={slot} slot={slot} />
          ))}
        </Styles.SlotsContainer>
      </Styles.Container>
    </Styles.Root>
  );
};

export default DashboardView;
