import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../../lib/logo.png'
import { getServerSession } from 'next-auth'
import { authOptions } from '../utils/auth'
import { signIn, signOut } from 'next-auth/react'
import { SignInStudent } from '../signIn'
import SignOut from '../signOut'

const Navbar = async() => {
  const session = await getServerSession(authOptions);
  return (
    <div style={{position:"fixed", backgroundColor:"white", width:"100%", display:"flex",boxShadow:"0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19)", justifyContent:"space-between"}}>
      <div style={{marginLeft:"20px", display:"flex", flexDirection:"row", alignItems:"center"}}>
        
        <Link href="/">
          <div  style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
          <div style={{padding:"5px"}}>
            <Image src={Logo} width={30} height={30} />
            {/* https://illustrationkit.com/illustrations/yippy */}
          </div>
          <div style={{padding:"5px"}}>
            <h4 style={{color:"#9757b5"}}>IQRA</h4>
          </div>
          </div>
        </Link>
        <div style={{padding:"5px"}}>
          
        </div>
        {/* <div style={{padding:"5px"}}>
          <Link href="/">Home</Link>
        </div> */}
        <div style={{padding:"5px"}}>
          <Link href="/student">Courses</Link>
        </div>
        
      </div>
      <div style={{marginRight:"20px", padding:"15px"}}>
        {
          !session?
          <SignInStudent stl={{border:"none", backgroundColor:"white", cursor:"pointer"}} />
          :
          <SignOut stl={{border:"none", backgroundColor:"white", cursor:"pointer"}} />
        }
        
      </div>
    </div>
  )
}

export default Navbar