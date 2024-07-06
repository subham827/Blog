// import { Button, TextInput } from 'flowbite-react';
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import {
//   updateStart,
//   updateSuccess,
//   updateFailure,
// } from '../redux/user/userSlice';
// import { useDispatch } from 'react-redux';
// function DashProfile() {
//     const {currentUser}=useSelector(state=>state.user);
//     const [formData, setFormData] = useState({});
//     const dispatch=useDispatch();
//     const handleChange = (e) => {
//       setFormData({ ...formData, [e.target.id]: e.target.value });
//     };
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       // setUpdateUserError(null);
//       // setUpdateUserSuccess(null);
//       if (Object.keys(formData).length === 0) {
//         // setUpdateUserError('No changes made');
//         return;
//       }

//       try {
//         dispatch(updateStart());
//         const res = await fetch(`http://localhost:4000/api/user/update/${currentUser._id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         });
//         const data = await res.json();
//         if (!res.ok) {
//           dispatch(updateFailure(data.message));
//           // setUpdateUserError(data.message);
//         } else {
//           dispatch(updateSuccess(data));
//           // setUpdateUserSuccess("User's profile updated successfully");
//         }
//       } catch (error) {
//         dispatch(updateFailure(error.message));
//         // setUpdateUserError(error.message);
//       }
//     };
//     console.log(setFormData);
//   return (
//     <div className='max-w-lg mx-auto p-3 w-full'>
//       <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <div className='w-32 h-32 self-center cursor-pointer shadow-md' >
//             <img src={currentUser.profilePicture}
//              className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]`}  />
//         </div>
//         <TextInput
//           type='text'
//           id='username'
//           placeholder='username'
//           defaultValue={currentUser.username}
//           onChange={handleChange}
//         />
//         <TextInput
//           type='email'
//           id='email'
//           placeholder='email'
//           defaultValue={currentUser.email}
//           onChange={handleChange}
//         />
//         <TextInput
//           type='password'
//           id='password'
//           placeholder='password'
//           defaultValue="**********"
//           onChange={handleChange}
//         />
//         <Button
//           type='submit'
//           gradientDuoTone='purpleToBlue'
//           outline
//         //   disabled={loading || imageFileUploading}
//         >Update</Button>
//       </form>
//       <div className='text-red-500 flex justify-between mt-5'>
//         <span className='cursor-pointer'>Delete Account</span>
//         <span className='cursor-pointer'>Sign Out</span>
//       </div>
//     </div>
//   )
// }

// export default DashProfile
import { Alert, Button, Modal, ModalBody, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signoutSuccess
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';

export default function DashProfile() {
  const { currentUser, error} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null)
    setUpdateUserSuccess(null)
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("no changes made")
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`http://localhost:4000/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json','access_token':localStorage.getItem("access_token")
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message)
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("suuccess")
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message)
    }
  };
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`http://localhost:4000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json','access_token':localStorage.getItem("access_token")
        },
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignout = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/user/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        localStorage.removeItem('access_token');
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='w-32 h-32 self-center cursor-pointer shadow-md' >
            <img src={currentUser.profilePicture}
             className={`rounded-full w-full h-full object-cover border-8 border-[lightgray]`}  />
        </div>
        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
        <Button
          type='submit'
          gradientDuoTone='purpleToBlue'
          outline
        >
        update</Button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'
            >
              Create a post
            </Button>
           </Link>
        )}
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModal(true)} className='cursor-pointer'>
          Delete Account
        </span>
        <span 
  onClick={handleSignout} 
        className='cursor-pointer'>
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color='success' className='mt-5'>
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color='failure' className='mt-5'>
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            {/* <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' /> */}
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' 
              onClick={handleDeleteUser}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}