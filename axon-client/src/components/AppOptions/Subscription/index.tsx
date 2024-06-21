import { Box, Link, Token } from "@primer/react";
import { InlineHeader } from "src/components/Common";
import { STRIPE_MANAGE_SUBSCRIPTION_URL } from "src/config";
import { useAuthContext } from "src/hooks/auth/useAuthContext";

function Subscription() {
  const { user } = useAuthContext();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 4,
        }}
      >
        <InlineHeader title="Your Subscription Plan" />
        <Token text={user.current?.subscription?.plan} size="large" />
      </Box>
      <InlineHeader subtitle="Manage subscription opens your stripe customer portal where you can cancel your subscription, change your subscription plan, or change your payment method. etc." />
      <Link
        sx={{
          fontSize: 0,
        }}
        href={STRIPE_MANAGE_SUBSCRIPTION_URL}
      >
        Manage Subscription
      </Link>
    </Box>
  );
}

export default Subscription;
