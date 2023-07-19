import { useState } from "react";
import arrow from "../assets/icons/arrow.svg"

// eslint-disable-next-line react/prop-types
export default function Faq({ title, text, classes }) {
     const [show, setShow] = useState(false);

     return (
          <div onClick={() => { show ? setShow(false) : setShow(true) }} className={`${classes} bg-gray-200 border border-gray-300 rounded-lg px-4 py-6 shadow-lg shadow-gray-200 cursor-pointer`}>
               <h3 className="group flex justify-between sm:text-xl text-base font-semibold">{title} <img className={`${show ? "rotate-180" : ""} w-5 mr-3`} src={arrow} alt="" /></h3>
               <p className={`${show ? "opacity-100 visible h-fit pt-4 mt-2" : "opacity-0 invisible h-0"} border-t border-gray-300 sl-animated-lg`}>{text}</p>
          </div>
     )
}