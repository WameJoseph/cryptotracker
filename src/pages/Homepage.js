import React from 'react'
import cryptotrackerlogo from '..//assets/images/Cryptotrackerlogo.svg'
import calcimg from '..//assets/images/calculatorimg.png'
import linkimg from '..//assets/images/linkimg.png'
import { Link } from 'react-router-dom'


const Homepage = () => {
  return (
    <section className=' homesection '>

        <div className=' homesection_div1 ' >

            <div className=' div1 ' >
                <div className=' content_div ' >
                    <img className='logo' src={cryptotrackerlogo} alt='cryptotrackerlogo' />
                    <h1>Manage <br/> & Centralise</h1>       
                    <p>Crypro-tracker helps you organise all your crypto assets in one place, and track their growth, pricing history and more</p>  
                    
                    <div className=' subdescrpt_divs ' >
                        <div className='subs' >
                            <img src={linkimg} alt='linkimg' />
                            <p className='p1'>Find your cryptos</p>
                            <p className='p2'>Quickly find and track your returns on your crypto assets </p>
                        </div>
                        <div className='subs subs2' >
                            <img src={calcimg} alt='calcimg' />
                            <p className='p1'>Calculate earnings</p>
                            <p className='p2'>Calculate your potential earnings on Crypto-tracker</p>
                        </div>
                    </div>       
                </div>
            </div>

            <div className=' div2 ' ></div>

        </div>

        <div className=' homesection_div2 ' >
            {/* <a href='/Dashboard' className='a' >Get started</a> */}
            {/* <Link */}
            <Link to="/dashboard" className='a' >Get started</Link>
        </div>

    </section>
  )
}

export default Homepage
