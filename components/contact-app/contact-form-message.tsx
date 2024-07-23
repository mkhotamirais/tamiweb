type ContactFormMessageProps = {
  id: string;
  message: string | undefined;
};

export function ContactFormMessage({ id, message }: ContactFormMessageProps) {
  return (
    <div id={id} aria-live="polite" aria-atomic="true" className="mb-3">
      <p className="text-red-500">{message}</p>
    </div>
  );
}
