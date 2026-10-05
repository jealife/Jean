import { ImageResponse } from "next/og";
import { Monogram } from "./_og/monogram";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(<Monogram size={192} />, size);
}
