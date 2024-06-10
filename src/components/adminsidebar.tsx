"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const path = usePathname();
  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-56 p-2 h-[94vh] shadow-lg mt-4 ml-4 rounded-2xl transition-transform -translate-x-full  lg:translate-x-0  bg-white border-r border-gray-200">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
          <h1 className="font-bold text-3xl mt-3 self-center text-[#7B3B99]">
            Gudum<span className="text-black">maale</span>
          </h1>
          <ul className="space-y-2 font-medium mt-10">
            <li
              className={
                path.endsWith("/admin")
                  ? "bg-[#7B3B99] rounded-xl text-white"
                  : ""
              }
            >
              <Link
                href="/admin"
                className="flex items-center p-4 text-gray-900 rounded-lg   dark:hover:bg-[#d9a1f3] group"
              >
                <svg
                  className={
                    path.endsWith("/admin")
                      ? "text-white w-5 h-5  transition duration-75"
                      : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  }
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span
                  className={
                    path.endsWith("/admin") ? "text-white ms-3" : "ms-3"
                  }
                >
                  Dashboard
                </span>
              </Link>
              <hr />
            </li>
            <li
              className={
                path.startsWith("/admin/clients")
                  ? "bg-[#7B3B99] rounded-xl  text-black"
                  : ""
              }
            >
              <Link
                href="/admin/clients"
                className="flex items-center p-4 text-gray-900 rounded-lg   dark:hover:bg-[#d9a1f3] group"
              >
                <svg
                  className={
                    path.startsWith("/admin/clients")
                      ? "text-white w-5 h-5  transition duration-75"
                      : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  }
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span
                  className={
                    path.startsWith("/admin/clients")
                      ? "text-white flex-1 ms-3 whitespace-nowrap"
                      : "flex-1 ms-3 whitespace-nowrap"
                  }
                >
                  Clients
                </span>
              </Link>
              <hr />
            </li>
            <li
              className={
                path.startsWith("/admin/lawyers")
                  ? "bg-[#7B3B99] rounded-xl text-black"
                  : ""
              }
            >
              <Link
                href="/admin/lawyers"
                className="flex items-center p-4 text-gray-900 rounded-lg  dark:hover:bg-[#d9a1f3] group"
              >
                <svg
                  className={
                    path.startsWith("/admin/lawyers")
                      ? "text-white w-5 h-5  transition duration-75"
                      : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 dark:hover:bg-[#d9a1f3] dark:group-hover:text-white"
                  }
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span
                  className={
                    path.startsWith("/admin/lawyers")
                      ? "text-white flex-1 ms-3 whitespace-nowrap"
                      : "flex-1 ms-3 whitespace-nowrap"
                  }
                >
                  Lawyers
                </span>
              </Link>
              <hr />
            </li>
            <li
              className={
                path.startsWith("/admin/signOut")
                  ? "bg-[#7B3B99] rounded-xl text-white"
                  : ""
              }
            >
              <Link
                href=""
                className="flex items-center p-4 text-gray-900 rounded-lg  dark:hover:bg-[#d9a1f3] group"
              >
                <svg
                  className={
                    path.startsWith("/admin/signOut")
                      ? "text-white w-5 h-5  transition duration-75"
                      : "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 dark:hover:bg-[#d9a1f3] dark:group-hover:text-white"
                  }
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span
                  className={
                    path.startsWith("/admin/signOut")
                      ? "text-white flex-1 ms-3 whitespace-nowrap"
                      : "flex-1 ms-3 whitespace-nowrap"
                  }
                >
                  Sign Out
                </span>
              </Link>
              <hr />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
