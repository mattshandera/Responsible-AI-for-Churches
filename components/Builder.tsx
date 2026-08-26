"use client";

import { useEffect, useMemo, useState } from "react";
import Preview from "./Preview";
import {
  CheckRow,
  ListEditor,
  RadioCards,
  TextArea,
  TextField,
  Toggle,
} from "./fields";
import { PRINCIPLES, POSTURES, type Posture } from "@/lib/principles";
import {
  AUTOMATIONS,
  ORG_KINDS,
  PROHIBITED,
  REVIEW_CADENCES,
  TONES,
  USE_CASES,
} from "@/lib/options";
import {
  buildDocument,
  docTitle,
  fileBaseName,
  orgLabel,
  resolvedPrinciples,
} from "@/lib/document";
import { renderMarkdown } from "@/lib/markdown";
import { DEFAULT_ANSWERS, type Answers, type OrgKind, type ReviewCadence, type Tone } from "@/lib/types";

const STORAGE_KEY = "raifc-builder-v1";

const STEPS = [
  { id: "org", title: "Your church", blurb: "Who this document is for." },
  { id: "doc", title: "Document details", blurb: "Title, version, and owner." },
  { id: "posture", title: "Posture & voice", blurb: "How far you are willing to go, and how it should read." },
  { id: "principles", title: "Principles", blurb: "Keep, cut, reword, or add your own." },
  { id: "usage", title: "How you use AI", blurb: "What is actually happening today." },
  { id: "guardrails", title: "Guardrails", blurb: "Where AI does not go, and who approves it." },
  { id: "review", title: "Review & download", blurb: "Read it through, then take it with you." },
] as const;

function initialAnswers(): Answers {
  return {
    ...DEFAULT_ANSWERS,
    selectedPrincipleIds: PRINCIPLES.map((p) => p.id),
    useCases: ["transcription", "summarization", "outlines", "copywriting", "research"],
    prohibited: ["counseling", "discipline", "congregant-data", "likeness"],
  };
}

