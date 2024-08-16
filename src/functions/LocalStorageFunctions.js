
// Function to get data from storage
export function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Function to set data in storage
export function setData(key, value) {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
}

// Function to clear data from storage
export function clearData() {
    localStorage.clear();
}
// Function to remove data from storage
export function removeData(key) {
    localStorage.removeItem(key);
}