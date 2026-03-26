/**
 * Simple markdown to HTML converter.
 * Handles headings, bold, italic, links, lists, tables, code blocks, and paragraphs.
 * Light theme version.
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Code blocks (```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto my-4 text-gray-100"><code>${escapeHtml(code.trim())}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 text-sm border border-gray-200">$1</code>');

  // Tables
  html = html.replace(/(?:^|\n)(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)+)/g, (_match, header, _separator, body) => {
    const headerCells = header.split('|').filter((c: string) => c.trim());
    const headerRow = headerCells.map((c: string) => `<th class="px-4 py-3 text-left text-gray-900 font-semibold border-b border-gray-200 bg-gray-50">${c.trim()}</th>`).join('');

    const bodyRows = body.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim());
      return `<tr class="hover:bg-gray-50">${cells.map((c: string) => `<td class="px-4 py-3 text-gray-700 border-b border-gray-100">${c.trim()}</td>`).join('')}</tr>`;
    }).join('');

    return `<div class="overflow-x-auto my-4 rounded-lg border border-gray-200"><table class="w-full border-collapse"><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table></div>`;
  });

  // Process line by line for block elements
  const lines = html.split('\n');
  const processed: string[] = [];
  let inList = false;
  let listType = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Headings
    if (line.startsWith('#### ')) {
      if (inList) { processed.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
      processed.push(`<h4 class="text-md font-semibold text-gray-900 mt-6 mb-2">${processInline(line.slice(5))}</h4>`);
      continue;
    }
    if (line.startsWith('### ')) {
      if (inList) { processed.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
      processed.push(`<h3 class="text-lg font-semibold text-gray-900 mt-8 mb-3">${processInline(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith('## ')) {
      if (inList) { processed.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
      processed.push(`<h2 class="text-xl font-bold text-gray-900 mt-10 mb-4 pb-2 border-b border-gray-200">${processInline(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith('# ')) {
      if (inList) { processed.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
      processed.push(`<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${processInline(line.slice(2))}</h1>`);
      continue;
    }

    // Unordered list items
    if (line.match(/^[-*] /)) {
      if (!inList || listType !== 'ul') {
        if (inList) processed.push(listType === 'ul' ? '</ul>' : '</ol>');
        processed.push('<ul class="list-disc list-inside space-y-2 my-3 text-gray-700">');
        inList = true;
        listType = 'ul';
      }
      processed.push(`<li>${processInline(line.replace(/^[-*] /, ''))}</li>`);
      continue;
    }

    // Ordered list items
    if (line.match(/^\d+\. /)) {
      if (!inList || listType !== 'ol') {
        if (inList) processed.push(listType === 'ul' ? '</ul>' : '</ol>');
        processed.push('<ol class="list-decimal list-inside space-y-2 my-3 text-gray-700">');
        inList = true;
        listType = 'ol';
      }
      processed.push(`<li>${processInline(line.replace(/^\d+\. /, ''))}</li>`);
      continue;
    }

    // Close list if we're in one and hit a non-list line
    if (inList && line.trim() === '') {
      processed.push(listType === 'ul' ? '</ul>' : '</ol>');
      inList = false;
      continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      processed.push('<hr class="border-gray-200 my-6" />');
      continue;
    }

    // Skip already processed (tables, code blocks markers)
    if (line.startsWith('<')) {
      processed.push(line);
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      processed.push('');
      continue;
    }

    // Paragraph
    if (inList) { processed.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; }
    processed.push(`<p class="text-gray-600 my-2 leading-relaxed">${processInline(line)}</p>`);
  }

  if (inList) {
    processed.push(listType === 'ul' ? '</ul>' : '</ol>');
  }

  return processed.join('\n');
}

function processInline(text: string): string {
  // Bold + Italic
  let result = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="text-gray-900"><em>$1</em></strong>');
  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong class="text-gray-900">$1</strong>');
  // Italic
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-emerald-700 hover:text-emerald-800 underline">$1</a>');
  // Em dash
  result = result.replace(/ — /g, ' &mdash; ');
  return result;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
