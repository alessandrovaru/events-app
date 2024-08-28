
import { getAuth, signOut } from "firebase/auth";
import { redirect } from 'next/navigation'

import './styles.css'


const Page = () => {




  return (
    <div className='admin-container container'>
      <h1>Admin Page</h1>
      <p>Logged in as </p>
      <button>Sign Out</button>
    </div>
  )
}

export default Page