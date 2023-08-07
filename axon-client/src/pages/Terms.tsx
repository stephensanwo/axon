import { DataPageLayout, InfoPageContainer } from "src/shared/layout";
import { DataPrivacy } from "@carbon/pictograms-react";
import { ThemeColors } from "src/shared/themes";
import { Link } from "react-router-dom";
const Terms = () => {
  return (
    <DataPageLayout dark>
      <InfoPageContainer>
        <div>
          <DataPrivacy
            style={{
              fill: ThemeColors.primary,
              width: "124px",
              height: "124px",
            }}
          />
          <h1
            style={{
              marginTop: "2rem",
              marginBottom: "3rem",
            }}
          >
            Terms and Conditions
          </h1>
        </div>
        <div>
          <h4>1. Acceptance of Terms</h4>
          <p>
            Welcome to Axon, the mind mapping app designed to empower developers
            and technology enthusiasts. By accessing or using the Axon app, you
            are entering into a legally binding agreement with Axon and agreeing
            to comply with and be bound by these comprehensive Terms and
            Conditions. If you do not agree with any part of these terms, please
            refrain from using the app.
          </p>
        </div>
        <div>
          <h4>2. Open Source License</h4>
          <p>
            Axon is a proudly open source project distributed under{" "}
            <a href="https://github.com/stephensanwo/axon/blob/master/LICENSE">
              this License
            </a>
            . This license allows you to freely use, modify, and distribute the
            app's source code in accordance with the terms of the License.
            However, you may not provide the software to third parties as a
            hosted or managed service, where the service provides users with
            access to any substantial set of the features or functionality of
            the software. Additional information about the License can be found
            <a href="https://github.com/stephensanwo/axon/blob/master/LICENSE">
              here
            </a>
            .
          </p>
        </div>
        <div>
          <h4>3. User Accounts</h4>
          <p>
            To harness the full capabilities of Axon, you may be required to
            undergo authentication via third-party services like GitHub OAuth
            and Google OAuth. By opting for this authentication process, you
            grant Axon explicit permission to access and collect specific
            information from your third-party accounts. This information
            includes your email address, user name, and profile picture. You
            bear the responsibility of maintaining the confidentiality of your
            account credentials and agree to promptly notify us in the event of
            any unauthorized account activity.
          </p>
        </div>
        <div>
          <h4>4. Disclaimer of Warranty</h4>
          <p>
            Axon is provided on an "as is" basis, devoid of any explicit or
            implicit warranties. We do not guarantee that the app will be devoid
            of errors or that it will meet your individual requirements. You
            choose to utilize Axon at your own risk, understanding that no
            software can be completely devoid of potential issues.
          </p>
        </div>
        <div>
          <h4>5. Limitation of Liability</h4>
          <p>
            In no circumstance shall the developers or contributors of Axon be
            held liable for any type of damages, whether direct, indirect,
            incidental, special, consequential, or exemplary. These damages
            encompass, but are not limited to, loss of profits, goodwill, use,
            data, or other intangible losses resulting from the use or inability
            to use Axon.
          </p>
        </div>
        <div>
          <h4>6. Modifications to the App</h4>
          <p>
            We retain the right to enact modifications, temporary suspensions,
            or permanent discontinuations to the app without the obligation of
            prior notice. We disclaim any liability for any consequences that
            might arise from such actions, understanding that they are taken in
            the best interest of the app's long-term viability.
          </p>
        </div>
        <div>
          <h4>7. Governing Law</h4>
          <p>
            These Terms and Conditions are subject to and shall be interpreted
            in accordance with the laws of Your Jurisdiction, irrespective of
            its conflict of law principles. Any legal disputes arising from
            these terms shall be resolved within the appropriate jurisdiction of
            Your Jurisdiction.
          </p>
        </div>
        <Link to={"/"}>Go Back Home</Link>
      </InfoPageContainer>
    </DataPageLayout>
  );
};

export default Terms;
