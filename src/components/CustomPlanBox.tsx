// ============================================================
// MyPlanBox — lets the user write their own travel plan,
// save it (localStorage), edit it later, or delete it.
// Replaces the previous km/days generator per user request.
// ============================================================
import { useEffect, useState } from "react";
import { NotebookPen, Pencil, Trash2, Check, X, Plus } from "lucide-react";

type Plan = { id: string; title: string; body: string; at: number };

const STORAGE_KEY = "user-plans";

const load = (): Plan[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Plan[]) : [];
  } catch {
    return [];
  }
};

const save = (plans: Plan[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch {
    /* ignore */
  }
};

const CustomPlanBox = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    setPlans(load());
  }, []);

  const persist = (next: Plan[]) => {
    setPlans(next);
    save(next);
  };

  const addPlan = () => {
    const t = title.trim();
    const b = body.trim();
    if (!t && !b) return;
    persist([
      { id: crypto.randomUUID(), title: t || "Untitled plan", body: b, at: Date.now() },
      ...plans,
    ]);
    setTitle("");
    setBody("");
  };

  const startEdit = (p: Plan) => {
    setEditingId(p.id);
    setEditTitle(p.title);
    setEditBody(p.body);
  };

  const saveEdit = () => {
    if (!editingId) return;
    persist(
      plans.map((p) =>
        p.id === editingId
          ? { ...p, title: editTitle.trim() || "Untitled plan", body: editBody.trim(), at: Date.now() }
          : p
      )
    );
    setEditingId(null);
  };

  const cancelEdit = () => setEditingId(null);

  const removePlan = (id: string) => {
    persist(plans.filter((p) => p.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <div className="mt-6 rounded-2xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
        <NotebookPen className="h-4 w-4" /> Write your own plan
      </div>

      <div className="mt-4 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Plan title (e.g. Northern loop — 10 days)"
          className="w-full rounded-lg border border-cream/15 bg-transparent px-3 py-2 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          placeholder="Write your itinerary, stops, notes, budget — anything you want to remember…"
          className="w-full rounded-lg border border-cream/15 bg-transparent px-3 py-2 text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold"
        />
        <button
          type="button"
          onClick={addPlan}
          disabled={!title.trim() && !body.trim()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold/10 disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" /> Save plan
        </button>
      </div>

      {plans.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-cream/50">Your saved plans</p>
          {plans.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-cream/10 bg-cream/[0.03] p-4"
            >
              {editingId === p.id ? (
                <div className="space-y-2">
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full rounded-lg border border-cream/15 bg-transparent px-3 py-2 text-cream focus:outline-none focus:border-gold"
                  />
                  <textarea
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-cream/15 bg-transparent px-3 py-2 text-cream focus:outline-none focus:border-gold"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="inline-flex items-center gap-1 rounded-full border border-cream/20 px-3 py-1 text-[11px] uppercase tracking-wider text-cream/70 hover:text-cream"
                    >
                      <X className="h-3 w-3" /> Cancel
                    </button>
                    <button
                      type="button"
                      onClick={saveEdit}
                      className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-deep"
                    >
                      <Check className="h-3 w-3" /> Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-display text-lg text-cream">{p.title}</h4>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-cream/40">
                        {new Date(p.at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() => startEdit(p)}
                        aria-label="Edit plan"
                        className="rounded-full p-1.5 text-cream/60 hover:bg-cream/10 hover:text-gold"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removePlan(p.id)}
                        aria-label="Delete plan"
                        className="rounded-full p-1.5 text-cream/60 hover:bg-cream/10 hover:text-terracotta"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  {p.body && (
                    <p className="mt-2 whitespace-pre-wrap text-sm text-cream/80">{p.body}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomPlanBox;
