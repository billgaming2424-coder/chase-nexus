"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Plus, X } from "lucide-react";
import { STORIES } from "@/lib/demo-data";
import type { StoryPreview } from "@/lib/types";

export function StoriesRow() {
  const [active, setActive] = useState<StoryPreview | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  useEffect(() => {
    return () => {
      if (localPreview) URL.revokeObjectURL(localPreview);
    };
  }, [localPreview]);

  const close = () => {
    setActive(null);
    if (localPreview) URL.revokeObjectURL(localPreview);
    setLocalPreview(null);
  };

  return (
    <section className="stories-wrap" aria-labelledby="stories-heading">
      <h2 id="stories-heading" className="section-label">
        Stories
      </h2>
      <div className="stories">
        {STORIES.map((story) => (
          <button key={story.id} type="button" className="story" onClick={() => setActive(story)}>
            <span className={story.yours ? "story-ring is-yours" : "story-ring"} data-tone={story.tone}>
              {story.yours ? <Plus size={18} aria-hidden="true" /> : story.name.slice(0, 1)}
            </span>
            <span className="story-name">{story.name}</span>
          </button>
        ))}
      </div>
      <dialog ref={dialogRef} className="dialog" aria-labelledby={titleId} onClose={close}>
        {active ? (
          <div className="dialog-card">
            <header className="dialog-head">
              <h3 id={titleId}>{active.name}</h3>
              <button type="button" className="icon-btn" aria-label="Close story" onClick={close}>
                <X size={18} />
              </button>
            </header>
            <div className="media media-story" data-tone={active.tone}>
              {localPreview ? <img src={localPreview} alt="Story photo preview on this device" /> : <span>{active.yours ? "Add a preview" : "Sample story"}</span>}
            </div>
            <p>{active.caption}</p>
            {active.yours ? (
              <label className="file-btn">
                Choose a photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    if (localPreview) URL.revokeObjectURL(localPreview);
                    setLocalPreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
