import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";
import CalendarComponent from "../../app/calendar/CalendarComponent";

export default function Calendar() {
  return (
    <div>
      <Navigation></Navigation>
      <CalendarComponent />
      <Footer></Footer>
    </div>
  );
}
