# 实施与裁决记录

五项任务围绕用户批准的东方器物方向逐项完成；全部产物位于 D:\workspace，新旧仓库独立。前三个优化阶段分别以提交 1094d69、c73e939、a46a2a8 保留。发布前全分支审查及暂缓项见 whole-branch-review.md；线上源码、精确成功运行和原站基线见 rounds/05-live.md。

源码和功能验证：6 个文件、29 项测试通过；根路径与 Pages 子路径导出均通过；15 个页面/尺寸状态无溢出且入口不少于 44px。完整字体许可、24 个素材的源文件与复制哈希、三轮截图和来源映射均保留。未测性能指标与设备范围按真实证据限定。

以下逐项保留执行日志中的全部裁决，包含理由与判断错误的代价。

## Rulings I made
- Ruling: Independent new D-drive repository provides isolation; do not create a linked worktree from the old repository — explicitly requested separate repo and fixed workspace — cost if wrong: a separate checkout can be added later.
- Ruling: Run official skill scripts from copies with normalized LF under D-drive tooling — Windows-installed scripts contain CRLF; originals remain untouched — cost if wrong: bookkeeping only, git history remains authoritative.
- Ruling: Copy only homepage cover media during Task 1, then generate the full asset manifest in Task 2 — Task 1's visual acceptance needs real images before Task 2 — cost if wrong: assets can be regenerated from unchanged sources.
- Ruling: Perform the mandated whole-branch review within Task 5 before the final merge/publication — publication should follow review even though the skill diagram puts review after all task lines — cost if wrong: publication is delayed until review resolves.
- Ruling: Add a self-hosted OFL heading font subset in round two — human requested a more premium design after seeing the initial system-font version — cost if wrong: one small font request, reversible to the system fallback.
- Final: Ruling: Actual GitHub Actions deployment and live Pages acceptance were set aside by review — keep exact successful run and live four-case refresh/resource checks as the Task 5 completion gate — cost if wrong: repair deployment and repeat live acceptance.
- Final: Ruling: Real mobile hardware, Safari, screen-reader announcements and low-end performance were not directly judged — browser widths and keyboard evidence define the verified scope, with no real-device claim — cost if wrong: device-specific compatibility or announcement fixes may be needed.
- Final: Ruling: Lighthouse, LCP and animation frame rate were not directly judged — report only measured file payloads and local transport, no invented scores — cost if wrong: public-network or low-end performance may require further optimization.
- Final: Ruling: Actual fabrication, hardware performance and research outcomes were not directly judged — present supplied renders and design concepts with explicit visual/AI labels — cost if wrong: correct the case when author evidence becomes available.
- Final: Ruling: Independent ownership verification of supplied works was not performed — rely on the human's explicit provision and original portfolio provenance/hashes — cost if wrong: replace affected material and correct attribution.
- Ruling: Transfer unchanged Git objects through the official GitHub Git Data API after the smart-HTTP connection stalled — preserve original trees, dates and commit hashes, with an isolated codex/api-bootstrap reference required for the empty repository — cost if wrong: stop on hash mismatch and repair transfer; an auxiliary initialization branch remains.

## Deferred minors

收尾新增裁决：
- Final: Ruling: Archive this plan scratch reversibly rather than recursively deleting it — automatic review rejected the recursive delete with blocked by policy and no specific reason; preserve all logs while removing the active scratch location — cost if wrong: archived logs occupy additional D-drive space.

- Final: minor (deferred): Desktop-eligible Lenis lifecycle is not covered by the OS preference unit test; manual cleanup/restoration is verified and production cleanup appears correct. Add creation, OS reduce destruction/restoration and unmount coverage in a follow-up.

发布实测修正：完整工作流的缓存上下文检查 RED→GREEN，行为测试29/29；失败运行与修正依据保留在workflow-validation.md。独立审查不替代正式部署和线上验收。
