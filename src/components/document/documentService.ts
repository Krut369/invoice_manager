import { ApiResponse } from "./types";

const API_BASE_URL = "http://34.122.133.222:8000";

export async function extractDocumentData(file: File): Promise<ApiResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/extract`, {
        method: "POST",
        headers: {
            "accept": "application/json",
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Failed to extract document data: ${response.statusText}`);
    }

    return response.json();
}
