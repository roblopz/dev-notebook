import { useState } from "react";

export default () => {
  const [dummyState, setDummyState] = useState(0);
  return () => setDummyState(s => ++s);
};