import { BehaviorSubject, filter, map, take } from "rxjs";

import type { IFolder } from "../types/folder";

export class FoldersStore {
  private error = new BehaviorSubject<string | null>(null);
  public error$ = this.error.asObservable();

  private isLoading = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoading.asObservable();

  private list = new BehaviorSubject<IFolder[]>([]);
  public list$ = this.list.asObservable();

  private selected = new BehaviorSubject<string | null>(null);
  public selected$ = this.selected.asObservable();

  private fetcher: () => Promise<IFolder[]>;

  constructor(fetchFolders: () => Promise<IFolder[]>) {
    this.fetcher = fetchFolders;
    this.initializeAutoSelection();
  }

  public async fetch() {
    try {
      this.error.next(null);
      this.isLoading.next(true);
      const folders = await this.fetcher();
      this.list.next(folders);
    } catch (error) {
      console.error(error);
      this.error.next("Error loading folders");
    } finally {
      this.isLoading.next(false);
    }
  }

  public select(folderId: string) {
    this.selected.next(folderId);
  }

  private initializeAutoSelection() {
    this.list$
      .pipe(
        filter((folders) => folders.length > 0),
        take(1),
        map((folders) => folders[0]?.key),
      )
      .subscribe((firstFolderId) => {
        if (this.selected.value === null && firstFolderId != null) {
          this.select(firstFolderId);
        }
      });
  }
}
