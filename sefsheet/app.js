// ─── Constants ───────────────────────────────────────────────────────────────
const NUM_COLS = 26;
const NUM_ROWS = 100;
const STORAGE_KEY = 'sefsheet-data';

// ─── State ───────────────────────────────────────────────────────────────────
// cellData[id] = { raw: string, value: any, formula: bool, formatting: {} }
let cellData = {};
// Track dependencies: which cells does a cell depend on?
let cellDeps = {};    // cellDeps["A1"] = Set(["B1","C1"]) means A1's formula references B1,C1
// Reverse: which cells depend on this cell?
let cellRDeps = {};   // cellRDeps["B1"] = Set(["A1"]) means if B1 changes, recalc A1

let currentSelection = null;  // { type: 'cell'|'row'|'col'|'all', cells: Set, anchor: string }
let editingCellId = null;

// Column widths and row heights (indexed by col/row number)
let colWidths = {};   // colWidths[0] = 80  (col A)
let rowHeights = {};  // rowHeights[0] = 24 (row 1)
const DEFAULT_COL_WIDTH = 80;
const DEFAULT_ROW_HEIGHT = 24;
const MIN_COL_WIDTH = 30;
const MIN_ROW_HEIGHT = 14;

// Resize state
let resizing = null; // { type: 'col'|'row', index, startX/startY, startSize }

// ─── DOM References ──────────────────────────────────────────────────────────
const gridHead = document.getElementById('grid-head');
const gridBody = document.getElementById('grid-body');
const formulaInput = document.getElementById('formula-input');
const cellRefDisplay = document.getElementById('cell-reference');
const fontFamilySelect = document.getElementById('font-family');
const fontSizeSelect = document.getElementById('font-size');
const btnBold = document.getElementById('btn-bold');
const btnItalic = document.getElementById('btn-italic');
const btnUnderline = document.getElementById('btn-underline');
const textColorInput = document.getElementById('text-color');
const bgColorInput = document.getElementById('bg-color');
const textColorIndicator = document.getElementById('text-color-indicator');
const bgColorIndicator = document.getElementById('bg-color-indicator');

// ─── Helpers ─────────────────────────────────────────────────────────────────
function colToLetter(c) {
  return String.fromCharCode(65 + c);
}

function letterToCol(ch) {
  return ch.toUpperCase().charCodeAt(0) - 65;
}

function cellId(row, col) {
  return colToLetter(col) + (row + 1);
}

function parseCellId(id) {
  const match = id.match(/^([A-Z])(\d+)$/);
  if (!match) return null;
  return { col: letterToCol(match[1]), row: parseInt(match[2], 10) - 1 };
}

function getCellEl(id) {
  return document.querySelector(`td[data-id="${id}"]`);
}

function ensureCellData(id) {
  if (!cellData[id]) {
    cellData[id] = { raw: '', value: '', formula: false, formatting: {} };
  }
  return cellData[id];
}

// ─── Grid Rendering ──────────────────────────────────────────────────────────
function buildGrid() {
  // Header row
  const headerRow = document.createElement('tr');
  const cornerTh = document.createElement('th');
  cornerTh.addEventListener('click', selectAll);
  headerRow.appendChild(cornerTh);

  for (let c = 0; c < NUM_COLS; c++) {
    const th = document.createElement('th');
    th.textContent = colToLetter(c);
    th.dataset.col = c;
    th.addEventListener('click', (e) => {
      if (!resizing) selectColumn(c);
    });

    // Column resize handle
    const colHandle = document.createElement('div');
    colHandle.classList.add('col-resize-handle');
    colHandle.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      startColResize(c, e);
    });
    th.appendChild(colHandle);

    headerRow.appendChild(th);
  }
  gridHead.appendChild(headerRow);

  // Data rows
  for (let r = 0; r < NUM_ROWS; r++) {
    const tr = document.createElement('tr');
    const rowHeader = document.createElement('td');
    rowHeader.textContent = r + 1;
    rowHeader.dataset.row = r;
    rowHeader.style.position = 'relative';
    rowHeader.addEventListener('click', (e) => {
      if (!resizing) selectRow(r);
    });

    // Row resize handle
    const rowHandle = document.createElement('div');
    rowHandle.classList.add('row-resize-handle');
    rowHandle.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      startRowResize(r, e);
    });
    rowHeader.appendChild(rowHandle);

    tr.appendChild(rowHeader);

    for (let c = 0; c < NUM_COLS; c++) {
      const td = document.createElement('td');
      td.classList.add('cell');
      const id = cellId(r, c);
      td.dataset.id = id;
      td.dataset.row = r;
      td.dataset.col = c;

      td.addEventListener('mousedown', (e) => {
        if (editingCellId && editingCellId !== id) {
          finishEditing(true);
        }
        selectCell(id);
      });
      td.addEventListener('dblclick', () => startEditing(id));

      tr.appendChild(td);
    }
    gridBody.appendChild(tr);
  }
}

