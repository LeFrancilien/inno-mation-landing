import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function InnoMationLandingPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <section className="mx-auto max-w-[700px] bg-white p-10 shadow-sm rounded-lg font-sans text-[#222]">

                {/* HEADER */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="/images/inno_mation_logo.png"
                        alt="Inno Mation Logo"
                        width={100}
                        height={100}
                        className="h-auto w-auto"
                    />
                </div>

                <h1 className="text-3xl font-bold text-center text-[#111] mb-4">
                    🎯 Gagnez 5h/semaine avec 10 actions simples
                </h1>
                <p className="text-center text-lg mt-2.5">
                    Un mini audit gratuit pour les dirigeant·es de TPE/PME ou de structures à impact.
                </p>
                <p className="text-center text-base text-[#666] mt-2">
                    📩 Recevez la checklist PDF par email en moins de 2 minutes.
                </p>

                {/* FORMULAIRE */}
                <div className="text-center mt-8">
                    <form className="flex flex-col items-center gap-3">
                        <input
                            type="text"
                            name="prenom"
                            placeholder="Votre prénom"
                            className="w-4/5 max-w-[300px] p-2.5 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Votre email"
                            className="w-4/5 max-w-[300px] p-2.5 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-yellow-400 text-[#111] px-8 py-3 text-base font-semibold border-none mt-4 cursor-pointer rounded-full hover:bg-yellow-500 transition-colors duration-300 shadow-md"
                        >
                            📥 Télécharger la checklist gratuite
                        </button>
                    </form>
                </div>

                {/* BÉNÉFICES */}
                <div className="mt-10 bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                    <h2 className="text-xl font-bold text-[#111] mb-4">
                        ✅ Pourquoi cette checklist va vous faire gagner du temps :
                    </h2>
                    <ul className="text-base leading-relaxed space-y-2 list-none p-0">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✔</span> Identifiez les tâches à automatiser dès cette semaine
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✔</span> Reprenez le contrôle sur votre agenda
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✔</span> Libérez du temps pour scaler sereinement
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✔</span> Outil testé et validé chez +20 clients (PME, écoles, asso…)
                        </li>
                    </ul>
                </div>

                {/* À PROPOS */}
                <div className="mt-12 flex flex-col md:flex-row items-center gap-6">
                    <div className="shrink-0">
                        <div className="relative w-24 h-24 overflow-hidden rounded-full border-2 border-yellow-400 shadow-sm">
                            <Image
                                src="/images/farid.jpg"
                                alt="Farid"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-[#111] mb-2">👋 Qui suis-je ?</h2>
                        <p className="text-base mb-1">
                            Je suis <strong>Farid</strong>, expert en optimisation opérationnelle pour les petites structures.
                            Depuis 10 ans, j’aide des dirigeants comme vous à structurer leurs process,
                            sans embaucher ni exploser leur budget.
                        </p>

                    </div>
                </div>

                {/* SECOND CTA */}
                <div className="text-center mt-12 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-medium mb-6">
                        📥 Encore une fois : recevez votre checklist maintenant
                    </h3>
                    <form className="flex flex-col items-center gap-3">
                        <input
                            type="text"
                            name="prenom"
                            placeholder="Votre prénom"
                            className="w-4/5 max-w-[300px] p-2.5 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Votre email"
                            className="w-4/5 max-w-[300px] p-2.5 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-yellow-400 text-[#111] px-8 py-3 text-base font-semibold border-none mt-4 cursor-pointer rounded-full hover:bg-yellow-500 transition-colors duration-300 shadow-md"
                        >
                            ✅ Oui, je veux la checklist
                        </button>
                    </form>
                </div>

                {/* FOOTER */}
                <footer className="mt-12 text-sm text-center text-[#999] border-t border-gray-100 pt-6">
                    <p className="mb-2">
                        📞 Envie d’aller plus loin ? <Link href="https://calendly.com/" target="_blank" className="text-blue-600 hover:underline">Réservez un audit gratuit ici</Link>
                    </p>
                    <p>© Inno-Mation | Mentions légales | RGPD</p>
                </footer>

            </section>
        </div>
    );
}
