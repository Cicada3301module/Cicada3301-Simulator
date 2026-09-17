// ─────────────────────────────────────────────────────────────────────────────
// MASYU PUZZLE
// ─────────────────────────────────────────────────────────────────────────────

const MASYU_SIZE = 10;
let masyuCurrentOnion = null;
let masyuCurrentDifficulty = '';
let masyuGrid        = null;
let masyuHSegs       = null;
let masyuVSegs       = null;
let masyuSolutions   = [];   // all valid solutions (array of flat state arrays)
let masyuChecked     = false; // true after Check is pressed

// ── Generator ────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// MASYU GENERATOR (deterministic, seed-stable)
// ─────────────────────────────────────────────────────────────────────────────

function masyuGenerate(seed) {
  console.log(`[Masyu] Generating puzzle (seed ${seed})`);
  const rng = new MonoRandom(seed);
  const N   = MASYU_SIZE;

  // 1. Build a high-quality loop
  const t0 = performance.now();
  const loop = masyuBuildLoop(rng, N);
  const score = masyuLoopScore(loop);
  console.log(`[Masyu] Loop built: ${loop.length} cells, ${Math.round(score*100)}% turns (${(performance.now()-t0).toFixed(1)}ms)`);

  // 2. Build solution segments
  const solH = Array.from({length: N},   () => new Array(N-1).fill(false));
  const solV = Array.from({length: N-1}, () => new Array(N).fill(false));
  for (let i = 0; i < loop.length; i++) {
    const [r1,c1] = loop[i], [r2,c2] = loop[(i+1)%loop.length];
    if (r1 === r2) solH[r1][Math.min(c1,c2)] = true;
    else           solV[Math.min(r1,r2)][c1]  = true;
  }

  // 3. Classify every loop cell as a valid white/black candidate
  const allValid = masyuClassifyCells(loop);
  console.log(`[Masyu] Valid clue positions — white: ${allValid.white.length}, black: ${allValid.black.length}`);

  // 4. Build minimal clue set additively (fast propagation check)
  const t1 = performance.now();
  let { grid, difficulty } = masyuBuildClues(rng, N, loop, allValid, solH, solV);
  console.log(`[Masyu] Clue building done in ${(performance.now()-t1).toFixed(1)}ms`);

  // 5. Validate known solution and check for alternates using fast propagation
  const t2 = performance.now();
  const knownSol = { hSegs: solH, vSegs: solV };
  const solutions = masyuSolve(grid, N, 10, knownSol);

  if (solutions.length > 0) {
    // Fast check: are there any alternate solutions?
    const isUnique = masyuCheckUniqueSilent(grid, N, solH, solV);
    if (!isUnique) {
      console.log(`[Masyu] Fast check suggests alternate solutions exist — running full solver`);
      const allSols = masyuSolve(grid, N, 10); // no knownSolution → full search
      if (allSols.length > 1) solutions.push(...allSols.filter(s => !s.every((v,i) => v === solutions[0][i])));
    }
  }
  console.log(`[Masyu] Solver found ${solutions.length} solution(s) in ${(performance.now()-t2).toFixed(1)}ms`);

  let whites = 0, blacks = 0;
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if (grid[r][c] === 1) whites++;
    if (grid[r][c] === 2) blacks++;
  }
  console.log(`[Masyu] Final puzzle — white: ${whites}, black: ${blacks}, total: ${whites+blacks}, valid answers: ${solutions.length}`);
  console.log(`[Masyu] Difficulty — ${difficulty.label}`);

  return { grid, solutions, difficulty };
}

// ── Loop builder ──────────────────────────────────────────────────────────────
// Builds a quality closed loop using a structured approach:
// 1. Choose random waypoints spread across the grid
// 2. Connect them with axis-aligned segments, snaking to fill space
// 3. Guarantee minimum run length to create interesting turn patterns

function masyuBuildLoop(rng, N) {
  const minLen = 20, maxLen = 60, minBlacks = 2;
  const DIRS = [[0,1],[1,0],[0,-1],[-1,0]];

  for (let attempt = 0; attempt < 500; attempt++) {
    const sr = rng.nextMax(N), sc = rng.nextMax(N);
    const onPath = Array.from({length:N}, () => new Uint8Array(N));
    const path = [[sr, sc]];
    onPath[sr][sc] = 1;
    let lastDir = -1;

    for (let steps = 0; steps < 50000 && path.length > 0; steps++) {
      const [r, c] = path[path.length - 1];

      // Check if we can close — do this before movement so it's checked every step
      if (path.length >= minLen) {
        for (let di = 0; di < 4; di++) {
          const [dr, dc] = DIRS[di];
          if (r + dr !== sr || c + dc !== sc) continue;
          // Can close — count black positions
          const L = path.length;
          let blacks = 0;
          for (let i = 0; i < L; i++) {
            const p=path[(i-1+L)%L], u=path[i], n=path[(i+1)%L];
            const id=[u[0]-p[0],u[1]-p[1]], od=[n[0]-u[0],n[1]-u[1]];
            if (id[0]!==od[0]||id[1]!==od[1]) {
              const pp=path[(i-2+L)%L], nn=path[(i+2)%L];
              const ip=[p[0]-pp[0],p[1]-pp[1]], on2=[nn[0]-n[0],nn[1]-n[1]];
              if (ip[0]===id[0]&&ip[1]===id[1]&&on2[0]===od[0]&&on2[1]===od[1]) blacks++;
            }
          }
          if (blacks >= minBlacks) {
            // Validate all steps are adjacent before returning
            let valid = true;
            for (let i = 0; i < L; i++) {
              const [a,b]=path[i], [x,y]=path[(i+1)%L];
              if (Math.abs(a-x)+Math.abs(b-y) !== 1) { valid=false; break; }
            }
            if (valid) return path;
          }
          // Can close but not enough blacks — keep walking (don't break, just don't close)
        }
      }

      // Cap path length
      if (path.length >= maxLen) {
        onPath[r][c] = 0;
        path.pop();
        lastDir = -1;
        continue;
      }

      // Shuffle directions with momentum bias
      const perm = [0,1,2,3];
      for (let i = 3; i > 0; i--) {
        const j = rng.nextMax(i + 1);
        [perm[i], perm[j]] = [perm[j], perm[i]];
      }
      if (lastDir >= 0 && rng.nextMax(2) === 0) {
        const idx = perm.indexOf(lastDir);
        if (idx > 0) { perm.splice(idx, 1); perm.unshift(lastDir); }
      }

      // Try to move — allow stepping onto start only if we're closing
      let moved = false;
      for (const di of perm) {
        const [dr, dc] = DIRS[di];
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr >= N || nc < 0 || nc >= N) continue;
        if (nr === sr && nc === sc) continue; // closure handled above
        if (onPath[nr][nc]) continue;
        onPath[nr][nc] = 1;
        path.push([nr, nc]);
        lastDir = di;
        moved = true;
        break;
      }

      if (!moved) {
        onPath[r][c] = 0;
        path.pop();
        lastDir = -1;
      }
    }
  }

  console.warn('[Masyu] Loop builder exhausted all attempts — using border loop');
  return masyuBorderLoop(N);
}

