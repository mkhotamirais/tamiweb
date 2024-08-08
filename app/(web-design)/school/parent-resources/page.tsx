import Title from "../_components/Title";
import ImportatnForm from "./ImportatnForm";
import PtaInformation from "./PtaInformation";
import SchoolPolicies from "./SchoolPolicies";
import VolunteerOpportunities from "./VolunteerOpportunities";

export default function ParentResources() {
  return (
    <div>
      <Title title="parent resources" />
      <ImportatnForm />
      <PtaInformation />
      <SchoolPolicies />
      <VolunteerOpportunities />
    </div>
  );
}
