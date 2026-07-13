import test from "node:test";
import assert from "node:assert/strict";

import { createSessionBoundary, createAccessBoundary } from "./sessionAccessBoundary.js";

function buildBoundaries() {
  const session = createSessionBoundary();
  const access = createAccessBoundary(session);
  return { session, access };
}

test("a fresh session is unauthenticated and denies every area", () => {
  const { access } = buildBoundaries();
  assert.equal(access.isAuthenticated(), false);
  assert.equal(access.canAccessAdminArea(), false);
  assert.equal(access.canAccessYard(), false);
  assert.equal(access.canAccessFinance(), false);
});

test("selecting a profile without a user does not authenticate", () => {
  const { session, access } = buildBoundaries();
  session.selectProfile("Administrador");
  assert.equal(access.isAuthenticated(), false);
  assert.equal(access.canAccessAdminArea(), false);
});

test("an authenticated admin unlocks admin, finance and yard", () => {
  const { session, access } = buildBoundaries();
  session.startSession({ user: "Kamel", profile: "Administrador" });
  assert.equal(access.isAuthenticated(), true);
  assert.equal(access.isAdminProfile(), true);
  assert.equal(access.canAccessAdminArea(), true);
  assert.equal(access.canAccessFinance(), true);
  assert.equal(access.canAccessYard(), true);
});

test("an operator can reach the yard but not admin-only finance", () => {
  const { session, access } = buildBoundaries();
  session.startSession({ user: "Carlos", profile: "Operador" });
  assert.equal(access.isOperatorProfile(), true);
  assert.equal(access.canAccessYard(), true);
  assert.equal(access.canAccessFinance(), false);
  assert.equal(access.canAccessAdminArea(), false);
});

test("clearing the session revokes every permission", () => {
  const { session, access } = buildBoundaries();
  session.startSession({ user: "Kamel", profile: "Administrador" });
  session.clearSession();
  assert.equal(access.isAuthenticated(), false);
  assert.equal(access.canAccessAdminArea(), false);
});

test("canAccessAdminView enforces per-view finance policy", () => {
  const { session, access } = buildBoundaries();
  session.startSession({ user: "Carlos", profile: "Operador" });
  assert.equal(access.canAccessAdminView("cashflow"), false);
  assert.equal(access.canAccessAdminView("invoices"), false);

  session.startSession({ user: "Kamel", profile: "Administrador" });
  assert.equal(access.canAccessAdminView("cashflow"), true);
});

test("canPerformSensitiveAction denies unknown actions and gates finance", () => {
  const { session, access } = buildBoundaries();
  session.startSession({ user: "Kamel", profile: "Administrador" });
  assert.equal(access.canPerformSensitiveAction("view-finance"), true);
  assert.equal(access.canPerformSensitiveAction("acao-inexistente"), false);

  session.startSession({ user: "Carlos", profile: "Operador" });
  assert.equal(access.canPerformSensitiveAction("view-finance"), false);
});
