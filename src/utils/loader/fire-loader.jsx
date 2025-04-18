import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../redux/loaderSlice";

const FireLoader = () => {
  const dispatch = useDispatch();
  const fireLoader = () => {
    dispatch(showLoader());

    setTimeout(() => {
      dispatch(hideLoader());
    }, 1200);
  };

  useEffect(() => {
    fireLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default FireLoader;
