import { useEffect, useRef } from "react";

export const useOutsideClick = function (handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          handler?.();
          console.log("done");
        }
      };

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
};
