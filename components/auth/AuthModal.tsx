"use client";

import { useState } from "react";
import { X, ShieldCheck, Mail, Lock, User, Sparkles } from "lucide-react";
import { useNexus } from "@/components/nexus/NexusProvider";
import { ChaseBadge } from "@/components/nexus/ChaseBadge";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { currentUser, userProfile, signIn, signUp, signOut, setOnboardingModalOpen } = useNexus();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMsg("Please enter both an email and password.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await signIn(cleanEmail, password);
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg("✓ Logged in successfully!");
          setTimeout(onClose, 800);
        }
      } else {
        const { error } = await signUp(cleanEmail, password, name.trim() || undefined);
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg("✓ Account created! Opening setup wizard...");
          setTimeout(() => {
            onClose();
            setOnboardingModalOpen(true);
          }, 600);
        }
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="dialog card auth-modal-body"
        role="dialog"
        aria-label="Chase Studios Account"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="dialog-head">
          <div className="author-name">
            <span className="logo-mark auth-mini-logo" aria-hidden="true">
              N
            </span>
            <div>
              <h3>Chase Studios Account</h3>
              <p className="hint">Shared identity across Chase Nexus & chase-studios.org</p>
            </div>
          </div>
          <button type="button" className="icon-btn" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        {currentUser ? (
          <div className="auth-logged-in-box">
            <div className="profile-row auth-user-row">
              <span className="avatar avatar-lg">
                {(userProfile?.display_name || currentUser.email || "C").slice(0, 1).toUpperCase()}
              </span>
              <div>
                <div className="author-name">
                  <h4>{userProfile?.display_name || "Chase Member"}</h4>
                  <ChaseBadge type="chase-account" />
                </div>
                <p className="hint">{currentUser.email}</p>
                <span className="verified-status-tag">
                  <ShieldCheck size={14} /> Chase Account Verified
                </span>
              </div>
            </div>
            <p className="hint">
              Your account automatically synchronizes posts, bookmarks, and preferences to the Chase Studios cloud.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: "0.82rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                onClick={() => {
                  onClose();
                  setOnboardingModalOpen(true);
                }}
              >
                <Sparkles size={14} /> Profile Wizard
              </button>
              <button
                type="button"
                className="btn btn-alert"
                style={{ flex: 1, fontSize: "0.82rem" }}
                onClick={async () => {
                  await signOut();
                  onClose();
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="auth-tabs" role="tablist">
              <button
                type="button"
                className={`tab ${mode === "login" ? "is-active" : ""}`}
                onClick={() => {
                  setMode("login");
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
              >
                Log In
              </button>
              <button
                type="button"
                className={`tab ${mode === "signup" ? "is-active" : ""}`}
                onClick={() => {
                  setMode("signup");
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
              >
                Create Account
              </button>
            </div>

            {mode === "signup" && <section className="nexus-signup-intro"><img src="/chase-studios-logo.svg" width={64} height={64} alt="Chase Studios"/><h2>Welcome to Chase Nexus!</h2><p>I’m Chase! Let’s get your account set up and get you into the Nexus.</p><ol><li>Create your account</li><li>Build your profile</li><li>Choose your Persona</li><li>Your interests</li></ol></section>}<div className="auth-info-banner">
              <Sparkles size={16} className="purple-icon" />
              <span>
                Registering creates a free <strong>Chase Studios Account</strong> with the universal purple verified checkmark.
              </span>
            </div>

            {errorMsg ? <div className="auth-error-banner">{errorMsg}</div> : null}
            {successMsg ? <div className="auth-success-banner">{successMsg}</div> : null}

            <form onSubmit={handleSubmit} className="auth-form">
              {mode === "signup" ? (
                <div className="form-group">
                  <label htmlFor="auth-name">Display Name (optional)</label>
                  <div className="input-with-icon">
                    <User size={16} className="input-icon" />
                    <input
                      id="auth-name"
                      type="text"
                      placeholder="Your preferred display name"
                      value={name}
                      maxLength={40}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
              ) : null}

              <div className="form-group">
                <label htmlFor="auth-email">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input
                    id="auth-email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="auth-password">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-icon" />
                  <input
                    id="auth-password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary full-width"
                disabled={loading}
              >
                {loading ? "Processing..." : mode === "login" ? "Log In to Nexus" : "Create Verified Account"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
