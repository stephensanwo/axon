import { DataPageLayout, InfoPageContainer } from "src/shared/layout";
import { GovernUsersAndIdentities } from "@carbon/pictograms-react";
import { ThemeColors } from "src/shared/themes";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <DataPageLayout dark>
      <InfoPageContainer>
        <div>
          <GovernUsersAndIdentities
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
            Privacy Policy
          </h1>
        </div>
        <div>
          <h4>1. Information We Collect</h4>
          <p>
            Your privacy is important to us. Axon collects and uses the
            following information from your third-party accounts (GitHub and
            Google) solely for authentication purposes and to enhance your app
            experience:
          </p>
          <ul>
            <li>
              Email address: We collect your email address to uniquely identify
              your account and provide you with important notifications.
            </li>
            <li>
              User name: We collect your user name to personalize your
              experience within the Axon app.
            </li>
            <li>
              Profile picture: We collect your profile picture to enhance the
              visual appeal of your interactions within the app.
            </li>
          </ul>
        </div>
        <div>
          <h4>2. How We Use Your Information</h4>
          <p>We value your trust and use the collected information to:</p>
          <ul>
            <li>
              Create and manage your Axon account: Your collected data is used
              to establish and maintain your account securely.
            </li>
            <li>
              Enhance app functionality and user experience: We tailor our app
              features to improve your overall experience and usability.
            </li>
            <li>
              Communicate with you about app updates and features: We keep you
              informed about the latest developments and enhancements to Axon.
            </li>
          </ul>
        </div>

        <div>
          <h4>3. Third-Party Access</h4>
          <p>
            We utilize the secure authentication services provided by GitHub
            OAuth and Google OAuth to safeguard your data. Your information is
            securely transmitted to these third-party services solely for
            authentication purposes, ensuring your privacy remains intact.
          </p>
        </div>

        <div>
          <h4>4. Data Security</h4>
          <p>
            Your data security is a priority for us. We implement
            industry-standard security measures to prevent unauthorized access,
            alteration, disclosure, or destruction of your information. While no
            system can be entirely immune to cyber threats, we continuously work
            to protect your data from potential risks.
          </p>
        </div>
        <div>
          <h4>5. Open Source and Data Sharing</h4>
          <p>
            Axon is an open source project, and its source code is available to
            the public under the terms of the MIT License. However, rest assured
            that the personal data you provide, including your email, username,
            and profile picture, is not shared publicly. Your privacy remains a
            core concern.
          </p>
        </div>
        <div>
          <h4>6. Changes to Privacy Policy</h4>
          <p>
            We may update our Privacy Policy periodically to reflect changes in
            legal requirements and the evolution of our practices. Significant
            policy changes will be communicated to you, and the updated policy
            will be posted on the Axon website. We encourage you to review the
            policy periodically to stay informed.
          </p>
        </div>
        <div>
          <h4>7. Contact Us</h4>
          <p>
            If you have any questions or concerns about our Privacy Policy,
            please don't hesitate to reach out to us. You can contact us at{" "}
            <a href="mailto:me@stephensanwo.dev">me@stephensanwo.dev</a> for
            further clarification or assistance regarding your privacy and data
            protection.
          </p>
        </div>
        <Link to={"/"}>Go Back Home</Link>
      </InfoPageContainer>
    </DataPageLayout>
  );
};

export default Privacy;
