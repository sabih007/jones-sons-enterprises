import { ImageResponse } from "next/og";

export const alt = "Jones & Sons Enterprises, a family-owned holding company in Rancho Palos Verdes, California";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0C0C0E",
          color: "#F6F4F2",
          padding: 80,
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: 40, top: -120, fontSize: 720, color: "#E8474D", opacity: 0.3, fontStyle: "italic" }}>&amp;</div>
        <div style={{ fontSize: 28, color: "#E8474D" }}>Est. 2018, Rancho Palos Verdes, California</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, lineHeight: 1 }}>Jones &amp; Sons</div>
          <div style={{ fontSize: 104, lineHeight: 1 }}>Enterprises</div>
          <div style={{ fontSize: 30, marginTop: 28, color: "rgba(246,244,242,0.7)", fontFamily: "sans-serif" }}>
            A family-owned holding company
          </div>
        </div>
      </div>
    ),
    size,
  );
}
