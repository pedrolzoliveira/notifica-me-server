export interface Factory<T> {
  create: (params: any | undefined) => Promise<T> | T
}
