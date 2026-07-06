// ============================================================
// ADDED FEATURE: StoryNotesDialog
// Opens when a guide card is clicked. Lets the user add notes
// and lists them. Notes persist per-story in localStorage.
// ============================================================
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NotebookPen, Trash2 } from "lucide-react";

type Note = { id: string; text: string; at: number };

interface Props {
  storyKey: string | null;
  storyTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const storageKey = (k: string) => `story-notes:${k}`;

const StoryNotesDialog = ({ storyKey, storyTitle, open, onOpenChange }: Props) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (!storyKey) return;
    try {
      const raw = localStorage.getItem(storageKey(storyKey));
      setNotes(raw ? JSON.parse(raw) : []);
    } catch {
      setNotes([]);
    }
    setDraft("");
  }, [storyKey, open]);

  const persist = (next: Note[]) => {
    setNotes(next);
    if (storyKey) {
      try {
        localStorage.setItem(storageKey(storyKey), JSON.stringify(next));
      } catch {
        /* ignore */
      }
    }
  };

  const addNote = () => {
    const text = draft.trim();
    if (!text) return;
    persist([{ id: crypto.randomUUID(), text, at: Date.now() }, ...notes]);
    setDraft("");
  };

  const removeNote = (id: string) => {
    persist(notes.filter((n) => n.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-cream">
        <DialogHeader>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta">
            <NotebookPen className="h-4 w-4" /> Story notes
          </div>
          <DialogTitle className="font-display mt-2 text-2xl text-emerald-deep">
            {storyTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Jot a thought, quote, or place you want to remember…"
            rows={3}
            className="w-full rounded-xl border border-emerald-deep/15 bg-background p-3 text-sm text-emerald-deep focus:border-terracotta focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={addNote}
              disabled={!draft.trim()}
              className="rounded-full bg-emerald-deep px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-opacity disabled:opacity-40"
            >
              Add note
            </button>
          </div>
        </div>

        <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes yet — add your first above.</p>
          ) : (
            notes.map((n) => (
              <div
                key={n.id}
                className="group flex items-start justify-between gap-3 rounded-xl border border-emerald-deep/10 bg-background p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm text-emerald-deep whitespace-pre-wrap break-words">{n.text}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {new Date(n.at).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeNote(n.id)}
                  aria-label="Delete note"
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4 text-terracotta" />
                </button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryNotesDialog;
