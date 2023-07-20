import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ethIcon from "../assets/img/eth.png";
import arrow from "../assets/icons/arrow.svg";
import logo from "../assets/icons/logo.svg";
import { useState } from "react";
import { useHomeStats } from "../stats/useCommon";
import Animation from "../components/Animation";
import { useWalletInterface } from "../services/wallets/useWalletInterface";
import { trimAddress } from "../config/constants";
import { WalletSelectionDialog } from "../components/WalletSelectionDialog";


export default function Home() {
     const [show, setShow] = useState(false);
     const [open, setOpen] = useState(false);
     const stats = useHomeStats(1);
     const { accountId, walletInterface } = useWalletInterface();

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
               <div className="relative bg-black text-white min-h-screen">
                    <header className="max-w-5xl px-3 mx-auto flex flex-wrap justify-between items-center text-sm py-2">
                         <div className="flex items-center">
                              <a href="/" className="md:inline-block hidden mr-6"><img src={logo} className="h-20" alt="logo" /></a>
                              <button onClick={() => { show ? setShow(false) : setShow(true) }} className="md:hidden inline-flex items-center font-medium px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg">Explore <img className={`${show ? "rotate-180" : ""} w-3 ml-3`} src={arrow} alt="" /></button>
                              <div className={`${show ? "block" : "hidden"} absolute top-16 left-0 w-full px-4 z-50`}>
                                   <ul className="rounded-xl backdrop-blur-sm bg-slate-700/70 font-medium p-6 space-y-6">
                                        <li><NavLink to={"/"}>Home</NavLink></li>
                                        <li><NavLink to={"/deposit"}>Deposit</NavLink></li>
                                        <li><NavLink to={"/withdraw"}>Withdraw</NavLink></li>
                                        <li><NavLink to={"/faqs"}>FAQs</NavLink></li>
                                        <li><NavLink to={"/control-panel"}>Control Panel</NavLink></li>
                                   </ul>
                              </div>
                              <ul className="md:flex hidden flex-row gap-4">
                                   <li><NavLink to={"/"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg"}>Home</NavLink></li>
                                   <li><NavLink to={"/deposit"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg"}>Deposit</NavLink></li>
                                   <li><NavLink to={"/withdraw"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg"}>Withdraw</NavLink></li>
                                   <li><NavLink to={"/faqs"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg"}>FAQs</NavLink></li>
                                   <li><NavLink to={"/control-panel"} className={({ isActive }) => isActive ? "px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg font-semibold" : "px-4 py-2 rounded-xl hover:bg-white/5 sl-animated-lg"}>Control Panel</NavLink></li>
                              </ul>
                         </div>
                         <button onClick={handleConnect} className="font-medium bg-blue-500 text-white py-2 sm:px-6 px-4 rounded-3xl hover:bg-blue-700 sl-animated-lg">
                              {accountId ? `Connected: ${trimAddress(accountId)}` : "Connect Wallet"}
                         </button>
                    </header>
                    <section className=" max-w-5xl px-3 mx-auto my-20">
                         <div className="grid md:grid-cols-2 grid-cols-1 gap-24 mx-auto">
                              <div>
                                   <h1 className="md:text-4xl text-3xl font-bold leading-tight">Welcome to <span className="text-blue-500">PAWDNAH</span><br /><br />“Connect Wallet,  Deposit funds,  Wait and  <span className="text-blue-500">Withdraw</span>.”</h1>
                              </div>
                              <div className="md:block hidden">
                                   <h2 className="sm:text-lg text-base font-semibold uppercase">Deposit</h2>
                                   <form className="md:text-xl sm:text-lg text-base font-medium mt-2 md:space-y-6 sm:space-y-4 space-y-2">
                                        <div className="relative bg-gray-800 rounded-lg px-3 py-2">
                                             <label htmlFor="from" className="text-sm">Amount</label>
                                             <input id="from" type="text" placeholder="$30.2" className="md:text-4xl sm:text-3xl text-2xl pt-1 placeholder:text-gray-400" />
                                             <span className="absolute right-2 bottom-2 flex items-center bg-gray-700 md:text-xl sm:text-lg text-base sm:font-semibold tracking-wide sm:px-4 px-2 sm:py-2 py-1 rounded-lg"><img src={ethIcon} alt="ETH" className="sm:w-5 w-4 mr-1" /> USDC</span>
                                        </div>
                                        <div className="relative bg-gray-800 rounded-lg px-3 py-2">
                                             <label htmlFor="to" className="text-sm">Expected Amount</label>
                                             <input id="to" type="text" placeholder="$42.5" className="md:text-4xl sm:text-3xl text-2xl pt-1 placeholder:text-gray-400" />
                                             <span className="absolute right-2 bottom-2 flex items-center bg-gray-700 md:text-xl sm:text-lg text-base sm:font-semibold tracking-wide sm:px-4 px-2 sm:py-2 py-1 rounded-lg"><img src={ethIcon} alt="ETH" className="sm:w-5 w-4 mr-1" /> USDC</span>
                                        </div>
                                        <button type="button" className="w-full font-medium bg-blue-500 text-white py-3 sm:px-6 px-4 rounded-lg hover:bg-blue-700 sl-animated-lg">Deposit</button>
                                   </form>
                              </div>
                         </div>
                    </section>
                    <section className=" max-w-5xl px-3 mx-auto pt-10 my-28">
                         <div className="md:flex md:justify-between grid grid-cols-2 gap-10 mx-auto">
                              <div className="space-y-1">
                                   <h2 className="md:text-4xl sm:text-3xl text-2xl font-bold">{stats.loading ? <Animation /> : stats.depositAmount ? `$${parseFloat(stats.depositAmount / Math.pow(10, 6))}` : 0}</h2>
                                   <p className="text-sm uppercase font-medium text-gray-400">Deposit Amount</p>
                              </div>
                              <div className="space-y-1">
                                   <h2 className="md:text-4xl sm:text-3xl text-2xl font-bold">{stats.loading ? <Animation /> : stats.totalDeposits ? `$${parseFloat(stats.totalDeposits / Math.pow(10, 6))}` : 0}</h2>
                                   <p className="text-sm uppercase font-medium text-gray-400">Total Deposits</p>
                              </div>
                              <div className="space-y-1">
                                   <h2 className="md:text-4xl sm:text-3xl text-2xl font-bold">{stats.loading ? <Animation /> : stats.totalWithdrawals ? `$${parseFloat(stats.totalWithdrawals / Math.pow(10, 6))}` : 0}</h2>
                                   <p className="text-sm uppercase font-medium text-gray-400">Total Withdrawals</p>
                              </div>
                              <div className="space-y-1">
                                   <h2 className="md:text-4xl sm:text-3xl text-2xl font-bold">{stats.loading ? <Animation /> : stats.totalHistoricalDeposits ? `$${parseFloat(stats.totalHistoricalDeposits / Math.pow(10, 6))}` : 0}</h2>
                                   <p className="text-sm uppercase font-medium text-gray-400">Total Historical Deposits</p>
                              </div>
                         </div>
                    </section>
               </div>
               <WalletSelectionDialog open={open} onClose={() => setOpen(false)} />
          </>
     )
}
