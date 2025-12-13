interface FAQItemProps {
  icon: React.ReactNode;
  question: string;
  answer: string;
}

export const FAQItem = ({ icon, question, answer }: FAQItemProps) => {
  return (
    <div className="border rounded-lg p-6 space-y-3 hover:shadow-lg transition-shadow">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-xl font-semibold">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  );
};