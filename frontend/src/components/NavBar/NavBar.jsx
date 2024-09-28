import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <nav className="bg-white dark:bg-[#FFA500] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" className="flex  items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">Hospitals</span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-10">
                        <button type="button" className=" font-bold text-black border-[2px] border-white bg-[#FFA500] hover:bg-[#e59400] focus:ring-4 focus:outline-none focus:ring-[#FFA500] rounded-lg text-sm px-4 py-2 text-center" >
                            <Link to="/doctor-login">Doctor Login</Link>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
