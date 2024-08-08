import Title from "../_components/Title";
import CurriculumOverview from "./CurriculumOverview";
import ExtraculicularActivities from "./ExtraculicularActivities";
import GradeLevel from "./GradeLevel";
import SpecialProgram from "./SpecialProgram";

export default function Academics() {
  return (
    <div>
      <Title title="academics" />
      <CurriculumOverview />
      <ExtraculicularActivities />
      <GradeLevel />
      <SpecialProgram />
    </div>
  );
}
