// Grid.tsx
import React, { useEffect, useRef, useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Notes from "../widgets/Notes";
import QuickLinks from "../widgets/QuickLinks";
import { getItem, setItem } from "../lib/storage";

// Constants
const LAYOUT_KEY = "grid-layout";
const DEFAULT: Layout[] = [
  { i: "notes", x: 0, y: 0, w: 6, h: 8 },
  { i: "quicklinks", x: 6, y: 0, w: 6, h: 8 },
  { i: "placeholder", x: 0, y: 8, w: 12, h: 4 },
];

export default function Grid() {
  const [layout, setLayout] = useState<Layout[]>(DEFAULT);
  const [width, setWidth] = useState(1200);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getItem<Layout[]>(LAYOUT_KEY, DEFAULT).then(setLayout);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (wrapRef.current) setWidth(wrapRef.current.clientWidth);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function handleLayoutChange(next: Layout[]) {
    setLayout(next);
    setItem(LAYOUT_KEY, next);
  }

  return (
    <div ref={wrapRef}>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={width}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".widget-title"
      >
        <div key="notes" style={{ background: 'transparent', overflow: 'hidden' }}>
          <Notes />
        </div>
        <div key="quicklinks" style={{ background: 'transparent', overflow: 'hidden' }}>
          <QuickLinks />
        </div>
        <div key="placeholder" style={{ background: '#f8f8f8', padding: '10px', border: '2px dashed #ccc' }}>
          <div className="widget-title" style={{ cursor: 'move', fontWeight: 'bold', marginBottom: '10px' }}>
            Add More Widgets
          </div>
          <div style={{ color: '#666' }}>Drag me around! More widgets coming soon...</div>
        </div>
      </GridLayout>
    </div>
  );
}
