import { useFormik } from "formik";
import React, { FC } from "react";
import { MdClose } from "react-icons/md";
// helper
import { FormikValues, getValueFromLs, State } from "./helper";
// shared
import Button from "../shared/Button";
import Input from "../shared/Input";

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
          <p className="text-xs text-gray-500 mt-2">times are in seconds.</p>
        </span>
        <div className="flex flex-col gap-5">
          <Input
            name="session"
            value={formik.values.session}
            onChange={formik.handleChange}
            label="Session"
            placeholder="Session time.."
          />
          <Input
            name="shortBreak"
            value={formik.values.shortBreak}
            onChange={formik.handleChange}
            label="Short break"
            placeholder="Short break time.."
          />
          <Input
            name="longBreak"
            value={formik.values.longBreak}
            onChange={formik.handleChange}
            label="Long break"
            placeholder="Long break time.."
          />
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
