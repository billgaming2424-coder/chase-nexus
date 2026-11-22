"use client";

import { useState } from "react";
import { ImagePlus, ListPlus, X } from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import type { Audience } from "@/lib/types";

export function Composer() {
  const { displayName, quoteTarget, setQuoteTarget, addPost } = useNexus();
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<Audience>("public");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pollOn, setPollOn] = useState(false);
  const [choices, setChoices] = useState(["", ""]);

  const filledChoices = choices.map((choice) => choice.trim()).filter(Boolean);
  const pollReady = !pollOn || (body.trim().length > 0 && filledChoices.length >= 2);
  const hasContent = body.trim().length > 0 || Boolean(imageUrl);
  const quoteReady = !quoteTarget || body.trim().length > 0;
  const canSubmit = hasContent && pollReady && quoteReady;

  const reset = () => {
    setBody("");
    setPollOn(false);
    setChoices(["", ""]);
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
  };

  return (
    <form
      className="composer card"
      onSubmit={(event) => {
        event.preventDefault();
        if (!canSubmit) return;
        addPost({
          body,
          audience,
          imageUrl: imageUrl ?? undefined,
          imageLabel: imageUrl ? "Photo attached on this device" : undefined,
          poll: pollOn
            ? filledChoices.slice(0, 4).map((label, index) => ({ id: `choice-${index}`, label }))
            : undefined,
          quote: quoteTarget
            ? {
                author: quoteTarget.author.name,
                handle: quoteTarget.author.handle,
                body: quoteTarget.body,
              }
            : undefined,
        });
        reset();
      }}
    >
      <div className="composer-top">
        <span className="avatar" aria-hidden="true">
          {displayName.slice(0, 1).toUpperCase()}
        </span>
        <label className="sr-only" htmlFor="composer-body">
          Write a post
        </label>
        <textarea
          id="composer-body"
          value={body}
          maxLength={500}
          placeholder="Share something with your preview feed"
          onChange={(event) => setBody(event.target.value)}
        />
      </div>
      {quoteTarget ? (
        <div className="quote">
          <div>
            <strong>{quoteTarget.author.name}</strong>
            <span>{quoteTarget.author.handle}</span>
            <p>{quoteTarget.body}</p>
          </div>
          <button type="button" className="icon-btn" aria-label="Remove quote" onClick={() => setQuoteTarget(null)}>
            <X size={16} />
          </button>
        </div>
      ) : null}
      {imageUrl ? (
        <div className="media">
          <img src={imageUrl} alt="Attached post preview" />
          <button
            type="button"
            className="icon-btn media-remove"
            aria-label="Remove photo"
            onClick={() => {
              URL.revokeObjectURL(imageUrl);
              setImageUrl(null);
            }}
          >
            <X size={16} />
          </button>
        </div>
      ) : null}
      {pollOn ? (
        <fieldset className="poll-editor">
          <legend>Poll choices</legend>
          {choices.map((choice, index) => (
            <input
              key={index}
              value={choice}
              maxLength={60}
              aria-label={`Choice ${index + 1}`}
              placeholder={`Choice ${index + 1}`}
              onChange={(event) => {
                const next = [...choices];
                next[index] = event.target.value;
                setChoices(next);
              }}
            />
          ))}
          {choices.length < 4 ? (
            <button type="button" className="btn btn-ghost" onClick={() => setChoices([...choices, ""])}>
              Add choice
            </button>
          ) : null}
        </fieldset>
      ) : null}
      <div className="composer-bar">
        <label className="icon-btn" title="Add a photo">
          <ImagePlus size={18} aria-hidden="true" />
          <span className="sr-only">Add a photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              if (imageUrl) URL.revokeObjectURL(imageUrl);
              setImageUrl(URL.createObjectURL(file));
              event.target.value = "";
            }}
          />
        </label>
        <button
          type="button"
          className={pollOn ? "icon-btn is-on" : "icon-btn"}
          aria-pressed={pollOn}
          aria-label="Add a poll"
          onClick={() => setPollOn((value) => !value)}
        >
          <ListPlus size={18} />
        </button>
        <label className="audience">
          <span className="sr-only">Audience preference</span>
          <select value={audience} onChange={(event) => setAudience(event.target.value as Audience)}>
            <option value="public">Public preview</option>
            <option value="friends">Friends preview</option>
            <option value="followers">Followers preview</option>
          </select>
        </label>
        <button className="btn btn-primary" type="submit" disabled={!canSubmit}>
          Post
        </button>
      </div>
      <p className="hint">Posts stay on this device. Audience choices are saved with the post and are not enforced yet.</p>
    </form>
  );
}
