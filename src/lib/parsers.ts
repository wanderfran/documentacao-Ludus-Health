/**
 * Server-safe parser functions for markdown content
 */

export interface TimelineStep {
  number: string;
  title: string;
  responsible?: string;
  deadline?: string;
  description?: string;
  items: string[];
}

export function parseTimelineFromMarkdown(content: string): TimelineStep[] {
  const steps: TimelineStep[] = [];
  const lines = content.split('\n');
  let currentStep: TimelineStep | null = null;
  let collectingDescription = false;
  let descLines: string[] = [];

  for (const line of lines) {
    // Match "## Etapa 1 — Título" or "### 1. Título"
    const stepMatch = line.match(/^#{2,3}\s+(?:Etapa\s+)?(\d+)\s*[.—–-]\s*(.+)/);
    if (stepMatch) {
      if (currentStep) {
        if (descLines.length > 0) {
          currentStep.description = descLines.join(' ').trim();
        }
        steps.push(currentStep);
      }
      currentStep = {
        number: stepMatch[1],
        title: stepMatch[2].trim(),
        items: [],
      };
      collectingDescription = false;
      descLines = [];
      continue;
    }

    if (!currentStep) continue;

    // Match "**Responsável:** Name"
    const responsibleMatch = line.match(/^\*\*Respons[aá]vel:\*\*\s*(.+)/);
    if (responsibleMatch) {
      currentStep.responsible = responsibleMatch[1].trim();
      continue;
    }

    // Match "**Tempo estimado:** X" or "**Prazo:** X"
    const deadlineMatch = line.match(/^\*\*(?:Tempo estimado|Prazo):\*\*\s*(.+)/);
    if (deadlineMatch) {
      currentStep.deadline = deadlineMatch[1].trim();
      continue;
    }

    // Match checklist items "- [ ] Item" or "- Item"
    const itemMatch = line.match(/^- \[[ x]\]\s*(.+)|^- (.+)/);
    if (itemMatch && currentStep) {
      currentStep.items.push(itemMatch[1] || itemMatch[2]);
      collectingDescription = false;
      continue;
    }

    // Match "### Checklist" or "### Sub-section" - skip header
    if (line.match(/^###\s+/)) {
      collectingDescription = false;
      continue;
    }

    // Skip separators and empty lines for description
    if (line.trim() === '---' || line.trim() === '') {
      if (collectingDescription && descLines.length > 0) {
        collectingDescription = false;
      }
      continue;
    }

    // Collect description text (non-empty, non-metadata lines after step header)
    if (currentStep && !line.startsWith('**') && !line.startsWith('#') && !line.startsWith('-') && line.trim().length > 0) {
      descLines.push(line.trim());
      collectingDescription = true;
    }
  }

  if (currentStep) {
    if (descLines.length > 0) {
      currentStep.description = descLines.join(' ').trim();
    }
    steps.push(currentStep);
  }
  return steps;
}

export function parseProcessesFromMarkdown(content: string): { frequency: string; items: string[] }[] {
  const processes: { frequency: string; items: string[] }[] = [];
  const lines = content.split('\n');
  let currentFreq: string | null = null;
  let currentItems: string[] = [];

  for (const line of lines) {
    const freqMatch = line.match(/^### (Diário|Semanal|Mensal|Trimestral)/);
    if (freqMatch) {
      if (currentFreq && currentItems.length > 0) {
        processes.push({ frequency: currentFreq, items: [...currentItems] });
      }
      currentFreq = freqMatch[1];
      currentItems = [];
      continue;
    }

    if (currentFreq && line.startsWith('- ')) {
      currentItems.push(line.slice(2));
    }
  }

  if (currentFreq && currentItems.length > 0) {
    processes.push({ frequency: currentFreq, items: currentItems });
  }

  return processes;
}
