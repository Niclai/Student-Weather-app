/**
 * Store some data under the given key in the device's local storage, to be
 * persisted between executions of the application.
 */
const storeData = async <T>(key: string, value: T) => {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
};

/**
 * Retrieve data that was previously persisted under the given key in the
 * device's local storage. If nothing is found under the key, null is returned.
 */
const getData = async <T>(key: string): Promise<T | null> => {
  const jsonValue = localStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export { storeData, getData };
