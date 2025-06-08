import {
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export default function EmailContactTemplate({
  name,
  email,
  message,
}: EmailTemplateProps) {
  return (
    <Html>
      <Tailwind>
        <Section className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-md">
          <Heading className="mb-4 text-xl font-bold">
            📬 New Contact Form Submission
          </Heading>
          <Text className="mb-2">
            <strong>Name:</strong> {name}
          </Text>
          <Text className="mb-2">
            <strong>Email:</strong> {email}
          </Text>
          <Text className="mb-2">
            <strong>Message:</strong>
          </Text>
          <Text className="whitespace-pre-line">{message}</Text>
        </Section>
      </Tailwind>
    </Html>
  );
}
