"use client";

import { addContact } from "@/actions/contact-app";
import { useFormState } from "react-dom";
import { SubmitContactForm } from "@/components/contact-app/buttons";
import { ContactFormMessage } from "@/components/contact-app/contact-form-message";

export default function AddContactPage() {
  const [state, formAction] = useFormState(addContact, null);
  return (
    <div className="max-w-xl mx-auto px-3">
      <h1 className="text-2xl font-semibold pt-4 mb-8 text-center">Add Contact Form</h1>
      <form action={formAction}>
        <input type="text" id="name" name="name" placeholder="name" className="p-2 border w-full rounded-lg mb-2" />
        <ContactFormMessage id="name-error" message={state?.name?.[0]} />
        <input type="text" id="phone" name="phone" placeholder="phone" className="p-2 border w-full rounded-lg mb-2" />
        <ContactFormMessage id="phone-error" message={state?.phone?.[0]} />
        <input title="image" type="file" id="image" name="image" className="p-2 border w-full rounded-lg mb-2" />
        <ContactFormMessage id="phone-error" message={state?.image?.[0]} />
        <SubmitContactForm label="save" />
        <ContactFormMessage id="message-error" message={state?.error} />
      </form>
    </div>
  );
}
