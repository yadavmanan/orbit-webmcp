# ORBIT

## Real-Time Radiology Capacity & Workforce Orchestration Cockpit

> **Turning every scanner, every radiologist, and every patient into one living, self-balancing system.**

![ORBIT command center](https://ik.imagekit.io/jroc4gnvp/orbit1.png)

## The One-Line Pitch

**ORBIT is the human-gated orchestration layer for distributed radiology capacity.** It connects live scanner telemetry, patient queues, radiologist bandwidth, technologist expertise, and WebMCP AI agents in one shared operational cockpit.

The result: the right patient, the right scanner, and the right qualified human can find one another before a backlog becomes a clinical delay.

### At A Glance

| Signal | ORBIT response |
| --- | --- |
| A scanner is overloaded | Rebalance eligible routine patients to a nearby partner site |
| A radiologist is nearing fatigue limits | Route studies to a credentialed remote specialist |
| A suite is understaffed | Dispatch remote senior technologist support |
| An AI agent finds a good move | Draft it, simulate it, and wait for human approval |
| A workflow action occurs | Record it in a tamper-evident SHA-256 audit trail |

---

## The Problem: Capacity Exists, But It Cannot See Itself

Picture two hospital campuses on a crisp Tuesday morning, exactly 15 minutes apart down the same highway:

- **Hospital A** has five $2-million MRI suites and two radiologists on shift. Its queue is four hours deep. A patient with a potential stroke-mimicking presentation is waiting for a scan read that takes 12 minutes, but will not happen for two hours because the on-site radiologists are buried under a backlog of 40 routine knee and lumbar scans.
- **Hospital B**, 15 minutes down the road, has three MRI suites. One has been idle since 10:00 AM, and a credentialed radiologist is refreshing their inbox, waiting for studies.

Nobody made a mistake. Nobody is understaffed **on paper**. The problem is that **capacity and demand are invisible to each other in real time**.

In modern healthcare, the machine is rarely the actual bottleneck. An MRI can run 24/7 if it has electricity and helium. The real bottleneck is the **qualified human**: the radiologist licensed in that jurisdiction, certified in the required subspecialty, and below the cognitive-fatigue limit; or the technologist trained to operate a 3.0T scanner.

With a projected shortfall of **17,000 to 42,000 radiologists in the U.S. by 2033** and **only 2% of UK radiology departments** meeting contracted turnaround times, hospital networks are suffocating.

The industry is already moving toward distributed imaging capacity:

- **Siemens Healthineers** offers remote scanning, remote reading, and load balancing and scheduling capabilities through its radiology services portfolio.
- **Philips** is advancing unified radiology workflows, remote diagnostic imaging, and remote scanning to extend expertise across locations.
- **GE HealthCare** has developed enterprise imaging, intelligent workload management, and remote collaboration capabilities aimed at improving radiology capacity, workflow efficiency, and workforce utilization.

**ORBIT connects these recurring industry needs into one vendor-neutral, real-time capacity network.**

When the **WebMCP Challenge** was announced, the fit was immediate. Healthcare AI cannot be a black box that operates in secret or hallucinates web clicks on a DOM. AI agents and human medical directors need to see the **exact same live operational screen**, share the same tools and constraints, and leave the same audit trail. WebMCP provides that interaction layer.

## The ORBIT Operating Model

ORBIT continuously turns network telemetry into ranked, explainable candidates:

$$
\mathrm{Telemetry} \rightarrow \mathrm{Constraint\ Filter} \rightarrow \mathrm{Candidate\ Ranking} \rightarrow \mathrm{Simulation} \rightarrow \mathrm{Human\ Approval} \rightarrow \mathrm{Atomic\ Execution}
$$

The system optimizes both sides of capacity at once:

$$
\mathrm{Available\ Capacity} = \mathrm{Scanner\ Capacity} \times \mathrm{Qualified\ Human\ Capacity}
$$

That is the central idea: an empty scanner is not available capacity if no qualified person can safely operate or read the study.

---

## What ORBIT Does

### 1. A Three-Pane Operational Cockpit

Human coordinators and WebMCP-enabled AI agents co-pilot hospital network capacity from the same screen.

| Pane | What it shows |
| --- | --- |
| **Network Status Rail** | Live telemetry across **5 regional hospital campuses** and **14 multi-modality scanners** covering MRI, CT, X-Ray, and Ultrasound. Tracks utilization, queue depth, idle scanner hours, and staff constraints. Utilization states are **<75% Emerald**, **75-88% Amber**, and **>88% Rose alert**. |
| **Live Multi-Modality Schedule Board** | A dense chronological feed of active examinations with STAT pulse animations, instant filtering by MRN, patient name, or protocol, and an Appointment Detail Inspector modal. |
| **Human Approval Queue** | Priority-sorted AI proposals with origin-to-destination candidates, commute distance, queue-reduction deltas, constraint badges, and one-click actions. |

### 2. Multi-Vector Capacity Rebalancing

ORBIT evaluates three distinct capacity vectors:

#### Pillar 1 | Scanner Load Balancing

Reroutes ambulatory routine patients from overloaded sites to partner facilities within a **maximum commute of 25 miles** and with **magnetic-field parity of at least 1.5T**, freeing Level-1 emergency STAT slots.

#### Pillar 2A | Remote Read Dynamic Assignment

Monitors radiologist fatigue against a **75% shift cap**. When local clinicians breach fatigue limits, ORBIT routes DICOM studies across PACS worklists to credentialed, cross-state licensed remote specialists with open bandwidth.

#### Pillar 2B | Remote Scan Assist Dispatch

Identifies understaffed suites and triggers *syngo Virtual Cockpit*-style tele-proctoring guidance sessions with certified remote senior technologists.

Candidate quality is evaluated as a constrained optimization problem:

$$
\mathrm{Best\ Candidate} = \underset{c \in \mathrm{Eligible\ Candidates}}{\operatorname{argmax}}\left(\mathrm{Queue\ Relief} + \mathrm{Fatigue\ Relief} - \mathrm{Travel\ Cost}\right)
$$

### 3. Predictive Simulation Before Commitment

Before a schedule changes, an operator or AI agent can run an **ActExcell-inspired What-If stress test** to project:

- queue reduction;
- wait-time savings; and
- staff-load improvement.

This gives operators an impact preview before they commit a real-world move.

### 4. Human Approval Is a Hard Safety Boundary

ORBIT enforces a non-negotiable server-side state machine:

$$
\mathrm{PENDING} \xrightarrow{\mathrm{Human/Agent\ Approval}} \mathrm{APPROVED} \xrightarrow{\mathrm{Atomic\ Execution}} \mathrm{EXECUTED}
$$

No move can ever execute directly from `PENDING`. If an agent or user attempts it, the server returns an explicit HTTP 400 rejection: **"Move MUST be approved by human coordinator first."** Humans stay in total control.

### 5. A Cryptographic Compliance Trail

Every bottleneck detection, proposal, simulation, approval, execution, rejection, and constraint tweak is immutably logged with a 64-character SHA-256 digest:

$$
\operatorname{SHA256}(\text{timestamp} \parallel \text{action\_type} \parallel \text{actor\_id} \parallel \text{entity\_id})
$$

### 6. Communication Drafting, With Review

ORBIT pre-generates non-spammy SMS and portal alerts for patients, including navigation links, plus DICOM and pager alerts for radiologists. Messages are drafted for review before sending.

---

## How We Built It

ORBIT is a high-density, production-grade WebMCP web application built as a shared workspace between an AI agent, human coordinators, and a FastAPI backend.

### System Flow

**WebMCP AI Agent** → **Typed WebMCP Tools** → **ORBIT React Cockpit** → **REST API** → **Constraint & AI Services** → **Human Approval** → **Atomic Execution**

### Architecture At A Glance

| Layer | Responsibility | Implementation |
| --- | --- | --- |
| **AI interaction** | Reads live state, proposes rebalancing moves, runs simulations, and requests gated actions | ChatGPT / WebMCP AI Agent |
| **Shared cockpit** | Presents network status, the multi-modality schedule, and the human approval queue | React 19 + TypeScript + Vite |
| **Tool bridge** | Registers typed tools and broadcasts state changes to every open view | `frontend/src/webmcpTools.ts` + `orbit:refresh` |
| **Decision services** | Applies scanner, remote-read, and tele-proctoring constraints; generates clinical rationale and simulations | FastAPI + Python 3.11+ |
| **Trust layer** | Validates DTOs, persists operational state, and records every action | Pydantic v2 + SQLite/MongoDB + SHA-256 audit trail |

The human and AI interfaces call the same backend endpoints. This keeps proposals, approvals, executions, and audit events synchronized in one operational view.

### WebMCP Standard Architecture

In [frontend/src/webmcpTools.ts](frontend/src/webmcpTools.ts), we registered **10 clean, fully typed WebMCP tools** directly onto `document.modelContext` / `navigator.modelContext`:

| Group | Tools |
| --- | --- |
| **Read-only state** | `get_network_status`, `get_constraints`, `get_approval_queue`, `get_audit_trail` |
| **Candidate generators** | `propose_scanner_rebalance`, `propose_remote_read_assignment`, `propose_remote_scan_assist` |
| **Simulation** | `run_simulation` |
| **Human-in-the-loop actions** | `approve_move`, `reject_move`, `execute_move` |

### The Shared Workspace Principle

Every WebMCP tool calls the exact same backend endpoints as the human UI buttons. When an AI agent executes a tool such as `propose_scanner_rebalance`, the tool fires an `orbit:refresh` event broadcast that triggers React state updates across all open views in real time. The human coordinator sees the proposal card enter the Approval Queue while the agent works.

### Frontend & Design System

Built with **React 19**, **TypeScript**, and **Vite**. The bespoke **Obsidian & Slate** command-center theme uses `#0B0F17`, `#0D131F`, slate-800 borders, JetBrains Mono numerical typography, Lucide icons, and zero bulky UI-library bloat for sub-100ms render speeds. See [frontend/src/App.tsx](frontend/src/App.tsx).

### Backend & Clinical Intelligence

Powered by **FastAPI (Python 3.11)** with Pydantic v2 DTO validation, SQLite/MongoDB persistence, and synthetic network data generation. The AI Service provides clinical rationale synthesis, with deterministic rule-based fallbacks to guarantee 100% platform availability. See [backend/app/main.py](backend/app/main.py).

---

## Industry Research Sources

The industry framing is grounded in official materials from major imaging vendors:

- **Siemens Healthineers:** RadEnablement Services describes remote scanning, remote reading, and Load Balancing & Scheduling Services, including matching patients and staff with scanners across a network.
- **Philips:** Philips describes unified radiology workflows, remote diagnostic imaging, and remote scanning as ways to address fragmented workflows, rising volumes, and staffing shortages.
- **GE HealthCare:** GE HealthCare describes intelligent workload management, enterprise imaging, and remote collaboration as approaches to improve radiology workflow, capacity, and workforce utilization.

ORBIT is designed around a problem visible across the imaging industry, not around one vendor ecosystem. Philips describes fragmented workflows, staffing shortages, remote reading, and remote scanning. GE HealthCare highlights rising imaging volumes, staffing shortages, workflow inefficiency, enterprise workload management, and remote collaboration. Siemens Healthineers emphasizes staffing, backlogs, resource utilization, remote scanning, remote reading, and network-wide load balancing. ORBIT brings these needs together into a vendor-neutral orchestration concept, with WebMCP as the agent interaction layer and human approval remaining mandatory.

---

## Challenges We Ran Into

### 1. The Ghost Action Desynchronization Problem

**The glitch:** When an AI agent approved a proposal through WebMCP, the backend updated, but the human user's screen stayed stale until a manual refresh. In a hospital, stale state can mean two people trying to schedule the same MRI scanner.

**The fix:** We architected a global client-side event broadcast bridge, `orbit:refresh`. In [frontend/src/webmcpTools.ts](frontend/src/webmcpTools.ts), every mutating WebMCP tool automatically triggers `bindings.refresh()`, notifying the Dashboard, Network View, and Audit Trail to re-sync instantly.

### 2. Preventing Rogue AI Executions

**The glitch:** During testing, an enthusiastic LLM agent called `propose_scanner_rebalance` and immediately attempted `execute_move` in the same turn, bypassing human review.

**The fix:** The server-side state machine in [backend/app/api/routes.py](backend/app/api/routes.py#L120) explicitly checks for `status == "APPROVED"`. An attempt to execute a pending move returns HTTP 400 with **"Move MUST be approved by human coordinator first."**

### 3. Multi-Dimensional Clinical Constraint Matching

**The glitch:** Balancing machines is simple math ($\text{Queue}_A - \text{Queue}_B$). Balancing human clinical capacity requires state medical-board licenses, subspecialty certifications such as Neuroradiology versus Musculoskeletal, fatigue caps ($75\%$), shift hours, and travel radii to match simultaneously without slowing down the API.

**The fix:** We engineered a two-pass constraint filter in [backend/app/rebalancing.py](backend/app/rebalancing.py):

1. **Pass 1: hard constraints.** Enforce jurisdictional license and machine Tesla-strength parity.
2. **Pass 2: soft objectives.** Rank candidates deterministically using travel mileage, fatigue reduction, and wait-time improvement.

---

## Accomplishments We Are Proud Of

- **100% Native WebMCP Open Standard Implementation:** Registered 10 production-ready tools using `document.modelContext.registerTool()`, fully compatible with ChatGPT's in-app browser and Google Chrome WebMCP flags.
- **True Co-Pilot Shared Workspace:** Human coordinators and AI agents work side by side on the exact same UI in real time, without black-box hidden channels.
- **Zero-Hallucination Server-Gated Security:** The approval state machine prevents the AI from executing illegal or unapproved medical workflow modifications.
- **Tamper-Evident SHA-256 Audit Trail:** Every WebMCP decision and human action is hashed into a transparent, audit-ready compliance ledger.
- **Direct Alignment With the Imaging Industry:** A working proof of concept around a challenge consistently identified across Siemens Healthineers, Philips, and GE HealthCare: increasing imaging demand, constrained clinical capacity, distributed expertise, and the need for smarter workflow orchestration.

---

## What We Learned

- **WebMCP beats fragile DOM scraping:** Asking an AI agent to scrape DOM selectors and click CSS buttons on a dense medical UI is like doing microsurgery with boxing gloves. WebMCP's structured tool registration delivers semantic precision, zero selector breakage, and sub-second execution speeds.
- **Healthcare AI must be Propose & Gate, not Autonomous Execute:** Clinicians do not want an AI secretly editing hospital schedules. They want an AI chief of staff that monitors telemetry, drafts optimal candidates, runs impact simulations, and hands them a one-click decision card.
- **Humans, not machines, are the true bottleneck:** Hardware is expensive, but clinician burnout is catastrophic. Designing capacity orchestration around human licensure, credentials, and fatigue yields 10x more impact than simple equipment scheduling.

---

## What's Next For ORBIT

- **HL7 FHIR & DICOMweb Integration:** Connect ORBIT directly to hospital EHR systems such as Epic and Cerner and PACS worklists for real-time automated study transfers.
- **Multi-Agent Specialized Sub-Agents:** Spawn specialized WebMCP sub-agents, such as a Licensure Verification Agent querying state medical boards live and a Patient Transit Agent coordinating non-emergency medical rideshares.
- **ActExcell Deep Supercomputer Integration:** Scale ORBIT's Tier-1 simulation engine into full discrete-event supercomputer simulations through the Siemens Healthineers ActExcell API.
- **Expansion Across Clinical Modalities:** Extend ORBIT beyond radiology into Cath Labs, Radiation Oncology linear accelerators, and Surgical Operating Rooms.

---

## Built For The WebMCP Challenge 2026

*Built with passion for a safer, more connected, more human-centered future for clinical operations.*