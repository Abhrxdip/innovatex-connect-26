"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { Icons } from "../../components/Icons";

export default function ForgetPasswordPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confPassword: "",
        otp: "",
    });
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);
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
        if (!formData.email) {
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
                body: JSON.stringify({ email: formData.email }),
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
                    email: formData.email,
                    password: formData.password,
                    conf_password: formData.confPassword,
                    otp: formData.otp,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Password reset failed. Please try again.");
            }

            setMessage(data.message || "Password updated successfully.");
            setFormData({
                email: "",
                password: "",
                confPassword: "",
                otp: "",
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Password reset failed.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-[#090D2B] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#EE4B15]/30 focus:border-[#EE4B15]/60 transition-all placeholder:text-slate-500";

    return (
        <div className="relative min-h-screen bg-[#090D2B] flex flex-col overflow-x-hidden font-display text-white">
            {/* Subtle background pattern */}
            <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />


            <main className="relative z-10 flex-1 flex items-center justify-center px-4 pt-28 sm:pt-32 pb-12">
                <div className="w-full max-w-md">
                    <div className="bg-[#0C1235] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/8 relative overflow-hidden">
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EE4B15] via-[#EE4B15]/80 to-[#EE4B15]/40" />

                        {/* Header */}
                        <div className="text-center mb-6 pt-2">
                            <p className="text-white font-bold text-sm tracking-wide mb-1">InnovateX Connect&apos;26</p>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                Account Recovery
                            </h1>
                            <p className="mt-2 text-sm text-slate-400">
                                Send an OTP, then use it to reset your password.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                    Email Address
                                </label>
                                <div className="flex flex-col gap-2 sm:flex-row">
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className={inputClass}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={otpLoading || !formData.email}
                                        className="sm:w-36 py-3 px-4 rounded-xl bg-[#090D2B] border border-white/10 hover:border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                    >
                                        {otpLoading ? "Sending..." : "Send OTP"}
                                    </button>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={inputClass}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#EE4B15] transition-colors"
                                    >
                                        {showPassword ? (
                                            <Icons.EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Icons.Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfPassword ? "text" : "password"}
                                        name="confPassword"
                                        required
                                        value={formData.confPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={inputClass}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfPassword(!showConfPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#EE4B15] transition-colors"
                                    >
                                        {showConfPassword ? (
                                            <Icons.EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Icons.Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* OTP */}
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
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
                                    className={inputClass}
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-2 py-3.5 px-6 rounded-xl bg-[#EE4B15] hover:bg-[#EE4B15]/90 text-white font-bold text-sm shadow-lg shadow-[#EE4B15]/15 hover:shadow-[#EE4B15]/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Reset Password
                                        <Icons.ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <p className="text-slate-400 text-xs">
                                Remembered your password?{' '}
                                <Link
                                    href="/login"
                                    className="text-[#EE4B15] hover:text-[#EE4B15]/80 font-bold transition-colors"
                                >
                                    Back to login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
