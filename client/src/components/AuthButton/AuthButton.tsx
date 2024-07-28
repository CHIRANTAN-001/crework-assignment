import React from 'react'
import '../../styles/style.css'

interface AuthButtonProps{
    placeholder: string;
    onClick: () => void;
    disabled: boolean
}

const AuthButton: React.FC<AuthButtonProps> = ({placeholder, onClick, disabled}) => {
  return (
      <div>
          <button className={`authButtonBg w-96 h-10 rounded-md text-white ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`} onClick={onClick} disabled={disabled}>
              {placeholder}
          </button>
    </div>
  )
}

export default AuthButton