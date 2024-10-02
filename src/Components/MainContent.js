import React from 'react';
import './Styles/MainContent.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Views/Dashboard';
import Transactions from './Views/Transactions';
import Income from './Views/Income';
import Expense from './Views/Expense';
import AdobeFile from './Views/ADOBE/AdobeFile';

const MainContent = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expense" element={<Expense />} />
                <Route path="/adobefile" element={<AdobeFile />} />
            </Routes>
        </>
    );
}

export default MainContent;
