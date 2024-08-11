import { useState } from "react";

export function useDeleteSong() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const doFetch = (url, options) => {
        setIsLoading(true);
        setError(null);

        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al eliminar la canción");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return {
        isLoading,
        data,
        error,
        doFetch,
    };
}