// ─── Cell Display ────────────────────────────────────────────────────────────
function renderCell(id) {
  const el = getCellEl(id);
  if (!el) return;
  const data = cellData[id];

  if (!data || (!data.raw && Object.keys(data.formatting || {}).length === 0)) {
    el.textContent = '';
    el.style.cssText = '';
    return;
  }

  // Display value (not raw formula)
  if (data.value !== undefined && data.value !== null && data.value !== '') {
    if (data.error) {
      el.innerHTML = `<span class="cell-error">${data.error}</span>`;
    } else {
      el.textContent = data.value;
    }
  } else {
    el.textContent = data.raw || '';
  }

  // Apply formatting
  const fmt = data.formatting || {};
  el.style.fontFamily = fmt.fontFamily || '';
  el.style.fontSize = fmt.fontSize ? fmt.fontSize + 'px' : '';
  el.style.fontWeight = fmt.bold ? 'bold' : '';
  el.style.fontStyle = fmt.italic ? 'italic' : '';
  el.style.textDecoration = fmt.underline ? 'underline' : '';
  el.style.color = fmt.color || '';
  el.style.backgroundColor = fmt.bgColor || '';
}

function renderAllCells() {
  for (const id in cellData) {
    renderCell(id);
  }
}

// ─── Selection ───────────────────────────────────────────────────────────────
function clearSelection() {
  document.querySelectorAll('.selected, .in-selection, .col-selected, .row-header-selected').forEach(el => {
    el.classList.remove('selected', 'in-selection', 'col-selected', 'row-header-selected');
  });
}

function highlightSelection() {
  clearSelection();
  if (!currentSelection) return;

  currentSelection.cells.forEach(id => {
    const el = getCellEl(id);
    if (el) el.classList.add('in-selection');
  });

  // Highlight the anchor cell specially
  if (currentSelection.anchor) {
    const anchorEl = getCellEl(currentSelection.anchor);
    if (anchorEl) {
      anchorEl.classList.add('selected');
      anchorEl.classList.remove('in-selection');
    }
  }

  // Highlight column/row headers
  if (currentSelection.type === 'col') {
    const th = gridHead.querySelector(`th[data-col="${currentSelection.colIndex}"]`);
    if (th) th.classList.add('col-selected');
  }
  if (currentSelection.type === 'row') {
    const td = gridBody.querySelector(`td[data-row="${currentSelection.rowIndex}"]:not(.cell)`);
    if (td) td.classList.add('row-header-selected');
  }
  if (currentSelection.type === 'all') {
    gridHead.querySelectorAll('th').forEach(th => th.classList.add('col-selected'));
    gridBody.querySelectorAll('td:not(.cell)').forEach(td => td.classList.add('row-header-selected'));
  }
}

function selectCell(id) {
  const cells = new Set([id]);
  currentSelection = { type: 'cell', cells, anchor: id };
  highlightSelection();
  updateFormulaBar(id);
  updateToolbarState(id);
}

function selectRow(row) {
  const cells = new Set();
  for (let c = 0; c < NUM_COLS; c++) {
    cells.add(cellId(row, c));
  }
  const anchor = cellId(row, 0);
  currentSelection = { type: 'row', cells, anchor, rowIndex: row };
  highlightSelection();
  updateFormulaBar(anchor);
  updateToolbarState(anchor);
}

