export interface User {
  id: string;
  email: string;
  name: string;
  role: 'it-manager' | 'procurement-coordinator';
  company: string;
}

