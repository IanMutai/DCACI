# NCTP Project Manager Skill

## Activation
User invokes: `/nctp` followed by a command

## Commands

### `/nctp status`
Show overall project status. Read `nctp-tracker.md` from the project root and produce a concise summary:
- Overall completion percentage per stream (A through G)
- Current milestone status
- Next blocking items
- Risk highlights

### `/nctp next`
Determine what to work on next by reading `nctp-tracker.md`:
1. Find the first incomplete milestone (M1, M2, M3...)
2. Find all unchecked items that block that milestone
3. Present them as a prioritized work list
4. Suggest the optimal order considering dependencies

### `/nctp stream [A|B|C|D|E|F|G]`
Show detailed status for a specific stream. Read the tracker and report:
- All tasks in that stream grouped by section
- Completion percentage per section
- What's blocking progress
- Which files need work (with paths)

### `/nctp update [task-id] [done|wip|blocked]`
Update the status of a task in `nctp-tracker.md`:
- `done`: Change `[ ]` to `[x]`
- `wip`: Add `🔧` marker
- `blocked`: Add `🚫` marker
Update the "Last Updated" date at the top.

### `/nctp plan [milestone]`
Create a detailed implementation plan for reaching a specific milestone:
1. Read the tracker to find all dependencies for that milestone
2. Read the actual source files to assess current state
3. Generate a step-by-step plan with:
   - Exact files to create/modify
   - Code changes needed
   - Commands to run
   - Verification steps

### `/nctp verify [stream]`
Verify the actual state of a stream by reading source files:
1. Check if files exist for all claimed-complete items
2. Check if implementations are real vs stubs
3. Report discrepancies between tracker and reality
4. Suggest tracker corrections

### `/nctp report`
Generate a full project report suitable for stakeholders:
- Executive summary (2-3 sentences)
- Progress by stream with percentages
- Milestone timeline
- Blockers and risks
- Recommended next actions

## Behavior

When this skill is invoked:

1. **Always read `nctp-tracker.md` first** - this is the source of truth for project state
2. **Cross-reference with actual files** - use Glob and Read to verify claims
3. **Be precise about what's done vs stubbed** - a file existing doesn't mean the feature works
4. **Track dependencies** - never suggest working on something whose dependencies aren't met
5. **Update the tracker** - when work is completed, update the markdown checkboxes
6. **Use the TodoWrite tool** - create actionable todo lists for the current work session

## Key Files Reference

```
Project Root: /Users/ianmutai/Desktop/Ian Mutai/Workspace/Projects/Afcen REG-NDC-MRV/

Tracker:     nctp-tracker.md
Build Spec:  NCTP-CLAUDE-CODE-PROMPT.md

Apps:
  Portal:    apps/portal/
  MRV:       apps/mrv/
  NDC:       apps/ndc/
  Registry:  apps/registry/

Packages:
  Types:     packages/api-types/
  Client:    packages/api-client/
  UI:        packages/ui/
  Utils:     packages/utils/
  Config:    packages/config/

Schemas:
  Portal:    apps/portal/prisma/schema.prisma
  MRV:       apps/mrv/prisma/schema.prisma
  NDC:       apps/ndc/prisma/schema.prisma

Docker:      docker-compose.yml
Env:         .env.example
```

## Stream Summary

| Stream | Name | Items | Focus |
|--------|------|-------|-------|
| A | Infrastructure & DevOps | A1-A5 | Monorepo, Docker, DB setup, CI/CD |
| B | Portal (Gateway & Auth) | B1-B6 | Auth, onboarding, dashboard, proxy |
| C | MRV System | C1-C9 | Inventory, calculations, QA/QC, reporting |
| D | NDC Tools | D1-D9 | Targets, progress, projections, policies |
| E | Registry Enhancements | E1-E3 | API v1, business logic |
| F | Shared Packages | F1-F4 | Types, client, UI, utils |
| G | Integration & Cross-System | G1-G4 | Data flows, unified reporting |

## Milestone Dependencies

```
M1 (Apps Compile) ← A3
M2 (Databases Created) ← A4
M3 (Portal Auth) ← M1 + M2 + B2
M4 (MRV Inventory CRUD) ← M2 + C2 + C3
M5 (NDC Targets CRUD) ← M2 + D2 + D3
M6 (Registry API v1) ← M2 + E2
M7 (MRV Calculations) ← M4 + C6
M8 (NDC Reads MRV) ← M4 + M5 + G1
M9 (Dashboard Real Data) ← M4 + M5 + M6 + B4
M10 (BTR Report Gen) ← M7 + M8 + G3
```
