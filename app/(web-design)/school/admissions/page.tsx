import Title from "../_components/Title";
import AdmissionRequirements from "./AdmissionRequirements";
import EnrollmentProcess from "./EnrollmentProcess";
import OnlienApplicationForm from "./OnlienApplicationForm";
import TuitionFees from "./TuitionFees";

export default function Admissions() {
  return (
    <div>
      <Title title="admissions" />
      <AdmissionRequirements />
      <EnrollmentProcess />
      <OnlienApplicationForm />
      <TuitionFees />
    </div>
  );
}
