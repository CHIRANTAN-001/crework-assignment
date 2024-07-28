"use client"
import React, { useState } from 'react'
import '../../styles/style.css'
import { VscEye } from 'react-icons/vsc';
import { VscEyeClosed } from "react-icons/vsc";

interface InputProps{
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange }) => {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlePasswordToggle = () => { 
        setShowPassword(!showPassword);
    }

  return (
      <div className='relative flex items-center'>
          <input
              type={showPassword ? 'text' : type}
              className='w-96 h-10 inpufieldBg pl-4 pr-10 focus:border-gray-400 focus:border-2 focus:outline-none rounded-md'
              placeholder={placeholder}
              value={value}
              onChange={onChange}
          />
          {type === 'password' && (
              <span className='absolute right-4 cursor-pointer text-gray-400' onClick={handlePasswordToggle}>
                  {showPassword ? <VscEye /> : <VscEyeClosed />}
              </span>
          )}

          
      </div>
  )
}

export default Input