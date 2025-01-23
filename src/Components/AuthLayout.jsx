import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        // Wait until authStatus is available
        if (authStatus === undefined) return; // Waiting for authStatus to be defined

        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        } else {
            setLoader(false);
        }
    }, [authStatus, navigate, authentication]);

    if (loader) {
        return <h1>Loading...</h1>;
    }

    return <>{children}</>;
}
