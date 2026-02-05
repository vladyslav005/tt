

export function makeDependencies() {
  return {
    // locations: new EntityRepoHttp(client),
    // dataEntry: new DataEntryRepoHttp(client),
    // report: new ReportRepoHttp(client),
    // predict: new PredictRepoHttp(client),
  } as const;
}

export type Dependencies = ReturnType<typeof makeDependencies>;