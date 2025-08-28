import React, { useEffect, useState } from "react";
import { getItem, setItem } from "../lib/storage";

type Link = { label: string; url: string };
const KEY = "wys.quicklinks";

// 👇 Top-level helper, declared outside the component
function normalizeUrl(u: string) {
  const trimmed = u.trim();
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export default function QuickLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    getItem<Link[]>(KEY, [{ label: "Google", url: "https://google.com" }])
      .then(setLinks);
  }, []);

  useEffect(() => {
    setItem(KEY, links);
  }, [links]);

  function addLink(e: React.FormEvent) {
    e.preventDefault();
    if (!label || !url) return;
    setLinks((prev) => [...prev, { label, url: normalizeUrl(url) }]);
    setLabel("");
    setUrl("");
  }

  function remove(i: number) {
    setLinks((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div style={{ background: "#eef", padding: 12, height: "100%" }}>
      <h2 className="widget-title" style={{ marginTop: 0, cursor: "move" }}>Quick Links</h2>
      <ul style={{ paddingLeft: 18, marginTop: 8 }}>
        {links.map((l, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            <a href={l.url} target="_blank" rel="noreferrer">{l.label}</a>{" "}
            <button onClick={() => remove(i)} title="Remove" style={{ marginLeft: 8 }}>
              ×
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={addLink} style={{ marginTop: 8, display: "flex", gap: 6 }}>
        <input
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <input
          placeholder="https://…"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
