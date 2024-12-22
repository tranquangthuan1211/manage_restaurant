import React from 'react';
import RootLayout from '../../layouts/customer/layout';
import CustomerSideBar from './sidebar';
import { useUser } from 'src/contexts/users/user-context';
import { useState } from 'react';

const CustomerSecurity = () => {
    const userContext = useUser();
    const user = userContext ? userContext.user : null;
    const isAuthenticated = userContext ? userContext.isAuthenticated : false;

    if (userContext == null || !isAuthenticated) {
        window.location.href = '/auth';
        return <div></div>;
    }

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user ? user.username : '',
        email: user ? user.email : '',
    });

    React.useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email,
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        console.log('Saving data:', formData);
        // Placeholder for API call
        alert('Changes saved!');
        setIsEditing(false);
    };

    return (
        <RootLayout>
            <div>
                <CustomerSideBar user={user}>
                    <div className="grid gap-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">Account Security</h2>
                            <div>
                            {!isEditing ? (
                                    <button
                                        className="button-outline-primary"
                                        onClick={handleEditToggle}
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <div className='flex gap-1'>
                                        <button
                                            className="button-outline-primary"
                                            onClick={handleEditToggle}
                                        >
                                            Cancle
                                        </button>
                                        <button
                                            className="button-outline-primary"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                className= {`input-field ${!isEditing ? 'input-field-disabled' : ''}`}
                                placeholder="Your username"
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className= {`input-field ${!isEditing ? 'input-field-disabled' : ''}`}
                                placeholder="Your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <button
                            className="button-outline-light"
                            disabled={!isEditing}
                        >
                            Reset password
                        </button>
                    </div>
                </CustomerSideBar>
            </div>
        </RootLayout>
    );
};

export default CustomerSecurity;
