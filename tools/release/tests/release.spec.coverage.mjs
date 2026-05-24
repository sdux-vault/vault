// Additional tests for 100% coverage

it('parses undefined when args missing', () => {
  const r = new Release({ projectRoot: '/repo', args: [], libraries: LIBS });
  expect(r.type).toBeUndefined();
  expect(r.libKey).toBeUndefined();
  expect(r.mode).toBeUndefined();
  expect(r.dryRun).toBeUndefined();
});

it('filters libraries correctly by engine flag', async () => {
  answers = ['analyze'];
  const r = new Release({
    projectRoot: '/repo',
    args: [],
    libraries: LIBS,
    dependencyGraph: GRAPH,
    loadEngine: false
  });
  await r.run();
  expect(
    consoleInfo.filter((m) => m.includes('shared')).length
  ).toBeGreaterThan(0);
});
