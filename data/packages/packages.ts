import { UserType } from "@prisma/client";

export type Package = {
    id: string;
    name: string;
    price: string;
    features: string[];
    link: string;
    userType: UserType;
    buttonText: string
};

export const packages: Package[] = [
    {
        id: "1029",
        name: "Free Plan",
        price: "Free",
        features: ["1 User", "1 Team", "Free Support"],
        link: "/signup",
        userType: UserType.FREE,
        buttonText: "Sign Up for Free"
    },
    {
        id: "4483",
        name: "Pro Plan",
        price: "$15/month",
        features: ["Up to 5 Users", "Up to 5 Teams", "Priority Support"],
        link: "/pricing/purchase/4483",
        userType: UserType.PRO,
        buttonText: "Upgrade to Pro"

    },
    {
        id: "8809",
        name: "Enterprise Plan",
        price: "$50/month",
        features: ["Unlimited Users", "Unlimited Teams", "Dedicated Support"],
        link: "/contact-sales",
        userType: UserType.ENTERPRISE,
        buttonText: "Contact Sales",
    },
];

