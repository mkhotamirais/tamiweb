import ContactUs from "./_components/ContactUs";
import RecentNews from "./_components/RecentNews";
import UpcommingEvents from "./_components/UpcommingEvents";
import WelcomeMessage from "./_components/WelcomeMessage";

export default function School1() {
  return (
    <div className="relative">
      <WelcomeMessage />
      <RecentNews />
      <UpcommingEvents />
      <ContactUs />
    </div>
  );
}