function selectColumn(col) {
  const cells = new Set();
  for (let r = 0; r < NUM_ROWS; r++) {
    cells.add(cellId(r, col));
  }
  const anchor = cellId(0, col);
  currentSelection = { type: 'col', cells, anchor, colIndex: col };
  highlightSelection();
  updateFormulaBar(anchor);
  updateToolbarState(anchor);
}

function selectAll() {
  const cells = new Set();
  for (let r = 0; r < NUM_ROWS; r++) {
    for (let c = 0; c < NUM_COLS; c++) {
      cells.add(cellId(r, c));
    }
  }
  currentSelection = { type: 'all', cells, anchor: cellId(0, 0) };
  highlightSelection();
  updateFormulaBar('A1');
  updateToolbarState('A1');
}

function updateFormulaBar(id) {
  cellRefDisplay.textContent = id;
  const data = cellData[id];
  formulaInput.value = data ? data.raw : '';
}

function updateToolbarState(id) {
  const data = cellData[id];
  const fmt = (data && data.formatting) || {};

  fontFamilySelect.value = fmt.fontFamily || 'Arial';
  fontSizeSelect.value = fmt.fontSize || '10';
  btnBold.classList.toggle('active', !!fmt.bold);
  btnItalic.classList.toggle('active', !!fmt.italic);
  btnUnderline.classList.toggle('active', !!fmt.underline);
  textColorInput.value = fmt.color || '#000000';
  textColorIndicator.style.borderBottomColor = fmt.color || '#000000';
  bgColorInput.value = fmt.bgColor || '#ffffff';
  bgColorIndicator.style.borderBottomColor = fmt.bgColor || '#ffffff';
}

// ─── Navigation ──────────────────────────────────────────────────────────────
function moveSelection(dRow, dCol) {
  if (!currentSelection || !currentSelection.anchor) return;
  const pos = parseCellId(currentSelection.anchor);
  if (!pos) return;

  const newRow = Math.max(0, Math.min(NUM_ROWS - 1, pos.row + dRow));
  const newCol = Math.max(0, Math.min(NUM_COLS - 1, pos.col + dCol));
  const newId = cellId(newRow, newCol);

  selectCell(newId);

  // Scroll into view
  const el = getCellEl(newId);
  if (el) el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

// ─── Editing ─────────────────────────────────────────────────────────────────
function startEditing(id) {
  if (editingCellId) finishEditing(true);

  editingCellId = id;
  const el = getCellEl(id);
  if (!el) return;

  const data = ensureCellData(id);
  el.classList.add('editing');

  const input = document.createElement('input');
  input.type = 'text';
  input.value = data.raw;

  // Inherit formatting
  const fmt = data.formatting || {};
  if (fmt.fontFamily) input.style.fontFamily = fmt.fontFamily;
  if (fmt.fontSize) input.style.fontSize = fmt.fontSize + 'px';
  if (fmt.bold) input.style.fontWeight = 'bold';
  if (fmt.italic) input.style.fontStyle = 'italic';
  if (fmt.color) input.style.color = fmt.color;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      finishEditing(true);
      moveSelection(1, 0);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      finishEditing(true);
      moveSelection(0, e.shiftKey ? -1 : 1);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      finishEditing(false);
    }
  });

  input.addEventListener('input', () => {
    formulaInput.value = input.value;
  });

  el.textContent = '';
  el.appendChild(input);
  input.focus();
  input.select();

  formulaInput.value = data.raw;
}

function finishEditing(save) {
  if (!editingCellId) return;

  const id = editingCellId;
  const el = getCellEl(id);
  editingCellId = null;

  if (!el) return;
  el.classList.remove('editing');

  const input = el.querySelector('input');
  if (save && input) {
    const raw = input.value;
    setCellValue(id, raw);
  }

  renderCell(id);
  formulaInput.value = cellData[id] ? cellData[id].raw : '';
}