function masyuLoopScore(loop) {
  let turns = 0;
  const L = loop.length;
  for (let i = 0; i < L; i++) {
    const [pr,pc]=loop[(i-1+L)%L], [cr,cc]=loop[i], [nr,nc]=loop[(i+1)%L];
    if (cr-pr !== nr-cr || cc-pc !== nc-cc) turns++;
  }
  return turns / L;
}

function masyuBorderLoop(N) {
  const path = [];
  for (let c=0; c<N; c++)    path.push([0,c]);
  for (let r=1; r<N; r++)    path.push([r,N-1]);
  for (let c=N-2; c>=0; c--) path.push([N-1,c]);
  for (let r=N-2; r>=1; r--) path.push([r,0]);
  return path;
}

// ── Cell classifier ───────────────────────────────────────────────────────────

function masyuClassifyCells(loop) {
  const white = [], black = [];
  const L = loop.length;
  for (let i=0; i<L; i++) {
    const prev = loop[(i-1+L)%L], curr = loop[i], next = loop[(i+1)%L];
    const inDir  = [curr[0]-prev[0], curr[1]-prev[1]];
    const outDir = [next[0]-curr[0], next[1]-curr[1]];
    const isTurn = (inDir[0]!==outDir[0] || inDir[1]!==outDir[1]);

    if (isTurn) {
      // Black: both neighbours must be straight
      const pp = loop[(i-2+L)%L], nn = loop[(i+2)%L];
      const inPrev  = [prev[0]-pp[0], prev[1]-pp[1]];
      const outNext = [nn[0]-next[0], nn[1]-next[1]];
      if (inPrev[0]===inDir[0] && inPrev[1]===inDir[1] &&
          outNext[0]===outDir[0] && outNext[1]===outDir[1]) black.push(i);
    } else {
      // White: must turn on at least one side
      const pp = loop[(i-2+L)%L], nn = loop[(i+2)%L];
      const inPrev  = [prev[0]-pp[0], prev[1]-pp[1]];
      const outNext = [nn[0]-next[0], nn[1]-next[1]];
      const prevTurns = (inPrev[0]!==inDir[0] || inPrev[1]!==inDir[1]);
      const nextTurns = (outNext[0]!==outDir[0] || outNext[1]!==outDir[1]);
      if (prevTurns || nextTurns) white.push(i);
    }
  }
  return { white, black };
}

// ── Clue builder (additive, O(clues) uniqueness checks) ──────────────────────
// Instead of starting with all clues and removing, we start with none and add
// clues one at a time until the puzzle is unique. Each candidate clue is tested
// with a single silent propagation pass — no backtracking, no per-segment loops.

function masyuBuildClues(rng, N, loop, allValid, solH, solV) {
  const TOTAL = N*(N-1) + (N-1)*N;

  // Shuffle the candidate order with the seeded RNG
  const candidates = rng.shuffleFisherYates([
    ...allValid.white.map(i => ({ i, type: 1 })),
    ...allValid.black.map(i => ({ i, type: 2 })),
  ]);

  const grid = Array.from({length:N}, () => new Array(N).fill(0));

  // Track whether we have at least one of each colour
  let hasWhite = false, hasBlack = false;

  // Run a silent base propagation to see how many unknowns start free
  const base = new Array(TOTAL).fill(0);
  masyuPropagate(grid, N, base);  // silent (depth=-1 default)
  let unknowns = base.filter(v => v===0).length;
  console.log(`  [Clues] Base propagation: ${TOTAL-unknowns}/${TOTAL} forced, ${unknowns} unknown`);

  let added = 0;
  for (const { i, type } of candidates) {
    const [r,c] = loop[i];
    if (grid[r][c] !== 0) continue; // cell already has a clue

    // Tentatively add this clue
    grid[r][c] = type;

    // Silent uniqueness check
    const unique = masyuCheckUniqueSilent(grid, N, solH, solV);

    if (unique) {
      // Keep it — update colour tracking
      if (type === 1) hasWhite = true;
      if (type === 2) hasBlack = true;
      added++;
      console.log(`  [Clues] Added ${type===1?'white':'black'} at (${r},${c}) — total: ${added}`);

      // Once we have at least one of each and puzzle is unique, we're done
      if (hasWhite && hasBlack) {
        console.log(`  [Clues] Puzzle unique with ${added} clues — stopping`);
        break;
      }
    } else {
      // This clue doesn't yet make it unique — keep it anyway if we still need
      // its colour (ensures both colours are always represented)
      const needsThisColor = (type===1 && !hasWhite) || (type===2 && !hasBlack);
      if (needsThisColor) {
        if (type === 1) hasWhite = true;
        if (type === 2) hasBlack = true;
        added++;
        console.log(`  [Clues] Added ${type===1?'white':'black'} at (${r},${c}) (colour requirement) — total: ${added}`);
      } else {
        grid[r][c] = 0; // remove — not needed yet
      }
    }
  }

  // If still not unique after iterating all candidates, do one final pass
  // adding any remaining valid clue until unique
  if (!masyuCheckUniqueSilent(grid, N, solH, solV)) {
    console.log(`  [Clues] Not yet unique after additive pass — adding remaining clues`);
    for (const { i, type } of candidates) {
      const [r,c] = loop[i];
      if (grid[r][c] !== 0) continue;
      grid[r][c] = type;
      if (type === 1) hasWhite = true;
      if (type === 2) hasBlack = true;
      added++;
      if (masyuCheckUniqueSilent(grid, N, solH, solV)) {
        console.log(`  [Clues] Unique after adding fallback clue at (${r},${c}) — total: ${added}`);
        break;
      }
    }
  }

  // Difficulty: count unknowns left after propagation on final grid
  const finalBase = new Array(TOTAL).fill(0);
  masyuPropagate(grid, N, finalBase);
  const finalUnknowns = finalBase.filter(v=>v===0).length;
  const label = finalUnknowns === 0 ? 'Easy'
              : finalUnknowns <= 15 ? 'Medium'
              : finalUnknowns <= 40 ? 'Hard'
              : 'Expert';

  return { grid, difficulty: { label, branches: finalUnknowns, rounds: 0, elapsed: 0 } };
}

