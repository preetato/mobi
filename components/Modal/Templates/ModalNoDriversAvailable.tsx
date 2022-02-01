import React from "react";
import ModalContentTemplate from "../ModalContentTemplate";

const ModalNoDriversAvailableModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalContentTemplate
      title="No Drivers"
      subTitle="Sorry, there are no drivers at the moment, try again in a few minutes"
      // buttons={[
      //   {
      //     component: <ResponseButton text="Okay" />,
      //   },
      // ]}
      onClose={() => {
        onClose();
      }}
    />
  );
};

export default ModalNoDriversAvailableModal;
