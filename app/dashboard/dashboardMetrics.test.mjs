import test from "node:test";
import assert from "node:assert/strict";

import { buildDashboardMetrics, getDashboardDateRange, DASHBOARD_PERIOD_PRESETS } from "./dashboardMetrics.js";

test("DASHBOARD_PERIOD_PRESETS expose day, month and year presets", () => {
  assert.deepEqual(
    DASHBOARD_PERIOD_PRESETS.map((preset) => preset.key),
    ["day", "month", "year"]
  );
});

test("getDashboardDateRange returns the expected presets", () => {
  assert.deepEqual(getDashboardDateRange("day", "2026-07-05"), {
    key: "day",
    start: "2026-07-05",
    end: "2026-07-05",
    granularity: "hour"
  });

  assert.deepEqual(getDashboardDateRange("month", "2026-07-05"), {
    key: "month",
    start: "2026-07-01",
    end: "2026-07-05",
    granularity: "day"
  });

  assert.deepEqual(getDashboardDateRange("year", "2026-07-05"), {
    key: "year",
    start: "2026-01-01",
    end: "2026-07-05",
    granularity: "month"
  });
});

test("getDashboardDateRange falls back to month for unknown presets", () => {
  assert.deepEqual(getDashboardDateRange("unknown", "2026-07-05"), {
    key: "month",
    start: "2026-07-01",
    end: "2026-07-05",
    granularity: "day"
  });
});

test("buildDashboardMetrics handles empty datasets without NaN or invalid output", () => {
  const metrics = buildDashboardMetrics(
    {
      attendances: [],
      cashEntries: [],
      openPayments: []
    },
    { periodKey: "month", nowIso: "2026-07-05" }
  );

  assert.equal(metrics.kpis.revenueConfirmed.value, 0);
  assert.equal(metrics.kpis.ticketAverage.value, 0);
  assert.equal(metrics.kpis.attendances.value, 0);
  assert.equal(metrics.kpis.activePatio.value, 0);
  assert.equal(metrics.kpis.receivablesOpen.value, 0);
  assert.equal(metrics.kpis.netCash.value, 0);
  assert.equal(metrics.charts.revenueTrend.hasData, false);
  assert.equal(metrics.charts.cashflowBreakdown.hasData, false);
  assert.equal(metrics.charts.paymentMethods.hasData, false);
  // Faixa 2026-07-01..2026-07-05 com granularidade diária = 5 buckets.
  assert.equal(metrics.charts.revenueTrend.data.length, 5);
});

test("buildDashboardMetrics ignores invalid values and preserves negative cashflow", () => {
  const metrics = buildDashboardMetrics(
    {
      attendances: [
        { id: 1, status: "aguardando", scheduledDate: "2026-07-03", totalValue: 0, service: "Lavagem Prime" },
        { id: 2, status: "lavando", scheduledDate: "2026-07-04", totalValue: undefined, services: ["Lavagem Prime"] },
        { id: 3, status: "cancelado", scheduledDate: "2026-07-04", totalValue: 999, service: "Ignorado" },
        { id: 4, status: "pronto", scheduledDate: "data-invalida", totalValue: 120, service: "Ignorado" }
      ],
      cashEntries: [
        { date: "2026-07-03", time: "08:00", value: "NaN", status: "Confirmado", method: "Pix" },
        { date: "2026-07-04", time: "09:00", value: -35.5, status: "Confirmado", method: "Pix" },
        { date: "invalida", time: "09:00", value: 100, status: "Confirmado", method: "Cartão" }
      ],
      openPayments: [
        { value: undefined, status: "Aberto" },
        { value: 120, status: "Baixado" }
      ]
    },
    { periodKey: "month", nowIso: "2026-07-05" }
  );

  assert.equal(metrics.kpis.revenueConfirmed.value, 0);
  assert.equal(metrics.kpis.attendances.value, 2);
  assert.equal(metrics.kpis.activePatio.value, 3);
  assert.equal(metrics.kpis.netCash.value, -35.5);
  assert.equal(metrics.kpis.receivablesOpen.value, 0);
  assert.equal(metrics.charts.cashflowBreakdown.hasData, true);
  assert.ok(metrics.charts.cashflowBreakdown.data.every((entry) => Number.isFinite(entry.incoming) && Number.isFinite(entry.outgoing)));
});