export default function Builder() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [step, setStep] = useState(0);
  const [editing, setEditing] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Restore any work in progress. Nothing leaves the browser.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers({ ...initialAnswers(), ...JSON.parse(raw) });
    } catch {
      /* ignore unreadable storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* storage may be unavailable or full */
    }
  }, [answers, loaded]);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: value }));

  const toggleIn = (key: "selectedPrincipleIds" | "useCases" | "automations" | "prohibited", id: string) =>
    setAnswers((prev) => {
      const list = prev[key];
      return {
        ...prev,
        [key]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
      };
    });

  const blocks = useMemo(() => buildDocument(answers), [answers]);
  const markdown = useMemo(() => renderMarkdown(blocks), [blocks]);
  const principleCount = resolvedPrinciples(answers).length;
  const canAdvance = step !== 0 || answers.orgName.trim().length > 0;

  function download(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function downloadMarkdown() {
    download(
      new Blob([markdown], { type: "text/markdown;charset=utf-8" }),
      `${fileBaseName(answers)}.md`,
    );
  }

  async function downloadPdf() {
    setBusy(true);
    try {
      const { renderPdf } = await import("@/lib/pdf");
      const footer = `${docTitle(answers)} · v${answers.version.trim() || "1.0"}`;
      renderPdf(blocks, footer).save(`${fileBaseName(answers)}.pdf`);
    } finally {
      setBusy(false);
    }
  }

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked; the download still works */
    }
  }

  function startOver() {
    if (!window.confirm("Clear every answer and start again?")) return;
    setAnswers(initialAnswers());
    setStep(0);
  }

  // Until the saved draft has been read back, the form is not interactive:
  // input typed before that would be overwritten by the restore.
  if (!loaded) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="h-8 w-72 animate-pulse rounded-full bg-line" />
        <div className="mt-5 h-96 animate-pulse rounded-2xl border border-line bg-surface" />
        <p className="sr-only">Loading your draft</p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:px-8">
      <div className="min-w-0">
        <StepNav step={step} onSelect={setStep} />

        <div className="mt-5 rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-7">
          <header className="mb-5 border-b border-line pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              Step {step + 1} of {STEPS.length}
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-ink">
              {STEPS[step].title}
            </h2>
            <p className="mt-1 text-sm text-muted">{STEPS[step].blurb}</p>
          </header>

          <div className="space-y-5">
            {step === 0 ? (
              <>
                <TextField
                  label="Name of your church or organization"
                  hint="This appears throughout the document."
                  value={answers.orgName}
                  onChange={(v) => set("orgName", v)}
                  placeholder="Grace Community Church"
                />
                <RadioCards<OrgKind>
                  legend="What kind of organization is this?"
                  options={ORG_KINDS.map((k) => ({ id: k.id, label: k.label }))}
                  value={answers.orgKind}
                  onChange={(v) => set("orgKind", v)}
                  columns={2}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="City or region (optional)"
                    value={answers.orgLocation}
                    onChange={(v) => set("orgLocation", v)}
                    placeholder="Omaha, Nebraska"
                  />
                  <TextField
                    label="Website (optional)"
                    value={answers.orgWebsite}
                    onChange={(v) => set("orgWebsite", v)}
                    placeholder="gracecommunity.org"
                  />
                </div>
                {!canAdvance ? (
                  <p className="text-xs text-accent">
                    Add a name to continue.
                  </p>
                ) : null}
              </>
            ) : null}

            {step === 1 ? (
              <>
                <TextField
                  label="Document title"
                  hint={`Leave blank to use "${docTitle(answers)}".`}
                  value={answers.docTitle}
                  onChange={(v) => set("docTitle", v)}
                  placeholder={docTitle(answers)}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="Version"
                    value={answers.version}
                    onChange={(v) => set("version", v)}
                    placeholder="1.0"
                  />
                  <TextField
                    label="Effective date"
                    type="date"
                    value={answers.effectiveDate}
                    onChange={(v) => set("effectiveDate", v)}
                  />
                </div>
                <div className="rounded-xl border border-line bg-canvas p-4">
                  <p className="mb-3 text-sm font-semibold text-ink">
                    Who keeps this document current?
                  </p>
                  <p className="mb-4 text-xs text-muted">
                    A policy nobody owns stops being true within a year. Naming a
                    person is optional, but it is the difference between a
                    document and a practice.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField
                      label="Name"
                      value={answers.ownerName}
                      onChange={(v) => set("ownerName", v)}
                      placeholder="Jordan Ellis"
                    />
                    <TextField
                      label="Role"
                      value={answers.ownerRole}
                      onChange={(v) => set("ownerRole", v)}
                      placeholder="Executive Pastor"
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      label="Contact email (optional)"
                      value={answers.ownerEmail}
                      onChange={(v) => set("ownerEmail", v)}
                      placeholder="ai@gracecommunity.org"
                    />
                  </div>
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <RadioCards<Posture>
                  legend="How far are you willing to go with AI right now?"
                  hint="This sets the concrete commitment attached to each principle. You can change it later and watch the document rewrite itself."
                  options={POSTURES.map((p) => ({
                    id: p.id,
                    label: p.label,
                    blurb: p.blurb,
                  }))}
                  value={answers.posture}
                  onChange={(v) => set("posture", v)}
                />
                <RadioCards<Tone>
                  legend="How should it read?"
                  options={TONES.map((t) => ({
                    id: t.id,
                    label: t.label,
                    blurb: t.blurb,
                  }))}
                  value={answers.tone}
                  onChange={(v) => set("tone", v)}
                  columns={3}
                />
                <div className="grid gap-2">
                  <Toggle
                    label="Include the historical narrative"
                    hint="Roman roads, the Gutenberg Press, the Internet — technology as infrastructure the church has stewarded before."
                    checked={answers.includeNarrative}
                    onChange={(v) => set("includeNarrative", v)}
                  />
                  <Toggle
                    label="Include a practice under each principle"
                    hint="Turns each belief into something specific your staff can be held to."
                    checked={answers.includePractices}
                    onChange={(v) => set("includePractices", v)}
                  />
                  <Toggle
                    label="Include Scripture references"
                    hint="Adds three short quotations (NIV) at the opening, the overview, and the limits section."
                    checked={answers.includeScripture}
                    onChange={(v) => set("includeScripture", v)}
                  />
                </div>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-brand-soft px-3 py-2">
                  <p className="text-sm text-ink">
                    <strong>{principleCount}</strong> principles in your document.
                  </p>
                  <div className="flex gap-3 text-xs font-medium">
                    <button
                      type="button"
                      className="text-brand hover:underline"
                      onClick={() =>
                        set("selectedPrincipleIds", PRINCIPLES.map((p) => p.id))
                      }
                    >
                      Select all
                    </button>
                    <button
                      type="button"
                      className="text-muted hover:underline"
                      onClick={() => set("selectedPrincipleIds", [])}
                    >
                      Clear all
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {PRINCIPLES.map((p) => {
                    const checked = answers.selectedPrincipleIds.includes(p.id);
                    const override = answers.principleOverrides[p.id];
                    const isEditing = editing === p.id;
                    return (
                      <CheckRow
                        key={p.id}
                        checked={checked}
                        onChange={() => toggleIn("selectedPrincipleIds", p.id)}
                        label={`${p.number}. ${p.title}`}
                        detail={override ?? p.statement}
                      >
                        {checked ? (
                          <div className="mt-2 pl-7">
                            <p className="text-xs italic text-muted">{p.why}</p>
                            {answers.includePractices ? (
                              <p className="mt-1.5 text-xs text-ink-soft">
                                <span className="font-semibold">Practice:</span>{" "}
                                {p.practice[answers.posture]}
                              </p>
                            ) : null}
                            <div className="mt-2 flex gap-3 text-xs font-medium">
                              <button
                                type="button"
                                className="text-brand hover:underline"
                                onClick={() => setEditing(isEditing ? null : p.id)}
                              >
                                {isEditing ? "Done" : "Reword this"}
                              </button>
                              {override ? (
                                <button
                                  type="button"
                                  className="text-muted hover:underline"
                                  onClick={() => {
                                    const next = { ...answers.principleOverrides };
                                    delete next[p.id];
                                    set("principleOverrides", next);
                                  }}
                                >
                                  Reset to original
                                </button>
                              ) : null}
                            </div>
                            {isEditing ? (
                              <textarea
                                className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
                                rows={3}
                                value={override ?? p.statement}
                                onChange={(e) =>
                                  set("principleOverrides", {
                                    ...answers.principleOverrides,
                                    [p.id]: e.target.value,
                                  })
                                }
                              />
                            ) : null}
                          </div>
                        ) : null}
                      </CheckRow>
                    );
                  })}
                </div>

                <div className="rounded-xl border border-line bg-canvas p-4">
                  <p className="mb-1 text-sm font-semibold text-ink">
                    Add your own principles
                  </p>
                  <p className="mb-3 text-xs text-muted">
                    Anything specific to your context — a denominational
                    commitment, a promise to your congregation, a line you have
                    already drawn.
                  </p>
                  <div className="space-y-3">
                    {answers.customPrinciples.map((cp, i) => (
                      <div key={i} className="rounded-lg border border-line bg-surface p-3">
                        <input
                          className="w-full rounded-lg border border-line px-3 py-2 text-sm font-medium outline-none focus:border-brand"
                          placeholder="Short title, e.g. Sabbath"
                          value={cp.title}
                          onChange={(e) => {
                            const next = [...answers.customPrinciples];
                            next[i] = { ...next[i], title: e.target.value };
                            set("customPrinciples", next);
                          }}
                        />
                        <textarea
                          className="mt-2 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand"
                          rows={2}
                          placeholder="What you commit to."
                          value={cp.statement}
                          onChange={(e) => {
                            const next = [...answers.customPrinciples];
                            next[i] = { ...next[i], statement: e.target.value };
                            set("customPrinciples", next);
                          }}
                        />
                        <button
                          type="button"
                          className="mt-2 text-xs font-medium text-muted hover:text-red-600 hover:underline"
                          onClick={() =>
                            set(
                              "customPrinciples",
                              answers.customPrinciples.filter((_, idx) => idx !== i),
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-3 rounded-lg border border-dashed border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-brand hover:text-brand"
                    onClick={() =>
                      set("customPrinciples", [
                        ...answers.customPrinciples,
                        { title: "", statement: "" },
                      ])
                    }
                  >
                    + Add a principle
                  </button>
                </div>
              </>
            ) : null}

            {step === 4 ? (
              <>
                <Toggle
                  label={`${orgLabel(answers)} is using AI today`}
                  hint="If you are not yet, the document says so plainly and leaves room to fill in later."
                  checked={answers.usesAiToday}
                  onChange={(v) => set("usesAiToday", v)}
                />
                {answers.usesAiToday ? (
                  <>
                    <div>
                      <p className="mb-2 text-sm font-semibold text-ink">
                        Where are you using it?
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {USE_CASES.map((u) => (
                          <CheckRow
                            key={u.id}
                            checked={answers.useCases.includes(u.id)}
                            onChange={() => toggleIn("useCases", u.id)}
                            label={u.label}
                            detail={u.detail}
                          />
                        ))}
                      </div>
                    </div>
                    <ListEditor
                      label="Anything else?"
                      hint="Written as it will appear in the list."
                      items={answers.customUseCases}
                      onChange={(v) => set("customUseCases", v)}
                      placeholder="Sermon archive search for our teaching team."
                      addLabel="Add a use"
                    />
                    <Toggle
                      label="We also run automations or AI agents"
                      hint="Background tasks that run without a person triggering each one."
                      checked={answers.usesAutomation}
                      onChange={(v) => set("usesAutomation", v)}
                    />
                    {answers.usesAutomation ? (
                      <>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {AUTOMATIONS.map((x) => (
                            <CheckRow
                              key={x.id}
                              checked={answers.automations.includes(x.id)}
                              onChange={() => toggleIn("automations", x.id)}
                              label={x.label}
                              detail={x.detail}
                            />
                          ))}
                        </div>
                        <ListEditor
                          label="Other automations"
                          items={answers.customAutomations}
                          onChange={(v) => set("customAutomations", v)}
                          placeholder="Weekly attendance rollup to our elders."
                          addLabel="Add an automation"
                        />
                      </>
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}

            {step === 5 ? (
              <>
                <div>
                  <p className="mb-1 text-sm font-semibold text-ink">
                    Where will AI not be used?
                  </p>
                  <p className="mb-2.5 text-xs text-muted">
                    This is the section congregations read most closely. Say more
                    than you think you need to.
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {PROHIBITED.map((p) => (
                      <CheckRow
                        key={p.id}
                        checked={answers.prohibited.includes(p.id)}
                        onChange={() => toggleIn("prohibited", p.id)}
                        label={p.label}
                      />
                    ))}
                  </div>
                </div>
                <ListEditor
                  label="Other limits"
                  items={answers.customProhibited}
                  onChange={(v) => set("customProhibited", v)}
                  placeholder="Generating worship lyrics for corporate use."
                  addLabel="Add a limit"
                />
                <Toggle
                  label="New AI tools must be approved before use"
                  checked={answers.approvalRequired}
                  onChange={(v) => set("approvalRequired", v)}
                />
                <TextField
                  label="Who approves new tools?"
                  hint="A role, not necessarily a name."
                  value={answers.approverRole}
                  onChange={(v) => set("approverRole", v)}
                  placeholder="our Executive Pastor"
                />
                <TextArea
                  label="Your disclosure line (optional)"
                  hint="The sentence you will attach to AI-assisted content."
                  value={answers.disclosureStatement}
                  onChange={(v) => set("disclosureStatement", v)}
                  placeholder="Portions of this content were drafted with AI assistance and reviewed by our staff."
                  rows={2}
                />
                <RadioCards<ReviewCadence>
                  legend="How often will you revisit this document?"
                  options={REVIEW_CADENCES.map((r) => ({ id: r.id, label: r.label }))}
                  value={answers.reviewCadence}
                  onChange={(v) => set("reviewCadence", v)}
                  columns={2}
                />
              </>
            ) : null}

            {step === 6 ? (
              <>
                <TextArea
                  label="A note about your adaptation (optional)"
                  hint="Appears in the attribution section. Some churches note what they changed and why."
                  value={answers.adaptedNote}
                  onChange={(v) => set("adaptedNote", v)}
                  placeholder="We narrowed the privacy principle to match our counseling ministry's existing confidentiality policy."
                  rows={3}
                />

                <div className="rounded-xl border border-line bg-canvas p-4">
                  <p className="text-sm font-semibold text-ink">
                    Attribution stays in
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    The source document is licensed CC BY-SA 4.0. You are free to
                    use this commercially and change anything you like — the two
                    conditions are that you credit the original and release your
                    version under the same license. The attribution section is
                    included automatically for that reason.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-surface p-4">
                  <p className="mb-3 text-sm font-semibold text-ink">
                    Take it with you
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={downloadMarkdown}
                      className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                      Download .md
                    </button>
                    <button
                      type="button"
                      onClick={downloadPdf}
                      disabled={busy}
                      className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                      {busy ? "Building PDF…" : "Download .pdf"}
                    </button>
                    <button
                      type="button"
                      onClick={copyMarkdown}
                      className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
                    >
                      {copied ? "Copied" : "Copy Markdown"}
                    </button>
                    <button
                      type="button"
                      onClick={startOver}
                      className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition hover:text-red-600"
                    >
                      Start over
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-muted">
                    Both files are generated in your browser. Your answers are
                    saved on this device only and are never sent anywhere.
                  </p>
                </div>

                <details className="rounded-xl border border-line bg-surface p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-ink">
                    View the raw Markdown
                  </summary>
                  <pre className="mt-3 max-h-96 overflow-auto rounded-lg bg-canvas p-3 text-xs leading-relaxed text-ink-soft">
                    {markdown}
                  </pre>
                </details>
              </>
            ) : null}
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-line pt-4">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition hover:border-muted disabled:opacity-40"
            >
              Back
            </button>
            <p className="hidden text-xs text-muted sm:block">
              Saved automatically on this device
            </p>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              disabled={step === STEPS.length - 1 || !canAdvance}
              className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
            >
              {step === STEPS.length - 2 ? "Review" : "Next"}
            </button>
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:self-start">
        <div className="flex h-full flex-col rounded-2xl border border-line bg-surface shadow-sm">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Live preview
            </p>
            <button
              type="button"
              className="text-xs font-medium text-brand lg:hidden"
              onClick={() => setShowPreview((v) => !v)}
            >
              {showPreview ? "Hide" : "Show"}
            </button>
          </div>
          <div
            className={`${
              showPreview ? "block" : "hidden"
            } flex-1 overflow-auto px-5 py-5 text-[0.92rem] lg:block`}
          >
            <Preview blocks={blocks} />
          </div>
        </div>
      </aside>
    </div>
  );
}

function StepNav({
  step,
  onSelect,
}: {
  step: number;
  onSelect: (i: number) => void;
}) {
  return (
    <nav className="flex flex-wrap gap-1.5" aria-label="Steps">
      {STEPS.map((s, i) => {
        const active = i === step;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(i)}
            aria-current={active ? "step" : undefined}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              active
                ? "bg-brand text-white"
                : i < step
                  ? "bg-brand-soft text-brand"
                  : "border border-line bg-surface text-muted hover:text-ink"
            }`}
          >
            {i + 1}. {s.title}
          </button>
        );
      })}
    </nav>
  );
}
