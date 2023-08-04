import CategoryBar from "@/components/category-bar/category-bar";
import styles from "./page.module.css";
export default function Home() {
  return (
    <div className={styles.fixedTop}>
      <CategoryBar />;
    </div>
  );
}
