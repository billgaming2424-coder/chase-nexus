"use client";

import { useState } from "react";
import {
  Bookmark,
  MessageCircle,
  Repeat2,
  MoreHorizontal,
  Pin,
  Share2,
  Flag,
  Trash2,
  Heart,
  Check,
} from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { REACTIONS, DEFAULT_AVATAR, type Comment, type FeedId, type Post } from "@/lib/types";
import { sounds } from "@/lib/sounds";

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
            <header className="comment-head" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {comment.avatarConfig ? (
                <NexusAvatar config={comment.avatarConfig} size={26} />
              ) : (
                <span className="avatar avatar-xs">{(comment.author || "M").slice(0, 1)}</span>
              )}
              <span className="author-name">
                <strong>{comment.author || "Member"}</strong>
                {comment.verified ? <ChaseBadge type={comment.badgeType} /> : null}
              </span>
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
  const {
    reactToPost,
    toggleRepost,
    toggleSave,
    addComment,
    votePoll,
    voteDiscussion,
    setQuoteTarget,
    deletePost,
    pinPost,
    reportPost,
  } = useNexus();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [reactionsOpen, setReactionsOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [reportedToast, setReportedToast] = useState(false);
  const [draft, setDraft] = useState("");
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [videoOn, setVideoOn] = useState(false);
  const total = post.reactions.like + post.reactions.celebrate + post.reactions.support;

  return (
    <article className="post card" style={{ position: "relative" }}>
      {post.pinned && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.78rem",
            color: "#c084fc",
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          <Pin size={13} />
          <span>Pinned to top of feed</span>
        </div>
      )}

      <header className="post-head">
        {post.author?.avatarConfig ? (
          <NexusAvatar config={post.author.avatarConfig} size={42} showStickerBadge />
        ) : (
          <span className="avatar" aria-hidden="true">
            {(post.author?.name || "M").slice(0, 1)}
          </span>
        )}
        <div style={{ flex: 1 }}>
          <span className="author-name">
            <strong>{post.author?.name || "Member"}</strong>
            {post.author?.verified ? <ChaseBadge type={post.author?.badgeType} /> : null}
          </span>
          <p>
            {post.author?.handle || "@member"} · {post.timeLabel} · {post.audience}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, position: "relative" }}>
          <button
            type="button"
            className="icon-btn"
            style={{ width: 28, height: 28 }}
            aria-label="Post options"
            onClick={() => setOptionsOpen((v) => !v)}
          >
            <MoreHorizontal size={16} />
          </button>

          {optionsOpen && (
            <div
              className="card"
              style={{
                position: "absolute",
                top: 32,
                right: 0,
                background: "#181028",
                border: "1px solid rgba(168, 85, 247, 0.3)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
                borderRadius: 12,
                padding: 6,
                zIndex: 20,
                minWidth: 160,
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ justifyContent: "flex-start", gap: 8, fontSize: "0.82rem" }}
                onClick={() => {
                  pinPost(post.id);
                  setOptionsOpen(false);
                }}
              >
                <Pin size={14} />
                <span>{post.pinned ? "Unpin post" : "Pin post"}</span>
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ justifyContent: "flex-start", gap: 8, fontSize: "0.82rem" }}
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(`https://nexus.chase-studios.org/#${post.id}`);
                    setCopiedToast(true);
                    setTimeout(() => setCopiedToast(false), 2000);
                  } catch {}
                  setOptionsOpen(false);
                }}
              >
                <Share2 size={14} />
                <span>Copy post link</span>
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ justifyContent: "flex-start", gap: 8, fontSize: "0.82rem", color: "#f87171" }}
                onClick={() => {
                  reportPost(post.id, "Community report");
                  setOptionsOpen(false);
                  setReportedToast(true);
                  setTimeout(() => setReportedToast(false), 2500);
                }}
              >
                <Flag size={14} />
                <span>Report post</span>
              </button>
              {post.yours && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  style={{ justifyContent: "flex-start", gap: 8, fontSize: "0.82rem", color: "#ef4444" }}
                  onClick={() => {
                    if (confirm("Delete this post permanently?")) {
                      deletePost(post.id);
                    }
                    setOptionsOpen(false);
                  }}
                >
                  <Trash2 size={14} />
                  <span>Delete post</span>
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {copiedToast && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#7c3aed",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: "0.78rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
            zIndex: 30,
            boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
          }}
        >
          <Check size={12} /> Link copied to clipboard!
        </div>
      )}

      {reportedToast && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(220, 38, 38, 0.95)",
            color: "#fff",
            padding: "4px 12px",
            borderRadius: 20,
            fontSize: "0.78rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
            zIndex: 30,
            boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
          }}
        >
          <Check size={12} /> Post reported to moderation team!
        </div>
      )}

      <p className="post-body">{post.body}</p>

      {/* Persona Holo-Sticker Attachment */}
      {post.avatarSticker && (
        <div className="post-sticker-attachment" style={{ margin: "12px 0", display: "inline-block" }}>
          <NexusAvatar
            config={{
              ...(post.author.avatarConfig || DEFAULT_AVATAR),
              pose: post.avatarSticker as any,
              customCaption: post.avatarStickerCaption,
            }}
            size={110}
            showStickerBadge
          />
        </div>
      )}

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
          {post.imageUrl ? (
            <img src={post.imageUrl} alt={post.imageLabel ?? "Post image preview"} />
          ) : (
            <span>{post.imageLabel}</span>
          )}
        </div>
      ) : null}

      {post.videoUrl || post.videoLabel ? (
        <div
          className="media post-video-container featured-4k-card"
          style={{
            borderRadius: 16,
            overflow: "hidden",
            margin: "14px 0",
            background: "radial-gradient(circle at center, #1b0d36 0%, #080414 100%)",
            border: "1.5px solid rgba(168, 85, 247, 0.45)",
            boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(168, 85, 247, 0.25)",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              background: "rgba(0, 0, 0, 0.4)",
              borderBottom: "1px solid rgba(168, 85, 247, 0.2)",
            }}
          >
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
              <span className="status-dot live" /> Featured 4K Game Stream
            </span>
            <span className="pill" style={{ background: "rgba(168, 85, 247, 0.25)", color: "#c084fc", fontWeight: 800, fontSize: "0.72rem" }}>
              4K 60FPS
            </span>
          </div>

          {post.videoUrl ? (
            <video
              src={post.videoUrl}
              controls
              playsInline
              preload="metadata"
              style={{ width: "100%", maxHeight: 380, display: "block" }}
            />
          ) : (
            <div style={{ padding: "30px 20px", textAlign: "center" }}>
              {videoOn ? (
                <div className="media-playing">
                  <span>Playing {post.videoLabel}</span>
                  <button type="button" className="btn btn-ghost" onClick={() => setVideoOn(false)}>
                    Pause video
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ borderRadius: 24, padding: "10px 24px", gap: 8 }}
                  onClick={() => setVideoOn(true)}
                >
                  <span>Play 4K Stream ({post.videoLabel})</span>
                </button>
              )}
            </div>
          )}
        </div>
      ) : null}

      {post.quote ? (
        <div className="quote">
          <div>
            <strong>{post.quote.author}</strong>
            <span>{post.quote.handle}</span>
            <p>{post.quote.body}</p>
          </div>
        </div>
      ) : null}

      {post.poll ? (
        <div className="poll-container" style={{ margin: "14px 0", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>Interactive Poll Widget</span>
            <span className="pill" style={{ fontSize: "0.72rem" }}>Community Vote</span>
          </div>
          {(() => {
            const totalPollVotes = post.poll.reduce((acc, c) => acc + (c.votes || 0), 0);
            return (
              <>
                {post.poll.map((choice) => {
                  const pct = totalPollVotes > 0 ? Math.round(((choice.votes || 0) / totalPollVotes) * 100) : 0;
                  const isVoted = post.pollVote === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      className={`poll-choice-bar ${isVoted ? "is-voted" : ""}`}
                      onClick={() => votePoll(post.id, choice.id)}
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: 14,
                        background: isVoted ? "rgba(124, 58, 237, 0.22)" : "rgba(255, 255, 255, 0.04)",
                        border: isVoted ? "1px solid #a855f7" : "1px solid rgba(255, 255, 255, 0.08)",
                        color: "#fff",
                        textAlign: "left",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: `${pct}%`,
                          background: isVoted
                            ? "linear-gradient(90deg, #a855f7, #7c3aed)"
                            : "linear-gradient(90deg, rgba(168, 85, 247, 0.45), rgba(124, 58, 237, 0.35))",
                          boxShadow: pct > 0 ? "0 0 10px rgba(168, 85, 247, 0.3)" : "none",
                          pointerEvents: "none",
                          transition: "width 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                      <span style={{ position: "relative", zIndex: 1, fontWeight: isVoted ? 700 : 500, display: "flex", alignItems: "center", gap: 6 }}>
                        {isVoted && <span style={{ color: "#c084fc" }}>✓</span>}
                        {choice.label}
                      </span>
                      <span style={{ position: "relative", zIndex: 1, fontSize: "0.85rem", opacity: 0.95, fontWeight: 700 }}>
                        {pct}% ({choice.votes || 0})
                      </span>
                    </button>
                  );
                })}
                <div style={{ fontSize: "0.78rem", color: "var(--muted)", paddingLeft: 4 }}>
                  {totalPollVotes} {totalPollVotes === 1 ? "vote" : "votes"} · Nexus Community Poll
                </div>
              </>
            );
          })()}
        </div>
      ) : null}

      {mode === "discussions" ? (
        <div className="discussion-bar">
          <div className="vote-group">
            <button
              type="button"
              className={post.discussionVote === 1 ? "is-up" : ""}
              aria-label="Upvote discussion"
              onClick={() => voteDiscussion(post.id, 1)}
            >
              ▲
            </button>
            <span aria-label="Score">{post.discussionScore}</span>
            <button
              type="button"
              className={post.discussionVote === -1 ? "is-down" : ""}
              aria-label="Downvote discussion"
              onClick={() => voteDiscussion(post.id, -1)}
            >
              ▼
            </button>
          </div>
          <button type="button" className="text-btn" onClick={() => setCommentsOpen((value) => !value)}>
            {post.comments.length} replies
          </button>
        </div>
      ) : (
        <footer className="post-actions">
          <div className="reaction-zone">
            <button
              type="button"
              className={post.reaction ? "action is-on" : "action"}
              aria-label="Open reactions"
              onClick={() => setReactionsOpen((value) => !value)}
            >
              {post.reaction ? `${post.reaction} (${total})` : `React (${total})`}
            </button>
            {reactionsOpen ? (
              <div className="reaction-tray" role="menu">
                {REACTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    className={post.reaction === item.id ? "is-selected" : ""}
                    onClick={() => {
                      sounds.playPop();
                      reactToPost(post.id, item.id);
                      setReactionsOpen(false);
                    }}
                  >
                    <span aria-hidden="true">{item.glyph}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            className={post.reposted ? "action is-on" : "action"}
            aria-pressed={post.reposted}
            onClick={() => {
              sounds.playPop();
              toggleRepost(post.id);
            }}
          >
            <Repeat2 size={16} />
            <span>{post.reposts}</span>
          </button>
          <button
            type="button"
            className="action"
            onClick={() => {
              setQuoteTarget(post);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Quote
          </button>
          <button
            type="button"
            className="action"
            aria-expanded={commentsOpen}
            onClick={() => setCommentsOpen((value) => !value)}
          >
            <MessageCircle size={16} />
            <span>{post.comments.length}</span>
          </button>
          <button
            type="button"
            className={post.saved ? "action is-on" : "action"}
            aria-pressed={post.saved}
            onClick={() => {
              sounds.playPop();
              toggleSave(post.id);
            }}
          >
            <Bookmark size={16} />
            <span>{post.saved ? "Saved" : "Save"}</span>
          </button>
        </footer>
      )}

      {commentsOpen ? (
        <section className="comments">
          <CommentThread
            comments={post.comments}
            depth={0}
            onReply={(comment) => {
              setReplyTo(comment);
            }}
          />
          <form
            className="comment-form"
            onSubmit={(event) => {
              event.preventDefault();
              if (!draft.trim()) return;
              addComment(post.id, draft, replyTo?.id);
              setDraft("");
              setReplyTo(null);
            }}
          >
            {replyTo ? (
              <div className="reply-banner">
                <span>Replying to {replyTo.author}</span>
                <button type="button" className="text-btn" onClick={() => setReplyTo(null)}>
                  Cancel
                </button>
              </div>
            ) : null}
            <input
              value={draft}
              maxLength={300}
              placeholder={replyTo ? "Write your reply" : "Write a comment"}
              onChange={(event) => setDraft(event.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </section>
      ) : null}
    </article>
  );
}