// Silent uniqueness check — fast propagation only, used during clue building hot path.
// Returns true if all single-segment alternates contradict (likely unique).
// NOT a guarantee of logical solvability — use masyuSolve for the final puzzle.
function masyuCheckUniqueSilent(grid, N, solH, solV) {
  const maxH  = N*(N-1);
  const TOTAL = maxH + (N-1)*N;
  const hIdx  = (r,c) => masyuHIdx(N,r,c);
  const vIdx  = (r,c) => masyuVIdx(N,r,c);

  const known = new Array(TOTAL);
  for (let r=0; r<N;   r++) for (let c=0; c<N-1; c++) known[hIdx(r,c)] = solH[r][c] ? 1 : 2;
  for (let r=0; r<N-1; r++) for (let c=0; c<N;   c++) known[vIdx(r,c)] = solV[r][c] ? 1 : 2;

  const base = new Array(TOTAL).fill(0);
  if (!masyuPropagate(grid, N, base)) return false;

  const unknowns = [];
  for (let i=0; i<TOTAL; i++) if (base[i]===0) unknowns.push(i);
  if (unknowns.length === 0) return base.every((v,i) => v === known[i]);

  for (const si of unknowns) {
    const altVal = known[si] === 1 ? 2 : 1;
    const altState = base.slice();
    altState[si] = altVal;
    if (masyuPropagate(grid, N, altState)) return false;
  }
  return true;
}

// ── Solver ────────────────────────────────────────────────────────────────────
// ── Shared solver helpers ─────────────────────────────────────────────────────

function masyuHIdx(N, r, c) { return r * (N - 1) + c; }
function masyuVIdx(N, r, c) { return N * (N - 1) + c * (N - 1) + r; }

function masyuNbSegs(N, r, c) {
  const s = [];
  if (c > 0)   s.push(masyuHIdx(N, r, c-1));
  if (c < N-1) s.push(masyuHIdx(N, r, c));
  if (r > 0)   s.push(masyuVIdx(N, r-1, c));
  if (r < N-1) s.push(masyuVIdx(N, r, c));
  return s;
}

