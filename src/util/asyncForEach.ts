export async function asyncForEach(
  array: Array<unknown>,
  callback: (item: any, index: number, array: Array<unknown>) => Promise<void>
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default asyncForEach;