test("buildDashboardMetrics aggregates full datasets, duplicate services and open receivables", () => {
  const metrics = buildDashboardMetrics(
    {
      attendances: [
        { id: 1, status: "aguardando", scheduledDate: "2026-07-01", totalValue: 100, service: "Lavagem Prime" },
        { id: 2, status: "lavando", scheduledDate: "2026-07-02", totalValue: 180, services: ["Lavagem Prime", "Vitrificação"] },
        { id: 3, status: "pronto", scheduledDate: "2026-07-04", totalValue: 220, service: "Detailing completo" },
        { id: 4, status: "finalizado", finishedDate: "2026-07-05", totalValue: 140, service: "Higienização interna" }
      ],
      cashEntries: [
        { date: "2026-07-01", time: "08:00", value: 100, status: "Confirmado", method: "Pix" },
        { date: "2026-07-02", time: "09:00", value: 180, status: "Confirmado", method: "Cartão" },
        { date: "2026-07-03", time: "10:00", value: -45, status: "Confirmado", method: "Transferência" },
        { date: "2026-07-04", time: "11:00", value: 220, status: "Pendente", method: "Pix" },
        { date: "2026-07-05", time: "12:00", value: 140, status: "Confirmado", method: "Pix" }
      ],
      openPayments: [
        { value: 55, status: "Aberto" },
        { value: 80, status: "Aberto" }
      ]
    },
    { periodKey: "month", nowIso: "2026-07-05" }
  );

  assert.equal(metrics.kpis.revenueConfirmed.value, 420);
  assert.equal(metrics.kpis.attendances.value, 4);
  assert.equal(metrics.kpis.ticketAverage.value, 160);
  assert.equal(metrics.kpis.activePatio.value, 3);
  assert.equal(metrics.kpis.receivablesOpen.value, 135);
  assert.equal(metrics.kpis.netCash.value, 595);
  assert.equal(metrics.charts.topServices.hasData, true);
  assert.equal(metrics.charts.topServices.data[0].label, "Lavagem Prime");
  assert.equal(metrics.charts.topServices.data[0].value, 2);
  assert.equal(metrics.charts.paymentMethods.data.length, 2);
});

test("buildDashboardMetrics returns zeroed series for periods without matching data", () => {
  const metrics = buildDashboardMetrics(
    {
      attendances: [{ id: 1, status: "aguardando", scheduledDate: "2026-06-01", totalValue: 100, service: "Lavagem Prime" }],
      cashEntries: [{ date: "2026-06-01", time: "10:00", value: 100, status: "Confirmado", method: "Pix" }],
      openPayments: [{ value: 90, status: "Aberto" }]
    },
    { periodKey: "month", nowIso: "2026-07-05" }
  );

  assert.equal(metrics.kpis.revenueConfirmed.value, 0);
  assert.equal(metrics.kpis.attendances.value, 0);
  assert.equal(metrics.kpis.receivablesOpen.value, 90);
  assert.equal(metrics.charts.revenueTrend.hasData, false);
  assert.ok(metrics.charts.revenueTrend.data.every((entry) => entry.value === 0));
});

test("buildDashboardMetrics groups many payment methods into Outros", () => {
  const cashEntries = ["Pix", "Cartão", "Boleto", "Transferência", "Dinheiro", "Crédito interno"].map((method, index) => ({
    date: "2026-07-05",
    time: `0${index}:00`,
    value: 10 + index,
    status: "Confirmado",
    method
  }));

  const metrics = buildDashboardMetrics(
    {
      attendances: [{ id: 1, status: "aguardando", scheduledDate: "2026-07-05", totalValue: 60, service: "Lavagem Prime" }],
      cashEntries,
      openPayments: []
    },
    { periodKey: "day", nowIso: "2026-07-05" }
  );

  assert.equal(metrics.charts.paymentMethods.data.length, 6);
  assert.equal(metrics.charts.paymentMethods.data.at(-1).label, "Outros");
  assert.equal(metrics.charts.paymentMethods.data.at(-1).value, 10);
});
