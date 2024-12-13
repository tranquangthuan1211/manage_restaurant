import React, { useState } from "react";
import { AuthGuard } from "../../guards/auth-guard";
import RootLayout from "../../layouts/customer/layout";
import { useRouter } from "next/router";

const ReservationForm: React.FC = () => {
    const [diners, setDiners] = useState(1);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreeTerms) {
            alert("Please agree to the terms and conditions.");
            return;
        }

        const reservationData = { diners, date, time, specialRequests };
        localStorage.setItem("reservationData", JSON.stringify(reservationData));

        router.push("/reservation/preorder-dishes");
    };

    return (
        //<AuthGuard>
        <RootLayout>
            <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
                <div className="flex flex-col md:flex-row w-[90%] max-w-8xl bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Left Section: Image */}
                    <div className="w-full md:w-1/2">
                        <img
                            src="/images/login_bg.jpg"
                            alt="Reservation"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Section: Form */}
                    <div className="w-full md:w-1/2 p-12" style={{ background: "#bfbfbf" }}>
                        <h2 className="text-4xl font-bold mb-8 text-yellow-300 text-center">
                            Reservation Form
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Number of Diners */}
                            <div
                                className="flex items-center justify-between text-xl p-2 rounded-lg"
                                style={{ background: "#a8bba0" }}
                            >
                                <label className="font-bold text-3xl">Number of diners</label>
                                <div className="flex items-center space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setDiners(Math.max(1, diners - 1))}
                                        className="text-black font-bold w-10 h-10 flex justify-center items-center rounded-full border-4 border-black text-3xl"
                                    >
                                        <span className="text-3xl mb-2 font-bold">-</span>
                                    </button>
                                    <span
                                        className="text-2xl font-bold bg-gray px-6 py-1"
                                        style={{ background: "#bfbfbf" }}
                                    >
                                        {diners}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setDiners(diners + 1)}
                                        className="text-black font-bold w-10 h-10 flex justify-center items-center rounded-full border-4 border-black text-3xl"
                                    >
                                        <span className="text-3xl mb-2 font-bold">+</span>
                                    </button>
                                </div>
                            </div>

                            {/* Date và Time */}
                            <div
                                className="flex space-x-6 mb-6 p-5 rounded-xl"
                                style={{ background: "#a8bba0" }}
                            >
                                <div className="w-1/2">
                                    <label className="block font-bold text-2xl mb-2">Date</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full p-3 border rounded-lg text-lg"
                                        required
                                    />
                                </div>

                                <div className="w-1/2">
                                    <label className="block font-bold text-2xl mb-2">Time</label>
                                    <input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-full p-3 border rounded-lg text-lg"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div className="p-5 rounded-xl" style={{ background: "#a8bba0" }}>
                                <label className="block font-bold text-2xl mb-2">
                                    Special requests (optional)
                                </label>
                                <textarea
                                    value={specialRequests}
                                    onChange={(e) => setSpecialRequests(e.target.value)}
                                    className="w-full p-3 border rounded-lg text-lg"
                                    rows={4}
                                />
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-center text-lg">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    className="w-12 h-12 rounded-xl"
                                    required
                                />
                                <label className="ml-3 text-2xl">
                                    <span className="text-white">I agree to the </span>{" "}
                                    <a href="#" className="text-yellow-600 underline">
                                        terms and conditions
                                    </a>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    className="bg-yellow-300 text-white font-bold py-3 px-6 rounded-3xl text-2xl"
                                >
                                    Pre-order dishes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </RootLayout>
        //</AuthGuard>
    );
};

export default ReservationForm;
