"use client";

import { useId } from "react";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {hint ? <span className="mb-2 block text-xs text-muted">{hint}</span> : null}
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/15";

export function TextField({
  label,
  hint,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      <input
        type={type}
        className={inputClass}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function TextArea({
  label,
  hint,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        className={inputClass}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}

export function RadioCards<T extends string>({
  legend,
  hint,
  options,
  value,
  onChange,
  columns = 1,
}: {
  legend: string;
  hint?: string;
  options: { id: T; label: string; blurb?: string }[];
  value: T;
  onChange: (v: T) => void;
  columns?: 1 | 2 | 3;
}) {
  const name = useId();
  const cols =
    columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-semibold text-ink">{legend}</legend>
      {hint ? <p className="mb-2.5 text-xs text-muted">{hint}</p> : null}
      <div className={`grid gap-2 ${cols}`}>
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <label
              key={opt.id}
              className={`flex cursor-pointer gap-2.5 rounded-lg border p-3 transition ${
                active
                  ? "border-brand bg-brand-soft"
                  : "border-line bg-surface hover:border-muted/50"
              }`}
            >
              <input
                type="radio"
                name={name}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--color-brand)]"
                checked={active}
                onChange={() => onChange(opt.id)}
              />
              <span>
                <span className="block text-sm font-medium text-ink">
                  {opt.label}
                </span>
                {opt.blurb ? (
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                    {opt.blurb}
                  </span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function CheckRow({
  checked,
  onChange,
  label,
  detail,
  children,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  detail?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border p-3 transition ${
        checked ? "border-brand/60 bg-brand-soft/60" : "border-line bg-surface"
      }`}
    >
      <label className="flex cursor-pointer gap-2.5">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--color-brand)]"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="min-w-0">
          <span className="block text-sm font-medium text-ink">{label}</span>
          {detail ? (
            <span className="mt-0.5 block text-xs leading-relaxed text-muted">
              {detail}
            </span>
          ) : null}
        </span>
      </label>
      {children}
    </div>
  );
}

export function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-line bg-surface p-3">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 shrink-0 accent-[color:var(--color-brand)]"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        {hint ? (
          <span className="mt-0.5 block text-xs leading-relaxed text-muted">
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  );
}

/** Free-text list: one input per row, with add/remove. */
export function ListEditor({
  label,
  hint,
  items,
  onChange,
  placeholder,
  addLabel = "Add another",
}: {
  label: string;
  hint?: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {hint ? <p className="mb-2 text-xs text-muted">{hint}</p> : null}
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              className={inputClass}
              value={item}
              placeholder={placeholder}
              onChange={(e) => {
                const next = [...items];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              aria-label="Remove"
              className="shrink-0 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition hover:border-red-300 hover:text-red-600"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-2 rounded-lg border border-dashed border-line px-3 py-1.5 text-xs font-medium text-muted transition hover:border-brand hover:text-brand"
        onClick={() => onChange([...items, ""])}
      >
        + {addLabel}
      </button>
    </div>
  );
}
