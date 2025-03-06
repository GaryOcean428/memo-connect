
// Mock data for referrals when the database table doesn't exist yet
export const MOCK_REFERRALS = [
  {
    id: '1',
    client_name: 'John Smith',
    source: 'LinkedIn',
    status: 'new',
    date: new Date().toISOString(),
    value: 5000,
    notes: 'Interested in web development services'
  },
  {
    id: '2',
    client_name: 'Sarah Johnson',
    source: 'Networking Event',
    status: 'contacted',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    value: 7500,
    notes: 'Looking for branding and marketing services'
  },
  {
    id: '3',
    client_name: 'Michael Williams',
    source: 'Referral',
    status: 'in-progress',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    value: 10000,
    notes: 'Needs a complete website redesign'
  },
  {
    id: '4',
    client_name: 'Lisa Brown',
    source: 'Website Contact Form',
    status: 'completed',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    value: 3000,
    notes: 'Logo design project'
  },
  {
    id: '5',
    client_name: 'David Miller',
    source: 'Email Campaign',
    status: 'lost',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    value: 8000,
    notes: 'Chose another provider due to budget constraints'
  }
];
