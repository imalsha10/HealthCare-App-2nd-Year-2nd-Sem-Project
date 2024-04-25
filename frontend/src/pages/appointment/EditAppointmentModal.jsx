import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useAppointmentStore } from "../../store/useAppointmentStore";
import { useAppointmentData, useAppointmentsByPatient } from "../../hooks/useAppointmentData";
import { BootstrapModal } from "../../components";
import Toast from "../../utils/toast";
import AppointmentAPI from "../../api/AppointmentAPI";
import { USER_ROLES } from "../../constants/roles";
import { useAuthStore } from "../../store/useAuthStore";

const EditAppointmentModal = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // Get the state and actions from the store
  const {
    isEditAppointmentModalOpen,
    closeEditAppointmentModal,
    selectedAppointment,
  } = useAppointmentStore((state) => ({
    isEditAppointmentModalOpen: state.isEditAppointmentModalOpen,
    closeEditAppointmentModal: state.closeEditAppointmentModal,
    selectedAppointment: state.selectedAppointment,
  }));

  // Get refetch function from react-query hook
  let result;
  if (user.role === USER_ROLES.LAB_ASSISTANT) {
    result = useAppointmentData();
  } else {
    result = useAppointmentsByPatient();
  }
  const { refetch } = result;

  // React hook form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Update mutation
  const { mutate } = useMutation(AppointmentAPI.updateAppointment, {
    onSuccess: () => {
      // close the modal and refetch the data
      refetch();
      closeEditAppointmentModal();
      Toast({ type: "success", message: "Appointment updated successfully" });
    },
  });

  // Submit function
  const onSubmit = (data) => {
    mutate({ id: selectedAppointment._id, data });
  };

  useEffect(() => {
    // Set the form values when the selectedAppointment changes
    if (selectedAppointment) {
      setValue("date", selectedAppointment.date);
      setValue("status", selectedAppointment.status);
    }
  }, [selectedAppointment, setValue]);

  return (
    <BootstrapModal
      show={isEditAppointmentModalOpen}
      handleClose={closeEditAppointmentModal}
      title={`Edit: ${selectedAppointment?.patient?.name}'s Appointment`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* date */}
        <div className="mb-2">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            {...register("date", { required: true })}
          />
          {errors.date && (
            <small className="form-text text-danger">Date is required</small>
          )}
        </div>

        {/* status */}
        <div className="mb-2">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            className="form-select"
            id="status"
            name="status"
            {...register("status", { required: true })}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="approved">Approved</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          {errors.status && (
            <small className="form-text text-danger">Status is required</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save
        </button>
      </form>
    </BootstrapModal>
  );
};

export default EditAppointmentModal;
