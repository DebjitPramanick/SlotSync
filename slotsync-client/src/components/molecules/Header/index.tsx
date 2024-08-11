import colors from "~/styles/colors";
import * as Styles from "./index.styled";
import { Button } from "~/components/atoms";
import { useRequestStates } from "~/hooks";
import { userApi } from "~/api";
// import { userApi } from "~/api";
// import { useRequestStates } from "~/hooks";

const Header = () => {
  const [logoutUserRequestState, logoutUserRequestHandlers] =
    useRequestStates();

  const handleLogoutBtnClick = async () => {
    logoutUserRequestHandlers.pending();
    try {
      const response = await userApi.logoutUser({});
      logoutUserRequestHandlers.fulfilled(response);
      window.location.href = "/";
    } catch (error) {
      logoutUserRequestHandlers.rejected(error);
    }
  };

  return (
    <Styles.Root>
      <Styles.HeaderRoot>
        <Styles.Container>
          <Styles.HeaderBranding>
            Slot<span style={{ color: colors.TEXT_ACCENT_NORMAL }}>Sync</span>
          </Styles.HeaderBranding>
          <Button
            text="Log Out"
            size="medium"
            outlined
            onClick={handleLogoutBtnClick}
            loading={logoutUserRequestState.pending}
            disabled={logoutUserRequestState.pending}
          />
        </Styles.Container>
      </Styles.HeaderRoot>
    </Styles.Root>
  );
};

export default Header;
