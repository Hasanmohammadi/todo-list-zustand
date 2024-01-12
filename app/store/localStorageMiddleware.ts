class LocalStorageMiddleware {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  public apply(store: any) {
    return (next: any) => (action: any) => {
      const result = next(action);
      localStorage.setItem(this.key, JSON.stringify(store.getState()));
      return result;
    };
  }
}

export default LocalStorageMiddleware;
