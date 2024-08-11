import { PuffLoader } from "react-spinners";
import colors from "~/styles/colors";

const Loader = () => {
  return <PuffLoader color={colors.BG_ACCENT_NORMAL} />;
};

export default Loader;
