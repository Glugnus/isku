export const MOCK_MATCHES = [
  {
    status: "planned",
    data: [
      {
        id: "match-planned-1",
        sport: "table-tennis",
        mode: "quick",
        created_at: new Date().toISOString(),
      },
    ],
  },
  {
    status: "completed",
    data: [
      {
        id: "match-completed-1",
        sport: "table-tennis",
        mode: "umpire",
        created_at: new Date().toISOString(),
      },
    ],
  },
];
