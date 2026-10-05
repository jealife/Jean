import { ImageResponse } from "next/og";
import { LogoMark } from "./_og/logo-mark";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(<LogoMark size={192} />, size);
}
