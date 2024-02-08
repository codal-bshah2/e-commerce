import React from 'react';
interface InputType  {
  type: string;
  name: string;
  id:string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<InputType> = ({ type = "text" ,name, id, placeholder,value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value = {value}
      onChange={onChange}
      className='border border-black w-full p-1 rounded-md'
    />
  );
};

export default Input;