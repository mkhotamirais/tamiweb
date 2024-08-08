import Title from "../_components/Title";
import EventCalendar from "./EventCalendar";
import PressReleases from "./PressReleases";
import SchoolNewsletter from "./SchoolNewsletter";

export default function NewsAndEvents() {
  return (
    <div>
      <Title title="news and events" />
      <EventCalendar />
      <PressReleases />
      <SchoolNewsletter />
    </div>
  );
}
