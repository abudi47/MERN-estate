import React from 'react'

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center mx-auto max-w-6xl p-3'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Sahand</span>
                <span className='text-slate-700'>Estate</span>
            </h1>

            <form className='bg-slate-100 p-3 rounded-lg'>
                <input type='text' placeholder='Search....' className='bg-transparent '/>
            </form>
            
        </div>

    </header>
  )
}
