

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"
console.log(BACKEND_URL)

export const submitPitscout = async (teamNumber, data) => {
    return await fetch(
        `${BACKEND_URL}/submit-pitscout/${teamNumber}`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );
}
