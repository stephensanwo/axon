import * as React from "react";
import { PageContainer } from "src/shared/layout";
import { STRIPE_EXPLORER_URL, STRIPE_BASIC_URL } from "src/config";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ThemeColors } from "src/shared/themes";
import { PayForWhatYouUse } from "@carbon/pictograms-react";
import axonLogo from "src/assets/icons/axon-logo.svg";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

const BillingBox = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Billing = () => {
  const location = useLocation();
  const userEmail = location.state?.prefilled_email;
  return (
    <PageContainer dark>
      <BillingBox>
        <img src={axonLogo} alt="axon-logo" />
        <PayForWhatYouUse
          style={{
            fill: ThemeColors.primary,
            width: "80px",
            height: "80px",
            marginTop: "4rem",
          }}
        />
        <p style={{ marginTop: "2rem" }}>Subscribe to an Axon plan</p>
      </BillingBox>
      <stripe-pricing-table
        pricing-table-id="prctbl_1OB4ZcEZSAG3qOWB8BHd4P9p"
        publishable-key="pk_live_51NgTM0EZSAG3qOWBZvow37eVw1krdl2QboxltXAqWZa8Ug4b6xDN5KZNhagDAHDFfMfS0autsJQbuyBeIagYPOUu00aInlyyV5"
        customer-email={userEmail}
      ></stripe-pricing-table>
    </PageContainer>
  );
};

export default Billing;
