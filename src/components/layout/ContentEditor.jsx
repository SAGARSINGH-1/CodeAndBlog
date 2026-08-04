import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';

/**
 * Free content editor — no API key, no paid CDN.
 * Uses a textarea with optional HTML/markdown helpers.
 */
export default function ContentEditor({
  name = 'content',
  control,
  label = 'Content',
  defaultValue = '',
  rows = 14,
  placeholder = 'Write your post content here…',
}) {
  const textareaRef = useRef(null);

  const wrapSelection = (before, after, value, onChange) => {
    const el = textareaRef.current;
    if (!el) {
      onChange(`${value || ''}${before}${after}`);
      return;
    }
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const text = value || '';
    const selected = text.slice(start, end) || 'text';
    const next = text.slice(0, start) + before + selected + after + text.slice(end);
    onChange(next);
    // restore cursor after React updates
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + before.length + selected.length + after.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const insertLine = (prefix, value, onChange) => {
    const el = textareaRef.current;
    const text = value || '';
    if (!el) {
      onChange(text + (text && !text.endsWith('\n') ? '\n' : '') + prefix);
      return;
    }
    const start = el.selectionStart ?? text.length;
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const next = text.slice(0, lineStart) + prefix + text.slice(lineStart);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + prefix.length;
      el.setSelectionRange(pos, pos);
    });
  };

  return (
    <div className="w-full mb-4">
      {label && (
        <label className="inline-block mb-1 pl-1 font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          validate: (v) => {
            const plain = String(v || '')
              .replace(/<[^>]*>/g, '')
              .trim();
            return plain.length > 0 || 'Please write some content';
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 mb-1 p-2 rounded-t-lg border border-b-0 border-gray-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-800">
              <ToolBtn
                title="Bold"
                onClick={() => wrapSelection('<strong>', '</strong>', value, onChange)}
              >
                <b>B</b>
              </ToolBtn>
              <ToolBtn
                title="Italic"
                onClick={() => wrapSelection('<em>', '</em>', value, onChange)}
              >
                <i>I</i>
              </ToolBtn>
              <ToolBtn
                title="Heading"
                onClick={() => insertLine('<h2>', value, onChange)}
              >
                H2
              </ToolBtn>
              <ToolBtn
                title="Paragraph"
                onClick={() => wrapSelection('<p>', '</p>', value, onChange)}
              >
                P
              </ToolBtn>
              <ToolBtn
                title="Link"
                onClick={() =>
                  wrapSelection('<a href="https://">', '</a>', value, onChange)
                }
              >
                Link
              </ToolBtn>
              <ToolBtn
                title="Code"
                onClick={() => wrapSelection('<code>', '</code>', value, onChange)}
              >
                {'</>'}
              </ToolBtn>
              <ToolBtn
                title="Bullet list item"
                onClick={() => insertLine('<li>', value, onChange)}
              >
                • List
              </ToolBtn>
              <span className="ml-auto text-xs text-gray-400 self-center hidden sm:inline">
                HTML supported · free editor
              </span>
            </div>

            <textarea
              ref={textareaRef}
              value={value ?? ''}
              onChange={(e) => onChange(e.target.value)}
              rows={rows}
              placeholder={placeholder}
              className="w-full px-3 py-3 rounded-b-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black dark:text-white outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 font-mono text-sm leading-relaxed resize-y min-h-[220px]"
            />

            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}

            <p className="text-xs text-gray-400 mt-1">
              Tip: use the toolbar for basic formatting, or paste HTML. Plain text works fine too.
            </p>
          </div>
        )}
      />
    </div>
  );
}

function ToolBtn({ children, onClick, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="px-2.5 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700 hover:border-orange-400 transition"
    >
      {children}
    </button>
  );
}