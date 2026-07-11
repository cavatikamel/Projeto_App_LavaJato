export const DASHBOARD_PERIOD_PRESETS = Object.freeze([
  { key: "day", label: "Dia" },
  { key: "month", label: "Mês" },
  { key: "year", label: "Ano" }
]);

const ACTIVE_STATUSES = new Set(["agendado", "aguardando", "lavando", "pronto"]);
const TRACKED_STATUSES = ["agendado", "aguardando", "lavando", "pronto", "finalizado", "cancelado"];

function toFiniteNumber(value, fallback = 0) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

function isIsoDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function parseIsoDate(value) {
  if (!isIsoDate(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1);
  if (Number.isNaN(date.getTime())) return null;
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function getNowDate(nowIso) {
  if (isIsoDate(nowIso)) return parseIsoDate(nowIso);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function getDashboardDateRange(periodKey = "month", nowIso = "") {
  const today = getNowDate(nowIso);
  const end = formatIsoDate(today);
  if (periodKey === "day") return { key: periodKey, start: end, end, granularity: "hour" };
  if (periodKey === "month") {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return { key: periodKey, start: formatIsoDate(start), end, granularity: "day" };
  }
  if (periodKey === "year") {
    const start = new Date(today.getFullYear(), 0, 1);
    return { key: periodKey, start: formatIsoDate(start), end, granularity: "month" };
  }
  const fallbackStart = new Date(today.getFullYear(), today.getMonth(), 1);
  return { key: "month", start: formatIsoDate(fallbackStart), end, granularity: "day" };
}

function isDateWithinRange(dateValue, range) {
  if (!isIsoDate(dateValue)) return false;
  return dateValue >= range.start && dateValue <= range.end;
}

function getAttendanceDate(attendance) {
  return attendance?.finishedDate || attendance?.scheduledDate || attendance?.date || "";
}

function getAttendanceServices(attendance) {
  if (Array.isArray(attendance?.services) && attendance.services.length) return attendance.services.filter(Boolean);
  if (attendance?.service) return [attendance.service];
  return [];
}

function bucketDateByHour(dateValue, timeValue = "") {
  if (!isIsoDate(dateValue)) return "";
  const hour = String(Math.min(Math.max(parseInt(String(timeValue || "0").slice(0, 2), 10) || 0, 0), 23)).padStart(2, "0");
  return `${dateValue} ${hour}:00`;
}

function bucketDateByMonth(dateValue) {
  if (!isIsoDate(dateValue)) return "";
  return String(dateValue).slice(0, 7);
}

function buildTimeBuckets(range) {
  if (range.granularity === "month") {
    const start = parseIsoDate(range.start);
    const end = parseIsoDate(range.end);
    const buckets = [];
    const formatter = new Intl.DateTimeFormat("pt-BR", { month: "short" });
    for (
      let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
      cursor <= end;
      cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)
    ) {
      buckets.push({
        key: `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`,
        label: formatter.format(cursor).replace(".", "")
      });
    }
    return buckets;
  }

  if (range.granularity === "hour") {
    return Array.from({ length: 24 }, (_, index) => {
      const hour = String(index).padStart(2, "0");
      return {
        key: `${range.start} ${hour}:00`,
        label: `${hour}h`
      };
    });
  }

  const start = parseIsoDate(range.start);
  const end = parseIsoDate(range.end);
  const buckets = [];
  const formatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" });
  for (let cursor = new Date(start); cursor <= end; cursor = addDays(cursor, 1)) {
    buckets.push({
      key: formatIsoDate(cursor),
      label: formatter.format(cursor)
    });
  }
  return buckets;
}

function buildSeriesBase(range) {
  return buildTimeBuckets(range).map((bucket) => ({
    period: bucket.key,
    label: bucket.label,
    revenue: 0,
    estimatedProfit: 0,
    incoming: 0,
    outgoing: 0,
    attendances: 0
  }));
}

function collapseTopCategories(entries, valueKey, limit = 5) {
  const rankedEntries = [...entries].sort((left, right) => right[valueKey] - left[valueKey]);
  if (rankedEntries.length <= limit) return rankedEntries;

  const head = rankedEntries.slice(0, limit);
  const tail = rankedEntries.slice(limit);
  const othersValue = tail.reduce((total, entry) => total + toFiniteNumber(entry[valueKey]), 0);
  const othersCount = tail.reduce((total, entry) => total + toFiniteNumber(entry.count || 0), 0);

  if (!othersValue && !othersCount) return head;
  return [
    ...head,
    {
      id: "others",
      label: "Outros",
      [valueKey]: othersValue,
      count: othersCount
    }
  ];
}

function summarizeChartState(data, valueKeys) {
  const hasData = data.some((entry) => valueKeys.some((key) => Math.abs(toFiniteNumber(entry[key])) > 0));
  return {
    hasData,
    emptyMessage: hasData ? "" : "Ainda não há dados suficientes para este período."
  };
}

export function buildDashboardMetrics(snapshot, options = {}) {
  const periodKey = options.periodKey || "month";
  const range = getDashboardDateRange(periodKey, options.nowIso);
  const series = buildSeriesBase(range);
  const seriesByPeriod = new Map(series.map((entry) => [entry.period, entry]));

  const attendances = Array.isArray(snapshot?.attendances) ? snapshot.attendances : [];
  const cashEntries = Array.isArray(snapshot?.cashEntries) ? snapshot.cashEntries : [];
  const openPayments = Array.isArray(snapshot?.openPayments) ? snapshot.openPayments : [];

  const filteredAttendances = attendances.filter((attendance) => {
    if (!attendance || attendance.status === "cancelado") return false;
    return isDateWithinRange(getAttendanceDate(attendance), range);
  });

  filteredAttendances.forEach((attendance) => {
    const bucketKey =
      range.granularity === "hour"
        ? bucketDateByHour(getAttendanceDate(attendance), attendance.entryTime || attendance.scheduledTime || "")
        : range.granularity === "month"
          ? bucketDateByMonth(getAttendanceDate(attendance))
          : getAttendanceDate(attendance);
    const bucket = seriesByPeriod.get(bucketKey);
    if (bucket) bucket.attendances += 1;
  });

  const filteredCashEntries = cashEntries.filter((entry) => isDateWithinRange(entry?.date, range));
  filteredCashEntries.forEach((entry) => {
    const bucketKey =
      range.granularity === "hour"
        ? bucketDateByHour(entry.date, entry.time || "")
        : range.granularity === "month"
          ? bucketDateByMonth(entry.date)
          : entry.date;
    const bucket = seriesByPeriod.get(bucketKey);
    if (!bucket) return;
    const amount = toFiniteNumber(entry.value);
    if (amount > 0 && entry.status === "Confirmado") bucket.revenue += amount;
    if (entry.status === "Confirmado") {
      bucket.estimatedProfit += amount > 0 ? toFiniteNumber(entry.netAmount ?? amount) : amount;
    }
    if (amount > 0) bucket.incoming += amount;
    if (amount < 0) bucket.outgoing += Math.abs(amount);
  });

  const activePatioCount = attendances.filter((attendance) => ACTIVE_STATUSES.has(attendance?.status)).length;
  const receivablesOpen = openPayments.reduce((total, payment) => {
    if (!payment || payment.status === "Baixado") return total;
    return total + Math.max(0, toFiniteNumber(payment.value));
  }, 0);

  const totalRevenue = series.reduce((total, entry) => total + entry.revenue, 0);
  const totalEstimatedProfit = series.reduce((total, entry) => total + entry.estimatedProfit, 0);
  const totalIncoming = series.reduce((total, entry) => total + entry.incoming, 0);
  const totalOutgoing = series.reduce((total, entry) => total + entry.outgoing, 0);
  const attendancesWithValue = filteredAttendances.filter((attendance) => toFiniteNumber(attendance.totalValue) > 0);
  const ticketAverageBase = attendancesWithValue.reduce((total, attendance) => total + toFiniteNumber(attendance.totalValue), 0);
  const ticketAverage = attendancesWithValue.length ? ticketAverageBase / attendancesWithValue.length : 0;

  const serviceRankingMap = new Map();
  filteredAttendances.forEach((attendance) => {
    getAttendanceServices(attendance).forEach((serviceName) => {
      const normalizedName = String(serviceName || "").trim();
      if (!normalizedName) return;
      const entry = serviceRankingMap.get(normalizedName) || {
        id: normalizedName,
        label: normalizedName,
        value: 0,
        count: 0
      };
      entry.count += 1;
      entry.value += toFiniteNumber(attendance.totalValue);
      serviceRankingMap.set(normalizedName, entry);
    });
  });
  const topServices = collapseTopCategories([...serviceRankingMap.values()], "count", 5).map((entry) => ({
    ...entry,
    value: entry.count
  }));

  const paymentMethodMap = new Map();
  filteredCashEntries.forEach((entry) => {
    if (entry.status !== "Confirmado" || toFiniteNumber(entry.value) <= 0) return;
    const label = String(entry.method || "Não informado").trim() || "Não informado";
    const aggregated = paymentMethodMap.get(label) || { id: label, label, value: 0, count: 0 };
    aggregated.value += toFiniteNumber(entry.value);
    aggregated.count += 1;
    paymentMethodMap.set(label, aggregated);
  });
  const paymentMethods = collapseTopCategories([...paymentMethodMap.values()], "value", 5);

  const statusBreakdown = TRACKED_STATUSES.map((status) => ({
    id: status,
    label: status,
    value: attendances.filter((attendance) => attendance?.status === status).length
  }));

  return {
    period: range,
    kpis: {
      revenueConfirmed: { value: totalRevenue, quality: "CONFIRMED" },
      estimatedProfit: { value: totalEstimatedProfit, quality: "DERIVED" },
      ticketAverage: { value: ticketAverage, quality: "DERIVED" },
      attendances: { value: filteredAttendances.length, quality: "CONFIRMED" },
      activePatio: { value: activePatioCount, quality: "CONFIRMED" },
      receivablesOpen: { value: receivablesOpen, quality: "CONFIRMED" },
      netCash: { value: totalIncoming - totalOutgoing, quality: "DERIVED" }
    },
    charts: {
      revenueTrend: {
        type: "line-area",
        data: series.map((entry) => ({ period: entry.period, label: entry.label, value: entry.revenue })),
        quality: "CONFIRMED",
        ...summarizeChartState(series, ["revenue"])
      },
      estimatedProfitTrend: {
        type: "line-area",
        data: series.map((entry) => ({ period: entry.period, label: entry.label, value: entry.estimatedProfit })),
        quality: "DERIVED",
        ...summarizeChartState(series, ["estimatedProfit"])
      },
      cashflowBreakdown: {
        type: "grouped-bar",
        data: series.map((entry) => ({
          period: entry.period,
          label: entry.label,
          incoming: entry.incoming,
          outgoing: entry.outgoing
        })),
        quality: "CONFIRMED",
        ...summarizeChartState(series, ["incoming", "outgoing"])
      },
      attendanceTrend: {
        type: "column",
        data: series.map((entry) => ({ period: entry.period, label: entry.label, value: entry.attendances })),
        quality: "CONFIRMED",
        ...summarizeChartState(series, ["attendances"])
      },
      patioStatus: {
        type: "stacked-bar",
        data: statusBreakdown,
        quality: "CONFIRMED",
        ...summarizeChartState(statusBreakdown, ["value"])
      },
      topServices: {
        type: "horizontal-bar",
        data: topServices,
        quality: "DERIVED",
        ...summarizeChartState(topServices, ["value"])
      },
      paymentMethods: {
        type: "donut",
        data: paymentMethods,
        quality: "CONFIRMED",
        ...summarizeChartState(paymentMethods, ["value"])
      }
    }
  };
}