// Propagate constraints in-place on flat state array (0=unknown,1=on,2=off).
// Returns false on contradiction, true otherwise.
// depth/log controls whether forced assignments are logged.
function masyuPropagate(grid, N, state, depth = -1) {
  const hIdx = (r,c) => masyuHIdx(N,r,c);
  const vIdx = (r,c) => masyuVIdx(N,r,c);
  const nbSegs = (r,c) => masyuNbSegs(N,r,c);
  const log = depth >= 0;
  const pad = log ? '  '.repeat(depth) : '';

  let changed = true;
  let rounds = 0;
  while (changed) {
    changed = false;
    rounds++;
    const forcedOn = [], forcedOff = [];

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const segs    = nbSegs(r, c);
        const on      = segs.filter(s => state[s] === 1).length;
        const unknown = segs.filter(s => state[s] === 0);
        const off     = segs.filter(s => state[s] === 2).length;

        if (on > 2) { if (log) console.log(`${pad}  ✗ cell(${r},${c}) degree overflow`); return false; }
        if (on === 2) {
          for (const s of unknown) { state[s] = 2; if (log) forcedOff.push(`seg${s}[cell(${r},${c})full]`); changed = true; }
        }
        if (off === segs.length - 1 && on === 1 && unknown.length === 1) {
          state[unknown[0]] = 1; if (log) forcedOn.push(`seg${unknown[0]}[cell(${r},${c})needs2]`); changed = true;
        }

        const type = grid[r][c];
        if (type === 0) continue;

        const hL = c > 0   ? hIdx(r,c-1) : -1;
        const hR = c < N-1 ? hIdx(r,c)   : -1;
        const vU = r > 0   ? vIdx(r-1,c) : -1;
        const vD = r < N-1 ? vIdx(r,c)   : -1;

        const hLon = hL>=0 && state[hL]===1, hRon = hR>=0 && state[hR]===1;
        const vUon = vU>=0 && state[vU]===1, vDon = vD>=0 && state[vD]===1;
        const hLoff= hL< 0 || state[hL]===2, hRoff= hR< 0 || state[hR]===2;
        const vUoff= vU< 0 || state[vU]===2, vDoff= vD< 0 || state[vD]===2;
        const circ = type===2 ? `●(${r},${c})` : `○(${r},${c})`;

        if (type === 2) {
          if (hLon && hRon) { if (log) console.log(`${pad}  ✗ ${circ} both H on`); return false; }
          if (vUon && vDon) { if (log) console.log(`${pad}  ✗ ${circ} both V on`); return false; }
          if (hLon && hR>=0) { if (state[hR]===1) { if (log) console.log(`${pad}  ✗ ${circ} hL+hR`); return false; } if (state[hR]===0) { state[hR]=2; if(log)forcedOff.push(`H(${r},${c}→${c+1})[${circ}]`); changed=true; } }
          if (hRon && hL>=0) { if (state[hL]===1) { if (log) console.log(`${pad}  ✗ ${circ} hR+hL`); return false; } if (state[hL]===0) { state[hL]=2; if(log)forcedOff.push(`H(${r},${c-1}→${c})[${circ}]`); changed=true; } }
          if (vUon && vD>=0) { if (state[vD]===1) { if (log) console.log(`${pad}  ✗ ${circ} vU+vD`); return false; } if (state[vD]===0) { state[vD]=2; if(log)forcedOff.push(`V(${r}→${r+1},${c})[${circ}]`); changed=true; } }
          if (vDon && vU>=0) { if (state[vU]===1) { if (log) console.log(`${pad}  ✗ ${circ} vD+vU`); return false; } if (state[vU]===0) { state[vU]=2; if(log)forcedOff.push(`V(${r-1}→${r},${c})[${circ}]`); changed=true; } }
          if (hLoff && hRoff) {
            if ((vU>=0&&state[vU]===2)||(vD>=0&&state[vD]===2)) { if(log)console.log(`${pad}  ✗ ${circ} no H, V blocked`); return false; }
            if (vU>=0&&state[vU]===0) { state[vU]=1; if(log)forcedOn.push(`V(${r-1}→${r},${c})[${circ}noH]`); changed=true; }
            if (vD>=0&&state[vD]===0) { state[vD]=1; if(log)forcedOn.push(`V(${r}→${r+1},${c})[${circ}noH]`); changed=true; }
          }
          if (vUoff && vDoff) {
            if ((hL>=0&&state[hL]===2)||(hR>=0&&state[hR]===2)) { if(log)console.log(`${pad}  ✗ ${circ} no V, H blocked`); return false; }
            if (hL>=0&&state[hL]===0) { state[hL]=1; if(log)forcedOn.push(`H(${r},${c-1}→${c})[${circ}noV]`); changed=true; }
            if (hR>=0&&state[hR]===0) { state[hR]=1; if(log)forcedOn.push(`H(${r},${c}→${c+1})[${circ}noV]`); changed=true; }
          }
          if (hLon&&c>=2  &&state[hIdx(r,c-2)]===0) { state[hIdx(r,c-2)]=1; if(log)forcedOn.push(`H(${r},${c-2}→${c-1})[${circ}arm]`); changed=true; }
          if (hRon&&c<N-2 &&state[hIdx(r,c+1)]===0) { state[hIdx(r,c+1)]=1; if(log)forcedOn.push(`H(${r},${c+1}→${c+2})[${circ}arm]`); changed=true; }
          if (vUon&&r>=2  &&state[vIdx(r-2,c)]===0) { state[vIdx(r-2,c)]=1; if(log)forcedOn.push(`V(${r-2}→${r-1},${c})[${circ}arm]`); changed=true; }
          if (vDon&&r<N-2 &&state[vIdx(r+1,c)]===0) { state[vIdx(r+1,c)]=1; if(log)forcedOn.push(`V(${r+1}→${r+2},${c})[${circ}arm]`); changed=true; }
        }

        if (type === 1) {
          if ((hLon||hRon)&&(vUon||vDon)) { if(log)console.log(`${pad}  ✗ ${circ} H+V mix`); return false; }
          if (hLon) {
            if (hR>=0&&state[hR]===0) { state[hR]=1; if(log)forcedOn.push(`H(${r},${c}→${c+1})[${circ}hL]`); changed=true; }
            if (hR>=0&&state[hR]===2) { if(log)console.log(`${pad}  ✗ ${circ} hL on hR off`); return false; }
            if (vU>=0&&state[vU]===0) { state[vU]=2; if(log)forcedOff.push(`V(${r-1}→${r},${c})[${circ}H]`); changed=true; }
            if (vD>=0&&state[vD]===0) { state[vD]=2; if(log)forcedOff.push(`V(${r}→${r+1},${c})[${circ}H]`); changed=true; }
          }
          if (hRon) {
            if (hL>=0&&state[hL]===0) { state[hL]=1; if(log)forcedOn.push(`H(${r},${c-1}→${c})[${circ}hR]`); changed=true; }
            if (hL>=0&&state[hL]===2) { if(log)console.log(`${pad}  ✗ ${circ} hR on hL off`); return false; }
            if (vU>=0&&state[vU]===0) { state[vU]=2; if(log)forcedOff.push(`V(${r-1}→${r},${c})[${circ}H]`); changed=true; }
            if (vD>=0&&state[vD]===0) { state[vD]=2; if(log)forcedOff.push(`V(${r}→${r+1},${c})[${circ}H]`); changed=true; }
          }
          if (vUon) {
            if (vD>=0&&state[vD]===0) { state[vD]=1; if(log)forcedOn.push(`V(${r}→${r+1},${c})[${circ}vU]`); changed=true; }
            if (vD>=0&&state[vD]===2) { if(log)console.log(`${pad}  ✗ ${circ} vU on vD off`); return false; }
            if (hL>=0&&state[hL]===0) { state[hL]=2; if(log)forcedOff.push(`H(${r},${c-1}→${c})[${circ}V]`); changed=true; }
            if (hR>=0&&state[hR]===0) { state[hR]=2; if(log)forcedOff.push(`H(${r},${c}→${c+1})[${circ}V]`); changed=true; }
          }
          if (vDon) {
            if (vU>=0&&state[vU]===0) { state[vU]=1; if(log)forcedOn.push(`V(${r-1}→${r},${c})[${circ}vD]`); changed=true; }
            if (vU>=0&&state[vU]===2) { if(log)console.log(`${pad}  ✗ ${circ} vD on vU off`); return false; }
            if (hL>=0&&state[hL]===0) { state[hL]=2; if(log)forcedOff.push(`H(${r},${c-1}→${c})[${circ}V]`); changed=true; }
            if (hR>=0&&state[hR]===0) { state[hR]=2; if(log)forcedOff.push(`H(${r},${c}→${c+1})[${circ}V]`); changed=true; }
          }
          if (hLoff&&hRoff) {
            if (vU>=0&&state[vU]===0) { state[vU]=1; if(log)forcedOn.push(`V(${r-1}→${r},${c})[${circ}noH]`); changed=true; }
            if (vD>=0&&state[vD]===0) { state[vD]=1; if(log)forcedOn.push(`V(${r}→${r+1},${c})[${circ}noH]`); changed=true; }
          }
          if (vUoff&&vDoff) {
            if (hL>=0&&state[hL]===0) { state[hL]=1; if(log)forcedOn.push(`H(${r},${c-1}→${c})[${circ}noV]`); changed=true; }
            if (hR>=0&&state[hR]===0) { state[hR]=1; if(log)forcedOn.push(`H(${r},${c}→${c+1})[${circ}noV]`); changed=true; }
          }
        }
      }
    }

    if (log && (forcedOn.length || forcedOff.length)) {
      if (forcedOn.length)  console.log(`${pad}  prop round ${rounds}: ON  — ${forcedOn.join(', ')}`);
      if (forcedOff.length) console.log(`${pad}  prop round ${rounds}: OFF — ${forcedOff.join(', ')}`);
    }
  }
  return true;
}

// ── Uniqueness check (fast path) ──────────────────────────────────────────────
// Seeds the state with the known solution, propagates to fixpoint, then for
// each remaining unknown tries the opposite value and checks if it contradicts.
// If any opposite doesn't contradict → not unique.

