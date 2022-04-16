import { useEffect, useState } from "react";

export default function useSession() {
  const [data, setData] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('_session');
      if (!token)
        return;
      
      fetch('http://localhost:8080/session', {
        headers: {
          'x-session': token
        }
      })
      .then(res => res.json())
      .then(json => setData({ ...json.session, token }))
      .catch(() => {return});
    }
  }, []);

  return data;
}