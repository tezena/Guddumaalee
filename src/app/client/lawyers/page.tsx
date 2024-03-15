import { deflate } from "zlib"
import LawyersList from "./lawyersList"




const Lawyers=()=>{
    const MenuItems = [
        { id: 1, text: 'All' },
        { id: 2, text: 'Family' },
        { id: 3, text: 'Personal Injury' },
        { id: 3, text: 'Adoption' },
        { id: 3, text: 'Banking' },
        { id: 3, text: 'Assult' },
        { id: 3, text: 'Housing' }
        
      ];

    return (
        <div className=" min-w-full">
            <ul className='hidden md:flex items-center  w-full justify-center border border-2'>
               {MenuItems.map((item)=>{
                     return(
                        <li key={item.id}
        
                        className='p-4 text-xl  rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
                      >
                          {item.text}
                      </li>
                     )
               })}
      
  </ul>
  

             <LawyersList/>
        </div>
    )
}


export default Lawyers;