function masyuSegName(N, si) {
  const maxH = N * (N - 1);
  if (si < maxH) { const r = Math.floor(si/(N-1)), c = si%(N-1); return `H(${r},${c}→${c+1})`; }
  const vi = si-maxH, col = Math.floor(vi/(N-1)), row = vi%(N-1);
  return `V(${row}→${row+1},${col})`;
}

function masyuCheckUnique(grid, N, solH, solV) {
  const maxH  = N * (N - 1);
  const maxV  = (N - 1) * N;
  const TOTAL = maxH + maxV;
  const hIdx  = (r,c) => masyuHIdx(N,r,c);
  const vIdx  = (r,c) => masyuVIdx(N,r,c);
  const sn    = si => masyuSegName(N, si);

  // Build the known-solution state
  const known = new Array(TOTAL).fill(0);
  for (let r = 0; r < N;   r++) for (let c = 0; c < N-1; c++) known[hIdx(r,c)] = solH[r][c] ? 1 : 2;
  for (let r = 0; r < N-1; r++) for (let c = 0; c < N;   c++) known[vIdx(r,c)] = solV[r][c] ? 1 : 2;

  // Step 1: propagate from empty state to find what's forced by circles alone
  console.log(`    [Uniqueness] Step 1 — base propagation from empty state (${TOTAL} segments)`);
  const base = new Array(TOTAL).fill(0);
  const baseOk = masyuPropagate(grid, N, base, 2);
  if (!baseOk) {
    console.log(`    [Uniqueness] ✗ Base propagation contradicted — grid has no solution`);
    return false;
  }

  const unknowns = base.reduce((acc, v, i) => { if (v === 0) acc.push(i); return acc; }, []);
  const forced   = TOTAL - unknowns.length;
  console.log(`    [Uniqueness] Base propagation forced ${forced}/${TOTAL} segments, ${unknowns.length} remain unknown`);

  if (unknowns.length === 0) {
    const matches = base.every((v, i) => v === known[i]);
    console.log(`    [Uniqueness] Fully determined by propagation alone — ${matches ? '✓ unique' : '✗ mismatch with known solution'}`);
    return matches;
  }

  // Log which unknowns remain and which value the known solution assigns each
  console.log(`    [Uniqueness] Unknown segments: ${unknowns.map(si => `${sn(si)}=${known[si]===1?'ON':'OFF'}`).join(', ')}`);

  // Step 2: for each unknown, force the OPPOSITE of the known solution and propagate.
  // If it contradicts → this branch can't produce a different solution.
  // If it doesn't → a second solution might exist → not unique.
  console.log(`    [Uniqueness] Step 2 — testing ${unknowns.length} alternates...`);
  let checked = 0;
  for (const si of unknowns) {
    const solVal = known[si];
    const altVal = solVal === 1 ? 2 : 1;
    const altState = [...base];
    altState[si] = altVal;

    console.log(`    [Uniqueness]   [${checked+1}/${unknowns.length}] ${sn(si)}: solution=${solVal===1?'ON':'OFF'}, testing ${altVal===1?'ON':'OFF'}...`);
    const ok = masyuPropagate(grid, N, altState, 3);
    checked++;

    if (ok) {
      const stillUnknown = altState.filter(v => v === 0).length;
      console.log(`    [Uniqueness]   ✗ Alternate for ${sn(si)} did NOT contradict (${stillUnknown} unknowns remain) — NOT unique`);
      return false;
    }
    console.log(`    [Uniqueness]   ✓ Alternate for ${sn(si)} contradicted`);
  }

  console.log(`    [Uniqueness] All ${checked} alternates contradicted — ✓ unique`);
  return true;
}

// ── Full solver (used for Check validation) ───────────────────────────────────
// Checks uniqueness by solving from scratch using constraint propagation.
// Returns array of up to `limit` solutions (each is {hSegs, vSegs}).

function masyuSolve(grid, N, limit, knownSolution = null) {
  const solutions = [];

  const maxH  = N * (N - 1);
  const maxV  = (N - 1) * N;
  const TOTAL = maxH + maxV;
  const hIdx  = (r,c) => masyuHIdx(N,r,c);
  const vIdx  = (r,c) => masyuVIdx(N,r,c);
  const nbSegs = (r,c) => masyuNbSegs(N,r,c);

  let branchCount    = 0;
  let contradictions = 0;

  // Pre-compute which segments are adjacent to a circle cell — used for MCV scoring
  const segScore = new Int8Array(TOTAL); // higher = more constrained = branch here first
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    if (grid[r][c] === 0) continue;
    const segs = nbSegs(r, c);
    for (const si of segs) segScore[si] += grid[r][c] === 2 ? 3 : 2; // black circles more constraining
  }

  // Pick the best unknown segment to branch on (MCV heuristic).
  // Prefers segments adjacent to circles, then segments adjacent to already-decided segments.
  function pickBranchSegment(state) {
    let bestSi = -1, bestScore = -1;
    for (let i = 0; i < TOTAL; i++) {
      if (state[i] !== 0) continue;
      let score = segScore[i] * 10; // circle adjacency base score
      // Add score for each already-decided neighbour (propagation leverage)
      if (i < maxH) {
        const r=Math.floor(i/(N-1)), c=i%(N-1);
        if (c>0   && state[hIdx(r,c-1)]!==0) score++;
        if (c<N-2 && state[hIdx(r,c+1)]!==0) score++;
        if (state[vIdx(r,c)]!==0)   score++;
        if (state[vIdx(r,c+1)]!==0) score++;
        if (r>0   && state[vIdx(r-1,c)]!==0)   score++;
        if (r>0   && state[vIdx(r-1,c+1)]!==0) score++;
      } else {
        const vi=i-maxH, c=Math.floor(vi/(N-1)), r=vi%(N-1);
        if (r>0   && state[vIdx(r-1,c)]!==0) score++;
        if (r<N-2 && state[vIdx(r+1,c)]!==0) score++;
        if (state[hIdx(r,c)]!==0)   score++;
        if (state[hIdx(r+1,c)]!==0) score++;
        if (c>0   && state[hIdx(r,c-1)]!==0)   score++;
        if (c>0   && state[hIdx(r+1,c-1)]!==0) score++;
      }
      if (score > bestScore) { bestScore = score; bestSi = i; }
    }
    return bestSi;
  }

  // Logging suppressed in solver — caller logs its own summary

  function solve(state, depth = 0) {
    if (solutions.length >= limit) return;

    const ok = masyuPropagate(grid, N, state);
    if (!ok) { contradictions++; return; }

    if (!state.includes(0)) {
      if (masyuValidateSolution(state, grid, N)) solutions.push(state);
      return;
    }

    branchCount++;
    if (branchCount > 200000) return; // hard safety limit

    const bi = pickBranchSegment(state);
    if (bi === -1) return;

    const s1 = state.slice(); s1[bi] = 1;
    solve(s1, depth + 1);
    if (solutions.length >= limit) return;

    const s2 = state.slice(); s2[bi] = 2;
    solve(s2, depth + 1);
  }

  if (knownSolution) {
    // Directly validate the known solution
    const knownState = new Array(TOTAL).fill(2); // all OFF by default
    for (let r=0; r<N;   r++) for (let c=0; c<N-1; c++) if (knownSolution.hSegs[r][c]) knownState[hIdx(r,c)] = 1;
    for (let r=0; r<N-1; r++) for (let c=0; c<N;   c++) if (knownSolution.vSegs[r][c]) knownState[vIdx(r,c)] = 1;
    if (masyuValidateSolution(knownState, grid, N)) {
      solutions.push(knownState);
      console.log(`[Masyu Solver] Known solution validated`);
    } else {
      console.log(`[Masyu Solver] Known solution failed validation — searching from scratch`);
      solve(new Array(TOTAL).fill(0));
    }
  } else {
    solve(new Array(TOTAL).fill(0));
  }
  console.log(`[Masyu Solver] branches: ${branchCount}, contradictions: ${contradictions}, solutions: ${solutions.length}`);
  return solutions;
}