function setCellValue(id, raw) {
  const data = ensureCellData(id);
  data.raw = raw;

  // Clear old dependencies
  if (cellDeps[id]) {
    cellDeps[id].forEach(depId => {
      if (cellRDeps[depId]) cellRDeps[depId].delete(id);
    });
  }
  cellDeps[id] = new Set();

  if (raw.startsWith('=')) {
    data.formula = true;
    evaluateCell(id);
  } else {
    data.formula = false;
    data.error = null;
    // Try to parse as number
    const num = Number(raw);
    data.value = raw === '' ? '' : (isNaN(num) ? raw : num);
  }

  // Propagate changes to dependents
  propagateChanges(id, new Set());

  renderCell(id);
  saveToStorage();
}

// ─── Formula Engine ──────────────────────────────────────────────────────────
function evaluateCell(id) {
  const data = cellData[id];
  if (!data || !data.formula) return;

  const expr = data.raw.substring(1).trim();
  try {
    const refs = new Set();
    const result = evalExpression(expr, refs, id);
    data.value = result;
    data.error = null;

    // Record dependencies
    cellDeps[id] = refs;
    refs.forEach(refId => {
      if (!cellRDeps[refId]) cellRDeps[refId] = new Set();
      cellRDeps[refId].add(id);
    });
  } catch (e) {
    data.value = '';
    data.error = e.message || '#ERROR!';
  }
}

function propagateChanges(changedId, visited) {
  if (visited.has(changedId)) return;
  visited.add(changedId);

  const dependents = cellRDeps[changedId];
  if (!dependents) return;

  dependents.forEach(depId => {
    evaluateCell(depId);
    renderCell(depId);
    propagateChanges(depId, visited);
  });
}

// Expression evaluator — supports: numbers, cell refs, ranges, arithmetic, functions
function evalExpression(expr, refs, contextId) {
  const tokens = tokenize(expr);
  const result = parseAddSub(tokens, refs, contextId);
  if (tokens.length > 0) throw new Error('#ERROR!');
  return typeof result === 'number' ? Math.round(result * 1e10) / 1e10 : result;
}

function tokenize(expr) {
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    if (expr[i] === ' ') { i++; continue; }

    // Number
    if (/\d/.test(expr[i]) || (expr[i] === '.' && i + 1 < expr.length && /\d/.test(expr[i + 1]))) {
      let num = '';
      while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === '.')) {
        num += expr[i++];
      }
      tokens.push({ type: 'number', value: parseFloat(num) });
      continue;
    }

    // Cell reference or function name or range
    if (/[A-Za-z]/.test(expr[i])) {
      let word = '';
      while (i < expr.length && /[A-Za-z0-9]/.test(expr[i])) {
        word += expr[i++];
      }
      // Check for range (e.g. A1:B10)
      if (i < expr.length && expr[i] === ':') {
        i++; // skip ':'
        let word2 = '';
        while (i < expr.length && /[A-Za-z0-9]/.test(expr[i])) {
          word2 += expr[i++];
        }
        tokens.push({ type: 'range', from: word.toUpperCase(), to: word2.toUpperCase() });
      } else if (/^[A-Za-z]\d+$/.test(word)) {
        tokens.push({ type: 'cellref', value: word.toUpperCase() });
      } else {
        tokens.push({ type: 'func', value: word.toUpperCase() });
      }
      continue;
    }

    // Operators and parens
    if ('+-*/(),:'.includes(expr[i])) {
      tokens.push({ type: 'op', value: expr[i] });
      i++;
      continue;
    }

    // String literal
    if (expr[i] === '"') {
      let str = '';
      i++; // skip opening quote
      while (i < expr.length && expr[i] !== '"') {
        str += expr[i++];
      }
      i++; // skip closing quote
      tokens.push({ type: 'string', value: str });
      continue;
    }

    throw new Error('#ERROR!');
  }
  return tokens;
}

function parseAddSub(tokens, refs, contextId) {
  let left = parseMulDiv(tokens, refs, contextId);
  while (tokens.length > 0 && (tokens[0].value === '+' || tokens[0].value === '-')) {
    const op = tokens.shift().value;
    const right = parseMulDiv(tokens, refs, contextId);
    if (op === '+') left = Number(left) + Number(right);
    else left = Number(left) - Number(right);
  }
  return left;
}

