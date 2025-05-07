import { Smile, Gift, PartyPopper, Cake } from 'lucide-react';

export default function Happy() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen p-6 space-y-6 bg-gradient-to-r from-indigo-400 to-purple-200 text-black overflow-hidden">
            <Smile size={180} className="animate-bounce" aria-label="Smiling Icon" />
            <h1 className="text-5xl font-bold text-center">🎉 Happy Birthday Jarad Pajji! 🎉</h1>

            <p className="text-2xl font-medium text-center max-w-xl">
                Wishing you a day filled with joy, laughter, and love.
            </p>
            <p className="text-xl text-center max-w-xl">
                May this new chapter bring amazing opportunities, personal growth, and moments that make you smile.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-8 mt-4">
                <div className="flex flex-col items-center">
                    <Gift size={60} className="text-yellow-600" />
                    <span className="mt-2 text-lg font-semibold">Surprises</span>
                </div>
                <div className="flex flex-col items-center">
                    <Cake size={60} className="text-pink-600" />
                    <span className="mt-2 text-lg font-semibold">Cake & Sweets</span>
                </div>
                <div className="flex flex-col items-center">
                    <PartyPopper size={60} className="text-red-600" />
                    <span className="mt-2 text-lg font-semibold">Celebrations</span>
                </div>
            </div>

            <p className="text-lg text-center text-black/80 max-w-md mt-6">
                Here's to making beautiful memories, achieving your dreams, and staying true to the amazing person you are!
            </p>

            <footer className="text-sm text-black/60 mt-4">— With Love, From Your Friends 🎁</footer>
        </div>
    );
}
