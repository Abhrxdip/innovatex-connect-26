"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgetPasswordPage() {
    const [formData, setFormData] = useState({
        mail: "",
        password: "",
        newPassword: "",
        otp: "",
    });
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError("");
        if (message) setMessage("");
    };

    const handleSendOtp = async () => {
        if (!formData.mail) {
            setError("Please enter your email first.");
            return;
        }

        setOtpLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch("/api/auth/otp/registered", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.mail }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Unable to send OTP. Please try again.");
            }

            setMessage(data.message || "OTP sent successfully.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to send OTP.");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch("/api/auth/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mail: formData.mail,
                    password: formData.password,
                    newPassword: formData.newPassword,
                    otp: formData.otp,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Password reset failed. Please try again.");
            }

            setMessage(data.message || "Password updated successfully.");
            setFormData({
                mail: "",
                password: "",
                newPassword: "",
                otp: "",
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Password reset failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white/95 border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8">
                <div className="mb-6 text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-600">
                        Account Recovery
                    </p>
                    <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
                        Forgot Password
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">
                        Send an OTP, then use it to reset your password.
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Email
                        </label>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <input
                                type="email"
                                name="mail"
                                required
                                value={formData.mail}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                            />
                            <button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={otpLoading || !formData.mail}
                                className="sm:w-36 rounded-xl bg-[#1E1B4B] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-brand-neon disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {otpLoading ? "Sending..." : "Send OTP"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your current password"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            required
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter a new password"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700">
                            OTP
                        </label>
                        <input
                            type="text"
                            name="otp"
                            required
                            value={formData.otp}
                            onChange={handleChange}
                            placeholder="6 digit code"
                            inputMode="numeric"
                            maxLength={6}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-[#1E1B4B] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition-all duration-300 hover:bg-brand-neon disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Reset Password"}
                    </button>
                </form>

                <div className="mt-5 text-center text-sm text-slate-600">
                    Remembered your password?{' '}
                    <Link href="/login" className="font-bold text-blue-600 hover:text-indigo-700">
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
}
