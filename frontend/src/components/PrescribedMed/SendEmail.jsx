import { useState } from "react";
import BootstrapModal from "./BoostrapModal";
import axios from "axios";
import { useUserStore } from "../PrescribedMed/store/useUserStore";

const SendEmail = () => {
  const { selectedUser, isSendEmailModalOpen, closeSendEmailModal } =
    useUserStore((state) => ({
      isSendEmailModalOpen: state.isSendEmailModalOpen,
      selectedUser: state.selectedUser,
      closeSendEmailModal: state.closeSendEmailModal,
    }));
  //
  const [totalAmount, setTotalAmount] = useState(0);
  const [date, setDate] = useState("");
  //
  const handleSendEmail = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8070/user/send-email`,
        {
          fullName: selectedUser.name,
          totalAmount: totalAmount,
          date: date,
          email: selectedUser.email,
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending email:", error);
      alert(
        "An error occurred while sending the email. Please try again later."
      );
    }
  };
  //
  return (
    <div>
      <BootstrapModal
        show={isSendEmailModalOpen}
        handleClose={closeSendEmailModal}
        title={`Send Email to ${selectedUser?.name}`}
        size={"lg"}
      >
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="totalAmount">Total Amount</label>
              <input
                type="number"
                className="form-control"
                id="totalAmount"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={handleSendEmail}
            >
              Send Email
            </button>
          </form>
        </div>
      </BootstrapModal>
    </div>
  );
};

export default SendEmail;
