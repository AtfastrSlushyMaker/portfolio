import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#faf9f7",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
          <img
            src="https://malekbsaissa.vercel.app/logo.png"
            width={64}
            height={64}
          />
          <div style={{ fontSize: 24, color: "#78716c", fontWeight: 500 }}>
            Software Engineer
          </div>
        </div>
        <div style={{ fontSize: 72, fontWeight: 600, color: "#1c1917", letterSpacing: "-0.03em", lineHeight: 1 }}>
          Malek Bsaissa
        </div>
        <div style={{ fontSize: 28, color: "#78716c", marginTop: 16, maxWidth: 700 }}>
          Cloud engineering student at ESPRIT — building full-stack applications, geospatial platforms, and cloud-native systems.
        </div>
        <div style={{ display: "flex", marginTop: 48, gap: 8 }}>
          <div style={{ padding: "8px 16px", borderRadius: 999, background: "#e85d3a", color: "#fff", fontSize: 18, fontWeight: 500 }}>
            malekbsaissa.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
