/**
 * @Author: VU Anh Tuan
 * @Date:   2026-10-25 18:23:16
 * @Last Modified by:   VU Anh Tuan
 * @Last Modified time: 2026-10-28 00:16:17
 */
export type User = {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
}

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  city: string;
  company: string;
}

export type UserDataRequest = Omit<User, 'id'>;