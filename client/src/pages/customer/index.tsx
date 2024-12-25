import React from 'react';
import RootLayout from '../../layouts/customer/layout';
import { useUser } from 'src/contexts/users/user-context';
import MenuOverview from 'src/components/menu-overview';

const Customer = () => {
    const userContext = useUser();

    const user = userContext ? userContext.user : null;
    const isAuthenticated = userContext ? userContext.isAuthenticated : false;
    if (false && !isAuthenticated) {
        window.location.href = '/auth';
        return <div></div>;
    }

    return (
        <RootLayout>
        <div>
            {/* Hero Start */}
            <MenuOverview/>
            {/* Hero End */}
        </div>
    </RootLayout>
    )
}

export default Customer;