function parseMulDiv(tokens, refs, contextId) {
  let left = parseUnary(tokens, refs, contextId);
  while (tokens.length > 0 && (tokens[0].value === '*' || tokens[0].value === '/')) {
    const op = tokens.shift().value;
    const right = parseUnary(tokens, refs, contextId);
    if (op === '*') left = Number(left) * Number(right);
    else {
      if (Number(right) === 0) throw new Error('#DIV/0!');
      left = Number(left) / Number(right);
    }
  }
  return left;
}

function parseUnary(tokens, refs, contextId) {
  if (tokens.length > 0 && tokens[0].value === '-') {
    tokens.shift();
    return -parseAtom(tokens, refs, contextId);
  }
  if (tokens.length > 0 && tokens[0].value === '+') {
    tokens.shift();
  }
  return parseAtom(tokens, refs, contextId);
}

function parseAtom(tokens, refs, contextId) {
  if (tokens.length === 0) throw new Error('#ERROR!');

  const tok = tokens[0];

  // Number
  if (tok.type === 'number') {
    tokens.shift();
    return tok.value;
  }

  // String
  if (tok.type === 'string') {
    tokens.shift();
    return tok.value;
  }

  // Parenthesized expression
  if (tok.type === 'op' && tok.value === '(') {
    tokens.shift();
    const val = parseAddSub(tokens, refs, contextId);
    if (tokens.length === 0 || tokens[0].value !== ')') throw new Error('#ERROR!');
    tokens.shift();
    return val;
  }

  // Cell reference
  if (tok.type === 'cellref') {
    tokens.shift();
    const refId = tok.value;
    if (refId === contextId) throw new Error('#CIRCULAR!');
    refs.add(refId);
    return getCellNumericValue(refId);
  }

  // Range (standalone — shouldn't appear outside a function, but handle gracefully)
  if (tok.type === 'range') {
    throw new Error('#ERROR!');
  }

  // Function call
  if (tok.type === 'func') {
    const funcName = tok.value;
    tokens.shift();
    if (tokens.length === 0 || tokens[0].value !== '(') throw new Error('#ERROR!');
    tokens.shift(); // skip '('

    const args = parseFuncArgs(tokens, refs, contextId);

    if (tokens.length === 0 || tokens[0].value !== ')') throw new Error('#ERROR!');
    tokens.shift(); // skip ')'

    return callFunction(funcName, args);
  }

  throw new Error('#ERROR!');
}

function parseFuncArgs(tokens, refs, contextId) {
  const args = [];
  if (tokens.length > 0 && tokens[0].value === ')') return args;

  while (true) {
    // Check for range
    if (tokens.length >= 1 && tokens[0].type === 'range') {
      const rangeVals = expandRange(tokens[0].from, tokens[0].to, refs, contextId);
      args.push(...rangeVals);
      tokens.shift();
    } else if (tokens.length >= 3 && tokens[0].type === 'cellref' && tokens[1].value === ':' && tokens[2].type === 'cellref') {
      // Handle A1:B2 parsed as cellref, op(:), cellref
      const from = tokens[0].value;
      tokens.shift(); // cellref
      tokens.shift(); // ':'
      const to = tokens[0].value;
      tokens.shift(); // cellref
      const rangeVals = expandRange(from, to, refs, contextId);
      args.push(...rangeVals);
    } else {
      args.push(parseAddSub(tokens, refs, contextId));
    }

    if (tokens.length > 0 && tokens[0].value === ',') {
      tokens.shift();
    } else {
      break;
    }
  }
  return args;
}

function expandRange(fromId, toId, refs, contextId) {
  const from = parseCellId(fromId);
  const to = parseCellId(toId);
  if (!from || !to) throw new Error('#REF!');

  const minRow = Math.min(from.row, to.row);
  const maxRow = Math.max(from.row, to.row);
  const minCol = Math.min(from.col, to.col);
  const maxCol = Math.max(from.col, to.col);

  const values = [];
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      const id = cellId(r, c);
      if (id === contextId) throw new Error('#CIRCULAR!');
      refs.add(id);
      const val = getCellRawValue(id);
      if (val !== null) values.push(val);
    }
  }
  return values;
}

