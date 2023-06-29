import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../config/constants";

export default function useDelayedSearch (query, delay = 1000) {
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(!query.trim()) {
            setData([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        const timeout = setTimeout(() => {
            setSearchQuery(query);
        }, delay);

        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        if(!searchQuery) return;
        const abortController = new AbortController();
        const signal = abortController.signal;

        axios.get(baseUrl+"/api-cards/search?q="+searchQuery, { signal })
        .then(res => {
            setData(res.data.data);
            setError("");
        })
        .catch(error => {
            if(error.name === "AbortError") {
                console.log("Aborted");
            } else {
                setError(error.message);
            }
        })
        .finally(() => {
            setLoading(false);
        })

        return () => { abortController.abort(); }
    }, [searchQuery]);

    return [data, loading, error];
}