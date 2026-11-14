import { HistoryView } from '@/components/history/HistoryView';

export const metadata = {
  title: 'Analysis History | ScamSense AI',
  description: 'View and manage previously inspected scam messages stored securely on your device.'
};

export default function HistoryPage() {
  return (
    <div className="py-4">
      <HistoryView />
    </div>
  );
}
