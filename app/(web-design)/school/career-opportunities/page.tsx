import Title from "../_components/Title";
import ApplicationProcess from "./ApplicationProcess";
import EmployeeBenefits from "./EmployeeBenefits";
import JobListings from "./JobListings";

export default function CareerOpportunities() {
  return (
    <div>
      <Title title="career opportunities" />
      <ApplicationProcess />
      <EmployeeBenefits />
      <JobListings />
    </div>
  );
}
