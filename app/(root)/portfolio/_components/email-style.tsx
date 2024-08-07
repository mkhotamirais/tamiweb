import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export default function EmailStyle({ message, sender }: { message: string; sender: string }) {
  return (
    <Html>
      <Head />
      <Preview>New Message from your portfolio site</Preview>
      <Tailwind>
        <Body className="bg-gray-100">
          <Container>
            <Section className="bg-white border border-black my-10 px-10 py-4 rounded-lg">
              <Heading className="leading-tight">You receive from the heding message from the contact form</Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>The seders email is: {sender}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
