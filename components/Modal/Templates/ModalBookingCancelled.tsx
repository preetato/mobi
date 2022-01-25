import React from "react";
import ResponseButton from "../../Buttons/ResponseButton";
import ModalContentTemplate from "../ModalContentTemplate";

export default function ModalBookingCancelled({
  onClose,
}: {
  onClose?: () => void;
}) {
  return (
    <ModalContentTemplate
      title="Booking Cancelled"
      subTitle="You exited from the booking page"
      onClose={onClose}
      buttons={[
        {
          component: <ResponseButton onPress={onClose} text="Okay" />,
        },
      ]}
    />
  );
}
