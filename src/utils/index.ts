import { ComponentsProps } from "@mui/material";

export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomFloat = (min: number, max: number, fix = 3) =>
    (Math.random() * (min - max) + max).toFixed(fix);


export const secondsToHms = (d: number) => {
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

    return hDisplay + mDisplay + sDisplay;
};

export const getDerivedStateFromProps = (state: Record<string, any>, props: ComponentsProps) => ({
    ...(state && {
        ...state
    }),
    ...(props && {
        ...props
    })
});

export const toFixedNumber = (number: number, digits: number, base = 10) => {
    const pow = Math.pow(base, digits);
    const fixedNumber = Math.round(number * pow) / pow;
    return fixedNumber;
};

export const debounce = (func: any, delay = 400) => {
    let timer = null as any;
    return function (...args: any[]) {
        //@ts-ignore
        const context = this;
        if (timer) {
            clearTimeout(timer);
        };
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args as any);
        }, delay);
    };
};