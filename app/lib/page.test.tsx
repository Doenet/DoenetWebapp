import { expect, test, vi } from 'vitest'
import { findOrCreateUser } from './doenet-data'

vi.mock('next/font/google', () => ({
  Inter: () => ({
    style: {
      fontFamily: 'mocked',
    },
  }),
  Lusitana: () => ({
    style: {
      fontFamily: 'mocked',
    },
  }),
}))
 


test('Do something with database', async () => {
  const ret = await findOrCreateUser("b@b.com");
  console.log(ret);
  expect(ret).toBe(3);

});