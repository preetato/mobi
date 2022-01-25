import React from "react";
import CancelButton from "../../Buttons/CancelButton";
import ResponseButton from "../../Buttons/ResponseButton";
import ModalContentTemplate from "../ModalContentTemplate";

const ModalTimerDoneRejectBookingWarningModal = ({
  onClose,
  cancelBookingFn,
  bookAnotherFn,
}: {
  onClose: ({
    isConfirmationCloser,
  }?: {
    isConfirmationCloser?: boolean;
  }) => void;
  cancelBookingFn: () => void;
  bookAnotherFn: () => void;
}) => {
  /**
   * If Confirmation is the one who caused the dismissal of modal
   * onClose function should not run
   * but rather setting modal to undefined only
   */

  return (
    <ModalContentTemplate
      title="Booking Rejected"
      subTitle="Rejecting the booking since no driver responded within the allotted time"
      buttons={[
        {
          component: (
            <ResponseButton
              onPress={() => {
                bookAnotherFn();
              }}
              text="Book Another Driver"
              style={{
                marginTop: 16,
                marginBottom: 4,
              }}
            />
          ),
        },
        {
          component: (
            <CancelButton
              onPress={() => {
                cancelBookingFn();
                onClose();
              }}
              text="Cancel Booking"
            />
          ),
        },
      ]}
      // onClose={() => {}}
      hideCloseButton
    />
  );
};

export default ModalTimerDoneRejectBookingWarningModal;
