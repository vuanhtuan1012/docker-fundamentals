/**
 * @Author: VU Anh Tuan
 * @Date:   2026-10-20 22:43:52
 * @Last Modified by:   VU Anh Tuan
 * @Last Modified time: 2026-10-21 07:36:08
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserDataRequest = Omit<User, 'id'>;