// ── Prep / UI ─────────────────────────────────────────────────────────────────

function prepMasyu(n) {
  const snap = html.innerHTML;
  pushHistory(document.getElementById("win-title")?.textContent || "Google", () => {
    html.innerHTML = snap;
  });

  const combined = combinedSeed(n);
  const rng = new MonoRandom(combined);
  masyuCurrentOnion = LINK_GENERATORS.onion(rng);

  html.innerHTML = `${windowBar()}
  <div style="background:#f7f7f7;min-height:100%;font-family:Arial,sans-serif">
    <div style="background:#fff;text-align:center;padding:10px 8px 6px;border-bottom:1px solid #e0e0e0">
      <div style="font-family:'Times New Roman',serif;font-size:1.1rem;font-weight:700;color:#1a1a1a">Masyu</div>
      <div style="font-size:0.6rem;letter-spacing:0.12em;color:#6b6b6b;text-transform:uppercase;margin-top:2px">NY Times Puzzle</div>
    </div>
    <div style="max-width:700px;margin:0 auto;padding:8px">
      <div id="msy-status" style="text-align:center;font-size:0.75rem;color:#6b6b6b;min-height:1rem;margin-bottom:6px"></div>
      <div id="msy-checkRow" style="display:none;text-align:center;margin-bottom:8px">
        <button onclick="masyuCheck()" style="background:#1a1a1a;color:#fff;border:none;font-size:0.7rem;font-weight:700;padding:5px 14px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;margin:0 3px">Check</button>
        <button onclick="masyuReset()" style="background:#fff;color:#1a1a1a;border:1px solid #ccc;font-size:0.7rem;font-weight:700;padding:5px 14px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;margin:0 3px">Reset</button>
      </div>
      <div id="msy-container" style="display:flex;justify-content:center;padding:8px"></div>
    </div>
  </div>`;

  setWinTitle("NYT Masyu");
  initialHTML = html.innerHTML;

  masyuSetStatus('Generating puzzle…');
  setTimeout(() => {
    try {
      console.log(`[Masyu] Generator started (combined seed: ${combined})`);
      const result = masyuGenerate(combined);
      if (!result) { masyuSetStatus('Could not generate puzzle — try another link.'); return; }
      masyuGrid     = result.grid;
      masyuSolutions = result.solutions || [];
      masyuChecked  = false;
      masyuCurrentDifficulty = result.difficulty ? result.difficulty.label : '';
      masyuHSegs    = Array.from({length: MASYU_SIZE},   () => new Array(MASYU_SIZE - 1).fill(false));
      masyuVSegs    = Array.from({length: MASYU_SIZE - 1}, () => new Array(MASYU_SIZE).fill(false));
      masyuRender();
      document.getElementById('msy-checkRow').style.display = '';
      const diff = result.difficulty ? result.difficulty.label : '';
      masyuSetStatus(diff ? `Difficulty: ${diff}` : '');
    } catch (e) {
      console.error('[Masyu] Generator threw an error:', e);
      masyuSetStatus('Error generating puzzle — check console.');
    }
  }, 0);
}

function masyuSetStatus(msg) {
  const el = document.getElementById('msy-status');
  if (el) el.textContent = msg;
}

function masyuReset() {
  const N = MASYU_SIZE;
  masyuHSegs   = Array.from({length: N},   () => new Array(N - 1).fill(false));
  masyuVSegs   = Array.from({length: N - 1}, () => new Array(N).fill(false));
  masyuChecked = false;
  masyuRender();
  masyuSetStatus('');
}

function masyuRender() {
  const container = document.getElementById('msy-container');
  if (!container) return;
  const N    = MASYU_SIZE;
  const CELL = 32; // px per cell
  const LINE = 3;  // segment line width
  const HIT  = 8;  // hit zone half-width around gridline

  const W = N * CELL, H = N * CELL;
  const canvas = document.createElement('canvas');
  canvas.width  = W;
  canvas.height = H;
  canvas.style.cursor = 'pointer';
  canvas.style.display = 'block';

  const ctx = canvas.getContext('2d');
  masyuDraw(ctx, N, CELL, LINE);

  canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top)  * scaleY;
    masyuHandleClick(x, y, CELL, HIT, N);
    masyuChecked = false;          // clear check state so colours reset on edit
    masyuSetStatus(masyuCurrentDifficulty ? `Difficulty: ${masyuCurrentDifficulty}` : '');
    masyuDraw(ctx, N, CELL, LINE);
  });

  container.innerHTML = '';
  container.appendChild(canvas);
}