// Returns null for blank cells, allowing callers to distinguish blank from 0
function getCellRawValue(id) {
  const data = cellData[id];
  if (!data || data.raw === '') return null;
  if (data.error) throw new Error('#REF!');
  const v = data.value;
  if (v === '' || v === undefined || v === null) return null;
  const num = Number(v);
  return isNaN(num) ? v : num;
}

// For direct cell references in arithmetic: blank → 0
function getCellNumericValue(id) {
  const val = getCellRawValue(id);
  return val === null ? 0 : val;
}

function callFunction(name, args) {
  const nums = args.filter(a => typeof a === 'number');
  switch (name) {
    case 'SUM':
      return nums.reduce((a, b) => a + b, 0);
    case 'AVERAGE':
    case 'AVG':
      if (nums.length === 0) throw new Error('#DIV/0!');
      return nums.reduce((a, b) => a + b, 0) / nums.length;
    case 'MIN':
      if (nums.length === 0) return 0;
      return Math.min(...nums);
    case 'MAX':
      if (nums.length === 0) return 0;
      return Math.max(...nums);
    case 'COUNT':
      return nums.length;
    case 'IF':
      if (args.length < 2) throw new Error('#ERROR!');
      return args[0] ? args[1] : (args[2] !== undefined ? args[2] : '');
    case 'ABS':
      return Math.abs(Number(args[0]) || 0);
    case 'ROUND':
      return Math.round(Number(args[0]) || 0);
    default:
      throw new Error('#NAME?');
  }
}

// ─── Formatting ──────────────────────────────────────────────────────────────
function applyFormatting(prop, value) {
  if (!currentSelection) return;

  currentSelection.cells.forEach(id => {
    const data = ensureCellData(id);
    if (!data.formatting) data.formatting = {};
    data.formatting[prop] = value;
    renderCell(id);
  });

  saveToStorage();
}

function toggleFormatting(prop) {
  if (!currentSelection || !currentSelection.anchor) return;

  const anchorData = ensureCellData(currentSelection.anchor);
  const fmt = anchorData.formatting || {};
  const newVal = !fmt[prop];

  applyFormatting(prop, newVal);

  // Update toolbar button state
  if (prop === 'bold') btnBold.classList.toggle('active', newVal);
  if (prop === 'italic') btnItalic.classList.toggle('active', newVal);
  if (prop === 'underline') btnUnderline.classList.toggle('active', newVal);
}

// ─── Persistence ─────────────────────────────────────────────────────────────
function saveToStorage() {
  // Only save cells that have data
  const toSave = {};
  for (const id in cellData) {
    const d = cellData[id];
    if (d.raw || (d.formatting && Object.keys(d.formatting).length > 0)) {
      toSave[id] = { raw: d.raw, formatting: d.formatting };
    }
  }
  // Include col/row sizes
  const payload = { cells: toSave, colWidths, rowHeights };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const parsed = JSON.parse(saved);

    // Support both old format (flat cells) and new format (with sizes)
    const cells = parsed.cells || parsed;
    for (const id in cells) {
      const d = cells[id];
      if (d && typeof d === 'object' && 'raw' in d) {
        cellData[id] = {
          raw: d.raw || '',
          value: '',
          formula: (d.raw || '').startsWith('='),
          formatting: d.formatting || {}
        };
      }
    }

    if (parsed.colWidths) colWidths = parsed.colWidths;
    if (parsed.rowHeights) rowHeights = parsed.rowHeights;
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
  }
}

function recalcAll() {
  // First pass: evaluate non-formula cells
  for (const id in cellData) {
    const d = cellData[id];
    if (!d.formula) {
      const num = Number(d.raw);
      d.value = d.raw === '' ? '' : (isNaN(num) ? d.raw : num);
    }
  }
  // Second pass: evaluate formula cells
  for (const id in cellData) {
    if (cellData[id].formula) {
      evaluateCell(id);
    }
  }
}

