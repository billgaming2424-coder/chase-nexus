"use client";

import { useState } from "react";
import { Bookmark, MessageCircle, Repeat2 } from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import { REACTIONS, type Comment, type FeedId, type Post } from "@/lib/types";

function CommentThread({
  comments,
  parentId,
  depth,
  onReply,
}: {
  comments: Comment[];
  parentId?: string;
  depth: number;
  onReply: (comment: Comment) => void;
}) {
  const items = comments.filter((comment) => comment.parentId === parentId);
  if (items.length === 0) return null;
  return (
    <ul className="comment-list">
      {items.map((comment) => (
        <li key={comment.id}>
          <article>
            <header className="comment-head">
              <span className="author-name">
                <strong>{comment.author}</strong>
                {comment.verified ? <ChaseBadge type={comment.badgeType} /> : null}
              </span>
              {comment.example ? <span className="pill">Sample</span> : <span className="pill">This device</span>}
            </header>
            <p>{comment.body}</p>
            {depth < 2 ? (
              <button type="button" className="text-btn" onClick={() => onReply(comment)}>
                Reply
              </button>
            ) : null}
          </article>
          <CommentThread comments={comments} parentId={comment.id} depth={depth + 1} onReply={onReply} />
        </li>
      ))}
    </ul>
  );
}

export function PostCard({ post, mode, onTag }: { post: Post; mode: FeedId; onTag: (tag: string) => void }) {
  const { reactToPost, toggleRepost, toggleSave, addComment, votePoll, voteDiscussion, setQuoteTarget } = useNexus();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [reactionsOpen, setReactionsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [videoOn, setVideoOn] = useState(false);
  const total = post.reactions.like + post.reactions.celebrate + post.reactions.support;

  return (
    <article className="post card">
      <header className="post-head">
        <span className="avatar" aria-hidden="true">
          {post.author.name.slice(0, 1)}
        </span>
        <div>
          <span className="author-name">
            <strong>{post.author.name}</strong>
            {post.author.verified ? <ChaseBadge type={post.author.badgeType} /> : null}
          </span>
          <p>
            {post.author.handle} · {post.timeLabel} · {post.audience}
          </p>
        </div>
        <span className="pill">{post.yours ? "This device" : "Sample"}</span>
      </header>
      <p className="post-body">{post.body}</p>
      {post.hashtags.length > 0 ? (
        <p className="tags">
          {post.hashtags.map((tag) => (
            <button key={tag} type="button" onClick={() => onTag(tag)}>
              #{tag}
            </button>
          ))}
        </p>
      ) : null}
      {post.imageUrl || post.imageLabel ? (
        <div className="media" data-tone={post.tone}>
          {post.imageUrl ? <img src={post.imageUrl} alt={post.imageLabel ?? "Post image"} /> : <span>{post.imageLabel}</span>}
        </div>
      ) : null}
      {post.videoLabel ? (
        <div className="media media-video" data-tone={post.tone}>
          <button type="button" onClick={() => setVideoOn((value) => !value)}>
            {videoOn ? "Preview playing — no video file is hosted" : post.videoLabel}
          </button>
        </div>
      ) : null}
      {post.poll ? (
        <fieldset className="poll">
          <legend>Sample poll · votes stay in this browser</legend>
          {post.poll.map((choice) => (
            <label key={choice.id}>
              <input
                type="radio"
                name={`poll-${post.id}`}
                checked={post.pollVote === choice.id}
                onChange={() => votePoll(post.id, choice.id)}
              />
              <span>{choice.label}</span>
              <span>{choice.votes}</span>
            </label>
          ))}
        </fieldset>
      ) : null}
      {post.quote ? (
        <blockquote className="quote">
          <span className="author-name">
            <strong>{post.quote.author}</strong>
            <ChaseBadge type={post.quote.author === "Chase Studios" ? "official" : "chase-account"} />
          </span>
          <span>{post.quote.handle}</span>
          <p>{post.quote.body}</p>
        </blockquote>
      ) : null}
      {mode === "discussions" ? (
        <div className="votes" aria-label="Sample score">
          <button
            type="button"
            aria-label="Upvote"
            aria-pressed={post.discussionVote === 1}
            onClick={() => voteDiscussion(post.id, 1)}
          >
            Up
          </button>
          <span>{post.discussionScore}</span>
          <button
            type="button"
            aria-label="Downvote"
            aria-pressed={post.discussionVote === -1}
            onClick={() => voteDiscussion(post.id, -1)}
          >
            Down
          </button>
        </div>
      ) : null}
      <div className="actions">
        <div className="reaction-wrap">
          <button
            type="button"
            aria-expanded={reactionsOpen}
            onClick={() => setReactionsOpen((value) => !value)}
          >
            {post.reaction ? REACTIONS.find((item) => item.id === post.reaction)?.label : "React"} · {total}
          </button>
          {reactionsOpen ? (
            <div className="reaction-menu" role="group" aria-label="Reactions">
              {REACTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={post.reaction === item.id}
                  onClick={() => {
                    reactToPost(post.id, item.id);
                    setReactionsOpen(false);
                  }}
                >
                  <span aria-hidden="true">{item.glyph}</span> {item.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <button type="button" onClick={() => setCommentsOpen((value) => !value)}>
          <MessageCircle size={16} aria-hidden="true" /> {post.comments.length}
        </button>
        <button type="button" aria-pressed={post.reposted} onClick={() => toggleRepost(post.id)}>
          <Repeat2 size={16} aria-hidden="true" /> {post.reposts}
        </button>
        <button type="button" onClick={() => setQuoteTarget(post)}>
          Quote
        </button>
        <button type="button" aria-pressed={post.saved} onClick={() => toggleSave(post.id)}>
          <Bookmark size={16} aria-hidden="true" /> {post.saved ? "Saved" : "Save"}
        </button>
      </div>
      {commentsOpen ? (
        <div className="comments">
          <CommentThread
            comments={post.comments}
            depth={0}
            onReply={(comment) => {
              setReplyTo(comment);
              setDraft(`@${comment.author} `);
            }}
          />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addComment(post.id, draft, replyTo?.id);
              setDraft("");
              setReplyTo(null);
            }}
          >
            <label className="sr-only" htmlFor={`comment-${post.id}`}>
              {replyTo ? `Reply to ${replyTo.author}` : "Add a comment"}
            </label>
            <input
              id={`comment-${post.id}`}
              value={draft}
              maxLength={300}
              placeholder={replyTo ? `Reply to ${replyTo.author}` : "Add a comment on this device"}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button className="btn btn-primary" type="submit" disabled={!draft.trim()}>
              Reply
            </button>
          </form>
        </div>
      ) : null}
    </article>
  );
}
