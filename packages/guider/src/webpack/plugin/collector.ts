export interface MetaCollectorOptions {
  dir: string;
}

export interface MetaCollectorResult {
  items: string[];
}

export async function collectMetaFiles(
  _ops: MetaCollectorOptions,
): Promise<MetaCollectorResult> {
  const items = ['test'];
  return {
    items,
  };
}
