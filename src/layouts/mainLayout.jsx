import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import arrow from "../assets/icons/arrow.svg";
import logo from "../assets/icons/logo.svg";
import WOW from "wow.js";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { WalletSelectionDialog } from "../components/WalletSelectionDialog";
import { trimAddress } from "../config/constants";
import { useOwnerStats } from "../stats/useCommon";


export default function MainLayout() {
     const { pathname } = useLocation();
     const [show, setShow] = useState(false);
     const [nav, setNav] = useState(false);
     const [open, setOpen] = useState(false);
     const { accountId, walletInterface } = useWalletInterface();
     const stats = useOwnerStats(1);

     useEffect(() => {
          new WOW().init();
     }, [])

     useEffect(() => { // Top in Render
          if (pathname === "/") setNav(false)
          else setNav(true);
     }, [pathname]);


     const handleConnect = async () => {
          if (accountId) {
               walletInterface.disconnect();
          } else {
               setOpen(true);
          }
     };

     useEffect(() => {
          if (accountId) {
               setOpen(false);
          }
     }, [accountId]);

     return (
          <>
               <header className={`${nav ? "flex" : "hidden"} text-sm flex-wrap justify-between items-center border-b border-slate-200 md:px-6 sm:px-4 px-2 py-2`}>
                    <div className="flex items-center">
                         <a href="/" className="md:inline-block hidden mr-6"><img src={logo} className="h-12" alt="logo" /></a>
                         <button onClick={() => { show ? setShow(false) : setShow(true) }} className="md:hidden inline-flex items-center font-medium px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg">Explore <img className={`${show ? "rotate-180" : ""} w-3 ml-3`} src={arrow} alt="" /></button>
                         <div className={`${show ? "block" : "hidden"} absolute top-16 left-0 w-full px-4 z-50`}>
                              <ul className="rounded-xl backdrop-blur-sm bg-slate-100/70 font-medium p-6 space-y-6">
                                   <li><NavLink onClick={() => { show ? setShow(false) : setShow(true) }} to={"/"}>Home</NavLink></li>
                                   <li><NavLink onClick={() => { show ? setShow(false) : setShow(true) }} to={"/deposit"}>Deposit</NavLink></li>
                                   <li><NavLink onClick={() => { show ? setShow(false) : setShow(true) }} to={"/withdraw"}>Withdraw</NavLink></li>
                                   <li><NavLink onClick={() => { show ? setShow(false) : setShow(true) }} to={"/associate"}>Associate</NavLink></li>
                                   <li><NavLink onClick={() => { show ? setShow(false) : setShow(true) }} to={"/faqs"}>FAQs</NavLink></li>
                                   {stats.isOwner &&
                                        <li><NavLink onClick={() => { show ? setShow(false) : setShow(true) }} to={"/control-panel"}>Control Panel</NavLink></li>
                                   }
                              </ul>
                         </div>
                         <ul className="md:flex hidden flex-row gap-4">
                              <li><NavLink to={"/"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg"}>Home</NavLink></li>
                              <li><NavLink to={"/deposit"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg"}>Deposit</NavLink></li>
                              <li><NavLink to={"/withdraw"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg"}>Withdraw</NavLink></li>
                              <li><NavLink to={"/associate"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg"}>Associate</NavLink></li>
                              <li><NavLink to={"/faqs"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg"}>FAQs</NavLink></li>
                              {stats.isOwner &&
                                   <li><NavLink to={"/control-panel"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-gray-200 sl-animated-lg"}>Control Panel</NavLink></li>
                              }
                         </ul>
                    </div>
                    <button onClick={handleConnect} className="font-medium bg-blue-500 text-white py-2 sm:px-6 px-4 rounded-3xl hover:bg-blue-700 sl-animated-lg">
                         {accountId ? `Connected: ${trimAddress(accountId)}` : "Connect Wallet"}
                    </button>
               </header>
               <main>
                    <Outlet />
               </main>
               <WalletSelectionDialog open={open} onClose={() => setOpen(false)} />
          </>
     )
}
