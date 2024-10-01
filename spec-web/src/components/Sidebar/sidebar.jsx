import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsFillCollectionFill } from "react-icons/bs";
import { AiFillShop } from "react-icons/ai";
import { BiSolidOffer } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { MdContacts } from "react-icons/md";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <aside className=" fixed ">
      <nav className=" flex flex-col w-14 ">
        <div className="p-4 flex justify-between items-center ">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-black text-white hover:bg-[#0ab479] hover:text-black"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className=" px-3 ">{children}</ul>
        </SidebarContext.Provider>

        <div className="p-3 items-center">
          <div className={`overflow-hidden transition-all ${expanded ? "w-36 bg-[#484b4bf8]" : "w-0"}`}>
            <div className="leading-4">
                <div className="text-black">
               <Link to="/" ><h2 className=" m-2 flex gap-3 text-white hover:-[text-#189AB4]"><FaHome className="h-6 w-6 text-white"/>Home</h2></Link><hr/>
               {/* <Link to="/Collection" ><h2 className="p-1 m-2 flex gap-3 text-white hover:bg-[#189AB4]"><FaHome className="h-6 w-6 text-white"/>New Appearance</h2></Link><hr/> */}
               <Link to="/Filter" ><h2 className=" m-2 flex gap-3 text-white hover:text-[#15c7eb]"><BsFillCollectionFill className="h-5 w-5 text-white"/>Collections</h2></Link><hr/>
               <Link to="/" ><h2 className=" m-2 flex gap-3 text-white hover:text-[#15c7eb]"><AiFillShop className="h-6 w-6 text-white"/>My Orders</h2></Link><hr/>
               <Link to="/Payment" ><h2 className=" m-2 flex gap-3 text-white hover:text-[#15c7eb]"><MdOutlinePayment className="h-6 w-6 text-white"/>Payment Details</h2></Link><hr/>
               <Link to="/Offer" ><h2 className=" m-2 flex gap-3 text-white hover:text-[#15c7eb]"><BiSolidOffer className="h-6 w-6 text-white"/>Offers</h2></Link><hr/>
               <Link to="/Contact" ><h2 className=" m-2 flex gap-3 text-white hover:text-[#15c7eb]"><MdContacts className="h-5 w-5 text-white"/>Contact Us</h2></Link><hr/>
                {/* <Link to="/contact"><h4 className="font-semibold p-2 text-white hover:text-[#15c7eb]">Contact</h4></Link> */}
                {/* <Link to="/logout"><span className="text-sm font-bold font-mono ml-10 text-red-600">Logout</span></Link><hr/> */}
                </div>
            </div>
            {/* <MoreVertical size={20} /> */}
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  
  return (
    <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}>
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "ml-3 w-48" : "w-0"}`}>
        {text}
      </span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />
      )}
      {!expanded && (
        <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {text}
        </div>
      )}
    </li>
  );
}

