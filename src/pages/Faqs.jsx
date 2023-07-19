import Faq from "../components/faq";

export default function Faqs() {
     const faqList = [
          { title: "What is PAWDNAH?", text: "PAWDNAH is a decentralized application that allows users to deposit USDC tokens into a secure contract. The contract operates on a queue system and transfers funds to a withdrawal wallet when certain conditions are met." },
          { title: "How do I deposit funds?", text: "To deposit funds, you need to call the deposit function with the amount you wish to deposit. The amount must be equal to the required deposit amount. A fee will be deducted from your deposit and the net amount will be added to the deposit queue." },
          { title: "What is the deposit queue?", text: "The deposit queue is a list of all deposits that have been made to the contract. When the total balance of the contract is at least three times the amount of the first deposit in the queue, that deposit is transferred to the withdrawal wallet." },
          { title: "How do I withdraw funds?", text: "To withdraw funds, you need to call the withdraw function with the amount you wish to withdraw. You can only withdraw funds that are eligible for withdrawal, which are funds that have been transferred to the withdrawal wallet." },
          { title: "What is the fee for using PAWDNAH?", text: "The fee for using PAWDNAH is 7% of the deposit amount. This fee is deducted from your deposit before it is added to the deposit queue." },
          { title: "What happens if I deposit more or less than the required deposit amount?", text: "The deposit function requires that the amount you deposit is equal to the required deposit amount. If you try to deposit more or less, the transaction will fail." },
          { title: "What happens if the backup wallet doesn't have sufficient funds?", text: "The backup wallet is required to have sufficient funds for the deposit function to succeed. If it doesn't, the transaction will fail." },
          { title: "What is the role of the backup wallet?", text: "The backup wallet is used to provide additional security for the contract. It is required to have sufficient funds for deposits to be made." },
          { title: "What happens if the contract is paused?", text: "If the contract is paused, no deposits or withdrawals can be made. Only an account with the ADMIN_ROLE can pause and unpause the contract. The pause function is just there for security purpose." },
     ]


     return (
          <>
               <section className="py-10">
                    <div className="sl-container">
                         <h2 className="wow fadeInDown md:text-3xl sm:text-2xl text-xl tracking-wide font-bold md:pb-10 sm:pb-6 pb-4">Frequently Asked Questions (FAQs)</h2>
                         <div className="md:space-y-9 sm:space-y-6 space-y-3">
                              {faqList && faqList.map((faq, index) => (
                                   index % 2 === 0 ? <Faq classes="wow fadeInRight" key={index} title={faq.title} text={faq.text} /> : <Faq classes="wow fadeInLeft" key={index} title={faq.title} text={faq.text} />
                              ))}</div>
                    </div>
               </section>
               <section className="bg-gray-200 pt-10 pb-20">
                    <div className="sl-container">
                         <h2 className="wow fadeInDown md:text-3xl sm:text-2xl text-xl tracking-wide font-bold capitalize md:pb-10 sm:pb-6 pb-4">How it all works</h2>
                         <div className="md:space-y-9 sm:space-y-6 space-y-3">
                              <p className="wow fadeInUp"><b>Deposit Funds:</b> To deposit funds, you first need to ensure that you have USDC tokens in
                                   your wallet. Once you have the tokens, you can deposit them into our smart contract by calling the
                                   deposit function. The amount you deposit must be equal to the required deposit amount set by the
                                   contract. A fee of 7% will be deducted from your deposit, and the net amount will be added to the
                                   deposit queue.</p>
                              <p className="wow fadeInUp"><b>Understand the Deposit Queue:</b> The deposit queue is a list of all deposits that have been made to the contract. The queue operates
                                   on a first-in, first-out basis. When the total balance of the contract is at least three times the
                                   amount of the first deposit in the queue, that deposit is transferred to the withdrawal wallet.</p>
                              <p className="wow fadeInUp"><b>Withdraw Funds:</b> To withdraw funds, you need to call the withdraw function with the amount you
                                   wish to withdraw. You can only withdraw funds that are eligible for withdrawal, which are funds that
                                   have been transferred to the withdrawal wallet.</p>
                              <a href="https://hashscan.io/mainnet/dashboard" className="wow fadeIn font-medium bg-blue-500 text-white py-2 sm:px-6 px-4 rounded-3xl hover:bg-blue-700 sl-animated-lg" target="_blank" rel="noreferrer">HashScan</a>
                         </div>
                    </div>
               </section>
          </>
     )
}