import { TabsPage } from "../features/forms/TabsPage";
import { GridPage } from "../features/grid/GridPage";
import {
  makeStyles,
  Switch,
  Text,
  Toaster,
  tokens,
} from "@fluentui/react-components";
import { toasterId } from "../appConstant/app";

interface AppProps {
  isDarkMode: boolean;
  onThemeChange: (isDarkMode: boolean) => void;
}

const useStyles = makeStyles({
  container: {
    boxSizing: "border-box",
    width: "min(1220px, calc(100% - 48px))",
    margin: "44px auto 80px",
    padding: "32px 36px 40px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow16,
    "& h1": {
      margin: "0 0 28px",
      fontSize: "28px",
      fontWeight: 700,
      color: tokens.colorBrandForeground1,
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  provider: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
  },
});

export default function App({ isDarkMode, onThemeChange }: AppProps) {
  const styles = useStyles();

  return (
    <div className={styles.provider}>
      <main className={styles.container}>
        <header className={styles.header}>
          <Text as="h1" size={600} weight="semibold">Employee Directory</Text>
          <Switch
            label={isDarkMode ? "Dark Mode" : "Light Mode"}
            checked={isDarkMode}
            onChange={(_, data) => onThemeChange(data.checked)}
          />
        </header>
        <TabsPage />
        <GridPage />
      </main>
      <Toaster toasterId={toasterId} position="top-end" timeout={3000} />
    </div>
  );
}