// ─── Event Handlers ──────────────────────────────────────────────────────────
function setupEventListeners() {
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Formatting shortcuts
    if ((e.ctrlKey || e.metaKey) && !editingCellId) {
      if (e.key === 'b' || e.key === 'B') { e.preventDefault(); toggleFormatting('bold'); return; }
      if (e.key === 'i' || e.key === 'I') { e.preventDefault(); toggleFormatting('italic'); return; }
      if (e.key === 'u' || e.key === 'U') { e.preventDefault(); toggleFormatting('underline'); return; }
    }

    if (editingCellId) return; // Let the input handle its own keys

    if (!currentSelection || !currentSelection.anchor) return;

    switch (e.key) {
      case 'ArrowUp':    e.preventDefault(); moveSelection(-1, 0); break;
      case 'ArrowDown':  e.preventDefault(); moveSelection(1, 0); break;
      case 'ArrowLeft':  e.preventDefault(); moveSelection(0, -1); break;
      case 'ArrowRight': e.preventDefault(); moveSelection(0, 1); break;
      case 'Tab':
        e.preventDefault();
        moveSelection(0, e.shiftKey ? -1 : 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (currentSelection.type === 'cell') startEditing(currentSelection.anchor);
        break;
      case 'Delete':
      case 'Backspace':
        e.preventDefault();
        deleteSelectedCells();
        break;
      case 'F2':
        e.preventDefault();
        if (currentSelection.type === 'cell') startEditing(currentSelection.anchor);
        break;
      default:
        // Start typing to enter edit mode
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && currentSelection.type === 'cell') {
          e.preventDefault();
          startEditing(currentSelection.anchor);
          // The character will be typed into the input after focus
          const el = getCellEl(currentSelection.anchor);
          if (el) {
            const input = el.querySelector('input');
            if (input) {
              input.value = e.key;
              formulaInput.value = e.key;
            }
          }
        }
    }
  });

  // Formula bar editing
  formulaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentSelection && currentSelection.anchor) {
        setCellValue(currentSelection.anchor, formulaInput.value);
        renderCell(currentSelection.anchor);
      }
      // Return focus to grid
      formulaInput.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      // Revert
      if (currentSelection && currentSelection.anchor) {
        const data = cellData[currentSelection.anchor];
        formulaInput.value = data ? data.raw : '';
      }
      formulaInput.blur();
    }
  });

  formulaInput.addEventListener('focus', () => {
    if (editingCellId) finishEditing(true);
  });

  // Toolbar: font family
  fontFamilySelect.addEventListener('change', () => {
    applyFormatting('fontFamily', fontFamilySelect.value);
  });

  // Toolbar: font size
  fontSizeSelect.addEventListener('change', () => {
    applyFormatting('fontSize', parseInt(fontSizeSelect.value, 10));
  });

  // Toolbar: bold / italic / underline
  btnBold.addEventListener('click', () => toggleFormatting('bold'));
  btnItalic.addEventListener('click', () => toggleFormatting('italic'));
  btnUnderline.addEventListener('click', () => toggleFormatting('underline'));

  // Toolbar: text color
  textColorInput.addEventListener('input', () => {
    applyFormatting('color', textColorInput.value);
    textColorIndicator.style.borderBottomColor = textColorInput.value;
  });

  // Toolbar: background color
  bgColorInput.addEventListener('input', () => {
    applyFormatting('bgColor', bgColorInput.value);
    bgColorIndicator.style.borderBottomColor = bgColorInput.value;
  });
}

function deleteSelectedCells() {
  if (!currentSelection) return;
  currentSelection.cells.forEach(id => {
    if (cellData[id]) {
      // Clear old dependencies
      if (cellDeps[id]) {
        cellDeps[id].forEach(depId => {
          if (cellRDeps[depId]) cellRDeps[depId].delete(id);
        });
        delete cellDeps[id];
      }
      cellData[id].raw = '';
      cellData[id].value = '';
      cellData[id].formula = false;
      cellData[id].error = null;
      renderCell(id);
      propagateChanges(id, new Set());
    }
  });
  saveToStorage();
}

