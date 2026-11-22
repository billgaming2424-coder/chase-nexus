"use client";

import { useState } from "react";
import { Bookmark, MessageCircle, Repeat2 } from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";
import { NexusAvatar } from "@/components/nexus/NexusAvatar";
import { REACTIONS, DEFAULT_AVATAR, type Comment, type FeedId, type Post } from "@/lib/types";

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
                <span className="avatar avatar-xs">{comment.author.slice(0, 1)}</span>
              )}
              <span className="author-name">
                <strong>{comment.author}</strong>
                {comment.verified ? <ChaseBadge type={comment.badgeType} /> : null}
              </span>
              {comment.example ? <span className="pill">Sample</span> : <span className="pill">Cloud</span>}
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
        {post.author.avatarConfig ? (
          <NexusAvatar config={post.author.avatarConfig} size={42} showStickerBadge />
        ) : (
          <span className="avatar" aria-hidden="true">
            {post.author.name.slice(0, 1)}
          </span>
        )}
        <div>
          <span className="author-name">
            <strong>{post.author.name}</strong>
            {post.author.verified ? <ChaseBadge type={post.author.badgeType} /> : null}
          </span>
          <p>
            {post.author.handle} · {post.timeLabel} · {post.audience}
          </p>
        </div>
        <span className="pill">{post.yours ? "This device" : "Cloud"}</span>
      </header>

      <p className="post-body">{post.body}</p>

      {/* Bitmoji Sticker Attachment */}
      {post.avatarSticker && (
        <div className="post-sticker-attachment" style={{ margin: "10px 0", display: "inline-block" }}>
          <NexusAvatar
            config={{
              ...(post.author.avatarConfig || DEFAULT_AVATAR),
              pose: post.avatarSticker as any,
            }}
            size={84}
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

      {post.videoLabel ? (
        <div className="media" data-tone={post.tone}>
          {videoOn ? (
            <div className="media-playing">
              <span>Playing {post.videoLabel}</span>
              <button type="button" className="btn btn-ghost" onClick={() => setVideoOn(false)}>
                Pause video
              </button>
            </div>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => setVideoOn(true)}>
              Play sample video ({post.videoLabel})
            </button>
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
        <div className="poll">
          {post.poll.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className={post.pollVote === choice.id ? "is-voted" : ""}
              onClick={() => votePoll(post.id, choice.id)}
            >
              <span>{choice.label}</span>
              <span>{choice.votes}</span>
            </button>
          ))}
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
            onClick={() => toggleRepost(post.id)}
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
            onClick={() => toggleSave(post.id)}
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
