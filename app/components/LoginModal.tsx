"use client"

import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from '@/hooks/useauth';
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
  };

export default function LoginModal({isSignIn}: {isSignIn: boolean}) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true)
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  })

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {signIn, signUp, signOut} = useAuth()
  const {data, loading, error} = useContext(AuthenticationContext)

  const renderContent = (signIn: string, signUp: string) => isSignIn ? signIn : signUp

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name

    setInputs((prevState: any) => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    if(isSignIn) {
      if(
        inputs.password && 
        inputs.email
        ) {
        return setDisabled(false)
      }
    } else {
      if(
        inputs.password && 
        inputs.email && 
        inputs.firstName && 
        inputs.lastName && 
        inputs.city && 
        inputs.phone
        ) {
        return setDisabled(false)
      }
    }
    setDisabled(true)
  }, [inputs])

  const handleClick = () => {
    if(isSignIn) {
      signIn(
        {
          email: inputs.email, 
          password: inputs.password,
        },
        handleClose
      )
    } else {
      signUp(
        {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          password: inputs.password,
          email: inputs.email,
          city: inputs.city,
          phone: inputs.phone
        },
        handleClose
      )
    }
  }

  return (
    <div>
      <button 
      onClick={handleOpen} 
      className={`bg-blue-${renderContent("400 text-white", "")} border p-2 px-4 rounded mr-3`}>
        {renderContent("Sign In", "Sign Up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {
              loading ? 
              <div className="px-2 py-24 h-[600px] justify-center flex">
                <CircularProgress /> 
              </div>
              
              :
             <div className="p-2 h-[600px]">
              {error ? <Alert severity="error" className="mb-4">{error}</Alert> : null}
                <div className="uppercase font-bold text-center border-b mb-2 pb-2">
                    <p className="text-sm">
                        {renderContent("Sign In", "Create Account")}
                    </p>
                </div>
                <div className="m-auto">
                    <h2 className="text-xxl font-light text-center">
                        {renderContent("Log into your account" , "Create your Opentable account")}
                    </h2>
                    <AuthModalInputs 
                    inputs={inputs} 
                    handleChangeInput={handleChangeInput}
                    isSignIn={isSignIn}
                    />
                    <button 
                    className="w-full bg-red-600 uppercase text-sm text-white p-3 mb-5 rounded disabled:bg-gray-400"
                    onClick={handleClick}
                    disabled={disabled}
                    >
                        {renderContent("Sign In", "Create Account")}
                    </button>
                </div>
            </div>}
        </Box>
      </Modal>
    </div>
  );
}