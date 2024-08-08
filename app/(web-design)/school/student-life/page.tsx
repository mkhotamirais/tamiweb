import Title from "../_components/Title";
import ClubsOrganizations from "./ClubsOrganizations";
import PhotoGallery from "./PhotoGallery";
import SportsTeams from "./SportsTeams";
import StudentAchievements from "./StudentAchievements";

export default function StudentLife() {
  return (
    <div>
      <Title title="student life" />
      <PhotoGallery />
      <SportsTeams />
      <StudentAchievements />
      <ClubsOrganizations />
    </div>
  );
}
