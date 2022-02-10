import { JsonItem } from "../types/jsonDataTypes";
import * as posts from "../data/post.json";

export function getJsonItems(): JsonItem[] {
  return posts;
}
