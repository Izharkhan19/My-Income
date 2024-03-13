import React, { useEffect } from 'react'
import './Styles/MainView.css'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import Breadcrumbs from '../Common/Breadcrumbs'

const MainView = () => {
    return (
        <div className="container">
            <div className="sidebar">
                {/* Sidebar content goes here */}
                <Sidebar />
            </div>
            <div className="main-content">
                {/* Main content goes here */}
                <div className='Sticky_header'>
                    <Breadcrumbs />
                    <hr />
                </div>
                <MainContent />
            </div>
        </div>
    )
}

export default MainView
