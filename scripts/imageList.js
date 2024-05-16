export const imageList = async () => {
    const fetchResponse = await fetch("http://localhost:8088/database.json");
    const image = await fetchResponse.json();
}