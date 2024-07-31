import { Header } from "~/components/molecules";
import * as Styles from "./index.styled";
import SlotDetailsCard from "./components/SlotDetailsCard";

const DashboardView = () => {
  return (
    <Styles.Root>
      <Header />
      <Styles.Container>
        <Styles.PageTitle>Your Appointments</Styles.PageTitle>
        <Styles.PageDescription mt="8px">
          Your booked appointments
        </Styles.PageDescription>
        <Styles.SlotsContainer>
          {[1, 2, 3, 4].map((slot) => (
            <SlotDetailsCard key={slot} slot={slot} />
          ))}
        </Styles.SlotsContainer>
      </Styles.Container>
    </Styles.Root>
  );
};

export default DashboardView;
