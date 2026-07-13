import test from "node:test";
import assert from "node:assert/strict";

import {
  capitalize,
  escapeHtml,
  formatCnpj,
  formatCpf,
  formatPhone,
  formatPlate,
  normalizeText,
  onlyDigits
} from "./textFormatters.js";

test("escapeHtml neutralizes HTML control characters (stored XSS guard)", () => {
  assert.equal(
    escapeHtml('<img src=x onerror="alert(1)">'),
    "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"
  );
  assert.equal(escapeHtml("Tom & Jerry's <b>"), "Tom &amp; Jerry&#039;s &lt;b&gt;");
});

test("escapeHtml tolerates null and undefined", () => {
  assert.equal(escapeHtml(undefined), "");
  assert.equal(escapeHtml(null), "");
});

test("escapeHtml is idempotent-safe for plain text", () => {
  assert.equal(escapeHtml("Lavagem Prime"), "Lavagem Prime");
});

test("onlyDigits strips every non-digit character", () => {
  assert.equal(onlyDigits("(11) 98888-0101"), "11988880101");
  assert.equal(onlyDigits(undefined), "");
});

test("formatPlate keeps alphanumeric, uppercases and caps length", () => {
  assert.equal(formatPlate("abc-1d23"), "ABC1D23");
  assert.equal(formatPlate("abcdefghij"), "ABCDEFGH");
});

test("formatPhone builds progressive Brazilian phone masks", () => {
  assert.equal(formatPhone("11988880101"), "(11) 98888-0101");
  assert.equal(formatPhone("1133224455"), "(11) 3322-4455");
});

test("formatCpf and formatCnpj apply the expected masks", () => {
  assert.equal(formatCpf("12345678910"), "123.456.789-10");
  assert.equal(formatCnpj("12345678000199"), "12.345.678/0001-99");
});

test("normalizeText removes accents and lowercases", () => {
  assert.equal(normalizeText("Serviço Ágil"), "servico agil");
});

test("capitalize uppercases only the first character", () => {
  assert.equal(capitalize("prime"), "Prime");
});
