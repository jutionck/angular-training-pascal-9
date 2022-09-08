import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly storage: Storage = sessionStorage;

  get(key: string): string {
    return this.storage.getItem(key) as string;
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value)
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}
