import React from 'react'
import { CloseIcon } from './Icons';

const Modal = ({open, children, onClose}) => {
  if(!open) return null;

  return (
    <>
      <div className='fixed top-0 bottom-0 left-0 right-0 bg-black opacity-70 z-10' />  {/* This div is used to create a backdrop */}
      <div className='w-1/2 h-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 opacity-95 z-10 p-12'>
        <CloseIcon onClick={onClose} className={'!w-8 absolute top-1 right-1 cursor-pointer'}/>
        {children}
      </div>
    </>
  )
}

export default Modal