// ─── Column & Row Resizing ───────────────────────────────────────────────────
function getColWidth(c) {
  return colWidths[c] !== undefined ? colWidths[c] : DEFAULT_COL_WIDTH;
}

function getRowHeight(r) {
  return rowHeights[r] !== undefined ? rowHeights[r] : DEFAULT_ROW_HEIGHT;
}

function setColWidth(c, width) {
  width = Math.max(MIN_COL_WIDTH, Math.round(width));
  colWidths[c] = width;

  const px = width + 'px';

  // Update the header <th>
  const th = gridHead.querySelector(`th[data-col="${c}"]`);
  if (th) {
    th.style.width = px;
    th.style.minWidth = px;
    th.style.maxWidth = px;
  }

  // Update all cells in this column
  const cells = gridBody.querySelectorAll(`td[data-col="${c}"]`);
  cells.forEach(td => {
    td.style.width = px;
    td.style.minWidth = px;
    td.style.maxWidth = px;
  });
}

function setRowHeight(r, height) {
  height = Math.max(MIN_ROW_HEIGHT, Math.round(height));
  rowHeights[r] = height;

  // Update all cells in this row (including the row header)
  const row = gridBody.children[r];
  if (!row) return;
  for (const td of row.children) {
    td.style.height = height + 'px';
  }
}

function applyAllSizes() {
  for (const c in colWidths) {
    setColWidth(Number(c), colWidths[c]);
  }
  for (const r in rowHeights) {
    setRowHeight(Number(r), rowHeights[r]);
  }
}

function startColResize(colIndex, e) {
  e.preventDefault();
  const startX = e.clientX;
  const startWidth = getColWidth(colIndex);
  resizing = { type: 'col', index: colIndex, startX, startSize: startWidth };
  document.body.classList.add('resizing-col');

  // Create guide line
  const guide = document.createElement('div');
  guide.classList.add('resize-guide', 'col-guide');
  guide.id = 'resize-guide';
  const container = document.getElementById('grid-container');
  guide.style.left = (e.clientX - container.getBoundingClientRect().left + container.scrollLeft) + 'px';
  container.appendChild(guide);

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    const newWidth = Math.max(MIN_COL_WIDTH, startWidth + dx);
    guide.style.left = (e.clientX - container.getBoundingClientRect().left + container.scrollLeft) + 'px';
    // Live preview
    setColWidth(colIndex, newWidth);
  }

  function onMouseUp(e) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.body.classList.remove('resizing-col');
    guide.remove();

    const dx = e.clientX - startX;
    setColWidth(colIndex, startWidth + dx);
    saveToStorage();
    setTimeout(() => { resizing = null; }, 0);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

function startRowResize(rowIndex, e) {
  e.preventDefault();
  const startY = e.clientY;
  const startHeight = getRowHeight(rowIndex);
  resizing = { type: 'row', index: rowIndex, startY, startSize: startHeight };
  document.body.classList.add('resizing-row');

  // Create guide line
  const guide = document.createElement('div');
  guide.classList.add('resize-guide', 'row-guide');
  guide.id = 'resize-guide';
  const container = document.getElementById('grid-container');
  guide.style.top = (e.clientY - container.getBoundingClientRect().top + container.scrollTop) + 'px';
  container.appendChild(guide);

  function onMouseMove(e) {
    const dy = e.clientY - startY;
    const newHeight = Math.max(MIN_ROW_HEIGHT, startHeight + dy);
    guide.style.top = (e.clientY - container.getBoundingClientRect().top + container.scrollTop) + 'px';
    // Live preview
    setRowHeight(rowIndex, newHeight);
  }

  function onMouseUp(e) {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.body.classList.remove('resizing-row');
    guide.remove();

    const dy = e.clientY - startY;
    setRowHeight(rowIndex, startHeight + dy);
    saveToStorage();
    setTimeout(() => { resizing = null; }, 0);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
}

// ─── Initialize ──────────────────────────────────────────────────────────────
function init() {
  buildGrid();
  loadFromStorage();
  applyAllSizes();
  recalcAll();
  renderAllCells();
  setupEventListeners();
  selectCell('A1');
}

init();
