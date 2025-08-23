import MyQuickActions from "../components/MyQuickActions";
import MyRecentProjects from "../components/MyRecentProjects";
import MyRecentTasks from "../components/MyRecentTasks";
import MyRecentUpdates from "../components/MyRecentUpdates";

export default function Dashboard() {
  return (
    <main>
      <div className="dashboard-first-row">
        <MyQuickActions />
        <MyRecentUpdates />
      </div>
      <MyRecentProjects />
      <MyRecentTasks />
    </main>
  );
}
