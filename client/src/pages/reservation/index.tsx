import React, { useState } from "react";
import RootLayout from "src/layouts/customer/layout";
import { useRouter } from "next/router";
import { useUser } from "src/contexts/users/user-context";
import PageHeader from "src/components/page-header";

const ReservationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        diners: 1,
        date: "",
        time: "",
        specialRequests: "",
        agreeTerms: false,
    });

    const router = useRouter();
    const userContext = useUser();

    // Check authentication
    if (!userContext?.isAuthenticated) {
        window.location.href = "/auth";
        return (
            <div>
                <p className="text-xl mb-10">Please log in to access this page.</p>
            </div>
        );
    }

    // Update form data dynamically
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleDinersChange = (increment: number) => {
        setFormData((prev) => ({
            ...prev,
            diners: Math.max(1, Math.min(8, prev.diners + increment)),
        }));
    };

    const validateForm = () => {
        const { diners, date, time, agreeTerms } = formData;

        if (!date || !time || !agreeTerms) {
            alert("Please fill all required fields.");
            return false;
        }

        // Check if date is not in the past
        const selectedDate = new Date(date);
        const currentDate = new Date();
        if (selectedDate < currentDate) {
            alert("You cannot book a table for a past date.");
            return false;
        }

        // Check if time is within operating hours (6:00 AM to 10:00 PM)
        const selectedTime = new Date(`${date}T${time}`);
        const openingTime = new Date(`${date}T06:00`);
        const closingTime = new Date(`${date}T22:00`);
        if (selectedTime < openingTime || selectedTime > closingTime) {
            alert("You can only book a table between 6:00 AM and 10:00 PM.");
            return false;
        }

        // Check if number of diners is valid (1-8)
        if (diners <= 0 || diners > 8) {
            alert("Please select a valid number of diners (1-8).");
            return false;
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        localStorage.setItem("reservationData", JSON.stringify(formData));
        router.push("/reservation/preorder-dishes");
    };

    return (
        <RootLayout>
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
                <div className="grid grid-cols-1 md:grid-cols-12 max-w-8xl bg-white">
                    {/* Left Section: Image */}
                    <div className="md:col-span-5 ">
                        <img
                            src="/images/login_bg.jpg"
                            alt="Reservation"
                            className="w-full h-full object-center object-cover"
                        />
                    </div>

                    {/* Right Section: Form */}
                    <div className="md:col-span-7 md:p-8 bg-teal-900">
                        <PageHeader title="Reservation" subtitle="Book a table" />

                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-slate-200 px-6 py-6 md:rounded-lg shadow-lg">
                            {/* People */}
                            <div className="grid grid-cols-3 gap-4 items-center p-4 border border-solid border-slate-400 rounded-md">
                                <label className="font-bold col-span-1">Number of People</label>
                                <div className="col-span-2 flex items-center space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => handleDinersChange(-1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full"
                                    >
                                        <img src="/images/minus_icon.png" className="decrease-icon" alt="minus" />
                                    </button>
                                    <span className="px-4 py-1 w-10 text-center">
                                        {formData.diners}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleDinersChange(1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full"
                                    >
                                        <img src="/images/plus_icon.png" className="increase-icon" alt="plus" />
                                    </button>
                                </div>
                            </div>

                            {/* Date and Time */}
                            <div className="grid grid-cols-2 gap-4 p-4 border border-solid border-slate-400 rounded-md">
                                <div>
                                    <label className="block font-bold mb-1">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold mb-1">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg text-sm"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div className="p-4 border border-solid border-slate-400 rounded-md">
                                <label className="font-bold mb-2">Special requests</label>
                                <small className="inline-block italic text-slate-500 ml-2"> (optional) </small>
                                <textarea
                                    name="specialRequests"
                                    value={formData.specialRequests}
                                    onChange={handleChange}
                                    className="w-full mt-1 p-2 border rounded-lg text-sm"
                                    rows={3}
                                />
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onChange={handleChange}
                                    className="w-5 h-5"
                                    required
                                />
                                <label className="text-sm">
                                    <span className="text-black">I agree to the </span>
                                    <a href="#" className="text-yellow-600 underline">
                                        terms and conditions
                                    </a>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="button-yellow"
                                >
                                    Pre-order dishes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </RootLayout>
    );
};

export default ReservationForm;
