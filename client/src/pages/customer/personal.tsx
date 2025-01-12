import React from 'react';
import RootLayout from '../../layouts/customer/layout';
import CustomerSideBar from '../../components/customer/sidebar';
import { useState, useEffect } from 'react';
import { apiGet, apiPatch } from 'src/api/api-requests';
import { User } from 'src/types/user';
import { useUser } from 'src/contexts/users/user-context';

const CustomerPersonalInfo = () => {
    const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };
    if (user === null || !isAuthenticated) {
        window.location.href = '/auth';
        return <div></div>;
    }

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user ? user.username : '',
        name: user ? user.name: '',
        phone: user ? user.phone : '',
        address: user ? user.address : '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                name: user.name,
                phone: user.phone,
                address: user.address,
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

    const handleSave = async () => {
        console.log('Saving data:', formData);
        // Placeholder for API call
        await apiPatch(`/users/${user?._id}`, formData);
        alert('Changes saved!');
        setIsEditing(false);
    };

    return (
        <RootLayout>
            <div>
                <CustomerSideBar user={user}>
                    {/* Personal Information */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-between items-center col-span-2">
                            <h2 className="text-xl font-bold">Personal Information</h2>
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
                        {/* First Name, Last Name, Phone number, Email & Address */}
                        <div>
                            <span>Your Name</span>
                            <input
                                type="text"
                                name="name"
                                className={`input-field ${!isEditing ? 'input-field-disabled' : ''}`}
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <span>Your Username</span>
                            <input
                                type="text"
                                name="username"
                                className={`input-field ${!isEditing ? 'input-field-disabled' : ''}`}
                                placeholder="Your username"
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <span>Phone Number</span>
                            <input
                                type="text"
                                name="phone"
                                className={`input-field ${!isEditing ? 'input-field-disabled' : ''}`}
                                placeholder="Your Phone Number"
                                value={formData.phone}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <span>Address</span>
                            <input
                                type="text"
                                name="address"
                                className={`input-field ${!isEditing ? 'input-field-disabled' : ''}`}
                                placeholder="Your Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                </CustomerSideBar>
            </div>
        </RootLayout>
    );
};

export default CustomerPersonalInfo;