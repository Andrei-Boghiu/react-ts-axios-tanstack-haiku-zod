// ! Mock Data - TO DO LATER
type Update = {
  id: string;
  type: "Task" | "Project" | "Milestone" | "Comment";
  action: "added" | "updated";
  title: string;
  date: string;
};

const mockUpdates: Update[] = [
  { id: "1", type: "Task", action: "updated", title: "Fix login bug", date: "2025-08-23" },
  { id: "2", type: "Project", action: "added", title: "New Marketing Campaign", date: "2025-08-22" },
  { id: "3", type: "Milestone", action: "updated", title: "Release v1.2", date: "2025-08-21" },
  { id: "4", type: "Comment", action: "added", title: "Review on feature branch", date: "2025-08-21" },
];

export default function MyRecentUpdates() {
  return (
    <section>
      <h2>My Recent Updates</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Action</th>
            <th>Title</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mockUpdates.map((update) => (
            <tr key={update.id}>
              <td>{update.type}</td>
              <td>{update.action}</td>
              <td>{update.title}</td>
              <td>{update.date}</td>
              <td>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
