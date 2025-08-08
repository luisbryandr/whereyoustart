import React, { useEffect, useMemo, useState } from "react";
import { getItem, setItem } from "../lib/storage";

const KEY = "wys.notes";

export default function Notes() {
  const [text, setText] = useState("");

  // load once
  useEffect(() => {
    getItem<string>(KEY, "").then(setText);
  }, []);

  // debounce save
  const debounced = useMemo(() => {
    let t: number | undefined;
    return (v: string) => {
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => setItem(KEY, v), 400);
    };
  }, []);

  return (
    <div style={{ background: "#1f1f1f", padding: 12, height: "100%" }}>
      <h2 className="widget-title" style={{ marginTop: 0, color: "#f2f2f2", cursor: "move" }}>Notes</h2>
      <textarea
        value={text}
        onChange={(e) => {
          const v = e.target.value;
          setText(v);
          debounced(v);
        }}
        style={{ width: "100%", height: "calc(100% - 40px)", resize: "none" }}
        placeholder="Type to save…"
      />
    </div>
  );
}
