import { useState, useEffect } from "react";
import { baseUrl } from "../config/constants";
import axios from "axios";

const limit = 10;
export default function useLoadCards(ref) {

  const [intersecting, setIntersecting] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, { threshold: 0.5 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  useEffect(() => {
    if (intersecting && hasMore) {
      setSkip((prev) => prev + limit);
    }
  }, [intersecting]);

  useEffect(() => {
    setIsLoading(true);

    axios.get(baseUrl + `/api-cards?skip=${skip}&limit=${limit}`)
      .then(({data}) => {
        setData(data.data);
        setTotal(data.total);
        setError("");

        let moreToLoad = (parseInt(data.total) > (skip + data.data.length));
        setHasMore(moreToLoad);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        setError(error.message);
        setData([]);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [skip, limit]);

  return [data, total, isLoading, error];
}