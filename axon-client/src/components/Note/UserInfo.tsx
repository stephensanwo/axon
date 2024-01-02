import {
  NoteMenuContainer,
  NoteMenuContent,
  NoteMenuContentBody,
  NoteMenuContentHeader,
} from "./styles";
import { UserProfile } from "@carbon/pictograms-react";
import { useContext } from "react";
import AuthContext from "src/context/auth";
import { ThemeColors } from "src/shared/themes";
import { AxonButton } from "../Button";
import { Launch } from "@carbon/icons-react";
import { STRIPE_MANAGE_SUBSCRIPTION_URL } from "src/config";

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  return (
    <NoteMenuContainer>
      <NoteMenuContent>
        <NoteMenuContentHeader marginBottom={"32px"}>
          <h2>User</h2>
        </NoteMenuContentHeader>
        <NoteMenuContentBody>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
              marginBottom: "32px",
            }}
          >
            <UserProfile />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <small
                style={{
                  color: ThemeColors.textDark,
                  fontSize: "12px",
                }}
              >
                {user.current?.first_name} {user.current?.last_name}
              </small>
              <small
                style={{
                  color: ThemeColors.textDark,
                  fontSize: "12px",
                }}
              >
                {user.current?.email}
              </small>
            </div>
          </div>
        </NoteMenuContentBody>
        <NoteMenuContentHeader marginBottom={"16px"}>
          Subscription
        </NoteMenuContentHeader>
        <NoteMenuContentBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <small
              style={{
                color: ThemeColors.textDark,
                fontSize: "12px",
              }}
            >
              Subscription Plan - {user.current?.subscription?.plan}
            </small>
            <a
              style={{
                fontSize: "12px",
              }}
              href={STRIPE_MANAGE_SUBSCRIPTION_URL}
            >
              Manage Subscription
            </a>
            <small
              style={{
                color: ThemeColors.textDark,
                fontSize: "12px",
                fontStyle: "italic",
              }}
            >
              Manage subscription opens your stripe customer portal where you
              can cancel your subscription, change your subscription plan, or
              change your payment method. etc.
            </small>
          </div>
        </NoteMenuContentBody>
      </NoteMenuContent>
    </NoteMenuContainer>
  );
};

export default UserInfo;
