import { useFormik } from "formik";
import React, { FC } from "react";
import { MdClose } from "react-icons/md";
// helper
import { FormikValues, getValueFromLs, State } from "./helper";
// shared
import Button from "../shared/Button";

interface FormModalProps {
  handleClose: () => void;
  handleSubmit: (values: FormikValues) => void;
}

const FormModal: FC<FormModalProps> = ({ handleClose, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      session: getValueFromLs(State.Session),
      shortBreak: getValueFromLs(State.ShortBreak),
      longBreak: getValueFromLs(State.LongBreak),
    },
    onSubmit: (values: FormikValues) => {
      handleSubmit(values);
      handleClose();
    },
  });
  return (
    <div className="flex justify-center items-center fixed z-50 left-0 right-0 top-0 w-full h-full bg-gray-500/75">
      <div className="w-96 h-fit h-96 bg-white p-5 rounded-md flex flex-col gap-5">
        <MdClose
          size={25}
          onClick={handleClose}
          className="cursor-pointer ml-auto "
        />
        <span className="text-sm text-gray-500">
          select time for your customization.
        </span>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-gray-500">times are in seconds.</p>
            <label className="text-gray-900 font-medium">Session</label>
            <input
              type="number"
              name="session"
              value={formik.values.session}
              onChange={formik.handleChange}
              placeholder="Session time.."
              className="border border-gray-300 outline-none w-60 h-10 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-900 font-medium">Short break</label>
            <input
              type="number"
              name="shortBreak"
              value={formik.values.shortBreak}
              onChange={formik.handleChange}
              placeholder="Short break time.."
              className="border border-gray-300 outline-none w-60 h-10 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-900 font-medium">Long break</label>
            <input
              type="number"
              name="longBreak"
              value={formik.values.longBreak}
              onChange={formik.handleChange}
              placeholder="Long break time.."
              className="border border-gray-300 outline-none w-60 h-10 rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <Button name="Cancel" handleClick={handleClose} isPrimary={false} />

          <Button name="Submit" handleClick={() => formik.handleSubmit()} />
        </div>
      </div>
    </div>
  );
};

export default FormModal;
