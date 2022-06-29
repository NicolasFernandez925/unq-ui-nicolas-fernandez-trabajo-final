import { useLocation } from "react-router-dom";

export const useGetQueryParams = (paramaToSearch) => {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const param = params.get(paramaToSearch);

  return { param };
};
