import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'work'>;

/** 所有作品，按编号排序。编号重复时构建报错。 */
export async function getWorks(): Promise<Work[]> {
  const works = await getCollection('work');
  const seen = new Map<string, string>();
  for (const w of works) {
    const other = seen.get(w.data.id);
    if (other) throw new Error(`作品编号重复：${w.data.id}（${other} 和 ${w.id}）`);
    seen.set(w.data.id, w.id);
  }
  return works.sort((a, b) => a.data.id.localeCompare(b.data.id));
}
