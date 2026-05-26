import { T } from "./tokens";

export function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${T.bd}`, padding: "28px 0", background: T.bg }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span style={{ fontFamily: T.mono, fontSize: "11px", color: T.d }}>Mykhailo Dzhezhelo © 2025</span>
        <div className="flex items-center gap-4">
          <span style={{ fontFamily: T.mono, fontSize: "11px", color: T.f }}>React Native · TypeScript · Frontend Engineering</span>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: T.green, boxShadow: "0 0 5px rgba(34,197,94,0.7)" }} />
        </div>
      </div>
    </footer>
  );
}
