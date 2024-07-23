import { getContactById } from "@/actions/contact-app";
import EditContactForm from "@/components/contact-app/edit-contact-form";
import { notFound } from "next/navigation";

export default async function EditContactPage({ params: { id } }: { params: { id: string } }) {
  const contact = await getContactById(id);
  if (!contact) {
    notFound();
  }
  return <EditContactForm contact={contact} />;
}
