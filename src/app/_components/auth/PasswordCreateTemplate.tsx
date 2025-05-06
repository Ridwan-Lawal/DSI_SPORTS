// emails/password-reset.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface PasswordResetEmailProps {
  createPasswordLink: string;
  companyName?: string;
  supportEmail?: string;
}

export default function PasswordCreateEmail({
  createPasswordLink,
  companyName = "DSI Sports",
  supportEmail = "support@dsisports.com",
}: PasswordResetEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Reset your {companyName} password</Preview>
        <Body className="bg-white font-sans">
          <Container className="mx-auto max-w-2xl p-4">
            <Section className="mt-8">
              <Heading className="text-2xl font-bold text-gray-900">
                Password Create Request
              </Heading>

              <Text className="mt-4 text-gray-700">
                We received a request to reset your password for your{" "}
                {companyName} account.
              </Text>

              <Text className="mt-4 text-gray-700">
                Click the button below to set a new password:
              </Text>

              <Section className="mt-6 mb-6 text-center">
                <Button
                  href={createPasswordLink}
                  className="rounded-lg bg-neutral-900 px-6 py-2.5 font-medium text-white"
                >
                  Create Password
                </Button>
              </Section>

              <Text className="text-gray-700">
                If you didn&apos;t request this password reset, please ignore
                this email or contact our support team at{" "}
                <Link href={`mailto:${supportEmail}`} className="text-blue-600">
                  {supportEmail}
                </Link>
                .
              </Text>

              <Hr className="my-6 border-gray-200" />

              <Text className="text-sm text-gray-500">
                This link will expire in 10 minute. For security reasons, we
                don&apos;t store your password. You&apos;re receiving this email
                because someone (hopefully you) requested a password reset for
                your account.
              </Text>

              <Text className="mt-4 text-sm text-gray-500">
                © {new Date().getFullYear()} {companyName}. All rights
                reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}


