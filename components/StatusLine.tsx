"use client";

import { useEffect, useState } from "react";

/** Hero status readout with live Berlin clock. */
export function StatusLine() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Berlin",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tag-mono text-dim">
      <span className="status-dot mr-2 align-middle" aria-hidden />
      system nominal · berlin 52.52°N{time && ` · ${time}`}
    </span>
  );
}
