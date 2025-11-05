**qEmbassy Architecture Outline**

### Summary  
qEmbassy is a **hierarchical, blockchain-integrated ambassador management platform** designed to scale Qubic’s global outreach through structured roles, KPI-driven incentives, and verifiable on-chain identity. The system enforces strict role-based access control (RBAC), automates reward distribution via **Qubic Tickchain**, and issues **soul-bound NFTs** to represent ambassador status and identity. Built with a **modern, lightweight, and secure stack**—**Node.js + Express** (API), **PostgreSQL** (data layer), **HTMX + CSS** (reactive server-side UI), and **C++** (NFT minting and smart contract execution)—the architecture prioritizes performance, auditability, and developer experience.  

The rollout follows a **three-phase strategy**:  
- **Phase 1**: Core frontend, server logic, role system, onboarding, and project management  
- **Phase 2**: Beta launch, Qubic Tickchain integration, messaging, audit  
- **Phase 3**: v1 public launch with continuous development  

The platform supports **regional team autonomy**, **automated weekly payouts**, **real-time analytics**, and **guest application routing**, creating a self-sustaining ecosystem for community growth.

---

### System Architecture Overview  

#### **1. Frontend Layer**  
- **HTMX + CSS**  
  - Server-rendered HTML with progressive enhancement  
  - No build step; pure HTML templates with dynamic swaps  
  - Real-time updates via `hx-trigger`, `hx-post`, `hx-get`  
  - Responsive, mobile-first design  
  - Role-based UI hiding via server-side conditionals  

#### **2. Backend Layer**  
- **Node.js + Express**  
  - RESTful API with role-based middleware  
  - JWT + public key session validation  
  - Input sanitization & rate limiting  
  - Background job queue (BullMQ or similar) for payouts, timeouts, NFT minting  

#### **3. Data Layer**  
- **PostgreSQL**  
  - **Tables**:  
    - `users` (id, pubkey, role, status, region, team_id, rp_balance, nft_id)  
    - `roles` (name, hierarchy_level, permissions)  
    - `teams` (id, name, region, lead_id, wallet_address)  
    - `roadmaps` (id, team_id, title, summary, outline, status)  
    - `kpis` (id, roadmap_id, description, reward_rp, status)  
    - `kpi_submissions` (id, user_id, kpi_id, evidence_url, status)  
    - `applications` (id, name, email, region, status, submitted_at, expires_at)  
    - `messages` (id, sender_id, receiver_id, group_id, content, timestamp)  
    - `payments` (id, user_id, rp_amount, tx_hash, status, paid_at)  
  - **Indexes**: pubkey, role, region, team_id, status  
  - **Constraints**: hierarchy enforcement via triggers or app logic  

#### **4. Blockchain & Identity Layer (C++)**  
- **C++ Microservices**  
  - NFT minting module (soul-bound token on Qubic Tickchain)  
  - Smart contract interaction (payout logic, KPI verification)  
  - Runs as isolated service with REST/gRPC interface to Node.js  
  - Generates dynamic NFT metadata (color-coded status, profile image overlay)  

#### **5. Integration Layer**  
- **Qubic Tickchain**  
  - Weekly batch payout execution  
  - On-chain KPI proof submission (optional Phase 2+)  
  - Wallet linkage per community (lead/management controlled)  

#### **6. Security & Compliance**  
- Public key authentication (no passwords)  
- Role hierarchy enforced at middleware level  
- 14-day application timeout (cron job)  
- Audit log for all CRUD actions (Phase 2)  
- Input validation + CSP headers  
- Rate-limited public endpoints  

#### **7. Deployment & DevOps**  
- Dockerized services (Node, C++, PostgreSQL)  
- CI/CD pipeline (GitHub Actions)  
- Environment: dev → beta → prod  
- Reverse proxy (Caddy or Nginx) with HTTPS  

---

### Refined Endpoints Listing  

#### **Authentication**  
- `POST /api/auth/login` → Public key + signature → JWT + role context  
- `GET /api/auth/session` → Validate session  
- `POST /api/auth/logout` → Invalidate  

