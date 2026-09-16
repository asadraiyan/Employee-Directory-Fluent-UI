import { TabsPage } from "../features/forms/TabsPage";
import { GridPage } from "../features/grid/GridPage";
import { makeStyles, Text } from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    boxSizing: "border-box",
    width: "min(1220px, calc(100% - 48px))",
    margin: "44px auto 80px",
    "& h1": {
      margin: "0 0 28px",
      fontSize: "28px",
      fontWeight: 700,
    },
  },
});

export default function App() {
  const styles = useStyles();

  return (
    <main className={styles.container}>
      <Text as="h1" size={600} weight="semibold">Employee Directory</Text>
      <TabsPage />
      <GridPage />
    </main>
  );
}