function masyuDraw(ctx, N, CELL, LINE) {
  const W = N * CELL, H = N * CELL;
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, W, H);

  // Draw placed segments (before grid so they appear under circles)
  // Horizontal segments
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N - 1; c++) {
      if (!masyuHSegs[r][c]) continue;
      const col = masyuSegColor('h', r, c);
      ctx.strokeStyle = col;
      ctx.lineWidth   = LINE;
      ctx.beginPath();
      ctx.moveTo((c + 0.5) * CELL, (r + 0.5) * CELL);
      ctx.lineTo((c + 1.5) * CELL, (r + 0.5) * CELL);
      ctx.stroke();
    }
  }
  // Vertical segments
  for (let r = 0; r < N - 1; r++) {
    for (let c = 0; c < N; c++) {
      if (!masyuVSegs[r][c]) continue;
      const col = masyuSegColor('v', r, c);
      ctx.strokeStyle = col;
      ctx.lineWidth   = LINE;
      ctx.beginPath();
      ctx.moveTo((c + 0.5) * CELL, (r + 0.5) * CELL);
      ctx.lineTo((c + 0.5) * CELL, (r + 1.5) * CELL);
      ctx.stroke();
    }
  }

  // Grid lines
  ctx.strokeStyle = '#aaa';
  ctx.lineWidth   = 1;
  for (let i = 0; i <= N; i++) {
    ctx.beginPath(); ctx.moveTo(i * CELL, 0);     ctx.lineTo(i * CELL, H);  ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i * CELL);     ctx.lineTo(W, i * CELL);  ctx.stroke();
  }

  // Circles
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const type = masyuGrid[r][c];
      if (type === 0) continue;
      const cx = (c + 0.5) * CELL;
      const cy = (r + 0.5) * CELL;
      const rad = CELL * 0.35;
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fillStyle   = type === 2 ? '#000' : '#fff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth   = 1.5;
      ctx.fill();
      ctx.stroke();
    }
  }
}

function masyuSegColor(dir, r, c) {
  if (!masyuChecked || !masyuSolutions.length) return '#4a90d9';
  const N = MASYU_SIZE;
  const si = dir === 'h' ? masyuHIdx(N,r,c) : masyuVIdx(N,r,c);
  const placed = (dir === 'h' ? masyuHSegs : masyuVSegs)[r][c];
  if (!placed) return '#4a90d9';
  const inAnySolution = masyuSolutions.some(sol => Array.isArray(sol) && sol[si] === 1);
  return inAnySolution ? '#2ecc71' : '#e74c3c';
}

function masyuHandleClick(x, y, CELL, HIT, N) {
  // Determine if click is near a vertical gridline (between cols) or horizontal gridline (between rows)
  const col  = x / CELL;
  const row  = y / CELL;
  const colFrac = col % 1;
  const rowFrac = row % 1;
  const colInt  = Math.floor(col);
  const rowInt  = Math.floor(row);

  const nearVGrid = colFrac * CELL < HIT || (1 - colFrac) * CELL < HIT;
  const nearHGrid = rowFrac * CELL < HIT || (1 - rowFrac) * CELL < HIT;

  // A vertical gridline between columns c and c+1 is a horizontal segment hSegs[r][c]
  // A horizontal gridline between rows r and r+1 is a vertical segment vSegs[r][c]

  if (nearVGrid && !nearHGrid) {
    // Clicking near a vertical gridline → toggle horizontal segment
    const segCol = colFrac < 0.5 ? colInt - 1 : colInt;
    const segRow = rowInt;
    if (segCol >= 0 && segCol < N - 1 && segRow >= 0 && segRow < N) {
      masyuHSegs[segRow][segCol] = !masyuHSegs[segRow][segCol];
    }
  } else if (nearHGrid && !nearVGrid) {
    // Clicking near a horizontal gridline → toggle vertical segment
    const segRow = rowFrac < 0.5 ? rowInt - 1 : rowInt;
    const segCol = colInt;
    if (segRow >= 0 && segRow < N - 1 && segCol >= 0 && segCol < N) {
      masyuVSegs[segRow][segCol] = !masyuVSegs[segRow][segCol];
    }
  }
}