#### **Ambassador Management**  
- `GET /api/ambassadors` → Filtered list (by role/region)  
- `GET /api/ambassadors/:id` → Profile view  
- `POST /api/ambassadors/onboard` → From guest app  
- `PATCH /api/ambassadors/:id/approve` → Activate + mint NFT  
- `PATCH /api/ambassadors/:id/deny` → Reject  
- `PATCH /api/ambassadors/:id/role` → Promote/demote (hierarchy-bound)  
- `PATCH /api/ambassadors/:id/status` → Active/Paused/Banned  
- `DELETE /api/ambassadors/:id` → Decommission  

#### **Onboarding**  
- `GET /api/onboarding/guide` → Step-by-step content  
- `POST /api/onboarding/prerequisites` → Upload certs/ID/refs  
- `POST /api/onboarding/agreements` → Accept terms  
- `GET /api/onboarding/:id/status` → Progress + expiry  

#### **Team Management**  
- `GET /api/teams` → User-accessible teams  
- `POST /api/teams/invite` → Temp (with date) or permanent  
- `PATCH /api/teams/invite/:id` → Accept/decline  
- `GET /api/teams/:id` → Roster + metadata  

#### **Roadmaps & KPIs**  
- `GET /api/roadmaps` → Community-filtered list  
- `GET /api/roadmaps/:id` → Full details  
- `POST /api/roadmaps` → Create (Regional Lead+)  
- `PATCH /api/roadmaps/:id` → Update  
- `DELETE /api/roadmaps/:id` → Archive  
- `POST /api/kpis/submit` → Evidence upload  
- `PATCH /api/kpis/:id/approve` → Award RP  

#### **Rewards & Payments**  
- `GET /api/rewards/balance` → User RP  
- `GET /api/rewards/team-score` → ΣRP / 10  
- `GET /api/rewards/leaderboard` → Top 50  
- `GET /api/payments/schedule` → Next payout  
- `POST /api/payments/lock` → Mgmt only  
- `GET /api/payments/history` → Log  

#### **NFT System (C++ Service)**  
- `POST /api/nft/mint` → Trigger on approval  
- `GET /api/nft/:userId` → Metadata JSON  
- `PATCH /api/nft/status/:userId` → Update color  

#### **Messaging (Phase 2)**  
- `GET /api/messages/dm` → Threads  
- `POST /api/messages/dm` → Send  
- `GET /api/messages/group/:id` → History  
- `POST /api/messages/group` → Create  

#### **Analytics**  
- `GET /api/stats/overview` → Totals, retention, growth  
- `GET /api/stats/leaderboard` → Rankings  
- `GET /api/stats/roadmaps` → Progress %  
- `GET /api/stats/impact` → Aggregated  

#### **Admin (Phase 2)**  
- `POST /api/admin/init` → One-time setup  
- `POST /api/admin/onboard-mgmt` → Secure add  
- `GET /api/admin/audit` → Full log  
- `POST /api/admin/sync` → Tickchain force sync  

#### **Public Portal**  
- `GET /api/public/blog` → Posts  
- `GET /api/public/about` → Info  
- `GET /api/public/literature` → PDFs  
- `POST /api/public/apply` → Auto-route by IP  
- `POST /api/public/contact` → Inquiry  

#### **Tickchain (Phase 2)**  
- `POST /api/tickchain/payout` → Weekly batch  
- `POST /api/tickchain/verify` → On-chain KPI  
- `GET /api/tickchain/wallet/:id` → Status  

---

### Closing Statement  
qEmbassy is engineered as a **secure, scalable, and self-governing ambassador ecosystem** that transforms community coordination into a transparent, incentivized, and blockchain-verified operation. By fusing **HTMX reactivity**, **PostgreSQL reliability**, **C++ performance**, and **Qubic Tickchain automation**, the platform delivers real-time governance, automated payouts, and dynamic identity at global scale. With phased execution, role-locked permissions, and soul-bound NFT visualization, qEmbassy stands ready to power Qubic’s decentralized growth engine from beta to v1 and beyond.  

**Development may begin.**