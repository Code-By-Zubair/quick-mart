import { AppAssets } from "../../assets/app_assets";

export type onBoardDataType = {
    image: any;
    heading: string;
    description: string;
}
export const OnboardData: onBoardDataType[] = [
    {
        image: AppAssets.onboard_1,
        heading: "Explore a wide range of products",
        description: "Explore a wide range of products at your fingertips. QuickMart offers an extensive collection to suit your needs."
    },
    {
        image: AppAssets.onboard_2,
        heading: "Unlock exclusive offers and discounts",
        description: "Get access to limited-time deals and special promotions available only to our valued customers."
    },
    {
        image: AppAssets.onboard_3,
        heading: "Safe and secure payments",
        description: " QuickMart employs industry-leading encryption and trusted payment gateways to safeguard your financial information."
    }
];