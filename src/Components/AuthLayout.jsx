import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoader(false);
            if (authStatus === undefined) return; // Wait for authStatus to resolve
            
            if (authStatus !== authentication) {
                navigate(authentication ? "/login" : "/");
            } else {
                setLoader(false);
            }
        }, 2000);
        return () => clearTimeout(timeout);
    }, [authStatus, navigate, authentication]);

    if (loader) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#0a66c2] rounded-full animate-spin"></div>
                <h2 className="mt-4 text-lg font-medium text-gray-700">
                    Loading, please wait...
                </h2>
            </div>
        );
    }
    

    return <>{children}</>;
}
