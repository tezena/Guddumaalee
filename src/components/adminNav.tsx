"use client";

import { useEffect } from "react";

export function AdminNavbar() {

  useEffect(()=>{},[])
  return (
    <>
      {/* <div className="w-[96vw] lg:w-[70vw] h-20  fixed z-50 mt-4 ml-64 rounded-lg bg-gostwhite shadow-sm border-2 border-gray-200"> */}
      <nav className="fixed top-4 left-10 lg:left-72 right-10 lg:mx-auto rounded-xl shadow-lg z-40 p-2 w-[95vw] lg:w-[80vw] h-fit bg-white border-gray-200 dark:bg-gray-900">
        <div className="min-w-screen flex gap-2 items-center justify-between mx-auto">

          <div className="flex gap-4 items-center h-fit">


            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 12C0.716667 12 0.479333 11.904 0.288 11.712C0.0960001 11.5207 0 11.2833 0 11C0 10.7167 0.0960001 10.4793 0.288 10.288C0.479333 10.096 0.716667 10 1 10H17C17.2833 10 17.5207 10.096 17.712 10.288C17.904 10.4793 18 10.7167 18 11C18 11.2833 17.904 11.5207 17.712 11.712C17.5207 11.904 17.2833 12 17 12H1ZM1 7C0.716667 7 0.479333 6.904 0.288 6.712C0.0960001 6.52067 0 6.28333 0 6C0 5.71667 0.0960001 5.479 0.288 5.287C0.479333 5.09567 0.716667 5 1 5H17C17.2833 5 17.5207 5.09567 17.712 5.287C17.904 5.479 18 5.71667 18 6C18 6.28333 17.904 6.52067 17.712 6.712C17.5207 6.904 17.2833 7 17 7H1ZM1 2C0.716667 2 0.479333 1.90433 0.288 1.713C0.0960001 1.521 0 1.28333 0 1C0 0.716667 0.0960001 0.479 0.288 0.287C0.479333 0.0956668 0.716667 0 1 0H17C17.2833 0 17.5207 0.0956668 17.712 0.287C17.904 0.479 18 0.716667 18 1C18 1.28333 17.904 1.521 17.712 1.713C17.5207 1.90433 17.2833 2 17 2H1Z"
                fill="black"
              />
            </svg>


            <div className="relative rounded-lg h-fit w-fit bg-[#F2F6FA]">
              <svg
                className="absolute left-2 top-2 "
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                  stroke="#171625"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 22L20 20"
                  stroke="#171625"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                type="text"
                placeholder="       Search here..."
                className="bg-[#F2F6FA] p-2 rounded-lg w-72"
              />
            </div>


          </div>


          <div className="flex gap-4  items-center ">
           
            <img
              className="w-20 rounded-full"
              src="https://img.freepik.com/free-photo/portrait-expressive-young-man-wearing-formal-suit_273609-6942.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710288000&semt=ais"
              alt="lawyer image"
            />
            <div className="flex flex-col gap-1 ">
              <p>Ugullu Banga</p>
              <p>uglu21@gmail.com</p>
            </div>
            <svg
              width="18"
              height="9"
              viewBox="0 0 18 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.9201 0.950195L10.4001 7.4702C9.63008 8.2402 8.37008 8.2402 7.60008 7.4702L1.08008 0.950195"
                stroke="#171625"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>


        </div>
      </nav>
      {/* </div> */}
    </>
  );
}

export default AdminNavbar;
{
  /* <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 min-h-fit">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <button
                  data-drawer-target="logo-sidebar"
                  data-drawer-toggle="logo-sidebar"
                  aria-controls="logo-sidebar"
                  type="button"
                  className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                  <span className="sr-only">Open sidebar</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                  </svg>
                </button>
                <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                  {/* <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-8 me-3"
                    alt="FlowBite Logo"
                  /> */
}
//           <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
//           GUDUMMMAALE
//           </span>
//         </a>
//       </div>
//       <div className="flex items-center">
//         <div className="flex items-center ms-3">
//           <div>
//             <button
//               type="button"
//               className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//               aria-expanded="false"
//               data-dropdown-toggle="dropdown-user"
//             >
//               <span className="sr-only">Open user menu</span>
//               <img
//                 className="w-8 h-8 rounded-full"
//                 src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
//                 alt="user photo"
//               />
//             </button>
//           </div>
//           <div
//             className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
//             id="dropdown-user"
//           >
//             <div className="px-4 py-3" role="none">
//               <p
//                 className="text-sm text-gray-900 dark:text-white"
//                 role="none"
//               >
//                 Neil Sims
//               </p>
//               <p
//                 className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
//                 role="none"
//               >
//                 neil.sims@flowbite.com
//               </p>
//             </div>
//             <ul className="py-1" role="none">
//               <li>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                   role="menuitem"
//                 >
//                   Dashboard
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                   role="menuitem"
//                 >
//                   Settings
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                   role="menuitem"
//                 >
//                   Earnings
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                   role="menuitem"
//                 >
//                   Sign out
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </nav> */}