// Validate a player's solution using the same approach as kakuro-online's checkSolution.
// Works directly on the 2D masyuHSegs/masyuVSegs arrays rather than a flat state.
// ps[r][c] = 1 if segment is ON, using:
//   hSeg(r,c) = horizontal segment between cell(r,c) and cell(r,c+1)
//   vSeg(r,c) = vertical segment between cell(r,c) and cell(r+1,c)
function masyuValidateSolution(state, grid, N) {
  // Convert flat state to 2D segment arrays for easy neighbour lookup
  const hIdx = (r,c) => masyuHIdx(N,r,c);
  const vIdx = (r,c) => masyuVIdx(N,r,c);
  const hOn = (r,c) => c>=0 && c<N-1 && r>=0 && r<N   && state[hIdx(r,c)]===1;
  const vOn = (r,c) => r>=0 && r<N-1 && c>=0 && c<N   && state[vIdx(r,c)]===1;

  // 1. Every cell must have exactly 0 or 2 lines
  for (let r=0; r<N; r++) for (let c=0; c<N; c++) {
    const count = (hOn(r,c-1)?1:0) + (hOn(r,c)?1:0) + (vOn(r-1,c)?1:0) + (vOn(r,c)?1:0);
    if (count !== 0 && count !== 2) return false;
  }

  // 2. Check circle constraints
  for (let r=0; r<N; r++) for (let c=0; c<N; c++) {
    const type = grid[r][c];
    if (type === 0) continue;

    const goH = hOn(r,c-1) && hOn(r,c);   // going horizontal through cell
    const goV = vOn(r-1,c) && vOn(r,c);   // going vertical through cell

    if (type === 1) { // white: must go straight, at least one side turns
      if (!goH && !goV) return false; // not going straight at all
      if (goH) {
        // left neighbour turns if it has a vertical segment
        const leftTurns  = vOn(r-1,c-1) || vOn(r,c-1);
        // right neighbour turns if it has a vertical segment
        const rightTurns = vOn(r-1,c+1) || vOn(r,c+1);
        if (!leftTurns && !rightTurns) return false;
      } else {
        // up neighbour turns if it has a horizontal segment
        const upTurns   = hOn(r-1,c-1) || hOn(r-1,c);
        // down neighbour turns if it has a horizontal segment
        const downTurns = hOn(r+1,c-1) || hOn(r+1,c);
        if (!upTurns && !downTurns) return false;
      }
    }

    if (type === 2) { // black: must turn, each arm extends at least 1 cell
      // must have one H arm and one V arm
      const hasH = hOn(r,c-1) || hOn(r,c);
      const hasV = vOn(r-1,c) || vOn(r,c);
      if (!hasH || !hasV) return false;
      if (hOn(r,c-1) && hOn(r,c)) return false; // both H sides — not a turn
      if (vOn(r-1,c) && vOn(r,c)) return false; // both V sides — not a turn
      // each arm must extend at least 1 more cell
      if (hOn(r,c-1) && !hOn(r,c-2)) return false; // left arm needs c-2
      if (hOn(r,c)   && !hOn(r,c+1)) return false; // right arm needs c+1
      if (vOn(r-1,c) && !vOn(r-2,c)) return false; // up arm needs r-2
      if (vOn(r,c)   && !vOn(r+1,c)) return false; // down arm needs r+1
    }
  }

  // 3. All lines form a single closed loop (using kakuro-online's travel approach)
  // Find first line segment
  let startR=-1, startC=-1, startDir='';
  outer: for (let r=0; r<N; r++) {
    for (let c=0; c<N-1; c++) if (hOn(r,c)) { startR=r; startC=c; startDir='h'; break outer; }
    for (let c=0; c<N;   c++) if (vOn(r,c)) { startR=r; startC=c; startDir='v'; break outer; }
  }
  if (startR===-1) return false;

  // Count total segments
  let totalSegs=0;
  for (let r=0;r<N;  r++) for (let c=0;c<N-1;c++) if (hOn(r,c)) totalSegs++;
  for (let r=0;r<N-1;r++) for (let c=0;c<N;  c++) if (vOn(r,c)) totalSegs++;

  // Travel the loop from the starting cell of the first segment
  // Cell neighbours reachable via ON segments
  const neighbours = (r,c) => {
    const nb=[];
    if (hOn(r,c-1)) nb.push([r,c-1]);
    if (hOn(r,c))   nb.push([r,c+1]);
    if (vOn(r-1,c)) nb.push([r-1,c]);
    if (vOn(r,c))   nb.push([r+1,c]);
    return nb;
  };

  // Start at the left cell of the first segment
  const sr = startR, sc = startDir==='h' ? startC : startC;
  let pr=-1, pc=-1, cr=sr, cc=sc, visited=0;
  for (let step=0; step<=totalSegs+1; step++) {
    visited++;
    const nbs = neighbours(cr,cc).filter(([nr,nc])=>!(nr===pr&&nc===pc));
    if (nbs.length===0) break;
    [pr,pc]=[cr,cc]; [cr,cc]=nbs[0];
    if (cr===sr && cc===sc) {
      // Closed — check all segments were visited (visited counts cells = segments+1 on loop)
      // A loop with S segments visits S cells before returning to start
      return visited === totalSegs;
    }
  }
  return false;
}

function masyuCheck() {
  if (!masyuSolutions.length || !masyuGrid) return;
  const N = MASYU_SIZE;
  masyuChecked = true;
  console.log(`[Masyu] Check pressed`);

  // Build a state array from the player's placed segments
  const maxH  = N*(N-1), TOTAL = maxH + (N-1)*N;
  const hIdx  = (r,c) => masyuHIdx(N,r,c);
  const vIdx  = (r,c) => masyuVIdx(N,r,c);
  const playerState = new Array(TOTAL).fill(2);
  for (let r=0; r<N;   r++) for (let c=0; c<N-1; c++) if (masyuHSegs[r][c]) playerState[hIdx(r,c)] = 1;
  for (let r=0; r<N-1; r++) for (let c=0; c<N;   c++) if (masyuVSegs[r][c]) playerState[vIdx(r,c)] = 1;

  // First: check against all stored solutions (guard against any non-array entries)
  let allCorrect = masyuSolutions.some(sol => Array.isArray(sol) && sol.every((v,i) => v === playerState[i]));

  // Fallback: if not matching any stored solution, validate directly
  // (handles alternate solutions not found during generation)
  if (!allCorrect) {
    const nbSegs = (r,c) => masyuNbSegs(N,r,c);
    allCorrect = masyuValidateSolution(playerState, masyuGrid, N);
    if (allCorrect) {
      console.log(`[Masyu] Alternate solution accepted — adding to solutions list`);
      masyuSolutions.push(playerState);
    }
  }

  if (allCorrect) {
    console.log(`[Masyu] Solved correctly!`);
  } else {
    // Count segments wrong against the closest solution
    let minWrong = Infinity;
    for (const sol of masyuSolutions) {
      if (!Array.isArray(sol)) continue;
      const wrong = sol.reduce((n,v,i) => n + (v !== playerState[i] ? 1 : 0), 0);
      if (wrong < minWrong) minWrong = wrong;
    }
    console.log(`[Masyu] Incorrect — closest solution is ${minWrong} segment(s) off`);
  }

  // Redraw with colors
  const container = document.getElementById('msy-container');
  if (!container) return;
  const canvas = container.querySelector('canvas');
  if (!canvas) return;
  masyuDraw(canvas.getContext('2d'), N, 32, 3);

  if (allCorrect) {
    masyuShowOnion();
  } else {
    masyuSetStatus('Not quite right — keep trying!');
  }
}

function masyuShowOnion() {
  if (document.getElementById('msy-completionBanner')) return;
  const onion = masyuCurrentOnion || 'aaaaaaaaaaaaaaaa.onion';
  const banner = document.createElement('div');
  banner.id = 'msy-completionBanner';
  banner.style.cssText = 'background:#fff;border:2px solid #000;padding:12px 16px;text-align:center;margin:8px 0;border-radius:2px';
  banner.innerHTML = `
    <div style="font-family:'Times New Roman',serif;font-size:1rem;font-weight:700;color:#000;margin-bottom:6px">&#10003; Puzzle Complete!</div>
    <div style="font-size:0.7rem;color:#6b6b6b;margin-bottom:6px">A hidden service address has been uncovered.</div>
    <div style="font-family:'Courier New',monospace;font-size:0.85rem;font-weight:700;color:#7d00c8;letter-spacing:0.05em;margin:6px 0;word-break:break-all">${onion}</div>
  `;
  const container = document.getElementById('msy-container');
  if (container) container.insertBefore(banner, container.firstChild);
  masyuSetStatus('Puzzle solved!');
}