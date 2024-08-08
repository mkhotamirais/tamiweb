import FacultyProfiles from "./FacultyProfiles";
import MissionVision from "./MissionVision";
import PrincipalMessage from "./PrincipalMessage";
import SchoolHistory from "./SchoolHistory";
import Title from "../_components/Title";

export default function AboutUs() {
  return (
    <section className="min-h-screen">
      <Title title="about us" />
      <FacultyProfiles />
      <MissionVision />
      <PrincipalMessage />
      <SchoolHistory />
    </section>
  );
}
