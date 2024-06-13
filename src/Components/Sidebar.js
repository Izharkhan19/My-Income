import React, { useEffect, useState } from 'react';
import './Styles/Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { Col, Image, Row } from 'react-bootstrap';

const Sidebar = () => {
    const navigate = useNavigate()
    let crrPath = window.location.pathname
    let initVal = 1
    if (crrPath === "/dashboard") {
        initVal = 1
    } else if (crrPath === "/income") {
        initVal = 2
    } else if (crrPath === "/expense") {
        initVal = 3
    }


    const [activeClass, setActiveClass] = useState(initVal)



    return (
        <>
            <div className='d-flex align-items-center gap-3' >
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTql7QO1cKJ2vGPissyg8P5dvN0F0fmajfgtEoaIywuRg&s" width={"50px"} height={"50px"} roundedCircle />
                <div>
                    <h5>Izhar</h5>
                    <h6>Your Money</h6>
                </div>
            </div>
            {/* <hr /> */}
            <ul className='mt-4 p-0'>
                <li style={{ backgroundColor: activeClass === 1 ? "#cdd7dd" : "" }} onClick={() => {
                    setActiveClass(1)
                    navigate("/dashboard")
                }}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25">
                            <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z" />
                        </svg>
                        <span className="margin-left-Icons">
                            Dasboard
                        </span>
                    </div>
                </li>
                {/* <li onClick={() => navigate("/transactions")}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="25" height="25" ><path d="M488.1 6.2c-9.9-8.9-25-8.1-33.9 1.8s-8.1 25 1.8 33.9L489.5 72 86.5 72l33.5-30.2c9.9-8.9 10.7-24 1.8-33.9S97.8-2.7 87.9 6.2l-80 72C2.9 82.7 0 89.2 0 96s2.9 13.3 7.9 17.8l80 72c9.9 8.9 25 8.1 33.9-1.8s8.1-25-1.8-33.9L86.5 120l402.9 0-33.5 30.2c-9.9 8.9-10.7 24-1.8 33.9s24 10.7 33.9 1.8l80-72c5.1-4.6 7.9-11 7.9-17.8s-2.9-13.3-7.9-17.8l-80-72zM307.4 166.5c-11.5-8.7-27.3-8.7-38.8 0l-168 128c-6.6 5-11 12.5-12.3 20.7l-24 160c-1.4 9.2 1.3 18.6 7.4 25.6S86.7 512 96 512H240h16c17.7 0 32-14.3 32-32V361.9c0-5.5 4.4-9.9 9.9-9.9c3.7 0 7.2 2.1 8.8 5.5l68.4 136.8c5.4 10.8 16.5 17.7 28.6 17.7H464h16c9.3 0 18.2-4.1 24.2-11.1s8.8-16.4 7.4-25.6l-24-160c-1.2-8.2-5.6-15.7-12.3-20.7l-168-128z" /></svg>
                        <span className="margin-left-Icons">
                            View Transaction
                        </span>
                    </div>
                </li> */}
                <li style={{ backgroundColor: activeClass === 2 ? "#cdd7dd" : "" }} onClick={() => {
                    setActiveClass(2)
                    navigate("/income")
                }}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25" ><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                        <span className="margin-left-Icons">
                            Income
                        </span>
                    </div>
                </li>
                <li style={{ backgroundColor: activeClass === 3 ? "#cdd7dd" : "" }} onClick={() => {
                    setActiveClass(3)
                    navigate("/expense")
                }}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25"><path d="M200 32H56C42.7 32 32 42.7 32 56V200c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l40-40 79 79-79 79L73 295c-6.9-6.9-17.2-8.9-26.2-5.2S32 302.3 32 312V456c0 13.3 10.7 24 24 24H200c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-40-40 79-79 79 79-40 40c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H456c13.3 0 24-10.7 24-24V312c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2l-40 40-79-79 79-79 40 40c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V56c0-13.3-10.7-24-24-24H312c-9.7 0-18.5 5.8-22.2 14.8s-1.7 19.3 5.2 26.2l40 40-79 79-79-79 40-40c6.9-6.9 8.9-17.2 5.2-26.2S209.7 32 200 32z" /></svg>
                        <span className="margin-left-Icons">
                            Expense
                        </span>
                    </div>
                </li>
            </ul>

        </>
    );
}

export default Sidebar;
