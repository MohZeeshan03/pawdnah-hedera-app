import localStorage from 'local-storage';
import React, { useEffect, useState, useRef } from 'react';
import Switch from "react-switch";


export default function TermModal({ open, setOpen }) {
    const [html, setHTML] = useState({ __html: "" });
    const [htmls, setHTMLS] = useState({ __html: "" });
    const count = useRef(0);
    const [accept, setAccept] = useState(false);
    const [readmore, setReadmore] = useState(false);

    useEffect(() => {
        if (count.current === 0) {
            count.current = 1;
            fetch('../term.txt').then((res) => res.text())
                .then((json) => {
                    setHTML({ __html: json });
                    setHTMLS({ __html: json.toString().slice(0, 700) });
                })
        }
    }, []);

    const handleOK = () => {
        if (accept) {
            localStorage.set('term', 'true');
            setOpen(false);
        }
    }


    return (
        <div tabindex="-1" aria-hidden="true" class={`fixed top-0 left-0 right-0 z-50  overflow-y-hidden ${!open ? 'hidden' : 'flex justify-center'} over w-full p-4 md:inset-0 max-h-full`}>
            <div class="relative w-full max-w-md max-h-full">

                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700" >

                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600" style={{ "background": "#2757a4" }}>
                        <h3 class="text-xl font-semibold text-white">
                            Terms of Service
                        </h3>
                    </div>

                    <div class="flex-auto overflow-y-auto relative p-4 max-h-[90vh]">
                        {readmore ? (
                            <div dangerouslySetInnerHTML={html} />
                        ) : (
                            <>
                                <div dangerouslySetInnerHTML={htmls} />
                                <a href="#sec" onClick={()=>setReadmore(true)} className='text-blue-500'>Read more...</a>
                            </>
                        )}

                        <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <h5>I accept the terms and conditions</h5>
                            <Switch onChange={(value) => setAccept(value)} checked={accept} />
                            <button type="button" onClick={() => handleOK()} disabled={!accept} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                OK
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}
