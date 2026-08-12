

import Link from 'next/link';



export default function NotFound() {

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#0B1030] text-white bg-hero-sparkle">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(46,108,255,0.22),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(238,75,21,0.22),transparent_34%)]" />
            <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-brand-neon/20 blur-3xl animate-pulse-glow" />
            <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#EE4B15]/20 blur-3xl animate-pulse-glow" />
            <div className="pointer-events-none absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full border border-white/10 bg-white/5 blur-[1px] animate-spin-slow" />

            <div className="relative z-10 flex min-h-screen flex-col px-4 py-6 sm:px-6 lg:px-10">
              
                <section className="relative mx-auto flex w-full max-w-6xl flex-1 items-center">
                    <div className="grid w-full items-center gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:py-16">
                        <div className="space-y-6 text-center lg:text-left">
                            <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.28em] text-white/70 backdrop-blur-xl animate-float-slow">
                                InnovateX Connect 26
                            </p>

                            <div className="space-y-2">
                                <h1 className="text-7xl font-black leading-none tracking-tight text-[#F1FDFD] sm:text-8xl lg:text-[7.5rem] animate-float-slow">
                                    404
                                </h1>
                                <p className="max-w-xl text-3xl font-light uppercase tracking-[0.24em] text-[#EE4B15] sm:text-4xl lg:text-5xl animate-shimmer-text">
                                    Page Not Found
                                </p>
                            </div>

                            <p className="mx-auto max-w-xl text-sm leading-7 text-white/70 lg:mx-0 sm:text-base">
                                The route you asked for is not part of the event map. Return to the main stage, check the agenda, or head back to the home page.
                            </p>

                            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                                <Link
                                    href="/#home"
                                    className="inline-flex items-center justify-center rounded-2xl bg-[#F1FDFD] px-6 py-3.5 text-sm font-black text-[#0B1030] transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-0.5"
                                >
                                    Go Home
                                </Link>
                                <Link
                                    href="/#agenda"
                                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white/90 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
                                >
                                    View Agenda
                                </Link>
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-lg animate-float-slow">
                            <div className="absolute left-4 top-10 h-40 w-40 rounded-full bg-brand-neon/35 blur-3xl animate-pulse-glow" />
                            <div className="absolute right-2 bottom-8 h-48 w-48 rounded-full bg-[#EE4B15]/35 blur-3xl animate-pulse-glow" />

                            <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.01]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_55%)]" />
                                <div className="relative grid grid-cols-[1.05fr_0.95fr] gap-4">
                                    <div className="space-y-4">
                                        <div className="rounded-[1.6rem] bg-[#F1FDFD] px-4 py-4 text-[#0B1030] shadow-lg transition-transform duration-300 hover:-translate-y-1">
                                            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#EE4B15]">Lost in transit</p>
                                            <p className="mt-2 text-3xl font-black leading-none animate-bounce-gentle">404</p>
                                            <p className="mt-2 text-xs font-medium text-slate-600">
                                                This page was scanned, but it does not exist.
                                            </p>
                                        </div>

                                        <div className="rounded-[1.6rem] border border-white/10 bg-[#11153F] px-4 py-4 transition-transform duration-300 hover:-translate-y-1">
                                            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-white/60">Quick route</p>
                                            <div className="mt-3 space-y-2 text-sm font-semibold text-white/85">
                                                <Link href="/#home" replace className='flex items-center justify-between rounded-xl bg-white/5 px-3 py-2'>
                                                    <span>Home</span>
                                                    <span className="text-[#EE4B15]">01</span>
                                                </Link>
                                                <Link href='/#speakers' replace className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                                                    <span>Speakers</span>
                                                    <span className="text-brand-neon">02</span>
                                                </Link>
                                                <Link href='/#agenda' replace className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                                                    <span>Agenda</span>
                                                    <span className="text-[#F1FDFD]">03</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-between rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-5 py-5 transition-transform duration-300 hover:-translate-y-1">
                                        <div>
                                            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/55">Event status</p>
                                            <div className="mt-4 flex items-end gap-2">
                                                <span className="text-8xl font-black leading-none text-[#EE4B15]">4</span>
                                                <span className="pb-1 text-8xl font-black leading-none text-[#F1FDFD]">0</span>
                                                <span className="text-8xl font-black leading-none text-[#EE4B15]">4</span>
                                            </div>
                                            <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/55">
                                                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.8)] animate-pulse-glow" />
                                                System online
                                            </div>
                                        </div>

                                        <div className="mt-6 rounded-[1.4rem] bg-[#0B1030] px-4 py-4 transition-transform duration-300 hover:-translate-y-1">
                                            <p className="text-[11px] font-black uppercase tracking-[0.26em] text-white/50">Suggested action</p>
                                            <p className="mt-2 text-sm leading-6 text-white/75">
                                                Use the navigation above or return to the homepage to continue exploring the event.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
