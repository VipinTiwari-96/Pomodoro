import { useFormik } from "formik";
import React, { FC } from "react";
import { MdClose } from "react-icons/md";
// helper
import { FormikValues, getSavedTimeValue, State } from "./helper";
interface FormModalProps {
  handleClose: () => void;
  handleSubmit: (values: FormikValues) => void;
}

const FormModal: FC<FormModalProps> = ({ handleClose, handleSubmit }) => {
  const formik = useFormik({
    initialValues: {
      session: getSavedTimeValue(State.Session),
      shortBreak: getSavedTimeValue(State.ShortBreak),
      longBreak: getSavedTimeValue(State.LongBreak),
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
          <button
            onClick={handleClose}
            className="border border-gray-500 w-28 h-10 px-2 rounded-md self-end bg-gray-500 text-white "
          >
            Cancel
          </button>
          <button
            onClick={() => formik.handleSubmit()}
            name="submit"
            className="border border-blue-500 w-28 h-10 px-2 rounded-md self-end bg-blue-500 text-white "
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
