import { useState, useEffect } from "react";

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
    diff: number;
}

interface TimeLeftToRedeemProps {
    issuedAt: string;
}

export const TimeLeftToRedeem: React.FC<TimeLeftToRedeemProps> = ({ issuedAt }) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

    useEffect(() => {
        const calculate = (): void => {
            const issued = new Date(issuedAt.replace(" ", "T"));
            const expires = new Date(issued.getTime() + 24 * 60 * 60 * 1000);
            const now = new Date();
            const diff = expires.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft(null);
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds, diff });
        };

        calculate();
        const timer = setInterval(calculate, 1000);
        return () => clearInterval(timer);
    }, [issuedAt]);

    if (timeLeft === null) return <p>⛔ Offer expired</p>;

    const isUrgent = timeLeft.diff < 60 * 60 * 1000;

    return (
        <p className={`text-xl ${isUrgent ? 'text-red-500' : 'text-green-500'}`}>
            {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </p>
    );
}