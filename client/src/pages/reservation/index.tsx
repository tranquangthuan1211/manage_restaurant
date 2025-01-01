import React, { useState } from "react";
import RootLayout from "src/layouts/customer/layout";
import { useRouter } from "next/router";
import { useUser } from "src/contexts/users/user-context";
import { AuthGuard } from "src/guards/auth-guard";
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
            diners: Math.max(1, prev.diners + increment),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreeTerms) {
            alert("Please agree to the terms and conditions.");
            return;
        }

        localStorage.setItem("reservationData", JSON.stringify(formData));
        router.push("/reservation/preorder-dishes");
    };

    return (
        <RootLayout>
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-8xl bg-white">
                    {/* Left Section: Image */}
                    <div>
                        <img
                            src="/images/login_bg.jpg"
                            alt="Reservation"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Section: Form */}
                    <div className="p-8 md:p-12 bg-slate-100">
                        <PageHeader title="Reservation" subtitle="Book a table" />

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* People */}
                            <div className="grid grid-cols-3 gap-4 items-center p-4 border border-solid rounded-sm">
                                <label className="font-bold col-span-1">People</label>
                                <div className="col-span-2 flex items-center space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => handleDinersChange(-1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-black text-lg font-bold"
                                    >
                                        <img src="/images/minus_icon.png" alt="minus" width={20}/>
                                    </button>
                                    <span className="px-4 py-1 w-10 text-center">
                                        {formData.diners}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleDinersChange(1)}
                                        className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-black text-lg font-bold"
                                    >
                                        <img src="/images/plus_icon.png" alt="plus" width={20}/>
                                    </button>
                                </div>
                            </div>

                            {/* Date and Time */}
                            <div className="grid grid-cols-2 gap-4 p-4 border border-solid rounded-sm">
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
                            <div className="p-4 border border-solid rounded-sm">
                                <label className="block font-bold mb-2">Special requests (optional)</label>
                                <textarea
                                    name="specialRequests"
                                    value={formData.specialRequests}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg text-sm"
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

