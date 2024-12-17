// import React from 'react'

// const EmptyCard = ({ imgScr, message }) => {
//   return (
//     <div className='flex flex-col items-center mt-24'>
//         <img src={imgScr} alt="No notes" className='w-60'/>

//         <p className='w-1/2 text-sm font-medium text-black text-center leading-7 mt-5'>
//             {message}
//         </p>
//     </div>
//   )
// }

// export default EmptyCard


import React from 'react'

const EmptyCard = ({ imgScr, message }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
        <img src={imgScr} alt="No notes" className='w-60 mx-auto'/>

        <p className='w-full md:w-1/2 text-sm font-medium text-black text-center leading-7 mt-5'>
            {message}
        </p>
    </div>
  )
}

export default EmptyCard
